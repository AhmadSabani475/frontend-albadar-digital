export interface Orangtua {
  nama: string;
  pendidikan?: string;
  pekerjaan?: string;
}

export interface Alamat {
  jalan: string;
  rtRw?: string;
  desaKelurahan: string;
  kecamatan: string;
  kabupatenKota: string;
  provinsi: string;
  noTelepon?: string;
}

export interface CreateSantriPayload {
  nis?: string;
  namaLengkap: string;
  tempatLahir: string;
  tanggalLahir: string;
  anakKe?: number;
  jumlahSaudara?: number;
  asalPesantren?: string;
  pendidikanTerakhir: string;
  ayah: Orangtua;
  ibu: Orangtua;
  alamat: Alamat;
  sekolah: string;
  kamarId: string;
}
export interface Santri extends Omit<CreateSantriPayload, 'kamarId'> {
  _id: string;
  kamarId: {
    _id: string;
    namaKamar: string;
    kapasitas: number;
    asramaId: {
      _id: string;
      namaAsrama: string;
    };
  };
  status: 'aktif' | 'alumni';
  tanggalTerdaftar: string;
  createdAt?: string;
  updatedAt?: string;
}