"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  Clock,
  Calendar,
  DollarSign,
  User,
  Settings,
  LogOut,
  FileText,
  CalendarDays,
  Wallet,
  Loader2,
} from "lucide-react"
import { BottomSheet } from "@/components/ui/bottom-sheet"

export function WorkerDashboard() {
  const [showProfile, setShowProfile] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)

    // Simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Navigate back to role selection page
    window.location.href = "/"
  }

  const todayTasks = [
    {
      id: 1,
      title: "Kitchen Deep Clean",
      time: "9:00 AM - 11:00 AM",
      status: "completed",
      priority: "high",
    },
    {
      id: 2,
      title: "Laundry Service",
      time: "11:30 AM - 1:00 PM",
      status: "in-progress",
      priority: "medium",
    },
    {
      id: 3,
      title: "Grocery Shopping",
      time: "2:00 PM - 4:00 PM",
      status: "pending",
      priority: "high",
    },
    {
      id: 4,
      title: "Living Room Cleaning",
      time: "4:30 PM - 6:00 PM",
      status: "pending",
      priority: "low",
    },
  ]

  const weeklyProgress = {
    completed: 28,
    total: 35,
    percentage: 80,
  }

  const upcomingSchedule = [
    { day: "Tomorrow", tasks: 6, highlight: "Deep cleaning day" },
    { day: "Wednesday", tasks: 4, highlight: "Grocery shopping" },
    { day: "Thursday", tasks: 5, highlight: "Laundry day" },
  ]

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header with Profile */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Worker Dashboard</h1>
          <p className="text-gray-600">Good morning, Maria! Ready for today's tasks?</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setShowProfile(true)} className="p-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-green-600 text-white">MS</AvatarFallback>
          </Avatar>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Tasks Today</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Completed</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <Clock className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">This Week</p>
                <p className="text-2xl font-bold">80%</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Earnings</p>
                <p className="text-2xl font-bold">$1,200</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Today's Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        task.status === "completed"
                          ? "bg-green-500"
                          : task.status === "in-progress"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                      }`}
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-600">{task.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                      }
                    >
                      {task.priority}
                    </Badge>
                    <Badge
                      variant={
                        task.status === "completed"
                          ? "default"
                          : task.status === "in-progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress & Upcoming */}
        <div className="space-y-6">
          {/* Weekly Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Tasks Completed</span>
                  <span className="text-sm text-gray-600">
                    {weeklyProgress.completed}/{weeklyProgress.total}
                  </span>
                </div>
                <Progress value={weeklyProgress.percentage} className="h-3" />
                <p className="text-sm text-gray-600">
                  Great job! You're {weeklyProgress.percentage}% done with this week's tasks.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingSchedule.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{day.day}</p>
                      <p className="text-sm text-gray-600">{day.highlight}</p>
                    </div>
                    <Badge variant="outline">{day.tasks} tasks</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <CheckCircle className="w-6 h-6" />
              <span className="text-sm">Mark Complete</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Calendar className="w-6 h-6" />
              <span className="text-sm">View Schedule</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <DollarSign className="w-6 h-6" />
              <span className="text-sm">Financial Info</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Clock className="w-6 h-6" />
              <span className="text-sm">Time Tracker</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Bottom Sheet */}
      <BottomSheet isOpen={showProfile} onClose={() => setShowProfile(false)}>
        <div className="p-6 space-y-6">
          <div className="text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback className="bg-green-600 text-white text-2xl">MS</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-gray-900">Maria Santos</h2>
            <p className="text-gray-600">Domestic Helper</p>
          </div>

          {/* Contract Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b pb-2">Contract Details</h3>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Contract Type</p>
                <p className="text-sm text-gray-600">Full-time Live-in Helper</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <CalendarDays className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Contract Expiry</p>
                <p className="text-sm text-gray-600">December 31, 2024</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Wallet className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Monthly Salary</p>
                <p className="text-sm text-gray-600">$1,200 USD</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Contract Status</p>
                <p className="text-sm text-green-700">Active & Valid</p>
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
