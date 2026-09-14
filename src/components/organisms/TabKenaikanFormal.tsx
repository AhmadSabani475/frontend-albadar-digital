import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useKelasSantriMutation } from "@/hooks/use-kelas-santri-mutation";
import type { ResponseNaikKelas } from "@/types/KelasSantri";
import ItemPerluKeputusanFormal from "./ItemPerluKeputusanFormal";

interface Props {
    tahunAjaranAsalId: string;
    tahunAjaranTujuanId: string;
    hasil: ResponseNaikKelas | null;
    setHasil: (res: ResponseNaikKelas | null) => void;
}

const TabKenaikanFormal = ({ tahunAjaranAsalId, tahunAjaranTujuanId, hasil, setHasil }: Props) => {
    const { naikKelas, keputusanManual } = useKelasSantriMutation();

    const handleProses = () => {
        naikKelas.mutate(
            { tahunAjaranAsalId, tahunAjaranTujuanId },
            {
                onSuccess: (res) => setHasil(res.data),
            }
        );
    };

    const handleResolved = (santriId: string) => {
        if (!hasil) return;
        setHasil({
            ...hasil,
            perluKeputusanManual: hasil.perluKeputusanManual.filter((p) => p.santriId !== santriId),
        });
    };

    const disabledProses = !tahunAjaranAsalId || !tahunAjaranTujuanId || naikKelas.isPending;

    return (
        <div className="space-y-4">
            <Card>
                <CardContent className="pt-6">
                    <Button onClick={handleProses} disabled={disabledProses}>
                        {naikKelas.isPending ? 'Memproses...' : 'Proses Kenaikan Kelas Formal'}
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
                            <span className="text-blue-500">🔁 {hasil.mengulang.length} mengulang</span>
                            <span className="text-yellow-500">⚠️ {hasil.perluKeputusanManual.length} perlu keputusan</span>
                        </div>

                        {hasil.perluKeputusanManual.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">Perlu Keputusan:</p>
                                {hasil.perluKeputusanManual.map((item) => (
                                    <ItemPerluKeputusanFormal
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
    );
};

export default TabKenaikanFormal;