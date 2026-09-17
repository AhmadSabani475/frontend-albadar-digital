import type { ColumnDef } from '@tanstack/react-table';
import { Send } from 'lucide-react';
import type { TunggakanSantri } from '@/types/Tunggakan';
import { Button } from '@/components/ui/button';
import { formatIDR, formatRelativeTime } from '@/lib/utils';
import { generateWaLinkTunggakan } from '@/utils/generateWaTunggakan';

export const getTunggakanColumns = (): ColumnDef<TunggakanSantri>[] => [
    {
        id: 'no',
        header: 'No',
        size: 60,
        cell: ({ row, table }) => {
            const { pageIndex, pageSize } = table.getState().pagination;
            return <span className="text-muted-foreground">{pageIndex * pageSize + row.index + 1}</span>;
        }
    },
    {
        id: 'namaSantri',
        header: 'Nama Santri',
        accessorFn: (row) => `${row.santri?.namaLengkap ?? ''} ${row.santri?.nis ?? ''}`,
        cell: ({ row }) => {
            const santri = row.original.santri;
            return (
                <div className="flex flex-col">
                    <span className="font-medium text-foreground">{santri?.namaLengkap ?? '-'}</span>
                    {santri?.nis && (
                        <span className="text-xs text-muted-foreground">NIS: {santri.nis}</span>
                    )}
                </div>
            );
        }
    },
    {
        id: 'jumlahTagihan',
        header: 'Jumlah Tagihan',
        accessorFn: (row) => row.tagihanList.length,
        cell: ({ row }) => (
            <span>{row.original.tagihanList.length} tagihan</span>
        )
    },
    {
        accessorKey: 'totalTunggakan',
        header: 'Total Tunggakan',
        cell: ({ row }) => (
            <span className="font-semibold text-destructive">
                {formatIDR(row.original.totalTunggakan)}
            </span>
        )
    },
    {
        accessorKey: 'tanggalTertua',
        header: 'Tunggakan Tertua',
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {formatRelativeTime(row.original.tanggalTertua)}
            </span>
        )
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => {
            const hasNoHp = Boolean(row.original.noHpAyah);
            const handleKirimWa = () => {
                if (!hasNoHp) return;
                const url = generateWaLinkTunggakan(row.original);
                window.open(url, '_blank');
            };

            return (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleKirimWa}
                    disabled={!hasNoHp}
                    title={hasNoHp ? 'Kirim pengingat WA' : 'Nomor WA Ayah/Wali tidak tersedia'}
                    className="gap-1.5 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                    <Send className="w-3.5 h-3.5" />
                    Kirim WA
                </Button>
            );
        }
    }
];
