import type { UangJajanStatus } from "@/components/organisms/UangJajan/columns";
import { fetchAPI } from "@/lib/api";



export const uangJajanService = {
    getStatusHariIni: () =>
        fetchAPI<{ message: string, data: UangJajanStatus[] }>('/rekening/uang-jajan/hari-ini'),
    bagikanUangJajan: (rekeningIds: string[]) =>
        fetchAPI('/rekening/uang-jajan/bagikan', {
            method: 'POST',
            body: JSON.stringify({ rekeningIds })
        })
}