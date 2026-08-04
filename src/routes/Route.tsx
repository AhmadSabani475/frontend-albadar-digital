import LoginPage from "@/pages/LoginPage";
import type { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
    {
        path: '/login',
        element: <LoginPage />
    }
]
export default routes;