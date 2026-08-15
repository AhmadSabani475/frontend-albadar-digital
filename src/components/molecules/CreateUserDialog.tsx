import { Check, Copy, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { FieldGroup } from '../ui/field';
import FormField from './FormField';
import { useEffect, useState, type SubmitEvent } from 'react';
import SelectField from './SelectField';
import { usersService } from '@/services/users.service';
import { santriService } from '@/services/santri.service';
import type { Santri } from '@/types/Santri';
import SearchableSelectField from './SearchableSelectField';

interface PropTypes {
    onSuccess?: () => void;
}
const CreateUserDialog = ({ onSuccess }: PropTypes) => {
    const [username, setUsername] = useState<string>('');
    const [role, setRole] = useState<string>('pengurus');
    const [santriId, setSantriId] = useState('');
    const [santri, setSantri] = useState<Santri[] | undefined>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [createdCredential, setCreatedCredential] = useState<{ username: string; password: string } | null>(null);
    const [copied, setCopied] = useState(false);

    const fetchSantri = async () => {
        try {
            const result = await santriService.getAllSantri();
            return result.data;
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitCreateUser = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const result = await usersService.createUser(username, role as 'admin' | 'pengurus', santriId);
            setCreatedCredential({
                username: result.data.username,
                password: result.data.generatedPassword,
            });
            setUsername('');
            setRole('pengurus');
            setSantriId('');
            setOpen(false);
            onSuccess?.();
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        if (!createdCredential) return;

        const credentialText = `Username: ${createdCredential.username}
Password: ${createdCredential.password}`;

        try {
            await navigator.clipboard.writeText(credentialText);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            console.error('Gagal menyalin credential:', err);
        }
    };

    useEffect(() => {
        (async () => {
            const data = await fetchSantri();
            setSantri(data);
        })();
    }, [santri]);

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger render={<Button
                    className="px-4 py-2 bg-green-400 text-[#ffff]">+ Tambah User</Button>} />
                <DialogContent className="sm:max-w-sm">
                    <form onSubmit={handleSubmitCreateUser}>
                        <DialogHeader className="mb-5">
                            <DialogTitle>Tambah User</DialogTitle>
                        </DialogHeader>
                        <FieldGroup className="mb-4">
                            <FormField type="text" label="Username"
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Masukkan Username"
                                name="username" Icon={User} value={username} required={true} />

                            <SelectField
                                label="Role"
                                name="role"
                                value={role}
                                onChange={setRole}
                                groups={[
                                    {
                                        groupLabel: 'Pilih Role', options: [
                                            { label: 'Admin', value: 'admin' },
                                            { label: 'Pengurus', value: 'pengurus' },
                                        ]
                                    }
                                ]}
                                placeholder="Pilih Role"
                            />
                            <SearchableSelectField
                                label="Santri"
                                name="santriId"
                                value={santriId}
                                onChange={setSantriId}
                                options={(santri ?? []).map((s) => ({
                                    label: s.namaLengkap, // sesuaikan field nama di type Santri
                                    value: s._id,
                                }))}
                                placeholder="Pilih Santri"
                            />
                        </FieldGroup>
                        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                        <DialogFooter>
                            <DialogClose render={<Button variant="outline">Batal</Button>} />
                            <Button type="submit">{isLoading ? 'Loading...' : 'Simpan User'}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>

            </Dialog ><Dialog
                open={!!createdCredential}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        setCreatedCredential(null);
                        setCopied(false);
                    }
                }}
            >
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>User Berhasil Dibuat</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                            Simpan credential berikut. Password ini ditampilkan
                            hanya setelah user berhasil dibuat.
                        </p>

                        <div className="rounded-md border bg-muted/50 p-4 space-y-3">
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                    Username
                                </p>

                                <p className="font-mono text-sm font-medium select-all">
                                    {createdCredential?.username}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                    Password
                                </p>

                                <p className="font-mono text-sm font-medium select-all">
                                    {createdCredential?.password}
                                </p>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={handleCopy}
                        >
                            {copied ? (
                                <>
                                    <Check />
                                    Tersalin!
                                </>
                            ) : (
                                <>
                                    <Copy />
                                    Copy Credential
                                </>
                            )}
                        </Button>
                    </div>

                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button
                                    onClick={() => {
                                        setCreatedCredential(null);
                                        setCopied(false);
                                    }}
                                >
                                    Saya sudah catat
                                </Button>
                            }
                        />
                    </DialogFooter>
                </DialogContent>
            </Dialog></>
    );
};

export default CreateUserDialog;