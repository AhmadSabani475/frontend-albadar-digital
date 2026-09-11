import type { Kwitansi } from "./Kwitansi";

export interface GrafikPemasukanHarianItem {
    tanggal: string;
    total: number;
}
export interface PieChartStatusTagihanItem {
    status: 'belum_bayar' | 'lunas' | 'sebagian';
    count: number;
}

export interface DashboardSummary {
    totalSantriAktif: number;
    totalTagihanBelumLunas: number;
    pemasukanHariIni: number;
    saldoTabunganZiarah: number;
    saldoUangJajan: number;
    grafikPemasukanHarian: GrafikPemasukanHarianItem[];
    pieChartStatusTagihan: PieChartStatusTagihanItem[];
    transaksiTerakhir: Kwitansi[];
}