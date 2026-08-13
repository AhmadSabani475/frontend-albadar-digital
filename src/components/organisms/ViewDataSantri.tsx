

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FormField from "@/components/molecules/FormField";
import { useEffect, useState } from "react";
import { santriService } from "@/services/santri.service";
import type { Santri } from "@/types/Santri";
import { UserRound, UsersRound } from "lucide-react";

interface PropTypes {
    id: string | undefined;
}
const ViewDataSantri = (props: PropTypes) => {
    const { id } = props;
    const [data, setData] = useState<Santri>();
    const [isLoading, setIsLoading] = useState(false);
    const getSantriById = async (id: string) => {
        try {
            setIsLoading(true);
            const result = await santriService.getSantriById(id);
            setData(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (id) {
            getSantriById(id);
        }
    }, [id])

    return (
        <form className="flex flex-col items-center gap-3">
            <Accordion defaultValue={["data-diri", "data-ortu", "alamat", 'kamar-akun']} className="flex flex-col gap-5">
                <AccordionItem value="data-diri" className="border-2 px-8 rounded-2xl">
                    <AccordionTrigger className="hover:no-underline py-5">
                        <div className="flex gap-2 items-center">
                            <UserRound className="text-green-400" />
                            <h3 className="text-xl font-semibold">Data Diri</h3>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                        <div className="flex flex-col gap-4 rounded-2xl">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <FormField
                                    value={data?.namaLengkap} type="text" label="Nama Lengkap" name="namaLengkap" placeholder="Nama Lengkap"
                                    error="" id="namaLengkap" required />

                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <FormField value={data?.tempatLahir} type="text" label="Tempat Lahir" name="tempatLahir" placeholder="Tempat Lahir"
                                    error="" id="tempatLahir" required />
                                <FormField value={data?.tanggalLahir} type="text" label="Tanggal Lahir" name="tanggalLahir" placeholder="Tanggal Lahir"
                                    error="" id="tanggalLahir" required />

                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <FormField value={data?.anakKe?.toString()} type="text" label="Anak Ke-" name="anakKe" placeholder="Anak Ke-"
                                    error="" id="anakKe" required />
                                <FormField value={data?.jumlahSaudara?.toString()} type="number" label="Jumlah Saudara" name="jumlahSaudara" placeholder="Jumlah Saudara"
                                    error="" id="jumlahSaudara" required />

                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* <SelectField
                                    groups={educationGroups}
                                    label="Pendidikan Terakhir"
                                    name="pendidikanTerakhir"
                                    value={pendidikanTerakhir}
                                    onChange={setPendidikanTerakhir}
                                    placeholder="Pendidikan Terakhir"
                                /> */}
                                <FormField value={data?.asalPesantren} type="text" label="Asal Pesantren"
                                    name="asalPesantren" placeholder="Asal Pesantren"
                                    error="" id="asalPesantren" required />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* <SelectField
                                    groups={schools}
                                    label="Sekolah Saat Ini"
                                    name="sekolah"
                                    value={sekolah}
                                    onChange={setSekolah}
                                    placeholder="Sekolah Saat Ini"
                                /> */}
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="data-ortu" className="border-2 px-8 rounded-2xl">
                    <AccordionTrigger className="hover:no-underline py-5">
                        <div className="flex gap-2 items-center">
                            <UsersRound className="text-green-400" />
                            <h3 className="text-xl font-semibold">Data Orang Tua</h3>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                        <div className="flex flex-col gap-4 rounded-2xl">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <FormField value={data?.ayah.nama} type="text" label="Nama Ayah" name="ayah.nama" placeholder="Nama Ayah"
                                    error="" id="ayah.nama" required />
                                <FormField value={data?.ibu.nama} type="text" label="Nama Ibu" name="ibu.nama" placeholder="Nama Ibu"
                                    error="" id="ibu.nama" required />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <FormField value={data?.ayah.pendidikan} type="text" label="Pendidikan Ayah" name="ayah.pendidikan" placeholder="Pendidikan Ayah"
                                    error="" id="ayah.pendidikan" required />
                                <FormField value={data?.ibu.pendidikan} type="text" label="Pendidikan Ibu" name="ibu.pendidikan" placeholder="Pendidikan Ibu"
                                    error="" id="ibu.pendidikan" required />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <FormField value={data?.ayah.pekerjaan} type="text" label="Pekerjaan Ayah" name="ayah.pekerjaan" placeholder="Pekerjaan Ayah"
                                    error="" id="ayah.pekerjaan" required />
                                <FormField value={data?.ibu.pekerjaan} type="text" label="Pekerjaan Ibu" name="ibu.pekerjaan" placeholder="Pekerjaan Ibu"
                                    error="" id="ibu.pekerjaan" required />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                {/* <AccordionItem value="alamat" className="border-2 px-8 rounded-2xl">
                    <AccordionTrigger className="hover:no-underline py-5">
                        <div className="flex gap-2 items-center">
                            <MapPinHouse className="text-green-400" />
                            <h3 className="text-xl font-semibold">Alamat</h3>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                        <div className="flex flex-col gap-4 rounded-2xl">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <FormField type="text" label="Jalan" name="alamat.jalan" placeholder="Jalan"
                                    error="" id="alamat.jalan" required />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <FormField type="text" label="RT/RW" name="alamat.rtRw" placeholder="contoh: 002/013"
                                    error="" id="alamat.rtRw" required />
                                <FormField type="text" label="Kelurahan/Desa" name="alamat.desaKelurahan" placeholder="Kel/Des"
                                    error="" id="alamat.desaKelurahan" required />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <FormField type="text" label="Kecamatan" name="alamat.kecamatan" placeholder="Kecamatan"
                                    error="" id="alamat.kecamatan" required />
                                <FormField type="text" label="Kab/Kota" name="alamat.kabupatenKota" placeholder="Kab/Kota"
                                    error="" id="alamat.kabupatenKota" required />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <FormField type="text" label="Provinsi" name="alamat.provinsi" placeholder="Provinsi"
                                    error="" id="alamat.provinsi" required />
                                <FormField type="text" label="No.hp" name="alamat.noTelepon" placeholder="628......"
                                    error="" id="alamat.noTelepon" required />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="kamar-akun" className="border-2 px-8 rounded-2xl">
                    <AccordionTrigger className="hover:no-underline py-5">
                        <div className="flex gap-2 items-center">
                            <MapPinHouse className="text-green-400" />
                            <h3 className="text-xl font-semibold">Kamar</h3>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                        <div className="flex flex-col gap-4 rounded-2xl">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <SelectField
                                    groups={kamarGroups}
                                    label="Kamar"
                                    name="kamarId"
                                    value={kamarId}
                                    onChange={setKamarId}
                                    placeholder="Kamar"
                                />

                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem> */}
            </Accordion>
            {/* {error && <p className="text-sm text-destructive">{error}</p>} */}
            {/* <Button type="submit" className="w-full text-xl hover:text-green-400 hover:font-bold bg-green-400 p-5">
                <Save />
                {isLoading ? "menyimpan" : "Simpan Profil"}
            </Button> */}
        </form>
    )
}

export default ViewDataSantri;