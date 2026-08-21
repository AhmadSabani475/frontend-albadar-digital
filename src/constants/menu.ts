import { LayoutDashboard, Users, Bed, type LucideIcon, Archive, DollarSign } from 'lucide-react';

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
            { name: 'Tagihan', url: '/dashboard/tagihan', icon: DollarSign }
        ]
    }
];