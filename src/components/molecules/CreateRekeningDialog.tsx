import { Wallet } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { FieldGroup } from '../ui/field';
import FormField from './FormField';
import { useEffect, useState, type SubmitEvent } from 'react';
import type { Santri } from '@/types/Santri';
import { santriService } from '@/services/santri.service';
import SearchableSelectField from './SearchableSelectField';
import SelectField from './SelectField';
import { rekeningService } from '@/services/rekening.service';

interface PropTypes {
    onSuccess?: () => void;
}


const CreateRekeningDialog = ({ onSuccess }: PropTypes) => {
    const [santriId, setSantriId] = useState("");
    const [santriData, setSantriData] = useState<Santri[]>([]);
    const [jenisRekening, setJenisRekening] = useState("uang_jajan");
    const [nominalHarian, setNominalHarian] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);

    const fetchSantri = async () => {
        try {
            const result = await santriService.getAllSantri();
            setSantriData(result.data);
        
        } catch (error) {
            console.log(error);
        }
    }

    const handleJenisChange = (value: string) => {
        setJenisRekening(value);
        if (value !== 'uang_jajan') setNominalHarian(undefined);
    };


    const handleSubmitCreateRekening = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!santriId) {
            setError('Santri wajib dipilih');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            await rekeningService.createRekening({ santriId, jenisRekening, nominalHarian });
            setSantriId("");
            setJenisRekening('uang_jajan');
            setNominalHarian(undefined);
            setOpen(false);
            onSuccess?.();
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSantri();
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button>+ Buat Rekening</Button>} />
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmitCreateRekening}>
                    <DialogHeader className="mb-5">
                        <DialogTitle>Buat Rekening Santri</DialogTitle>
                    </DialogHeader>
                    <FieldGroup className="mb-4">
                        <SearchableSelectField
                            label="Santri"
                            name="santriId"
                            value={santriId}
                            onChange={setSantriId}
                            options={(santriData ?? []).map((s) => ({
                                label: s.namaLengkap,
                                value: s._id,
                            }))}
                            placeholder="Pilih Santri"
                        />
                        <SelectField
                            label="Jenis Rekening"
                            name="jenisRekeningId"
                            value={jenisRekening}
                            onChange={handleJenisChange}
                            groups={[
                                {
                                    groupLabel: 'Pilih Jenis Rekening', options: [
                                        { label: 'Uang Jajan', value: 'uang_jajan' },
                                        { label: 'Tabungan Ziarah', value: 'tabungan_ziarah' },
                                    ]
                                }
                            ]}
                            placeholder="Pilih Jenis Rekening"
                        />
                        {jenisRekening === 'uang_jajan' && (
                            <FormField type="number" label="Nominal Harian"
                                onChange={(e) => setNominalHarian(Number(e.target.value))}
                                placeholder="Masukkan Nominal Harian"
                                name="nominalHarian" Icon={Wallet} value={nominalHarian} required={true} />
                        )}
                    </FieldGroup>
                    {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Batal</Button>} />
                        <Button type="submit">{isLoading ? 'Loading...' : 'Buat Rekening'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
};

export default CreateRekeningDialog;