import { santriService } from '@/services/santri.service';
import type { Santri } from '@/types/Santri';
import { useEffect, useState } from 'react';
import { getColumns } from './columns';
import DataTable from '../../DataTable';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SantriTable = () => {
    const [data, setData] = useState<Santri[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);

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
            toast({
                variant: 'success',
                title: 'Santri berhasil dihapus',
                description: 'Data Santri telah dihapus dari sistem.',
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Gagal menghapus santri',
                description: 'Terjadi kesalahan, coba lagi.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(statusFilter);
    }, [statusFilter]);

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
        </div>
    );
};
export default SantriTable;
