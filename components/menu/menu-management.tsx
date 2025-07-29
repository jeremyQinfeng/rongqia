"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, ChefHat, Clock } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MenuItem {
  id: string
  name: string
  image: string
  category: "breakfast" | "lunch" | "dinner"
  cookTime: string
  difficulty: "easy" | "medium" | "hard"
}

export function MenuManagement() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedMeal, setSelectedMeal] = useState<"breakfast" | "lunch" | "dinner">("lunch")

  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "红烧肉",
      image: "/placeholder.svg?height=120&width=120",
      category: "lunch",
      cookTime: "45分钟",
      difficulty: "medium",
    },
    {
      id: "2",
      name: "清蒸鱼",
      image: "/placeholder.svg?height=120&width=120",
      category: "dinner",
      cookTime: "30分钟",
      difficulty: "easy",
    },
    {
      id: "3",
      name: "青菜炒蛋",
      image: "/placeholder.svg?height=120&width=120",
      category: "lunch",
      cookTime: "15分钟",
      difficulty: "easy",
    },
    {
      id: "4",
      name: "白粥配咸菜",
      image: "/placeholder.svg?height=120&width=120",
      category: "breakfast",
      cookTime: "20分钟",
      difficulty: "easy",
    },
    {
      id: "5",
      name: "汤面",
      image: "/placeholder.svg?height=120&width=120",
      category: "dinner",
      cookTime: "25分钟",
      difficulty: "easy",
    },
    {
      id: "6",
      name: "煎蛋吐司",
      image: "/placeholder.svg?height=120&width=120",
      category: "breakfast",
      cookTime: "10分钟",
      difficulty: "easy",
    },
  ]

  const todayMenu = {
    breakfast: ["白粥配咸菜"],
    lunch: ["红烧肉", "青菜炒蛋", "米饭"],
    dinner: ["清蒸鱼", "汤面"],
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

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">菜单管理</h1>
          <p className="text-gray-600">管理每日菜单和菜品库</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          添加菜品
        </Button>
      </div>

      {/* Today's Menu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            今日菜单
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(todayMenu).map(([meal, dishes]) => (
              <div key={meal} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{getMealLabel(meal)}</p>
                  <p className="text-sm text-gray-600">{dishes.join("、")}</p>
                </div>
                <Badge variant="outline" className="bg-white">
                  {dishes.length} 道菜
                </Badge>
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
                      {item.difficulty === "easy" ? "简单" : item.difficulty === "medium" ? "中等" : "困难"}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3" />
                      {item.cookTime}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
