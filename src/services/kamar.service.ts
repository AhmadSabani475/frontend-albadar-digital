import { fetchAPI } from "@/lib/api";
import type { Kamar } from "@/types/Kamar";

export const kamarService = {
    getAllKamar: () => fetchAPI<{ message: string; data: Kamar[] }>('/kamar'),
    createKamar: (namaKamar: string, asramaId: string, kapasitas: number) =>
        fetchAPI('/kamar', {
            method: "POST",
            body: JSON.stringify({ namaKamar, asramaId, kapasitas })
        })
}