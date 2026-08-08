export interface User {
    _id: string;
    username: string;
    role: 'admin' | 'pengurus';
    is_active: boolean;
    santriId?: {
        _id: string;
        namaLengkap: string;
    } | null;
    createdAt?: string;
    updatedAt?: string;
}