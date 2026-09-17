import { LayoutDashboard, Users, type LucideIcon, Archive, DollarSign, Wallet, Banknote, BanknoteArrowUp, CircleFadingArrowUp, FileText, FileWarning } from 'lucide-react';

interface MenuItem {
    type: 'item';
    title: string;
    url: string;
    icon: LucideIcon;
    roles?: ('admin' | 'bendahara')[];
}

interface MenuGroup {
    type: 'group';
    label: string;
    items: { name: string; url: string; icon?: LucideIcon, roles?: ('admin' | 'bendahara')[] }[];
}

export type MenuEntry = MenuItem | MenuGroup;

export const SIDEBAR_MENU: MenuEntry[] = [
    {
        type: 'item',
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        type: 'group',
        label: 'Master Data',
        items: [
            { name: 'Data User', url: '/dashboard/users', icon: Users, roles: ['admin'] },
            { name: 'Santri', url: '/dashboard/santri', icon: Archive, roles: ['admin'] },
        ]
    },
    {
        type: 'group',
        label: 'Keuangan',
        items: [
            { name: 'Kasir', url: '/dashboard/kasir', icon: Wallet, roles: ['admin', 'bendahara'] },
            { name: 'Daftar Tagihan', url: '/dashboard/daftar-tagihan', icon: FileText, roles: ['admin', 'bendahara'] },
            { name: 'Manajemen Tagihan', url: '/dashboard/tagihan', icon: DollarSign, roles: ['admin', 'bendahara'] },
            { name: 'Tunggakan', url: '/dashboard/tunggakan', icon: FileWarning, roles: ['admin', 'bendahara'] },
        ]
    },
    {
        type: 'group',
        label: 'Tabungan',
        items: [
            { name: 'Rekening', url: '/dashboard/rekening', icon: Banknote, roles: ['admin', 'bendahara'] },
            { name: 'Uang Jajan', url: '/dashboard/uang-jajan', icon: BanknoteArrowUp, roles: ['admin', 'bendahara'] },
        ]
    },
    {
        type: 'item',
        title: 'Kenaikan Kelas',
        icon: CircleFadingArrowUp,
        url: '/dashboard/kenaikan-kelas',
        roles: ['admin']
    },
];