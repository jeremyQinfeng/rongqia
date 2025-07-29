"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, ChefHat, Clock, Users, TrendingUp } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MenuItem {
  id: string
  name: string
  image: string
  category: "breakfast" | "lunch" | "dinner"
  cookTime: string
  difficulty: "easy" | "medium" | "hard"
  cost: number
  popularity: number
}

export function EmployerMenuManagement() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedMeal, setSelectedMeal] = useState<"breakfast" | "lunch" | "dinner">("lunch")

  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Braised Pork Belly",
      image: "/placeholder.svg?height=120&width=120",
      category: "lunch",
      cookTime: "45分钟",
      difficulty: "medium",
      cost: 25,
      popularity: 85,
    },
    {
      id: "2",
      name: "Steamed Fish",
      image: "/placeholder.svg?height=120&width=120",
      category: "dinner",
      cookTime: "30分钟",
      difficulty: "easy",
      cost: 30,
      popularity: 92,
    },
    {
      id: "3",
      name: "Stir-fried Vegetables with Egg",
      image: "/placeholder.svg?height=120&width=120",
      category: "lunch",
      cookTime: "15分钟",
      difficulty: "easy",
      cost: 8,
      popularity: 78,
    },
    {
      id: "4",
      name: "Congee with Pickles",
      image: "/placeholder.svg?height=120&width=120",
      category: "breakfast",
      cookTime: "20分钟",
      difficulty: "easy",
      cost: 5,
      popularity: 65,
    },
  ]

  const todayMenu = {
    breakfast: [{ name: "Congee with Pickles", status: "completed" }],
    lunch: [
      { name: "Braised Pork Belly", status: "in-progress" },
      { name: "Stir-fried Vegetables with Egg", status: "pending" },
      { name: "Rice", status: "pending" },
    ],
    dinner: [
      { name: "Steamed Fish", status: "pending" },
      { name: "Soup Noodles", status: "pending" },
    ],
  }

  const getDifficultyColor = (difficulty: MenuItem["difficulty"]) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
    }
  }

  const getMealLabel = (meal: string) => {
    switch (meal) {
      case "breakfast":
        return "早餐"
      case "lunch":
        return "午餐"
      case "dinner":
        return "晚餐"
      default:
        return meal
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalDailyCost = Object.values(todayMenu)
    .flat()
    .reduce((sum, item) => {
      const menuItem = menuItems.find((m) => m.name === item.name)
      return sum + (menuItem?.cost || 0)
    }, 0)

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Management Center</h1>
          <p className="text-gray-600">Manage daily menus and recipe library</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Recipe
        </Button>
      </div>

      {/* Daily Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Today's Menu Cost</p>
                <p className="text-2xl font-bold">${totalDailyCost}</p>
              </div>
              <ChefHat className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Recipes</p>
                <p className="text-2xl font-bold">{menuItems.length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Menu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Today's Menu Execution Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(todayMenu).map(([meal, dishes]) => (
              <div key={meal} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-lg">{getMealLabel(meal)}</h3>
                  <Badge variant="outline" className="bg-white">
                    {dishes.length} dishes
                  </Badge>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {dishes.map((dish, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                      <span className="text-sm">{dish.name}</span>
                      <Badge className={getStatusColor(dish.status)}>
                        {dish.status === "completed"
                          ? "Completed"
                          : dish.status === "in-progress"
                            ? "Cooking"
                            : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Meal Selection */}
      <div className="flex gap-2">
        {["breakfast", "lunch", "dinner"].map((meal) => (
          <Button
            key={meal}
            variant={selectedMeal === meal ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedMeal(meal as any)}
            className="flex-1"
          >
            {getMealLabel(meal)}
          </Button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-2 gap-4">
        {menuItems
          .filter((item) => item.category === selectedMeal)
          .map((item) => (
            <Card key={item.id} className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105">
              <CardContent className="p-3">
                <div className="space-y-3">
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Badge className={cn("absolute top-2 right-2", getDifficultyColor(item.difficulty))}>
                      {item.difficulty === "easy" ? "Easy" : item.difficulty === "medium" ? "Medium" : "Hard"}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {item.cookTime}
                      </div>
                      <span className="text-sm font-medium text-green-600">${item.cost}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-blue-600">{item.popularity}% popular</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-12 bg-transparent">
          <Calendar className="w-4 h-4 mr-2" />
          View Menu History
        </Button>
        <Button variant="outline" className="h-12 bg-transparent">
          <TrendingUp className="w-4 h-4 mr-2" />
          Recipe Analytics
        </Button>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-4">
        <Button size="lg" className="rounded-full w-14 h-14 shadow-lg">
          <ChefHat className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
