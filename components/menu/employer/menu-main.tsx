"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Clock, ChefHat, Users, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface Dish {
  id: string
  name: string
  description: string
  image: string
  cookTime: string
  category: string
  ingredients: string[]
  instructions: string[]
}

interface AssignedDish {
  id: string
  name: string
  description: string
  image: string
  meal: string
  assignedTo: string
  customTime: string
}

export function MenuMain() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(new Date())

  // Get meal time for sorting
  const getMealTime = (meal: string, customTime: string) => {
    if (meal === "breakfast") return "09:00"
    if (meal === "lunch") return "12:00"
    if (meal === "dinner") return "18:00"
    if (meal === "other" && customTime) return customTime
    // For other meals without custom time, place them between lunch and dinner
    return "15:00"
  }

  // Generate week dates
  const getWeekDates = (date: Date) => {
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay())
    
    const weekDates = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      weekDates.push(day)
    }
    return weekDates
  }

  // Chinese day labels
  const dayLabels = ["日", "一", "二", "三", "四", "五", "六"]

  // mock: worker assigned/added dishes
  const assignedDishes: AssignedDish[] = [
    {
      id: "w1",
      name: "番茄炒蛋",
      description: "Worker 自己添加的番茄炒蛋",
      image: "/images/dishes/fan-qie-chao-dan.jpeg",
      meal: "lunch",
      assignedTo: "Maria Santos",
      customTime: "",
    },
    {
      id: "w2",
      name: "白切鸡",
      description: "分配给worker的白切鸡",
      image: "/images/dishes/bai-qie-ji.jpeg",
      meal: "other",
      assignedTo: "Maria Santos",
      customTime: "15:30",
    },
    {
      id: "w3",
      name: "干炒牛河",
      description: "分配给worker的干炒牛河",
      image: "/images/dishes/gan-chao-niu-he.webp",
      meal: "breakfast",
      assignedTo: "Maria Santos",
      customTime: "",
    },
  ]

  const filteredDishes = assignedDishes
    .filter((dish) => {
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
    .sort((a, b) => {
      const timeA = getMealTime(a.meal, a.customTime)
      const timeB = getMealTime(b.meal, b.customTime)
      return timeA.localeCompare(timeB)
    })

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setShowDatePicker(false)
  }

  const handleWeekDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const getMealLabel = (meal: string, customTime: string) => {
    if (meal === "breakfast") return "早餐 (09:00)"
    if (meal === "lunch") return "午餐 (12:00)"
    if (meal === "dinner") return "晚餐 (18:00)"
    if (meal === "other" && customTime) return `其他 (${customTime})`
    return "其他 (15:00)"
  }

  const weekDates = getWeekDates(currentWeek)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-4 pb-20 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-900 to-red-600 bg-clip-text text-transparent">
            Menu Management
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="gap-2 hover:bg-orange-50 hover:border-orange-200"
            onClick={() => router.push("/employer/menu/all-dishes")}
          >
            <ChefHat className="w-4 h-4" />
            Dishes
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assigned dishes..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Date Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="gap-2 hover:bg-orange-50 hover:border-orange-200"
            onClick={() => setShowDatePicker(true)}
          >
            <Calendar className="w-4 h-4" />
            {formatDate(selectedDate)}
          </Button>
        </div>

        {/* Week Calendar */}
        <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newWeek = new Date(currentWeek)
                  newWeek.setDate(currentWeek.getDate() - 7)
                  setCurrentWeek(newWeek)
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium text-gray-600">
                {currentWeek.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newWeek = new Date(currentWeek)
                  newWeek.setDate(currentWeek.getDate() + 7)
                  setCurrentWeek(newWeek)
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Day Labels */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayLabels.map((label, index) => (
                <div key={index} className="text-center text-sm font-medium text-gray-500 py-2">
                  {label}
                </div>
              ))}
            </div>
            
            {/* Date Numbers */}
            <div className="grid grid-cols-7 gap-2">
              {weekDates.map((date, index) => {
                const isSelected = date.toDateString() === selectedDate.toDateString()
                const isToday = date.toDateString() === new Date().toDateString()
                
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-10 w-10 p-0 rounded-full text-sm font-medium transition-all duration-200",
                      isSelected 
                        ? "bg-black text-white hover:bg-gray-800" 
                        : isToday
                        ? "bg-orange-100 text-orange-600 hover:bg-orange-200"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => handleWeekDateSelect(date)}
                  >
                    {date.getDate()}
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Dishes Block */}
      <div className="space-y-4">
        {filteredDishes.length === 0 ? (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assigned dishes</h3>
            <p className="text-gray-500 mb-4">Try assigning dishes from the All Dishes tab</p>
            <Button
              onClick={() => router.push("/employer/menu/all-dishes")}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              <ChefHat className="w-4 h-4 mr-2" />
              Browse All Dishes
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDishes.map((dish) => (
              <Card
                key={dish.id}
                className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group hover:scale-105"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={dish.image || "/placeholder.svg"}
                      alt={dish.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-orange-600 border-0 shadow-lg">
                        {getMealLabel(dish.meal, dish.customTime)}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200">
                          {dish.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{dish.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {dish.assignedTo}
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {getMealLabel(dish.meal, dish.customTime)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
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
    </div>
  )
}
