import { LetterText } from 'lucide-react';
import AccordionSection from '../molecules/AccordionSection';
import { useRiwayatKwitansiSantri } from '@/hooks/use-riwayat-kwitansi-santri';
import { useState } from 'react';
import type { Kwitansi } from '@/types/Kwitansi';
import type { Santri } from '@/types/Santri';
import StrukKwitansiDialog from './StrukKwitansiDialog';

interface DataRiwayatPembayaran {
    santriId: string;
    santri?: Santri;
    disabled?: boolean;
}

const DataRiwayatPembayaran = ({ santriId, santri }: DataRiwayatPembayaran) => {
    const { data, isLoading } = useRiwayatKwitansiSantri(santriId);
    const [selectedKwitansi, setSelectedKwitansi] = useState<Kwitansi | null>(null);
    return (
        <AccordionSection Icon={LetterText} title="Riwayat Pembayaran" value="riwayat-pembayaran">
            {isLoading && (
                <p className="text-sm text-muted-foreground py-4 text-center">Memuat data...</p>
            )}

            {!isLoading && (!data?.data || data.data.length === 0) && (
                <p className="text-sm text-muted-foreground py-4 text-center">Belum ada riwayat pembayaran</p>
            )}

            {!isLoading && data?.data && data.data.length > 0 && (
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border text-muted-foreground">
                            <th className="text-left py-2">No. Kwitansi</th>
                            <th className="text-left py-2">Tanggal</th>
                            <th className="text-right py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.map((kwitansi) => (
                            <tr
                                key={kwitansi._id}
                                className="border-b border-border/60 cursor-pointer hover:bg-muted/50 transition-colors"
                                onClick={() => setSelectedKwitansi(kwitansi)}
                            >
                                <td className="py-3">{kwitansi.nomorKwitansi}</td>
                                <td className="py-3">
                                    {new Date(kwitansi.createdAt).toLocaleDateString('id-ID')}
                                </td>
                                <td className="py-3 text-right">
                                    Rp {kwitansi.totalNominal.toLocaleString('id-ID')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <StrukKwitansiDialog
                kwitansi={selectedKwitansi}
                santri={santri}
                onClose={() => setSelectedKwitansi(null)}
            />
        </AccordionSection>
    );
};
export default DataRiwayatPembayaran;