import type { Santri } from "./Santri";

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

export interface Tagihan {
    _id: string;
    santriId: Santri;
    jenisTagihanId: JenisTagihan;
    sumberNominal: string;
    nominalTagihan: number;
    jatuhTempo: Date;
    periode: string;
    status: 'belum_bayar' | 'lunas' | 'sebagian'
}

