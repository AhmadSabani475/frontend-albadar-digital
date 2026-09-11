
import { Accordion } from '@/components/ui/accordion';
import { Save, Undo2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useState, type SubmitEvent } from 'react';
import type { CreateSantriPayload } from '@/types/Santri';
import { Link, useNavigate } from 'react-router-dom';
import { santriService } from '@/services/santri.service';
import DataDiriSection from './DataDiriSection';
import DataAlamatSection from './DataAlamatSection';
import DataOrangTuaSection from './DataOrangTuaSection';
import DataPendidikanSection from './DataPendidikanSection';
import DataAsramaSekolah from './DataAsramaSekolah';

const AddSantriForm = () => {
    const navigate = useNavigate();
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
            kamarId: formData.get('kamarId') as string,
            sekolahId: formData.get('sekolahId') as string,
            laundry: formData.get('laundry') === 'true',
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


    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
            <Accordion defaultValue={['data-diri']} className="flex flex-col gap-5">
                <DataDiriSection />
                <DataAlamatSection />
                <DataOrangTuaSection />
                <DataPendidikanSection />
                <DataAsramaSekolah />
            </Accordion>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex w-full justify-end gap-2">
                <Link to='/dashboard/santri'>
                    <Button variant="outline" className="text-md p-5 cursor-pointer">
                        <Undo2 className="w-4 h-4 mr-1" />
                        Kembali
                    </Button>
                </Link>
                <Button type="submit" disabled={isLoading} className="text-md p-5 cursor-pointer">
                    <Save className="w-4 h-4 mr-1" />
                    {isLoading ? 'Menyimpan...' : 'Simpan Profil'}
                </Button>


            </div>

        </form>
    );
};

export default AddSantriForm;