import LoginPage from "@/pages/LoginPage";
import type { RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import CompleteProfile from "@/pages/CompleteProfile/CompleteProfile";
import LandingPage from "@/pages/LandingPage/LandingPage";
import DashboardLayout from "@/components/templates/DashboardLayout";
import Dashboard from "@/pages/DashboardPage/Dashboard";
import DataUsersPage from "@/pages/DataUsers/DataUsersPage";

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
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ), children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/dashboard/users',
                element: <DataUsersPage />
            }
        ]
    },
    {
        path: '/complete-profile',
        element: <ProtectedRoute>
            <CompleteProfile />
        </ProtectedRoute>
    }
]
export default routes;