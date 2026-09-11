import type { Santri } from "./Santri";
import type { User } from "./Users";


export interface KwitansiItem {
    tipe: 'bayar_tagihan' | 'setor_rekening' | 'tarik_rekening';
    referensiId: string;
    nominal: number;
    label: string;
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
    metodePembayaran: 'cash' | 'transfer';
    diCatatOleh: User | string;
    createdAt: string;
    updatedAt: string;
}


export interface SummaryRiwayat {
    totalSudahBayar: number;
    totalTunggakan: number;
}

export interface MetaPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface RiwayatKwitansiResponse {
    message: string;
    data: Kwitansi[];
    summary: SummaryRiwayat;
    meta: MetaPagination;
}
