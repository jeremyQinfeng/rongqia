"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface DateHeaderProps {
  selectedDate: Date
  onCalendarClick: () => void
}

export function DateHeader({ selectedDate, onCalendarClick }: DateHeaderProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const getDayOfWeek = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
    })
  }

  return (
    <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 py-4">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{formatShortDate(selectedDate)}</h2>
                  <p className="text-sm text-gray-600">{getDayOfWeek(selectedDate)}</p>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={onCalendarClick}
                className={cn(
                  "bg-white/80 backdrop-blur-sm border-blue-200 hover:bg-blue-50 hover:border-blue-300",
                  "transition-all duration-200 shadow-sm hover:shadow-md",
                  "flex items-center gap-2 px-4 py-2 rounded-xl",
                )}
              >
                <span className="text-sm font-medium text-gray-700">Change Date</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </Button>
            </div>

            <div className="mt-3 pt-3 border-t border-blue-100">
              <p className="text-xs text-gray-500 text-center">{formatDate(selectedDate)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
