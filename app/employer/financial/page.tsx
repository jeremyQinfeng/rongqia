import { EmployerPayrollCenter } from "@/components/financial/employer/payroll-center"
import { BottomNavigation } from "@/components/ui/bottom-navigation"

export default function EmployerFinancialPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <EmployerPayrollCenter />
      <BottomNavigation userType="employer" />
    </div>
  )
}
