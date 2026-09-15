import AccordionSection from '../../molecules/AccordionSection';
import { GraduationCap, BookOpen } from 'lucide-react';
import { useKelasSantriQuery } from '@/hooks/use-kelas-santri-query';
import { useRiwayatKelasNgajiQuery } from '@/hooks/use-riwayat-kelas-ngaji-query';
import { Badge } from '../../ui/badge';
import { Skeleton } from '../../ui/skeleton';
import type { TahunAjaran } from '@/types/TahunAjaran';
import type { TingkatKelas } from '@/types/TingkatKelas';
import type { TingkatNgaji } from '@/types/TingkatNgaji';
import type { Sekolah } from '@/types/Sekolah';

interface DataRiwayatAkademikProps {
    santriId: string;
}

const DataRiwayatAkademik = ({ santriId }: DataRiwayatAkademikProps) => {
    const { data: kelasFormalData, isLoading: loadingKelas } = useKelasSantriQuery({ santriId });
    const { data: ngajiData, isLoading: loadingNgaji } = useRiwayatKelasNgajiQuery({ santriId });

    // Ambil data aktif / kelas terkini
    const currentKelas = kelasFormalData?.find(k => k.status === 'aktif') || kelasFormalData?.[kelasFormalData.length - 1];
    const currentNgaji = ngajiData?.[ngajiData.length - 1];

    // Data Kelas Formal
    const kelasTahunAjaran = (currentKelas?.tahunAjaranId as TahunAjaran)?.nama || '-';
    const kelasTingkat = (currentKelas?.tingkatKelasId as TingkatKelas)?.nama || '-';
    const sekolahObj = (currentKelas?.tingkatKelasId as TingkatKelas)?.sekolahId as Sekolah;
    const sekolahNama = sekolahObj ? `${sekolahObj.nama}${sekolahObj.jenjang ? ` - ${sekolahObj.jenjang}` : ''}` : '-';
    const kelasStatus = currentKelas?.status || '-';

    // Data Ngaji
    const ngajiTahunAjaran = (currentNgaji?.tahunAjaranId as TahunAjaran)?.nama || '-';
    const ngajiTingkatObj = currentNgaji?.tingkatNgajiId as TingkatNgaji;
    const ngajiTingkatNama = ngajiTingkatObj?.nama || currentNgaji?.statusLain || '-';

    return (
        <AccordionSection Icon={GraduationCap} title="Status Akademik & Ngaji" value="riwayat-akademik">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card 1 â€” Kelas Formal */}
                <div className="rounded-xl border border-border bg-card p-5 flex flex-col justify-between gap-4 shadow-xs hover:border-primary/30 transition-colors">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 border-b border-border pb-3">
                            <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <GraduationCap className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground text-base">Kelas Formal</h4>
                                <p className="text-xs text-muted-foreground">Pendidikan formal santri</p>
                            </div>
                        </div>

                        {loadingKelas ? (
                            <div className="space-y-2 py-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        ) : !currentKelas ? (
                            <p className="text-xs text-muted-foreground py-4 text-center">Belum terdaftar di kelas formal</p>
                        ) : (
                            <div className="space-y-2 text-sm pt-1">
                                <div className="flex justify-between items-center text-xs sm:text-sm">
                                    <span className="text-muted-foreground">Tahun Ajaran</span>
                                    <span className="font-medium text-foreground">{kelasTahunAjaran}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs sm:text-sm">
                                    <span className="text-muted-foreground">Kelas</span>
                                    <span className="font-semibold text-primary">{kelasTingkat}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs sm:text-sm">
                                    <span className="text-muted-foreground">Sekolah</span>
                                    <span className="font-medium text-foreground text-right">{sekolahNama}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs sm:text-sm pt-1">
                                    <span className="text-muted-foreground">Status</span>
                                    {kelasStatus === 'aktif' ? (
                                        <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-700 gap-1.5 text-xs font-medium">
                                            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                                            Aktif
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-xs">{kelasStatus}</Badge>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Card 2 â€” Tingkat Ngaji */}
                <div className="rounded-xl border border-border bg-card p-5 flex flex-col justify-between gap-4 shadow-xs hover:border-primary/30 transition-colors">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 border-b border-border pb-3">
                            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                <BookOpen className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground text-base">Tingkat Ngaji</h4>
                                <p className="text-xs text-muted-foreground">Pendidikan ngaji non-formal</p>
                            </div>
                        </div>

                        {loadingNgaji ? (
                            <div className="space-y-2 py-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        ) : !currentNgaji ? (
                            <p className="text-xs text-muted-foreground py-4 text-center">Belum terdaftar di tingkat ngaji</p>
                        ) : (
                            <div className="space-y-2 text-sm pt-1">
                                <div className="flex justify-between items-center text-xs sm:text-sm">
                                    <span className="text-muted-foreground">Tahun Ajaran</span>
                                    <span className="font-medium text-foreground">{ngajiTahunAjaran}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs sm:text-sm">
                                    <span className="text-muted-foreground">Tingkat</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-semibold text-primary">{ngajiTingkatNama}</span>
                                        {ngajiTingkatObj?.isCheckpoint && (
                                            <Badge variant="secondary" className="text-[10px] py-0 px-1.5">Checkpoint</Badge>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-xs sm:text-sm pt-1">
                                    <span className="text-muted-foreground">Status</span>
                                    <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-700 gap-1.5 text-xs font-medium">
                                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                                        {currentNgaji.statusLain || 'Aktif'}
                                    </Badge>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AccordionSection>
    );
};

export default DataRiwayatAkademik;

