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