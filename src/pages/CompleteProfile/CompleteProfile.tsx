
import CompleteProfileForm from "@/components/organisms/CompleteProfileForm"
import AuthLayout from "@/components/templates/AuthLayout"
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const CompleteProfile = () => {
    return (
        <AuthLayout >
            <Card className="w-full max-w-4xl mx-auto gap-5">
                <CardHeader className="flex flex-col  items-center gap-4">
                    <img src="/logo_albadar.jpg" alt="Logo" className="h-24 w-24 mix-blend-screen" />
                    <div className="text-center">
                        <h1 className="text-xl font-bold text-green-400">Complete Profile</h1>
                        <p className="text-sm text-muted-foreground">
                            Lengkapi diri anda dan ubah password
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                    <CompleteProfileForm />
                </CardContent>
            </Card>

        </AuthLayout>
    )
}
export default CompleteProfile;