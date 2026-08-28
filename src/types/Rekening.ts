import type { Santri } from "./Santri";

export interface Rekening {
    _id: string;
    santriId: Santri;
    jenisRekening: 'uang_jajan' | 'tabungan_ziarah';
    saldo: number;
    nominalHarian?: number;
}