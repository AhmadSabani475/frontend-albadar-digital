import { Lock, User } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { FieldGroup } from "../ui/field"
import FormField from "./FormField"
import { useState, type SubmitEvent } from "react"
import SelectField from "./SelectField"
import { usersService } from "@/services/users.service"

const CreateUserDialog = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("pengurus");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmitCreateUser = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await usersService.createUser(username, password, role as 'admin' | 'pengurus');
            setUsername("");
            setPassword("");
            setRole('pengurus');
            setOpen(false);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button variant="outline">+ Tambah User</Button>} />
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmitCreateUser}>
                    <DialogHeader className="mb-5">
                        <DialogTitle>Tambah User</DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <FormField type="text" label="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Masukkan Username"
                            name="username" Icon={User} value={username} required={true} />
                        <FormField type="password" label="Password"
                            placeholder="**********"
                            onChange={(e) => setPassword(e.target.value)}
                            name="username" Icon={Lock} value={password} required={true} />
                        <SelectField
                            label="Role"
                            name="role"
                            value={role}
                            onChange={setRole}
                            groups={[
                                {
                                    groupLabel: "Pilih Role", options: [
                                        { label: "Admin", value: "admin" },
                                        { label: "Pengurus", value: "pengurus" },
                                    ]
                                }
                            ]}
                            placeholder="Pilih Role"
                        />
                    </FieldGroup>
                    {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Batal</Button>} />
                        <Button type="submit">{isLoading ? "Loading..." : "Simpan User"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog >
    )
}

export default CreateUserDialog;