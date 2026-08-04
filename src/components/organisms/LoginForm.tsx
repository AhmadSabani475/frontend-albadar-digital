import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FormField from "../molecules/FormField"
import { Button } from "../ui/button"
import { authService } from "../../services/auth.service"
import { useAuthStore } from "../../store/authStore"
import { ArrowRight, Lock, User } from "lucide-react"

const LoginForm = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const loginRes = await authService.login(username, password);
            useAuthStore.getState().setToken(loginRes.data);

            const meRes = await authService.me();
            useAuthStore.getState().setAuth(loginRes.data, meRes.data);

            navigate("/dashboard");
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
                type="text"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                Icon={User}
                required={true}
            />
            <FormField
                type="password"
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                Icon={Lock}
                required={true}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-900/50">
                {isLoading ? "Loading..." : <>Submit <ArrowRight className="h-4 w-4" /></>}
            </Button>
        </form >
    )
}

export default LoginForm;