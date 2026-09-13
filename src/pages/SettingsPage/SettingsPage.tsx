import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DialogKelolaTingkatKelas from "@/components/organisms/Akademik/DialogKelolaTingkatKelas";
import DialogKelolaTingkatNgaji from "@/components/organisms/Akademik/DialogKelolaTingkatNgaji";
import DialogKelolaTahunAjaran from "@/components/organisms/Akademik/DialogKelolaTahunAjaran";
import { GraduationCap, BookOpen, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SettingsPage = () => {
    return (
        <div className="w-full flex flex-col gap-4">
            <Card className="w-full border border-border shadow-xs">
                <CardHeader className="border-b border-border py-4 px-6">
                    <CardTitle className="text-lg font-bold text-foreground">Pengaturan</CardTitle>
                </CardHeader>
                <CardContent className="divide-y divide-border p-0">
                    {/* Row 1: Tingkat Kelas */}
                    <div className="flex items-center justify-between p-5 hover:bg-muted/30 transition-colors gap-4">
                        <div className="flex items-center gap-3.5">
                            <GraduationCap className="h-5 w-5 text-foreground shrink-0" />
                            <div className="flex flex-col gap-0.5">
                                <h3 className="font-semibold text-foreground text-sm sm:text-base">Tingkat Kelas</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">Kelola jenjang & urutan kelas formal</p>
                            </div>
                        </div>
                        <DialogKelolaTingkatKelas
                            trigger={
                                <Button variant="outline" size="sm" className="gap-2 shrink-0">
                                    <span>Kelola</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            }
                        />
                    </div>

                    {/* Row 2: Tingkat Ngaji */}
                    <div className="flex items-center justify-between p-5 hover:bg-muted/30 transition-colors gap-4">
                        <div className="flex items-center gap-3.5">
                            <BookOpen className="h-5 w-5 text-foreground shrink-0" />
                            <div className="flex flex-col gap-0.5">
                                <h3 className="font-semibold text-foreground text-sm sm:text-base">Tingkat Ngaji</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">Kelola jenjang & titik keputusan ngaji</p>
                            </div>
                        </div>
                        <DialogKelolaTingkatNgaji
                            trigger={
                                <Button variant="outline" size="sm" className="gap-2 shrink-0">
                                    <span>Kelola</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            }
                        />
                    </div>

                    {/* Row 3: Tahun Ajaran */}
                    <div className="flex items-center justify-between p-5 hover:bg-muted/30 transition-colors gap-4">
                        <div className="flex items-center gap-3.5">
                            <Calendar className="h-5 w-5 text-foreground shrink-0" />
                            <div className="flex flex-col gap-0.5">
                                <h3 className="font-semibold text-foreground text-sm sm:text-base">Tahun Ajaran</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">Kelola periode tahun ajaran aktif</p>
                            </div>
                        </div>
                        <DialogKelolaTahunAjaran
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
