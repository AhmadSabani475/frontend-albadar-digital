import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Santri } from '@/types/Santri';
import { ChevronDown, GraduationCap, UserCheck, User, Home, School, Shirt, Phone } from 'lucide-react';

interface DetailSantriHeaderProps {
    data: Santri;
    isUpdatingStatus: boolean;
    onUpdateStatus: (newStatus: 'aktif' | 'alumni') => void;
}

const STATUS_CONFIG = {
    aktif: {
        label: 'Aktif',
        className: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 rounded-full border-0 px-3 py-1 text-xs font-semibold',
        icon: UserCheck,
    },
    alumni: {
        label: 'Alumni',
        className: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 rounded-full border-0 px-3 py-1 text-xs font-semibold',
        icon: GraduationCap,
    },
} as const;

export const DetailSantriHeader = ({ data, isUpdatingStatus, onUpdateStatus }: DetailSantriHeaderProps) => {
    const currentStatus = data.status ?? 'aktif';
    const statusInfo = STATUS_CONFIG[currentStatus];

    const namaKamar = typeof data.kamarId === 'object' && data.kamarId
        ? `${data.kamarId.asramaId?.namaAsrama ? `${data.kamarId.asramaId.namaAsrama} - ` : ''}${data.kamarId.namaKamar}`
        : 'Belum diatur';

    const namaSekolah = typeof data.sekolahId === 'object' && data.sekolahId
        ? data.sekolahId.nama
        : 'Belum diatur';

    return (
        <div className="w-full rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full md:w-auto">
                {/* Photo Avatar */}
                <div className="relative shrink-0">
                    {data.fotoUrl ? (
                        <img
                            src={data.fotoUrl}
                            alt={data.namaLengkap}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-primary/20 shadow-xs"
                        />
                    ) : (
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-muted/80 flex items-center justify-center border-2 border-border text-muted-foreground">
                            <User className="w-10 h-10 stroke-[1.5]" />
                        </div>
                    )}
                </div>

                {/* Main Info */}
                <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            {data.namaLengkap}
                        </h1>
                        <Badge className={statusInfo.className}>
                            {statusInfo.label}
                        </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        {data.nis && <span>NIS: <strong className="text-foreground font-medium">{data.nis}</strong></span>}
                        {data.nik && <span>NIK: <strong className="text-foreground font-medium">{data.nik}</strong></span>}
                        {data.noHp && (
                            <span className="flex items-center gap-1">
                                <Phone className="w-3.5 h-3.5 text-muted-foreground/80" />
                                {data.noHp}
                            </span>
                        )}
                    </div>

                    {/* Quick Pill Tags */}
                    <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline" className="gap-1.5 font-normal py-1 px-2.5 bg-background">
                            <User className="w-3.5 h-3.5 text-primary" />
                            {data.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                        </Badge>
                        <Badge variant="outline" className="gap-1.5 font-normal py-1 px-2.5 bg-background">
                            <Home className="w-3.5 h-3.5 text-primary" />
                            {namaKamar}
                        </Badge>
                        <Badge variant="outline" className="gap-1.5 font-normal py-1 px-2.5 bg-background">
                            <School className="w-3.5 h-3.5 text-primary" />
                            {namaSekolah}
                        </Badge>
                        <Badge variant="outline" className="gap-1.5 font-normal py-1 px-2.5 bg-background">
                            <Shirt className="w-3.5 h-3.5 text-primary" />
                            Laundry: {data.laundry ? 'Ya' : 'Tidak'}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Status Change Action */}
            <div className="shrink-0 self-end md:self-center">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button variant="outline" disabled={isUpdatingStatus} className="gap-2 shadow-xs">
                                {isUpdatingStatus ? 'Memproses...' : 'Ubah Status'}
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        }
                    />
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Status Santri</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {(Object.entries(STATUS_CONFIG) as [keyof typeof STATUS_CONFIG, typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG]][]).map(([key, config]) => {
                                const Icon = config.icon;
                                const isActive = currentStatus === key;
                                return (
                                    <DropdownMenuItem
                                        key={key}
                                        onClick={() => onUpdateStatus(key)}
                                        className={isActive ? 'opacity-50 pointer-events-none' : ''}
                                    >
                                        <Icon className="h-4 w-4 mr-2 text-primary" />
                                        {config.label}
                                        {isActive && <span className="ml-auto text-xs text-muted-foreground">(saat ini)</span>}
                                    </DropdownMenuItem>
                                );
                            })}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default DetailSantriHeader;
