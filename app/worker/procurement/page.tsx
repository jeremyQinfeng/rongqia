import { WorkerProcurementTasks } from "@/components/procurement/worker/procurement-tasks"
import { WorkerBottomNavigation } from "@/components/ui/worker/bottom-navigation"

export default function WorkerProcurementPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 worker-page">
      <WorkerProcurementTasks />
      <WorkerBottomNavigation />
    </div>
  )
}
