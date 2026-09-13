import { fetchAPI } from "@/lib/api";
import type { PayloadTingkatKelas, TingkatKelas } from "@/types/TingkatKelas";

export const tingkatKelasService = {
    getAll: (sekolahId?: string) => {
        const query = sekolahId ? `?sekolahId=${sekolahId}` : '';
        return fetchAPI<{ message: string; data: TingkatKelas[] }>(`/tingkat-kelas${query}`);
    },
    createTingkatKelas: (payload: PayloadTingkatKelas) => {
        return fetchAPI<{ message: string, data: TingkatKelas }>('/tingkat-kelas', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
    },
    updateById: (id: string, payload: PayloadTingkatKelas) => {
        return fetchAPI<{ message: string, data: TingkatKelas }>(`/tingkat-kelas/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload)
        })
    },
    deleteById: (id: string) => {
        return fetchAPI<{ message: string, data: TingkatKelas }>(`/tingkat-kelas/${id}`, {
            method: 'DELETE',
        })
    },
    getById: (id: string) => {
        return fetchAPI<{ message: string, data: TingkatKelas }>(`/tingkat-kelas/${id}`)
    },
}