import { kamarService } from '@/services/kamar.service';
import type { Kamar } from '@/types/Kamar';
import { useEffect, useState } from 'react';
import AccordionSection from '../../molecules/AccordionSection';
import { University } from 'lucide-react';
import FormRow from '../../atoms/FormRow';
import SelectField from '../../molecules/SelectField';
import { Switch } from '../../ui/switch';

export const LIST_SEKOLAH = [
    { label: 'SMP Al-Badar', value: 'SMP Al-Badar' },
    { label: 'MTs YPPA', value: 'MTs YPPA' },
    { label: 'SMA Al-Badar', value: 'SMA Al-Badar' },
    { label: 'SMK Al-Badar', value: 'SMK Al-Badar' },
    { label: 'MA YPPA', value: 'MA YPPA' },
    { label: 'Mahasiswa', value: 'Mahasiswa' },
    { label: 'Tidak Sekolah', value: 'Tidak Sekolah' },
];

export const LIST_KELAS_NGAJI = [
    { label: 'Kelas 1', value: 'Kelas 1' },
    { label: 'Kelas 2', value: 'Kelas 2' },
    { label: 'Kelas 3', value: 'Kelas 3' },
    { label: 'Kelas 4', value: 'Kelas 4' },
    { label: 'Kelas 5', value: 'Kelas 5' },
    { label: 'Kelas 6', value: 'Kelas 6' },
    { label: 'Takhassus', value: 'Takhassus' },
];

export const getOptionsKelasFormalBySekolah = (sekolah?: string) => {
    if (sekolah === 'SMP Al-Badar' || sekolah === 'MTs YPPA') {
        return [
            { label: 'Kelas 7', value: 'Kelas 7' },
            { label: 'Kelas 8', value: 'Kelas 8' },
            { label: 'Kelas 9', value: 'Kelas 9' },
        ];
    }
    if (sekolah === 'SMA Al-Badar' || sekolah === 'SMK Al-Badar' || sekolah === 'MA YPPA') {
        return [
            { label: 'Kelas 10', value: 'Kelas 10' },
            { label: 'Kelas 11', value: 'Kelas 11' },
            { label: 'Kelas 12', value: 'Kelas 12' },
        ];
    }
    if (sekolah === 'Mahasiswa') {
        return [{ label: 'Mahasiswa', value: 'Mahasiswa' }];
    }
    if (sekolah === 'Tidak Sekolah') {
        return [{ label: 'Tidak Sekolah', value: 'Tidak Sekolah' }];
    }
    return [
        { label: 'Kelas 7', value: 'Kelas 7' },
        { label: 'Kelas 8', value: 'Kelas 8' },
        { label: 'Kelas 9', value: 'Kelas 9' },
        { label: 'Kelas 10', value: 'Kelas 10' },
        { label: 'Kelas 11', value: 'Kelas 11' },
        { label: 'Kelas 12', value: 'Kelas 12' },
        { label: 'Mahasiswa', value: 'Mahasiswa' },
        { label: 'Tidak Sekolah', value: 'Tidak Sekolah' },
    ];
};

interface DataAsramaSekolahProps {
    initialValues?: {
        sekolah?: string;
        kelasFormal?: string;
        kelasNgaji?: string;
        kamarId?: string;
        laundry?: boolean;
        // fallback legacy props
        sekolahId?: string;
        tingkatKelasId?: string;
        tingkatNgajiId?: string;
    };
    readOnly?: boolean;
}

const DataAsramaSekolah = ({ initialValues, readOnly = false }: DataAsramaSekolahProps) => {
    const [sekolah, setSekolah] = useState<string>(initialValues?.sekolah ?? '');
    const [kelasFormal, setKelasFormal] = useState<string>(initialValues?.kelasFormal ?? '');
    const [kelasNgaji, setKelasNgaji] = useState<string>(initialValues?.kelasNgaji ?? '');
    const [kamarId, setKamarId] = useState<string>(initialValues?.kamarId ?? '');
    const [laundry, setLaundry] = useState<boolean>(initialValues?.laundry ?? false);

    const [kamarGroups, setKamarGroups] = useState<{ groupLabel: string; options: { label: string; value: string }[] }[]>([]);

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

    useEffect(() => {
        getAllKamar();
    }, []);

    useEffect(() => {
        if (initialValues?.sekolah) setSekolah(initialValues.sekolah);
        if (initialValues?.kelasFormal) setKelasFormal(initialValues.kelasFormal);
        if (initialValues?.kelasNgaji) setKelasNgaji(initialValues.kelasNgaji);
        if (initialValues?.kamarId) setKamarId(initialValues.kamarId);
        if (initialValues?.laundry !== undefined) setLaundry(initialValues.laundry);
    }, [initialValues]);

    const kelasFormalOptions = getOptionsKelasFormalBySekolah(sekolah);

    return (
        <AccordionSection Icon={University} title="Detail Asrama & Sekolah" value="data-asrama-sekolah">
            <FormRow>
                <SelectField
                    label="Sekolah Tujuan" name="sekolah" value={sekolah}
                    onChange={(val) => {
                        setSekolah(val);
                        setKelasFormal('');
                    }}
                    placeholder="Pilih Jenjang Sekolah"
                    groups={[{ groupLabel: 'Pilih Sekolah', options: LIST_SEKOLAH }]}
                    disabled={readOnly}
                />
                <SelectField
                    label="Tingkat Kelas Formal" name="kelasFormal" value={kelasFormal}
                    onChange={setKelasFormal}
                    placeholder={sekolah ? "Pilih Tingkat Kelas" : "Pilih Sekolah terlebih dahulu"}
                    groups={[{ groupLabel: 'Pilih Tingkat Kelas', options: kelasFormalOptions }]}
                    disabled={readOnly || !sekolah}
                />
            </FormRow>
            <FormRow>
                <SelectField
                    label="Penempatan Kamar" name="kamarId" value={kamarId}
                    onChange={setKamarId} placeholder="Pilih Kamar" groups={kamarGroups}
                    disabled={readOnly}
                />
                <SelectField
                    label="Tingkat Ngaji" name="kelasNgaji" value={kelasNgaji}
                    onChange={setKelasNgaji} placeholder="Pilih Jenjang Ngaji"
                    groups={[{ groupLabel: 'Pilih Kelas Ngaji', options: LIST_KELAS_NGAJI }]}
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
