import { Wallet } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { FieldGroup } from '../ui/field';
import FormField from './FormField';
import { useState, type SubmitEvent } from 'react';
import SelectField from './SelectField';
import { mutasiService } from '@/services/mutasi.service';

interface PropTypes {
    onSuccess?: () => void;
    rekeningId: string | undefined;
}


const CreateMutasiDialog = ({ onSuccess, rekeningId }: PropTypes) => {
    const [kategori, setKategori] = useState<'harian' | 'manual'>('manual');
    const [jenis, setJenis] = useState<'setor' | 'tarik'>('setor');
    const [nominal, setNominal] = useState<number>(0);
    const [keterangan, setKeterangan] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);


    const handleSubmitCreateMutasi = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await mutasiService.createMutasi({ rekeningId, jenis, kategori, nominal, keterangan })
            setJenis('setor');
            setKategori('manual');
            setNominal(0);
            setKeterangan('');
            setOpen(false);
            onSuccess?.();
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button>+ Buat Mutasi</Button>} />
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmitCreateMutasi}>
                    <DialogHeader className="mb-5">
                        <DialogTitle>Buat Mutasi Rekening Santri</DialogTitle>
                    </DialogHeader>
                    <FieldGroup className="mb-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-300">Jenis Transaksi</label>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setJenis('setor')}
                                    className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${jenis === 'setor'
                                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
                                        : 'border-gray-700 text-gray-400 hover:border-gray-600 bg-transparent'
                                        }`}
                                >
                                    Setor
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setJenis('tarik')}
                                    className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${jenis === 'tarik'
                                        ? 'border-rose-400 bg-rose-400/10 text-rose-400'
                                        : 'border-gray-700 text-gray-400 hover:border-gray-600 bg-transparent'
                                        }`}
                                >
                                    Tarik
                                </button>
                            </div>
                        </div>
                        <SelectField
                            label="Kategori"
                            name="kategori"
                            value={kategori}
                            onChange={(val) => setKategori(val as 'manual' | 'harian')}
                            groups={[
                                {
                                    groupLabel: 'Pilih Kategori', options: [
                                        { label: 'Harian', value: 'harian' },
                                        { label: 'Manual', value: 'manual' },
                                    ]
                                }
                            ]}
                            placeholder="Pilih Kategori"
                        />
                        <FormField type="number" label="Nominal"
                            onChange={(e) => setNominal(Number(e.target.value))}
                            placeholder="Masukkan Nominal"
                            name="nominal" Icon={Wallet} value={nominal} required={true} />
                        <FormField type="text" label="Keterangan"
                            onChange={(e) => setKeterangan(e.target.value)}
                            placeholder="Contoh: Berobat"
                            name="keterangan" value={keterangan} />
                    </FieldGroup>
                    {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Batal</Button>} />
                        <Button type="submit">{isLoading ? 'Loading...' : 'Buat Mutasi'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
};

export default CreateMutasiDialog;