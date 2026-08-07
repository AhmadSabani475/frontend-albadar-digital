import { fetchAPI } from "@/lib/api"

interface CreateUserResponse {
    message: string;
    data: {
        _id: string;
        username: string;
        role: 'admin' | 'pengurus';
        is_active: boolean;
        generatedPassword: string;
    };
}
export const usersService = {
    createUser: (username: string, role: 'admin' | 'pengurus') => {
        return fetchAPI<CreateUserResponse>('/auth', {
            method: 'POST',
            body: JSON.stringify({ username, role }),
        })
    }
}