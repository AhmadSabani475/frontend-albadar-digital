import { useEffect, useState } from 'react';
import { getColumns } from './columns';
import type { User } from '@/types/Users';
import { usersService } from '@/services/users.service';
import DataTable from '../DataTable';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Check, Copy } from 'lucide-react';

const UserTable = () => {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleDelete = async (id: string) => {
        try {
            setIsLoading(true);
            await usersService.deleteUserById(id);
            await fetchUsers();
            toast({
                variant: 'success',
                title: 'User berhasil dihapus',
                description: 'Data user telah dihapus dari sistem.',
            });
        } catch {
            toast({
                variant: 'destructive',
                title: 'Gagal menghapus user',
                description: 'Terjadi kesalahan, coba lagi.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const [resetCredential, setResetCredential] = useState<{ username: string; password: string } | null>(null);
    const [copied, setCopied] = useState(false);

    const handleResetPassword = async (id: string) => {
        try {
            setIsLoading(true);
            const result = await usersService.resetPasswordDefault(id);
            await fetchUsers();
            setResetCredential({
                username: result.data.username,
                password: result.data.generatedPassword,
            });
            toast({
                variant: 'success',
                title: 'Reset Password Berhasil',
                description: 'Password kembali default.',
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Gagal reset password user',
                description: 'Terjadi kesalahan, coba lagi.',
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleCopyCredential = async () => {
        if (!resetCredential) return;
        const text = `Username: ${resetCredential.username}\nPassword: ${resetCredential.password}`;
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Gagal menyalin credential:', err);
        }
    };

    const fetchUsers = () => {
        setIsLoading(true);
        usersService.getAllUsers()
            .then((res) => setData(res.data))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = getColumns({ onDelete: handleDelete, onReset: handleResetPassword });

    return (
        <div>
            <DataTable
                data={data}
                columns={columns}
                isLoading={isLoading}
                searchPlaceholder="Cari user..."
                emptyMessage="Belum ada data user" />

            <Dialog
                open={!!resetCredential}
                onOpenChange={(isOpen: boolean) => {
                    if (!isOpen) {
                        setResetCredential(null);
                        setCopied(false);
                    }
                }}
            >
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Password Berhasil Direset</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                            Simpan credential berikut. Password ini ditampilkan
                            hanya sekali setelah reset.
                        </p>

                        <div className="rounded-md border bg-muted/50 p-4 space-y-3">
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Username</p>
                                <p className="font-mono text-sm font-medium select-all">
                                    {resetCredential?.username}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Password Baru</p>
                                <p className="font-mono text-sm font-medium select-all">
                                    {resetCredential?.password}
                                </p>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={handleCopyCredential}
                        >
                            {copied ? (
                                <><Check /> Tersalin!</>
                            ) : (
                                <><Copy /> Copy Credential</>
                            )}
                        </Button>
                    </div>

                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button
                                    onClick={() => {
                                        setResetCredential(null);
                                        setCopied(false);
                                    }}
                                >
                                    Saya sudah catat
                                </Button>
                            }
                        />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );

};

export default UserTable;
