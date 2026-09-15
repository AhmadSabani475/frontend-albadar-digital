export interface User {
    _id: string;
    username: string;
    role: 'admin' | 'bendahara';
    is_active: boolean;
    santriId?: {
        _id: string;
        namaLengkap: string;
    } | null;
    createdAt?: string;
    updatedAt?: string;
}