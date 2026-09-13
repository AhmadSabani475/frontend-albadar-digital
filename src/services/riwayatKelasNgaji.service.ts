import { fetchAPI } from "@/lib/api";
import type {
    FilterRiwayatKelasNgajiParams,
    PayloadKeputusanManualNgaji,
    PayloadNaikKelasNgaji,
    PayloadRiwayatKelasNgaji,
    PayloadUpdateRiwayatKelasNgaji,
    ResponseNaikKelasNgaji,
    RiwayatKelasNgaji
} from "@/types/RiwayatKelasNgaji";

export const riwayatKelasNgajiService = {
    getAll: (params?: FilterRiwayatKelasNgajiParams) => {
        const queryParams = new URLSearchParams();
        if (params?.tahunAjaranId) queryParams.append('tahunAjaranId', params.tahunAjaranId);
        if (params?.santriId) queryParams.append('santriId', params.santriId);

        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
        return fetchAPI<{ message: string; data: RiwayatKelasNgaji[] }>(`/riwayat-kelas-ngaji${queryString}`);
    },
    create: (payload: PayloadRiwayatKelasNgaji) => {
        return fetchAPI<{ message: string; data: RiwayatKelasNgaji }>('/riwayat-kelas-ngaji', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    },
    updateById: (id: string, payload: PayloadUpdateRiwayatKelasNgaji) => {
        return fetchAPI<{ message: string; data: RiwayatKelasNgaji }>(`/riwayat-kelas-ngaji/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload)
        });
    },
    deleteById: (id: string) => {
        return fetchAPI<{ message: string; data: null }>(`/riwayat-kelas-ngaji/${id}`, {
            method: 'DELETE'
        });
    },
    naikKelasNgaji: (payload: PayloadNaikKelasNgaji) => {
        return fetchAPI<{ message: string; data: ResponseNaikKelasNgaji }>('/riwayat-kelas-ngaji/naik-kelas', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    },
    keputusanManual: (payload: PayloadKeputusanManualNgaji) => {
        return fetchAPI<{ message: string; data: RiwayatKelasNgaji | null }>('/riwayat-kelas-ngaji/keputusan-manual', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    }
};
