import { fetchAPI } from "@/lib/api";
import type { ResponseTunggakan } from "@/types/Tunggakan";

export interface TunggakanFilter {
    jenisTagihanId?: string;
    kelasId?: string;
}

export const tunggakanService = {
    getAllTunggakan: (filters?: TunggakanFilter) => {
        const params = new URLSearchParams();
        if (filters?.jenisTagihanId) params.append('jenisTagihanId', filters.jenisTagihanId);
        if (filters?.kelasId) params.append('kelasId', filters.kelasId);
        const query = params.toString();
        return fetchAPI<ResponseTunggakan>(`/laporan/tunggakan${query ? `?${query}` : ''}`)
    }
}