import { fetchAPI } from "@/lib/api"
import type { MutasiRekening } from "@/types/Mutasi"

interface MutasiPayload {
    rekeningId: string | undefined;
    jenis: 'setor' | 'tarik';
    kategori: 'harian' | 'manual';
    nominal: number;
    keterangan?: string;
}

export const mutasiService = {
    getMutasiByRekeningId: (rekeningId: string | undefined) =>
        fetchAPI<{ message: string, data: MutasiRekening[] }>(`/rekening/${rekeningId}/mutasi`),
    createMutasi: (payload: MutasiPayload) =>
        fetchAPI<{ message: string, data: MutasiRekening }>('/rekening/mutasi', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
}