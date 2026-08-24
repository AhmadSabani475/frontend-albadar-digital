import { fetchAPI } from "@/lib/api";
import type { Pembayaran } from "@/types/Pembayaran";

interface PembayaranFilter {
    santriId?: string;
    tagihanId?: string;
}

interface PembayaranPayload {
    tagihanId: string;
    nominalBayar: number;
    tanggalBayar?: Date;
}

export const pembayaranService = {
    getAllPembayaran: (filter?: PembayaranFilter) => {
        const params = new URLSearchParams();
        if (filter?.santriId) params.append('santriId', filter.santriId);
        if (filter?.tagihanId) params.append('tagihanId', filter.tagihanId);
        const query = params.toString();
        return fetchAPI<{ message: string, data: Pembayaran[] }>(`/pembayaran${query ? `?${query}` : ''}`)
    },
    createPembayaran: (payload: PembayaranPayload) =>
        fetchAPI<{ message: string, data: Pembayaran }>('/pembayaran', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
}