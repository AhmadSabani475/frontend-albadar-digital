import { Wallet } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { FieldGroup } from '../ui/field';
import FormField from './FormField';
import { useEffect, useState, type SubmitEvent } from 'react';
import { JenisTagihanService } from '@/services/jenisTagihan.service';
import type { Santri } from '@/types/Santri';
import type { JenisTagihan } from '@/types/Tagihan';
import { tarifKhususService } from '@/services/tarifKhusus.service';
import { santriService } from '@/services/santri.service';
import SearchableSelectField from './SearchableSelectField';
import SelectField from './SelectField';

interface PropTypes {
    onSuccess?: () => void;
}
const CreateTarifKhusus = ({ onSuccess }: PropTypes) => {
    const [santriId, setSantriId] = useState("");
    const [santriData, setSantriData] = useState<Santri[]>([]);
    const [jenisTagihan, setJenisTagihan] = useState<JenisTagihan[]>([]);
    const [jenisTagihanId, setJenisTagihanId] = useState("");
    const [nominalKhusus, setNominalKhusus] = useState<number>(0);
    const [keterangan, setKeterangan] = useState<string>('');
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

    const fetchJenisTagihan = async () => {
        try {
            const result = await JenisTagihanService.getAllJenisTagihan();
            setJenisTagihan(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitCreateJenis = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await tarifKhususService.createTarifKhusus(santriId, jenisTagihanId, nominalKhusus, keterangan);
            setSantriId("");
            setJenisTagihanId("");
            setNominalKhusus(0);
            setKeterangan("");
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
        fetchJenisTagihan();
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button
                className="px-4 py-2 bg-green-400 text-[#ffff]">+ Tambah Tarif Khusus</Button>} />
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmitCreateJenis}>
                    <DialogHeader className="mb-5">
                        <DialogTitle>Tambah Tarif Khusus</DialogTitle>
                    </DialogHeader>
                    <FieldGroup className="mb-4">
                        <SearchableSelectField
                            label="Santri"
                            name="santriId"
                            value={santriId}
                            onChange={setSantriId}
                            options={(santriData ?? []).map((s) => ({
                                label: s.namaLengkap, // sesuaikan field nama di type Santri
                                value: s._id,
                            }))}
                            placeholder="Pilih Santri"
                        />
                        <SelectField
                            label="Jenis Tagihan"
                            name="jenisTagihanId"
                            value={jenisTagihanId}
                            onChange={setJenisTagihanId}
                            groups={[
                                {
                                    groupLabel: "Jenis Tagihan",
                                    options: (jenisTagihan ?? []).map((jt) => ({
                                        label: jt.nama,
                                        value: jt._id,
                                    })),
                                },
                            ]}
                            placeholder="Pilih Jenis Tagihan"
                        />
                        <FormField type="number" label="Nominal"
                            onChange={(e) => setNominalKhusus(Number(e.target.value))}
                            placeholder="Masukkan Nominal Khusus"
                            name="nominalKhusus" Icon={Wallet} value={nominalKhusus} required={true} />
                        <FormField type="text" label="Keterangan"
                            onChange={(e) => setKeterangan(e.target.value)}
                            placeholder="Masukkan Alasan"
                            name="keterangan" Icon={Wallet} value={keterangan} required={false} />

                    </FieldGroup>
                    {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Batal</Button>} />
                        <Button type="submit">{isLoading ? 'Loading...' : 'Simpan Tagihan'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
};

export default CreateTarifKhusus;