import type { Santri } from "./Santri";
import type { TahunAjaran } from "./TahunAjaran";
import type { TingkatNgaji } from "./TingkatNgaji";

export interface RiwayatKelasNgaji {
    _id: string;
    santriId: string | Santri;
    tahunAjaranId: string | TahunAjaran;
    tingkatNgajiId?: string | TingkatNgaji | null;
    statusLain?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PayloadRiwayatKelasNgaji {
    santriId: string;
    tahunAjaranId: string;

    tingkatNgajiId?: string | null;
    statusLain?: string;
}

export interface PayloadUpdateRiwayatKelasNgaji {
    statusLain?: string;
}

export interface FilterRiwayatKelasNgajiParams {
    tahunAjaranId?: string;
    santriId?: string;
}

export interface PayloadNaikKelasNgaji {
    tahunAjaranAsalId: string;
    tahunAjaranTujuanId: string;
}

export interface SantriButuhKeputusanNgaji {
    santriId: string;
    namaSantri: string;
    nis: string;
    tingkatNgajiSekarang: TingkatNgaji;
}

export interface ResponseNaikKelasNgaji {
    naikOtomatis: RiwayatKelasNgaji[];
    perluKeputusanManual: SantriButuhKeputusanNgaji[];
}

export type AksiKeputusanManualNgaji = 'lanjut' | 'kelas_terbang' | 'pengurus' | 'alumni';

export interface PayloadKeputusanManualNgaji {
    santriId: string;
    tahunAjaranId: string;
    aksi: AksiKeputusanManualNgaji;
    tingkatNgajiId?: string;
}
