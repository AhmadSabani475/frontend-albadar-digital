import DashboardLayout from "@/components/templates/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

const Dashboard = () => {
    const logout = useAuthStore.getState().logout;
    return (
        <DashboardLayout>
            <div className="w-full flex flex-col justify-center items-center">
                <Button onClick={logout}>LogOut</Button>
            </div>
        </DashboardLayout>
    )
}

export default Dashboard;