import LoginForm from "@/components/organisms/LoginForm";
import AuthLayout from "@/components/templates/AuthLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
    return (
        <AuthLayout>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>LogIn</CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </AuthLayout>
    )
}

export default LoginPage;