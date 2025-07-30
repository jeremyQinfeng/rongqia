"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Target, Users, Filter, BookOpen, Calendar, X } from "lucide-react"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  description: string
  assignedTo: string
  assignedToName: string
  assignedToAvatar: string
  priority: "low" | "medium" | "high"
  status: "pending" | "in-progress" | "completed"
  dueDate: string
  estimatedTime: string
  category: string
  startTime: string
  endTime: string
  color: string
}

interface Worker {
  id: string
  name: string
  avatar: string
  status: "active" | "busy" | "break"
  currentTasks: number
}

export function EmployerTaskBoard() {
  const router = useRouter()
  const [showAddTask, setShowAddTask] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all")
  const [selectedWorker, setSelectedWorker] = useState<string>("all")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const start = new Date(today)
    start.setDate(today.getDate() - dayOfWeek)
    return start
  })
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "medium" as const,
    dueDate: "",
    estimatedTime: "",
    category: "",
  })

  const workers: Worker[] = [
    {
      id: "1",
      name: "Maria Santos",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
      currentTasks: 4,
    },
  ]

  const tasks: Task[] = [
    {
      id: "1",
      title: "Kitchen Deep Cleaning",
      description: "Complete deep cleaning of kitchen including appliances, cabinets, and floors",
      assignedTo: "1",
      assignedToName: "Maria Santos",
      assignedToAvatar: "/placeholder.svg?height=40&width=40",
      priority: "high",
      status: "in-progress",
      dueDate: new Date().toISOString().split("T")[0],
      estimatedTime: "2 hours",
      category: "Cleaning",
      startTime: "09:00",
      endTime: "11:00",
      color: "bg-blue-400",
    },
    {
      id: "2",
      title: "Laundry Service",
      description: "Wash, dry, and fold all household laundry",
      assignedTo: "1",
      assignedToName: "Maria Santos",
      assignedToAvatar: "/placeholder.svg?height=40&width=40",
      priority: "medium",
      status: "pending",
      dueDate: new Date().toISOString().split("T")[0],
      estimatedTime: "1.5 hours",
      category: "Laundry",
      startTime: "11:30",
      endTime: "13:00",
      color: "bg-green-400",
    },
    {
      id: "3",
      title: "Living Room Organization",
      description: "Organize living room, dust furniture, and vacuum carpets",
      assignedTo: "1",
      assignedToName: "Maria Santos",
      assignedToAvatar: "/placeholder.svg?height=40&width=40",
      priority: "low",
      status: "pending",
      dueDate: new Date().toISOString().split("T")[0],
      estimatedTime: "3 hours",
      category: "Cleaning",
      startTime: "14:00",
      endTime: "17:00",
      color: "bg-purple-400",
    },
    {
      id: "4",
      title: "Grocery Shopping",
      description: "Purchase groceries according to the weekly shopping list",
      assignedTo: "1",
      assignedToName: "Maria Santos",
      assignedToAvatar: "/placeholder.svg?height=40&width=40",
      priority: "medium",
      status: "pending",
      dueDate: new Date().toISOString().split("T")[0],
      estimatedTime: "2 hours",
      category: "Shopping",
      startTime: "17:00",
      endTime: "19:00",
      color: "bg-orange-400",
    },
  ]

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getWorkerStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "break":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = selectedFilter === "all" || task.status === selectedFilter
    const workerMatch = selectedWorker === "all" || task.assignedTo === selectedWorker
    return statusMatch && workerMatch
  })

  const handleAddTask = () => {
    if (newTask.title && newTask.assignedTo && newTask.dueDate) {
      console.log("Adding task:", newTask)
      setNewTask({
        title: "",
        description: "",
        assignedTo: "",
        priority: "medium",
        dueDate: "",
        estimatedTime: "",
        category: "",
      })
      setShowAddTask(false)
    }
  }

  const getTaskStats = () => {
    const pending = tasks.filter((t) => t.status === "pending").length
    const inProgress = tasks.filter((t) => t.status === "in-progress").length
    const completed = tasks.filter((t) => t.status === "completed").length
    const highPriority = tasks.filter((t) => t.priority === "high").length

    return { pending, inProgress, completed, highPriority }
  }

  const parseTimeToMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number)
    return hours * 60 + minutes
  }

  const getTasksForTimeSlot = (timeSlot: string, date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    const slotMinutes = parseTimeToMinutes(timeSlot)

    return tasks.filter((task) => {
      if (task.dueDate !== dateStr) return false

      const startMinutes = parseTimeToMinutes(task.startTime)
      const endMinutes = parseTimeToMinutes(task.endTime)

      return slotMinutes >= startMinutes && slotMinutes < endMinutes
    })
  }

  const getTaskStartingAtSlot = (timeSlot: string, date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return tasks.find((task) => task.dueDate === dateStr && task.startTime === timeSlot)
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

  const stats = getTaskStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 pb-20 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Task Management
          </h1>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="gap-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 shadow-lg bg-transparent"
            onClick={() => router.push("/employer/schedule/saved-tasks")}
          >
            <BookOpen className="w-4 h-4" />
          </Button>
          <Button
            className="gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg"
            onClick={() => setShowAddTask(true)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Worker Status Overview - Main Content */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            Worker Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Worker Selection */}
          <div className="mb-4">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Filter by Worker</Label>
            <Select value={selectedWorker} onValueChange={setSelectedWorker}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Workers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Workers</SelectItem>
                {workers.map((worker) => (
                  <SelectItem key={worker.id} value={worker.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={worker.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {worker.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {worker.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Worker Cards */}
          {workers.map((worker) => (
            <div
              key={worker.id}
              className={cn(
                "p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-200",
                selectedWorker === "all" || selectedWorker === worker.id ? "opacity-100" : "opacity-50"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                    <AvatarImage src={worker.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                      {worker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{worker.name}</h3>
                    <p className="text-sm text-gray-600">{worker.currentTasks} active tasks</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getWorkerStatusColor(worker.status)}>
                    {worker.status === "active" ? "Active" : worker.status === "busy" ? "Busy" : "On Break"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              Task Schedule ({filteredTasks.length})
            </CardTitle>
            <Button
              variant="outline"
              className="gap-2 hover:bg-purple-50 hover:border-purple-200"
              onClick={() => setShowDatePicker(true)}
            >
              <Calendar className="w-4 h-4" />
              {selectedDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Week View Header */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {weekDays.map((date, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-600 mb-1">{dayNames[index]}</div>
                <button
                  onClick={() => handleDateSelect(date)}
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

          {/* Calendar Grid */}
          <div className="relative">
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
                          <div className="text-xs opacity-90 mt-1">{taskStartingHere.assignedToName}</div>
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
        </CardContent>
      </Card>

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

      {/* Add Task Bottom Sheet */}
      <BottomSheet isOpen={showAddTask} onClose={() => setShowAddTask(false)} title="Add New Task">
        <div className="px-6 py-4 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="e.g., Kitchen cleaning, Laundry service..."
              />
            </div>

            <div>
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Detailed description of the task..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assign-worker">Assign to Worker</Label>
                <Select
                  value={newTask.assignedTo}
                  onValueChange={(value) => setNewTask({ ...newTask, assignedTo: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select worker" />
                  </SelectTrigger>
                  <SelectContent>
                    {workers.map((worker) => (
                      <SelectItem key={worker.id} value={worker.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={worker.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                              {worker.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {worker.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="task-priority">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: any) => setNewTask({ ...newTask, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="due-date">Due Date</Label>
                <Input
                  id="due-date"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="estimated-time">Estimated Time</Label>
                <Input
                  id="estimated-time"
                  value={newTask.estimatedTime}
                  onChange={(e) => setNewTask({ ...newTask, estimatedTime: e.target.value })}
                  placeholder="e.g., 2 hours"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="task-category">Category</Label>
              <Input
                id="task-category"
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                placeholder="e.g., Cleaning, Laundry, Shopping..."
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowAddTask(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleAddTask}
              disabled={!newTask.title || !newTask.assignedTo || !newTask.dueDate}
              className="flex-1"
            >
              Add Task
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
