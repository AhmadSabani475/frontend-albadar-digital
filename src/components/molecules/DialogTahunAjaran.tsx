import { useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2, Pencil } from "lucide-react";
import { FieldGroup } from "../ui/field";
import FormField from "./FormField";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import type { PayloadTahunAjaran, TahunAjaran } from "@/types/TahunAjaran";
import { useTahunAjaranMutation } from "@/hooks/use-tahun-ajaran-mutation";

interface PropTypes {
    type: 'create' | 'update';
    initialValues?: TahunAjaran;
    onSuccess?: () => void;
}

const defaultForm: PayloadTahunAjaran = {
    nama: '',
    tanggalMulai: '',
    tanggalSelesai: '',
    is_active: false,
};

const formatDateForInput = (dateVal?: string | Date) => {
    if (!dateVal) return '';
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
};

const DialogTahunAjaran = ({ type, initialValues, onSuccess }: PropTypes) => {
    const [form, setForm] = useState<PayloadTahunAjaran>(defaultForm);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);

    const { create, update } = useTahunAjaranMutation();
    const isLoading = create.isPending || update.isPending;

    useEffect(() => {
        if (type === 'update' && initialValues) {
            setForm({
                nama: initialValues.nama,
                tanggalMulai: formatDateForInput(initialValues.tanggalMulai),
                tanggalSelesai: formatDateForInput(initialValues.tanggalSelesai),
                is_active: Boolean(initialValues.is_active),
            });
        } else {
            setForm(defaultForm);
        }
    }, [initialValues, type, open]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        const payload: PayloadTahunAjaran = {
            nama: form.nama,
            tanggalMulai: form.tanggalMulai,
            tanggalSelesai: form.tanggalSelesai || undefined,
            is_active: form.is_active,
        };

        if (type === 'create') {
            create.mutate(payload, {
                onSuccess: () => {
                    setOpen(false);
                    onSuccess?.();
                },
                onError: (err: any) => setError(err.message),
            });
        } else if (initialValues) {
            update.mutate(
                { id: initialValues._id, payload },
                {
                    onSuccess: () => {
                        setOpen(false);
                        onSuccess?.();
                    },
                    onError: (err: any) => setError(err.message),
                }
            );
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button variant={type === 'create' ? 'default' : 'ghost'} size={type === 'create' ? 'default' : 'icon'}>
                        {type === 'create' ? '+ Tambah Tahun Ajaran' : <Pencil className="h-4 w-4" />}
                    </Button>
                }
            />
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="mb-5">
                        <DialogTitle>
                            {type === 'create' ? 'Tambah Tahun Ajaran' : 'Edit Tahun Ajaran'}
                        </DialogTitle>
                    </DialogHeader>

                    <FieldGroup className="mb-4 space-y-4">
                        <FormField
                            type="text"
                            label="Nama Tahun Ajaran"
                            onChange={(e) => setForm({ ...form, nama: e.target.value })}
                            placeholder="cth: 2025/2026"
                            name="nama"
                            value={form.nama}
                            required
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                type="date"
                                label="Tanggal Mulai"
                                onChange={(e) => setForm({ ...form, tanggalMulai: e.target.value })}
                                name="tanggalMulai"
                                value={form.tanggalMulai}
                                required
                            />

                            <FormField
                                type="date"
                                label="Tanggal Selesai"
                                onChange={(e) => setForm({ ...form, tanggalSelesai: e.target.value })}
                                name="tanggalSelesai"
                                value={form.tanggalSelesai || ''}
                            />
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                            <Checkbox
                                id="is_active"
                                checked={form.is_active}
                                onCheckedChange={(checked) => setForm({ ...form, is_active: Boolean(checked) })}
                            />
                            <Label htmlFor="is_active" className="cursor-pointer text-sm font-medium">
                                Set sebagai Tahun Ajaran Aktif
                            </Label>
                        </div>
                    </FieldGroup>

                    {error && <p className="text-sm text-destructive mb-3">{error}</p>}

                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Batal</Button>} />
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                'Simpan'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DialogTahunAjaran;
