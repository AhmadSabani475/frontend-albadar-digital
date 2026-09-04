import type { Santri } from "./Santri";
import type { User } from "./Users";


export interface KwitansiItem {
    tipe: 'bayar_tagihan' | 'setor_rekening' | 'tarik_rekening';
    referensiId: string;
    nominal: number;
    keterangan?: string;
}

export interface SaldoSnapshot {
    jenisRekening: 'uang_jajan' | 'tabungan_ziarah';
    saldo: number;
}

export interface Kwitansi {
    _id: string;
    nomorKwitansi: string;
    santriId: Santri | string;
    items: KwitansiItem[];
    saldoSnapshot: SaldoSnapshot[];
    totalNominal: number;
    diCatatOleh: User | string;
    createdAt: string;
    updatedAt: string;
}