import ConfirmActionButton from "@/components/molecules/ConfirmActionButton";
import DialogTingkatNgaji from "@/components/molecules/DialogTingkatNgaji";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SimpleTable from "../SimpleTable";
import { useTingkatNgajiMutation } from "@/hooks/use-tingkat-ngaji-mutation";
import { useTingkatNgajiQuery } from "@/hooks/use-tingkat-ngaji-query";
import { Trash2 } from "lucide-react";

const TabelTingkatNgaji = () => {
    const { data, isLoading } = useTingkatNgajiQuery();
    const { remove } = useTingkatNgajiMutation();

    const handleDelete = (id: string) => {
        remove.mutate(id);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end items-center">
                <DialogTingkatNgaji type="create" />
            </div>

            <SimpleTable
                columns={["Nama", "Urutan", "Checkpoint", "Aksi"]}
                isLoading={isLoading}
                isEmpty={!data || data.length === 0}
                emptyText="Belum ada data"
                minWidth="500px"
            >
                {data?.map((item) => (
                    <tr key={item._id} className="border-b border-border hover:bg-muted/40 transition-colors">
                        <td className="px-6 py-3.5 text-foreground font-medium">{item.nama}</td>
                        <td className="px-6 py-3.5 text-foreground">{item.urutan}</td>
                        <td className="px-6 py-3.5">
                            {item.isCheckpoint ? (
                                <Badge variant="secondary">Checkpoint</Badge>
                            ) : (
                                <span className="text-muted-foreground text-xs">-</span>
                            )}
                        </td>
                        <td className="px-6 py-3.5 text-right">
                            <div className="flex justify-end items-center gap-1">
                                <DialogTingkatNgaji type="update" initialValues={item} />
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
export default TabelTingkatNgaji;
