import LoginPage from '@/pages/LoginPage';
import { Outlet, type RouteObject } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import CompleteProfile from '@/pages/SetPasswordPage/SetPasswordPage';
import LandingPage from '@/pages/LandingPage/LandingPage';
import DashboardLayout from '@/components/templates/DashboardLayout';
import Dashboard from '@/pages/DashboardPage/Dashboard';
import DataUsersPage from '@/pages/DataUsers/DataUsersPage';

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
import SettingsPage from '@/pages/SettingsPage/SettingsPage';
import KenaikanKelasPage from '@/pages/KenaikanKelasPage/KenaikanKelasPage';
import TunggakanPage from '@/pages/TunggakanPage/TunggakanPage';

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
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                        <DataUsersPage />
                    </ProtectedRoute>
                ),
                handle: {
                    breadcrumb: 'Data User',
                    title: 'Data User',
                    subtitle: 'Kelola data Pengguna',
                },
            },

            {
                path: 'santri',
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                        <Outlet />
                    </ProtectedRoute>
                ),
                handle: {
                    breadcrumb: 'Santri',
                },
                children: [
                    {
                        index: true,
                        element: <SantriPage />,
                        handle: {
                            title: 'Santri',
                            subtitle: 'Kelola data Santri',
                        },
                    },
                    {
                        path: 'add',
                        element: <AddSantriPage />,
                        handle: {
                            breadcrumb: 'Tambah Santri',
                            title: 'Tambah Santri',
                            subtitle: 'Tambahkan data santri baru',
                        },
                    },
                    {
                        path: 'view/:id',
                        element: <ViewSantriPage />,
                        handle: {
                            breadcrumb: 'Detail Santri',
                            title: 'Detail Santri',
                            subtitle: 'Informasi lengkap santri',
                        },
                    },
                    {
                        path: 'edit/:id',
                        element: <EditSantriPage />,
                        handle: {
                            breadcrumb: 'Edit Santri',
                            title: 'Edit Santri',
                            subtitle: 'Perbarui data santri',
                        },
                    },
                ],
            },
            {
                path: 'tagihan',
                element: (
                    <ProtectedRoute allowedRoles={['admin', 'bendahara']}>
                        <TagihanPage />
                    </ProtectedRoute>
                ),
                handle: {
                    breadcrumb: 'Tagihan',
                    title: 'Tagihan',
                    subtitle: 'Kelola data Tagihan',
                },
            },
            {
                path: 'daftar-tagihan',
                element: (
                    <ProtectedRoute allowedRoles={['admin', 'bendahara']}>
                        <Outlet />
                    </ProtectedRoute>
                ),
                handle: {
                    breadcrumb: 'Daftar Tagihan',
                },
                children: [
                    {
                        index: true,
                        element: <DaftarTagihanPage />,
                        handle: {
                            title: 'Daftar Tagihan',
                            subtitle: 'Kelola daftar tagihan santri',
                        },
                    },
                    {
                        path: 'view/:id',
                        element: <DetailTagihanPage />,
                        handle: {
                            breadcrumb: 'Detail Tagihan',
                            title: 'Detail Tagihan',
                            subtitle: 'Rincian tagihan santri',
                        },
                    },
                ],
            },
            {
                path: 'tunggakan',
                element: (
                    <ProtectedRoute allowedRoles={['admin', 'bendahara']}>
                        <TunggakanPage />
                    </ProtectedRoute>
                ),
                handle: {
                    breadcrumb: 'Tunggakan',
                    title: 'Daftar Tunggakan',
                    subtitle: 'Kelola Tunggakan Santri',
                },
            },
            {
                path: 'rekening',
                element: (
                    <ProtectedRoute allowedRoles={['admin', 'bendahara']}>
                        <Outlet />
                    </ProtectedRoute>
                ),
                handle: {
                    breadcrumb: 'Rekening',
                },
                children: [
                    {
                        index: true,
                        element: <RekeningPage />,
                        handle: {
                            title: 'Rekening',
                            subtitle: 'Kelola data Rekening',
                        },
                    },
                    {
                        path: 'view/:id',
                        element: <DetailRekeningPage />,
                        handle: {
                            breadcrumb: 'Detail Rekening',
                            title: 'Detail Rekening',
                            subtitle: 'Rincian data rekening',
                        },
                    },
                ],
            },
            {
                path: 'uang-jajan',
                element: (
                    <ProtectedRoute allowedRoles={['admin', 'bendahara']}>
                        <UangJajanPage />
                    </ProtectedRoute>
                ),
                handle: {
                    breadcrumb: 'Uang Jajan',
                    title: 'Uang Jajan',
                    subtitle: 'Kelola data Uang Jajan',
                },
            },
            {
                path: 'kasir',
                element: (
                    <ProtectedRoute allowedRoles={['admin', 'bendahara']}>
                        <KasirPage />
                    </ProtectedRoute>
                ),
                handle: {
                    breadcrumb: 'Kasir',
                    title: 'Kasir',
                    subtitle: 'Kelola transaksi Kasir',
                },
            },
            {
                path: 'kenaikan-kelas',
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                        <KenaikanKelasPage />
                    </ProtectedRoute>
                ),
                handle: {
                    breadcrumb: 'Kenaikan Kelas',
                    title: 'Kenaikan Kelas',
                    subtitle: 'Kelola Kelas Sekolah & Ngaji',
                },
            },
            {
                path: 'settings',
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                        <SettingsPage />
                    </ProtectedRoute>
                ),
                handle: {
                    breadcrumb: 'Pengaturan',
                    title: 'Pengaturan Master Data',
                    subtitle: 'Kelola acuan tingkat kelas, ngaji, tahun ajaran, asrama & kamar',
                },
            },
            {
                path: 'akademik',
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                        <SettingsPage />
                    </ProtectedRoute>
                ),
                handle: {
                    breadcrumb: 'Pengaturan',
                    title: 'Pengaturan Master Data',
                    subtitle: 'Kelola acuan tingkat kelas, ngaji, tahun ajaran, asrama & kamar',
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