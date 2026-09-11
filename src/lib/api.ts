import { ENVIRONMENT } from '@/constants/enviroment';
import { useAuthStore } from '@/store/authStore';

let activeBaseUrl: string | null = null;
let checkPromise: Promise<string> | null = null;

const checkLocalhostAvailable = async (): Promise<boolean> => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 800);
        const origin = new URL(ENVIRONMENT.LOCAL_URL).origin;

        const res = await fetch(`${origin}/`, {
            method: 'GET',
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return res.ok;
    } catch {
        return false;
    }
};

export const getBaseUrl = async (): Promise<string> => {
    if (activeBaseUrl) return activeBaseUrl;

    const isLocalhostEnv =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    if (!isLocalhostEnv) {
        activeBaseUrl = ENVIRONMENT.DEPLOY_URL;
        return activeBaseUrl;
    }

    if (!checkPromise) {
        checkPromise = (async () => {
            const isLocalOnline = await checkLocalhostAvailable();
            if (isLocalOnline) {
                console.log(`%c[API] Localhost BE aktif: ${ENVIRONMENT.LOCAL_URL}`, 'color: #22c55e; font-weight: bold;');
                activeBaseUrl = ENVIRONMENT.LOCAL_URL;
            } else {
                console.log(`%c[API] Localhost BE tidak aktif, fallback ke deploy: ${ENVIRONMENT.DEPLOY_URL}`, 'color: #eab308; font-weight: bold;');
                activeBaseUrl = ENVIRONMENT.DEPLOY_URL;
            }
            return activeBaseUrl;
        })();
    }

    return checkPromise;
};

interface fetchOptions extends RequestInit {
    auth?: boolean;
}

export const fetchAPI = async <T = any>(endpoint: string, options: fetchOptions = {}): Promise<T> => {
    const { auth = true, headers, ...rest } = options;
    const finalHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(headers as Record<string, string>)
    };
    if (auth) {
        const token = useAuthStore.getState().token;
        if (token) {
            finalHeaders['Authorization'] = `Bearer ${token}`;
        }
    }

    let baseUrl = await getBaseUrl();
    let response: Response;

    try {
        response = await fetch(`${baseUrl}${endpoint}`, {
            ...rest,
            headers: finalHeaders,
        });
    } catch (error) {
        // Jika sebelumnya mengarah ke localhost dan gagal koneksi, coba fallback ke deploy
        if (baseUrl === ENVIRONMENT.LOCAL_URL) {
            console.warn('[API] Gagal terhubung ke localhost, beralih ke server deploy...');
            activeBaseUrl = ENVIRONMENT.DEPLOY_URL;
            baseUrl = ENVIRONMENT.DEPLOY_URL;
            response = await fetch(`${baseUrl}${endpoint}`, {
                ...rest,
                headers: finalHeaders,
            });
        } else {
            throw error;
        }
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Terjadi kesalahan');
    }

    return data as T;
};