export interface TahunAjaran {
    _id: string;
    nama: string;
    tanggalMulai: string | Date;
    tanggalSelesai?: string | Date;
    is_active?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface PayloadTahunAjaran {
    nama: string;
    tanggalMulai: string;
    tanggalSelesai?: string;
    is_active?: boolean;
}