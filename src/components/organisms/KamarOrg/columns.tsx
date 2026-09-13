import type { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import type { Kamar } from '@/types/Kamar';
import { Button } from '@/components/ui/button';
import ConfirmDeleteButton from '@/components/molecules/ConfirmDeleteButton';

interface PropTypes {
    onDelete: (id: string) => void;
}

export const getColumns = ({ onDelete }: PropTypes): ColumnDef<Kamar>[] => [
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
        accessorKey: 'namaKamar',
        header: 'Kamar',
        size: 200,
    },
    {
        accessorKey: 'asramaId.namaAsrama',
        header: 'Asrama',
        size: 150,
        cell: ({ row }) => (
            <span className="capitalize">{row.original.asramaId?.namaAsrama ?? '-'}</span>
        ),
    },
    {
        accessorKey: 'kapasitas',
        header: 'Kapasitas',
        size: 150,
    },
    {
        id: 'actions',
        header: 'Aksi',
        size: 100,
        cell: ({ row }) => {
            return (
                <ConfirmDeleteButton
                    trigger={<Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>}
                    onConfirm={() => onDelete(row.original._id)}
                />

            );
        },
    },
];