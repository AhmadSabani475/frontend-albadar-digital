import { tahunAjaranService } from "@/services/tahunAjaran.service";
import type { PayloadTahunAjaran } from "@/types/TahunAjaran";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

export const useTahunAjaranMutation = () => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries({ queryKey: ['tahunAjaran'] });

    const create = useMutation({
        mutationFn: tahunAjaranService.createTahunAjaran,
        onSuccess: (data) => {
            invalidate();
            toast({
                variant: "success",
                title: "Berhasil",
                description: data.message || "Tahun Ajaran berhasil ditambahkan",
            });
        },
        onError: (err: any) => {
            toast({
                variant: "destructive",
                title: "Gagal",
                description: err.message || "Gagal menambahkan tahun ajaran",
            });
        }
    });

    const update = useMutation({
        mutationFn: ({ id, payload }: { id: string, payload: PayloadTahunAjaran }) => tahunAjaranService.editById(id, payload),
        onSuccess: (data) => {
            invalidate();
            toast({
                variant: "success",
                title: "Berhasil",
                description: data.message || "Tahun Ajaran berhasil diperbarui",
            });
        },
        onError: (err: any) => {
            toast({
                variant: "destructive",
                title: "Gagal",
                description: err.message || "Gagal mengedit tahun ajaran",
            });
        }
    });

    const remove = useMutation({
        mutationFn: tahunAjaranService.deleteById,
        onSuccess: (data) => {
            invalidate();
            toast({
                variant: "success",
                title: "Berhasil",
                description: data.message || "Tahun Ajaran berhasil dihapus",
            });
        },
        onError: (err: any) => {
            toast({
                variant: "destructive",
                title: "Gagal",
                description: err.message || "Gagal menghapus tahun ajaran",
            });
        }
    });

    return { create, update, remove };
};