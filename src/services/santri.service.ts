import { fetchAPI } from '@/lib/api';
import type { CreateSantriPayload, Santri } from '@/types/Santri';

export const santriService = {
    getAllSantri: () =>
        fetchAPI<{ message: string, data: Santri[] }>('/santri'),
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
        )
};