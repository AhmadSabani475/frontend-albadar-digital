import { Accordion } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { Undo2, Pencil } from 'lucide-react';
import { Button } from '../../ui/button';
import { useEffect, useState } from 'react';
import type { Santri } from '@/types/Santri';
import { Link } from 'react-router-dom';
import { santriService } from '@/services/santri.service';
import DataDiriSection from './DataDiriSection';
import DataAlamatSection from './DataAlamatSection';
import DataOrangTuaSection from './DataOrangTuaSection';
import DataPendidikanSection from './DataPendidikanSection';
import DataAsramaSekolah from './DataAsramaSekolah';
import DataRiwayatPembayaran from './DataRiwayatPembayaran';
import DataRiwayatAkademik from './DataRiwayatAkademik';

type ViewDataSantriProps = {
    id: string;
};

const ViewDataSantri = ({ id }: ViewDataSantriProps) => {
    const [data, setData] = useState<Santri>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        let cancelled = false;

        const fetchDataById = async () => {
            setIsLoading(true);
            setError('');
            try {
                const result = await santriService.getSantriById(id);
                console.log(result.data)
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
        return (
            <div className="w-full flex flex-col gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-2xl" />
                ))}
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-destructive py-10">{error}</p>;
    }

    if (!data) {
        return <p className="text-center text-gray-500 py-10">Data tidak ditemukan</p>;
    }

    return (
        <div className="flex flex-col items-center gap-3">
            <fieldset disabled className="w-full contents">
                <Accordion defaultValue={['data-diri', 'data-alamat', 'data-ortu', 'data-pendidikan', 'data-asrama-sekolah', 'riwayat-akademik', 'riwayat-pembayaran']} className="w-full flex flex-col gap-5">
                    <DataDiriSection
                        disabled
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
                        readOnly
                        initialValues={{
                            kamarId: typeof data.kamarId === 'string' ? data.kamarId : data.kamarId?._id,
                            sekolahId: typeof data.sekolahId === 'string' ? data.sekolahId : data.sekolahId?._id,
                            laundry: data.laundry,
                        }}
                    />
                    <DataRiwayatAkademik santriId={id} />
                    <DataRiwayatPembayaran
                        santriId={id}
                        santri={data} />
                </Accordion>
            </fieldset>

            <div className="flex w-full justify-end gap-2">
                <Link to="/dashboard/santri">
                    <Button variant="outline">
                        <Undo2 className="w-4 h-4 mr-1" />
                        Kembali
                    </Button>
                </Link>
                <Link to={`/dashboard/santri/edit/${id}`}>
                    <Button>
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit Data
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ViewDataSantri;
