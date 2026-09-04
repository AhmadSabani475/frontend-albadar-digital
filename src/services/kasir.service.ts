import { fetchAPI } from "@/lib/api";
import type { Kwitansi } from "@/types/Kwitansi";
import type { Rekening } from "@/types/Rekening";
import type { Santri } from "@/types/Santri";
import type { Tagihan } from "@/types/Tagihan";

interface KasirItem  {
    tipe: 'bayar_tagihan' | 'setor_rekening';
    tagihanId?: string;
    rekeningId?: string;
    nominal: number;
    keterangan?: string;
}
interface PayloadTransaksi {
    santriId: string;
    items: KasirItem [];
}

interface DataRingkasan {
    santri: Santri;
    tagihan: Tagihan[];
    rekening: Rekening[];
}

export const kasirService = {
    getDataRingkasan: (id: string | undefined) =>
        fetchAPI<{ message: string, data: DataRingkasan }>(`/kasir/${id}/ringkasan`),
    prosesTransaksi: (payload: PayloadTransaksi) =>
        fetchAPI<{ message: string, data: Kwitansi }>('/kasir/transaksi', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
}