import { WorkerTaskCalendar } from "@/components/schedule/worker/task-calendar"
import { WorkerBottomNavigation } from "@/components/ui/worker/bottom-navigation"

export default function WorkerTasksPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <WorkerTaskCalendar />
      <WorkerBottomNavigation />
    </div>
  )
}
