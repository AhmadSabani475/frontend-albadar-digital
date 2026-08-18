const BASE_URL = 'https://wilayah.id/api';

export interface WilayahItem {
    code: string;
    name: string;
}

export const getProvinsi = async (): Promise<WilayahItem> => {
    const res = await fetch(`${BASE_URL}/provinces.json`);
    return res.json();
};

export const getKabupatenKota = async (kodeProvinsi: string): Promise<WilayahItem> => {
    const res = await fetch(`${BASE_URL}/regencies/${kodeProvinsi}.json`);
    return res.json();
};

export const getKecamatan = async (kodeKabupatenKota: string): Promise<WilayahItem> => {
    const res = await fetch(`${BASE_URL}/districts/${kodeKabupatenKota}.json`);
    return res.json();
};

export const getDesaKelurahan = async (kodeKecamatan: string): Promise<WilayahItem> => {
    const res = await fetch(`${BASE_URL}/villages/${kodeKecamatan}.json`);
    return res.json();
};