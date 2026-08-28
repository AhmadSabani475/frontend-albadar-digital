import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Rekening } from "@/types/Rekening";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";



export const getColumns = (): ColumnDef<Rekening>[] => [
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
        minSize: 200,
    },
    {
        accessorKey: 'jenisRekening',
        header: 'Jenis Rekening',
        size: 160,
        cell: ({ row }) => {
            const jenis = row.original.jenisRekening;
            const variantMap: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
                uang_jajan: 'default',
                tabungan_ziarah: 'secondary',
            };
            return (
                <Badge variant={variantMap[jenis] ?? 'outline'}>
                    {jenis === 'uang_jajan' ? 'Uang Jajan' : 'Tabungan Ziarah'}
                </Badge>
            )
        }
    },
    {
        accessorKey: 'saldo',
        header: 'Saldo Saat Ini',
        size: 150,
        cell: ({ row }) => {
            const nominal = row.original.saldo;
            return <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(nominal)}</span>;
        },
    },
    {
        id: 'actions',
        header: () => <div className="text-center">Aksi</div>,
        size: 100,
        cell: ({ row }) => {
            return (
                <div className="flex justify-center items-center w-full">
                    <Link to={`/dashboard/rekening/view/${row.original._id}`} className="inline-block">
                        <Button size="sm" className="text-green-400 bg-black border border-gray-500">
                            Mutasi
                        </Button>
                    </Link>
                </div>
            );
        },
    },
];