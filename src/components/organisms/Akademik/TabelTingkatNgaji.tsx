import ConfirmDeleteButton from "@/components/molecules/ConfirmDeleteButton";
import DialogTingkatNgaji from "@/components/molecules/DialogTingkatNgaji";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTingkatNgajiMutation } from "@/hooks/use-tingkat-ngaji-mutation";
import { useTingkatNgajiQuery } from "@/hooks/use-tingkat-ngaji-query";
import { Trash2 } from "lucide-react";

const TabelTingkatNgaji = () => {
    const { data } = useTingkatNgajiQuery();
    const { remove } = useTingkatNgajiMutation();

    const handleDelete = (id: string) => {
        remove.mutate(id);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <DialogTingkatNgaji type="create" />
            </div>

            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-white/10 text-gray-300">
                        <th className="text-left py-2">Nama</th>
                        <th className="text-left py-2">Urutan</th>
                        <th className="text-left py-2">Checkpoint</th>
                        <th className="text-right py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.length === 0 && (
                        <tr><td colSpan={4} className="text-center py-8 text-muted-foreground">Belum ada data</td></tr>
                    )}
                    {data?.map((item) => (
                        <tr key={item._id} className="border-b border-white/5">
                            <td className="py-3">{item.nama}</td>
                            <td className="py-3">{item.urutan}</td>
                            <td className="py-3">
                                {item.isCheckpoint ? (
                                    <Badge variant="secondary">Checkpoint</Badge>
                                ) : (
                                    <span className="text-muted-foreground text-xs">-</span>
                                )}
                            </td>
                            <td className="py-3 text-right">
                                <DialogTingkatNgaji type="update" initialValues={item} />
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
export default TabelTingkatNgaji;