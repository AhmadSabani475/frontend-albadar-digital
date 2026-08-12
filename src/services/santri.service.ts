import { fetchAPI } from "@/lib/api";
import type { CreateSantriPayload, Santri } from "@/types/Santri";

export const santriService = {
    getAllSantri: () =>
        fetchAPI<{ message: string, data: Santri[] }>('/santri'),
    createSantri: (payload: CreateSantriPayload) =>
        fetchAPI<{ message: string, data: Santri }>('/santri', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
}