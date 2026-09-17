import FilterTunggakan from "@/components/organisms/Tunggakan/FilterTunggakan";
import StatCardsTunggakan from "@/components/organisms/Tunggakan/StatCardsTunggakan";
import TabelTunggakan from "@/components/organisms/Tunggakan/TabelTunggakan";
import { Skeleton } from "@/components/ui/skeleton";
import { useTunggakan } from "@/hooks/use-tunggakan";
import type { TunggakanFilter } from "@/services/tunggakan.service";
import { useState } from "react";


const initialFilters: TunggakanFilter = {
    jenisTagihanId: "",
    kelasId: "",
};

const TunggakanPage = () => {
    const [filters, setFilters] = useState<TunggakanFilter>(initialFilters);
    const { data, isLoading } = useTunggakan(filters);

    const handleFilterChange = (key: keyof TunggakanFilter, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleResetFilter = () => {
        setFilters(initialFilters);
    };

    return (
        <div className="flex flex-col gap-6">
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-28 rounded-xl" />
                    ))}
                </div>
            ) : (
                <StatCardsTunggakan Stats={data?.stats} />
            )}

            <FilterTunggakan
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilter}
            />

            <TabelTunggakan data={data?.data} isLoading={isLoading} />
        </div>
    );
};

export default TunggakanPage;