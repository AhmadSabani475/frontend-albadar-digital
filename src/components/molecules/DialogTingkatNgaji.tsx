import { useTingkatNgajiMutation } from "@/hooks/use-tingkat-ngaji-mutation";
import type { PayloadTingkatNgaji, TingkatNgaji } from "@/types/TingkatNgaji";
import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2, Pencil } from "lucide-react";
import { FieldGroup } from "../ui/field";
import FormField from "./FormField";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

interface PropTypes {
    type: 'create' | 'update';
    initialValues?: TingkatNgaji;
    onSuccess?: () => void;
}

const defaultForm: PayloadTingkatNgaji = {
    nama: '',
    isCheckpoint: false,
    urutan: 1,
};

const DialogTingkatNgaji = ({ type, initialValues, onSuccess }: PropTypes) => {
    const [form, setForm] = useState<PayloadTingkatNgaji>(defaultForm);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);


    const { create, update } = useTingkatNgajiMutation();
    const isLoading = create.isPending || update.isPending;

    useEffect(() => {
        if (type === 'update' && initialValues) {
            const { _id, ...rest } = initialValues;
            setForm({
                ...rest,
            });
        } else {
            setForm(defaultForm);
        }
    }, [initialValues, type, open]);

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (type === 'create') {
            create.mutate(form, {
                onSuccess: () => {
                    setOpen(false);
                    onSuccess?.();
                },
                onError: (err) => setError(err.message),
            });
        } else if (initialValues) {
            update.mutate(
                { id: initialValues._id, payload: form },
                {
                    onSuccess: () => {
                        setOpen(false);
                        onSuccess?.();
                    },
                    onError: (err) => setError(err.message),
                }
            );
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button variant={type === 'create' ? 'default' : 'ghost'} size={type === 'create' ? 'default' : 'icon'}>
                        {type === 'create' ? '+ Tambah Tingkat Ngaji' : <Pencil className="h-4 w-4" />}
                    </Button>
                }
            />
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="mb-5">
                        <DialogTitle>
                            {type === 'create' ? 'Tambah Tingkat Ngaji' : 'Edit Tingkat Ngaji'}
                        </DialogTitle>
                    </DialogHeader>

                    <FieldGroup className="mb-4">
                        <FormField
                            type="text"
                            label="Nama"
                            onChange={(e) => setForm({ ...form, nama: e.target.value })}
                            placeholder="cth: Ngaji 7"
                            name="nama"
                            value={form.nama}
                            required
                        />

                        <FormField
                            type="number"
                            label="Urutan"
                            onChange={(e) => setForm({ ...form, urutan: Number(e.target.value) })}
                            placeholder="cth: 1"
                            name="urutan"
                            value={form.urutan}
                            required
                        />

                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                                <Label htmlFor="isCheckpoint">Titik Keputusan (Checkpoint)</Label>
                                <p className="text-xs text-muted-foreground">
                                    Santri di tingkat ini butuh peninjauan manual saat kenaikan kelas
                                </p>
                            </div>
                            <Switch
                                id="isCheckpoint"
                                checked={form.isCheckpoint}
                                onCheckedChange={(checked) => setForm({ ...form, isCheckpoint: checked })}
                            />
                        </div>
                    </FieldGroup>

                    {error && <p className="text-sm text-destructive mt-2">{error}</p>}

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

export default DialogTingkatNgaji;