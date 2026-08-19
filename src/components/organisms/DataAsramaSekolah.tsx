import { kamarService } from '@/services/kamar.service';
import { sekolahService } from '@/services/sekolah.service';
import type { Kamar } from '@/types/Kamar';
import type { Sekolah } from '@/types/Sekolah';
import { useEffect, useState } from 'react';
import AccordionSection from '../molecules/AccordionSection';
import { University } from 'lucide-react';
import FormRow from '../atoms/FormRow';
import SelectField from '../molecules/SelectField';
import { Switch } from '../ui/switch';

interface DataAsramaSekolahProps {
    initialValues?: {
        sekolahId?: string;
        kamarId?: string;
        laundry?: boolean;
    };
    readOnly?: boolean;
}

const DataAsramaSekolah = ({ initialValues, readOnly = false }: DataAsramaSekolahProps) => {
    const [sekolahId, setSekolahId] = useState<string>(initialValues?.sekolahId ?? '');
    const [kamarId, setKamarId] = useState<string>(initialValues?.kamarId ?? '');
    const [laundry, setLaundry] = useState<boolean>(initialValues?.laundry ?? false);
    const [kamarGroups, setKamarGroups] = useState<{ groupLabel: string; options: { label: string; value: string }[] }[]>([]);
    const [sekolahGroups, setSekolahGroups] = useState<{ groupLabel: string; options: { label: string; value: string }[] }[]>([]);

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

    useEffect(() => {
        getAllKamar();
        getAllSchool();
    }, []);
    return (
        <AccordionSection Icon={University} title="Detail Asrama & Sekolah" value="data-asrama-sekolah">
            <FormRow>
                <SelectField
                    label="Sekolah Tujuan" name="sekolahId" value={sekolahId}
                    onChange={setSekolahId} placeholder="Pilih Jenjang Sekolah" groups={sekolahGroups}
                    disabled={readOnly}
                />
                <SelectField
                    label="Penempatan Kamar" name="kamarId" value={kamarId}
                    onChange={setKamarId} placeholder="Pilh Kamar" groups={kamarGroups}
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