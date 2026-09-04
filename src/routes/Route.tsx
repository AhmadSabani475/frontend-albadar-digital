import LoginPage from '@/pages/LoginPage';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import CompleteProfile from '@/pages/SetPasswordPage/SetPasswordPage';
import LandingPage from '@/pages/LandingPage/LandingPage';
import DashboardLayout from '@/components/templates/DashboardLayout';
import Dashboard from '@/pages/DashboardPage/Dashboard';
import DataUsersPage from '@/pages/DataUsers/DataUsersPage';
import KamarPage from '@/pages/KamarPage/KamarPage';
import AddSantriPage from '@/pages/SantriPage/AddSantriPage';
import SantriPage from '@/pages/SantriPage/SantriPage';
import ViewSantriPage from '@/pages/SantriPage/ViewSantriPage';
import EditSantriPage from '@/pages/SantriPage/EditSantriPage';
import TagihanPage from '@/pages/TagihanPage/TagihanPage';
import DaftarTagihanPage from '@/pages/DaftarTagihanPage/DaftarTagihanPage';
import DetailTagihanPage from '@/pages/DaftarTagihanPage/DetailTagihanPage';
import RekeningPage from '@/pages/RekeningPage/RekeningPage';
import DetailRekeningPage from '@/pages/RekeningPage/DetailRekeningPage';
import UangJajanPage from '@/pages/UangJajanPage/UangJajanPage';
import KasirPage from '@/pages/KasirPage/KasirPage';

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
            },
            {
                path: '/dashboard/kamar',
                element: <KamarPage />
            },
            {
                path: '/dashboard/santri',
                element: <SantriPage />
            },
            {
                path: '/dashboard/santri/add',
                element: <AddSantriPage />
            },
            {
                path: '/dashboard/santri/view/:id',
                element: <ViewSantriPage />
            },
            {
                path: '/dashboard/santri/edit/:id',
                element: <EditSantriPage />
            },
            {
                path: '/dashboard/tagihan',
                element: <TagihanPage />
            },
            {
                path: '/dashboard/daftar-tagihan',
                element: <DaftarTagihanPage />
            },
            {
                path: '/dashboard/daftar-tagihan/view/:id',
                element: <DetailTagihanPage />
            },
            {
                path: '/dashboard/rekening',
                element: <RekeningPage />
            },
            {
                path: '/dashboard/rekening/view/:id',
                element: <DetailRekeningPage />
            },
            {
                path: '/dashboard/uang-jajan',
                element: <UangJajanPage />
            },
            {
                path: '/dashboard/kasir',
                element: <KasirPage />
            }
        ]
    },
    {
        path: '/complete-profile',
        element: <ProtectedRoute>
            <CompleteProfile />
        </ProtectedRoute>
    }
];
export default routes;