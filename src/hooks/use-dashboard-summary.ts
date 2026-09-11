import { dashboardService } from "@/services/dashboard.service"
import { useQuery } from "@tanstack/react-query"


export const useDashboardSummary = () => {
    return useQuery({
        queryKey: ['dashboardSummary'],
        queryFn: () => dashboardService.getSummary(),
        select: (res) => res.data
    })
}