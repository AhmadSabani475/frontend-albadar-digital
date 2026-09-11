import { santriService } from "@/services/santri.service";
import { useQuery } from "@tanstack/react-query";

export const useSantriList = (status?: string) => {
    return useQuery({
        queryKey: ['santriList', status],
        queryFn: () => santriService.getAllSantri(status, 1, 1000),
        select: (res) => res.data,
        staleTime: 5 * 60 * 1000,
    });
};