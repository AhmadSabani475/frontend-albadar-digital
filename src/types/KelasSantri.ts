import type { Santri } from "./Santri";
import type { TahunAjaran } from "./TahunAjaran";
import type { TingkatKelas } from "./TingkatKelas";

export interface KelasSantri {
    _id: string;
    santriId: string | Santri;
    tahunAjaranId: string | TahunAjaran;
    tingkatKelasId: string | TingkatKelas;
    status: 'aktif' | 'tinggal_kelas';
    createdAt?: string;
    updatedAt?: string;
}

export interface PayloadKelasSantri {
    santriId: string;
    tahunAjaranId: string;
    tingkatKelasId: string;
    status?: 'aktif' | 'tinggal_kelas';
}

export interface FilterKelasSantriParams {
    tahunAjaranId?: string;
    santriId?: string;
    tingkatKelasId?: string;
}

export interface PayloadNaikKelas {
    tahunAjaranAsalId: string;
    tahunAjaranTujuanId: string;
}

export interface SantriButuhKeputusanKelas {
    santriId: string | Santri;
    tingkatKelasSekarang: TingkatKelas;
}

export interface ResponseNaikKelas {
    naikOtomatis: KelasSantri[];
    mengulang: KelasSantri[];
    perluKeputusanManual: SantriButuhKeputusanKelas[];
}

export type AksiKeputusanManualKelas = 'lanjut' | 'alumni';

export interface PayloadKeputusanManualKelas {
    santriId: string;
    tahunAjaranId: string;
    aksi: AksiKeputusanManualKelas;
    tingkatKelasId?: string;
}
