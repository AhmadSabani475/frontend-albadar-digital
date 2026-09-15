import { rekeningService } from "@/services/rekening.service";
import type { Rekening } from "@/types/Rekening";
import { useEffect, useState } from "react";
import { getColumns } from "./columns";
import DataTable from '../DataTable';

const TableRekening = () => {
    const [data, setData] = useState<Rekening[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
 

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const result = await rekeningService.getAllRekening();
            setData(result.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);
    const columns = getColumns();
    return (
        <div>
            <DataTable
                columns={columns} data={data} emptyMessage="Daftar Rekening Belum Ada" isLoading={isLoading}
                searchPlaceholder="Cari Rekening...." />
        </div>
    )

}
export default TableRekening;
