
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import FormField from '@/components/molecules/FormField';
import SelectField from '@/components/molecules/SelectField';
import { MapPinHouse, Save, UserRound, UsersRound } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useState, type SubmitEvent } from 'react';
import { kamarService } from '@/services/kamar.service';
import type { CreateSantriPayload } from '@/types/Santri';
import { useNavigate } from 'react-router-dom';
import { santriService } from '@/services/santri.service';
import type { Kamar } from '@/types/Kamar';
import { sekolahService } from '@/services/sekolah.service';
import type { Sekolah } from '@/types/Sekolah';
import DataDiriSection from './DataDiriSection';
import DataAlamatSection from './DataAlamatSection';
import DataOrangTuaSection from './DataOrangTuaSection';

const AddSantriForm = () => {
    const navigate = useNavigate();
    const [kamarGroups, setKamarGroups] = useState<{ groupLabel: string; options: { label: string; value: string }[] }[]>([]);
    const [sekolahGroups, setSekolahGroups] = useState<{ groupLabel: string; options: { label: string; value: string }[] }[]>([]);
    const [pendidikanTerakhir, setPendidikanTerakhir] = useState('');
    const [sekolahId, setSekolahId] = useState<string>('');
    const [kamarId, setKamarId] = useState<string>('');
    const [laundry, setLaundry] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const santri: CreateSantriPayload = {
            nik: formData.get('nik') as string | undefined,
            nis: formData.get('nis') as string | undefined,
            namaLengkap: formData.get('namaLengkap') as string,
            jenisKelamin: formData.get('jenisKelamin') as 'L' | 'P',
            tempatLahir: formData.get('tempatLahir') as string,
            tanggalLahir: formData.get('tanggalLahir') as string,
            fotoUrl: formData.get('fotoUrl') as string | undefined,
            anakKe: formData.get('anakKe') ? Number(formData.get('anakKe')) : undefined,
            jumlahSaudara: formData.get('jumlahSaudara') ? Number(formData.get('jumlahSaudara')) : undefined,
            noHp: formData.get('noHp') as string | undefined,
            noKk: formData.get('noKk') as string | undefined,
            namaKepalaKeluarga: formData.get('namaKepalaKeluarga') as string | undefined,
            pendidikanTerakhir: {
                jenjangTerakhir: formData.get('pendidikanTerakhir.jenjangTerakhir') as string,
                namaSekolah: formData.get('pendidikanTerakhir.namaSekolah') as string,
                tahunMasuk: formData.get('pendidikanTerakhir.tahunMasuk') as string,
                tahunLulus: formData.get('pendidikanTerakhir.tahunLulus') as string,
            },
            ayah: {
                nik: formData.get('ayah.nik') as string | undefined,
                statusHidup: formData.get('ayah.statusHidup') as 'Hidup' | 'Meninggal',
                nama: formData.get('ayah.nama') as string,
                pendidikan: formData.get('ayah.pendidikan') as string | undefined,
                pekerjaan: formData.get('ayah.pekerjaan') as string | undefined,
                noHp: formData.get('ayah.noHp') as string | undefined,
            },
            ibu: {
                nik: formData.get('ibu.nik') as string | undefined,
                statusHidup: formData.get('ibu.statusHidup') as 'Hidup' | 'Meninggal',
                nama: formData.get('ibu.nama') as string,
                pendidikan: formData.get('ibu.pendidikan') as string | undefined,
                pekerjaan: formData.get('ibu.pekerjaan') as string | undefined,
                noHp: formData.get('ibu.noHp') as string | undefined,
            },
            alamat: {
                jalan: formData.get('alamat.jalan') as string,
                rtRw: formData.get('alamat.rtRw') as string | undefined,
                kodeDesaKelurahan: formData.get('alamat.kodeDesaKelurahan') as string,
                desaKelurahan: formData.get('alamat.desaKelurahan') as string,
                kodeKecamatan: formData.get('alamat.kodeKecamatan') as string,
                kecamatan: formData.get('alamat.kecamatan') as string,
                kodeKabupatenKota: formData.get('alamat.kodeKabupatenKota') as string,
                kabupatenKota: formData.get('alamat.kabupatenKota') as string,
                kodeProvinsi: formData.get('alamat.kodeProvinsi') as string,
                provinsi: formData.get('alamat.provinsi') as string,
                kodePos: formData.get('alamat.kodePos') as string | undefined
            },
            kamarId: kamarId,
            sekolahId: sekolahId,
            laundry: laundry
        };

        try {
            setIsLoading(true);
            setError('');
            await santriService.createSantri(santri);
            navigate('/dashboard/santri');
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const getAllKamar = async () => {
        try {
            const result = await kamarService.getAllKamar();
            const options = result.data.map((kamar: Kamar) => ({
                label: `${kamar.asramaId?.namaAsrama ?? '-'} - ${kamar.namaKamar}`,
                value: kamar._id,
            }));
            setKamarGroups([{ groupLabel: 'Pilih Kamar', options }]);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllSchool = async () => {
        try {
            const result = await sekolahService.getAllSchool();
            const options = result.data.map((sekolah: Sekolah) => ({
                label: `${sekolah.nama} - ${sekolah.jenjang}`,
                value: sekolah._id,
            }));
            setSekolahGroups([{ groupLabel: 'Pilih Sekolah', options }]);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllKamar()
        getAllSchool()
    }, []);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
            <Accordion defaultValue={['data-diri', 'data-ortu', 'alamat', 'kamar-akun']} className="flex flex-col gap-5">
                <DataDiriSection />
                <DataAlamatSection />
                <DataOrangTuaSection />
            </Accordion>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full text-xl hover:text-green-400 hover:font-bold bg-green-400 p-5">
                <Save />
                {isLoading ? 'menyimpan' : 'Simpan Profil'}
            </Button>
        </form>
    );
};

export default AddSantriForm;