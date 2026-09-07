import SearchSantriDialog from "@/components/molecules/SearchSantriDialog";
import RingkasanPembayaranCard from "@/components/organisms/RingkasanPembayaran";
import StrukKwitansiDialog from "@/components/organisms/StrukKwitansiDialog";
import SetoranSaldoCard from "@/components/organisms/TableSetoranRekening/SetoranSaldoCard";
import TabelTagihanBelumLunas from "@/components/organisms/TableTagihanBelumLunas/TableTagihanBelumLunas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useProsesTransaksi } from "@/hooks/use-proses-transaksi";
import { useRingkasanSantri } from "@/hooks/use-ringkasan-santri";
import type { Kwitansi } from "@/types/Kwitansi";
import { FileText, UserRound } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

const KasirPage = () => {
    const [selectedSantriId, setSelectedSantriId] = useState<string | undefined>();
    const [selectedTagihan, setSelectedTagihan] = useState<Record<string, number>>({});
    const [setoranRekening, setSetoranRekening] = useState<Record<string, number>>({});
    const [openSearchSantri, setOpenSearchSantri] = useState(false);
    const [kwitansi, setKwitansi] = useState<Kwitansi | null>(null);

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
            return { label: t?.namaTagihan ?? '-', kategori: 'Tagihan', nominal };
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
        const tagihanItems = Object.entries(selectedTagihan).map(([tagihanId, nominal]) => ({
            tipe: 'bayar_tagihan' as const,
            tagihanId,
            nominal,
        }));

        const rekeningItems = Object.entries(setoranRekening)
            .filter(([, nominal]) => nominal > 0)
            .map(([rekeningId, nominal]) => ({
                tipe: 'setor_rekening' as const,
                rekeningId,
                nominal,
            }));

        return [...tagihanItems, ...rekeningItems];
    }, [selectedTagihan, setoranRekening]);

    const handleSubmit = async () => {
        if (!selectedSantriId || payloadItems.length === 0) return;

        mutate(
            { santriId: selectedSantriId, items: payloadItems },
            {
                onSuccess: (res) => {
                    setKwitansi(res.data);
                    setSelectedTagihan({});
                    setSetoranRekening({});
                },
                onError: (err) => {
                    console.error(err);
                    // tampilkan toast error di sini
                },
            }
        );
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-3xl font-bold">Kasir Pembayaran</h1>
                    <p className="text-[#c9c5c5] text-xs">Kelola Tagihan</p>
                </div>
            </div>

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
                                <p className="text-sm text-muted-foreground py-6 text-center">
                                    Memuat data santri...
                                </p>
                            )}

                            {selectedSantriId && error && (
                                <p className="text-sm text-destructive py-6 text-center">
                                    Gagal memuat data santri.
                                </p>
                            )}

                            {selectedSantriId && data?.santri && (
                                <div className="border border-white/10 rounded-lg p-4 flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center overflow-hidden">
                                        {data.santri.fotoUrl ? (
                                            <img src={data.santri.fotoUrl} alt={data.santri.namaLengkap} className="w-full h-full object-cover" />
                                        ) : (
                                            <UserRound className="w-6 h-6 text-gray-400" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-lg">{data.santri.namaLengkap}</p>
                                        <div className="text-sm text-muted-foreground flex gap-4 mt-1">
                                            <span>NIS: {data.santri.nis}</span>
                                            {/* <span>Asrama: {data.santri.kamarId.asramaId.namaAsrama ?? '-'}</span> */}
                                        </div>
                                        {/* <p className="text-sm text-muted-foreground">Kelas: {data.santri.kelas ?? '-'}</p> */}
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
                            total={totalPembayaran}
                            isPending={isPending}
                            onSubmit={handleSubmit}
                            onReset={() => { setSelectedTagihan({}); setSetoranRekening({}); }}
                        />
                    )}
                </div>
            </div>
            <StrukKwitansiDialog
                kwitansi={kwitansi}
                santri={data?.santri}
                tagihanList={data?.tagihan ?? []}
                rekeningList={data?.rekening ?? []}
                onClose={() => setKwitansi(null)}
            />
        </div>
    )
}
export default KasirPage;