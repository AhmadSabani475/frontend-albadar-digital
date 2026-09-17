import { tunggakanService, type TunggakanFilter } from "@/services/tunggakan.service";
import { useQuery } from "@tanstack/react-query";


export const useTunggakan = (filters?: TunggakanFilter) => {
    return useQuery({
        queryKey: ['tunggakan', filters],
        queryFn: () => tunggakanService.getAllTunggakan(filters),
        select: (res) => res
    })
}