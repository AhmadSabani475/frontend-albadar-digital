import { fetchAPI } from '@/lib/api';
import type { User } from '@/types/Users';

interface CreateUserResponse {
    message: string;
    data: {
        _id: string;
        username: string;
        role: 'admin' | 'bendahara';
        is_active: boolean;
        generatedPassword: string;
    };
}
export const usersService = {
    createUser: (username: string, role: 'admin' | 'bendahara', santriId: string) => {
        return fetchAPI<CreateUserResponse>('/users', {
            method: 'POST',
            body: JSON.stringify({ username, role, santriId }),
        });
    },
    getAllUsers: () => {
        return fetchAPI<{ message: string, data: User[] }>('/users');
    },
    deleteUserById: (id: string) => {
        return fetchAPI<{ message: string, success: boolean }>(
            `/users/${id}`, {
            method: 'DELETE'
        }
        );
    },
    resetPasswordDefault: (id: string) => {
        return fetchAPI<{ message: string, data: User & { generatedPassword: string } }>(`/users/${id}/reset-password-default`, {
            method: 'PUT'
        }
        );
    }
};