import { fetchAPI } from "@/lib/api";
import type { Kwitansi, RiwayatKwitansiResponse } from "@/types/Kwitansi";
import type { Rekening } from "@/types/Rekening";
import type { Santri } from "@/types/Santri";
import type { TagihanKasir } from "@/types/Tagihan";

interface KasirItem {
    tipe: 'bayar_tagihan' | 'setor_rekening' | 'tarik_rekening';
    tagihanId?: string;
    rekeningId?: string;
    nominal: number;
    keterangan?: string;
}

interface PayloadTransaksi {
    santriId: string;
    metodePembayaran: 'cash' | 'transfer';
    buktiTransferUrl?: string;
    items: KasirItem[];
}

interface DataRingkasan {
    santri: Santri;
    tagihan: TagihanKasir[];
    rekening: Rekening[];
}

export interface KwitansiFilterParams {
    santriId?: string;
    metodePembayaran?: 'cash' | 'transfer' | '';
    hasBukti?: 'true' | 'false' | '';
    search?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}

export const kasirService = {
    getDataRingkasan: (id: string | undefined) =>
        fetchAPI<{ message: string; data: DataRingkasan }>(`/kasir/${id}/ringkasan`),

    prosesTransaksi: (payload: PayloadTransaksi) =>
        fetchAPI<{ message: string; data: Kwitansi }>('/kasir/transaksi', {
            method: 'POST',
            body: JSON.stringify(payload),
        }),

    getKwitansiList: (params: KwitansiFilterParams = {}) => {
        const query = new URLSearchParams();
        if (params.santriId) query.append('santriId', params.santriId);
        if (params.metodePembayaran) query.append('metodePembayaran', params.metodePembayaran);
        if (params.hasBukti) query.append('hasBukti', params.hasBukti);
        if (params.search) query.append('search', params.search);
        if (params.startDate) query.append('startDate', params.startDate);
        if (params.endDate) query.append('endDate', params.endDate);
        if (params.page) query.append('page', String(params.page));
        if (params.limit) query.append('limit', String(params.limit));

        const queryString = query.toString();
        return fetchAPI<RiwayatKwitansiResponse>(`/kwitansi${queryString ? `?${queryString}` : ''}`);
    },

    getBySantriId: (santriId: string, page = 1, limit = 10) =>
        kasirService.getKwitansiList({ santriId, page, limit }),

    updateBuktiTransfer: (id: string, buktiTransferUrl: string) =>
        fetchAPI<{ message: string; data: Kwitansi }>(`/kwitansi/${id}/bukti-transfer`, {
            method: 'PATCH',
            body: JSON.stringify({ buktiTransferUrl }),
        }),
};