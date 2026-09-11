import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import NominalBayarCell from "./NominalBayarCell";
import type { TagihanKasir } from "@/types/Tagihan";

interface Props {
    tagihan: TagihanKasir[];
    selectedTagihan: Record<string, number>;
    onToggle: (tagihanId: string, sisaTagihan: number) => void;
    onChangeNominal: (tagihanId: string, nominal: number) => void;
}

const TabelTagihanBelumLunas = ({ tagihan, selectedTagihan, onToggle, onChangeNominal }: Props) => {
    if (tagihan.length === 0) {
        return <p className="text-sm text-muted-foreground py-6 text-center">Tidak ada tagihan belum lunas</p>;
    }

    return (
        <table className="w-full text-sm">
            <thead>
                <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-2 w-8"></th>
                    <th className="text-left py-2">Nama Tagihan</th>
                    <th className="text-right py-2">Sisa Tagihan</th>
                    <th className="text-right py-2">Nominal Bayar (Rp)</th>
                </tr>
            </thead>
            <tbody>
                {tagihan.map((t) => {
                    const isChecked = t._id in selectedTagihan;
                    return (
                        <tr key={t._id} className="border-b border-border/60">
                            <td className="py-3">
                                <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={() => onToggle(t._id, t.sisaTagihan)}
                                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary cursor-pointer"
                                />
                            </td>
                            <td className="py-3">
                                <p className="font-medium">{t.namaTagihan}</p>
                                <Badge variant={t.status === 'sebagian' ? 'secondary' : 'destructive'} className="mt-1">
                                    {t.status === 'sebagian' ? `CICILAN KE-${t.cicilanKe}` : 'BELUM BAYAR'}
                                </Badge>
                            </td>
                            <td className="py-3 text-right">Rp {t.sisaTagihan.toLocaleString('id-ID')}</td>
                            <td className="py-3 text-right">
                                <NominalBayarCell
                                    isChecked={isChecked}
                                    value={selectedTagihan[t._id] ?? 0}
                                    sisaTagihan={t.sisaTagihan}
                                    onCommit={(nominal) => onChangeNominal(t._id, nominal)}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TabelTagihanBelumLunas;