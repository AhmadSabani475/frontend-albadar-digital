import { User } from 'lucide-react';
import AccordionSection from '../molecules/AccordionSection';
import FormRow from '../atoms/FormRow';
import FormField from '../molecules/FormField';
import PhotoUpload from '../molecules/PhotoUpload';
import SelectField from '../molecules/SelectField';
import { useState } from 'react';


const genderGroups = [
    {
        groupLabel: 'Jenis Kelamin',
        options: [
            { label: 'Laki-laki', value: 'L' },
            { label: 'Perempuan', value: 'P' },
        ],
    },
];

interface DataDiriSectionProps {
    initialValues?: {
        nik?: string;
        nis?: string;
        namaLengkap?: string;
        jenisKelamin?: 'L' | 'P';
        noHp?: string;
        anakKe?: string;
        tempatLahir?: string;
        tanggalLahir?: string;
        jumlahSaudara?: string;
        fotoUrl?: string;
    };
    disabled?: boolean;
}

const DataDiriSection = ({ initialValues, disabled = false }: DataDiriSectionProps) => {

    const [jenisKelamin, setJenisKelamin] = useState(initialValues?.jenisKelamin ?? '');
    const [fotoUrl, setFotoUrl] = useState(initialValues?.fotoUrl ?? '');


    return (
        <AccordionSection value="data-diri" Icon={User} title="Data Diri">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <PhotoUpload
                    name="foto"
                    onChange={(file) => console.log(file)}
                    initialPreview={initialValues?.fotoUrl}
                    disabled={disabled}
                />
                <input type="hidden" name="fotoUrl" value={fotoUrl} />
                <div className="flex flex-col w-full">
                    <FormField type="text" label="Nama Lengkap"
                        defaultValue={initialValues?.namaLengkap} placeholder="Masukkan Nama Santri"
                        name="namaLengkap" id="namaLengkap" required />
                    <FormRow>
                        <SelectField
                            name="jenisKelamin"
                            label="Jenis Kelamin"
                            value={jenisKelamin}
                            onChange={setJenisKelamin}
                            groups={genderGroups}
                            placeholder="Pilih Jenis Kelamin"
                            required />

                        <FormField type="text" label="NIS (Opsional)" placeholder="Nomor Induk Santri"
                            defaultValue={initialValues?.nis} name="nis" id="nis" />
                    </FormRow>
                    <FormRow >
                        <FormField type="text" label="NIK (Opsional)"
                            defaultValue={initialValues?.nik} placeholder="Nomor Induk Kependudukan"
                            name="nik" id="nik" />
                        <FormField type="tel" label="No Telpon Santri (Opsional)"
                            defaultValue={initialValues?.noHp} placeholder="628****"
                            name="noHp" id="noHp" />
                    </FormRow>
                    <FormRow >
                        <FormField type="text" label="Tempat Lahir"
                            defaultValue={initialValues?.tempatLahir} placeholder="Bekasi"
                            name="tempatLahir" id="tempatLahir" required />
                        <FormField type="date" label="Tanggal Lahir"
                            defaultValue={initialValues?.tanggalLahir}
                            name="tanggalLahir" id="tanggalLahir" required />
                    </FormRow>
                    <FormRow >
                        <FormField type="number" label="Anak Ke- (Opsional)"
                            defaultValue={initialValues?.anakKe} placeholder="1"
                            name="anakKe" id="anakKe" />
                        <FormField type="number" label="Jumlah Saudara (Opsional)"
                            defaultValue={initialValues?.jumlahSaudara} placeholder="3"
                            name="jumlahSaudara" id="jumlahSaudara" />
                    </FormRow>

                </div>
            </div>
        </AccordionSection>
    );
};
export default DataDiriSection;