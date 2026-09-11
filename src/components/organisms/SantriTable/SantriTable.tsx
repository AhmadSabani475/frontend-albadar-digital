import { santriService } from '@/services/santri.service';
import type { Santri } from '@/types/Santri';
import { useEffect, useState } from 'react';
import { getColumns } from './columns';
import DataTable from '../DataTable';
import StatusAlert from '@/components/molecules/StatusAlert';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SantriTable = () => {
    const [data, setData] = useState<Santri[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
    const [alert, setAlert] = useState<{
        variant: 'success' | 'error' | 'info' | 'warning';
        title: string;
        description?: string;
    } | null>(null);

    const fetchData = async (status?: string) => {
        try {
            setIsLoading(true);
            const result = await santriService.getAllSantri(status, 1, 1000);
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
            await fetchData(statusFilter);
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
    };

    useEffect(() => {
        fetchData(statusFilter);
    }, [statusFilter]);
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const columns = getColumns({ onDelete: handleDelete });
    return (
        <div>
            <Tabs
                value={statusFilter ?? 'semua'}
                onValueChange={(value) => setStatusFilter(value === 'semua' ? undefined : value)}
                className="mb-4"
            >
                <TabsList>
                    <TabsTrigger value="semua">Semua</TabsTrigger>
                    <TabsTrigger value="aktif">Aktif</TabsTrigger>
                    <TabsTrigger value="alumni">Alumni</TabsTrigger>
                    <TabsTrigger value="dikeluarkan">Dikeluarkan</TabsTrigger>
                </TabsList>
            </Tabs>

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