import type { Santri } from "./Santri";
import type { Tagihan } from "./Tagihan";
import type { User } from "./Users";

export interface Pembayaran {
    _id: string,
    santriId: Santri,
    tagihanId: Tagihan,
    dicatatOleh: User,
    tanggalBayar: Date,
    nominalBayar: number,
    metodeBayar?: 'cash' | 'transfer' | string,
    keterangan?: string,
}