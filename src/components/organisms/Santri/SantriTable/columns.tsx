import ConfirmActionButton from '@/components/molecules/ConfirmActionButton';
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
        id: 'kamar',
        header: 'Kamar',
        cell: ({ row }) => {
            const kamar = row.original.kamarId;
            if (!kamar) return <span className="text-muted-foreground">-</span>;
            return <span>{kamar.namaKamar} - {kamar.asramaId?.namaAsrama}</span>;
        },
    },
    {
        id: 'sekolah',
        header: 'Sekolah & Kelas',
        cell: ({ row }) => {
            const s = row.original.sekolah || (typeof row.original.sekolahId === 'object' ? row.original.sekolahId?.nama : undefined);
            const k = row.original.kelasFormal;
            if (!s && !k) return <span className="text-muted-foreground">-</span>;
            return <span>{s ?? ''}{k ? ` (${k})` : ''}</span>;
        }
    },
    {
        id: 'kelasNgaji',
        header: 'Kelas Ngaji',
        cell: ({ row }) => {
            const ngaji = row.original.kelasNgaji;
            if (!ngaji) return <span className="text-muted-foreground">-</span>;
            return <span>{ngaji}</span>;
        }
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
                <ConfirmActionButton
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

export const getAlumniColumns = ({ onDelete }: PropTypes): ColumnDef<Santri>[] => [
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
        id: 'asal',
        header: 'Asal',
        cell: ({ row }) => {
            const kota = row.original.alamat?.kabupatenKota;
            if (!kota) return <span className="text-muted-foreground">-</span>;
            return <span>{kota}</span>;
        },
    },
    {
        id: 'tahunMasuk',
        header: 'Tahun Masuk',
        cell: ({ row }) => {
            const tgl = row.original.tanggalTerdaftar;
            if (!tgl) return <span className="text-muted-foreground">-</span>;
            return <span>{new Date(tgl).getFullYear()}</span>;
        },
    },
    {
        id: 'tahunKeluar',
        header: 'Tahun Keluar',
        cell: ({ row }) => {
            const tgl = row.original.tanggalKeluar;
            if (!tgl) return <span className="text-muted-foreground">-</span>;
            return <span>{new Date(tgl).getFullYear()}</span>;
        },
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
                <ConfirmActionButton
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
