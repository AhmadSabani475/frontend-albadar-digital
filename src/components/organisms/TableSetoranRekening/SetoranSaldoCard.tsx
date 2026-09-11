import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CreditCard } from "lucide-react";
import type { Rekening } from "@/types/Rekening";

interface PropTypes {
    rekening: Rekening[];
    setoranRekening: Record<string, number>;
    onChangeSetoran: (rekeningId: string, nominal: number) => void;
}

const labelJenisRekening: Record<string, string> = {
    uang_jajan: 'Uang Jajan',
    tabungan_ziarah: 'Ziarah',
};

// const formatSaldo = (saldo: number) => {
//     if (saldo >= 1000) return `Rp ${(saldo / 1000).toLocaleString('id-ID')}k`;
//     return `Rp ${saldo}`;
// };

const SetoranSaldoCard = ({
    rekening,
    setoranRekening,
    onChangeSetoran
}: PropTypes) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                <h2 className="font-semibold text-sm">SETORAN SALDO</h2>
            </CardHeader>
            <CardContent className="p-0">
                {rekening.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6">
                        Tidak ada rekening
                    </p>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border text-muted-foreground text-xs">
                                <th className="text-left font-medium py-2 px-4">Jenis</th>
                                <th className="text-left font-medium py-2 px-4">Saldo</th>
                                <th className="text-left font-medium py-2 px-4">Setor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rekening.map((r) => (
                                <tr key={r._id} className="border-b border-border/60 last:border-0">
                                    <td className="py-3 px-4 font-medium">
                                        {labelJenisRekening[r.jenisRekening] ?? r.jenisRekening}
                                    </td>
                                    <td className="py-3 px-4 text-muted-foreground">
                                        Rp.{r.saldo.toLocaleString('id-ID')}
                                    </td>
                                    <td className="py-3 px-4">
                                        <Input
                                            type="number"
                                            min={0}
                                            value={setoranRekening[r._id] ?? 0}
                                            onChange={(e) => {
                                                const nominal = Math.max(0, Number(e.target.value));
                                                onChangeSetoran(r._id, nominal);
                                            }}
                                            className="w-24 h-8 text-sm"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </CardContent>
        </Card>
    )
}
export default SetoranSaldoCard;