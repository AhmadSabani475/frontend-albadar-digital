import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";

export type UangJajanStatus = {
    rekeningId: string;
    namaSantri: string | null;
    nominalHarian: number;
    saldo: number;
    sudahDiambil: boolean;
    saldoCukup: boolean;
};

export const getUangJajanColumns = (): ColumnDef<UangJajanStatus>[] => [
    {
        id: 'select',
        size: 50,
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Pilih semua"
                className="border-gray-500"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                disabled={!row.getCanSelect()} 
                aria-label="Pilih baris"
                className="border-gray-500 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
            />
        ),
    },
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
        accessorKey: 'namaSantri',
        header: 'Nama Santri',
        minSize: 200,
        cell: ({ row }) => row.original.namaSantri || '-',
    },
    {
        accessorKey: 'nominalHarian',
        header: 'Nominal Harian',
        size: 150,
        cell: ({ row }) => {
            const nominal = row.original.nominalHarian;
            return <span>{nominal != null ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(nominal) : '-'}</span>;
        },
    },
    {
        accessorKey: 'saldo',
        header: 'Saldo',
        size: 150,
        cell: ({ row }) => {
            const nominal = row.original.saldo;
            return <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(nominal)}</span>;
        },
    },
    {
        id: 'status',
        header: 'Status',
        size: 160,
        cell: ({ row }) => {
            const { sudahDiambil, saldoCukup } = row.original;

            if (sudahDiambil) {
                return <Badge variant="secondary">Sudah Diambil</Badge>;
            }
            if (!saldoCukup) {
                return <Badge variant="destructive">Saldo Kurang</Badge>;
            }
            return <Badge variant="default" className="bg-green-600 hover:bg-green-700">Tersedia</Badge>;
        }
    },
]