export interface Orangtua {
  nik?: string;
  statusHidup?: 'Hidup' | 'Meninggal';
  nama: string;
  pendidikan?: string;
  pekerjaan?: string;
  noHp?: string;
}

export interface Alamat {
  jalan: string;
  rtRw?: string;
  kodeDesaKelurahan: string;
  desaKelurahan: string;
  kodeKecamatan: string;
  kecamatan: string;
  kodeKabupatenKota: string;
  kabupatenKota: string;
  kodeProvinsi: string;
  provinsi: string;
  kodePos?: string;
}

export interface PendidikanSebelumnya {
  jenjangTerakhir: string;
  namaSekolah: string;
  tahunMasuk: string;
  tahunLulus: string;
}

export interface CreateSantriPayload {
  nik?: string;
  nis?: string;
  namaLengkap: string;
  jenisKelamin: 'L' | 'P';
  tempatLahir: string;
  tanggalLahir: string;
  fotoUrl?: string;
  anakKe?: number;
  jumlahSaudara?: number;
  noHp?: string;
  noKk?: string;
  namaKepalaKeluarga?: string;
  pendidikanTerakhir: PendidikanSebelumnya;
  ayah: Orangtua;
  ibu: Orangtua;
  alamat: Alamat;
  sekolah?: string;
  kelasFormal?: string;
  kelasNgaji?: string;
  sekolahId?: string;
  kamarId: string;
  laundry?: boolean;
}

export interface Santri extends Omit<CreateSantriPayload, 'kamarId' | 'sekolahId'> {
  _id: string;
  sekolah?: string;
  kelasFormal?: string;
  kelasNgaji?: string;
  kamarId: {
    _id: string;
    namaKamar: string;
    kapasitas: number;
    asramaId: {
      _id: string;
      namaAsrama: string;
    };
  };
  sekolahId?: {
    _id: string;
    nama: string;
    jenjang?: string;
  };
  status: 'aktif' | 'alumni';
  tanggalTerdaftar: string;
  tanggalKeluar?: string;
  createdAt?: string;
  updatedAt?: string;
}