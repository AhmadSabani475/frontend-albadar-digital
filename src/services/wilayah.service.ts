import { fetchAPI } from '@/lib/api';

export interface WilayahItem {
  id: string;
  name: string;
}

export const wilayahService = {
  async getProvinces(): Promise<WilayahItem[]> {
    return fetchAPI<WilayahItem[]>('/wilayah/provinces');
  },
  async getRegencies(provinceId: string): Promise<WilayahItem[]> {
    return fetchAPI<WilayahItem[]>(`/wilayah/regencies/${provinceId}`);
  },
  async getDistricts(regencyId: string): Promise<WilayahItem[]> {
    return fetchAPI<WilayahItem[]>(`/wilayah/districts/${regencyId}`);
  },
  async getVillages(districtId: string): Promise<WilayahItem[]> {
    return fetchAPI<WilayahItem[]>(`/wilayah/villages/${districtId}`);
  },
};