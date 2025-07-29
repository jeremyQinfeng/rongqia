import { TotalSalaryDetail } from "@/components/financial/worker/total-salary-detail"
import { WorkerBottomNavigation } from "@/components/ui/worker/bottom-navigation"

export default function WorkerTotalSalaryPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TotalSalaryDetail />
      <WorkerBottomNavigation />
    </div>
  )
}
