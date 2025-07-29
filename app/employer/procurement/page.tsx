import { EmployerProcurementManagement } from "@/components/procurement/employer/procurement-management"
import { EmployerBottomNavigation } from "@/components/ui/employer/bottom-navigation"

export default function EmployerProcurementPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <EmployerProcurementManagement />
      <EmployerBottomNavigation />
    </div>
  )
}
