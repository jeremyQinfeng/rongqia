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
import { Plus, Target, Users, Filter, BookOpen } from "lucide-react"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { useRouter } from "next/navigation"

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
    },
  ]

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

      {/* Filters - Small Block */}
      <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5 text-purple-500" />
            Filter Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Status</Label>
              <Select value={selectedFilter} onValueChange={(value: any) => setSelectedFilter(value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Worker</Label>
              <Select value={selectedWorker} onValueChange={setSelectedWorker}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Workers</SelectItem>
                  {workers.map((worker) => (
                    <SelectItem key={worker.id} value={worker.id}>
                      {worker.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Worker Status Overview - Main Content */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            Worker Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {workers.map((worker) => (
            <div
              key={worker.id}
              className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-200"
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

      {/* Task List - Main Content */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            Task List ({filteredTasks.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500"></div>
                </div>
                <div className="text-right mt-2 md:mt-0 md:ml-4">
                  <p className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500">
                    Time: {task.startTime} - {task.endTime}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

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
