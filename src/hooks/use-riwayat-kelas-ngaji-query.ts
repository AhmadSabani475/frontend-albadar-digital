import { riwayatKelasNgajiService } from "@/services/riwayatKelasNgaji.service";
import type { FilterRiwayatKelasNgajiParams } from "@/types/RiwayatKelasNgaji";
import { useQuery } from "@tanstack/react-query";

export const useRiwayatKelasNgajiQuery = (params?: FilterRiwayatKelasNgajiParams) => {
    return useQuery({
        queryKey: ['riwayatKelasNgaji', params],
        queryFn: () => riwayatKelasNgajiService.getAll(params),
        select: (res) => res.data,
    });
};
