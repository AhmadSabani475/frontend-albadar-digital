export const ENVIRONMENT = {
    LOCAL_URL: (import.meta.env.VITE_LOCAL_API_URL as string | undefined) || 'http://localhost:3000/api',
    DEPLOY_URL: (import.meta.env.VITE_API_URL as string | undefined) || 'https://backend-albadar-digital.vercel.app/api',
    APP_URL: (import.meta.env.VITE_API_URL as string | undefined) || 'https://backend-albadar-digital.vercel.app/api',
};