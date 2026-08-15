import { Button } from '@/components/ui/button';
import type { Kamar } from '@/types/Kamar';
import type { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';



const columns: ColumnDef<Kamar>[] = [
    {
        accessorKey: 'namaKamar',
        header: 'Nama Kamar'
    },
    {
        accessorKey: 'asramaId',
        header: 'Asrama',
        cell: ({ row }) => (
            <span className="capitalize">{row.original.asramaId.namaAsrama}</span>
        )
    },
    {
        accessorKey: 'kapasitas',
        header: 'Kapasitas'
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => console.log('Edit:', row.original)}>
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => console.log('Delete:', row.original)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
            </div>
        ),
    },
];
export { columns };