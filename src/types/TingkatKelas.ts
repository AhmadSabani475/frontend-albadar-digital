import type { Sekolah } from "./Sekolah";

export interface TingkatKelas {
    _id: string;
    nama: string;
    sekolahId: Sekolah;
    urutan: number;
}

export interface PayloadTingkatKelas {
    nama: string;
    sekolahId: string;
    urutan: number;
}