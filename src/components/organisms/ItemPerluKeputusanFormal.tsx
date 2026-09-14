import { useState } from "react";
import { Button } from "@/components/ui/button";
import SearchableSelectField from "@/components/molecules/SearchableSelectField";
import { useTingkatKelasQuery } from "@/hooks/use-tingkat-kelas-query";
import type { SantriButuhKeputusanKelas } from "@/types/KelasSantri";
import type { UseMutationResult } from "@tanstack/react-query";

interface Props {
    item: SantriButuhKeputusanKelas;
    tahunAjaranTujuanId: string;
    keputusanManual: UseMutationResult<any, Error, any>;
    onResolved: (santriId: string) => void;
}

const ItemPerluKeputusanFormal = ({ item, tahunAjaranTujuanId, keputusanManual, onResolved }: Props) => {
    const [tingkatTujuanId, setTingkatTujuanId] = useState('');
    const { data: tingkatKelasList } = useTingkatKelasQuery();

    const options = (tingkatKelasList ?? []).map((t) => ({
        label: `${t.nama} — ${t.sekolahId?.nama ?? ''}`,
        value: t._id,
    }));

    const handleLanjut = () => {
        if (!tingkatTujuanId) return;
        keputusanManual.mutate(
            {
                santriId: item.santriId,
                tahunAjaranId: tahunAjaranTujuanId,
                aksi: 'lanjut',
                tingkatKelasId: tingkatTujuanId,
            },
            { onSuccess: () => onResolved(item.santriId) }
        );
    };

    const handleAlumni = () => {
        keputusanManual.mutate(
            {
                santriId: item.santriId,
                tahunAjaranId: tahunAjaranTujuanId,
                aksi: 'alumni',
            },
            { onSuccess: () => onResolved(item.santriId) }
        );
    };

    return (
        <div className="border border-white/10 rounded-lg p-3 space-y-2">
            <div>
                <p className="font-medium">{item.namaSantri}</p>
                <p className="text-xs text-muted-foreground">
                    NIS: {item.nis} — Sekarang: {item.tingkatKelasSekarang.nama}
                </p>
            </div>
            <div className="flex gap-2 items-end">
                <div className="flex-1">
                    <SearchableSelectField
                        label="Lanjut ke Tingkat"
                        name={`tingkat-${item.santriId}`}
                        value={tingkatTujuanId}
                        onChange={setTingkatTujuanId}
                        options={options}
                        placeholder="Pilih tingkat/sekolah"
                    />
                </div>
                <Button size="sm" onClick={handleLanjut} disabled={!tingkatTujuanId || keputusanManual.isPending}>
                    Lanjut
                </Button>
                <Button size="sm" variant="outline" onClick={handleAlumni} disabled={keputusanManual.isPending}>
                    Tandai Alumni
                </Button>
            </div>
        </div>
    );
};

export default ItemPerluKeputusanFormal;