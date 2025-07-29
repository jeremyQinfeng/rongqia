"use client"

import { useState } from "react"
import { Plus, X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  description: string
  startTime: string // "09:00"
  endTime: string // "11:00"
  date: string // YYYY-MM-DD format
  color: string // Task color
}

export function WorkerSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const start = new Date(today)
    start.setDate(today.getDate() - dayOfWeek)
    return start
  })
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const [isAddTaskAnimating, setIsAddTaskAnimating] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
  })

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Kitchen Deep Cleaning",
      description: "Complete deep cleaning of kitchen including appliances, cabinets, and floors",
      startTime: "09:00",
      endTime: "11:00",
      date: new Date().toISOString().split("T")[0],
      color: "bg-blue-400",
    },
    {
      id: "2",
      title: "Laundry Service",
      description: "Wash, dry, and fold all household laundry",
      startTime: "11:30",
      endTime: "13:00",
      date: new Date().toISOString().split("T")[0],
      color: "bg-green-400",
    },
    {
      id: "3",
      title: "Living Room Organization",
      description: "Organize living room, dust furniture, and vacuum carpets",
      startTime: "14:00",
      endTime: "17:00",
      date: new Date().toISOString().split("T")[0],
      color: "bg-purple-400",
    },
    {
      id: "4",
      title: "Grocery Shopping",
      description: "Purchase groceries according to the weekly shopping list",
      startTime: "17:00",
      endTime: "19:00",
      date: new Date().toISOString().split("T")[0],
      color: "bg-orange-400",
    },
  ])

  // Generate time slots every 30 minutes from 00:00 to 23:30
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2)
      .toString()
      .padStart(2, "0")
    const minute = (i % 2) * 30
    const minuteStr = minute.toString().padStart(2, "0")
    return `${hour}:${minuteStr}`
  })

  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentWeekStart)
    date.setDate(currentWeekStart.getDate() + i)
    return date
  })

  const dayNames = ["日", "一", "二", "三", "四", "五", "六"]

  const formatDate = (date: Date) => {
    const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    return `${date.getFullYear()}年${monthNames[date.getMonth()]}${date.getDate()}日 週${dayNames[date.getDay()]}`
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString()
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    // Update week view to include selected date
    const dayOfWeek = date.getDay()
    const weekStart = new Date(date)
    weekStart.setDate(date.getDate() - dayOfWeek)
    setCurrentWeekStart(weekStart)
    setShowDatePicker(false)
  }

  const handleAddTaskClick = () => {
    setIsAddTaskAnimating(true)
    setTimeout(() => {
      setShowAddTask(true)
    }, 150)
  }

  const handleCloseAddTask = () => {
    setIsAddTaskAnimating(false)
    setShowAddTask(false)
    setNewTask({
      title: "",
      description: "",
      startTime: "",
      endTime: "",
    })
  }

  const handleAddTask = () => {
    if (newTask.startTime && newTask.endTime) {
      const colors = ["bg-blue-400", "bg-green-400", "bg-purple-400", "bg-orange-400", "bg-pink-400", "bg-indigo-400"]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]

      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title || "New Task",
        description: newTask.description,
        startTime: newTask.startTime,
        endTime: newTask.endTime,
        date: selectedDate.toISOString().split("T")[0],
        color: randomColor,
      }

      setTasks([...tasks, task])
      handleCloseAddTask()
    }
  }

  const parseTimeToMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number)
    return hours * 60 + minutes
  }

  const getTasksForTimeSlot = (timeSlot: string, date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    const slotMinutes = parseTimeToMinutes(timeSlot)

    return tasks.filter((task) => {
      if (task.date !== dateStr) return false

      const startMinutes = parseTimeToMinutes(task.startTime)
      const endMinutes = parseTimeToMinutes(task.endTime)

      return slotMinutes >= startMinutes && slotMinutes < endMinutes
    })
  }

  const getTaskStartingAtSlot = (timeSlot: string, date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return tasks.find((task) => task.date === dateStr && task.startTime === timeSlot)
  }

  const getTaskHeight = (task: Task) => {
    const startMinutes = parseTimeToMinutes(task.startTime)
    const endMinutes = parseTimeToMinutes(task.endTime)
    const durationMinutes = endMinutes - startMinutes
    // Each 30-minute slot is 32px high, so calculate proportionally
    return (durationMinutes / 30) * 32
  }

  // Check if this is an hour slot (00:00, 01:00, etc.) for styling
  const isHourSlot = (timeSlot: string) => {
    return timeSlot.endsWith(":00")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          {/* Top row with buttons and date */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDatePicker(true)}
              className="flex items-center gap-2 text-red-500"
            >
              <Calendar className="w-5 h-5" />
            </Button>

            {/* Date display in the center */}
            <div className="flex-1 text-center">
              <p className="text-lg font-medium text-gray-900">{formatDate(selectedDate)}</p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-red-500 transition-transform duration-150",
                isAddTaskAnimating && "scale-110 rotate-45",
              )}
              onClick={handleAddTaskClick}
            >
              <Plus className="w-6 h-6" />
            </Button>
          </div>

          {/* Week View */}
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((date, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-600 mb-1">{dayNames[index]}</div>
                <button
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    "w-8 h-8 rounded-full text-sm font-medium transition-colors",
                    isSelected(date)
                      ? "bg-black text-white"
                      : isToday(date)
                        ? "text-red-500 underline"
                        : "text-gray-900 hover:bg-gray-100",
                  )}
                >
                  {date.getDate()}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Content */}
      <div className="relative pb-20">
        {/* Time Column and Schedule Area */}
        <div className="flex">
          <div className="w-16 bg-white border-r border-gray-200 relative">
            {/* Time labels positioned at the edges */}
            {timeSlots.map((timeSlot, index) => (
              <div key={timeSlot} className="relative">
                <div
                  className={cn("h-8", isHourSlot(timeSlot) ? "border-b border-gray-200" : "border-b border-gray-100")}
                />
                {isHourSlot(timeSlot) && (
                  <div className="absolute -top-2 right-2 text-xs text-gray-500 font-medium bg-white px-1">
                    {timeSlot}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Schedule Area */}
          <div className="flex-1 relative">
            {timeSlots.map((timeSlot, index) => {
              const tasksInSlot = getTasksForTimeSlot(timeSlot, selectedDate)
              const taskStartingHere = getTaskStartingAtSlot(timeSlot, selectedDate)

              return (
                <div
                  key={timeSlot}
                  className={cn(
                    "h-8 relative",
                    isHourSlot(timeSlot) ? "border-b border-gray-200" : "border-b border-gray-100",
                  )}
                >
                  {taskStartingHere && (
                    <div
                      className={cn(
                        "absolute left-2 right-2 rounded-lg p-2 text-white text-sm font-medium shadow-sm z-10",
                        taskStartingHere.color,
                      )}
                      style={{
                        height: `${getTaskHeight(taskStartingHere)}px`,
                      }}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <span className="text-xs opacity-90">
                          {taskStartingHere.startTime} - {taskStartingHere.endTime}
                        </span>
                      </div>
                      <div className="font-medium text-xs leading-tight">{taskStartingHere.title}</div>
                    </div>
                  )}

                  {tasksInSlot.length > 0 && !taskStartingHere && (
                    <div className="absolute left-2 right-2 top-0 bottom-0">
                      {tasksInSlot.map((task) => (
                        <div
                          key={task.id}
                          className={cn("absolute left-0 right-0 opacity-60 rounded", task.color)}
                          style={{ height: "100%" }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Select Date</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowDatePicker(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Input
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => handleDateSelect(new Date(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className={cn(
              "bg-white rounded-lg p-6 w-full max-w-md transition-all duration-300",
              showAddTask ? "scale-100 opacity-100" : "scale-95 opacity-0",
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Add New Task</h3>
              <Button variant="ghost" size="sm" onClick={handleCloseAddTask}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="task-title">Task Name (Optional)</Label>
                <Input
                  id="task-title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task name (default: New Task)"
                />
              </div>

              <div>
                <Label htmlFor="task-description">Description (Optional)</Label>
                <Textarea
                  id="task-description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Enter task description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-time">Start Time *</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={newTask.startTime}
                    onChange={(e) => setNewTask({ ...newTask, startTime: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end-time">End Time *</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={newTask.endTime}
                    onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <Calendar className="w-4 h-4" />
                  <span>Date: {selectedDate.toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={handleCloseAddTask} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleAddTask} disabled={!newTask.startTime || !newTask.endTime} className="flex-1">
                Add Task
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
