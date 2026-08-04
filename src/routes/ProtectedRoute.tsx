import { useAuthStore } from "@/store/authStore";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";


interface PropTypes {
    children: ReactNode;
}

const ProtectedRoute = (props: PropTypes) => {
    const { children } = props;
    const { token, isTokenValid, logout } = useAuthStore();
    const currentRoute = useLocation().pathname;

    const isAuthenticated = !!token && isTokenValid();

    if (!isAuthenticated && currentRoute !== '/login') {
        if (token) logout();
        return <Navigate to='/login' replace />
    }
    if (isAuthenticated && currentRoute === 'login') {
        return <Navigate to='/dashboard' replace />
    }

    return <>{children}</>
}
export default ProtectedRoute;