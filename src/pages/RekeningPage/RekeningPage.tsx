import CreateRekeningDialog from "@/components/organisms/Rekening/CreateRekeningDialog";
import StatCards from "@/components/atoms/StatCards";
import TableRekening from "@/components/organisms/Rekening/TableRekening";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardSummary } from "@/hooks/use-dashboard-summary";
import { formatIDR } from "@/lib/utils";
import { CreditCard } from "lucide-react";
import { useState } from "react";

const RekeningPage = () => {
    const [refreshKey] = useState(0);
    const { data, isLoading } = useDashboardSummary();
    const stats = [
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
    ]
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {isLoading
                    ? Array.from({ length: 2 }).map((_, i) => (
                        <Skeleton key={i} className="h-28 rounded-xl" />
                    ))
                    : stats.map((stat) => (
                        <StatCards key={stat.title} title={stat.title} Icon={stat.icon} value={stat.value} />
                    ))}
            </div>

            <div className="flex justify-end">
                <CreateRekeningDialog />
            </div>
            <TableRekening key={refreshKey} />
        </div>
    );
};
export default RekeningPage;