import { useAuthStore } from "@/store/authStore";

const Dashboard = () => {
    const { user } = useAuthStore((state) => state);

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="rounded-2xl  p-8 border">
                <h1 className="text-2xl font-bold text-white">
                    Selamat datang, {user?.santriId?.namaLengkap} 👋
                </h1>
                <p className="text-sm text-emerald-200/80 mt-1">
                    {user?.role === "admin" ? "Administrator" : "Pengurus"} — Al-Badar Digital Portal
                </p>
            </div>
        </div>
    )
}

export default Dashboard;