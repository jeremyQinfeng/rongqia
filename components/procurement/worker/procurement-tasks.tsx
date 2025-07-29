"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Plus, Receipt, TrendingUp, Package, ShoppingBag } from 'lucide-react'
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { cn } from "@/lib/utils"

interface BudgetAllocation {
  id: string
  amount: number
  allocatedBy: string
  date: string
  notes?: string
}

interface PurchaseRecord {
  id: string
  item: string
  quantity: number
  cost: number
  date: string
  receipt?: string
  notes?: string
  category: string
}

type DateRange = "today" | "week" | "month" | "custom"

export function WorkerProcurementTasks() {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>("today")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [showAddPurchase, setShowAddPurchase] = useState(false)
  const [newPurchase, setNewPurchase] = useState({
    item: "",
    quantity: "",
    cost: "",
    notes: "",
    receipt: null as File | null,
  })

  const budgetAllocations: BudgetAllocation[] = [
    {
      id: "1",
      amount: 100,
      allocatedBy: "John Smith",
      date: "2024-01-15",
      notes: "Weekly grocery budget",
    },
    {
      id: "2",
      amount: 50,
      allocatedBy: "John Smith",
      date: "2024-01-10",
      notes: "Cleaning supplies",
    },
  ]

  const purchaseRecords: PurchaseRecord[] = [
    {
      id: "1",
      item: "Fresh Vegetables",
      quantity: 2,
      cost: 25,
      date: "2024-01-15",
      receipt: "receipt1.jpg",
      notes: "Fresh vegetables from local market",
      category: "groceries",
    },
    {
      id: "2",
      item: "Chicken Breast",
      quantity: 1,
      cost: 45,
      date: "2024-01-14",
      receipt: "receipt2.jpg",
      category: "meat",
    },
    {
      id: "3",
      item: "Rice (5kg bag)",
      quantity: 1,
      cost: 35,
      date: "2024-01-13",
      category: "staples",
    },
    {
      id: "4",
      item: "Cleaning Supplies",
      quantity: 3,
      cost: 28,
      date: "2024-01-12",
      category: "household",
    },
  ]

  const totalAllocated = budgetAllocations.reduce((sum, allocation) => sum + allocation.amount, 0)
  const totalSpent = purchaseRecords.reduce((sum, record) => sum + record.cost, 0)
  const remainingBudget = totalAllocated - totalSpent

  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0])
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0])

  const getDateRangeLabel = () => {
    if (selectedDateRange === "custom") {
      return `${startDate} to ${endDate}`
    }
    switch (selectedDateRange) {
      case "today":
        return "Today"
      case "week":
        return "This Week"
      case "month":
        return "This Month"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "groceries":
        return <ShoppingBag className="w-6 h-6 text-green-600" />
      case "meat":
        return <Package className="w-6 h-6 text-red-600" />
      case "staples":
        return <Package className="w-6 h-6 text-orange-600" />
      case "household":
        return <Package className="w-6 h-6 text-blue-600" />
      default:
        return <Package className="w-6 h-6 text-gray-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "groceries":
        return "from-green-500 to-emerald-500"
      case "meat":
        return "from-red-500 to-pink-500"
      case "staples":
        return "from-orange-500 to-yellow-500"
      case "household":
        return "from-blue-500 to-cyan-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const handleAddPurchase = () => {
    if (newPurchase.item && newPurchase.quantity && newPurchase.cost) {
      console.log("Adding purchase:", newPurchase)
      setNewPurchase({ item: "", quantity: "", cost: "", notes: "", receipt: null })
      setShowAddPurchase(false)
    }
  }

  const handleReceiptUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setNewPurchase({ ...newPurchase, receipt: file })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Procurement Tasks
          </h1>
        </div>
        <Button
          className="gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg"
          onClick={() => setShowAddPurchase(true)}
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4 text-center">
            <p className="text-blue-100 text-sm">Allocated</p>
            <p className="text-2xl font-bold">${totalAllocated}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4 text-center">
            <p className="text-red-100 text-sm">Spent</p>
            <p className="text-2xl font-bold">${totalSpent}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4 text-center">
            <p className="text-green-100 text-sm">Remaining</p>
            <p className="text-2xl font-bold">${remainingBudget}</p>
          </CardContent>
        </Card>
      </div>

      {/* Date Range Selection - Small Block */}
      <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Select Time Range
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Quick Date Range Selection */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: "today", label: "Today" },
                { key: "week", label: "This Week" },
                { key: "month", label: "This Month" },
              ].map((range) => (
                <Button
                  key={range.key}
                  variant={selectedDateRange === range.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDateRange(range.key as any)}
                  className={cn(
                    "transition-all duration-200",
                    selectedDateRange === range.key && "bg-gradient-to-r from-blue-500 to-purple-500",
                  )}
                >
                  {range.label}
                </Button>
              ))}
            </div>

            {/* Custom Date Range Selection */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="start-date" className="text-sm font-medium text-gray-700">
                    Start Date
                  </Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value)
                      setSelectedDateRange("custom" as any)
                    }}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="end-date" className="text-sm font-medium text-gray-700">
                    End Date
                  </Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value)
                      setSelectedDateRange("custom" as any)
                    }}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Selected Time Range</p>
                  <p className="font-semibold text-gray-900">{getDateRangeLabel()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-xl font-bold text-blue-600">${totalSpent}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Records */}
      <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Receipt className="w-5 h-5 text-green-500" />
            Purchase Records - {getDateRangeLabel()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {purchaseRecords.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(record.category)} rounded-xl flex items-center justify-center`}>
                    {getCategoryIcon(record.category)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{record.item}</h4>
                    <p className="text-sm text-gray-600">
                      Quantity: {record.quantity} | {formatDate(record.date)}
                    </p>
                    {record.notes && <p className="text-xs text-gray-500 mt-1">{record.notes}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-bold text-green-600">${record.cost}</p>
                    {record.receipt && (
                      <Button variant="outline" size="sm" className="text-xs mt-1 h-6 bg-transparent">
                        View Receipt
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions - Small Blocks */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <p className="font-semibold text-gray-800">Expense Report</p>
            <p className="text-xs text-gray-600 mt-1">View spending analysis</p>
          </CardContent>
        </Card>
        <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Receipt className="w-6 h-6 text-white" />
            </div>
            <p className="font-semibold text-gray-800">Receipt Manager</p>
            <p className="text-xs text-gray-600 mt-1">Organize receipts</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Purchase Bottom Sheet */}
      <BottomSheet isOpen={showAddPurchase} onClose={() => setShowAddPurchase(false)} title="Add New Purchase">
        <div className="px-6 py-4 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="item-name">Item Name</Label>
              <Input
                id="item-name"
                value={newPurchase.item}
                onChange={(e) => setNewPurchase({ ...newPurchase, item: e.target.value })}
                placeholder="e.g., Vegetables, Chicken, Rice..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newPurchase.quantity}
                  onChange={(e) => setNewPurchase({ ...newPurchase, quantity: e.target.value })}
                  placeholder="e.g., 2"
                />
              </div>
              <div>
                <Label htmlFor="cost">Cost ($)</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  value={newPurchase.cost}
                  onChange={(e) => setNewPurchase({ ...newPurchase, cost: e.target.value })}
                  placeholder="e.g., 25.50"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="receipt-upload">Upload Receipt (Optional)</Label>
              <div className="mt-2">
                <Input
                  id="receipt-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleReceiptUpload}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {newPurchase.receipt && (
                  <p className="text-sm text-green-600 mt-2">✓ Receipt uploaded: {newPurchase.receipt.name}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="purchase-notes">Notes (Optional)</Label>
              <Textarea
                id="purchase-notes"
                value={newPurchase.notes}
                onChange={(e) => setNewPurchase({ ...newPurchase, notes: e.target.value })}
                placeholder="e.g., Fresh from local market, organic vegetables..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowAddPurchase(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleAddPurchase}
              disabled={!newPurchase.item || !newPurchase.quantity || !newPurchase.cost}
              className="flex-1"
            >
              Add Purchase
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
