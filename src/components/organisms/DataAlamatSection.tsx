import { MapIcon } from 'lucide-react';
import AccordionSection from '../molecules/AccordionSection';
import FormRow from '../atoms/FormRow';
import { Textarea } from '../ui/textarea';
import { Field, FieldLabel } from '../ui/field';
import FormField from '../molecules/FormField';
import SelectField from '../molecules/SelectField';
import { useEffect, useState } from 'react';
import { wilayahService, type WilayahItem } from '@/services/wilayah.service';

interface AlamatSectionProps {
    initialValues?: {
        jalan?: string;
        rtRw?: string;
        kodePos?: string;
    }
}
const DataAlamatSection = ({ initialValues }: AlamatSectionProps) => {
    const [provinsi, setProvinsi] = useState<WilayahItem[]>([]);
    const [kabupatenKota, setKabupatenKota] = useState<WilayahItem[]>([]);
    const [kecamatan, setKecamatan] = useState<WilayahItem[]>([]);
    const [desaKelurahan, setdesaKelurahan] = useState<WilayahItem[]>([]);

    const [provinsiId, setProvinsiId] = useState('');
    const [kabupatenKotaId, setKabupatenKotaId] = useState('');
    const [kecamatanId, setKecamatanId] = useState('');
    const [desaKelurahanId, setdesaKelurahanId] = useState('');

    const [provinsiName, setProvinsiName] = useState('');
    const [kabupatenKotaName, setKabupatenKotaName] = useState('');
    const [kecamatanName, setKecamatanName] = useState('');
    const [desaKelurahanName, setdesaKelurahanName] = useState('');

    useEffect(() => {
        wilayahService.getProvinces().then(setProvinsi);
    }, []);

    const handleProvinsiChange = async (id: string) => {
        try {
            setProvinsiId(id);
            setProvinsiName(provinsi.find((p) => p.id === id)?.name ?? '');

            setKabupatenKotaId('');
            setKecamatanId('');
            setdesaKelurahanId('');
            setKabupatenKotaName('');
            setKecamatanName('');
            setdesaKelurahanName('');
            setKabupatenKota([]);
            setKecamatan([]);
            setdesaKelurahan([]);

            if (id) {
                const data = await wilayahService.getRegencies(id);
                setKabupatenKota(data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleKabKotaChange = async (id: string) => {
        try {
            setKabupatenKotaId(id);
            setKabupatenKotaName(kabupatenKota.find((k) => k.id === id)?.name ?? '');

            setKecamatanId('');
            setdesaKelurahanId('');

            setKecamatanName('');
            setdesaKelurahanName('');

            setKecamatan([]);
            setdesaKelurahan([]);

            if (id) {
                const data = await wilayahService.getDistricts(id);
                setKecamatan(data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleKecamatanChange = async (id: string) => {
        try {
            setKecamatanId(id);
            setKecamatanName(kecamatan.find((k) => k.id === id)?.name ?? '');

            setdesaKelurahanId('');
            setdesaKelurahanName('');
            setdesaKelurahan([]);

            if (id) {
                const data = await wilayahService.getVillages(id);
                setdesaKelurahan(data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleVillageChange = (id: string) => {
        setdesaKelurahanId(id);
        setdesaKelurahanName(desaKelurahan.find((v) => v.id === id)?.name ?? '');
    };
    const toGroups = (items: WilayahItem[], groupLabel: string) => [
        { groupLabel, options: items.map((i) => ({ label: i.name, value: i.id })) },
    ];
    return (
        <AccordionSection value="alamat" Icon={MapIcon} title="Alamat">
            <FormRow>
                <Field>
                    <FieldLabel htmlFor="alamat.jalan">
                        Jalan/Detail Alamat
                        <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Textarea
                        id="alamat.jalan"
                        name="alamat.jalan"
                        defaultValue={initialValues?.jalan}
                        placeholder="Contoh: Jl.Merdeka No.12 Perum Asri"
                        rows={4}
                        required
                    />
                </Field>
            </FormRow>
            <FormRow>
                <SelectField
                    label="Provinsi"
                    groups={toGroups(provinsi, 'Pilih provinsi')}
                    name="alamat.kodeProvinsi"
                    value={provinsiId}
                    onChange={handleProvinsiChange}
                    placeholder={provinsiId ? 'Pilih Kab/Kota' : 'Pilih provinsi dulu'}
                    required
                />
                <input type="hidden" name="alamat.provinsi" value={provinsiName} />
                <SelectField
                    label="Kab/Kota"
                    groups={toGroups(kabupatenKota, 'Pilih Kab/kota')}
                    name="alamat.kodeKabupatenKota"
                    value={kabupatenKotaId}
                    onChange={handleKabKotaChange}
                    placeholder={kabupatenKotaId ? 'Pilih Kecamatan' : 'Pilih Kab/Kota dulu'}
                    required
                />
                <input type="hidden" name="alamat.kabupatenKota" value={kabupatenKotaName} />
            </FormRow>
            <FormRow>
                <SelectField
                    label="Kecamatan"
                    groups={toGroups(kecamatan, 'Pilih Kecamatan')}
                    name="alamat.kodeKecamatan"
                    value={kecamatanId}
                    onChange={handleKecamatanChange}
                    placeholder={kecamatanId ? 'Pilih Desa/Kelurahan' : 'Pilih Kecamatan dulu'}
                    required
                />
                <input type="hidden" name="alamat.kecamatan" value={kecamatanName} />
                <SelectField
                    label="Desa/Kelurahan"
                    groups={toGroups(desaKelurahan, 'Pilih Desa/Kelurahan')}
                    name="alamat.kodeDesaKelurahan"
                    value={desaKelurahanId}
                    onChange={handleVillageChange}
                    placeholder="Pilih Desa/Kelurahan"
                    required
                />
                <input type="hidden" name="alamat.desaKelurahan" value={desaKelurahanName} />
            </FormRow>
            <FormRow>
                <FormField type="text" label="RT/RW" name="alamat.rtRw"
                    defaultValue={initialValues?.rtRw} placeholder="002/005" id="alamat.rtRw" />
                <FormField type="text" label="Kode Pos" name="alamat.kodePos"
                    defaultValue={initialValues?.kodePos} placeholder="4117" id="alamat.kodePos" />
            </FormRow>
        </AccordionSection>
    );
};
export default DataAlamatSection;