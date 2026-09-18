import AccordionSection from '@/components/molecules/AccordionSection';
import type { Santri } from '@/types/Santri';
import { Building, Home, School, Shirt } from 'lucide-react';
import DetailItem from './DetailItem';

interface DetailDataAsramaSekolahProps {
    data: Santri;
}

export const DetailDataAsramaSekolah = ({ data }: DetailDataAsramaSekolahProps) => {
    const namaKamar = typeof data.kamarId === 'object' && data.kamarId
        ? data.kamarId.namaKamar
        : undefined;

    const namaAsrama = typeof data.kamarId === 'object' && data.kamarId?.asramaId
        ? data.kamarId.asramaId.namaAsrama
        : undefined;

    const asramaKamarFull = namaAsrama && namaKamar
        ? `${namaAsrama} - ${namaKamar}`
        : namaKamar ?? namaAsrama;

    const sekolahVal = data.sekolah || (typeof data.sekolahId === 'object' && data.sekolahId ? data.sekolahId.nama : undefined);
    const sekolahKelasFull = sekolahVal
        ? `${sekolahVal}${data.kelasFormal ? ` (${data.kelasFormal})` : ''}`
        : data.kelasFormal ?? '-';

    return (
        <AccordionSection value="data-asrama-sekolah" Icon={Building} title="Asrama & Sekolah">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <DetailItem label="Asrama & Kamar" value={asramaKamarFull} icon={Home} />
                <DetailItem label="Sekolah Santri" value={sekolahKelasFull} icon={School} />
                <DetailItem label="Kelas Ngaji" value={data.kelasNgaji ?? '-'} icon={Building} />
                <DetailItem
                    label="Status Langganan Laundry"
                    value={data.laundry ? 'Langganan Laundry (Ya)' : 'Tidak Langganan Laundry'}
                    icon={Shirt}
                />
            </div>
        </AccordionSection>
    );
};

export default DetailDataAsramaSekolah;
