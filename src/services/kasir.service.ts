import { fetchAPI } from "@/lib/api";
import type { Kwitansi } from "@/types/Kwitansi";
import type { Rekening } from "@/types/Rekening";
import type { Santri } from "@/types/Santri";
import type { TagihanKasir } from "@/types/Tagihan";

interface KasirItem {
    tipe: 'bayar_tagihan' | 'setor_rekening';
    tagihanId?: string;
    rekeningId?: string;
    nominal: number;
    keterangan?: string;
}
interface PayloadTransaksi {
    santriId: string;
    metodePembayaran: 'cash' | 'transfer';
    items: KasirItem[];
}

interface DataRingkasan {
    santri: Santri;
    tagihan: TagihanKasir[];
    rekening: Rekening[];
}

interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export const kasirService = {
    getDataRingkasan: (id: string | undefined) =>
        fetchAPI<{ message: string, data: DataRingkasan }>(`/kasir/${id}/ringkasan`),
    prosesTransaksi: (payload: PayloadTransaksi) =>
        fetchAPI<{ message: string, data: Kwitansi }>('/kasir/transaksi', {
            method: 'POST',
            body: JSON.stringify(payload)
        }),
    getBySantriId: (santriId: string, page = 1, limit = 10) =>
        fetchAPI<{ message: string; data: Kwitansi[]; meta: PaginationMeta }>(
            `/kwitansi?santriId=${santriId}&page=${page}&limit=${limit}`
        )
}