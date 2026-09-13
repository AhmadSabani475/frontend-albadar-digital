import { tingkatKelasService } from "@/services/tingkatKelas.service";
import type { PayloadTingkatKelas } from "@/types/TingkatKelas";
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useTingkatKelasMutation = () => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries({ queryKey: ['tingkatKelas'] });

    const create = useMutation({
        mutationFn: tingkatKelasService.createTingkatKelas,
        onSuccess: invalidate
    })
    const update = useMutation({
        mutationFn: ({ id, payload }: { id: string, payload: PayloadTingkatKelas }) => tingkatKelasService.updateById(id, payload),
        onSuccess: invalidate
    })
    const remove = useMutation({
        mutationFn: tingkatKelasService.deleteById,
        onSuccess: invalidate
    })

    return { create, update, remove }
}
