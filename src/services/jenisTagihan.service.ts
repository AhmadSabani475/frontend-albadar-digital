import { fetchAPI } from "@/lib/api";
import type { JenisTagihan } from "@/types/Tagihan";

export const JenisTagihanService = {
    getAllJenisTagihan: () => fetchAPI<{ message: string, data: JenisTagihan[] }>('/jenis-tagihan'),
    createJenisTagihan: (nama: string, tipePeriode: string,
        nominalDefault: number, wajib: boolean
    ) => fetchAPI<{ message: string, data: JenisTagihan }>('/jenis-tagihan', {
        method: 'POST',
        body: JSON.stringify({ nama, tipePeriode, nominalDefault, wajib })
    }),
    deleteById: (id: string) => fetchAPI(`/jenis-tagihan/${id}`, {
        method: 'DELETE'
    })
}