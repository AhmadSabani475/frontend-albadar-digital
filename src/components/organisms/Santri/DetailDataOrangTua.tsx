import AccordionSection from '@/components/molecules/AccordionSection';
import type { Orangtua, Santri } from '@/types/Santri';
import { CreditCard, Heart, Phone, User, Users, Briefcase, GraduationCap } from 'lucide-react';
import DetailItem from './DetailItem';
import { Badge } from '@/components/ui/badge';

interface DetailDataOrangTuaProps {
    data: Santri;
}

const OrtuCard = ({ title, ortu, icon: HeaderIcon }: { title: string; ortu?: Orangtua; icon: React.ElementType }) => {
    if (!ortu) {
        return (
            <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <HeaderIcon className="w-4 h-4 text-primary" />
                    {title}
                </h4>
                <p className="text-sm text-muted-foreground italic">Data tidak tersedia</p>
            </div>
        );
    }

    const isAlive = ortu.statusHidup === 'Hidup';

    return (
        <div className="p-4 sm:p-5 rounded-xl border border-border bg-card flex flex-col gap-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h4 className="font-semibold text-base text-foreground flex items-center gap-2">
                    <HeaderIcon className="w-4.5 h-4.5 text-primary" />
                    {title}
                </h4>
                {ortu.statusHidup && (
                    <Badge variant={isAlive ? 'outline' : 'secondary'} className={`gap-1.5 font-medium ${isAlive ? 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10' : 'bg-muted text-muted-foreground'}`}>
                        <Heart className="w-3 h-3 fill-current" />
                        {ortu.statusHidup}
                    </Badge>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <DetailItem label="Nama Lengkap" value={ortu.nama} icon={User} className="sm:col-span-2" />
                <DetailItem label="NIK" value={ortu.nik} icon={CreditCard} />
                <DetailItem label="No. Telpon / WA" value={ortu.noHp} icon={Phone} />
                <DetailItem label="Pendidikan Terakhir" value={ortu.pendidikan} icon={GraduationCap} />
                <DetailItem label="Pekerjaan" value={ortu.pekerjaan} icon={Briefcase} />
            </div>
        </div>
    );
};

export const DetailDataOrangTua = ({ data }: DetailDataOrangTuaProps) => {
    return (
        <AccordionSection value="data-ortu" Icon={Users} title="Data Orang Tua / Wali">
            <div className="flex flex-col gap-4">
                {/* Family General Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <DetailItem label="No. Kartu Keluarga (KK)" value={data.noKk} icon={CreditCard} />
                    <DetailItem label="Nama Kepala Keluarga" value={data.namaKepalaKeluarga} icon={User} />
                </div>

                {/* Ayah & Ibu Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                    <OrtuCard title="Data Ayah" ortu={data.ayah} icon={User} />
                    <OrtuCard title="Data Ibu" ortu={data.ibu} icon={User} />
                </div>
            </div>
        </AccordionSection>
    );
};

export default DetailDataOrangTua;
