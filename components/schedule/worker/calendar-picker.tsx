"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, X, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarPickerProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

export function CalendarPicker({ isOpen, onClose, selectedDate, onDateSelect }: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1))
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      setIsAnimating(false)
      setTimeout(() => setShouldRender(false), 300)
    }
  }, [isOpen])

  const handleDateSelect = (date: Date) => {
    onDateSelect(date)
    handleClose()
  }

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => onClose(), 300)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!shouldRender) return null

  const today = new Date()
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  // Get first day of the month and how many days in the month
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()

  // Generate calendar days
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(year, month, day))
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  const isSelectedDate = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString()
  }

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out",
        isAnimating ? "bg-black/50 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none",
      )}
      onClick={handleBackdropClick}
    >
      <Card
        className={cn(
          "w-full max-w-md shadow-2xl transition-all duration-300 ease-out transform",
          isAnimating ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4",
        )}
        style={{ marginBottom: "80px" }}
      >
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Calendar className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg font-semibold">Select Date</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevMonth}
              className="h-9 w-9 p-0 hover:bg-blue-50 hover:border-blue-200 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h3 className="text-lg font-semibold text-gray-900">
              {monthNames[month]} {year}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextMonth}
              className="h-9 w-9 p-0 hover:bg-blue-50 hover:border-blue-200 bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-3">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {calendarDays.map((date, index) => (
              <div key={index} className="aspect-square">
                {date ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "w-full h-full text-sm font-medium transition-all duration-200",
                      "hover:bg-blue-50 hover:text-blue-700 hover:scale-105",
                      isSelectedDate(date) && "bg-blue-600 text-white hover:bg-blue-700 shadow-lg scale-105",
                      isToday(date) && !isSelectedDate(date) && "bg-blue-100 text-blue-700 font-bold",
                    )}
                    onClick={() => handleDateSelect(date)}
                  >
                    {date.getDate()}
                  </Button>
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Selected:</span>
              <span className="font-semibold text-blue-600">
                {selectedDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
