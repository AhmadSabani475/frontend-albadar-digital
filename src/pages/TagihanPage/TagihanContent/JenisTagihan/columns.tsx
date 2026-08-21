
import type { ColumnDef } from '@tanstack/react-table';


import { Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { JenisTagihan } from '@/types/Tagihan';
import ConfirmDeleteButton from '@/components/molecules/ConfirmDeleteButton';
import { Button } from '@/components/ui/button';

interface PropTypes {
    onDelete: (id: string) => void;
}
export const getColumns = ({ onDelete }: PropTypes): ColumnDef<JenisTagihan>[] => [
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
        accessorKey: 'nama',
        header: 'Nama Tagihan',
        size: 200,
    },
    {
        accessorKey: 'tipePeriode',
        header: 'Tipe',
        size: 150,
        cell: ({ row }) => (
            <span className="capitalize">{row.original.tipePeriode}</span>
        ),
    },
    {
        accessorKey: 'wajib',
        header: 'Wajib',
        size: 150,
        cell: ({ row }) => {
            const wajib = row.original.wajib === true;
            return (
                <Badge
                    className={
                        wajib
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/20 rounded-full border-0'
                            : 'bg-neutral-600/40 text-neutral-300 hover:bg-neutral-600/40 rounded-full border-0'
                    }
                >
                    {wajib ? 'Wajib' : 'Opsional'}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        header: 'Aksi',
        size: 100,
        cell: ({ row }) => {
            const jenis = row.original._id;
            return (
                <div className="flex gap-2">
                    <ConfirmDeleteButton
                        trigger={
                            <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        }
                        title={`Hapus "${row.original.nama}"?`}
                        onConfirm={() => onDelete(jenis)}
                    />
                </div>
            );
        },
    },
];