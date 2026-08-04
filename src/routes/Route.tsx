import LoginPage from "@/pages/LoginPage";
import type { RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "@/pages/DashboardPage/Dashboard";

const routes: RouteObject[] = [
    {
        path: '/login',
        element: <ProtectedRoute>
            <LoginPage />
        </ProtectedRoute>
    },
    {
        path: '/dashboard',
        element: <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
]
export default routes;