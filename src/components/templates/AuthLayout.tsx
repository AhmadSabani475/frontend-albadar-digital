import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-black bg-[radial-gradient(ellipse_at_top,_rgba(16,120,80,0.25),_transparent_60%)]">
            <div className="flex-1 flex items-center justify-center p-4">
                {children}
            </div>
            <footer className="text-xs text-muted-foreground flex justify-between px-6 py-4">
                <span>Al-Badar Digital. All rights reserved.</span>
                <div className="flex gap-4">
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                    <span>Support</span>
                </div>
            </footer>
        </div>
    );
}