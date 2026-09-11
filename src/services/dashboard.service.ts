import { fetchAPI } from "@/lib/api"
import type { DashboardSummary } from "@/types/DashboardSummary"

export const dashboardService = {
    getSummary: () =>
        fetchAPI<{ message: string, data: DashboardSummary }>('/dashboard/summary')
}