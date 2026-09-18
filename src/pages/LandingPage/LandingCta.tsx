import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingCta = () => {
    return (
        <section className="px-6 py-16 border-t border-border bg-primary/5">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">Siap mulai kelola pesantren lebih mudah?</h2>
                <p className="text-muted-foreground mb-8 text-sm md:text-base">
                    Masuk ke sistem dan kelola akademik, keuangan, dan asrama dari satu tempat.
                </p>
                <Link to="/login">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base font-semibold shadow-md">
                        Masuk ke Sistem
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default LandingCta;
