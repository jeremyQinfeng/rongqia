"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Users, ChefHat, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

interface DishDetailProps {
  dishId: string
}

export function DishDetail({ dishId }: DishDetailProps) {
  const router = useRouter()
  const [selectedMealTime, setSelectedMealTime] = useState<string>("")

  // Mock data - in real app, this would be fetched based on dishId
  const dish = {
    id: dishId,
    name: "干炒牛河",
    description: "Classic Cantonese stir-fried rice noodles with beef, bean sprouts, and chives",
    image: "/images/dishes/gan-chao-niu-he.webp",
    cookTime: "25 mins",
    category: "Main Course",
    ingredients: [
      "500g fresh rice noodles",
      "300g beef sirloin, sliced thin",
      "200g bean sprouts",
      "3 stalks Chinese chives",
      "2 tbsp dark soy sauce",
      "1 tbsp light soy sauce",
      "2 tbsp vegetable oil",
      "1 tsp sugar",
      "Salt to taste",
    ],
    instructions: [
      "Marinate beef with light soy sauce and cornstarch for 15 minutes",
      "Heat wok over high heat, add oil",
      "Stir-fry beef until just cooked, remove and set aside",
      "Add noodles to wok, stir-fry with dark soy sauce",
      "Add bean sprouts and chives, stir-fry for 2 minutes",
      "Return beef to wok, toss everything together",
      "Season with sugar and salt, serve immediately",
    ],
  }

  const mealTimes = [
    { id: "breakfast", label: "早餐", emoji: "🌅", time: "07:00-09:00" },
    { id: "lunch", label: "午餐", emoji: "☀️", time: "11:30-13:30" },
    { id: "dinner", label: "晚餐", emoji: "🌙", time: "17:30-19:30" },
  ]

  const handleAddToMenu = () => {
    if (selectedMealTime) {
      console.log(`Adding ${dish.name} to ${selectedMealTime}`)
      // Here you would typically save to menu/schedule
      router.back()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 pb-20">
      {/* Hero Section */}
      <div className="relative">
        <img src={dish.image || "/placeholder.svg"} alt={dish.name} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white animate-fade-in-left"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Dish Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2 animate-fade-in-up">{dish.name}</h1>
          <p className="text-white/90 mb-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            {dish.description}
          </p>
          <div className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              <Clock className="w-3 h-3 mr-1" />
              {dish.cookTime}
            </Badge>
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              <ChefHat className="w-3 h-3 mr-1" />
              {dish.category}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Cook Time and Meal Selection */}
        <div className="grid grid-cols-2 gap-4">
          {/* Cook Time */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-fade-in-left">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cook Time</p>
                  <p className="text-lg font-bold text-gray-900">{dish.cookTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meal Time Selection */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-fade-in-right">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Select Time</p>
                  <p className="text-lg font-bold text-gray-900">
                    {selectedMealTime ? mealTimes.find((m) => m.id === selectedMealTime)?.label : "Choose"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meal Time Buttons */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Time Start</h3>
            <div className="grid grid-cols-1 gap-3">
              {mealTimes.map((mealTime, index) => (
                <Button
                  key={mealTime.id}
                  variant={selectedMealTime === mealTime.id ? "default" : "outline"}
                  onClick={() => setSelectedMealTime(mealTime.id)}
                  className={`h-16 justify-start text-left animate-fade-in-right ${
                    selectedMealTime === mealTime.id
                      ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                      : "hover:bg-orange-50 hover:border-orange-200"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4 w-full">
                    <span className="text-2xl">{mealTime.emoji}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{mealTime.label}</div>
                      <div
                        className={`text-sm ${selectedMealTime === mealTime.id ? "text-white/80" : "text-gray-500"}`}
                      >
                        {mealTime.time}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingredients</h3>
            <div className="space-y-3">
              {dish.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 animate-slide-in-right"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
                  <span className="text-gray-700">{ingredient}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cooking Instructions</h3>
            <div className="space-y-4">
              {dish.instructions.map((instruction, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 animate-slide-in-left"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{instruction}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add to Menu Button */}
        <div className="fixed bottom-20 left-4 right-4 animate-fade-in-up">
          <Button
            onClick={handleAddToMenu}
            disabled={!selectedMealTime}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-400 shadow-xl hover:scale-105 transition-transform duration-200 disabled:hover:scale-100"
          >
            <Plus className="w-5 h-5 mr-2" />
            {selectedMealTime
              ? `Add to ${mealTimes.find((m) => m.id === selectedMealTime)?.label} Menu`
              : "Select Time to Add to Menu"}
          </Button>
        </div>
      </div>
    </div>
  )
}
