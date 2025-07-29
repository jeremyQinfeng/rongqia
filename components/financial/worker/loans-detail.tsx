"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, AlertTriangle, Calendar, ChevronDown, ChevronUp, ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function LoansDetail() {
  const [expandedRecords, setExpandedRecords] = useState<{ [key: string]: boolean }>({})

  const loanRecords = [
    {
      id: "1",
      amount: 500,
      date: "2024-01-20",
      time: "11:20",
      description: "Personal emergency loan",
      status: "active",
      repaymentDate: "2024-02-20",
      interestRate: "0%",
      documentImage: "/placeholder.svg?height=400&width=300&text=Loan+Agreement+Jan+2024",
    },
    {
      id: "2",
      amount: 300,
      date: "2023-11-25",
      time: "10:30",
      description: "Emergency loan",
      status: "repaid",
      repaymentDate: "2023-12-25",
      interestRate: "0%",
      documentImage: "/placeholder.svg?height=400&width=300&text=Loan+Agreement+Nov+2023",
    },
    {
      id: "3",
      amount: 200,
      date: "2023-09-15",
      time: "14:45",
      description: "Medical expense loan",
      status: "repaid",
      repaymentDate: "2023-10-15",
      interestRate: "0%",
      documentImage: "/placeholder.svg?height=400&width=300&text=Medical+Loan+Sep+2023",
    },
  ]

  const totalLoans = loanRecords.reduce((sum, record) => sum + record.amount, 0)
  const activeLoans = loanRecords.filter((loan) => loan.status === "active")
  const totalActiveLoan = activeLoans.reduce((sum, record) => sum + record.amount, 0)

  const toggleExpand = (recordId: string) => {
    setExpandedRecords((prev) => ({
      ...prev,
      [recordId]: !prev[recordId],
    }))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const isOverdue = (repaymentDate: string) => {
    return new Date(repaymentDate) < new Date()
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Link href="/worker/financial">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Loan Records</h1>
          <p className="text-gray-600">All loan transactions and repayment status</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Active Loans</p>
                <p className="text-3xl font-bold">${totalActiveLoan}</p>
                <p className="text-orange-100 text-xs mt-1">{activeLoans.length} active</p>
              </div>
              <Clock className="w-12 h-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Loans</p>
                <p className="text-3xl font-bold">${totalLoans}</p>
                <p className="text-blue-100 text-xs mt-1">{loanRecords.length} total</p>
              </div>
              <AlertTriangle className="w-12 h-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Loans */}
      {activeLoans.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <Clock className="w-5 h-5" />
              Active Loans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeLoans.map((loan) => (
                <div key={loan.id} className="border border-orange-200 rounded-lg overflow-hidden">
                  {/* Main Record */}
                  <div className="p-4 bg-orange-50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-orange-800">{loan.description}</h3>
                        <div className="flex items-center gap-4 text-sm text-orange-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Borrowed: {formatDate(loan.date)}
                          </div>
                          <span>{loan.time}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-600">${loan.amount}</p>
                        <Badge className="bg-orange-100 text-orange-800 mt-1">{loan.interestRate} Interest</Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-orange-200">
                      <div>
                        <p className="text-sm text-orange-700">Repayment Due: {formatDate(loan.repaymentDate)}</p>
                        {isOverdue(loan.repaymentDate) && (
                          <Badge className="bg-red-100 text-red-800 mt-1">Overdue</Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpand(loan.id)}
                          className="text-orange-700 hover:bg-orange-100"
                        >
                          <ImageIcon className="w-4 h-4 mr-1" />
                          {expandedRecords[loan.id] ? "Hide Document" : "View Document"}
                          {expandedRecords[loan.id] ? (
                            <ChevronUp className="w-4 h-4 ml-1" />
                          ) : (
                            <ChevronDown className="w-4 h-4 ml-1" />
                          )}
                        </Button>
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          Repay Now
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedRecords[loan.id] && (
                    <div className="p-4 bg-white border-t border-orange-200">
                      <div className="flex flex-col items-center">
                        <p className="text-sm text-gray-600 mb-3">Loan Agreement</p>
                        <div className="relative w-full max-w-sm">
                          <Image
                            src={loan.documentImage || "/placeholder.svg"}
                            alt={`Document for ${loan.description}`}
                            width={300}
                            height={400}
                            className="w-full h-auto rounded-lg shadow-md border"
                          />
                        </div>
                        <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                          Download Document
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Loan Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Loan History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loanRecords.map((loan) => (
              <div
                key={loan.id}
                className={`border rounded-lg overflow-hidden ${
                  loan.status === "active" ? "border-orange-200" : "border-gray-200"
                }`}
              >
                {/* Main Record */}
                <div className={`p-4 ${loan.status === "active" ? "bg-orange-50" : "bg-gray-50"}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className={`font-semibold ${loan.status === "active" ? "text-orange-800" : "text-gray-800"}`}>
                        {loan.description}
                      </h3>
                      <div
                        className={`flex items-center gap-4 text-sm mt-1 ${
                          loan.status === "active" ? "text-orange-600" : "text-gray-600"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(loan.date)}
                        </div>
                        <span>{loan.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-xl font-bold ${loan.status === "active" ? "text-orange-600" : "text-gray-600"}`}
                      >
                        ${loan.amount}
                      </p>
                      <Badge
                        className={
                          loan.status === "active" ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"
                        }
                      >
                        {loan.status === "active" ? "Active" : "Repaid"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <p className={`text-sm ${loan.status === "active" ? "text-orange-700" : "text-gray-600"}`}>
                      {loan.status === "active" ? "Due" : "Repaid"}: {formatDate(loan.repaymentDate)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(loan.id)}
                      className={`${
                        loan.status === "active"
                          ? "text-orange-700 hover:bg-orange-100"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <ImageIcon className="w-4 h-4 mr-1" />
                      {expandedRecords[loan.id] ? "Hide Document" : "View Document"}
                      {expandedRecords[loan.id] ? (
                        <ChevronUp className="w-4 h-4 ml-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedRecords[loan.id] && (
                  <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-gray-600 mb-3">Loan Agreement</p>
                      <div className="relative w-full max-w-sm">
                        <Image
                          src={loan.documentImage || "/placeholder.svg"}
                          alt={`Document for ${loan.description}`}
                          width={300}
                          height={400}
                          className="w-full h-auto rounded-lg shadow-md border"
                        />
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                        Download Document
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-12 bg-transparent">
          Request New Loan
        </Button>
        <Button variant="outline" className="h-12 bg-transparent">
          Repayment History
        </Button>
      </div>
    </div>
  )
}
