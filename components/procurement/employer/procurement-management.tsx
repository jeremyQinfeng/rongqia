"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { DollarSign, Users, Plus, ChevronDown, Calendar } from "lucide-react"

interface Worker {
  id: string
  name: string
  avatar: string
  totalBudget: number
  usedBudget: number
  remainingBudget: number
  lastActivity: string
}

interface Transaction {
  id: string
  workerId: string
  workerName: string
  item: string
  amount: number
  date: string
  category: string
  status: "approved" | "pending" | "rejected"
}

type DateRange = "today" | "week" | "month" | "custom"

export function EmployerProcurementManagement() {
  const [showAddBudget, setShowAddBudget] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null)
  const [showWorkerList, setShowWorkerList] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState<DateRange>("today")
  const [budgetAmount, setBudgetAmount] = useState("")
  const [budgetNotes, setBudgetNotes] = useState("")
  const [selectedWorkerForBudget, setSelectedWorkerForBudget] = useState("")
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0])
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0])

  const workers: Worker[] = [
    {
      id: "1",
      name: "Maria Santos",
      avatar: "/placeholder.svg?height=40&width=40",
      totalBudget: 150,
      usedBudget: 100,
      remainingBudget: 50,
      lastActivity: "2 hours ago",
    },
  ]

  const [currentWorker, setCurrentWorker] = useState(workers[0])

  const transactions: Transaction[] = [
    {
      id: "1",
      workerId: "1",
      workerName: "Maria Santos",
      item: "Fresh Vegetables",
      amount: 25,
      date: "2024-01-15",
      category: "Groceries",
      status: "approved",
    },
    {
      id: "2",
      workerId: "1",
      workerName: "Maria Santos",
      item: "Chicken Breast",
      amount: 45,
      date: "2024-01-14",
      category: "Meat",
      status: "approved",
    },
    {
      id: "3",
      workerId: "1",
      workerName: "Maria Santos",
      item: "Cleaning Supplies",
      amount: 28,
      date: "2024-01-12",
      category: "Household",
      status: "approved",
    },
  ]

  const getTimeRangeLabel = () => {
    if (selectedTimeRange === "custom") {
      return `${startDate} to ${endDate}`
    }
    switch (selectedTimeRange) {
      case "today":
        return "Today"
      case "week":
        return "This Week"
      case "month":
        return "This Month"
    }
  }

  const getTransactionVolume = (range: string) => {
    switch (range) {
      case "today":
        return { count: 1, amount: 25 }
      case "week":
        return { count: 3, amount: 98 }
      case "month":
        return { count: 3, amount: 98 }
      default:
        return { count: 0, amount: 0 }
    }
  }

  const handleAddBudget = () => {
    console.log("Adding budget:", {
      worker: selectedWorkerForBudget,
      amount: budgetAmount,
      notes: budgetNotes,
    })
    setShowAddBudget(false)
    setBudgetAmount("")
    setBudgetNotes("")
    setSelectedWorkerForBudget("")
  }

  const currentTransactionVolume = getTransactionVolume(selectedTimeRange)

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Procurement Management</h1>
      </div>

      {/* Time Range Selector */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
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
                  variant={selectedTimeRange === range.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeRange(range.key as any)}
                  className="transition-all duration-200"
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
                      setSelectedTimeRange("custom")
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
                      setSelectedTimeRange("custom")
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
                  <p className="font-semibold text-gray-900">{getTimeRangeLabel()}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-blue-600">Transactions</p>
                    <p className="text-xl font-bold text-blue-900">{currentTransactionVolume.count}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-green-600">Total Amount</p>
                    <p className="text-xl font-bold text-green-900">${currentTransactionVolume.amount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Worker Budget Overview */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Worker Budget Overview</CardTitle>
            <Button onClick={() => setShowAddBudget(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Budget
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Current Worker Display */}
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {currentWorker.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{currentWorker.name}</h3>
                  <p className="text-sm text-gray-600">Last activity: {currentWorker.lastActivity}</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setShowWorkerList(true)} className="gap-2">
                <Users className="w-4 h-4" />
                Select Worker
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>

            {/* Budget Details */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-xl font-bold text-gray-900">${currentWorker.totalBudget}</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-sm text-gray-600">Used</p>
                <p className="text-xl font-bold text-red-600">${currentWorker.usedBudget}</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="text-xl font-bold text-green-600">${currentWorker.remainingBudget}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Recent Transactions - {getTimeRangeLabel()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{transaction.item}</h3>
                  <p className="text-sm text-gray-600">
                    {transaction.workerName} • {transaction.date}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{transaction.category}</Badge>
                  <Badge
                    variant={
                      transaction.status === "approved"
                        ? "default"
                        : transaction.status === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {transaction.status}
                  </Badge>
                  <span className="font-semibold text-gray-900">${transaction.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Worker Selection Bottom Sheet */}
      <BottomSheet isOpen={showWorkerList} onClose={() => setShowWorkerList(false)} title="Select Worker">
        <div className="p-6 space-y-4">
          {workers.map((worker) => (
            <div
              key={worker.id}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                currentWorker.id === worker.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => {
                setCurrentWorker(worker)
                setShowWorkerList(false)
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {worker.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{worker.name}</h3>
                  <p className="text-sm text-gray-600">
                    Budget: ${worker.totalBudget} • Used: ${worker.usedBudget}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">${worker.remainingBudget}</p>
                  <p className="text-xs text-gray-500">remaining</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </BottomSheet>

      {/* Add Budget Bottom Sheet */}
      <BottomSheet isOpen={showAddBudget} onClose={() => setShowAddBudget(false)} title="Add Budget">
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="worker-select">Select Worker</Label>
              <Select value={selectedWorkerForBudget} onValueChange={setSelectedWorkerForBudget}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a worker" />
                </SelectTrigger>
                <SelectContent>
                  {workers.map((worker) => (
                    <SelectItem key={worker.id} value={worker.id}>
                      {worker.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="budget-amount">Budget Amount ($)</Label>
              <Input
                id="budget-amount"
                type="number"
                placeholder="Enter amount"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="budget-notes">Notes (Optional)</Label>
              <Textarea
                id="budget-notes"
                placeholder="Add any notes about this budget allocation"
                value={budgetNotes}
                onChange={(e) => setBudgetNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowAddBudget(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleAddBudget} className="flex-1" disabled={!selectedWorkerForBudget || !budgetAmount}>
              Add Budget
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
