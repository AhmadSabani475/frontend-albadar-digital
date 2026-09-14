import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

import type { ResponseNaikKelas } from "@/types/KelasSantri";
import type { ResponseNaikKelasNgaji } from "@/types/RiwayatKelasNgaji";
import TabKenaikanFormal from "./TabKenaikanFormal";
import TabKenaikanNgaji from "./TabKenaikanNgaji";

interface Props {
    tahunAjaranAsalId: string;
    tahunAjaranTujuanId: string;
    hasilFormal: ResponseNaikKelas | null;
    setHasilFormal: (res: ResponseNaikKelas | null) => void;
    hasilNgaji: ResponseNaikKelasNgaji | null;
    setHasilNgaji: (res: ResponseNaikKelasNgaji | null) => void;
}

const TabsKenaikanKelas = (props: Props) => {
    return (
        <Tabs defaultValue="formal" className="w-full">
            <TabsList>
                <TabsTrigger value="formal">Kelas Formal</TabsTrigger>
                <TabsTrigger value="ngaji">Kelas Ngaji</TabsTrigger>
            </TabsList>

            <TabsContent value="formal">
                <TabKenaikanFormal
                    tahunAjaranAsalId={props.tahunAjaranAsalId}
                    tahunAjaranTujuanId={props.tahunAjaranTujuanId}
                    hasil={props.hasilFormal}
                    setHasil={props.setHasilFormal}
                />
            </TabsContent>

            <TabsContent value="ngaji">
                <TabKenaikanNgaji
                    tahunAjaranAsalId={props.tahunAjaranAsalId}
                    tahunAjaranTujuanId={props.tahunAjaranTujuanId}
                    hasil={props.hasilNgaji}
                    setHasil={props.setHasilNgaji}
                />
            </TabsContent>
        </Tabs>
    );
};

export default TabsKenaikanKelas;