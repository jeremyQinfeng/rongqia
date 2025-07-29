import { WorkerDashboard } from "@/components/worker/dashboard"
import { WorkerBottomNavigation } from "@/components/ui/worker/bottom-navigation"

export default function WorkerDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 worker-page">
      <WorkerDashboard />
      <WorkerBottomNavigation />
    </div>
  )
}
