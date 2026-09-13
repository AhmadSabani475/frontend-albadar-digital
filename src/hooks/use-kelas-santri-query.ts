import { kelasSantriService } from "@/services/kelasSantri.service";
import type { FilterKelasSantriParams } from "@/types/KelasSantri";
import { useQuery } from "@tanstack/react-query";

export const useKelasSantriQuery = (params?: FilterKelasSantriParams) => {
    return useQuery({
        queryKey: ['kelasSantri', params],
        queryFn: () => kelasSantriService.getAll(params),
        select: (res) => res.data,
    });
};
