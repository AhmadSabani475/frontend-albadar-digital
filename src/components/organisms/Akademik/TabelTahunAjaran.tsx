import ConfirmActionButton from "@/components/molecules/ConfirmActionButton";
import DialogTahunAjaran from "@/components/molecules/DialogTahunAjaran";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SimpleTable from "../SimpleTable";
import { useTahunAjaranMutation } from "@/hooks/use-tahun-ajaran-mutation";
import { useTahunAjaran } from "@/hooks/use-tahun-ajaran";
import { Trash2 } from "lucide-react";

const formatDateDisplay = (dateVal?: string | Date) => {
    if (!dateVal) return '-';
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return '-';
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

const TabelTahunAjaran = () => {
    const { data, isLoading } = useTahunAjaran();
    const { remove } = useTahunAjaranMutation();

    const handleDelete = (id: string) => {
        remove.mutate(id);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end items-center">
                <DialogTahunAjaran type="create" />
            </div>

            <SimpleTable
                columns={["Nama", "Tanggal Mulai", "Tanggal Selesai", "Status", "Aksi"]}
                isLoading={isLoading}
                isEmpty={!data || data.length === 0}
                emptyText="Belum ada data tahun ajaran"
                minWidth="550px"
            >
                {data?.map((item) => (
                    <tr key={item._id} className="border-b border-border hover:bg-muted/40 transition-colors">
                        <td className="px-6 py-3.5 text-foreground font-medium">{item.nama}</td>
                        <td className="px-6 py-3.5 text-foreground">{formatDateDisplay(item.tanggalMulai)}</td>
                        <td className="px-6 py-3.5 text-foreground">{formatDateDisplay(item.tanggalSelesai)}</td>
                        <td className="px-6 py-3.5">
                            {item.is_active ? (
                                <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-700">Aktif</Badge>
                            ) : (
                                <span className="text-muted-foreground text-xs">Non-Aktif</span>
                            )}
                        </td>
                        <td className="px-6 py-3.5 text-right">
                            <div className="flex justify-end items-center gap-1">
                                <DialogTahunAjaran type="update" initialValues={item} />
                                <ConfirmActionButton
                                    trigger={
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    }
                                    title={`Hapus "${item.nama}"?`}
                                    onConfirm={() => handleDelete(item._id)}
                                />
                            </div>
                        </td>
                    </tr>
                ))}
            </SimpleTable>
        </div>
    );
};

export default TabelTahunAjaran;
