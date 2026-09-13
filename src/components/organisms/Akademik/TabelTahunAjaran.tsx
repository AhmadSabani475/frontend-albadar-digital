import ConfirmDeleteButton from "@/components/molecules/ConfirmDeleteButton";
import DialogTahunAjaran from "@/components/molecules/DialogTahunAjaran";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

            <Card className="w-full overflow-hidden border border-border">
                <CardContent className="p-0 overflow-x-auto">
                    <Table className="w-full text-sm min-w-[550px]">
                        <TableHeader className="bg-muted/50 border-b border-border">
                            <TableRow className="hover:bg-transparent border-b border-border">
                                <TableHead className="text-left px-6 py-4 font-semibold text-foreground">Nama</TableHead>
                                <TableHead className="text-left px-6 py-4 font-semibold text-foreground">Tanggal Mulai</TableHead>
                                <TableHead className="text-left px-6 py-4 font-semibold text-foreground">Tanggal Selesai</TableHead>
                                <TableHead className="text-left px-6 py-4 font-semibold text-foreground">Status</TableHead>
                                <TableHead className="text-right px-6 py-4 font-semibold text-foreground">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array.from({ length: 4 }).map((_, i) => (
                                    <TableRow key={i} className="border-b border-border">
                                        <TableCell className="px-6 py-3.5"><Skeleton className="h-5 w-24" /></TableCell>
                                        <TableCell className="px-6 py-3.5"><Skeleton className="h-5 w-28" /></TableCell>
                                        <TableCell className="px-6 py-3.5"><Skeleton className="h-5 w-28" /></TableCell>
                                        <TableCell className="px-6 py-3.5"><Skeleton className="h-5 w-16" /></TableCell>
                                        <TableCell className="px-6 py-3.5 text-right"><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                                    </TableRow>
                                ))
                            ) : !data || data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        Belum ada data tahun ajaran
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((item) => (
                                    <TableRow key={item._id} className="border-b border-border hover:bg-muted/40 transition-colors">
                                        <TableCell className="px-6 py-3.5 text-foreground font-medium">{item.nama}</TableCell>
                                        <TableCell className="px-6 py-3.5 text-foreground">{formatDateDisplay(item.tanggalMulai)}</TableCell>
                                        <TableCell className="px-6 py-3.5 text-foreground">{formatDateDisplay(item.tanggalSelesai)}</TableCell>
                                        <TableCell className="px-6 py-3.5">
                                            {item.is_active ? (
                                                <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-700">Aktif</Badge>
                                            ) : (
                                                <span className="text-muted-foreground text-xs">Non-Aktif</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="px-6 py-3.5 text-right">
                                            <div className="flex justify-end items-center gap-1">
                                                <DialogTahunAjaran type="update" initialValues={item} />
                                                <ConfirmDeleteButton
                                                    trigger={
                                                        <Button variant="ghost" size="icon">
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    }
                                                    title={`Hapus "${item.nama}"?`}
                                                    onConfirm={() => handleDelete(item._id)}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default TabelTahunAjaran;
