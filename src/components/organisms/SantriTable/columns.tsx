import ConfirmDeleteButton from '@/components/molecules/ConfirmDeleteButton';
import { Button } from '@/components/ui/button';
import type { Santri } from '@/types/Santri';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropTypes {
    onDelete: (id: string) => void;
}

export const getColumns = ({ onDelete }: PropTypes): ColumnDef<Santri>[] => [
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
        accessorKey: 'namaLengkap',
        header: 'Nama'
    },
    {
        accessorKey: 'kamarId.namaKamar',
        header: 'Kamar'
    },
    {
        accessorKey: 'kamarId.asramaId.namaAsrama',
        header: 'Asrama'
    },
    {
        accessorKey: 'sekolahId.nama',
        header: 'Sekolah'
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Link to={`/dashboard/santri/view/${row.original._id}`}>
                    <Button variant={'ghost'} size="icon" aria-label="Lihat detail santri">
                        <Eye className="h-4 w-4" />
                    </Button>
                </Link>

                <Link to={`/dashboard/santri/edit/${row.original._id}`}>
                    <Button variant={'ghost'} size="icon">
                        <Pencil className="h-4 w-4" />
                    </Button>
                </Link>
                <ConfirmDeleteButton
                    trigger={
                        <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    }
                    title={`Hapus "${row.original.namaLengkap}"?`}
                    onConfirm={() => onDelete(row.original._id)}
                />
            </div>
        )
    }
];
