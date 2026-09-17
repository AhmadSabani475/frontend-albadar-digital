import { useState, useEffect, useMemo } from 'react';
import {
    Wallet,
    Banknote,
    CreditCard,
    ClockAlert,
} from 'lucide-react';
import { kasirService, type KwitansiFilterParams } from '@/services/kasir.service';
import type { Kwitansi, SummaryRiwayat } from '@/types/Kwitansi';
import StrukKwitansiDialog from '@/components/organisms/Kasir/StrukKwitansiDialog';
import UploadBuktiTfDialog from '@/components/organisms/Kasir/UploadBuktiTfDialog';
import StatCards from '@/components/atoms/StatCards';
import DataTable from '@/components/organisms/DataTable';
import { formatIDR } from '@/lib/utils';
import { getKwitansiColumns } from '@/components/organisms/RiwayatTransaksi/columns';
import FilterRiwayatTransaksi, { type RiwayatTransaksiFilter } from '@/components/organisms/RiwayatTransaksi/FilterRiwayatTransaksi';
import { Skeleton } from '@/components/ui/skeleton';

const initialFilters: RiwayatTransaksiFilter = {
    metodePembayaran: '',
    hasBukti: '',
    startDate: '',
    endDate: '',
};

export const RiwayatTransaksiPage = () => {
    const [kwitansiList, setKwitansiList] = useState<Kwitansi[]>([]);
    const [summary, setSummary] = useState<SummaryRiwayat>();
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState<RiwayatTransaksiFilter>(initialFilters);

    // Selected Kwitansi Dialog States
    const [selectedStrukKwitansi, setSelectedStrukKwitansi] = useState<Kwitansi | null>(null);
    const [uploadTargetKwitansi, setUploadTargetKwitansi] = useState<Kwitansi | null>(null);

    const fetchKwitansi = async () => {
        setIsLoading(true);
        try {
            const params: KwitansiFilterParams = {
                limit: 200, // retrieve entries for client-side search & pagination in DataTable
                metodePembayaran: filters.metodePembayaran || undefined,
                hasBukti: filters.hasBukti || undefined,
                startDate: filters.startDate || undefined,
                endDate: filters.endDate || undefined,
            };
            const response = await kasirService.getKwitansiList(params);
            setKwitansiList(response.data);
            setSummary(response.summary);
        } catch (error) {
            console.error('Gagal mengambil data kwitansi:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchKwitansi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.metodePembayaran, filters.hasBukti, filters.startDate, filters.endDate]);

    const handleFilterChange = (key: keyof RiwayatTransaksiFilter, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleResetFilter = () => {
        setFilters(initialFilters);
    };

    const columns = useMemo(
        () =>
            getKwitansiColumns({
                onViewStruk: (kwitansi) => setSelectedStrukKwitansi(kwitansi),
                onUploadBukti: (kwitansi) => setUploadTargetKwitansi(kwitansi),
            }),
        []
    );

    return (
        <div className="flex flex-col gap-6 w-full pb-10">
            {/* Stat Summary Cards Reusing StatCards Atom */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-24 rounded-xl" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCards
                        Icon={Wallet}
                        title="Total Pemasukan"
                        value={formatIDR(summary?.totalSudahBayar ?? 0)}
                    />
                    <StatCards
                        Icon={Banknote}
                        title="Total Cash"
                        value={formatIDR(summary?.totalCash ?? 0)}
                    />
                    <StatCards
                        Icon={CreditCard}
                        title="Total Transfer"
                        value={formatIDR(summary?.totalTransfer ?? 0)}
                    />
                    <StatCards
                        Icon={ClockAlert}
                        title="Perlu Bukti TF"
                        value={`${summary?.totalPendingBukti ?? 0} Transaksi`}
                    />
                </div>
            )}

            {/* Filter Section Reusing Standard Filter Pattern */}
            <FilterRiwayatTransaksi
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilter}
            />

            {/* Single Unified DataTable Component (No duplicate search input) */}
            <DataTable
                columns={columns}
                data={kwitansiList}
                isLoading={isLoading}
                searchPlaceholder="Cari No. Kwitansi / Nama Santri..."
                emptyMessage="Belum ada data transaksi kwitansi"
            />

            {/* Struk Kwitansi View/Print Modal */}
            <StrukKwitansiDialog
                kwitansi={selectedStrukKwitansi}
                onClose={() => setSelectedStrukKwitansi(null)}
            />

            {/* Upload Bukti TF Modal */}
            <UploadBuktiTfDialog
                kwitansi={uploadTargetKwitansi}
                isOpen={Boolean(uploadTargetKwitansi)}
                onClose={() => setUploadTargetKwitansi(null)}
                onSuccess={() => fetchKwitansi()}
            />
        </div>
    );
};

export default RiwayatTransaksiPage;
