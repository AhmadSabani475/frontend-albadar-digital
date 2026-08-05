import LoginPage from "@/pages/LoginPage";
import type { RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "@/pages/DashboardPage/Dashboard";
import CompleteProfile from "@/pages/CompleteProfile/CompleteProfile";
import LandingPage from "@/pages/LandingPage/LandingPage";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <LandingPage />
    },
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
    },
    {
        path: '/complete-profile',
        element: <ProtectedRoute>
            <CompleteProfile />
        </ProtectedRoute>
    }
]
export default routes;