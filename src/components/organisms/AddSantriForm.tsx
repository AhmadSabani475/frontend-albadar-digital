
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import FormField from '@/components/molecules/FormField';
import SelectField from '@/components/molecules/SelectField';
import { MapPinHouse, Save, UserRound, UsersRound } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useState, type SubmitEvent } from 'react';
import { kamarService } from '@/services/kamar.service';
import type { CreateSantriPayload } from '@/types/Santri';
import { useNavigate } from 'react-router-dom';
import { santriService } from '@/services/santri.service';
import type { Kamar } from '@/types/Kamar';


const educationGroups = [
    {
        groupLabel: 'Pendidikan Dasar & Menengah',
        options: [
            { label: 'SD/Sederajat', value: 'sd' },
            { label: 'SMP/Sederajat', value: 'smp' },
            { label: 'SMA/SMK/Sederajat', value: 'sma' },
        ],
    },
];
const schools = [
    {
        groupLabel: 'SMP/Sederajat',
        options: [
            { label: 'SMP Al-Badar Cipulus', value: 'smp al-badar' },
            { label: 'MTs YPPA Cipulus', value: 'mts yppa' },
        ],
    },
    {
        groupLabel: 'SMA/Sederajat',
        options: [
            { label: 'SMA Al-Badar Cipulus', value: 'sma al-badar' },
            { label: 'SMK Al-Badar Cipulus', value: 'sml al-badar' },
            { label: 'MA YPPA Cipulus', value: 'ma yppa' },
        ],
    },
];


const AddSantriForm = () => {
    const navigate = useNavigate();
    const [kamarGroups, setKamarGroups] = useState<{ groupLabel: string; options: { label: string; value: string }[] }[]>([]);
    const [pendidikanTerakhir, setPendidikanTerakhir] = useState('');
    const [sekolah, setSekolah] = useState<string>('');
    const [kamarId, setKamarId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const santri: CreateSantriPayload = {
            namaLengkap: formData.get('namaLengkap') as string,
            tempatLahir: formData.get('tempatLahir') as string,
            tanggalLahir: formData.get('tanggalLahir') as string,
            pendidikanTerakhir: pendidikanTerakhir,
            sekolah: sekolah,
            anakKe: formData.get('anakKe') ? Number(formData.get('anakKe')) : undefined,
            jumlahSaudara: formData.get('jumlahSaudara') ? Number(formData.get('jumlahSaudara')) : undefined,
            asalPesantren: formData.get('asalPesantren') as string | undefined,
            ayah: {
                nama: formData.get('ayah.nama') as string,
                pendidikan: formData.get('ayah.pendidikan') as string | undefined,
                pekerjaan: formData.get('ayah.pekerjaan') as string | undefined,
            },
            ibu: {
                nama: formData.get('ibu.nama') as string,
                pendidikan: formData.get('ibu.pendidikan') as string | undefined,
                pekerjaan: formData.get('ibu.pekerjaan') as string | undefined,
            },
            alamat: {
                jalan: formData.get('alamat.jalan') as string,
                rtRw: formData.get('alamat.rtRw') as string | undefined,
                desaKelurahan: formData.get('alamat.desaKelurahan') as string,
                kecamatan: formData.get('alamat.kecamatan') as string,
                kabupatenKota: formData.get('alamat.kabupatenKota') as string,
                provinsi: formData.get('alamat.provinsi') as string,
                noTelepon: formData.get('alamat.noTelepon') as string | undefined,
            },
            kamarId: kamarId
        };

        try {
            setIsLoading(true);
            setError('');
            await santriService.createSantri(santri);
            navigate('/dashboard/santri');
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        kamarService.getAllKamar().then((res) => {
            const options = res.data.map((kamar: Kamar) => ({
                label: `${kamar.asramaId?.namaAsrama ?? '-'} - ${kamar.namaKamar}`,
                value: kamar._id,
            }));
            setKamarGroups([{ groupLabel: 'Pilih Kamar', options }]);
        });
    }, []);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
            <Accordion defaultValue={['data-diri', 'data-ortu', 'alamat', 'kamar-akun']} className="flex flex-col gap-5">
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
                                <FormField type="text" label="Nama Lengkap" name="namaLengkap" placeholder="Nama Lengkap"
                                    error="" id="namaLengkap" required />

                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <FormField type="text" label="Tempat Lahir" name="tempatLahir" placeholder="Tempat Lahir"
                                    error="" id="tempatLahir" required />
                                <FormField type="date" label="Tanggal Lahir" name="tanggalLahir" placeholder="Tanggal Lahir"
                                    error="" id="tanggalLahir" required />

                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <FormField type="number" label="Anak Ke-" name="anakKe" placeholder="Anak Ke-"
                                    error="" id="anakKe" required />
                                <FormField type="number" label="Jumlah Saudara" name="jumlahSaudara" placeholder="Jumlah Saudara"
                                    error="" id="jumlahSaudara" required />

                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <SelectField
                                    groups={educationGroups}
                                    label="Pendidikan Terakhir"
                                    name="pendidikanTerakhir"
                                    value={pendidikanTerakhir}
                                    onChange={setPendidikanTerakhir}
                                    placeholder="Pendidikan Terakhir"
                                />
                                <FormField type="text" label="Asal Pesantren"
                                    name="asalPesantren" placeholder="Asal Pesantren"
                                    error="" id="asalPesantren" required />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <SelectField
                                    groups={schools}
                                    label="Sekolah Saat Ini"
                                    name="sekolah"
                                    value={sekolah}
                                    onChange={setSekolah}
                                    placeholder="Sekolah Saat Ini"
                                />
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
                                <FormField type="text" label="Nama Ayah" name="ayah.nama" placeholder="Nama Ayah"
                                    error="" id="ayah.nama" required />
                                <FormField type="text" label="Nama Ibu" name="ibu.nama" placeholder="Nama Ibu"
                                    error="" id="ibu.nama" required />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <FormField type="text" label="Pendidikan Ayah" name="ayah.pendidikan" placeholder="Pendidikan Ayah"
                                    error="" id="ayah.pendidikan" required />
                                <FormField type="text" label="Pendidikan Ibu" name="ibu.pendidikan" placeholder="Pendidikan Ibu"
                                    error="" id="ibu.pendidikan" required />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <FormField type="text" label="Pekerjaan Ayah" name="ayah.pekerjaan" placeholder="Pekerjaan Ayah"
                                    error="" id="ayah.pekerjaan" required />
                                <FormField type="text" label="Pekerjaan Ibu" name="ibu.pekerjaan" placeholder="Pekerjaan Ibu"
                                    error="" id="ibu.pekerjaan" required />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="alamat" className="border-2 px-8 rounded-2xl">
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
                </AccordionItem>
            </Accordion>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full text-xl hover:text-green-400 hover:font-bold bg-green-400 p-5">
                <Save />
                {isLoading ? 'menyimpan' : 'Simpan Profil'}
            </Button>
        </form>
    );
};

export default AddSantriForm;