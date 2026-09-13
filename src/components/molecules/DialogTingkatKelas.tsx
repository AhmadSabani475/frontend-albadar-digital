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
import SearchableSelectField from "./SearchableSelectField";
import type { PayloadTingkatKelas, TingkatKelas } from "@/types/TingkatKelas";
import type { Sekolah } from "@/types/Sekolah";
import { sekolahService } from "@/services/sekolah.service";
import { useTingkatKelasMutation } from "@/hooks/use-tingkat-kelas-mutation";

interface PropTypes {
    type: 'create' | 'update';
    initialValues?: TingkatKelas;
    onSuccess?: () => void;
}

const defaultForm: PayloadTingkatKelas = {
    nama: '',
    sekolahId: '',
    urutan: 1,
};

const DialogTingkatKelas = ({ type, initialValues, onSuccess }: PropTypes) => {
    const [form, setForm] = useState<PayloadTingkatKelas>(defaultForm);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [sekolahList, setSekolahList] = useState<Sekolah[]>([]);

    const sekolahOptions = sekolahList.map((s) => ({
        label: s.nama,
        value: s._id,
    }));

    useEffect(() => {
        const fetchSekolah = async () => {
            try {
                const result = await sekolahService.getAllSchool();
                setSekolahList(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSekolah();
    }, []);

    const { create, update } = useTingkatKelasMutation();
    const isLoading = create.isPending || update.isPending;

    useEffect(() => {
        if (type === 'update' && initialValues) {
            const { _id, ...rest } = initialValues;
            setForm({
                ...rest,
                sekolahId: rest.sekolahId._id, 
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
                        {type === 'create' ? '+ Tambah Tingkat Kelas' : <Pencil className="h-4 w-4" />}
                    </Button>
                }
            />
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="mb-5">
                        <DialogTitle>
                            {type === 'create' ? 'Tambah Tingkat Kelas' : 'Edit Tingkat Kelas'}
                        </DialogTitle>
                    </DialogHeader>

                    <FieldGroup className="mb-4">
                        <FormField
                            type="text"
                            label="Nama"
                            onChange={(e) => setForm({ ...form, nama: e.target.value })}
                            placeholder="cth: Kelas 7"
                            name="nama"
                            value={form.nama}
                            required
                        />

                        <SearchableSelectField
                            label="Sekolah"
                            name="sekolahId"
                            placeholder="Pilih sekolah"
                            value={form.sekolahId}
                            onChange={(value) => setForm({ ...form, sekolahId: value })}
                            options={sekolahOptions}
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

export default DialogTingkatKelas;