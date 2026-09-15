import { User, Wallet } from 'lucide-react';
import { Button } from '../../ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { FieldGroup } from '../../ui/field';
import FormField from '../../molecules/FormField';
import {  useState, type SubmitEvent } from 'react';

import { JenisTagihanService } from '@/services/jenisTagihan.service';
import { Switch } from '../../ui/switch';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Label } from '../../ui/label';

interface PropTypes {
    onSuccess?: () => void;
}
const CreateJenisTagihan = ({ onSuccess }: PropTypes) => {
    const [nama, setNama] = useState<string>('');
    const [tipePeriode, setTipePeriode] = useState<string>('bulanan');
    const [nominalDefault, setNominalDefault] = useState<number>(0);
    const [wajib, setWajib] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);


    const handleSubmitCreateJenis = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await JenisTagihanService.createJenisTagihan(nama, tipePeriode, nominalDefault, wajib);
            setNama('');
            setTipePeriode('bulanan');
            setNominalDefault(0);
            setWajib(false);
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
            <DialogTrigger render={<Button>+ Tambah Jenis</Button>} />
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmitCreateJenis}>
                    <DialogHeader className="mb-5">
                        <DialogTitle>Tambah Jenis Tagihan</DialogTitle>
                    </DialogHeader>
                    <FieldGroup className="mb-4">
                        <FormField type="text" label="Nama"
                            onChange={(e) => setNama(e.target.value)}
                            placeholder="Masukkan Nama Tagihan"
                            name="nama" Icon={User} value={nama} required={true} />
                        <div className="flex flex-col  gap-2">
                            <Label>Tipe Periode</Label>
                            <RadioGroup value={tipePeriode} onValueChange={setTipePeriode} className="w-fit flex ">
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="bulanan" id="bulanan" />
                                    <Label htmlFor="bulanan">Bulanan</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="tahunan" id="tahunan" />
                                    <Label htmlFor="tahunan">Tahunan</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="sekali" id="sekali" />
                                    <Label htmlFor="sekali">Sekali</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <FormField type="number" label="Nominal"
                            onChange={(e) => setNominalDefault(Number(e.target.value))}
                            placeholder="Masukkan Nominal Tagihan"
                            name="nominalDefault" Icon={Wallet} value={nominalDefault} required={true} />

                        <div className="flex items-center gap-2">
                            <Switch checked={wajib} onCheckedChange={setWajib} />
                            <Label>Wajib</Label>
                        </div>

                    </FieldGroup>
                    {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Batal</Button>} />
                        <Button type="submit">{isLoading ? 'Menyimpan...' : 'Simpan Tagihan'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
};

export default CreateJenisTagihan;
