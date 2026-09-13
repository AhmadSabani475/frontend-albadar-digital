import { riwayatKelasNgajiService } from "@/services/riwayatKelasNgaji.service";
import type {
    PayloadKeputusanManualNgaji,
    PayloadNaikKelasNgaji,
    PayloadRiwayatKelasNgaji,
    PayloadUpdateRiwayatKelasNgaji
} from "@/types/RiwayatKelasNgaji";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRiwayatKelasNgajiMutation = () => {
    const queryClient = useQueryClient();
    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: ['riwayatKelasNgaji'] });
        queryClient.invalidateQueries({ queryKey: ['santri'] });
    };

    const create = useMutation({
        mutationFn: (payload: PayloadRiwayatKelasNgaji) => riwayatKelasNgajiService.create(payload),
        onSuccess: invalidate,
    });

    const update = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: PayloadUpdateRiwayatKelasNgaji }) =>
            riwayatKelasNgajiService.updateById(id, payload),
        onSuccess: invalidate,
    });

    const remove = useMutation({
        mutationFn: (id: string) => riwayatKelasNgajiService.deleteById(id),
        onSuccess: invalidate,
    });

    const naikKelasNgaji = useMutation({
        mutationFn: (payload: PayloadNaikKelasNgaji) => riwayatKelasNgajiService.naikKelasNgaji(payload),
        onSuccess: invalidate,
    });

    const keputusanManual = useMutation({
        mutationFn: (payload: PayloadKeputusanManualNgaji) => riwayatKelasNgajiService.keputusanManual(payload),
        onSuccess: invalidate,
    });

    return { create, update, remove, naikKelasNgaji, keputusanManual };
};
