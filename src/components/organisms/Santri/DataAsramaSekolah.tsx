import { kamarService } from '@/services/kamar.service';
import { sekolahService } from '@/services/sekolah.service';
import { tingkatKelasService } from '@/services/tingkatKelas.service';
import { tingkatNgajiService } from '@/services/tingkatNgaji.service';
import type { Kamar } from '@/types/Kamar';
import type { Sekolah } from '@/types/Sekolah';
import type { TingkatKelas } from '@/types/TingkatKelas';
import type { TingkatNgaji } from '@/types/TingkatNgaji';
import { useEffect, useState } from 'react';
import AccordionSection from '../../molecules/AccordionSection';
import { University } from 'lucide-react';
import FormRow from '../../atoms/FormRow';
import SelectField from '../../molecules/SelectField';
import { Switch } from '../../ui/switch';

interface DataAsramaSekolahProps {
    initialValues?: {
        sekolahId?: string;
        kamarId?: string;
        laundry?: boolean;
        tingkatKelasId?: string;
        tingkatNgajiId?: string;
    };
    readOnly?: boolean;
}

const DataAsramaSekolah = ({ initialValues, readOnly = false }: DataAsramaSekolahProps) => {
    const [sekolahId, setSekolahId] = useState<string>(initialValues?.sekolahId ?? '');
    const [kamarId, setKamarId] = useState<string>(initialValues?.kamarId ?? '');
    const [laundry, setLaundry] = useState<boolean>(initialValues?.laundry ?? false);
    const [tingkatKelasId, setTingkatKelasId] = useState<string>(initialValues?.tingkatKelasId ?? '');
    const [tingkatNgajiId, setTingkatNgajiId] = useState<string>(initialValues?.tingkatNgajiId ?? '');

    const [kamarGroups, setKamarGroups] = useState<{ groupLabel: string; options: { label: string; value: string }[] }[]>([]);
    const [sekolahGroups, setSekolahGroups] = useState<{ groupLabel: string; options: { label: string; value: string }[] }[]>([]);
    const [tingkatKelasGroups, setTingkatKelasGroups] = useState<{ groupLabel: string; options: { label: string; value: string }[] }[]>([]);
    const [tingkatNgajiGroups, setTingkatNgajiGroups] = useState<{ groupLabel: string; options: { label: string; value: string }[] }[]>([]);

    const getAllKamar = async () => {
        try {
            const result = await kamarService.getAllKamar();
            const options = result.data.map((kamar: Kamar) => ({
                label: `${kamar.asramaId?.namaAsrama ?? '-'} - ${kamar.namaKamar}`,
                value: kamar._id,
            }));
            setKamarGroups([{ groupLabel: 'Pilih Kamar', options }]);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllSchool = async () => {
        try {
            const result = await sekolahService.getAllSchool();
            const options = result.data.map((sekolah: Sekolah) => ({
                label: `${sekolah.nama} - ${sekolah.jenjang}`,
                value: sekolah._id,
            }));
            setSekolahGroups([{ groupLabel: 'Pilih Sekolah', options }]);
        } catch (error) {
            console.log(error);
        }
    };

    const getTingkatKelasBySekolah = async (sId?: string) => {
        if (!sId) {
            setTingkatKelasGroups([]);
            return;
        }
        try {
            const result = await tingkatKelasService.getAll(sId);
            const options = result.data.map((tk: TingkatKelas) => ({
                label: tk.nama,
                value: tk._id,
            }));
            setTingkatKelasGroups([{ groupLabel: 'Pilih Tingkat Kelas', options }]);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllTingkatNgaji = async () => {
        try {
            const result = await tingkatNgajiService.getAllTingkatNgaji();
            const options = result.data.map((tn: TingkatNgaji) => ({
                label: `${tn.nama}${tn.isCheckpoint ? ' (Checkpoint)' : ''}`,
                value: tn._id,
            }));
            setTingkatNgajiGroups([{ groupLabel: 'Pilih Tingkat Ngaji', options }]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllKamar();
        getAllSchool();
        getAllTingkatNgaji();
    }, []);

    useEffect(() => {
        if (initialValues?.sekolahId) {
            setSekolahId(initialValues.sekolahId);
            getTingkatKelasBySekolah(initialValues.sekolahId);
        }
        if (initialValues?.kamarId) setKamarId(initialValues.kamarId);
        if (initialValues?.laundry !== undefined) setLaundry(initialValues.laundry);
        if (initialValues?.tingkatKelasId) setTingkatKelasId(initialValues.tingkatKelasId);
        if (initialValues?.tingkatNgajiId) setTingkatNgajiId(initialValues.tingkatNgajiId);
    }, [initialValues]);

    return (
        <AccordionSection Icon={University} title="Detail Asrama & Sekolah" value="data-asrama-sekolah">
            <FormRow>
                <SelectField
                    label="Sekolah Tujuan" name="sekolahId" value={sekolahId}
                    onChange={(val) => {
                        setSekolahId(val);
                        setTingkatKelasId('');
                        getTingkatKelasBySekolah(val);
                    }}
                    placeholder="Pilih Jenjang Sekolah" groups={sekolahGroups}
                    disabled={readOnly}
                />
                <SelectField
                    label="Tingkat Kelas" name="tingkatKelasId" value={tingkatKelasId}
                    onChange={setTingkatKelasId}
                    placeholder={sekolahId ? "Pilih Tingkat Kelas" : "Pilih Sekolah terlebih dahulu"}
                    groups={tingkatKelasGroups}
                    disabled={readOnly || !sekolahId}
                />
            </FormRow>
            <FormRow>
                <SelectField
                    label="Penempatan Kamar" name="kamarId" value={kamarId}
                    onChange={setKamarId} placeholder="Pilih Kamar" groups={kamarGroups}
                    disabled={readOnly}
                />
                <SelectField
                    label="Tingkat Ngaji" name="tingkatNgajiId" value={tingkatNgajiId}
                    onChange={setTingkatNgajiId} placeholder="Pilih Jenjang Ngaji" groups={tingkatNgajiGroups}
                    disabled={readOnly}
                />
            </FormRow>
            <div className="w-full flex justify-between rounded-2xl my-2 border p-4">
                <div className="flex flex-col justify-center">
                    <h3>Layanan Laundry</h3>
                    <p className="text-xs">Daftarkan Santri Untuk Layanan Laundry</p>
                </div>
                <Switch id="laundry"
                    checked={laundry}
                    onCheckedChange={setLaundry}
                    disabled={readOnly}
                />
                <input type="hidden" name="laundry" value={laundry ? 'true' : 'false'} />
            </div>
        </AccordionSection>
    );
};

export default DataAsramaSekolah;
