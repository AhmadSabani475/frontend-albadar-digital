import { fetchAPI } from '@/lib/api';
import type { CreateSantriPayload, Santri } from '@/types/Santri';
interface SantriMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export const santriService = {
    getAllSantri: (status?: string, page = 1, limit = 10) => {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        params.append('page', String(page));
        params.append('limit', String(limit));

        return fetchAPI<{ message: string; data: Santri[]; meta: SantriMeta }>(
            `/santri?${params.toString()}`
        );
    },
    createSantri: (payload: CreateSantriPayload) =>
        fetchAPI<{ message: string, data: Santri }>('/santri', {
            method: 'POST',
            body: JSON.stringify(payload)
        }),
    getSantriById: (id: string) =>
        fetchAPI<{ message: string, data: Santri }>(`/santri/${id}`),
    editSantriById: (id: string, payload: CreateSantriPayload) =>
        fetchAPI<{ message: string, data: Santri }>(
            `/santri/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(payload)
            }
        ),
    deleteSantriById: (id: string) =>
        fetchAPI<{ message: string, success: boolean }>(
            `/santri/${id}`, {
            method: 'DELETE'
        }
        ),
    updateStatus: (id: string, status: 'aktif' | 'alumni') =>
        fetchAPI<{ message: string, data: Santri }>(
            `/santri/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        }
        ),
};