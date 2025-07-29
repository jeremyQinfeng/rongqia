"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  FileText,
  TrendingUp,
  TrendingDown,
  Clock,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

interface TransactionRecord {
  id: string
  type: "salary" | "loan" | "deduction" | "bonus"
  amount: number
  date: string
  time: string
  description: string
  balance: number
  status: "completed" | "pending" | "processing"
}

export function WorkerSalaryOverview() {
  const [showAllRecords, setShowAllRecords] = useState(false)

  const [transactions] = useState<TransactionRecord[]>([
    {
      id: "1",
      type: "salary",
      amount: 3000,
      date: "2024-01-31",
      time: "14:30",
      description: "January base salary",
      balance: 3000,
      status: "completed",
    },
    {
      id: "2",
      type: "bonus",
      amount: 200,
      date: "2024-01-28",
      time: "16:45",
      description: "Excellent performance bonus",
      balance: 3200,
      status: "completed",
    },
    {
      id: "3",
      type: "deduction",
      amount: -100,
      date: "2024-01-25",
      time: "09:15",
      description: "Broken dishes deduction",
      balance: 3100,
      status: "completed",
    },
    {
      id: "4",
      type: "loan",
      amount: -500,
      date: "2024-01-20",
      time: "11:20",
      description: "Personal loan",
      balance: 2600,
      status: "completed",
    },
    {
      id: "5",
      type: "salary",
      amount: 2800,
      date: "2023-12-31",
      time: "15:00",
      description: "December base salary",
      balance: 2800,
      status: "completed",
    },
  ])

  // Calculate summary data
  const totalSalary = transactions
    .filter((t) => t.type === "salary" || t.type === "bonus")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const totalPaid = transactions
    .filter((t) => (t.type === "salary" || t.type === "bonus") && t.status === "completed")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const totalLoan = transactions.filter((t) => t.type === "loan").reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const totalDeduction = transactions
    .filter((t) => t.type === "deduction")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "salary":
        return <DollarSign className="w-5 h-5 text-green-600" />
      case "bonus":
        return <TrendingUp className="w-5 h-5 text-blue-600" />
      case "loan":
        return <ArrowDownLeft className="w-5 h-5 text-orange-600" />
      case "deduction":
        return <ArrowUpRight className="w-5 h-5 text-red-600" />
      default:
        return <DollarSign className="w-5 h-5 text-gray-600" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "salary":
        return "text-green-600"
      case "bonus":
        return "text-blue-600"
      case "loan":
        return "text-orange-600"
      case "deduction":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getTransactionBg = (type: string) => {
    switch (type) {
      case "salary":
        return "bg-green-50 border-green-200"
      case "bonus":
        return "bg-blue-50 border-blue-200"
      case "loan":
        return "bg-orange-50 border-orange-200"
      case "deduction":
        return "bg-red-50 border-red-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case "salary":
        return "Salary"
      case "bonus":
        return "Bonus"
      case "loan":
        return "Loan"
      case "deduction":
        return "Deduction"
      default:
        return "Other"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
    }
  }

  const displayedTransactions = showAllRecords ? transactions : transactions.slice(0, 10)

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Salary Details</h1>
        <p className="text-gray-600">View salary breakdown and transaction history</p>
      </div>

      {/* Salary Summary - Clickable cards that navigate to detail pages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Salary Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {/* Total Salary - Now Clickable */}
            <Link href="/worker/financial/total-salary">
              <div className="p-6 border rounded-lg cursor-pointer transition-all hover:shadow-md hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Salary</p>
                    <p className="text-3xl font-bold text-gray-900">${totalSalary}</p>
                    <p className="text-gray-500 text-xs mt-1">Total earnings</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <DollarSign className="w-12 h-12 text-purple-500" />
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Paid Salary - Clickable */}
            <Link href="/worker/financial/paid-salary">
              <div className="p-6 border rounded-lg cursor-pointer transition-all hover:shadow-md hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Paid Salary</p>
                    <p className="text-3xl font-bold text-gray-900">${totalPaid}</p>
                    <p className="text-gray-500 text-xs mt-1">Actually received</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <TrendingUp className="w-12 h-12 text-green-500" />
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Loans - Clickable */}
            <Link href="/worker/financial/loans">
              <div className="p-6 border rounded-lg cursor-pointer transition-all hover:shadow-md hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Loans</p>
                    <p className="text-3xl font-bold text-gray-900">${totalLoan}</p>
                    <p className="text-gray-500 text-xs mt-1">Amount to repay</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Clock className="w-12 h-12 text-orange-500" />
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Deductions - Clickable */}
            <Link href="/worker/financial/deductions">
              <div className="p-6 border rounded-lg cursor-pointer transition-all hover:shadow-md hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Deductions</p>
                    <p className="text-3xl font-bold text-gray-900">${totalDeduction}</p>
                    <p className="text-gray-500 text-xs mt-1">Total deducted</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <TrendingDown className="w-12 h-12 text-red-500" />
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Transaction History
            </CardTitle>
            <Badge variant="outline">
              {showAllRecords
                ? `${displayedTransactions.length} records`
                : `Recent ${Math.min(10, displayedTransactions.length)}`}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {displayedTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${getTransactionBg(transaction.type)} ${
                  index === 0 ? "border-l-4 border-l-blue-500" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{transaction.description}</p>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getTransactionColor(transaction.type)} border-current`}
                        >
                          {getTransactionLabel(transaction.type)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <span>{formatDate(transaction.date)}</span>
                        <span>{transaction.time}</span>
                        {index === 0 && <Badge className="bg-blue-100 text-blue-800 text-xs">Latest</Badge>}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`text-lg font-bold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                      {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount)}
                    </p>
                    <p className="text-sm text-gray-500">Balance: ${transaction.balance}</p>
                  </div>
                </div>

                {transaction.status !== "completed" && (
                  <div className="mt-3 flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        transaction.status === "processing" ? "bg-yellow-500" : "bg-gray-400"
                      }`}
                    ></div>
                    <span className="text-xs text-gray-600">
                      {transaction.status === "processing" ? "Processing" : "Pending"}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-gray-50">
            <Button variant="outline" className="w-full bg-white" onClick={() => setShowAllRecords(!showAllRecords)}>
              <FileText className="w-4 h-4 mr-2" />
              {showAllRecords ? "Show Recent Only" : "View All Transaction History"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-12 bg-transparent">
          <Plus className="w-4 h-4 mr-2" />
          Request Loan
        </Button>
        <Button variant="outline" className="h-12 bg-transparent">
          <FileText className="w-4 h-4 mr-2" />
          Download Pay Slip
        </Button>
      </div>
    </div>
  )
}
