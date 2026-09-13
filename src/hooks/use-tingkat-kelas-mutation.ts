import { tingkatKelasService } from "@/services/tingkatKelas.service";
import type { PayloadTingkatKelas } from "@/types/TingkatKelas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

export const useTingkatKelasMutation = () => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries({ queryKey: ['tingkatKelas'] });

    const create = useMutation({
        mutationFn: tingkatKelasService.createTingkatKelas,
        onSuccess: (data) => {
            invalidate();
            toast({
                variant: "success",
                title: "Berhasil",
                description: data.message || "Tingkat Kelas berhasil ditambahkan",
            });
        },
        onError: (err: any) => {
            toast({
                variant: "destructive",
                title: "Gagal",
                description: err.message || "Gagal menambahkan tingkat kelas",
            });
        }
    });

    const update = useMutation({
        mutationFn: ({ id, payload }: { id: string, payload: PayloadTingkatKelas }) => tingkatKelasService.updateById(id, payload),
        onSuccess: (data) => {
            invalidate();
            toast({
                variant: "success",
                title: "Berhasil",
                description: data.message || "Tingkat Kelas berhasil diperbarui",
            });
        },
        onError: (err: any) => {
            toast({
                variant: "destructive",
                title: "Gagal",
                description: err.message || "Gagal mengedit tingkat kelas",
            });
        }
    });

    const remove = useMutation({
        mutationFn: tingkatKelasService.deleteById,
        onSuccess: (data) => {
            invalidate();
            toast({
                variant: "success",
                title: "Berhasil",
                description: data.message || "Tingkat Kelas berhasil dihapus",
            });
        },
        onError: (err: any) => {
            toast({
                variant: "destructive",
                title: "Gagal",
                description: err.message || "Gagal menghapus tingkat kelas",
            });
        }
    });

    return { create, update, remove };
};
