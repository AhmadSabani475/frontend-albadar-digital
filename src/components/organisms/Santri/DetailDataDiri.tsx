import AccordionSection from '@/components/molecules/AccordionSection';
import type { Santri } from '@/types/Santri';
import { Calendar, CreditCard, Hash, Phone, User, Users } from 'lucide-react';
import DetailItem from './DetailItem';

interface DetailDataDiriProps {
    data: Santri;
}

const formatDate = (dateStr?: string) => {
    if (!dateStr) return undefined;
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    } catch {
        return dateStr;
    }
};

export const DetailDataDiri = ({ data }: DetailDataDiriProps) => {
    const jenisKelaminLabel = data.jenisKelamin === 'L' ? 'Laki-laki' : data.jenisKelamin === 'P' ? 'Perempuan' : undefined;

    return (
        <AccordionSection value="data-diri" Icon={User} title="Data Diri">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <DetailItem label="Nama Lengkap" value={data.namaLengkap} icon={User} />
                <DetailItem label="Jenis Kelamin" value={jenisKelaminLabel} icon={User} />
                <DetailItem label="NIS (Nomor Induk Santri)" value={data.nis} icon={Hash} />
                <DetailItem label="NIK (Nomor Induk Kependudukan)" value={data.nik} icon={CreditCard} />
                <DetailItem label="No. Telepon / WhatsApp" value={data.noHp} icon={Phone} />
                <DetailItem label="Tempat Lahir" value={data.tempatLahir} />
                <DetailItem label="Tanggal Lahir" value={formatDate(data.tanggalLahir)} icon={Calendar} />
                <DetailItem label="Anak Ke-" value={data.anakKe !== undefined ? `${data.anakKe}` : undefined} icon={Hash} />
                <DetailItem label="Jumlah Saudara" value={data.jumlahSaudara !== undefined ? `${data.jumlahSaudara}` : undefined} icon={Users} />
            </div>
        </AccordionSection>
    );
};

export default DetailDataDiri;
