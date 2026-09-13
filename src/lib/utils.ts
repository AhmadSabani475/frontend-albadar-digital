import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatIDR = (value?: number) => {
  if (value === undefined || value === null) return '-'
  return `Rp ${value.toLocaleString('id-ID')}`
}


export const formatRelativeTime = (date: string) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: id,
  });
};

export const formatPeriodeBulan = (periode?: string): string => {
  if (!periode) return '';
  const parts = periode.split('-');
  if (parts.length === 2 && parts[0].length === 4) {
    const year = parts[0];
    const monthNum = parseInt(parts[1], 10);
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    if (monthNum >= 1 && monthNum <= 12) {
      return `${months[monthNum - 1]} ${year}`;
    }
  }
  return periode;
};

export const getPeriodeKeterangan = (item?: { periode?: string; jatuhTempo?: string | Date }): string | undefined => {
  if (!item) return undefined;
  if (item.periode) {
    return formatPeriodeBulan(item.periode);
  }
  if (item.jatuhTempo) {
    try {
      const d = new Date(item.jatuhTempo);
      if (!isNaN(d.getTime())) {
        const months = [
          'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
          'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        return `${months[d.getMonth()]} ${d.getFullYear()}`;
      }
    } catch {}
  }
  return undefined;
};