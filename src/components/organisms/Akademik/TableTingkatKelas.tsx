import ConfirmActionButton from "@/components/molecules/ConfirmActionButton";
import DialogTingkatKelas from "@/components/molecules/DialogTingkatKelas";
import { Button } from "@/components/ui/button";
import SimpleTable from "../SimpleTable";
import { useTingkatKelasMutation } from "@/hooks/use-tingkat-kelas-mutation";
import { useTingkatKelasQuery } from "@/hooks/use-tingkat-kelas-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const TabelTingkatKelas = () => {
    const [selectedSekolahId] = useState<string | undefined>();
    const { data, isLoading } = useTingkatKelasQuery(selectedSekolahId);
    const { remove } = useTingkatKelasMutation();

    const handleDelete = (id: string) => {
        remove.mutate(id);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end items-center">
                <DialogTingkatKelas type="create" />
            </div>

            <SimpleTable
                columns={["Nama", "Sekolah", "Urutan", "Aksi"]}
                isLoading={isLoading}
                isEmpty={!data || data.length === 0}
                emptyText="Belum ada data"
                minWidth="500px"
            >
                {data?.map((item) => (
                    <tr key={item._id} className="border-b border-border hover:bg-muted/40 transition-colors">
                        <td className="px-6 py-3.5 text-foreground font-medium">{item.nama}</td>
                        <td className="px-6 py-3.5 text-foreground">{item.sekolahId?.nama}</td>
                        <td className="px-6 py-3.5 text-foreground">{item.urutan}</td>
                        <td className="px-6 py-3.5 text-right">
                            <div className="flex justify-end items-center gap-1">
                                <DialogTingkatKelas type="update" initialValues={item} />
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
export default TabelTingkatKelas;
