import { authService } from '@/services/auth.service';
import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../molecules/FormField';
import { Button } from '../ui/button';
import { Key } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const SetPasswordForm = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSetPassword = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            setError('Password minimal 6 karakter');
            return;
        }
        setIsLoading(true);
        try {
            const result = await authService.setPassword(password);
            useAuthStore.getState().setUser(result.data);
            navigate('/dashboard');
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : (err as { message?: string })?.message ?? 'Gagal menyimpan password';
            setError(message);

        } finally {
            setIsLoading(false);
        }
    };
    return (
        <form onSubmit={handleSetPassword} className="space-y-4">
            <FormField
                label="Password"
                name="password"
                Icon={Key}
                error={error}
                id="password"
                required
                value={password}
                type="password"
                placeholder="akusayangibu"
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
            >
                {isLoading ? 'Menyimpan...' : 'Simpan Password'}
            </Button>
        </form>
    );
};
export default SetPasswordForm;