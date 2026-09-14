import { useRiwayatKelasNgajiMutation } from "@/hooks/use-riwayat-kelas-ngaji-mutation";
import type { ResponseNaikKelasNgaji } from "@/types/RiwayatKelasNgaji";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import ItemPerluKeputusanNgaji from "./ItemPerluKeputusanNgaji";


interface Props {
    tahunAjaranAsalId: string;
    tahunAjaranTujuanId: string;
    hasil: ResponseNaikKelasNgaji | null;
    setHasil: (res: ResponseNaikKelasNgaji | null) => void;
}

const TabKenaikanNgaji = ({ tahunAjaranAsalId, tahunAjaranTujuanId, hasil, setHasil }: Props) => {
    const { naikKelasNgaji, keputusanManual } = useRiwayatKelasNgajiMutation();

    const handleProses = () => {
        naikKelasNgaji.mutate(
            { tahunAjaranAsalId, tahunAjaranTujuanId },
            { onSuccess: (res) => setHasil(res.data) }
        )
    }
    const handleResolved = (santriId: string) => {
        if (!hasil) return;
        setHasil({
            ...hasil,
            perluKeputusanManual: hasil.perluKeputusanManual.filter((p) => p.santriId !== santriId)
        })
    }
    const disabledProses = !tahunAjaranAsalId || !tahunAjaranTujuanId || naikKelasNgaji.isPending;

    return (
        <div className="space-y-4">
            <Card>
                <CardContent className="pt-6">
                    <Button onClick={handleProses} disabled={disabledProses}>
                        {naikKelasNgaji.isPending ? 'Memproses...' : 'Proses Kenaikan Kelas Ngaji'}
                    </Button>
                </CardContent>
            </Card>

            {hasil && (
                <Card>
                    <CardHeader>
                        <h3 className="font-semibold">Hasil Proses</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-6 text-sm">
                            <span className="text-green-500">✅ {hasil.naikOtomatis.length} naik otomatis</span>
                            <span className="text-yellow-500">⚠️ {hasil.perluKeputusanManual.length} perlu keputusan</span>
                        </div>

                        {hasil.perluKeputusanManual.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">Perlu Keputusan:</p>
                                {hasil.perluKeputusanManual.map((item) => (
                                    <ItemPerluKeputusanNgaji
                                        key={item.santriId}
                                        item={item}
                                        tahunAjaranTujuanId={tahunAjaranTujuanId}
                                        keputusanManual={keputusanManual}
                                        onResolved={handleResolved}
                                    />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
export default TabKenaikanNgaji;