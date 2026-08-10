export interface Asrama {
    _id: string;
    namaAsrama: string;
    keterangan?: string;
}

export interface Kamar {
    namaKamar: string;
    asramaId: Asrama;
    kapasitas: number;
}