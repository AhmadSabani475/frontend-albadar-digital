
import { tingkatNgajiService } from "@/services/tingkatNgaji.service";
import type { PayloadTingkatNgaji } from "@/types/TingkatNgaji";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useTingkatNgajiMutation = () => {
    const queryClient = useQueryClient();

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ['tingkatNgaji'] });

    const create = useMutation({
        mutationFn: tingkatNgajiService.createTingkatNgaji,
        onSuccess: invalidate,
    });

    const update = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: PayloadTingkatNgaji }) =>
            tingkatNgajiService.editById(id, payload),
        onSuccess: invalidate,
    });

    const remove = useMutation({
        mutationFn: tingkatNgajiService.deleteById,
        onSuccess: invalidate,
    });

    return { create, update, remove };
};