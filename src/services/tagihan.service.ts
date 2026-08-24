import { fetchAPI } from "@/lib/api";
import type { Tagihan } from "@/types/Tagihan";

interface TagihanFilter {
    santriId?: string;
    status?: string;
    jenisTagihanId?: string;
    periode?: string;
    overdue?: boolean;
}

interface GenerateBulkPayload {
    jenisTagihanId: string;
    periode: string;
    jatuhTempo: string;
    target: 'semua_aktif' | 'custom';
    santriIds?: string[];
    hanyaLayananLaundry?: boolean;
}

export const tagihanService = {
    getAllTagihan: (filter?: TagihanFilter) => {
        const params = new URLSearchParams();
        if (filter?.santriId) params.append('santriId', filter.santriId);
        if (filter?.status) params.append('status', filter.status);
        if (filter?.jenisTagihanId) params.append('jenisTagihanId', filter.jenisTagihanId);
        if (filter?.periode) params.append('periode', filter.periode);
        if (filter?.overdue) params.append('overdue', 'true');

        const query = params.toString();
        return fetchAPI<{ message: string; data: Tagihan[] }>(`/tagihan${query ? `?${query}` : ''}`);
    },

    createTagihan: (santriId: string, jenisTagihanId: string, periode: string, jatuhTempo: string) =>
        fetchAPI<{ message: string; data: Tagihan }>('/tagihan', {
            method: 'POST',
            body: JSON.stringify({ santriId, jenisTagihanId, periode, jatuhTempo }),
        }),

    generateBulkTagihan: (payload: GenerateBulkPayload) =>
        fetchAPI<{ message: string; data: { berhasil: Tagihan[]; dilewati: { santriId: string; nama: string; alasan: string }[] } }>('/tagihan/generate-bulk', {
            method: 'POST',
            body: JSON.stringify(payload),
        }),
    getTagihanById: (id: string | undefined) =>
        fetchAPI<{ message: string, data: Tagihan }>(`/tagihan/${id}`)
};