import { useState } from "react";
import { Button } from "@/components/ui/button";
import SearchableSelectField from "@/components/molecules/SearchableSelectField";
import { useTingkatNgajiQuery } from "@/hooks/use-tingkat-ngaji-query";
import type { SantriButuhKeputusanNgaji } from "@/types/RiwayatKelasNgaji";
import type { UseMutationResult } from "@tanstack/react-query";

interface Props {
    item: SantriButuhKeputusanNgaji;
    tahunAjaranTujuanId: string;
    keputusanManual: UseMutationResult<any, Error, any>;
    onResolved: (santriId: string) => void;
}

const ItemPerluKeputusanNgaji = ({ item, tahunAjaranTujuanId, keputusanManual, onResolved }: Props) => {
    const [tingkatTujuanId, setTingkatTujuanId] = useState('');
    const { data: tingkatNgajiList } = useTingkatNgajiQuery();

    const options = (tingkatNgajiList ?? []).map((t) => ({
        label: t.nama,
        value: t._id,
    }));

    const submitAksi = (aksi: 'lanjut' | 'kelas_terbang' | 'pengurus' | 'alumni') => {
        keputusanManual.mutate(
            {
                santriId: item.santriId,
                tahunAjaranId: tahunAjaranTujuanId,
                aksi,
                ...(aksi === 'lanjut' ? { tingkatNgajiId: tingkatTujuanId } : {}),
            },
            { onSuccess: () => onResolved(item.santriId) }
        );
    };

    return (
        <div className="border border-white/10 rounded-lg p-3 space-y-2">
            <div>
                <p className="font-medium">{item.namaSantri}</p>
                <p className="text-xs text-muted-foreground">
                    NIS: {item.nis} — Sekarang: {item.tingkatNgajiSekarang.nama}
                </p>
            </div>
            <div className="flex gap-2 items-end flex-wrap">
                <div className="flex-1 min-w-40">
                    <SearchableSelectField
                        label="Lanjut ke Tingkat"
                        name={`tingkat-ngaji-${item.santriId}`}
                        value={tingkatTujuanId}
                        onChange={setTingkatTujuanId}
                        options={options}
                        placeholder="Pilih tingkat"
                    />
                </div>
                <Button
                    size="sm"
                    onClick={() => submitAksi('lanjut')}
                    disabled={!tingkatTujuanId || keputusanManual.isPending}
                >
                    Lanjut
                </Button>
                <Button size="sm" variant="outline" onClick={() => submitAksi('kelas_terbang')} disabled={keputusanManual.isPending}>
                    Kelas Terbang
                </Button>
                <Button size="sm" variant="outline" onClick={() => submitAksi('pengurus')} disabled={keputusanManual.isPending}>
                    Pengurus
                </Button>
                <Button size="sm" variant="outline" onClick={() => submitAksi('alumni')} disabled={keputusanManual.isPending}>
                    Alumni
                </Button>
            </div>
        </div>
    );
};

export default ItemPerluKeputusanNgaji;