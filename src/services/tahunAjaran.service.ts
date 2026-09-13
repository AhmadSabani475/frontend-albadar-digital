import { fetchAPI } from "@/lib/api";
import type { PayloadTahunAjaran, TahunAjaran } from "@/types/TahunAjaran";

export const tahunAjaranService = {
    getAllTahunAjaran: () =>
        fetchAPI<{ message: string, data: TahunAjaran[] }>('/tahun-ajaran'),
    createTahunAjaran: (payload: PayloadTahunAjaran) =>
        fetchAPI<{ message: string, data: TahunAjaran }>('/tahun-ajaran', {
            method: 'POST',
            body: JSON.stringify(payload)
        }),
    editById: (id: string, payload: PayloadTahunAjaran) =>
        fetchAPI<{ message: string, data: TahunAjaran }>(`/tahun-ajaran/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload)
        }),
    deleteById: (id: string) =>
        fetchAPI<{ message: string, data: TahunAjaran }>(`/tahun-ajaran/${id}`, {
            method: 'DELETE'
        })
}