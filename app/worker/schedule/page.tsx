import { WorkerSchedule } from "@/components/schedule/worker/worker-schedule"
import { WorkerBottomNavigation } from "@/components/ui/worker/bottom-navigation"

export default function WorkerSchedulePage() {
  return (
    <div className="min-h-screen bg-gray-50 worker-page">
      <WorkerSchedule />
      <WorkerBottomNavigation />
    </div>
  )
}
