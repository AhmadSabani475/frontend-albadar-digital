import { DoorClosed, House } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { FieldGroup } from '../ui/field';
import FormField from './FormField';
import { useEffect, useState, type SubmitEvent } from 'react';
import SelectField from './SelectField';
import { kamarService } from '@/services/kamar.service';
import { asramaService } from '@/services/asrama.service';
import type { Asrama } from '@/types/Kamar';

import { toast } from '@/hooks/use-toast';

interface PropTypes {
    onSuccess?: () => void;
}
const CreateKamarDialog = ({ onSuccess }: PropTypes) => {
    const [namaKamar, setNamaKamar] = useState<string>('');
    const [kapasitas, setKapasitas] = useState('');
    const [asramaId, setAsramaId] = useState<string>('');
    const [asramaGroups, setAsramaGroups] = useState<{ groupLabel: string; options: { label: string; value: string }[] }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        let isMounted = true;
        const fetchAsrama = async () => {
            try {
                const response = await asramaService.getAllAsrama();
                const options = response.data.map((asrama: Asrama) => ({
                    label: asrama.namaAsrama,
                    value: asrama._id,
                }));
                if (isMounted) {
                    setAsramaGroups([{ groupLabel: 'Pilih Asrama', options }]);
                }
            } catch (error) {
                console.error('Gagal mengambil data asrama:', error);
            }
        };
        fetchAsrama();
        return () => {
            isMounted = false;
        };
    }, [open]);

    const handleSubmitCreateKamar = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await kamarService.createKamar(namaKamar, asramaId, Number(kapasitas));
            toast({
                variant: 'success',
                title: 'Berhasil',
                description: `Kamar ${namaKamar} telah berhasil ditambahkan.`,
            });
            setNamaKamar('');
            setKapasitas('');
            setAsramaId('');
            setOpen(false);
            onSuccess?.();
        } catch (err) {
            const errMsg = (err as Error).message;
            setError(errMsg);
            toast({
                variant: 'destructive',
                title: 'Gagal',
                description: errMsg || 'Gagal menambahkan kamar.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button variant="outline">+ Tambah Kamar</Button>} />
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmitCreateKamar}>
                    <DialogHeader className="mb-5">
                        <DialogTitle>Tambah Kamar</DialogTitle>
                    </DialogHeader>
                    <FieldGroup className="mb-4">
                        <FormField type="text" label="Nama Kamar"
                            onChange={(e) => setNamaKamar(e.target.value)}
                            placeholder="Kamar 14"
                            name="namaKamar" Icon={House} value={namaKamar} required={true} />
                        <SelectField
                            label="Asrama"
                            name="asramaId"
                            value={asramaId}
                            onChange={setAsramaId}
                            groups={asramaGroups}
                            placeholder="Pilih Asrama" />
                        <FormField type="number" label="Kapasitas"
                            onChange={(e) => setKapasitas(e.target.value)}
                            placeholder="8"
                            name="kapasitas" Icon={DoorClosed} value={kapasitas} required={true} />
                    </FieldGroup>
                    {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Batal</Button>} />
                        <Button type="submit">{isLoading ? 'Loading...' : 'Simpan Kamar'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog >
    );
};

export default CreateKamarDialog;