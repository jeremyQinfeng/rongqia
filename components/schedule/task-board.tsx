"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Plus, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  deadline: string
  assignee?: string
  status: "pending" | "in-progress" | "completed"
}

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "清洁客厅",
      description: "吸尘、拖地、整理沙发",
      priority: "high",
      deadline: "2小时后",
      assignee: "Maria",
      status: "in-progress",
    },
    {
      id: "2",
      title: "准备午餐",
      description: "红烧肉、青菜、米饭",
      priority: "high",
      deadline: "1小时后",
      status: "pending",
    },
    {
      id: "3",
      title: "洗衣服",
      description: "分类洗涤、晾晒",
      priority: "medium",
      deadline: "今天下午",
      assignee: "Maria",
      status: "completed",
    },
  ])

  const workers = [
    { id: "1", name: "Maria", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "2", name: "Ana", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status)
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const isUrgent = (deadline: string) => {
    return deadline.includes("小时") && Number.parseInt(deadline) <= 2
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">任务分派</h1>
          <p className="text-gray-600">拖拽任务到工人头像进行分配</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          新建任务
        </Button>
      </div>

      {/* Workers */}
      <div className="flex gap-4 p-4 bg-white rounded-lg border">
        <p className="text-sm font-medium text-gray-700 self-center">工人:</p>
        {workers.map((worker) => (
          <div key={worker.id} className="flex flex-col items-center gap-2">
            <Avatar className="w-12 h-12 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
              <AvatarImage src={worker.avatar || "/placeholder.svg"} />
              <AvatarFallback>{worker.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium">{worker.name}</span>
          </div>
        ))}
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pending Tasks */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <h3 className="font-semibold text-gray-700">待分派 ({getTasksByStatus("pending").length})</h3>
          </div>
          <div className="space-y-3">
            {getTasksByStatus("pending").map((task) => (
              <Card
                key={task.id}
                className={cn(
                  "cursor-move hover:shadow-md transition-all duration-200",
                  isUrgent(task.deadline) && "ring-2 ring-red-400 animate-pulse",
                )}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium">{task.title}</h4>
                      {isUrgent(task.deadline) && <AlertTriangle className="w-4 h-4 text-red-500 animate-bounce" />}
                    </div>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority === "high" ? "高优先级" : task.priority === "medium" ? "中优先级" : "低优先级"}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {task.deadline}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* In Progress Tasks */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <h3 className="font-semibold text-gray-700">进行中 ({getTasksByStatus("in-progress").length})</h3>
          </div>
          <div className="space-y-3">
            {getTasksByStatus("in-progress").map((task) => (
              <Card key={task.id} className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">{task.assignee?.[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {task.deadline}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h3 className="font-semibold text-gray-700">已完成 ({getTasksByStatus("completed").length})</h3>
          </div>
          <div className="space-y-3">
            {getTasksByStatus("completed").map((task) => (
              <Card key={task.id} className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-green-800">{task.title}</h4>
                    <p className="text-sm text-green-600">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">{task.assignee?.[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-green-700">{task.assignee}</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">完成</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
