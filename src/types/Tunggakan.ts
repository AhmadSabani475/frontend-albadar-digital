import type { Santri } from "./Santri";

export interface TagihanTunggakanItem {
    namaTagihan: string;
    sisaTagihan: number;
    periode: string;
}

export interface TunggakanSantri {
    santriId: string;
    santri: Santri;
    noHpAyah: string | null;
    tagihanList: TagihanTunggakanItem[];
    totalTunggakan: number;
    tanggalTertua: string;
}

export interface TunggakanStats {
    totalSantriMenunggak: number;
    totalNominalTunggakan: number;
    rataRataPerSantri: number;
    jumlahLebih30Hari: number;
}

export interface ResponseTunggakan {
    message: string;
    stats: TunggakanStats;
    data: TunggakanSantri[];
}