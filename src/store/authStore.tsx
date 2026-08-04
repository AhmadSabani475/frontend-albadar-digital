import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

interface User {
    _id: string;
    username: string;
    role: 'admin' | 'pengurus';
    is_active: boolean;
    santriId?: any;
}

interface JwtPayload {
    id: string;
    role: string;
    exp: number;
}

interface AuthState {
    token: string | null;
    user: User | null;
    setAuth: (token: string, user: User) => void;
    setToken: (token: string) => void;
    logout: () => void;
    isTokenValid: () => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            setAuth: (token, user) => set({ token, user }),
            setToken: (token) => set({ token }),
            logout: () => set({ token: null, user: null }),
            isTokenValid: () => {
                const token = get().token;
                if (!token) return false;
                try {
                    const decoded = jwtDecode<JwtPayload>(token);
                    return decoded.exp * 1000 > Date.now();
                } catch {
                    return false;
                }
            },
        }),
        { name: 'auth-storage' }
    )
);