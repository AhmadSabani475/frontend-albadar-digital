
export interface TingkatNgaji {
    _id: string;
    urutan: number;
    nama: string;
    isCheckpoint: boolean;
}

export interface PayloadTingkatNgaji {
    urutan: number;
    nama: string;
    isCheckpoint: boolean;
}