import { LayoutDashboard, Users, Bed, type LucideIcon, Archive, DollarSign, Wallet, WalletCards, Banknote } from 'lucide-react';

interface MenuItem {
    type: 'item';
    title: string;
    url: string;
    icon: LucideIcon;
}

interface MenuGroup {
    type: 'group';
    label: string;
    items: { name: string; url: string; icon?: LucideIcon }[];
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
            { name: 'Data User', url: '/dashboard/users', icon: Users },
            { name: 'Kamar & Asrama', url: '/dashboard/kamar', icon: Bed },
            { name: 'Santri', url: '/dashboard/santri', icon: Archive }
        ],
    },
    {
        type: 'group',
        label: 'Keuangan',
        items: [
            { name: 'Kasir', url: '/dashboard/kasir', icon: Wallet },
            { name: 'Daftar Tagihan', url: '/dashboard/daftar-tagihan', icon: WalletCards }
        ]
    },
    {
        type: 'item',
        title: 'Manajemen Tagihan',
        icon: DollarSign,
        url: '/dashboard/tagihan'
    },
    {
        type: 'group',
        label: 'Tabungan',
        items: [
            { name: 'Rekening', url: '/dashboard/rekening', icon: Banknote }
        ]
    }
];