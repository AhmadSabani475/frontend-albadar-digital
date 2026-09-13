import StatCards from '@/components/molecules/StatCards';
import GrafikPemasukanHarian from '@/components/organisms/GrafikPemasukanHarian';
import PieChartStatusTagihan from '@/components/organisms/PieChartStatusTagihan';
import TransaksiTerakhirList from '@/components/organisms/TransaksiTerakhirList';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardSummary } from '@/hooks/use-dashboard-summary';
import { formatIDR } from '@/lib/utils';
import { CreditCard, User2 } from 'lucide-react';



const Dashboard = () => {
    const { data, isLoading } = useDashboardSummary();

    const topStats = [
        {
            title: 'Total Santri Aktif',
            icon: User2,
            value: data?.totalSantriAktif?.toString() ?? '-',
        },
        {
            title: 'Total Tagihan Belum Lunas',
            icon: CreditCard,
            value: formatIDR(data?.totalTagihanBelumLunas),
        },
        {
            title: 'Pemasukan Hari Ini',
            icon: CreditCard,
            value: formatIDR(data?.pemasukanHariIni),
        },
    ];

    const bottomStats = [
        {
            title: 'Saldo Tabungan Ziarah',
            icon: CreditCard,
            value: formatIDR(data?.saldoTabunganZiarah),
        },
        {
            title: 'Saldo Uang Jajan',
            icon: CreditCard,
            value: formatIDR(data?.saldoUangJajan),
        },
    ];

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                {/* Baris Atas: 3 Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isLoading
                        ? Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-28 rounded-xl" />
                        ))
                        : topStats.map((stat) => (
                            <StatCards key={stat.title} title={stat.title} Icon={stat.icon} value={stat.value} />
                        ))}
                </div>

                {/* Baris Bawah: 2 Card (Saldo Tabungan Ziarah & Saldo Uang Jajan) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {isLoading
                        ? Array.from({ length: 2 }).map((_, i) => (
                            <Skeleton key={i} className="h-28 rounded-xl" />
                        ))
                        : bottomStats.map((stat) => (
                            <StatCards key={stat.title} title={stat.title} Icon={stat.icon} value={stat.value} />
                        ))}
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <GrafikPemasukanHarian data={data?.grafikPemasukanHarian ?? []} />
                </div>
                <div className="lg:col-span-1">
                    <PieChartStatusTagihan data={data?.pieChartStatusTagihan ?? []} />
                </div>
            </div>
            <div className="">
                <TransaksiTerakhirList
                    data={data?.transaksiTerakhir ?? []}
                />
            </div>
        </div>
    );
};

export default Dashboard;