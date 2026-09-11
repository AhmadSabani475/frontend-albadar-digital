import type { ColumnDef } from '@tanstack/react-table';
import type { User } from '@/types/Users';
import { Button } from '../ui/button';
import { RotateCcw, Trash2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import ConfirmDeleteButton from '../molecules/ConfirmDeleteButton';
import ConfirmResetPassword from '../molecules/ConfirmResetPassword';

interface PropTypes {
    onDelete: (id: string) => void;
    onReset: (id: string) => void;
}
export const getColumns = ({ onDelete, onReset }: PropTypes): ColumnDef<User>[] => [
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
        accessorKey: 'username',
        header: 'Username',
        size: 200,
    },
    {
        accessorKey: 'role',
        header: 'Role',
        size: 150,
        cell: ({ row }) => (
            <span className="capitalize">{row.original.role}</span>
        ),
    },
    {
        accessorKey: 'is_active',
        header: 'Status',
        size: 150,
        cell: ({ row }) => {
            const isActive = row.original.is_active === true;
            return (
                <Badge
                    className={
                        isActive
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 rounded-full border-0'
                            : 'bg-muted text-muted-foreground hover:bg-muted rounded-full border-0'
                    }
                >
                    {isActive ? 'Aktif' : 'Belum Aktif'}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        header: 'Aksi',
        size: 100,
        cell: ({ row }) => {
            const user = row.original._id;
            return (
                <div className="flex gap-2">
                    <ConfirmDeleteButton
                        trigger={
                            <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        }
                        title={`Hapus "${row.original.username}"?`}
                        onConfirm={() => onDelete(user)}
                    />
                    <ConfirmResetPassword
                        trigger={
                            <Button variant="ghost" size="icon">
                                <RotateCcw className="h-4 w-4 text-yellow-300" />
                            </Button>
                        }
                        title={`Reset "${row.original.username}"?`}
                        onConfirm={() => onReset(user)}
                    />
                </div>
            );
        },
    },
];