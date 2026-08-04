import { fetchAPI } from "@/lib/api"

export const authService = {
    login: (username: string, password: string) => {
        return fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            auth: false
        })
    },
    me: () => fetchAPI('/auth/me')
}