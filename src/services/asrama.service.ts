import { fetchAPI } from '@/lib/api';
import type { Asrama } from '@/types/Kamar';

interface PayloadAsrama {
    namaAsrama: string;
    keterangan?: string;
}

export const asramaService = {
    getAllAsrama: () => fetchAPI<{ message: string, data: Asrama[] }>('/asrama'),
    createAsrama: (payload: PayloadAsrama) => fetchAPI<{ message: string, data: Asrama }>('/asrama', {
        method: 'POST',
        body: JSON.stringify(payload)
    }),
    deleteAsrama: (id: string) =>
        fetchAPI<{ message: string, data: Asrama }>(`/asrama/${id}`, {
            method: 'DELETE'
        })
};