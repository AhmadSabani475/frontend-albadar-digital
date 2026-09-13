
export interface TahunAjaran {
    nama: string;
    tanggalMulai: Date;
    tanggalSelesai?: Date;
    is_active: boolean;
}

export interface PayloadTahunAjaran {
    _id: string;
    tanggalMulai: Date;
    tanggalSelesai?: Date;
    is_active: boolean;
}