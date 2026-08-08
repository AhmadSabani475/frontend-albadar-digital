import { fetchAPI } from "@/lib/api"
import type { User } from "@/types/Users";

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
        return fetchAPI<CreateUserResponse>('/users', {
            method: 'POST',
            body: JSON.stringify({ username, role }),
        })
    },
    getAllUsers: () => {
        return fetchAPI<{ message: string, data: User[] }>('/users')
    }
}