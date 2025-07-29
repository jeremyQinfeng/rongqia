"use client"

import { Home, Calendar, UtensilsCrossed, ShoppingCart, DollarSign, CheckSquare, Clock } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface BottomNavigationProps {
  userType: "employer" | "worker"
}

export function BottomNavigation({ userType }: BottomNavigationProps) {
  const pathname = usePathname()

  const employerNavItems = [
    { href: "/employer/dashboard", icon: Home, label: "首页" },
    { href: "/employer/schedule", icon: Calendar, label: "任务" },
    { href: "/employer/menu", icon: UtensilsCrossed, label: "菜单" },
    { href: "/employer/procurement", icon: ShoppingCart, label: "采购" },
    { href: "/employer/financial", icon: DollarSign, label: "工资" },
  ]

  const workerNavItems = [
    { href: "/worker/dashboard", icon: Home, label: "首页" },
    { href: "/worker/tasks", icon: CheckSquare, label: "待办" },
    { href: "/worker/menu", icon: UtensilsCrossed, label: "菜单" },
    { href: "/worker/schedule", icon: Clock, label: "时间" },
  ]

  const navItems = userType === "employer" ? employerNavItems : workerNavItems

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200",
                isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50",
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "scale-110")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
