"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Users, Plus, TrendingUp, TrendingDown, Clock } from "lucide-react"
import { BottomSheet } from "@/components/ui/bottom-sheet"

interface Worker {
  id: string
  name: string
  avatar: string
  totalSalary: number
  paidSalary: number
  loans: number
  deductions: number
}

interface ActionRecord {
  id: string
  workerId: string
  type: "paid_salary" | "loan" | "deduction"
  amount: number
  reason: string
  date: string
  status: "pending" | "approved"
}

export function EmployerPayrollCenter() {
  const [selectedWorker, setSelectedWorker] = useState<string | null>("1")
  const [showAddAction, setShowAddAction] = useState(false)
  const [newAction, setNewAction] = useState({
    type: "",
    amount: "",
    reason: "",
  })

  const [workers] = useState<Worker[]>([
    {
      id: "1",
      name: "Maria Santos",
      avatar: "/placeholder.svg?height=60&width=60&text=MS",
      totalSalary: 3200,
      paidSalary: 3200,
      loans: 500,
      deductions: 100,
    },
  ])

  const [actionRecords, setActionRecords] = useState<ActionRecord[]>([
    {
      id: "1",
      workerId: "1",
      type: "paid_salary",
      amount: 3000,
      reason: "January base salary",
      date: "2024-01-31",
      status: "approved",
    },
    {
      id: "2",
      workerId: "1",
      type: "paid_salary",
      amount: 200,
      reason: "Excellent performance bonus",
      date: "2024-01-28",
      status: "approved",
    },
    {
      id: "3",
      workerId: "1",
      type: "loan",
      amount: 500,
      reason: "Personal emergency loan",
      date: "2024-01-20",
      status: "approved",
    },
    {
      id: "4",
      workerId: "1",
      type: "deduction",
      amount: 100,
      reason: "Broken dishes deduction",
      date: "2024-01-25",
      status: "approved",
    },
  ])

  const selectedWorkerData = workers.find((w) => w.id === selectedWorker)

  const handleAddAction = () => {
    if (newAction.type && newAction.amount && newAction.reason && selectedWorker) {
      const action: ActionRecord = {
        id: Date.now().toString(),
        workerId: selectedWorker,
        type: newAction.type as "paid_salary" | "loan" | "deduction",
        amount: Number.parseFloat(newAction.amount),
        reason: newAction.reason,
        date: new Date().toISOString().split("T")[0],
        status: "pending",
      }

      setActionRecords([action, ...actionRecords])
      setNewAction({ type: "", amount: "", reason: "" })
      setShowAddAction(false)
    }
  }

  const getWorkerActions = (workerId: string) => {
    return actionRecords.filter((a) => a.workerId === workerId)
  }

  const getActionTypeLabel = (type: string) => {
    switch (type) {
      case "paid_salary":
        return "Paid Salary"
      case "loan":
        return "Loan"
      case "deduction":
        return "Deduction"
      default:
        return type
    }
  }

  const getActionColor = (type: string) => {
    switch (type) {
      case "paid_salary":
        return "bg-green-100 text-green-800"
      case "loan":
        return "bg-orange-100 text-orange-800"
      case "deduction":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
      </div>

      {/* Workers Overview */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Workers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {workers.map((worker) => (
              <div
                key={worker.id}
                className={`flex flex-col items-center gap-3 p-4 rounded-lg cursor-pointer transition-all min-w-[120px] ${
                  selectedWorker === worker.id
                    ? "bg-blue-50 border-2 border-blue-500"
                    : "hover:bg-gray-50 border-2 border-transparent"
                }`}
                onClick={() => setSelectedWorker(worker.id)}
              >
                <Avatar className="w-16 h-16">
                  <AvatarImage src={worker.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-bold">
                    {worker.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{worker.name}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Worker Details */}
      {selectedWorkerData && (
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                {selectedWorkerData.name}'s Financial Details
              </CardTitle>
              <Button size="sm" onClick={() => setShowAddAction(true)} className="gap-2">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* Total Salary */}
              <div className="p-6 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Salary</p>
                    <p className="text-3xl font-bold text-gray-900">${selectedWorkerData.totalSalary}</p>
                    <p className="text-gray-500 text-xs mt-1">Total earnings</p>
                  </div>
                  <DollarSign className="w-12 h-12 text-purple-500" />
                </div>
              </div>

              {/* Paid Salary */}
              <div className="p-6 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Paid Salary</p>
                    <p className="text-3xl font-bold text-gray-900">${selectedWorkerData.paidSalary}</p>
                    <p className="text-gray-500 text-xs mt-1">Actually paid</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-green-500" />
                </div>
              </div>

              {/* Loans */}
              <div className="p-6 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Loans</p>
                    <p className="text-3xl font-bold text-gray-900">${selectedWorkerData.loans}</p>
                    <p className="text-gray-500 text-xs mt-1">Outstanding amount</p>
                  </div>
                  <Clock className="w-12 h-12 text-orange-500" />
                </div>
              </div>

              {/* Deductions */}
              <div className="p-6 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Deductions</p>
                    <p className="text-3xl font-bold text-gray-900">${selectedWorkerData.deductions}</p>
                    <p className="text-gray-500 text-xs mt-1">Total deducted</p>
                  </div>
                  <TrendingDown className="w-12 h-12 text-red-500" />
                </div>
              </div>
            </div>

            {/* Action History */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Recent Actions</h3>
              <div className="space-y-3">
                {getWorkerActions(selectedWorkerData.id)
                  .slice(0, 5)
                  .map((action) => (
                    <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-gray-800">{action.reason}</p>
                          <Badge className={getActionColor(action.type)}>{getActionTypeLabel(action.type)}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{action.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">${action.amount}</p>
                        <Badge
                          className={
                            action.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {action.status === "approved" ? "Approved" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                {getWorkerActions(selectedWorkerData.id).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No action records</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Action Bottom Sheet */}
      <BottomSheet isOpen={showAddAction} onClose={() => setShowAddAction(false)} title="Add Financial Action">
        <div className="px-6 py-4 space-y-6">
          {selectedWorkerData && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Avatar className="w-12 h-12">
                <AvatarImage src={selectedWorkerData.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {selectedWorkerData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{selectedWorkerData.name}</p>
                <p className="text-sm text-gray-600">Financial Action</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="action-type">Action Type</Label>
              <Select value={newAction.type} onValueChange={(value) => setNewAction({ ...newAction, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select action type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid_salary">Paid Salary</SelectItem>
                  <SelectItem value="loan">Loan</SelectItem>
                  <SelectItem value="deduction">Deduction</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={newAction.amount}
                onChange={(e) => setNewAction({ ...newAction, amount: e.target.value })}
                placeholder="Enter amount"
              />
            </div>

            <div>
              <Label htmlFor="reason">Reason/Description</Label>
              <Textarea
                id="reason"
                value={newAction.reason}
                onChange={(e) => setNewAction({ ...newAction, reason: e.target.value })}
                placeholder="e.g., Monthly salary payment, Emergency loan, Equipment damage..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowAddAction(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleAddAction}
              disabled={!newAction.type || !newAction.amount || !newAction.reason}
              className="flex-1"
            >
              Add Action
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
