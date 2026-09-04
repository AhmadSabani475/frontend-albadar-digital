// hooks/use-santri.ts
import { santriService } from "@/services/santri.service";
import { useQuery } from "@tanstack/react-query";

export const useSantriList = () => {
    return useQuery({
        queryKey: ['santriList'],
        queryFn: santriService.getAllSantri,
        select: (res) => res.data,
        staleTime: 5 * 60 * 1000, // cache 5 menit, karena data santri jarang berubah
    });
};