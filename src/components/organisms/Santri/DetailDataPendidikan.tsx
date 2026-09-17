import AccordionSection from '@/components/molecules/AccordionSection';
import type { PendidikanSebelumnya } from '@/types/Santri';
import { Calendar, GraduationCap, School } from 'lucide-react';
import DetailItem from './DetailItem';

interface DetailDataPendidikanProps {
    pendidikan?: PendidikanSebelumnya;
}

export const DetailDataPendidikan = ({ pendidikan }: DetailDataPendidikanProps) => {
    if (!pendidikan) {
        return (
            <AccordionSection value="data-pendidikan" Icon={GraduationCap} title="Pendidikan Terakhir">
                <p className="text-sm text-muted-foreground italic">Data pendidikan belum diisi.</p>
            </AccordionSection>
        );
    }

    return (
        <AccordionSection value="data-pendidikan" Icon={GraduationCap} title="Pendidikan Terakhir">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <DetailItem label="Jenjang Terakhir" value={pendidikan.jenjangTerakhir} icon={GraduationCap} />
                <DetailItem label="Nama Sekolah / Instansi" value={pendidikan.namaSekolah} icon={School} />
                <DetailItem label="Tahun Masuk" value={pendidikan.tahunMasuk} icon={Calendar} />
                <DetailItem label="Tahun Lulus" value={pendidikan.tahunLulus} icon={Calendar} />
            </div>
        </AccordionSection>
    );
};

export default DetailDataPendidikan;
