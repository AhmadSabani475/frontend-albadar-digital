import { tingkatNgajiService } from "@/services/tingkatNgaji.service";
import type { PayloadTingkatNgaji } from "@/types/TingkatNgaji";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

export const useTingkatNgajiMutation = () => {
    const queryClient = useQueryClient();

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ['tingkatNgaji'] });

    const create = useMutation({
        mutationFn: tingkatNgajiService.createTingkatNgaji,
        onSuccess: (data) => {
            invalidate();
            toast({
                variant: "success",
                title: "Berhasil",
                description: data.message || "Tingkat Ngaji berhasil ditambahkan",
            });
        },
        onError: (err: any) => {
            toast({
                variant: "destructive",
                title: "Gagal",
                description: err.message || "Gagal menambahkan tingkat ngaji",
            });
        }
    });

    const update = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: PayloadTingkatNgaji }) =>
            tingkatNgajiService.editById(id, payload),
        onSuccess: (data) => {
            invalidate();
            toast({
                variant: "success",
                title: "Berhasil",
                description: data.message || "Tingkat Ngaji berhasil diperbarui",
            });
        },
        onError: (err: any) => {
            toast({
                variant: "destructive",
                title: "Gagal",
                description: err.message || "Gagal mengedit tingkat ngaji",
            });
        }
    });

    const remove = useMutation({
        mutationFn: tingkatNgajiService.deleteById,
        onSuccess: (data) => {
            invalidate();
            toast({
                variant: "success",
                title: "Berhasil",
                description: data.message || "Tingkat Ngaji berhasil dihapus",
            });
        },
        onError: (err: any) => {
            toast({
                variant: "destructive",
                title: "Gagal",
                description: err.message || "Gagal menghapus tingkat ngaji",
            });
        }
    });

    return { create, update, remove };
};