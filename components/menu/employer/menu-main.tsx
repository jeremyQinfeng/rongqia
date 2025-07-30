"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Clock, ChefHat, Users, Calendar, X } from "lucide-react"
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

export function MenuMain() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  // Auto-select meal based on current time
  useEffect(() => {
    const now = new Date()
    const currentHour = now.getHours()
    
    if (currentHour >= 17 && currentHour < 20) {
      setSelectedCategory("dinner")
    } else if (currentHour >= 11 && currentHour < 14) {
      setSelectedCategory("lunch")
    } else {
      setSelectedCategory("breakfast")
    }
  }, [])

  const dishes: Dish[] = [
    {
      id: "1",
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
    },
    {
      id: "2",
      name: "番茄炒蛋",
      description: "Traditional Chinese scrambled eggs with fresh tomatoes",
      image: "/images/dishes/fan-qie-chao-dan.jpeg",
      cookTime: "15 mins",
      category: "Main Course",
      ingredients: [
        "4 large eggs",
        "3 medium tomatoes",
        "2 tbsp vegetable oil",
        "1 tsp sugar",
        "1/2 tsp salt",
        "2 green onions, chopped",
        "1 clove garlic, minced",
      ],
      instructions: [
        "Beat eggs with a pinch of salt",
        "Cut tomatoes into wedges",
        "Heat oil in wok, scramble eggs until just set",
        "Remove eggs and set aside",
        "Stir-fry tomatoes with garlic until soft",
        "Add sugar and salt to tomatoes",
        "Return eggs to wok, gently combine",
        "Garnish with green onions and serve",
      ],
    },
    {
      id: "3",
      name: "叉烧",
      description: "Sweet and savory Cantonese BBQ pork with honey glaze",
      image: "/images/dishes/cha-shao.jpeg",
      cookTime: "2 hours",
      category: "Main Course",
      ingredients: [
        "1kg pork shoulder, cut into strips",
        "3 tbsp hoisin sauce",
        "2 tbsp soy sauce",
        "2 tbsp honey",
        "2 tbsp Chinese rice wine",
        "1 tbsp fermented bean sauce",
        "1 tsp five-spice powder",
        "2 cloves garlic, minced",
        "Red food coloring (optional)",
      ],
      instructions: [
        "Mix all marinade ingredients in a bowl",
        "Marinate pork strips for at least 4 hours or overnight",
        "Preheat oven to 200°C (400°F)",
        "Place pork on rack over baking tray",
        "Roast for 20 minutes, then flip",
        "Brush with remaining marinade and roast 15 more minutes",
        "Increase heat to 220°C, roast until caramelized",
        "Rest for 10 minutes before slicing",
      ],
    },
    {
      id: "4",
      name: "白切鸡",
      description: "Poached chicken served with ginger scallion sauce",
      image: "/images/dishes/bai-qie-ji.jpeg",
      cookTime: "45 mins",
      category: "Main Course",
      ingredients: [
        "1 whole chicken (1.5kg)",
        "4 slices ginger",
        "2 green onions",
        "2 tbsp salt",
        "Ice water for shocking",
        "For sauce: 3 tbsp minced ginger",
        "2 green onions, minced",
        "1/4 cup vegetable oil",
        "1 tsp salt",
      ],
      instructions: [
        "Bring large pot of water to boil with ginger, green onions, and salt",
        "Submerge chicken completely, return to boil",
        "Reduce heat to simmer, cook for 30 minutes",
        "Remove chicken and immediately plunge into ice water",
        "For sauce: heat oil until smoking, pour over ginger and green onions",
        "Add salt to sauce and mix well",
        "Chop chicken into pieces and serve with sauce",
      ],
    },
  ]

  const filters = [
    { key: "breakfast", label: "早餐" },
    { key: "lunch", label: "午餐" },
    { key: "dinner", label: "晚餐" },
    { key: "other", label: "其他" },
  ]

  // mock: worker assigned/added dishes
  const assignedDishes = [
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

  let filteredDishes = []
  if (selectedCategory === "all") {
    filteredDishes = dishes.filter((dish) => {
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
  } else {
    filteredDishes = assignedDishes.filter((dish) => {
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesMeal = selectedCategory === "other"
        ? dish.meal === "other"
        : dish.meal === selectedCategory
      return matchesSearch && matchesMeal
    })
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-4 pb-20 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-900 to-red-600 bg-clip-text text-transparent">
            Menu Management
          </h1>
          <p className="text-gray-500"></p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className={`whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                : "hover:bg-orange-50 hover:border-orange-200"
            }`}
          >
            All Dishes
          </Button>
          <Button
            className="gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg"
            onClick={() => router.push("/employer/menu/add-dish")}
          >
            <Plus className="w-4 h-4" />
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
              placeholder="Search dishes..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <Button
            key={filter.key}
            variant={selectedCategory === filter.key ? "default" : "outline"}
            onClick={() => setSelectedCategory(filter.key)}
            className={`whitespace-nowrap ${
              selectedCategory === filter.key
                ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                : "hover:bg-orange-50 hover:border-orange-200"
            }`}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Date Selection */}
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

      {/* Dishes Grid for All Dishes */}
      {selectedCategory === "all" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDishes.map((dish) => {
            const isAssigned = (dish as any).assignedTo !== undefined
            return (
              <Card
                key={dish.id}
                className="shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105"
                onClick={() => router.push(`/employer/menu/dish/${dish.id}`)}
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
                        {isAssigned ? (dish as any).customTime || "" : (dish as any).cookTime || ""}
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
                    {!isAssigned ? (
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-orange-600 border-orange-200">
                          <ChefHat className="w-3 h-3 mr-1" />
                          菜品库
                        </Badge>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/employer/menu/dish/${dish.id}`)
                          }}
                        >
                          View Recipe
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          {(dish as any).assignedTo}
                        </Badge>
                        <Badge variant="outline" className="text-blue-600 border-blue-200">
                          {(dish as any).meal === "other" ? (dish as any).customTime : (dish as any).meal}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Assigned Dishes Block for breakfast/lunch/dinner/other */}
      {selectedCategory !== "all" && (
        <div className="space-y-4">
          {assignedDishes.filter((dish) => {
            // meal筛选
            return selectedCategory === "other"
              ? dish.meal === "other"
              : dish.meal === selectedCategory
          }).length === 0 ? (
            <div className="text-center py-12">
              <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No assigned dishes</h3>
              <p className="text-gray-500 mb-4">Try assigning dishes from the All Dishes tab</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {assignedDishes.filter((dish) => {
                return selectedCategory === "other"
                  ? dish.meal === "other"
                  : dish.meal === selectedCategory
              }).map((dish) => (
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
                          {dish.meal === "other" ? dish.customTime : dish.meal}
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
                          {dish.meal === "other" ? dish.customTime : dish.meal}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty state for All Dishes */}
      {selectedCategory === "all" && filteredDishes.length === 0 && (
        <div className="text-center py-12">
          <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No dishes found</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery || selectedCategory !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Add your first dish to get started"}
          </p>
          {!searchQuery && selectedCategory === "all" && (
            <Button
              onClick={() => router.push("/employer/menu/add-dish")}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Dish
            </Button>
          )}
        </div>
      )}

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
