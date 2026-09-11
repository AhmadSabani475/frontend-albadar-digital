import { Checkbox } from "@/components/ui/checkbox";
import type { TagihanKasir } from "@/types/Tagihan";
import type { ColumnDef } from "@tanstack/react-table";
import NominalBayarCell from "./NominalBayarCell";

interface TagihanTableMeta {
    selectedTagihan: Record<string, number>;
    onToggle: (tagihanId: string, sisaTagihan: number) => void;
    onChangeNominal: (tagihanId: string, nominal: number) => void;
}

export const getTagihanBelumLunasColumn = (): ColumnDef<TagihanKasir>[] => [
    {
        id: 'select',
        size: 50,
        header: () => null,
        cell: ({ row, table }) => {
            const { selectedTagihan, onToggle } = table.options.meta as TagihanTableMeta;
            const tagihanId = row.original._id;
            const isChecked = tagihanId in selectedTagihan;

            return (
                <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => onToggle(tagihanId, row.original.sisaTagihan)}
                    aria-label="Pilih tagihan"
                    className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
            );
        },
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
        accessorKey: 'namaTagihan',
        header: 'Nama Tagihan',
        minSize: 200,
        cell: ({ row }) => row.original.namaTagihan || '-',
    },
    {
        accessorKey: 'sisaTagihan',
        header: 'Sisa Tagihan',
        cell: ({ row }) => `Rp ${row.original.sisaTagihan.toLocaleString('id-ID')}`
    },
    {
        id: 'nominalBayar',
        header: 'Nominal Bayar (Rp)',
        cell: ({ row, table }) => {
            const { selectedTagihan, onChangeNominal } = table.options.meta as TagihanTableMeta;
            const tagihanId = row.original._id;
            const isChecked = tagihanId in selectedTagihan;
            return (
                <NominalBayarCell
                    isChecked={isChecked}
                    value={selectedTagihan[tagihanId] ?? 0}
                    sisaTagihan={row.original.sisaTagihan}
                    onCommit={(nominal) => onChangeNominal(tagihanId, nominal)}
                />
            );
        },
    }
]