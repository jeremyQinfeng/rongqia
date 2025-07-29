import { DeductionsDetail } from "@/components/financial/worker/deductions-detail"
import { WorkerBottomNavigation } from "@/components/ui/worker/bottom-navigation"

export default function WorkerDeductionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DeductionsDetail />
      <WorkerBottomNavigation />
    </div>
  )
}
