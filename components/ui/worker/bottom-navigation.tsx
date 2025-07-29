"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, Calendar, UtensilsCrossed, ShoppingCart, DollarSign } from "lucide-react"

export function WorkerBottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/worker/dashboard",
      active: pathname === "/worker/dashboard",
    },
    {
      icon: Calendar,
      label: "Schedule",
      path: "/worker/schedule",
      active: pathname === "/worker/schedule",
    },
    {
      icon: UtensilsCrossed,
      label: "Menu",
      path: "/worker/menu",
      active: pathname === "/worker/menu",
    },
    {
      icon: ShoppingCart,
      label: "Procurement",
      path: "/worker/procurement",
      active: pathname === "/worker/procurement",
    },
    {
      icon: DollarSign,
      label: "Financial",
      path: "/worker/financial",
      active: pathname === "/worker/financial",
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
              item.active ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-green-600 hover:bg-green-50"
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
