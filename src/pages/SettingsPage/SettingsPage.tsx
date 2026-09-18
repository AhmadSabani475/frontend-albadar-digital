import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DialogKelolaAsrama from "@/components/organisms/Kamar/DialogKelolaAsrama";
import DialogKelolaKamar from "@/components/organisms/Kamar/DialogKelolaKamar";
import { ArrowRight, Building2, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const SettingsPage = () => {
    return (
        <div className="w-full flex flex-col gap-4">
            <Card className="w-full border border-border shadow-xs">
                <CardHeader className="border-b border-border py-4 px-6">
                    <CardTitle className="text-lg font-bold text-foreground">Pengaturan Asrama &amp; Kamar</CardTitle>
                </CardHeader>
                <CardContent className="divide-y divide-border p-0">
                    {/* Row 1: Asrama */}
                    <div className="flex items-center justify-between p-5 hover:bg-muted/30 transition-colors gap-4">
                        <div className="flex items-center gap-3.5">
                            <Building2 className="h-5 w-5 text-foreground shrink-0" />
                            <div className="flex flex-col gap-0.5">
                                <h3 className="font-semibold text-foreground text-sm sm:text-base">Asrama</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">Kelola data gedung asrama</p>
                            </div>
                        </div>
                        <DialogKelolaAsrama
                            trigger={
                                <Button variant="outline" size="sm" className="gap-2 shrink-0">
                                    <span>Kelola</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            }
                        />
                    </div>

                    {/* Row 2: Kamar */}
                    <div className="flex items-center justify-between p-5 hover:bg-muted/30 transition-colors gap-4">
                        <div className="flex items-center gap-3.5">
                            <DoorOpen className="h-5 w-5 text-foreground shrink-0" />
                            <div className="flex flex-col gap-0.5">
                                <h3 className="font-semibold text-foreground text-sm sm:text-base">Kamar</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">Kelola data kamar &amp; kapasitas per asrama</p>
                            </div>
                        </div>
                        <DialogKelolaKamar
                            trigger={
                                <Button variant="outline" size="sm" className="gap-2 shrink-0">
                                    <span>Kelola</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            }
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SettingsPage;
