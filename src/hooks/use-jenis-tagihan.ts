import { JenisTagihanService } from "@/services/jenisTagihan.service"
import { useQuery } from "@tanstack/react-query"


export const useJenisTagihan = () => {
    return useQuery({
        queryKey: ['jenisTagihan'],
        queryFn: () => JenisTagihanService.getAllJenisTagihan(),
        select: (res) => res.data
    })
}
