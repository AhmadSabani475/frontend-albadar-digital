import { ENVIRONMENT } from '@/constants/enviroment';
import { useAuthStore } from '@/store/authStore';

const BASE_URL = ENVIRONMENT.APP_URL;
interface fetchOptions extends RequestInit {
    auth?: boolean;
}

export const fetchAPI = async <T>(endpoint: string, options: fetchOptions = {}): Promise<T> => {
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

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...rest,
        headers: finalHeaders,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Terjadi kesalahan');
    }

    return data as T;
};