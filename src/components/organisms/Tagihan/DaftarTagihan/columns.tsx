import type { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import type { Tagihan } from '@/types/Tagihan';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export const getColumns = (): ColumnDef<Tagihan>[] => [
    {
        id: 'no',
        header: 'No',
        size: 50,
        cell: ({ row, table }) => {
            const { pageIndex, pageSize } = table.getState().pagination;
            return <span>{pageIndex * pageSize + row.index + 1}</span>;
        }
    },
    {
        accessorKey: 'santriId.namaLengkap',
        header: 'Nama Santri',
        size: 180,
    },
    {
        accessorKey: 'jenisTagihanId.nama',
        header: 'Tagihan',
        size: 140,
    },
    {
        accessorKey: 'nominalTagihan',
        header: 'Nominal',
        size: 130,
        cell: ({ row }) => {
            const nominal = row.original.nominalTagihan;
            return <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(nominal)}</span>;
        },
    },
    {
        accessorKey: 'jatuhTempo',
        header: 'Jatuh Tempo',
        size: 110,
        cell: ({ row }) => {
            const jatuhTempo = row.original.jatuhTempo;
            const status = row.original.status;
            const tanggal = new Date(jatuhTempo);
            const isOverdue = status !== 'lunas' && tanggal < new Date();

            const formatted = tanggal.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });

            return (
                <span className={isOverdue ? 'text-red-400 font-medium' : 'text-neutral-300'}>
                    {formatted}
                </span>
            );
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        size: 130,
        cell: ({ row }) => {
            const status = row.original.status;

            const statusConfig: Record<string, { label: string; className: string }> = {
                belum_bayar: {
                    label: 'Belum Bayar',
                    className: 'bg-red-500/20 text-red-300 hover:bg-red-500/20 rounded-full border-0',
                },
                sebagian: {
                    label: 'Sebagian/Cicilan',
                    className: 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/20 rounded-full border-0',
                },
                lunas: {
                    label: 'Lunas',
                    className: 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20 rounded-full border-0',
                },
            };

            const config = statusConfig[status] ?? {
                label: status,
                className: 'bg-neutral-600/40 text-neutral-300 hover:bg-neutral-600/40 rounded-full border-0',
            };

            return (
                <Badge className={config.className}>
                    {config.label}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        header: 'Aksi',
        size: 70,
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    <Link to={`/dashboard/daftar-tagihan/view/${row.original._id}`}>
                        <Eye className='h-4 w-4' />
                    </Link>
                </div>
            );
        },
    },
];