import { tingkatNgajiService } from "@/services/tingkatNgaji.service"
import { useQuery } from "@tanstack/react-query"

export const useTingkatNgajiQuery = () => {
    return useQuery({
        queryKey: ['tingkatNgaji'],
        queryFn: () => tingkatNgajiService.getAllTingkatNgaji(),
        select: (res) => res.data
    })
}