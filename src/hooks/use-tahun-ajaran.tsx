import { tahunAjaranService } from "@/services/tahunAjaran.service"
import { useQuery } from "@tanstack/react-query"


export const useTahunAjaran = () => {
    return useQuery({
        queryKey: ['tahunAjaran'],
        queryFn: () => tahunAjaranService.getAllTahunAjaran(),
        select: (res) => res.data
    })
}