import type { TarifKhusus } from '@/types/Tagihan';
import { useEffect, useState } from 'react';
import { getColumns } from './columns';
import DataTable from '@/components/organisms/DataTable';
import StatusAlert from '@/components/molecules/StatusAlert';
import { tarifKhususService } from '@/services/tarifKhusus.service';
import CreateTarifKhusus from '@/components/molecules/CreateTarifKhusus';


const TableTarifKhusus = () => {
    const [data, setData] = useState<TarifKhusus[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState<{
        variant: 'success' | 'error' | 'info' | 'warning';
        title: string;
        description?: string;
    } | null>(null);


    const handleDelete = async (id: string) => {
        try {
            setIsLoading(true);
            await tarifKhususService.deleteTarifKhusus(id);
            await fetchTarifKhusus();
            setAlert({
                variant: 'success',
                title: 'User berhasil dihapus',
                description: 'Data user telah dihapus dari sistem.',
            });
        } catch {
            setAlert({
                variant: 'error',
                title: 'Gagal menghapus user',
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

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

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

            {alert && (
                <div className="fixed top-4 right-4 z-50 w-full max-w-sm">
                    <StatusAlert
                        variant={alert.variant}
                        title={alert.title}
                        description={alert.description}
                    />
                </div>
            )}
        </div>
    );

};

export default TableTarifKhusus;