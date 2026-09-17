import { useMemo } from "react";
import DataTable from "../DataTable";
import { getTunggakanColumns } from "./columns";
import type { TunggakanSantri } from "@/types/Tunggakan";

interface Props {
    data?: TunggakanSantri[];
    isLoading: boolean;
}

const TabelTunggakan = ({ data = [], isLoading }: Props) => {
    const columns = useMemo(() => getTunggakanColumns(), []);

    return (
        <DataTable
            columns={columns}
            data={data}
            isLoading={isLoading}
            searchPlaceholder="Cari nama santri / NIS..."
            emptyMessage="Belum ada data tunggakan"
        />
    );
};

export default TabelTunggakan;

