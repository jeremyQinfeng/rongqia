"use client"

import { WorkerMenuExecution } from "@/components/menu/worker/menu-execution"
import { WorkerBottomNavigation } from "@/components/ui/worker/bottom-navigation"

export default function WorkerMenuPage() {
  return (
    <div className="pb-20 worker-page">
      <WorkerMenuExecution />
      <WorkerBottomNavigation />
    </div>
  )
}
