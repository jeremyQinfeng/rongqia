"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, DollarSign, Calendar, FileText, User, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export function TotalSalaryDetail() {
  const contractInfo = {
    workerName: "Maria Santos",
    workerAvatar: "/placeholder.svg?height=80&width=80",
    position: "Domestic Helper",
    employerName: "Johnson Family",
    employerAddress: "123 Main Street, Singapore 123456",
    contractStartDate: "2024-01-01",
    contractEndDate: "2025-12-31",
    contractDuration: "2 years",
    monthlySalary: 3000,
    totalContractValue: 72000, // 24 months * 3000
    workingDays: "Monday to Saturday",
    workingHours: "8:00 AM - 6:00 PM",
    restDay: "Sunday",
    benefits: ["Medical Insurance", "Annual Leave (14 days)", "Sick Leave (14 days)", "Public Holiday Pay"],
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDaysUntilExpiry = () => {
    const today = new Date()
    const expiryDate = new Date(contractInfo.contractEndDate)
    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysUntilExpiry = getDaysUntilExpiry()
  const isExpiringSoon = daysUntilExpiry <= 90

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
          <h1 className="text-2xl font-bold text-gray-900">Contract & Salary Details</h1>
          <p className="text-gray-600">Employment contract and salary information</p>
        </div>
      </div>

      {/* Worker Profile */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={contractInfo.workerAvatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-bold">
                {contractInfo.workerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{contractInfo.workerName}</h2>
              <p className="text-gray-600 text-lg">{contractInfo.position}</p>
              <div className="flex items-center gap-2 mt-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Working for {contractInfo.employerName}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Salary Information */}
      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <DollarSign className="w-6 h-6" />
            Salary Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-purple-100 text-sm">Monthly Salary</p>
              <p className="text-4xl font-bold">${contractInfo.monthlySalary}</p>
              <p className="text-purple-100 text-sm mt-1">Per month</p>
            </div>
            <div>
              <p className="text-purple-100 text-sm">Total Contract Value</p>
              <p className="text-4xl font-bold">${contractInfo.totalContractValue}</p>
              <p className="text-purple-100 text-sm mt-1">Full contract period</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contract Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Contract Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Contract Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <p className="text-sm font-medium text-gray-600">Contract Start</p>
                </div>
                <p className="font-semibold text-gray-900">{formatDate(contractInfo.contractStartDate)}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <p className="text-sm font-medium text-gray-600">Contract End</p>
                </div>
                <p className="font-semibold text-gray-900">{formatDate(contractInfo.contractEndDate)}</p>
              </div>
            </div>

            {/* Contract Status */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Contract Status</p>
                  <p className="font-semibold text-blue-800">Active - {contractInfo.contractDuration}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-600">Days Remaining</p>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-blue-800">{daysUntilExpiry} days</p>
                    {isExpiringSoon && <Badge className="bg-red-100 text-red-800">Expiring Soon</Badge>}
                  </div>
                </div>
              </div>
            </div>

            {/* Employer Information */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-gray-600" />
                <p className="text-sm font-medium text-gray-600">Employer</p>
              </div>
              <p className="font-semibold text-gray-900 mb-1">{contractInfo.employerName}</p>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="w-3 h-3" />
                <span>{contractInfo.employerAddress}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Working Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Working Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Working Days</p>
                <p className="font-semibold text-gray-900">{contractInfo.workingDays}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Working Hours</p>
                <p className="font-semibold text-gray-900">{contractInfo.workingHours}</p>
              </div>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">Rest Day</p>
              <p className="font-semibold text-green-800">{contractInfo.restDay}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Benefits & Entitlements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {contractInfo.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-800">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-12 bg-transparent">
          <FileText className="w-4 h-4 mr-2" />
          Download Contract
        </Button>
        <Button variant="outline" className="h-12 bg-transparent">
          <Calendar className="w-4 h-4 mr-2" />
          Renewal Request
        </Button>
      </div>
    </div>
  )
}
