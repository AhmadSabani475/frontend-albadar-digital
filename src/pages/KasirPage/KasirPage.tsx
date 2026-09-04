import SearchSantriDialog from "@/components/molecules/SearchSantriDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useProsesTransaksi } from "@/hooks/use-proses-transaksi";
import { useRingkasanSantri } from "@/hooks/use-ringkasan-santri";
import { useState } from "react";

const KasirPage = () => {
    const [selectedSantriId, setSelectedSantriId] = useState<string | undefined>();
    const [selectedTagihan, setSelectedTagihan] = useState<Record<string, number>>({});
    const [setoranRekening, setSetoranRekening] = useState<Record<string, number>>({});
    const [openSearchSantri, setOpenSearchSantri] = useState(false);

    const { data, isLoading, error } = useRingkasanSantri(selectedSantriId);
    // const { mutate, isPending } = useProsesTransaksi();

    const handleSelectSantri = (santriId: string) => {
        setSelectedSantriId(santriId);
        setSelectedTagihan({});
        setSetoranRekening({});
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-3xl font-bold">Kasir Pembayaran</h1>
                    <p className="text-[#c9c5c5] text-xs">Kelola Tagihan</p>
                </div>
            </div>

            <div className="flex justify-between gap-4">
                {/* Kolom kiri: Data Santri + Tagihan Belum Lunas */}
                <div className="w-full flex flex-col gap-4">
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
                                <div className="flex items-center gap-4">
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
                </div>

                {/* Kolom kanan: Setoran Saldo + Ringkasan Pembayaran */}
                <div className="w-full flex flex-col gap-4">
                    {/* Setoran Saldo & Ringkasan Pembayaran akan ditaruh di sini */}
                </div>
            </div>
        </div>
    )
}
export default KasirPage;