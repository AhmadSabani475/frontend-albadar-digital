import { ShieldCheck, TrendingUp, Users, Wallet } from "lucide-react";

const LandingTentang = () => {
    return (
        <section id="kenapa" className="px-6 py-20 border-t border-border">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                    <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-2">KENAPA PORTAL INI</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                        Dari kertas dan buku besar, ke satu sistem terpadu
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Pencatatan manual rentan hilang, sulit direkap, dan menyita waktu pengurus.
                        Al-Badar Digital Portal menyatukan seluruh proses administrasi —
                        dari pembayaran syahriyah hingga kenaikan kelas — dalam satu sistem
                        yang bisa diakses kapan saja oleh admin dan bendahara.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="border border-border rounded-xl p-5 bg-card text-card-foreground shadow-sm hover:border-primary/40 transition-all">
                        <ShieldCheck className="w-6 h-6 text-primary mb-3" />
                        <p className="font-semibold text-foreground text-sm mb-1">Data Aman</p>
                        <p className="text-xs text-muted-foreground">Terpusat dan terstruktur</p>
                    </div>
                    <div className="border border-border rounded-xl p-5 bg-card text-card-foreground shadow-sm hover:border-primary/40 transition-all">
                        <TrendingUp className="w-6 h-6 text-primary mb-3" />
                        <p className="font-semibold text-foreground text-sm mb-1">Real-time</p>
                        <p className="text-xs text-muted-foreground">Laporan selalu terkini</p>
                    </div>
                    <div className="border border-border rounded-xl p-5 bg-card text-card-foreground shadow-sm hover:border-primary/40 transition-all">
                        <Users className="w-6 h-6 text-primary mb-3" />
                        <p className="font-semibold text-foreground text-sm mb-1">Multi-peran</p>
                        <p className="text-xs text-muted-foreground">Admin & bendahara</p>
                    </div>
                    <div className="border border-border rounded-xl p-5 bg-card text-card-foreground shadow-sm hover:border-primary/40 transition-all">
                        <Wallet className="w-6 h-6 text-primary mb-3" />
                        <p className="font-semibold text-foreground text-sm mb-1">Efisien</p>
                        <p className="text-xs text-muted-foreground">Satu sistem, semua proses</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingTentang;
