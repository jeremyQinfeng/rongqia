import { LoansDetail } from "@/components/financial/worker/loans-detail"
import { WorkerBottomNavigation } from "@/components/ui/worker/bottom-navigation"

export default function WorkerLoansPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <LoansDetail />
      <WorkerBottomNavigation />
    </div>
  )
}
