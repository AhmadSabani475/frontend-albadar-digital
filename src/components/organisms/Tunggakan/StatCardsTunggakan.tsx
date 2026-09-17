import StatCards from "@/components/atoms/StatCards";
import { formatIDR } from "@/lib/utils";
import type { TunggakanStats } from "@/types/Tunggakan";
import { Banknote, Calculator, ClockAlert, Users } from "lucide-react";


interface Props {
    Stats?: TunggakanStats;
}
const StatCardsTunggakan = ({ Stats }: Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCards
                Icon={Users}
                title="Santri Menunggak"
                value={`${Stats?.totalSantriMenunggak ?? 0} Santri`}
            />
            <StatCards
                Icon={Banknote}
                title="Total Tunggakan"
                value={formatIDR(Stats?.totalNominalTunggakan ?? 0)}
            />
            <StatCards
                Icon={Calculator}
                title="Rata-rata / Santri"
                value={formatIDR(Stats?.rataRataPerSantri ?? 0)}
            />
            <StatCards
                Icon={ClockAlert}
                title="Menunggak > 30 Hari"
                value={`${Stats?.jumlahLebih30Hari ?? 0} Santri`}
            />
        </div>
    );
}
export default StatCardsTunggakan;