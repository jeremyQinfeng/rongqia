"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Trash2, Upload, Clock, ChefHat } from "lucide-react"
import { useRouter } from "next/navigation"

export function AddDishForm() {
  const router = useRouter()
  const [dishData, setDishData] = useState({
    name: "",
    description: "",
    category: "",
    cookTime: "",
    image: "",
  })
  const [ingredients, setIngredients] = useState<string[]>([""])
  const [instructions, setInstructions] = useState<string[]>([""])
  const [imagePreview, setImagePreview] = useState<string>("")

  const categories = ["Main Course", "Appetizer", "Soup", "Dessert", "Beverage"]

  const addIngredient = () => {
    setIngredients([...ingredients, ""])
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const updateIngredient = (index: number, value: string) => {
    const updated = [...ingredients]
    updated[index] = value
    setIngredients(updated)
  }

  const addInstruction = () => {
    setInstructions([...instructions, ""])
  }

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index))
  }

  const updateInstruction = (index: number, value: string) => {
    const updated = [...instructions]
    updated[index] = value
    setInstructions(updated)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setDishData({ ...dishData, image: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    const validIngredients = ingredients.filter((ing) => ing.trim() !== "")
    const validInstructions = instructions.filter((inst) => inst.trim() !== "")

    if (
      dishData.name &&
      dishData.category &&
      dishData.cookTime &&
      validIngredients.length > 0 &&
      validInstructions.length > 0
    ) {
      console.log("Adding dish:", {
        ...dishData,
        ingredients: validIngredients,
        instructions: validInstructions,
      })
      router.back()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 pt-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="hover:bg-white/50 animate-fade-in-left"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-900 to-red-600 bg-clip-text text-transparent animate-fade-in-left">
            Add New Dish
          </h1>
          <p className="text-gray-500 animate-fade-in-left" style={{ animationDelay: "100ms" }}>
          </p>
        </div>
      </div>

      {/* Basic Information */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-orange-500" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="dish-name">Dish Name</Label>
            <Input
              id="dish-name"
              value={dishData.name}
              onChange={(e) => setDishData({ ...dishData, name: e.target.value })}
              placeholder="e.g., 干炒牛河, 番茄炒蛋..."
              className="focus:scale-105 transition-transform duration-200"
            />
          </div>

          <div>
            <Label htmlFor="dish-description">Description</Label>
            <Textarea
              id="dish-description"
              value={dishData.description}
              onChange={(e) => setDishData({ ...dishData, description: e.target.value })}
              placeholder="Brief description of the dish..."
              rows={3}
              className="focus:scale-105 transition-transform duration-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dish-category">Category</Label>
              <Select
                value={dishData.category}
                onValueChange={(value) => setDishData({ ...dishData, category: value })}
              >
                <SelectTrigger className="focus:scale-105 transition-transform duration-200">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cook-time">Cook Time</Label>
              <Input
                id="cook-time"
                value={dishData.cookTime}
                onChange={(e) => setDishData({ ...dishData, cookTime: e.target.value })}
                placeholder="e.g., 25 mins"
                className="focus:scale-105 transition-transform duration-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Upload */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-orange-500" />
            Dish Image
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-orange-200 border-dashed rounded-xl cursor-pointer bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-orange-400" />
                  <p className="text-sm text-orange-600">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-orange-500">PNG, JPG or WEBP (MAX. 5MB)</p>
                </div>
                <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>

            {imagePreview && (
              <div className="relative animate-fade-in-up">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setImagePreview("")
                    setDishData({ ...dishData, image: "" })
                  }}
                  className="absolute top-2 right-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ingredients */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
              Ingredients
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={addIngredient}
              className="hover:bg-orange-50 hover:border-orange-200 bg-transparent"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex gap-3 items-center animate-slide-in-right"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {index + 1}
              </div>
              <Input
                value={ingredient}
                onChange={(e) => updateIngredient(index, e.target.value)}
                placeholder="e.g., 500g fresh rice noodles"
                className="flex-1 focus:scale-105 transition-transform duration-200"
              />
              {ingredients.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeIngredient(index)}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              Cooking Instructions
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={addInstruction}
              className="hover:bg-orange-50 hover:border-orange-200 bg-transparent"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Step
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {instructions.map((instruction, index) => (
            <div
              key={index}
              className="flex gap-4 animate-slide-in-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">
                {index + 1}
              </div>
              <div className="flex-1 space-y-2">
                <Textarea
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  placeholder="Describe this cooking step..."
                  rows={2}
                  className="focus:scale-105 transition-transform duration-200"
                />
                {instructions.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeInstruction(index)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove Step
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="fixed bottom-20 left-4 right-4 animate-fade-in-up">
        <Button
          onClick={handleSubmit}
          disabled={
            !dishData.name ||
            !dishData.category ||
            !dishData.cookTime ||
            ingredients.filter((ing) => ing.trim() !== "").length === 0 ||
            instructions.filter((inst) => inst.trim() !== "").length === 0
          }
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-400 shadow-xl hover:scale-105 transition-transform duration-200 disabled:hover:scale-100"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Dish to Menu
        </Button>
      </div>
    </div>
  )
}
