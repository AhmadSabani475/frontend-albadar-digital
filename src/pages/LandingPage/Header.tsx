import ThemeToggle from "@/components/molecules/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-200">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">
                {/* Div Kiri: Brand Logo & Navigation Links dalam 1 Div */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src="/logo_albadar.png"
                            alt="Logo Al-Badar"
                            className="h-9 w-9 object-contain transition-transform duration-200 group-hover:scale-105"
                        />
                        <div className="flex flex-col">
                            <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                                Al-Badar <span className="text-primary font-semibold">Digital</span>
                            </span>
                            <span className="text-[10px] font-light text-muted-foreground -mt-1 tracking-wider uppercase">
                                Portal Pesantren
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <a
                            href="#fitur"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            Fitur Utama
                        </a>
                        <a
                            href="#kenapa"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            Tentang Portal
                        </a>
                    </nav>
                </div>

                {/* Div Kanan: Tombol Login & Toggle Theme */}
                <div className="flex items-center gap-3">
                    <Link to="/login">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 h-9 shadow-sm transition-all gap-2">
                            <LogIn className="w-4 h-4" />
                            <span>Login</span>
                        </Button>
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;
