
import type { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import ConfirmActionButton from '@/components/molecules/ConfirmActionButton';
import { Button } from '@/components/ui/button';
import type { TarifKhusus } from '@/types/Tagihan';

interface PropTypes {
    onDelete: (id: string) => void;
}
export const getColumns = ({ onDelete }: PropTypes): ColumnDef<TarifKhusus>[] => [
    {
        id: 'no',
        header: 'No',
        size: 60,
        cell: ({ row, table }) => {
            const { pageIndex, pageSize } = table.getState().pagination;
            return <span>{pageIndex * pageSize + row.index + 1}</span>;
        }
    },

    {
        accessorKey: 'santriId.namaLengkap',
        header: 'Nama Santri',
        size: 200,
    },
    {
        accessorKey: 'jenisTagihanId.nama',
        header: 'Jenis Tagihan',
        size: 150,
    },
    {
        accessorKey: 'nominalKhusus',
        header: 'Nominal Khusus',
        size: 150,
        cell: ({ row }) => {
            const nominal = row.original.nominalKhusus;
            return <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(nominal)}</span>;
        },
    },
    {
        accessorKey: 'keterangan',
        header: 'Keterangan',
        size: 150,
    },
    {
        id: 'actions',
        header: 'Aksi',
        size: 100,
        cell: ({ row }) => {
            const item = row.original._id;
            return (
                <div className="flex gap-2">
                    <ConfirmActionButton
                        trigger={
                            <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        }
                        onConfirm={() => onDelete(item)}
                    />
                </div>
            );
        },
    },
];
