import { JenisTagihanService } from '@/services/jenisTagihan.service';
import type { JenisTagihan } from '@/types/Tagihan';
import { useEffect, useState } from 'react';
import { getColumns } from './columns';
import DataTable from '@/components/organisms/DataTable';
import { toast } from '@/hooks/use-toast';
import CreateJenisTagihan from '@/components/molecules/CreateJenisTagihan';

const TableJenisTagihan = () => {
    const [data, setData] = useState<JenisTagihan[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleDelete = async (id: string) => {
        try {
            setIsLoading(true);
            await JenisTagihanService.deleteById(id);
            await fetchJenisTagihan();
            toast({
                variant: 'success',
                title: 'Jenis Tagihan berhasil dihapus',
                description: 'Data jenis tagihan telah dihapus.',
            });
        } catch {
            toast({
                variant: 'destructive',
                title: 'Gagal menghapus jenis tagihan',
                description: 'Terjadi kesalahan, coba lagi.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchJenisTagihan = async () => {
        try {
            setIsLoading(true);
            const result = await JenisTagihanService.getAllJenisTagihan()
            setData(result.data)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchJenisTagihan();
    }, []);

    const columns = getColumns({ onDelete: handleDelete });

    return (
        <div className='flex flex-col gap-2'>
            <div className="flex justify-end">
                <CreateJenisTagihan />
            </div>
            <DataTable
                data={data}
                columns={columns}
                isLoading={isLoading}
                searchPlaceholder="Cari Tagihan..."
                emptyMessage="Belum ada data tagihan" />
        </div>
    );
};

export default TableJenisTagihan;