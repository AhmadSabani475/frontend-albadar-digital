import { Accordion } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Undo2, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Santri } from '@/types/Santri';
import { Link } from 'react-router-dom';
import { santriService } from '@/services/santri.service';
import { toast } from '@/hooks/use-toast';

import DetailSantriHeader from './DetailSantriHeader';
import DetailDataDiri from './DetailDataDiri';
import DetailDataAlamat from './DetailDataAlamat';
import DetailDataOrangTua from './DetailDataOrangTua';
import DetailDataPendidikan from './DetailDataPendidikan';
import DetailDataAsramaSekolah from './DetailDataAsramaSekolah';
import DataRiwayatPembayaran from './DataRiwayatPembayaran';

type ViewDataSantriProps = {
    id: string;
};

const ViewDataSantri = ({ id }: ViewDataSantriProps) => {
    const [data, setData] = useState<Santri>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    const fetchDataById = async () => {
        setIsLoading(true);
        setError('');
        try {
            const result = await santriService.getSantriById(id);
            setData(result.data);
        } catch (err) {
            console.error(err);
            setError('Gagal memuat data santri');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let cancelled = false;

        const fetch = async () => {
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

        fetch();
        return () => { cancelled = true; };
    }, [id]);

    const handleUpdateStatus = async (newStatus: 'aktif' | 'alumni') => {
        if (!data || data.status === newStatus) return;
        try {
            setIsUpdatingStatus(true);
            await santriService.updateStatus(id, newStatus);
            await fetchDataById();
            toast({
                variant: 'success',
                title: 'Status berhasil diubah',
                description: `Status santri telah diubah menjadi ${newStatus === 'aktif' ? 'Aktif' : 'Alumni'}.`,
            });
        } catch {
            toast({
                variant: 'destructive',
                title: 'Gagal mengubah status',
                description: 'Terjadi kesalahan, coba lagi.',
            });
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full flex flex-col gap-4">
                <Skeleton className="h-32 w-full rounded-2xl" />
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
        return <p className="text-center text-muted-foreground py-10">Data santri tidak ditemukan</p>;
    }

    return (
        <div className="flex flex-col items-center gap-5 w-full">
            {/* Santri Header Profile Card */}
            <DetailSantriHeader
                data={data}
                isUpdatingStatus={isUpdatingStatus}
                onUpdateStatus={handleUpdateStatus}
            />

            {/* Read-Only Details Accordion */}
            <Accordion
                defaultValue={[
                    'data-diri',
                    'data-alamat',
                    'data-ortu',
                    'data-pendidikan',
                    'data-asrama-sekolah',
                    'riwayat-pembayaran',
                ]}
                className="w-full flex flex-col gap-4"
            >
                <DetailDataDiri data={data} />
                <DetailDataAlamat alamat={data.alamat} />
                <DetailDataOrangTua data={data} />
                <DetailDataPendidikan pendidikan={data.pendidikanTerakhir} />
                <DetailDataAsramaSekolah data={data} />
                <DataRiwayatPembayaran santriId={id} santri={data} />
            </Accordion>

            {/* Bottom Actions */}
            <div className="flex w-full justify-end gap-2.5 pt-2">
                <Link to="/dashboard/santri">
                    <Button variant="outline">
                        <Undo2 className="w-4 h-4 mr-1.5" />
                        Kembali
                    </Button>
                </Link>
                <Link to={`/dashboard/santri/edit/${id}`}>
                    <Button>
                        <Pencil className="w-4 h-4 mr-1.5" />
                        Edit Data
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ViewDataSantri;
