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
import { ArrowLeft, Plus, Search, BookOpen, Clock, Tag, User, Trash2, Edit, CheckCircle } from "lucide-react"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { useRouter } from "next/navigation"

interface SavedTask {
  id: string
  title: string
  description: string
  category: string
  estimatedTime: string
  priority: "low" | "medium" | "high"
  usageCount: number
  lastUsed: string
  createdAt: string
}

interface Worker {
  id: string
  name: string
  avatar: string
  status: "active" | "busy" | "break"
}

export function SavedTasks() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showAddSavedTask, setShowAddSavedTask] = useState(false)
  const [showAssignTask, setShowAssignTask] = useState(false)
  const [selectedTask, setSelectedTask] = useState<SavedTask | null>(null)
  const [editingTask, setEditingTask] = useState<SavedTask | null>(null)

  const [newSavedTask, setNewSavedTask] = useState({
    title: "",
    description: "",
    category: "",
    estimatedTime: "",
    priority: "medium" as const,
  })

  const [assignmentData, setAssignmentData] = useState({
    assignedTo: "",
    dueDate: "",
    startTime: "",
    endTime: "",
  })

  const workers: Worker[] = [
    {
      id: "1",
      name: "Maria Santos",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
    },
  ]

  const [savedTasks, setSavedTasks] = useState<SavedTask[]>([
    {
      id: "1",
      title: "Kitchen Deep Cleaning",
      description: "Complete deep cleaning of kitchen including appliances, cabinets, and floors",
      category: "Cleaning",
      estimatedTime: "2 hours",
      priority: "high",
      usageCount: 15,
      lastUsed: "2024-01-20",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      title: "Laundry Service",
      description: "Wash, dry, and fold all household laundry",
      category: "Laundry",
      estimatedTime: "1.5 hours",
      priority: "medium",
      usageCount: 25,
      lastUsed: "2024-01-19",
      createdAt: "2024-01-01",
    },
    {
      id: "3",
      title: "Living Room Organization",
      description: "Organize living room, dust furniture, and vacuum carpets",
      category: "Cleaning",
      estimatedTime: "3 hours",
      priority: "low",
      usageCount: 8,
      lastUsed: "2024-01-18",
      createdAt: "2024-01-05",
    },
    {
      id: "4",
      title: "Grocery Shopping",
      description: "Purchase groceries according to the weekly shopping list",
      category: "Shopping",
      estimatedTime: "2 hours",
      priority: "medium",
      usageCount: 30,
      lastUsed: "2024-01-21",
      createdAt: "2024-01-01",
    },
    {
      id: "5",
      title: "Bathroom Sanitization",
      description: "Deep clean and sanitize all bathrooms including tiles, fixtures, and mirrors",
      category: "Cleaning",
      estimatedTime: "1 hour",
      priority: "high",
      usageCount: 12,
      lastUsed: "2024-01-17",
      createdAt: "2024-01-03",
    },
    {
      id: "6",
      title: "Window Cleaning",
      description: "Clean all windows inside and outside, including frames and sills",
      category: "Cleaning",
      estimatedTime: "2.5 hours",
      priority: "low",
      usageCount: 6,
      lastUsed: "2024-01-15",
      createdAt: "2024-01-10",
    },
  ])

  const categories = ["all", ...Array.from(new Set(savedTasks.map((task) => task.category)))]

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

  const filteredTasks = savedTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || task.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddSavedTask = () => {
    if (newSavedTask.title && newSavedTask.category && newSavedTask.estimatedTime) {
      const newTask: SavedTask = {
        id: Date.now().toString(),
        ...newSavedTask,
        usageCount: 0,
        lastUsed: "",
        createdAt: new Date().toISOString().split("T")[0],
      }
      setSavedTasks([...savedTasks, newTask])
      setNewSavedTask({
        title: "",
        description: "",
        category: "",
        estimatedTime: "",
        priority: "medium",
      })
      setShowAddSavedTask(false)
    }
  }

  const handleAssignTask = () => {
    if (selectedTask && assignmentData.assignedTo && assignmentData.dueDate) {
      // Here you would typically create a new task assignment
      console.log("Assigning task:", {
        task: selectedTask,
        assignment: assignmentData,
      })

      // Update usage count
      setSavedTasks((tasks) =>
        tasks.map((task) =>
          task.id === selectedTask.id
            ? { ...task, usageCount: task.usageCount + 1, lastUsed: new Date().toISOString().split("T")[0] }
            : task,
        ),
      )

      setAssignmentData({
        assignedTo: "",
        dueDate: "",
        startTime: "",
        endTime: "",
      })
      setShowAssignTask(false)
      setSelectedTask(null)
    }
  }

  const handleDeleteTask = (taskId: string) => {
    setSavedTasks((tasks) => tasks.filter((task) => task.id !== taskId))
  }

  const handleEditTask = (task: SavedTask) => {
    setEditingTask(task)
    setNewSavedTask({
      title: task.title,
      description: task.description,
      category: task.category,
      estimatedTime: task.estimatedTime,
      priority: task.priority,
    })
    setShowAddSavedTask(true)
  }

  const handleUpdateTask = () => {
    if (editingTask && newSavedTask.title && newSavedTask.category && newSavedTask.estimatedTime) {
      setSavedTasks((tasks) => tasks.map((task) => (task.id === editingTask.id ? { ...task, ...newSavedTask } : task)))
      setEditingTask(null)
      setNewSavedTask({
        title: "",
        description: "",
        category: "",
        estimatedTime: "",
        priority: "medium",
      })
      setShowAddSavedTask(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-white/50 animate-fade-in-left"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-indigo-600 bg-clip-text text-transparent">
              Saved Tasks
            </h1>
          </div>
        </div>
        <Button
          className="gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg animate-fade-in-right"
          onClick={() => setShowAddSavedTask(true)}
        >
          <Plus className="w-4 h-4" />
          Add Template
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm animate-fade-in-up">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="w-5 h-5 text-purple-500" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Search Tasks</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, description, or category..."
                  className="pl-10 focus:scale-105 transition-transform duration-200"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Saved Tasks List */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            Task Templates ({filteredTasks.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-200 animate-fade-in-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.estimatedTime}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditTask(task)}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:scale-105 transition-transform duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedTask(task)
                      setShowAssignTask(true)
                    }}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 hover:scale-105 transition-transform duration-200"
                  >
                    <User className="w-4 h-4 mr-1" />
                    Assign
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div className="text-center py-12 animate-fade-in-up">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No saved tasks found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || selectedCategory !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Create your first task template to get started"}
              </p>
              {!searchQuery && selectedCategory === "all" && (
                <Button
                  onClick={() => setShowAddSavedTask(true)}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Template
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Saved Task Bottom Sheet */}
      <BottomSheet
        isOpen={showAddSavedTask}
        onClose={() => {
          setShowAddSavedTask(false)
          setEditingTask(null)
          setNewSavedTask({
            title: "",
            description: "",
            category: "",
            estimatedTime: "",
            priority: "medium",
          })
        }}
        title={editingTask ? "Edit Task Template" : "Add Task Template"}
      >
        <div className="px-6 py-4 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                value={newSavedTask.title}
                onChange={(e) => setNewSavedTask({ ...newSavedTask, title: e.target.value })}
                placeholder="e.g., Kitchen cleaning, Laundry service..."
                className="focus:scale-105 transition-transform duration-200"
              />
            </div>

            <div>
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                value={newSavedTask.description}
                onChange={(e) => setNewSavedTask({ ...newSavedTask, description: e.target.value })}
                placeholder="Detailed description of the task..."
                rows={3}
                className="focus:scale-105 transition-transform duration-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="task-category">Category</Label>
                <Input
                  id="task-category"
                  value={newSavedTask.category}
                  onChange={(e) => setNewSavedTask({ ...newSavedTask, category: e.target.value })}
                  placeholder="e.g., Cleaning, Laundry, Shopping..."
                  className="focus:scale-105 transition-transform duration-200"
                />
              </div>

              <div>
                <Label htmlFor="estimated-time">Estimated Time</Label>
                <Input
                  id="estimated-time"
                  value={newSavedTask.estimatedTime}
                  onChange={(e) => setNewSavedTask({ ...newSavedTask, estimatedTime: e.target.value })}
                  placeholder="e.g., 2 hours"
                  className="focus:scale-105 transition-transform duration-200"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="task-priority">Priority</Label>
              <Select
                value={newSavedTask.priority}
                onValueChange={(value: any) => setNewSavedTask({ ...newSavedTask, priority: value })}
              >
                <SelectTrigger className="focus:scale-105 transition-transform duration-200">
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

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowAddSavedTask(false)
                setEditingTask(null)
                setNewSavedTask({
                  title: "",
                  description: "",
                  category: "",
                  estimatedTime: "",
                  priority: "medium",
                })
              }}
              className="flex-1 hover:scale-105 transition-transform duration-200"
            >
              Cancel
            </Button>
            <Button
              onClick={editingTask ? handleUpdateTask : handleAddSavedTask}
              disabled={!newSavedTask.title || !newSavedTask.category || !newSavedTask.estimatedTime}
              className="flex-1 hover:scale-105 transition-transform duration-200 disabled:hover:scale-100"
            >
              {editingTask ? "Update Template" : "Add Template"}
            </Button>
          </div>
        </div>
      </BottomSheet>

      {/* Assign Task Bottom Sheet */}
      <BottomSheet
        isOpen={showAssignTask}
        onClose={() => {
          setShowAssignTask(false)
          setSelectedTask(null)
          setAssignmentData({
            assignedTo: "",
            dueDate: "",
            startTime: "",
            endTime: "",
          })
        }}
        title={`Assign: ${selectedTask?.title}`}
      >
        <div className="px-6 py-4 space-y-6">
          {selectedTask && (
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-1">{selectedTask.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{selectedTask.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedTask.estimatedTime}
                </span>
                <Badge className={getPriorityColor(selectedTask.priority)}>{selectedTask.priority}</Badge>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="assign-worker">Assign to Worker</Label>
              <Select
                value={assignmentData.assignedTo}
                onValueChange={(value) => setAssignmentData({ ...assignmentData, assignedTo: value })}
              >
                <SelectTrigger className="focus:scale-105 transition-transform duration-200">
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
              <Label htmlFor="due-date">Due Date</Label>
              <Input
                id="due-date"
                type="date"
                value={assignmentData.dueDate}
                onChange={(e) => setAssignmentData({ ...assignmentData, dueDate: e.target.value })}
                className="focus:scale-105 transition-transform duration-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={assignmentData.startTime}
                  onChange={(e) => setAssignmentData({ ...assignmentData, startTime: e.target.value })}
                  className="focus:scale-105 transition-transform duration-200"
                />
              </div>

              <div>
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={assignmentData.endTime}
                  onChange={(e) => setAssignmentData({ ...assignmentData, endTime: e.target.value })}
                  className="focus:scale-105 transition-transform duration-200"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowAssignTask(false)
                setSelectedTask(null)
                setAssignmentData({
                  assignedTo: "",
                  dueDate: "",
                  startTime: "",
                  endTime: "",
                })
              }}
              className="flex-1 hover:scale-105 transition-transform duration-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAssignTask}
              disabled={!assignmentData.assignedTo || !assignmentData.dueDate}
              className="flex-1 hover:scale-105 transition-transform duration-200 disabled:hover:scale-100"
            >
              Assign Task
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
