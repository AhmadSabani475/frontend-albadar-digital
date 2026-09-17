import AccordionSection from '@/components/molecules/AccordionSection';
import type { Alamat } from '@/types/Santri';
import { MapPin, Navigation } from 'lucide-react';
import DetailItem from './DetailItem';

interface DetailDataAlamatProps {
    alamat?: Alamat;
}

export const DetailDataAlamat = ({ alamat }: DetailDataAlamatProps) => {
    if (!alamat) {
        return (
            <AccordionSection value="data-alamat" Icon={MapPin} title="Alamat">
                <p className="text-sm text-muted-foreground italic">Data alamat belum diisi.</p>
            </AccordionSection>
        );
    }

    const fullAlamatParts = [
        alamat.jalan,
        alamat.rtRw ? `RT/RW ${alamat.rtRw}` : null,
        alamat.desaKelurahan ? `Desa/Kel. ${alamat.desaKelurahan}` : null,
        alamat.kecamatan ? `Kec. ${alamat.kecamatan}` : null,
        alamat.kabupatenKota,
        alamat.provinsi,
        alamat.kodePos ? `Kode Pos ${alamat.kodePos}` : null,
    ].filter(Boolean);

    const fullAlamatString = fullAlamatParts.length > 0 ? fullAlamatParts.join(', ') : 'Belum diisi lengkap';

    return (
        <AccordionSection value="data-alamat" Icon={MapPin} title="Alamat">
            <div className="flex flex-col gap-4">
                {/* Full Address Card */}
                <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/15 flex items-start gap-3">
                    <Navigation className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Alamat Lengkap</span>
                        <p className="text-sm font-medium text-foreground">{fullAlamatString}</p>
                    </div>
                </div>

                {/* Detailed Address Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <DetailItem label="Jalan / Detail Alamat" value={alamat.jalan} className="sm:col-span-2 md:col-span-3" />
                    <DetailItem label="RT / RW" value={alamat.rtRw} />
                    <DetailItem label="Desa / Kelurahan" value={alamat.desaKelurahan} />
                    <DetailItem label="Kecamatan" value={alamat.kecamatan} />
                    <DetailItem label="Kabupaten / Kota" value={alamat.kabupatenKota} />
                    <DetailItem label="Provinsi" value={alamat.provinsi} />
                    <DetailItem label="Kode Pos" value={alamat.kodePos} />
                </div>
            </div>
        </AccordionSection>
    );
};

export default DetailDataAlamat;
