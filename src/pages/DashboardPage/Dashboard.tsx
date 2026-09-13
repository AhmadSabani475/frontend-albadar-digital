import StatCards from '@/components/molecules/StatCards';
import GrafikPemasukanHarian from '@/components/organisms/GrafikPemasukanHarian';
import PieChartStatusTagihan from '@/components/organisms/PieChartStatusTagihan';
import TransaksiTerakhirList from '@/components/organisms/TransaksiTerakhirList';
import { useDashboardSummary } from '@/hooks/use-dashboard-summary';
import { formatIDR } from '@/lib/utils';
import { CreditCard, User2 } from 'lucide-react';



const Dashboard = () => {
    const { data, isLoading } = useDashboardSummary();
    const stats = [
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
            title: 'Saldo Tabungan Ziarah',
            icon: CreditCard,
            value: formatIDR(data?.saldoTabunganZiarah),
        },
        {
            title: 'Saldo Uang Jajan',
            icon: CreditCard,
            value: formatIDR(data?.saldoUangJajan),
        },
        {
            title: 'Pemasukan Hari Ini',
            icon: CreditCard,
            value: formatIDR(data?.pemasukanHariIni),
        },
    ]
    return (
        <div className="w-full flex flex-col gap-6">
            {/* <div className="rounded-2xl  p-8 border">
                <h1 className="text-2xl font-bold text-white">
                    Selamat datang, {user?.santriId?.namaLengkap} 👋
                </h1>
                <p className="text-sm text-emerald-200/80 mt-1">
                    {user?.role === 'admin' ? 'Administrator' : 'Pengurus'} — Al-Badar Digital Portal
                </p>
            </div> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-28 rounded-xl border animate-pulse bg-muted" />
                    ))
                    : stats.map((stat) => (
                        <StatCards key={stat.title} title={stat.title} Icon={stat.icon} value={stat.value} />
                    ))}
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