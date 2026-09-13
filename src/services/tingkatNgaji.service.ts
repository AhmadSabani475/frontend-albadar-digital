import { fetchAPI } from "@/lib/api";
import type { PayloadTingkatNgaji, TingkatNgaji } from "@/types/TingkatNgaji";

export const tingkatNgajiService = {
    getAllTingkatNgaji: () =>
        fetchAPI<{ message: string, data: TingkatNgaji[] }>('/tingkat-ngaji'),
    createTingkatNgaji: (payload: PayloadTingkatNgaji) =>
        fetchAPI<{ message: string, data: TingkatNgaji }>('/tingkat-ngaji', {
            method: 'POST',
            body: JSON.stringify(payload)
        }
        ),
    editById: (id: string, payload: PayloadTingkatNgaji) =>
        fetchAPI<{ message: string, data: TingkatNgaji }>(`/tingkat-ngaji/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(payload)
            }
        ),
    deleteById: (id: string) =>
        fetchAPI<{ message: string, data: TingkatNgaji }>(`/tingkat-ngaji/${id}`, {
            method: 'DELETE'
        })
}