import SelectTahunAjaran from "@/components/organisms/SelectTahunAjaran";
import TabsKenaikanKelas from "@/components/organisms/TabsKenaikanKelas";
import type { ResponseNaikKelas } from "@/types/KelasSantri";
import type { ResponseNaikKelasNgaji } from "@/types/RiwayatKelasNgaji";
import { useState } from "react";

const KenaikanKelasPage = () => {
    const [tahunAjaranAsalId, setTahunAjaranAsalId] = useState('');
    const [tahunAjaranTujuanId, setTahunAjaranTujuanId] = useState('');

    const [hasilFormal, setHasilFormal] = useState<ResponseNaikKelas | null>(null);
    const [hasilNgaji, setHasilNgaji] = useState<ResponseNaikKelasNgaji | null>(null);

    return (
        <div className="w-full flex flex-col gap-4">
            <SelectTahunAjaran
                onChangeAsal={setTahunAjaranAsalId}
                onChangeTujuan={setTahunAjaranTujuanId}
                tahunAjaranAsalId={tahunAjaranAsalId}
                tahunAjaranTujuanId={tahunAjaranTujuanId}
            />
            <TabsKenaikanKelas
                tahunAjaranAsalId={tahunAjaranAsalId}
                tahunAjaranTujuanId={tahunAjaranTujuanId}
                setHasilFormal={setHasilFormal}
                setHasilNgaji={setHasilNgaji}
                hasilFormal={hasilFormal}
                hasilNgaji={hasilNgaji}

            />
        </div>
    )
}
export default KenaikanKelasPage;