import { kasirService } from "@/services/kasir.service"
import { useQuery } from "@tanstack/react-query"


export const useRiwayatKwitansiSantri = (santriId: string, page = 1) => {
    return useQuery({
        queryKey: ['riwayatKwitansi', santriId, page],
        queryFn: () => kasirService.getBySantriId(santriId, page),
        enabled: Boolean(santriId),
        select: (res) => res
    })
}