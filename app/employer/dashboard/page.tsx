import { EmployerDashboard } from "@/components/employer/dashboard"
import { EmployerBottomNavigation } from "@/components/ui/employer/bottom-navigation"

export default function EmployerDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <EmployerDashboard />
      <EmployerBottomNavigation />
    </div>
  )
}
