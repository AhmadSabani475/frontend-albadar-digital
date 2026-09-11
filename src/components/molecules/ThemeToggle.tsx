import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const isDark =
        theme === 'dark' ||
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full w-9 h-9 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer"
            title={isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
            aria-label="Ubah tema tampilan"
        >
            {isDark ? (
                <Sun className="h-4 w-4 transition-all text-amber-400 rotate-0 scale-100" />
            ) : (
                <Moon className="h-4 w-4 transition-all text-primary rotate-0 scale-100" />
            )}
        </Button>
    );
}

export default ThemeToggle;
