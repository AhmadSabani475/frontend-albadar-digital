
export interface JenisTagihan {
    _id: string;
    nama: string;
    tipePeriode: string;
    nominalDefault: number;
    wajib: boolean;
}

export interface TarifKhusus {
    _id: string;
    santriId: string;
    jenisTagihanId: string;
    nominalKhusus: number;
    keterangan?: string;
}