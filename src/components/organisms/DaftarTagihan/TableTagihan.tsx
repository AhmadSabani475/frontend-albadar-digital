import { useEffect, useState } from 'react';
import { getColumns } from './columns';
import { tagihanService } from '@/services/tagihan.service';
import type { Tagihan } from '@/types/Tagihan';
import DataTable from '../DataTable';

const TableTagihan = () => {
    const [data, setData] = useState<Tagihan[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const result = await tagihanService.getAllTagihan();
            setData(result.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    const columns = getColumns();
    return (
        <div>
            <DataTable
                data={data}
                columns={columns}
                isLoading={isLoading}
            />
            
        </div>
    );
};
export default TableTagihan;