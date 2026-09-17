import type { ColumnDef } from '@tanstack/react-table';
import type { Kwitansi } from '@/types/Kwitansi';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Printer, Upload, CheckCircle2, ExternalLink, ClockAlert } from 'lucide-react';
import { formatIDR } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface ColumnCallbacks {
    onViewStruk: (kwitansi: Kwitansi) => void;
    onUploadBukti: (kwitansi: Kwitansi) => void;
}

export const getKwitansiColumns = ({ onViewStruk, onUploadBukti }: ColumnCallbacks): ColumnDef<Kwitansi>[] => [
    // {
    //     id: 'no',
    //     header: 'No',
    //     size: 50,
    //     cell: ({ row, table }) => {
    //         const { pageIndex, pageSize } = table.getState().pagination;
    //         return <span>{pageIndex * pageSize + row.index + 1}</span>;
    //     },
    // },
    {
        accessorKey: 'nomorKwitansi',
        header: 'No. Kwitansi',
        size: 140,
        cell: ({ row }) => (
            <span className="font-mono font-semibold">{row.original.nomorKwitansi}</span>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: 'Tanggal & Waktu',
        size: 140,
        cell: ({ row }) => {
            const dateStr = row.original.createdAt;
            return (
                <span className="text-xs text-muted-foreground">
                    {new Date(dateStr).toLocaleString('id-ID', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            );
        },
    },
    {
        accessorKey: 'santriId',
        header: 'Nama Santri',
        size: 180,
        cell: ({ row }) => {
            const santriObj = typeof row.original.santriId === 'object' ? row.original.santriId : null;
            const namaSantri = santriObj?.namaLengkap ?? 'Santri';
            const santriId = santriObj?._id;

            return (
                <div className="flex flex-col">
                    {santriId ? (
                        <Link
                            to={`/dashboard/santri/view/${santriId}`}
                            className="font-semibold text-primary hover:underline"
                        >
                            {namaSantri}
                        </Link>
                    ) : (
                        <span className="font-semibold text-foreground">{namaSantri}</span>
                    )}
                    {santriObj?.nis && (
                        <span className="text-xs text-muted-foreground">NIS: {santriObj.nis}</span>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: 'metodePembayaran',
        header: 'Metode Bayar',
        size: 110,
        cell: ({ row }) => {
            const isTransfer = row.original.metodePembayaran === 'transfer';
            return (
                <Badge
                    variant="outline"
                    className={`uppercase text-[10px] font-bold px-2 py-0.5 ${isTransfer
                            ? 'border-blue-500/40 text-blue-600 bg-blue-500/10'
                            : 'border-emerald-500/40 text-emerald-600 bg-emerald-500/10'
                        }`}
                >
                    {row.original.metodePembayaran}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'buktiTransferUrl',
        header: 'Bukti Transfer',
        size: 130,
        cell: ({ row }) => {
            const isTransfer = row.original.metodePembayaran === 'transfer';
            const hasBuktiUrl = Boolean(row.original.buktiTransferUrl);

            if (!isTransfer) {
                return <span className="text-xs text-muted-foreground/60 italic">-</span>;
            }

            if (hasBuktiUrl) {
                return (
                    <a
                        href={row.original.buktiTransferUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium hover:underline bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/30"
                    >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Ada Bukti
                        <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                    </a>
                );
            }

            return (
                <Badge variant="secondary" className="bg-amber-500/15 text-amber-600 border-amber-500/30 gap-1 text-xs font-normal">
                    <ClockAlert className="w-3 h-3" />
                    Belum Upload
                </Badge>
            );
        },
    },
    {
        accessorKey: 'totalNominal',
        header: 'Total Nominal',
        size: 130,
        cell: ({ row }) => (
            <span className="font-bold text-foreground">{formatIDR(row.original.totalNominal)}</span>
        ),
    },
    {
        id: 'actions',
        header: 'Aksi',
        size: 100,
        cell: ({ row }) => {
            const kwitansi = row.original;
            const isTransfer = kwitansi.metodePembayaran === 'transfer';
            const hasBuktiUrl = Boolean(kwitansi.buktiTransferUrl);

            return (
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        title="Cetak / Lihat Struk"
                        onClick={() => onViewStruk(kwitansi)}
                    >
                        <Printer className="w-4 h-4 text-muted-foreground" />
                    </Button>

                    {isTransfer && (
                        <Button
                            variant={hasBuktiUrl ? 'ghost' : 'default'}
                            size="sm"
                            className={!hasBuktiUrl ? 'bg-amber-500 hover:bg-amber-600 text-white' : ''}
                            title={hasBuktiUrl ? 'Edit/Ganti Bukti TF' : 'Upload Bukti TF'}
                            onClick={() => onUploadBukti(kwitansi)}
                        >
                            <Upload className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            );
        },
    },
];
