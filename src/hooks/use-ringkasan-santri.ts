import { kasirService } from "@/services/kasir.service";
import { useQuery } from "@tanstack/react-query";

export const useRingkasanSantri = (santriId?: string) => {
    return useQuery({
        queryKey: ['ringkasanSantri', santriId],
        queryFn: () => kasirService.getDataRingkasan(santriId),
        enabled: Boolean(santriId),
        select: (res) => res.data
    });
};