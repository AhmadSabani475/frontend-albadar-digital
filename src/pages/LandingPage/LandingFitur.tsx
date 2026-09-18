import {
    GraduationCap,
    Wallet,
    Home,
    Wallet2,
    Users,
    TrendingUp,
} from "lucide-react";

const fitur = [
    {
        icon: Wallet,
        title: "Kasir & Pembayaran",
        desc: "Proses pembayaran tagihan dan setoran rekening dalam satu transaksi, lengkap dengan struk digital.",
    },
    {
        icon: Wallet2,
        title: "Manajemen Tagihan",
        desc: "Generate tagihan massal, tarif khusus per santri, dan pantau status pembayaran real-time.",
    },
    {
        icon: Home,
        title: "Tabungan Santri",
        desc: "Kelola uang jajan harian dan tabungan ziarah dengan pencatatan mutasi yang rapi.",
    },
    {
        icon: GraduationCap,
        title: "Akademik",
        desc: "Kelola kelas formal dan kelas ngaji, lengkap dengan kenaikan tingkat otomatis tiap tahun ajaran.",
    },
    {
        icon: Users,
        title: "Data Santri & Asrama",
        desc: "Data lengkap santri, penempatan kamar, dan asrama terorganisir dalam satu portal.",
    },
    {
        icon: TrendingUp,
        title: "Laporan & Dashboard",
        desc: "Pantau pemasukan, tunggakan, dan rekap keuangan harian dalam tampilan yang mudah dibaca.",
    },
];

const LandingFitur = () => {
    return (
        <section id="fitur" className="px-6 py-20 border-t border-border bg-muted/20">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-2">FITUR UTAMA</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Semua yang dibutuhkan, dalam satu portal</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {fitur.map(({ icon: Icon, title, desc }) => (
                        <div
                            key={title}
                            className="border border-border rounded-xl p-6 bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-primary/40 transition-all"
                        >
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <p className="font-semibold text-foreground mb-2">{title}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LandingFitur;
