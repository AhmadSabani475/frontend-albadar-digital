import SearchSantriDialog from "@/components/molecules/SearchSantriDialog";
import RingkasanPembayaranCard from "@/components/organisms/RingkasanPembayaran";
import StrukKwitansiDialog from "@/components/organisms/StrukKwitansiDialog";
import SetoranSaldoCard from "@/components/organisms/TableSetoranRekening/SetoranSaldoCard";
import TabelTagihanBelumLunas from "@/components/organisms/TableTagihanBelumLunas/TableTagihanBelumLunas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useProsesTransaksi } from "@/hooks/use-proses-transaksi";
import { useRingkasanSantri } from "@/hooks/use-ringkasan-santri";
import type { Kwitansi } from "@/types/Kwitansi";
import { FileText, UserRound } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { toast } from "@/hooks/use-toast";
import { getPeriodeKeterangan } from "@/lib/utils";

const KasirPage = () => {
    const [selectedSantriId, setSelectedSantriId] = useState<string | undefined>();
    const [selectedTagihan, setSelectedTagihan] = useState<Record<string, number>>({});
    const [setoranRekening, setSetoranRekening] = useState<Record<string, number>>({});
    const [openSearchSantri, setOpenSearchSantri] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [kwitansi, setKwitansi] = useState<Kwitansi | null>(null);
    const [metodePembayaran, setMetodePembayaran] = useState<'cash' | 'transfer'>('cash')

    const { data, isLoading, error } = useRingkasanSantri(selectedSantriId);
    const { mutate, isPending } = useProsesTransaksi();

    const labelJenisRekening: Record<string, string> = {
        uang_jajan: 'Uang Jajan',
        tabungan_ziarah: 'Ziarah',
    };

    const handleSelectSantri = (santriId: string) => {
        setSelectedSantriId(santriId);
        setSelectedTagihan({});
        setSetoranRekening({});
    };

    const handleToggle = useCallback((tagihanId: string, sisaTagihan: number) => {
        setSelectedTagihan((prev) => {
            const updated = { ...prev };
            if (tagihanId in updated) {
                delete updated[tagihanId];
            } else {
                updated[tagihanId] = sisaTagihan;
            }
            return updated;
        });
    }, []);

    const handleChangeNominal = useCallback((tagihanId: string, nominal: number) => {
        setSelectedTagihan((prev) => ({ ...prev, [tagihanId]: nominal }));
    }, []);

    const handleChangeSetoran = useCallback((rekeningId: string, nominal: number) => {
        setSetoranRekening((prev) => ({ ...prev, [rekeningId]: nominal }));
    }, []);

    const ringkasanItems = useMemo(() => {
        const tagihanItems = Object.entries(selectedTagihan).map(([id, nominal]) => {
            const t = data?.tagihan.find((x) => x._id === id);
            const label = t?.namaTagihan ?? '-';
            const periodeInfo = getPeriodeKeterangan(t);
            const hasPeriodeInLabel = Boolean(
                periodeInfo && label.toLowerCase().includes(periodeInfo.toLowerCase())
            );
            const displayLabel = (periodeInfo && !hasPeriodeInLabel) ? `${label} (${periodeInfo})` : label;

            return {
                label: displayLabel,
                kategori: 'Tagihan',
                nominal,
                keterangan: periodeInfo ? `Periode: ${periodeInfo}` : undefined,
            };
        });

        const rekeningItems = Object.entries(setoranRekening)
            .filter(([, nominal]) => nominal > 0)
            .map(([id, nominal]) => {
                const r = data?.rekening.find((x) => x._id === id);
                return { label: labelJenisRekening[r?.jenisRekening ?? ''] ?? '-', kategori: 'Setoran', nominal };
            });

        return [...tagihanItems, ...rekeningItems];
    }, [selectedTagihan, setoranRekening, data]);

    const totalPembayaran = useMemo(
        () => ringkasanItems.reduce((sum, i) => sum + i.nominal, 0),
        [ringkasanItems]
    );

    const payloadItems = useMemo(() => {
        const tagihanItems = Object.entries(selectedTagihan).map(([tagihanId, nominal]) => {
            const t = data?.tagihan.find((x) => x._id === tagihanId);
            const periodeInfo = getPeriodeKeterangan(t);
            return {
                tipe: 'bayar_tagihan' as const,
                tagihanId,
                nominal,
                keterangan: periodeInfo ? `Periode: ${periodeInfo}` : undefined,
            };
        });

        const rekeningItems = Object.entries(setoranRekening)
            .filter(([, nominal]) => nominal > 0)
            .map(([rekeningId, nominal]) => ({
                tipe: 'setor_rekening' as const,
                rekeningId,
                nominal,
            }));

        return [...tagihanItems, ...rekeningItems];
    }, [selectedTagihan, setoranRekening, data]);

    const handleConfirmClick = () => {
        if (!selectedSantriId || payloadItems.length === 0) return;
        setConfirmOpen(true);
    };

    const handleProcessSubmit = async () => {
        if (!selectedSantriId || payloadItems.length === 0) return;

        setConfirmOpen(false);
        mutate(
            { santriId: selectedSantriId, items: payloadItems, metodePembayaran: metodePembayaran },
            {
                onSuccess: (res) => {
                    toast({
                        variant: 'success',
                        title: 'Transaksi Berhasil',
                        description: 'Pembayaran telah diproses & kwitansi diterbitkan.',
                    });
                    setKwitansi(res.data);
                    setSelectedTagihan({});
                    setSetoranRekening({});
                },
                onError: (err) => {
                    console.error(err);
                    toast({
                        variant: 'destructive',
                        title: 'Transaksi Gagal',
                        description: (err as Error).message || 'Terjadi kesalahan saat memproses transaksi.',
                    });
                },
            }
        );
    }

    return (
        <div className="w-full flex flex-col gap-4">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Kolom kiri: Data Santri + Tagihan Belum Lunas */}
                <div className="flex flex-col gap-4">
                    <Card className="w-full">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <h3 className="font-semibold">Data Santri</h3>
                            <Button variant="outline" size="sm" onClick={() => setOpenSearchSantri(true)}>
                                Ganti Santri
                            </Button>
                        </CardHeader>
                        <CardContent>

                            {!selectedSantriId && (
                                <p className="text-sm text-muted-foreground py-6 text-center">
                                    Belum ada santri dipilih. Klik "Ganti Santri" untuk mulai.
                                </p>
                            )}

                            {selectedSantriId && isLoading && (
                                <div className="border border-border rounded-lg p-4 flex items-center gap-4">
                                    <Skeleton className="w-14 h-14 rounded-full" />
                                    <div className="flex flex-col gap-2 flex-1">
                                        <Skeleton className="h-5 w-40" />
                                        <Skeleton className="h-4 w-28" />
                                    </div>
                                </div>
                            )}

                            {selectedSantriId && error && (
                                <p className="text-sm text-destructive py-6 text-center">
                                    Gagal memuat data santri.
                                </p>
                            )}

                            {selectedSantriId && data?.santri && (
                                <div className="border border-border rounded-lg p-4 flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                                        {data.santri.fotoUrl ? (
                                            <img src={data.santri.fotoUrl} alt={data.santri.namaLengkap} className="w-full h-full object-cover" />
                                        ) : (
                                            <UserRound className="w-6 h-6 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-lg">{data.santri.namaLengkap}</p>
                                        <div className="text-sm text-muted-foreground flex gap-4 mt-1">
                                            <span>NIS: {data.santri.nis}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <SearchSantriDialog
                            open={openSearchSantri}
                            onOpenChange={setOpenSearchSantri}
                            onSelect={(santriId) => {
                                handleSelectSantri(santriId);
                                setOpenSearchSantri(false);
                            }}
                        />
                    </Card>

                    {/* Tagihan Belum Lunas akan ditaruh di sini */}
                    {!selectedSantriId ? (
                        <Card>
                            <CardContent className="py-10 text-center text-muted-foreground">
                                Pilih santri terlebih dahulu untuk melihat tagihan.
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardHeader className="flex flex-row gap-2">
                                <FileText className="w-4 h-4" />
                                <h2>Tagihan Belum Lunas</h2>
                            </CardHeader>
                            <CardContent>
                                <TabelTagihanBelumLunas
                                    tagihan={data?.tagihan ?? []}
                                    selectedTagihan={selectedTagihan}
                                    onToggle={handleToggle}
                                    onChangeNominal={handleChangeNominal}
                                />
                            </CardContent>
                        </Card>
                    )}

                </div>

                {/* Kolom kanan: Setoran Saldo + Ringkasan Pembayaran */}
                <div className="flex flex-col gap-4">
                    {!selectedSantriId ? (
                        <Card>
                            <CardContent className="py-10 text-center text-muted-foreground">
                                Pilih santri terlebih dahulu untuk melihat rekening.
                            </CardContent>
                        </Card>
                    ) : (
                        <SetoranSaldoCard
                            rekening={data?.rekening ?? []}
                            setoranRekening={setoranRekening}
                            onChangeSetoran={handleChangeSetoran} />
                    )}
                    {!selectedSantriId ? (
                        <Card>
                            <CardContent className="py-10 text-center text-muted-foreground">
                                Pilih santri terlebih dahulu untuk melihat Ringkasan Pembayaran.
                            </CardContent>
                        </Card>
                    ) : (
                        <RingkasanPembayaranCard
                            items={ringkasanItems}
                            metodePembayaran={metodePembayaran}
                            onMetodePembayaranChange={setMetodePembayaran}
                            total={totalPembayaran}
                            isPending={isPending}
                            onSubmit={handleConfirmClick}
                            onReset={() => { setSelectedTagihan({}); setSetoranRekening({}); }}
                        />
                    )}
                </div>
            </div>

            {/* Confirmation Alert Dialog */}
            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent className="sm:max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Pembayaran</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin memproses transaksi pembayaran ini?
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="rounded-xl border border-border bg-muted/40 p-4 space-y-2.5 text-sm my-2">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Nama Santri:</span>
                            <span className="font-semibold text-foreground">{data?.santri?.namaLengkap ?? '-'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Metode Pembayaran:</span>
                            <span className="font-medium uppercase bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                                {metodePembayaran}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Jumlah Item:</span>
                            <span className="font-medium">{ringkasanItems.length} item</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-border pt-2.5 mt-2">
                            <span className="font-semibold text-foreground">Total Pembayaran:</span>
                            <span className="font-bold text-lg text-primary">Rp {totalPembayaran.toLocaleString('id-ID')}</span>
                        </div>
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isPending}
                            onClick={handleProcessSubmit}
                        >
                            {isPending ? 'Memproses...' : 'Ya, Proses Transaksi'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <StrukKwitansiDialog
                kwitansi={kwitansi}
                santri={data?.santri}
                onClose={() => setKwitansi(null)}
            />
        </div>
    )
}
export default KasirPage;