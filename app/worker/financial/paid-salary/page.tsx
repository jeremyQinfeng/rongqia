import { PaidSalaryDetail } from "@/components/financial/worker/paid-salary-detail"
import { WorkerBottomNavigation } from "@/components/ui/worker/bottom-navigation"

export default function WorkerPaidSalaryPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PaidSalaryDetail />
      <WorkerBottomNavigation />
    </div>
  )
}
