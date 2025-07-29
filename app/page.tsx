"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, UserCheck, Building2, Home, Loader2 } from "lucide-react"

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState<"employer" | "worker" | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRoleSelection = async (role: "employer" | "worker") => {
    setSelectedRole(role)
    setIsLoading(true)

    // Simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Navigate to respective dashboard
    window.location.href = `/${role}/dashboard`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
              <Home className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Domestic Helper Management</h1>
        </div>

        {/* Role Selection */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Employer Portal */}
            <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-blue-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-blue-900">Employer Portal</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-700 mb-6">Full Management Control</p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                </ul>
                <Button
                  onClick={() => handleRoleSelection("employer")}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                >
                  {isLoading && selectedRole === "employer" ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Enter as Employer"
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Worker Portal */}
            <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-green-300 bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-green-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-green-900">Worker Portal</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-700 mb-6">Efficient Work Execution</p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                </ul>
                <Button
                  onClick={() => handleRoleSelection("worker")}
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                >
                  {isLoading && selectedRole === "worker" ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Enter as Worker"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
