import { formatRelativeTime } from "@/lib/utils";
import type { Kwitansi } from "@/types/Kwitansi";
import type { Santri } from "@/types/Santri";

interface Props {
    data: Kwitansi[];
}

const TransaksiTerakhirList = ({ data }: Props) => {
    if (data.length === 0) {
        return (
            <p className="text-sm text-muted-foreground text-center py-6">
                Belum ada transaksi
            </p>
        );
    }

    return (
        <table className="w-full text-sm">
            <thead>
                <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-2">No. Kwitansi</th>
                    <th className="text-left py-2">Nama Santri</th>
                    <th className="text-right py-2">Total Nominal</th>
                    <th className="text-right py-2">Tanggal</th>
                </tr>
            </thead>
            <tbody>
                {data.map((kwitansi) => (
                    <tr
                        key={kwitansi._id}
                        className="border-b border-border/60 cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                        <td className="py-3">{kwitansi.nomorKwitansi}</td>
                        <td className="py-3">{(kwitansi.santriId as Santri)?.namaLengkap ?? '-'}</td>
                        <td className="py-3 text-right">
                            Rp {kwitansi.totalNominal.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3 text-right text-muted-foreground">
                            {formatRelativeTime(kwitansi.createdAt)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransaksiTerakhirList;