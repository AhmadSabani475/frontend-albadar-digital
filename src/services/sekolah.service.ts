import { fetchAPI } from "@/lib/api";
import type { Sekolah } from "@/types/Sekolah";


export const sekolahService = {
    getAllSchool: () => fetchAPI<{ message: string, data: Sekolah[] }>('/sekolah')
}