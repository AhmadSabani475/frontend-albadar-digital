import { fetchAPI } from "@/lib/api";
import type { TarifKhusus } from "@/types/Tagihan";


export const tarifKhususService = {
    getAllTarifKhusus: () =>
        fetchAPI<{ message: string, data: TarifKhusus[] }>('/tarif-khusus'),
    createTarifKhusus: (santriId: string, jenisTagihanId: string,
        nominalKhusus: number, keterangan?: string
    ) => fetchAPI('/tarif-khusus', {
        method: 'POST',
        body: JSON.stringify({ santriId, jenisTagihanId, nominalKhusus, keterangan })
    }),
    deleteTarifKhusus: (id: string) => fetchAPI(`/tarif-khusus/${id}`, {
        method: 'DELETE'
    })
}