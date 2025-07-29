"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Settings,
  LogOut,
  Building2,
  Phone,
  Mail,
  Loader2,
} from "lucide-react"
import { BottomSheet } from "@/components/ui/bottom-sheet"

export function EmployerDashboard() {
  const [showProfile, setShowProfile] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    window.location.href = "/"
  }

  const stats = [
    {
      title: "Active Workers",
      value: "1",
      change: "Maria Santos",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Monthly Budget",
      value: "$150",
      change: "67% utilized",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Tasks Today",
      value: "4",
      change: "1 in progress",
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Efficiency Rate",
      value: "85%",
      change: "Good performance",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "task_started",
      message: "Maria started kitchen deep cleaning",
      time: "30 minutes ago",
      status: "info",
    },
    {
      id: 2,
      type: "purchase",
      message: "Fresh vegetables purchased - $25",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 3,
      type: "budget_update",
      message: "Weekly budget allocated - $100",
      time: "1 day ago",
      status: "info",
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      task: "Kitchen Deep Cleaning",
      assignee: "Maria Santos",
      time: "9:00 AM - 11:00 AM",
      priority: "high",
      status: "in-progress",
    },
    {
      id: 2,
      task: "Laundry Service",
      assignee: "Maria Santos",
      time: "11:30 AM - 1:00 PM",
      priority: "medium",
      status: "pending",
    },
    {
      id: 3,
      task: "Living Room Organization",
      assignee: "Maria Santos",
      time: "2:00 PM - 5:00 PM",
      priority: "low",
      status: "pending",
    },
    {
      id: 4,
      task: "Grocery Shopping",
      assignee: "Maria Santos",
      time: "5:00 PM - 7:00 PM",
      priority: "medium",
      status: "pending",
    },
  ]

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen animate-fade-in">
      {/* Header with Profile */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setShowProfile(true)} className="p-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
          </Avatar>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{task.task}</h3>
                    <p className="text-sm text-gray-600">{task.assignee}</p>
                    <p className="text-xs text-gray-500">{task.time}</p>
                  </div>

                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      activity.status === "completed"
                        ? "bg-green-100"
                        : activity.status === "warning"
                          ? "bg-yellow-100"
                          : "bg-blue-100"
                    }`}
                  >
                    {activity.status === "completed" ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : activity.status === "warning" ? (
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Bottom Sheet */}
      <BottomSheet isOpen={showProfile} onClose={() => setShowProfile(false)}>
        <div className="p-6 space-y-6">
          <div className="text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback className="bg-blue-600 text-white text-2xl">JD</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
            <p className="text-gray-600">Household Manager</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Building2 className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Property</p>
                <p className="text-sm text-gray-600">Luxury Villa, Downtown</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Phone</p>
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">john.doe@email.com</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
              <User className="w-5 h-5" />
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
              <Settings className="w-5 h-5" />
              Settings
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 text-red-600 hover:text-red-700 bg-transparent"
              onClick={handleSignOut}
              disabled={isSigningOut}
            >
              {isSigningOut ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
              {isSigningOut ? "Signing Out..." : "Sign Out"}
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
