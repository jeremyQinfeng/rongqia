"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { EmployerBottomNavigation } from "@/components/ui/employer/bottom-navigation"
import { WorkerBottomNavigation } from "@/components/ui/worker/bottom-navigation"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isEmployerRoute = pathname.startsWith("/employer")
  const isWorkerRoute = pathname.startsWith("/worker")
  const isHomePage = pathname === "/"

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-16">{children}</main>

      {isEmployerRoute && <EmployerBottomNavigation />}
      {isWorkerRoute && <WorkerBottomNavigation />}
    </div>
  )
}
