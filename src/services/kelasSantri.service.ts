import { fetchAPI } from "@/lib/api";
import type {
    FilterKelasSantriParams,
    KelasSantri,
    PayloadKeputusanManualKelas,
    PayloadKelasSantri,
    PayloadNaikKelas,
    ResponseNaikKelas
} from "@/types/KelasSantri";

export const kelasSantriService = {
    getAll: (params?: FilterKelasSantriParams) => {
        const queryParams = new URLSearchParams();
        if (params?.tahunAjaranId) queryParams.append('tahunAjaranId', params.tahunAjaranId);
        if (params?.santriId) queryParams.append('santriId', params.santriId);
        if (params?.tingkatKelasId) queryParams.append('tingkatKelasId', params.tingkatKelasId);

        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
        return fetchAPI<{ message: string; data: KelasSantri[] }>(`/kelas-santri${queryString}`);
    },
    create: (payload: PayloadKelasSantri) => {
        return fetchAPI<{ message: string; data: KelasSantri }>('/kelas-santri', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    },
    deleteById: (id: string) => {
        return fetchAPI<{ message: string; data: null }>(`/kelas-santri/${id}`, {
            method: 'DELETE'
        });
    },
    naikKelas: (payload: PayloadNaikKelas) => {
        return fetchAPI<{ message: string; data: ResponseNaikKelas }>('/kelas-santri/naik-kelas', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    },
    keputusanManual: (payload: PayloadKeputusanManualKelas) => {
        return fetchAPI<{ message: string; data: KelasSantri | null }>('/kelas-santri/keputusan-manual', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    }
};
