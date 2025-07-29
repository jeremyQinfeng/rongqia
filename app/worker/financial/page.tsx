import { WorkerSalaryOverview } from "@/components/financial/worker/salary-overview"
import { WorkerBottomNavigation } from "@/components/ui/worker/bottom-navigation"

export default function WorkerFinancialPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 worker-page">
      <WorkerSalaryOverview />
      <WorkerBottomNavigation />
    </div>
  )
}
