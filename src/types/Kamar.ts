export interface Asrama {
    _id: string;
    namaAsrama: string;
    keterangan?: string;
}

export interface Kamar {
    _id: string;
    namaKamar: string;
    asramaId: Asrama;
    kapasitas: number;
}