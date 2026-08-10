import { fetchAPI } from "@/lib/api";
import type { Asrama } from "@/types/Kamar";


export const asramaService = {
    getAllAsrama: () => fetchAPI<{ message: string, data: Asrama[] }>('/asrama')
}