import { EmployerTaskBoard } from "@/components/schedule/employer/task-board"
import { EmployerBottomNavigation } from "@/components/ui/employer/bottom-navigation"

export default function EmployerSchedulePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <EmployerTaskBoard />
      <EmployerBottomNavigation />
    </div>
  )
}
