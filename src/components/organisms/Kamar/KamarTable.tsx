import { useEffect, useState } from 'react';
import { getColumns } from './columns';
import type { Kamar } from '@/types/Kamar';
import { kamarService } from '@/services/kamar.service';
import DataTable from '../DataTable';


const KamarTable = () => {
    const [data, setData] = useState<Kamar[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    const fetchKamar = () => {
        setIsLoading(true);
        kamarService.getAllKamar()
            .then((res) => setData(res.data))
            .finally(() => setIsLoading(false));
    };

    const handleDelete = async (id?: string) => {
        try {
            setIsLoading(true);
            await kamarService.deleteById(id);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchKamar();
    }, []);

    const columns = getColumns({ onDelete: handleDelete });

    if (isLoading) {
        return <p className="text-sm text-muted-foreground">Memuat data...</p>;
    }

    return (
        <DataTable
            data={data}
            columns={columns}
            isLoading={isLoading}
            searchPlaceholder="Cari kamar..."
            emptyMessage="Belum ada data kamar" />
    );
};

export default KamarTable;
