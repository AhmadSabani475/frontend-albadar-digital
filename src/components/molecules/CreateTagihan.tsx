import { Calendar, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { FieldGroup } from '../ui/field';
import FormField from './FormField';
import { useEffect, useState, type SubmitEvent, } from 'react';

import { JenisTagihanService } from '@/services/jenisTagihan.service';

import { santriService } from '@/services/santri.service';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import type { Santri } from '@/types/Santri';
import type { JenisTagihan } from '@/types/Tagihan';
import SelectField from './SelectField';
import { tagihanService } from '@/services/tagihan.service';
import MultiSelectField from './MultiSelectField';

interface PropTypes {
    onSuccess?: () => void;
}

interface HasilGenerate {
    berhasil: unknown[];
    dilewati: { santriId: string; nama: string; alasan: string }[];
}

const CreateTagihan = ({ onSuccess }: PropTypes) => {
    const [jenisTagihanId, setJenisTagihanId] = useState<string>('');
    const [jenisTagihanList, setJenisTagihanList] = useState<JenisTagihan[]>([]);
    const [periode, setPeriode] = useState<string>('');
    const [jatuhTempo, setJatuhTempo] = useState<string>('');
    const [target, setTarget] = useState<'semua_aktif' | 'custom' | 'laundry'>('semua_aktif');
    const [santriData, setSantriData] = useState<Santri[]>([]);
    const [santriIdsTerpilih, setSantriIdsTerpilih] = useState<string[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [hasil, setHasil] = useState<HasilGenerate | null>(null);

    const fetchJenisTagihan = async () => {
        try {
            const result = await JenisTagihanService.getAllJenisTagihan();
            setJenisTagihanList(result.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchSantri = async () => {
        try {
            const result = await santriService.getAllSantri();
            setSantriData(result.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchJenisTagihan();
        fetchSantri();
    }, []);

    const santriAktif = santriData.filter((s) => s.status === 'aktif');
    const santriLaundry = santriAktif.filter((s) => s.laundry);

    const jumlahTarget =
        target === 'semua_aktif' ? santriAktif.length :
            target === 'laundry' ? santriLaundry.length :
                santriIdsTerpilih.length;

    const resetForm = () => {
        setJenisTagihanId('');
        setPeriode('');
        setJatuhTempo('');
        setTarget('semua_aktif');
        setSantriIdsTerpilih([]);
        setHasil(null);
        setError('');
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!jenisTagihanId || !periode || !jatuhTempo) {
            setError('Jenis tagihan, periode, dan jatuh tempo wajib diisi');
            return;
        }
        if (target === 'custom' && santriIdsTerpilih.length === 0) {
            setError('Pilih minimal 1 santri');
            return;
        }

        setIsLoading(true);
        try {
            const result = await tagihanService.generateBulkTagihan({
                jenisTagihanId,
                periode,
                jatuhTempo,
                target: target === 'custom' ? 'custom' : 'semua_aktif',
                santriIds: target === 'custom' ? santriIdsTerpilih : undefined,
                hanyaLayananLaundry: target === 'laundry',
            });
            setHasil(result.data);
            onSuccess?.();
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogTrigger render={<Button>+ Generate Tagihan</Button>} />
            <DialogContent className="sm:max-w-md">
                {!hasil ? (
                    <form onSubmit={handleSubmit}>
                        <DialogHeader className="mb-5">
                            <DialogTitle>Generate Tagihan</DialogTitle>
                        </DialogHeader>
                        <FieldGroup className="mb-4">
                            <SelectField
                                label="Jenis Tagihan"
                                name="jenisTagihanId"
                                value={jenisTagihanId}
                                onChange={setJenisTagihanId}
                                groups={[{
                                    groupLabel: 'Jenis Tagihan',
                                    options: jenisTagihanList.map((jt) => ({ label: jt.nama, value: jt._id })),
                                }]}
                                placeholder="Pilih Jenis Tagihan"
                            />
                            <FormField type="month" label="Periode"
                                onChange={(e) => setPeriode(e.target.value)}
                                placeholder="Pilih Periode"
                                name="periode" Icon={Calendar} value={periode} required={true} />
                            <FormField type="date" label="Jatuh Tempo"
                                onChange={(e) => setJatuhTempo(e.target.value)}
                                placeholder="Pilih Jatuh Tempo"
                                name="jatuhTempo" Icon={Calendar} value={jatuhTempo} required={true} />

                            <div className="flex flex-col gap-2">
                                <Label>Target Santri</Label>
                                <RadioGroup value={target} onValueChange={(v) => setTarget(v as typeof target)} className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="semua_aktif" id="semua_aktif" />
                                        <Label htmlFor="semua_aktif">Semua santri aktif ({santriAktif.length})</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="laundry" id="laundry" />
                                        <Label htmlFor="laundry">Khusus berlangganan laundry ({santriLaundry.length})</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="custom" id="custom" />
                                        <Label htmlFor="custom">Pilih santri manual</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {target === 'custom' && (
                                <MultiSelectField
                                    label="Pilih Santri"
                                    name="santriIds"
                                    value={santriIdsTerpilih}
                                    onChange={setSantriIdsTerpilih}
                                    options={santriAktif.map((s) => ({ label: s.namaLengkap, value: s._id }))}
                                    placeholder="Cari santri..."
                                />
                            )}

                            <div className="flex items-center gap-2 text-sm text-neutral-400 border-t border-neutral-700 pt-3">
                                <Users className="h-4 w-4" />
                                <span>Akan men-generate tagihan untuk <strong className="text-white">{jumlahTarget}</strong> santri</span>
                            </div>
                        </FieldGroup>
                        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                        <DialogFooter>
                            <DialogClose render={<Button variant="outline">Batal</Button>} />
                            <Button type="submit" disabled={isLoading || jumlahTarget === 0}>
                                {isLoading ? 'Memproses...' : 'Proses Generate Tagihan'}
                            </Button>
                        </DialogFooter>
                    </form>
                ) : (
                    <div>
                        <DialogHeader className="mb-4">
                            <DialogTitle>Hasil Generate Tagihan</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Badge className="bg-emerald-500/20 text-emerald-300 border-0">
                                    {hasil.berhasil.length} berhasil
                                </Badge>
                                {hasil.dilewati.length > 0 && (
                                    <Badge className="bg-amber-500/20 text-amber-300 border-0">
                                        {hasil.dilewati.length} dilewati
                                    </Badge>
                                )}
                            </div>
                            {hasil.dilewati.length > 0 && (
                                <div className="max-h-48 overflow-y-auto border border-neutral-700 rounded-md p-2 text-sm">
                                    {hasil.dilewati.map((d, i) => (
                                        <div key={i} className="flex justify-between py-1 text-neutral-400">
                                            <span>{d.nama}</span>
                                            <span className="text-neutral-500">{d.alasan}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <DialogFooter className="mt-4">
                            <Button onClick={() => handleClose(false)}>Tutup</Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CreateTagihan;