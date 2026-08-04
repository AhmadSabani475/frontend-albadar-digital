import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FormField from "../molecules/FormField"
import { Button } from "../ui/button"
import { authService } from "../../services/auth.service"
import { useAuthStore } from "../../store/authStore"

const LoginForm = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
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
        <form onSubmit={handleSubmit}>
            <FormField
                type="text"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <FormField
                type="password"
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Submit"}
            </Button>
        </form>
    )
}

export default LoginForm;