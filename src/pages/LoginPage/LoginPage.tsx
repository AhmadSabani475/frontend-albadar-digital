import LoginForm from "@/components/organisms/LoginForm";
import AuthLayout from "@/components/templates/AuthLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
    return (
        <AuthLayout>
            <Card className="w-full max-w-sm">
                <CardHeader className="flex flex-col items-center gap-4 pt-8 pb-2">
                    <img src="/logo_albadar.jpg" alt="Logo" className="h-24 w-24 mix-blend-screen" />
                    <div className="text-center">
                        <h1 className="text-xl font-bold">Login Ke Akun Anda</h1>
                        <p className="text-sm text-muted-foreground">
                            Silakan masukkan kredensial Anda untuk melanjutkan
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="w-full px-8 pb-8">
                    <LoginForm />
                </CardContent>
            </Card>
        </AuthLayout>
    )
}

export default LoginPage;