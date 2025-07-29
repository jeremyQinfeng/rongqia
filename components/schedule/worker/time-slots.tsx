"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  status: "pending" | "in-progress" | "completed"
  progress: number
  startTime: string // "09:00"
  endTime: string // "11:00"
}

interface TimeSlotsProps {
  tasks: Task[]
  selectedDate: Date
  onTaskAction: (taskId: string, action: "start" | "pause" | "complete") => void
  onAddTask: (timeSlot: string) => void
}

export function TimeSlots({ tasks, selectedDate, onTaskAction, onAddTask }: TimeSlotsProps) {
  // Generate 24 hour time slots
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0")
    return `${hour}:00`
  })

  // Helper function to parse time string to hour number
  const parseTimeToHour = (timeStr: string) => {
    return Number.parseInt(timeStr.split(":")[0])
  }

  // Helper function to parse time string to minutes
  const parseTimeToMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number)
    return hours * 60 + minutes
  }

  // Calculate task duration in hours
  const getTaskDurationInHours = (task: Task) => {
    const startMinutes = parseTimeToMinutes(task.startTime)
    const endMinutes = parseTimeToMinutes(task.endTime)
    return (endMinutes - startMinutes) / 60
  }

  // Check if a task starts in this time slot
  const getTasksStartingInTimeSlot = (timeSlot: string) => {
    return tasks.filter((task) => task.startTime === timeSlot)
  }

  // Check if a time slot is covered by any task (including start and middle)
  const getTasksCoveringTimeSlot = (timeSlot: string) => {
    const slotHour = parseTimeToHour(timeSlot)
    return tasks.filter((task) => {
      const taskStartHour = parseTimeToHour(task.startTime)
      const taskEndHour = parseTimeToHour(task.endTime)
      // Task covers this slot if slot is between start (inclusive) and end (exclusive)
      return slotHour >= taskStartHour && slotHour < taskEndHour
    })
  }

  // Check if this is the first slot of a task
  const isFirstSlotOfTask = (task: Task, timeSlot: string) => {
    return task.startTime === timeSlot
  }

  // Check if this is the last slot of a task
  const isLastSlotOfTask = (task: Task, timeSlot: string) => {
    const slotHour = parseTimeToHour(timeSlot)
    const taskEndHour = parseTimeToHour(task.endTime)
    return slotHour === taskEndHour - 1
  }

  return (
    <div className="px-4 pb-20">
      <div className="relative">
        {/* Time Slots */}
        <div className="space-y-0 relative">
          {timeSlots.map((timeSlot, index) => {
            const tasksStartingInSlot = getTasksStartingInTimeSlot(timeSlot)
            const tasksCoveringSlot = getTasksCoveringTimeSlot(timeSlot)
            const hasCoveringTasks = tasksCoveringSlot.length > 0

            return (
              <div key={timeSlot} className="relative">
                <Card
                  className={cn(
                    "border-l-0 border-r-0 border-b-0 rounded-none shadow-none",
                    hasCoveringTasks ? "bg-blue-50/30 border-blue-100" : "bg-white border-gray-100",
                  )}
                >
                  <CardContent className="p-0">
                    <div className="flex" style={{ minHeight: "80px" }}>
                      {/* Time Label */}
                      <div className="w-16 flex-shrink-0 flex items-start justify-end pr-4 pt-4 bg-gray-50 border-r">
                        <span
                          className={cn("text-sm font-medium", hasCoveringTasks ? "text-blue-600" : "text-gray-500")}
                        >
                          {timeSlot}
                        </span>
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 relative p-4">
                        {tasksStartingInSlot.length > 0 ? (
                          // Show full task details only in the starting slot
                          <div className="space-y-2">
                            {tasksStartingInSlot.map((task, taskIndex) => {
                              const durationHours = getTaskDurationInHours(task)

                              return (
                                <div
                                  key={task.id}
                                  className="rounded-lg border border-blue-200 bg-gradient-to-b from-blue-50 to-white shadow-sm p-3 transition-all duration-200 hover:shadow-md relative z-10"
                                  style={{
                                    marginLeft: `${taskIndex * 8}px`,
                                    marginRight: `${taskIndex * 8}px`,
                                  }}
                                >
                                  <div className="border-l-4 border-blue-500 pl-3 -ml-3 h-full flex flex-col">
                                    <div className="mb-2">
                                      <h3 className="font-medium text-sm text-gray-900 mb-1">{task.title}</h3>
                                      <p className="text-xs text-gray-600 mb-2">{task.description}</p>
                                      <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Clock className="w-3 h-3" />
                                        {task.startTime} - {task.endTime}
                                      </div>
                                    </div>

                                    {/* Duration indicator for tasks longer than 1 hour */}
                                    {durationHours > 1 && (
                                      <div className="mt-auto">
                                        <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full inline-block">
                                          {durationHours}h duration
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        ) : tasksCoveringSlot.length > 0 ? (
                          // Show continuation blocks for covered slots
                          <div className="space-y-2">
                            {tasksCoveringSlot.map((task, taskIndex) => (
                              <div
                                key={task.id}
                                className="rounded-lg bg-gradient-to-r from-blue-100 to-blue-50 border-l-4 border-blue-400 p-3 transition-all duration-200 hover:shadow-sm relative"
                                style={{
                                  marginLeft: `${taskIndex * 8}px`,
                                  marginRight: `${taskIndex * 8}px`,
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-blue-800">{task.title}</span>
                                  </div>
                                  <span className="text-xs text-blue-600">
                                    {isLastSlotOfTask(task, timeSlot) ? "Ending" : "In Progress"}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          // Empty time slot
                          <div className="flex items-center justify-center h-12">
                            <span className="text-xs text-gray-400">No tasks scheduled</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
