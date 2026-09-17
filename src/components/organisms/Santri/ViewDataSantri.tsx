import { Accordion } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { Undo2, Pencil, ChevronDown, UserCheck, GraduationCap } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

type ViewDataSantriProps = {
    id: string;
};

const STATUS_CONFIG = {
    aktif: {
        label: 'Aktif',
        className: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 rounded-full border-0',
        icon: UserCheck,
    },
    alumni: {
        label: 'Alumni',
        className: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 rounded-full border-0',
        icon: GraduationCap,
    },
} as const;

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
                description: `Status santri telah diubah menjadi ${STATUS_CONFIG[newStatus].label}.`,
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

    const currentStatus = data.status ?? 'aktif';
    const statusInfo = STATUS_CONFIG[currentStatus];

    return (
        <div className="flex flex-col items-center gap-3">
            {/* Status bar */}
            <div className="w-full flex items-center justify-between rounded-lg border border-border bg-card p-4">
                <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge className={statusInfo.className}>
                        {statusInfo.label}
                    </Badge>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button variant="outline" size="sm" disabled={isUpdatingStatus} className="gap-1.5">
                                {isUpdatingStatus ? 'Memproses...' : 'Ubah Status'}
                                <ChevronDown className="h-3.5 w-3.5" />
                            </Button>
                        }
                    />
                    <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Ubah Status Santri</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {(Object.entries(STATUS_CONFIG) as [keyof typeof STATUS_CONFIG, typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG]][]).map(([key, config]) => {
                                const Icon = config.icon;
                                const isActive = currentStatus === key;
                                return (
                                    <DropdownMenuItem
                                        key={key}
                                        onClick={() => handleUpdateStatus(key)}
                                        className={isActive ? 'opacity-50 pointer-events-none' : ''}
                                    >
                                        <Icon className="h-4 w-4 mr-1.5" />
                                        {config.label}
                                        {isActive && <span className="ml-auto text-xs text-muted-foreground">(saat ini)</span>}
                                    </DropdownMenuItem>
                                );
                            })}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

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
