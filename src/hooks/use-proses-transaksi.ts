import { kasirService } from "@/services/kasir.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useProsesTransaksi = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: kasirService.prosesTransaksi,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['ringkasanSantri', variables.santriId]
            })
        }
    })
}