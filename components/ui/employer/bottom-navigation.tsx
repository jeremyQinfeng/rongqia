"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, Calendar, UtensilsCrossed, ShoppingCart, DollarSign } from "lucide-react"

export function EmployerBottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/employer/dashboard",
      active: pathname === "/employer/dashboard",
    },
    {
      icon: Calendar,
      label: "Schedule",
      path: "/employer/schedule",
      active: pathname === "/employer/schedule",
    },
    {
      icon: UtensilsCrossed,
      label: "Menu",
      path: "/employer/menu",
      active: pathname === "/employer/menu",
    },
    {
      icon: ShoppingCart,
      label: "Procurement",
      path: "/employer/procurement",
      active: pathname === "/employer/procurement",
    },
    {
      icon: DollarSign,
      label: "Financial",
      path: "/employer/financial",
      active: pathname === "/employer/financial",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              item.active ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
