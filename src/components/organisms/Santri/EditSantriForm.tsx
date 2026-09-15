import { Accordion } from '@/components/ui/accordion';
import { Save, Undo2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { useEffect, useState, type FormEvent } from 'react';
import type { CreateSantriPayload, Santri } from '@/types/Santri';
import { Link, useNavigate } from 'react-router-dom';
import { santriService } from '@/services/santri.service';
import { tahunAjaranService } from '@/services/tahunAjaran.service';
import { kelasSantriService } from '@/services/kelasSantri.service';
import { riwayatKelasNgajiService } from '@/services/riwayatKelasNgaji.service';
import DataDiriSection from './DataDiriSection';
import DataAlamatSection from './DataAlamatSection';
import DataOrangTuaSection from './DataOrangTuaSection';
import DataPendidikanSection from './DataPendidikanSection';
import DataAsramaSekolah from './DataAsramaSekolah';
import type { TingkatKelas } from '@/types/TingkatKelas';
import type { TingkatNgaji } from '@/types/TingkatNgaji';
import { toast } from '@/hooks/use-toast';

interface PropTypes {
    id: string;
}

const EditSantriForm = ({ id }: PropTypes) => {
    const navigate = useNavigate();
    const [data, setData] = useState<Santri>();
    const [currentTingkatKelasId, setCurrentTingkatKelasId] = useState<string>('');
    const [currentTingkatNgajiId, setCurrentTingkatNgajiId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const newTingkatKelasId = formData.get('tingkatKelasId') as string;
        const newTingkatNgajiId = formData.get('tingkatNgajiId') as string;

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

            if (newTingkatKelasId !== currentTingkatKelasId || newTingkatNgajiId !== currentTingkatNgajiId) {
                try {
                    const taRes = await tahunAjaranService.getAllTahunAjaran();
                    const activeTa = taRes.data?.find((t) => t.is_active) || taRes.data?.[0];

                    if (activeTa) {
                        if (newTingkatKelasId && newTingkatKelasId !== currentTingkatKelasId) {
                            await kelasSantriService.create({
                                santriId: id,
                                tahunAjaranId: activeTa._id,
                                tingkatKelasId: newTingkatKelasId,
                                status: 'aktif',
                            });
                        }
                        if (newTingkatNgajiId && newTingkatNgajiId !== currentTingkatNgajiId) {
                            await riwayatKelasNgajiService.create({
                                santriId: id,
                                tahunAjaranId: activeTa._id,
                                tingkatNgajiId: newTingkatNgajiId,
                            });
                        }
                    }
                } catch (assignErr) {
                    console.error('Gagal memperbarui tingkat kelas/ngaji:', assignErr);
                }
            }

            toast({
                variant: 'success',
                title: 'Berhasil',
                description: 'Data Santri berhasil diperbarui',
            });
            navigate(`/dashboard/santri/view/${id}`);
        } catch (err) {
            const errMsg = (err as Error).message;
            setError(errMsg);
            toast({
                variant: 'destructive',
                title: 'Gagal',
                description: errMsg || 'Gagal memperbarui data santri',
            });
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
                const [santriRes, kelasRes, ngajiRes] = await Promise.all([
                    santriService.getSantriById(id),
                    kelasSantriService.getAll({ santriId: id }),
                    riwayatKelasNgajiService.getAll({ santriId: id }),
                ]);

                if (!cancelled) {
                    setData(santriRes.data);

                    const activeKelas = kelasRes.data?.find(k => k.status === 'aktif') || kelasRes.data?.[kelasRes.data.length - 1];
                    if (activeKelas) {
                        const tkObj = activeKelas.tingkatKelasId as TingkatKelas;
                        setCurrentTingkatKelasId(typeof tkObj === 'string' ? tkObj : tkObj?._id || '');
                    }

                    const activeNgaji = ngajiRes.data?.[ngajiRes.data.length - 1];
                    if (activeNgaji && activeNgaji.tingkatNgajiId) {
                        const tnObj = activeNgaji.tingkatNgajiId as TingkatNgaji;
                        setCurrentTingkatNgajiId(typeof tnObj === 'string' ? tnObj : tnObj?._id || '');
                    }
                }
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
            <Accordion defaultValue={['data-diri', 'data-asrama-sekolah']} className="flex flex-col gap-5 w-full">
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
                        tingkatKelasId: currentTingkatKelasId,
                        tingkatNgajiId: currentTingkatNgajiId,
                    }}
                />
            </Accordion>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex w-full justify-end gap-2">
                <Link to='/dashboard/santri'>
                    <Button variant="outline">
                        <Undo2 className="w-4 h-4 mr-1" />
                        Kembali
                    </Button>
                </Link>
                <Button type="submit" disabled={isSaving}>
                    <Save className="w-4 h-4 mr-1" />
                    {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
            </div>
        </form>
    );
};

export default EditSantriForm;
