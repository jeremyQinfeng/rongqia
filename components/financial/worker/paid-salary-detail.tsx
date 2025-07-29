"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, DollarSign, Calendar, CheckCircle, ChevronDown, ChevronUp, ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function PaidSalaryDetail() {
  const [expandedRecords, setExpandedRecords] = useState<{ [key: string]: boolean }>({})

  const paidSalaryRecords = [
    {
      id: "1",
      amount: 3000,
      date: "2024-01-31",
      time: "14:30",
      description: "January base salary",
      status: "completed",
      paymentMethod: "Bank Transfer",
      receiptImage: "/placeholder.svg?height=400&width=300&text=Salary+Receipt+Jan+2024",
    },
    {
      id: "2",
      amount: 200,
      date: "2024-01-28",
      time: "16:45",
      description: "Excellent performance bonus",
      status: "completed",
      paymentMethod: "Bank Transfer",
      receiptImage: "/placeholder.svg?height=400&width=300&text=Bonus+Receipt+Jan+2024",
    },
    {
      id: "3",
      amount: 2800,
      date: "2023-12-31",
      time: "15:00",
      description: "December base salary",
      status: "completed",
      paymentMethod: "Bank Transfer",
      receiptImage: "/placeholder.svg?height=400&width=300&text=Salary+Receipt+Dec+2023",
    },
    {
      id: "4",
      amount: 150,
      date: "2023-12-28",
      time: "17:30",
      description: "Monthly performance bonus",
      status: "completed",
      paymentMethod: "Cash",
      receiptImage: "/placeholder.svg?height=400&width=300&text=Cash+Receipt+Dec+2023",
    },
    {
      id: "5",
      amount: 3000,
      date: "2023-11-30",
      time: "14:15",
      description: "November base salary",
      status: "completed",
      paymentMethod: "Bank Transfer",
      receiptImage: "/placeholder.svg?height=400&width=300&text=Salary+Receipt+Nov+2023",
    },
  ]

  const totalPaid = paidSalaryRecords.reduce((sum, record) => sum + record.amount, 0)

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
          <h1 className="text-2xl font-bold text-gray-900">Paid Salary Records</h1>
          <p className="text-gray-600">All salary payments received</p>
        </div>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Paid Salary</p>
              <p className="text-4xl font-bold">${totalPaid}</p>
              <p className="text-green-100 text-sm mt-1">{paidSalaryRecords.length} payments received</p>
            </div>
            <DollarSign className="w-16 h-16 text-green-200" />
          </div>
        </CardContent>
      </Card>

      {/* Salary Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paidSalaryRecords.map((record, index) => (
              <div key={record.id} className="border border-green-200 rounded-lg overflow-hidden">
                {/* Main Record */}
                <div className="p-4 bg-green-50">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-green-800">{record.description}</h3>
                      <div className="flex items-center gap-4 text-sm text-green-600 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(record.date)}
                        </div>
                        <span>{record.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">+${record.amount}</p>
                      <Badge className="bg-green-100 text-green-800 mt-1">{record.paymentMethod}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-green-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700">Payment Completed</span>
                      {index === 0 && <Badge className="bg-blue-100 text-blue-800">Latest</Badge>}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(record.id)}
                      className="text-green-700 hover:bg-green-100"
                    >
                      <ImageIcon className="w-4 h-4 mr-1" />
                      {expandedRecords[record.id] ? "Hide Receipt" : "View Receipt"}
                      {expandedRecords[record.id] ? (
                        <ChevronUp className="w-4 h-4 ml-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedRecords[record.id] && (
                  <div className="p-4 bg-white border-t border-green-200">
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-gray-600 mb-3">Payment Receipt</p>
                      <div className="relative w-full max-w-sm">
                        <Image
                          src={record.receiptImage || "/placeholder.svg"}
                          alt={`Receipt for ${record.description}`}
                          width={300}
                          height={400}
                          className="w-full h-auto rounded-lg shadow-md border"
                        />
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                        Download Receipt
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
          Download Statement
        </Button>
        <Button variant="outline" className="h-12 bg-transparent">
          Export Records
        </Button>
      </div>
    </div>
  )
}
