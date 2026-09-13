import { tahunAjaranService } from "@/services/tahunAjaran.service";
import type { PayloadTahunAjaran } from "@/types/TahunAjaran";
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useTahunAjaranMutation = () => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries({ queryKey: ['tahunAjaran'] });

    const create = useMutation({
        mutationFn: tahunAjaranService.createTahunAjaran,
        onSuccess: invalidate
    });

    const update = useMutation({
        mutationFn: ({ id, payload }: { id: string, payload: PayloadTahunAjaran }) => tahunAjaranService.editById(id, payload),
        onSuccess: invalidate
    })
    const remove = useMutation({
        mutationFn: tahunAjaranService.deleteById,
        onSuccess: invalidate
    })

    return { create, update, remove }
}