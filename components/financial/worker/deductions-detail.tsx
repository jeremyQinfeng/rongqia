"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingDown, Calendar, FileText, ChevronDown, ChevronUp, ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function DeductionsDetail() {
  const [expandedRecords, setExpandedRecords] = useState<{ [key: string]: boolean }>({})

  const deductionRecords = [
    {
      id: "1",
      amount: 100,
      date: "2024-01-25",
      time: "09:15",
      description: "Broken dishes deduction",
      reason: "Accidentally broke 2 dinner plates during cleaning",
      category: "Property Damage",
      evidenceImage: "/placeholder.svg?height=400&width=300&text=Broken+Dishes+Evidence",
    },
    {
      id: "2",
      amount: 50,
      date: "2024-01-10",
      time: "08:30",
      description: "Late arrival deduction",
      reason: "Arrived 30 minutes late without prior notice",
      category: "Attendance",
      evidenceImage: "/placeholder.svg?height=400&width=300&text=Attendance+Record",
    },
    {
      id: "3",
      amount: 75,
      date: "2023-12-15",
      time: "16:20",
      description: "Uniform replacement",
      reason: "Lost work uniform, replacement cost",
      category: "Uniform",
      evidenceImage: "/placeholder.svg?height=400&width=300&text=Uniform+Receipt",
    },
    {
      id: "4",
      amount: 25,
      date: "2023-11-28",
      time: "14:45",
      description: "Phone usage during work",
      reason: "Personal phone call during work hours",
      category: "Policy Violation",
      evidenceImage: "/placeholder.svg?height=400&width=300&text=Policy+Violation+Record",
    },
  ]

  const totalDeductions = deductionRecords.reduce((sum, record) => sum + record.amount, 0)

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Property Damage":
        return "bg-red-100 text-red-800"
      case "Attendance":
        return "bg-yellow-100 text-yellow-800"
      case "Uniform":
        return "bg-blue-100 text-blue-800"
      case "Policy Violation":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Deduction Records</h1>
          <p className="text-gray-600">All salary deductions and reasons</p>
        </div>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Total Deductions</p>
              <p className="text-4xl font-bold">${totalDeductions}</p>
              <p className="text-red-100 text-sm mt-1">{deductionRecords.length} deductions</p>
            </div>
            <TrendingDown className="w-16 h-16 text-red-200" />
          </div>
        </CardContent>
      </Card>

      {/* Deduction Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Deduction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deductionRecords.map((deduction, index) => (
              <div key={deduction.id} className="border border-red-200 rounded-lg overflow-hidden">
                {/* Main Record */}
                <div className="p-4 bg-red-50">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-red-800">{deduction.description}</h3>
                      <div className="flex items-center gap-4 text-sm text-red-600 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(deduction.date)}
                        </div>
                        <span>{deduction.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-600">${deduction.amount}</p>
                      <Badge className={getCategoryColor(deduction.category)}>{deduction.category}</Badge>
                    </div>
                  </div>

                  <div className="p-3 bg-red-100 rounded mb-3">
                    <p className="text-sm text-red-800">
                      <strong>Reason:</strong> {deduction.reason}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-red-200">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Processed</Badge>
                      {index === 0 && <Badge className="bg-blue-100 text-blue-800">Latest</Badge>}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(deduction.id)}
                      className="text-red-700 hover:bg-red-100"
                    >
                      <ImageIcon className="w-4 h-4 mr-1" />
                      {expandedRecords[deduction.id] ? "Hide Evidence" : "View Evidence"}
                      {expandedRecords[deduction.id] ? (
                        <ChevronUp className="w-4 h-4 ml-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedRecords[deduction.id] && (
                  <div className="p-4 bg-white border-t border-red-200">
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-gray-600 mb-3">Evidence/Documentation</p>
                      <div className="relative w-full max-w-sm">
                        <Image
                          src={deduction.evidenceImage || "/placeholder.svg"}
                          alt={`Evidence for ${deduction.description}`}
                          width={300}
                          height={400}
                          className="w-full h-auto rounded-lg shadow-md border"
                        />
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                        Download Evidence
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
          Contact Support
        </Button>
        <Button variant="outline" className="h-12 bg-transparent">
          Download Records
        </Button>
      </div>
    </div>
  )
}
