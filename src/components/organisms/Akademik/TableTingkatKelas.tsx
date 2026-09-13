import ConfirmDeleteButton from "@/components/molecules/ConfirmDeleteButton";
import DialogTingkatKelas from "@/components/molecules/DialogTingkatKelas";
import { Button } from "@/components/ui/button";
import { useTingkatKelasMutation } from "@/hooks/use-tingkat-kelas-mutation";
import { useTingkatKelasQuery } from "@/hooks/use-tingkat-kelas-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";


const TabelTingkatKelas = () => {
    const [selectedSekolahId] = useState<string | undefined>();
    const { data } = useTingkatKelasQuery(selectedSekolahId);
    const { remove } = useTingkatKelasMutation();

    const handleDelete = (id: string) => {
        remove.mutate(id);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                {/* dropdown filter sekolah, opsional */}
                {/* <SelectSekolahFilter value={selectedSekolahId} onChange={setSelectedSekolahId} /> */}
                <DialogTingkatKelas type="create" />
            </div>

            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-border text-muted-foreground">
                        <th className="text-left py-2">Nama</th>
                        <th className="text-left py-2">Sekolah</th>
                        <th className="text-left py-2">Urutan</th>
                        <th className="text-right py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.length === 0 && (
                        <tr><td colSpan={4} className="text-center py-8 text-muted-foreground">Belum ada data</td></tr>
                    )}
                    {data?.map((item) => (
                        <tr key={item._id} className="border-b border-border">
                            <td className="py-3">{item.nama}</td>
                            <td className="py-3">{item.sekolahId?.nama}</td>
                            <td className="py-3">{item.urutan}</td>
                            <td className="py-3 text-right">
                                <DialogTingkatKelas type="update" initialValues={item} />
                                <ConfirmDeleteButton
                                    trigger={
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    }
                                    title={`Hapus "${item.nama}"?`}
                                    onConfirm={() => handleDelete(item._id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default TabelTingkatKelas;