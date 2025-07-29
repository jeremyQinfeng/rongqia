"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, UtensilsCrossed, ChefHat, Calendar, Plus } from "lucide-react"
import Image from "next/image"
import { CalendarPicker } from "@/components/schedule/worker/calendar-picker"
import { WorkerAddDishForm } from "@/components/menu/worker/add-dish-form"

interface MenuTask {
  id: string
  name: string
  image: string
  meal: "breakfast" | "lunch" | "dinner"
  status: "pending" | "completed"
  assignedBy: string
  assignedAt: Date
  description: string
  date: Date
  isUserAdded?: boolean
}

export function WorkerMenuExecution() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)
  const [showAddDish, setShowAddDish] = useState(false)
  const [menuTasks, setMenuTasks] = useState<MenuTask[]>([
    {
      id: "1",
      name: "干炒牛河",
      image: "/images/dishes/gan-chao-niu-he.webp",
      meal: "lunch",
      assignedBy: "Mrs. Chen",
      assignedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      description: "Classic Cantonese stir-fried rice noodles with beef and vegetables",
      status: "pending",
      date: new Date(),
    },
    {
      id: "2",
      name: "番茄炒蛋",
      image: "/images/dishes/fan-qie-chao-dan.jpeg",
      meal: "lunch",
      assignedBy: "Mrs. Chen",
      assignedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      description: "Simple and delicious tomato scrambled eggs",
      status: "pending",
      date: new Date(),
    },
    {
      id: "3",
      name: "叉烧",
      image: "/images/dishes/cha-shao.jpeg",
      meal: "dinner",
      assignedBy: "Mrs. Chen",
      assignedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      description: "Traditional Cantonese BBQ pork with honey glaze",
      status: "pending",
      date: new Date(),
    },
    // Sample tasks for tomorrow
    {
      id: "4",
      name: "白切鸡",
      image: "/images/dishes/bai-qie-ji.jpeg",
      meal: "dinner",
      assignedBy: "Mrs. Chen",
      assignedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      description: "Traditional Cantonese poached chicken with ginger scallion sauce",
      status: "pending",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
    },
  ])

  const getMealLabel = (meal: string) => {
    switch (meal) {
      case "breakfast":
        return "Breakfast"
      case "lunch":
        return "Lunch"
      case "dinner":
        return "Dinner"
      default:
        return meal
    }
  }

  const getMealColor = (meal: string) => {
    switch (meal) {
      case "breakfast":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "lunch":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "dinner":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `${days} day${days > 1 ? "s" : ""} ago`
    }
  }

  const formatSelectedDate = (date: Date) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today's Menu"
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow's Menu"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday's Menu"
    } else {
      return `Menu for ${date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`
    }
  }

  const handleCompleteTask = (taskId: string) => {
    setMenuTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: "completed" as const }
        }
        return task
      }),
    )
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setShowCalendar(false)
  }

  const handleAddDish = (dishData: any) => {
    const newDish: MenuTask = {
      id: Date.now().toString(),
      name: dishData.name,
      image: dishData.image || "/placeholder.svg?height=100&width=100",
      meal: dishData.meal,
      assignedBy: "Self",
      assignedAt: new Date(),
      description: dishData.description,
      status: "pending",
      date: selectedDate,
      isUserAdded: true,
    }
    setMenuTasks((tasks) => [...tasks, newDish])
    setShowAddDish(false)
  }

  // Filter tasks for selected date
  const tasksForSelectedDate = menuTasks.filter((task) => task.date.toDateString() === selectedDate.toDateString())
  const pendingTasks = tasksForSelectedDate.filter((task) => task.status === "pending")
  const completedTasks = tasksForSelectedDate.filter((task) => task.status === "completed")

  return (
    <div className="p-4 space-y-6">
      {/* Header with buttons */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <ChefHat className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{formatSelectedDate(selectedDate)}</h1>
            </div>
          </div>

          {/* Right corner buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCalendar(true)}
              className="gap-2 hover:bg-blue-50 hover:border-blue-200"
            >
              <Calendar className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={() => setShowAddDish(true)} className="gap-2 bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <UtensilsCrossed className="w-5 h-5 text-yellow-600 mr-1" />
            </div>
            <p className="text-2xl font-bold text-yellow-600">{pendingTasks.length}</p>
            <p className="text-sm text-yellow-600 font-medium">Pending</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-5 h-5 text-green-600 mr-1" />
            </div>
            <p className="text-2xl font-bold text-green-600">{completedTasks.length}</p>
            <p className="text-sm text-green-600 font-medium">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Dishes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5 text-orange-600" />
            Assigned Dishes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Image
                      src={task.image || "/placeholder.svg"}
                      alt={task.name}
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover rounded-lg shadow-md"
                    />
                    {task.isUserAdded && (
                      <div className="absolute -top-1 -left-1 bg-green-500 rounded-full p-1">
                        <Plus className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{task.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      </div>

                      {/* Meal type moved to right corner and highlighted */}
                      <Badge className={`${getMealColor(task.meal)} font-semibold text-sm px-3 py-1 ml-4`}>
                        {getMealLabel(task.meal)}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{task.isUserAdded ? "Added by:" : "Assigned by:"}</span>{" "}
                        {task.assignedBy} • {formatTimeAgo(task.assignedAt)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button onClick={() => handleCompleteTask(task.id)} className="gap-2 bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4" />
                    Complete
                  </Button>
                </div>
              </div>
            ))}

            {pendingTasks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <ChefHat className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-lg font-medium">No dishes assigned for this date</p>
                <p className="text-sm">Your employer will assign dishes or you can add your own</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              Completed Dishes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-3 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg"
                >
                  <div className="relative">
                    <Image
                      src={task.image || "/placeholder.svg"}
                      alt={task.name}
                      width={60}
                      height={60}
                      className="w-15 h-15 object-cover rounded-lg"
                    />
                    <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-green-800">{task.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-green-100 text-green-800">{getMealLabel(task.meal)}</Badge>
                      <span className="text-xs text-green-600">• Completed</span>
                      {task.isUserAdded && <span className="text-xs text-green-600">• Self-added</span>}
                    </div>
                  </div>
                  <div className="text-green-600">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calendar Picker */}
      <CalendarPicker
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />

      {/* Add Dish Form */}
      <WorkerAddDishForm isOpen={showAddDish} onClose={() => setShowAddDish(false)} onAddDish={handleAddDish} />
    </div>
  )
}
