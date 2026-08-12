import { fetchAPI } from "@/lib/api"
import type { CreateSantriPayload } from "@/types/Santri"

export const authService = {
    login: (username: string, password: string) => {
        return fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            auth: false
        })
    },
    me: () => fetchAPI('/auth/me'),
    completeProfile: (password: string, santri: CreateSantriPayload) => {
        return fetchAPI('/auth/complete-profile', {
            method: 'PUT',
            body: JSON.stringify({ password, santri })
        })
    }
}