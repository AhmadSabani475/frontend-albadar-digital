import { Mars, User2, Venus } from 'lucide-react';
import AccordionSection from '../../molecules/AccordionSection';
import FormRow from '../../atoms/FormRow';
import FormField from '../../molecules/FormField';
import CardOrtuSection from '../../molecules/CardOrtuSection';
import SelectField from '../../molecules/SelectField';
import { useState } from 'react';



const statusHidupGroups = [
    {
        groupLabel: 'Status Hidup',
        options: [
            { label: 'Masih Hidup', value: 'Hidup' },
            { label: 'Sudah Meninggal', value: 'Meninggal' },
        ],
    },
];
interface OrtuData {
    nik?: string;
    nama?: string;
    pendidikan?: string;
    pekerjaan?: string;
    noHp?: string;
    statusHidup?: 'Hidup' | 'Meninggal';
}

interface DataOrangTuaSectionProps {
    initialValues?: {
        noKk?: string;
        namaKepalaKeluarga?: string;
        ayah?: OrtuData;
        ibu?: OrtuData;
    };
}
const DataOrangTuaSection = ({ initialValues }: DataOrangTuaSectionProps) => {
    const [statusHidupAyah, setStatusHidupAyah] = useState(initialValues?.ayah?.statusHidup ?? '');
    const [statusHidupIbu, setStatusHidupIbu] = useState(initialValues?.ibu?.statusHidup ?? '');
    return (
        <AccordionSection Icon={User2} title="Data Orang Tua" value="data-ortu">
            <FormRow>
                <FormField type="text" label="Nomor Kartu Keluarga" name="noKk"
                    placeholder="32454325****" defaultValue={initialValues?.noKk} id="noKk" />
                <FormField type="text" label="Nama Kepala Keluarga" name="namaKepalaKeluarga"
                    placeholder="contoh: Budi" defaultValue={initialValues?.namaKepalaKeluarga} id="namaKepalaKeluarga" />
            </FormRow>
            <FormRow>
                <CardOrtuSection Icon={Mars} title="Data Ayah">
                    <FormField type="text" label="NIK Ayah" name="ayah.nik"
                        placeholder="32454325*****" defaultValue={initialValues?.ayah?.nik} id="ayah.nik" />
                    <FormField type="text" label="Nama Ayah" name="ayah.nama"
                        placeholder="Budi" id="ayah.nama" defaultValue={initialValues?.ayah?.nama} required />
                    <FormField type="text" label="Pendidikan Ayah" name="ayah.pendidikan"
                        placeholder="SD/SMP/SMA/Sarjana" defaultValue={initialValues?.ayah?.pendidikan} id="ayah.pendidikan" />
                    <FormField type="text" label="Pekerjaan Ayah" name="ayah.pekerjaan"
                        placeholder="Buruh" id="ayah.pekerjaan" defaultValue={initialValues?.ayah?.pekerjaan} />
                    <FormField type="tel" label="Nomor Hp Ayah" name="ayah.noHp"
                        placeholder="08******" id="ayah.noHp" defaultValue={initialValues?.ayah?.noHp} />
                    <SelectField groups={statusHidupGroups} label="Status Hidup" name="ayah.statusHidup" value={statusHidupAyah}
                        onChange={setStatusHidupAyah} placeholder="Status Hidup"
                    />
                </CardOrtuSection> <CardOrtuSection Icon={Venus} title="Data Ibu">
                    <FormField type="text" label="NIK ibu" name="ibu.nik"
                        defaultValue={initialValues?.ibu?.nik}
                        placeholder="32454325*****" id="ibu.nik" />
                    <FormField type="text" label="Nama Ibu" name="ibu.nama"
                        defaultValue={initialValues?.ibu?.nama}
                        placeholder="Yuni" id="ibu.nama" required />
                    <FormField type="text" label="Pendidikan Ibu" name="ibu.pendidikan"
                        defaultValue={initialValues?.ibu?.pendidikan}
                        placeholder="SD/SMP/SMA/Sarjana" id="ibu.pendidikan" />
                    <FormField type="text" label="Pekerjaan Ibu" name="ibu.pekerjaan"
                        defaultValue={initialValues?.ibu?.pekerjaan}
                        placeholder="Buruh" id="ibu.pekerjaan" />
                    <FormField type="tel" label="Nomor Hp Ibu" name="ibu.noHp"
                        defaultValue={initialValues?.ibu?.noHp}
                        placeholder="08******" id="ibu.noHp" />
                    <SelectField groups={statusHidupGroups} label="Status Hidup" name="ibu.statusHidup" value={statusHidupIbu}
                        onChange={setStatusHidupIbu} placeholder="Status Hidup"
                    />
                </CardOrtuSection>
            </FormRow>
        </AccordionSection>
    );
};
export default DataOrangTuaSection;
