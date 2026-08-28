import type { Rekening } from "./Rekening";
import type { User } from "./Users";


export interface MutasiRekening {
    _id: string;
    rekeningId: Rekening;
    jenis: 'setor' | 'tarik';
    kategori: 'harian' | 'manual';
    nominal: number;
    keterangan?: string;
    dicatatOleh: User;
    createdAt: string;
}