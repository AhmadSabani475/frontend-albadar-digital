import { fetchAPI } from "@/lib/api";
import type { Kamar } from "@/types/Kamar";

export const kamarService = {
    getAllKamar: () => fetchAPI<{ message: string; data: Kamar[] }>('/kamar')
}