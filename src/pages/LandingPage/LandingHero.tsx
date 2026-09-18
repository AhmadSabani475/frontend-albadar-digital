import { Link } from "react-router-dom";
import { Sparkles, Check, LayoutDashboard, Wallet, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const checklistItems = [
    "Kelola tagihan dan pembayaran otomatis",
    "Pantau akademik dan kenaikan kelas santri",
    "Laporan keuangan yang selalu real-time",
];

const LandingHero = () => {
    return (
        <section className="px-6 py-20 md:py-28">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Kiri: teks */}
                <div>
                    <div className="inline-flex items-center rounded-full border border-border bg-muted/40 px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground mb-6">
                        SISTEM MANAJEMEN PESANTREN
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-foreground">
                        Kelola pesantren dengan{" "}
                        <span className="text-primary">satu portal terpadu</span>
                    </h1>

                    <ul className="space-y-3 mb-8">
                        {checklistItems.map((item) => (
                            <li key={item} className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                                </span>
                                <span className="text-muted-foreground">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <Link to="/login">
                        <Button
                            size="lg"
                            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 h-12 text-base font-semibold shadow-md"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Masuk ke Sistem
                        </Button>
                    </Link>
                </div>

                {/* Kanan: visual mockup */}
                <div className="relative">
                    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
                        {/* browser chrome bar */}
                        <div className="flex items-center gap-1.5 px-4 py-3 bg-muted/40 border-b border-border">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                        </div>

                        {/* isi mockup */}
                        <div className="p-6 bg-gradient-to-br from-muted/20 to-background min-h-72 flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                                <div className="col-span-2 rounded-xl border border-border bg-card/80 p-4">
                                    <LayoutDashboard className="w-5 h-5 text-primary mb-2" />
                                    <div className="h-2 w-3/4 rounded bg-muted-foreground/20 mb-1.5" />
                                    <div className="h-2 w-1/2 rounded bg-muted-foreground/10" />
                                </div>
                                <div className="rounded-xl border border-border bg-card/80 p-4">
                                    <Wallet className="w-5 h-5 text-primary mb-2" />
                                    <div className="h-2 w-full rounded bg-muted-foreground/20" />
                                </div>
                                <div className="rounded-xl border border-border bg-card/80 p-4">
                                    <GraduationCap className="w-5 h-5 text-primary mb-2" />
                                    <div className="h-2 w-full rounded bg-muted-foreground/20" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* floating card */}
                    <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-card text-card-foreground border border-border rounded-xl shadow-lg px-4 py-3 max-w-[280px]">
                        <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold leading-tight text-foreground">Kenaikan Kelas</p>
                            <p className="text-xs text-muted-foreground">Otomatis tiap tahun ajaran</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingHero;