import { fetchAPI } from "@/lib/api"
import type { Santri } from "@/types/Santri"

export const authService = {
    login: (username: string, password: string) => {
        return fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            auth: false
        })
    },
    me: () => fetchAPI('/auth/me'),
    completeProfile: (password: string, santri: Santri) => {
        return fetchAPI('/auth/complete-profile', {
            method: 'PUT',
            body: JSON.stringify({ password, santri })
        })
    }
}