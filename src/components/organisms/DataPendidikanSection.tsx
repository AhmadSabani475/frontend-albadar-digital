import { GraduationCap } from 'lucide-react';
import AccordionSection from '../molecules/AccordionSection';
import FormRow from '../atoms/FormRow';
import SelectField from '../molecules/SelectField';
import { useState } from 'react';
import FormField from '../molecules/FormField';

const educationGroups = [
    {
        groupLabel: 'Pilih Jenjang',
        options: [
            { label: 'SD/MI', value: 'SD/MI' },
            { label: 'SMP/MTs', value: 'SMP/MTs' },
            { label: 'SMA/SMK/MA', value: 'SMA/SMK/MA' },
        ]
    }
];

const DataPendidikanSection = () => {
    const [jenjangTerakhir, setJenjangTerakhir] = useState('');
    return (
        <AccordionSection Icon={GraduationCap} title="Data Pendidikan Sebelumnya" value="data-pendidikan">
            <FormRow>
                <SelectField groups={educationGroups} label="Jenjang Terakhir" required
                    placeholder="Jenjang Terakhir" name="pendidikanTerakhir.jenjangTerakhir"
                    value={jenjangTerakhir} onChange={setJenjangTerakhir} />
                <FormField label="Nama Sekolah" name="pendidikanTerakhir.namaSekolah" id="pendidikanTerakhir.namaSekolah"
                    placeholder="SDN 1 Purwakarta" required />
            </FormRow>
            <FormRow>
                <FormField label="Tahun Masuk" name="pendidikanTerakhir.tahunMasuk"
                    placeholder="2010" required id="pendidikanTerakhir.tahunMasuk" />
                <FormField label="Tahun Lulus" name="pendidikanTerakhir.tahunLulus" id="pendidikanTerakhir.tahunLulus"
                    placeholder="2013" required />
            </FormRow>
        </AccordionSection>
    );
};

export default DataPendidikanSection;