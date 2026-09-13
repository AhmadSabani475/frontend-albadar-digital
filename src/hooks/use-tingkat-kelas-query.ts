import { tingkatKelasService } from "@/services/tingkatKelas.service"
import { useQuery } from "@tanstack/react-query"

export const useTingkatKelasQuery = (sekolahId?: string) => {
    return useQuery({
        queryKey: ['tingkatKelas', sekolahId],
        queryFn: () => tingkatKelasService.getAll(sekolahId),
        select: (res) => res.data
    })
}