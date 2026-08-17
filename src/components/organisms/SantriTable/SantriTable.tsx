import { santriService } from '@/services/santri.service';
import type { Santri } from '@/types/Santri';
import { useEffect, useState } from 'react';
import { getColumns } from './columns';
import DataTable from '../DataTable';
import StatusAlert from '@/components/molecules/StatusAlert';

const SantriTable = () => {
    const [data, setData] = useState<Santri[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<{
        variant: 'success' | 'error' | 'info' | 'warning';
        title: string;
        description?: string;
    } | null>(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const result = await santriService.getAllSantri();
            setData(result.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            setIsLoading(true);
            await santriService.deleteSantriById(id);
            await fetchData();
            setAlert({
                variant: 'success',
                title: 'Santri berhasil dihapus',
                description: 'Data Santri telah dihapus dari sistem.',
            });
        } catch (error) {
            setAlert({
                variant: 'error',
                title: 'Gagal menghapus user',
                description: 'Terjadi kesalahan, coba lagi.',
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const columns = getColumns({ onDelete: handleDelete })
    return (
        <div>
            <DataTable
                data={data}
                columns={columns}
                isLoading={isLoading}
            />
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
export default SantriTable;