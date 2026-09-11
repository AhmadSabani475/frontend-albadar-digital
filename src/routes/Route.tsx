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
        ),
        handle: { breadcrumb: 'Dashboard' },
        children: [
            {
                index: true,
                element: <Dashboard />,
                handle: {
                    title: 'Dashboard',
                    subtitle: 'Ringkasan data pesantren',
                },
            },
            {
                path: 'users',
                element: <DataUsersPage />,
                handle: {
                    breadcrumb: 'Data User',
                    title: 'Data User',
                    subtitle: 'Kelola data Pengguna',
                },
            },
            {
                path: 'kamar',
                element: <KamarPage />,
                handle: {
                    breadcrumb: 'Kamar',
                    title: 'Kamar',
                    subtitle: 'Kelola data Kamar',
                },
            },
            {
                path: 'santri',
                element: <SantriPage />,
                handle: {
                    breadcrumb: 'Santri',
                    title: 'Santri',
                    subtitle: 'Kelola data Santri',
                },
            },
            {
                path: 'santri/add',
                element: <AddSantriPage />,
                handle: {
                    breadcrumb: 'Tambah Santri',
                    title: 'Tambah Santri',
                    subtitle: 'Tambahkan data santri baru',
                },
            },
            {
                path: 'santri/view/:id',
                element: <ViewSantriPage />,
                handle: {
                    breadcrumb: 'Detail Santri',
                    title: 'Detail Santri',
                    subtitle: 'Informasi lengkap santri',
                },
            },
            {
                path: 'santri/edit/:id',
                element: <EditSantriPage />,
                handle: {
                    breadcrumb: 'Edit Santri',
                    title: 'Edit Santri',
                    subtitle: 'Perbarui data santri',
                },
            },
            {
                path: 'tagihan',
                element: <TagihanPage />,
                handle: {
                    breadcrumb: 'Tagihan',
                    title: 'Tagihan',
                    subtitle: 'Kelola data Tagihan',
                },
            },
            {
                path: 'daftar-tagihan',
                element: <DaftarTagihanPage />,
                handle: {
                    breadcrumb: 'Daftar Tagihan',
                    title: 'Daftar Tagihan',
                    subtitle: 'Kelola daftar tagihan santri',
                },
            },
            {
                path: 'daftar-tagihan/view/:id',
                element: <DetailTagihanPage />,
                handle: {
                    breadcrumb: 'Detail Tagihan',
                    title: 'Detail Tagihan',
                    subtitle: 'Rincian tagihan santri',
                },
            },
            {
                path: 'rekening',
                element: <RekeningPage />,
                handle: {
                    breadcrumb: 'Rekening',
                    title: 'Rekening',
                    subtitle: 'Kelola data Rekening',
                },
            },
            {
                path: 'rekening/view/:id',
                element: <DetailRekeningPage />,
                handle: {
                    breadcrumb: 'Detail Rekening',
                    title: 'Detail Rekening',
                    subtitle: 'Rincian data rekening',
                },
            },
            {
                path: 'uang-jajan',
                element: <UangJajanPage />,
                handle: {
                    breadcrumb: 'Uang Jajan',
                    title: 'Uang Jajan',
                    subtitle: 'Kelola data Uang Jajan',
                },
            },
            {
                path: 'kasir',
                element: <KasirPage />,
                handle: {
                    breadcrumb: 'Kasir',
                    title: 'Kasir',
                    subtitle: 'Kelola transaksi Kasir',
                },
            },
        ],
    },
    {
        path: '/complete-profile',
        element: <ProtectedRoute>
            <CompleteProfile />
        </ProtectedRoute>
    }
];
export default routes;