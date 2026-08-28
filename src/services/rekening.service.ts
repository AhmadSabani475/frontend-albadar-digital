import { fetchAPI } from "@/lib/api";
import type { Rekening } from "@/types/Rekening";

interface RekeningFilter {
    santriId?: string;
    jenisRekening?: 'uang_jajan' | 'tabungan_ziarah'
}

interface RekeningPayload {
    santriId: string;
    jenisRekening: string;
    nominalHarian?: number;
}

export const rekeningService = {
    getAllRekening: (filter?: RekeningFilter) => {
        const params = new URLSearchParams();
        if (filter?.santriId) params.append('santriId', filter.santriId);
        if (filter?.jenisRekening) params.append('jenisRekening', filter.jenisRekening);

        const query = params.toString();
        return fetchAPI<{ message: string, data: Rekening[] }>(`/rekening/${query ? `?${query}` : ''}`)
    },
    createRekening: (payload: RekeningPayload) =>
        fetchAPI<{ message: string, data: Rekening }>('/rekening', {
            method: 'POST',
            body: JSON.stringify(payload)
        }),
    getRekeningById: (id: string | undefined) =>
        fetchAPI<{ message: string, data: Rekening }>(`/rekening/${id}`)
}