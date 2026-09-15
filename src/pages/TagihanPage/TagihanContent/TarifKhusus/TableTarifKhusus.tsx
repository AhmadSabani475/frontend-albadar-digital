import type { TarifKhusus } from '@/types/Tagihan';
import { useEffect, useState } from 'react';
import { getColumns } from './columns';
import DataTable from '@/components/organisms/DataTable';
import { toast } from '@/hooks/use-toast';
import { tarifKhususService } from '@/services/tarifKhusus.service';
import CreateTarifKhusus from '@/components/organisms/Tagihan/CreateTarifKhusus';

const TableTarifKhusus = () => {
    const [data, setData] = useState<TarifKhusus[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleDelete = async (id: string) => {
        try {
            setIsLoading(true);
            await tarifKhususService.deleteTarifKhusus(id);
            await fetchTarifKhusus();
            toast({
                variant: 'success',
                title: 'Tarif Khusus berhasil dihapus',
                description: 'Data tarif khusus telah dihapus.',
            });
        } catch {
            toast({
                variant: 'destructive',
                title: 'Gagal menghapus tarif khusus',
                description: 'Terjadi kesalahan, coba lagi.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTarifKhusus = async () => {
        try {
            setIsLoading(true);
            const result = await tarifKhususService.getAllTarifKhusus()
            setData(result.data)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchTarifKhusus();
    }, []);

    const columns = getColumns({ onDelete: handleDelete });

    return (
        <div className='flex flex-col gap-2'>
            <div className="flex justify-end">
                <CreateTarifKhusus />
            </div>
            <DataTable
                data={data}
                columns={columns}
                isLoading={isLoading} />
        </div>
    );
};

export default TableTarifKhusus;