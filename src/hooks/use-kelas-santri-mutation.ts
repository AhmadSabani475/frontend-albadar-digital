import { kelasSantriService } from "@/services/kelasSantri.service";
import type { PayloadKeputusanManualKelas, PayloadKelasSantri, PayloadNaikKelas } from "@/types/KelasSantri";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useKelasSantriMutation = () => {
    const queryClient = useQueryClient();
    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: ['kelasSantri'] });
        queryClient.invalidateQueries({ queryKey: ['santri'] });
    };

    const create = useMutation({
        mutationFn: (payload: PayloadKelasSantri) => kelasSantriService.create(payload),
        onSuccess: invalidate,
    });

    const remove = useMutation({
        mutationFn: (id: string) => kelasSantriService.deleteById(id),
        onSuccess: invalidate,
    });

    const naikKelas = useMutation({
        mutationFn: (payload: PayloadNaikKelas) => kelasSantriService.naikKelas(payload),
        onSuccess: invalidate,
    });

    const keputusanManual = useMutation({
        mutationFn: (payload: PayloadKeputusanManualKelas) => kelasSantriService.keputusanManual(payload),
        onSuccess: invalidate,
    });

    return { create, remove, naikKelas, keputusanManual };
};
