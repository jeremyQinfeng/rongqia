"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus, UtensilsCrossed, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddDishFormProps {
  isOpen: boolean
  onClose: () => void
  onAddDish: (dishData: {
    name: string
    description: string
    meal: "breakfast" | "lunch" | "dinner"
    image?: string
  }) => void
}

export function WorkerAddDishForm({ isOpen, onClose, onAddDish }: AddDishFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    meal: "lunch" as "breakfast" | "lunch" | "dinner",
    image: "",
  })
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  React.useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      setIsAnimating(false)
      setTimeout(() => setShouldRender(false), 300)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
      // Reset form data when closing
      setFormData({
        name: "",
        description: "",
        meal: "lunch",
        image: "",
      })
    }, 300)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim() && formData.description.trim()) {
      onAddDish(formData)
      handleClose()
    }
  }

  const getMealColor = (meal: string) => {
    switch (meal) {
      case "breakfast":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200"
      case "lunch":
        return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
      case "dinner":
        return "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
    }
  }

  if (!shouldRender) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out",
        isAnimating ? "bg-black/50 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none",
      )}
      onClick={handleBackdropClick}
    >
      <Card
        className={cn(
          "w-full max-w-md shadow-2xl transition-all duration-300 ease-out transform",
          isAnimating ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4",
        )}
        style={{ marginBottom: "80px" }}
      >
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Plus className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg font-semibold">Add Your Own Dish</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dish Name */}
            <div className="space-y-2">
              <Label htmlFor="dishName" className="text-sm font-medium text-gray-700">
                Dish Name *
              </Label>
              <Input
                id="dishName"
                type="text"
                placeholder="Enter dish name (e.g., 宫保鸡丁)"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the dish (e.g., Spicy Sichuan chicken with peanuts and vegetables)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full min-h-[80px] resize-none"
                required
              />
            </div>

            {/* Meal Type Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Meal Type *</Label>
              <div className="flex gap-2">
                {(["breakfast", "lunch", "dinner"] as const).map((meal) => (
                  <button
                    key={meal}
                    type="button"
                    onClick={() => setFormData({ ...formData, meal })}
                    className={cn(
                      "flex-1 py-2 px-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium capitalize",
                      formData.meal === meal
                        ? getMealColor(meal)
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100",
                    )}
                  >
                    {meal}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Image Upload Placeholder */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Dish Image (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Image upload coming soon</p>
                <p className="text-xs text-gray-400 mt-1">For now, a placeholder image will be used</p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={!formData.name.trim() || !formData.description.trim()}
              >
                <UtensilsCrossed className="w-4 h-4 mr-2" />
                Add Dish
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
