
import { Accordion } from '@/components/ui/accordion';
import { Save, Undo2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useState, type SubmitEvent } from 'react';
import type { CreateSantriPayload, Santri } from '@/types/Santri';
import { Link, useNavigate } from 'react-router-dom';
import { santriService } from '@/services/santri.service';
import DataDiriSection from './DataDiriSection';
import DataAlamatSection from './DataAlamatSection';
import DataOrangTuaSection from './DataOrangTuaSection';
import DataPendidikanSection from './DataPendidikanSection';
import DataAsramaSekolah from './DataAsramaSekolah';

interface PropTypes {
    id: string;
}

const EditSantriForm = ({ id }: PropTypes) => {
    const navigate = useNavigate();
    const [data, setData] = useState<Santri>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
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
            setIsSaving(true);
            setError('');
            await santriService.editSantriById(id, santri);
            navigate(`/dashboard/santri/view/${id}`);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        let cancelled = false;

        const fetchDataById = async () => {
            setIsLoading(true);
            setError('');
            try {
                const result = await santriService.getSantriById(id);
                if (!cancelled) setData(result.data);
            } catch (err) {
                if (!cancelled) {
                    console.error(err);
                    setError('Gagal memuat data santri');
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        fetchDataById();
        return () => { cancelled = true; };
    }, [id]);

    if (isLoading) {
        return <p className="text-center text-gray-500 py-10">Memuat data...</p>;
    }

    if (error) {
        return <p className="text-center text-destructive py-10">{error}</p>;
    }

    if (!data) {
        return <p className="text-center text-gray-500 py-10">Data tidak ditemukan</p>;
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
            <Accordion defaultValue={['data-diri', 'data-alamat', 'data-ortu', 'data-pendidikan', 'data-asrama-sekolah']} className="flex flex-col gap-5">
                <DataDiriSection
                    initialValues={{
                        nik: data.nik,
                        nis: data.nis,
                        namaLengkap: data.namaLengkap,
                        jenisKelamin: data.jenisKelamin,
                        noHp: data.noHp,
                        anakKe: data.anakKe !== undefined ? String(data.anakKe) : undefined,
                        tempatLahir: data.tempatLahir,
                        tanggalLahir: data.tanggalLahir ? data.tanggalLahir.slice(0, 10) : undefined,
                        jumlahSaudara: data.jumlahSaudara !== undefined ? String(data.jumlahSaudara) : undefined,
                        fotoUrl: data.fotoUrl,
                    }}
                />
                <DataAlamatSection initialValues={data.alamat} />
                <DataOrangTuaSection
                    initialValues={{
                        noKk: data.noKk,
                        namaKepalaKeluarga: data.namaKepalaKeluarga,
                        ayah: data.ayah,
                        ibu: data.ibu,

                    }}
                />
                <DataPendidikanSection initialValues={data.pendidikanTerakhir} />
                <DataAsramaSekolah
                    initialValues={{
                        kamarId: typeof data.kamarId === 'string' ? data.kamarId : data.kamarId?._id,
                        sekolahId: typeof data.sekolahId === 'string' ? data.sekolahId : data.sekolahId?._id,
                        laundry: data.laundry,
                    }}
                />
            </Accordion>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex w-full justify-end gap-2">
                <Link to='/dashboard/santri'>
                    <Button variant="outline" className="text-md p-5 cursor-pointer">
                        <Undo2 className="w-4 h-4 mr-1" />
                        Kembali
                    </Button>
                </Link>
                <Button type="submit" disabled={isSaving} className="text-md p-5 cursor-pointer">
                    <Save className="w-4 h-4 mr-1" />
                    {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>


            </div>

        </form>
    );
};

export default EditSantriForm;