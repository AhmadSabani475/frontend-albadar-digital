import type { ColumnDef } from '@tanstack/react-table';
import type { User } from '@/types/Users';
import { Button } from '../../ui/button';
import { RotateCcw, Trash2 } from 'lucide-react';
import { Badge } from '../../ui/badge';
import ConfirmActionButton from '../../molecules/ConfirmActionButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';


interface PropTypes {
    onDelete: (id: string) => void;
    onReset: (id: string) => void;
    onChangeRole: (id: string, role: 'admin' | 'bendahara') => void;
}
export const getColumns = ({ onDelete, onReset, onChangeRole }: PropTypes): ColumnDef<User>[] => [
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
        cell: ({ row }) => {
            const roleItems: Record<string, string> = {
                admin: 'Admin',
                bendahara: 'Bendahara',
            };
            return (
                <Select
                    items={roleItems}
                    value={row.original.role}
                    onValueChange={(newValue) => {
                        if (newValue && newValue !== row.original.role) {
                            onChangeRole(row.original._id, newValue as 'admin' | 'bendahara');
                        }
                    }}
                >
                    <SelectTrigger size="sm">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="bendahara">Bendahara</SelectItem>
                    </SelectContent>
                </Select>
            );
        },
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
                    <ConfirmActionButton
                        trigger={
                            <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        }
                        title={`Hapus "${row.original.username}"?`}
                        onConfirm={() => onDelete(user)}
                    />
                    <ConfirmActionButton
                        trigger={
                            <Button variant="ghost" size="icon">
                                <RotateCcw className="h-4 w-4 text-yellow-300" />
                            </Button>
                        }
                        title={`Reset "${row.original.username}"?`}
                        onConfirm={() => onReset(user)}
                        actionLabel="Reset"
                        actionVariant="default"
                    />
                </div>
            );
        },
    },
];
