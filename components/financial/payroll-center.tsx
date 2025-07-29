"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, DollarSign, TrendingUp, TrendingDown, Plus, FileText } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PayrollRecord {
  id: string
  worker: string
  baseSalary: number
  bonuses: number
  deductions: number
  totalSalary: number
  month: string
}

interface RewardPunishment {
  id: string
  worker: string
  type: "reward" | "punishment"
  amount: number
  reason: string
  date: string
  evidence?: string
}

export function PayrollCenter() {
  const [payrollData] = useState<PayrollRecord[]>([
    {
      id: "1",
      worker: "Maria",
      baseSalary: 3000,
      bonuses: 200,
      deductions: 100,
      totalSalary: 3100,
      month: "2024年1月",
    },
    {
      id: "2",
      worker: "Ana",
      baseSalary: 2800,
      bonuses: 150,
      deductions: 0,
      totalSalary: 2950,
      month: "2024年1月",
    },
  ])

  const [rewardPunishments] = useState<RewardPunishment[]>([
    {
      id: "1",
      worker: "Maria",
      type: "reward",
      amount: 100,
      reason: "出色完成清洁任务",
      date: "2024-01-15",
    },
    {
      id: "2",
      worker: "Maria",
      type: "punishment",
      amount: 50,
      reason: "打破餐具",
      date: "2024-01-10",
      evidence: "damage_photo.jpg",
    },
    {
      id: "3",
      worker: "Ana",
      type: "reward",
      amount: 150,
      reason: "菜品质量优秀",
      date: "2024-01-12",
    },
  ])

  const totalPayroll = payrollData.reduce((sum, record) => sum + record.totalSalary, 0)
  const totalProcurement = 1240 // 示例采购支出
  const totalRewards = 350 // 示例奖励支出

  const getDeductionWarning = (deduction: number, baseSalary: number) => {
    const percentage = (deduction / baseSalary) * 100
    return percentage > 20
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">工资结算中心</h1>
          <p className="text-gray-600">管理工资和奖惩记录</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          添加奖惩
        </Button>
      </div>

      {/* Monthly Expense Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            本月支出仪表盘
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">¥{totalPayroll + totalProcurement + totalRewards}</p>
              <p className="text-sm text-gray-600">总支出</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">工资支出</span>
                <span className="font-medium">¥{totalPayroll}</span>
              </div>
              <Progress
                value={(totalPayroll / (totalPayroll + totalProcurement + totalRewards)) * 100}
                className="h-2"
              />

              <div className="flex items-center justify-between">
                <span className="text-sm">采购支出</span>
                <span className="font-medium">¥{totalProcurement}</span>
              </div>
              <Progress
                value={(totalProcurement / (totalPayroll + totalProcurement + totalRewards)) * 100}
                className="h-2 bg-blue-100"
              />

              <div className="flex items-center justify-between">
                <span className="text-sm">奖惩支出</span>
                <span className="font-medium">¥{totalRewards}</span>
              </div>
              <Progress
                value={(totalRewards / (totalPayroll + totalProcurement + totalRewards)) * 100}
                className="h-2 bg-green-100"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            工资单生成器
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payrollData.map((record) => {
              const hasExcessiveDeduction = getDeductionWarning(record.deductions, record.baseSalary)

              return (
                <div key={record.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{record.worker}</h3>
                    <Badge variant="outline">{record.month}</Badge>
                  </div>

                  {hasExcessiveDeduction && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        扣款超过基础工资20%，请确保符合劳动法规定
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">基础工资</p>
                      <p className="font-medium">¥{record.baseSalary}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 flex items-center gap-1">
                        奖励 <TrendingUp className="w-3 h-3 text-green-500" />
                      </p>
                      <p className="font-medium text-green-600">+¥{record.bonuses}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 flex items-center gap-1">
                        扣款 <TrendingDown className="w-3 h-3 text-red-500" />
                      </p>
                      <p className="font-medium text-red-600">-¥{record.deductions}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">实发工资</p>
                      <p className="font-bold text-lg">¥{record.totalSalary}</p>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    生成工资单
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Reward & Punishment Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>奖惩记录时间轴</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rewardPunishments.map((record, index) => (
              <div key={record.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${record.type === "reward" ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                  {index < rewardPunishments.length - 1 && <div className="w-px h-12 bg-gray-200 mt-2"></div>}
                </div>

                <div
                  className={`flex-1 p-3 rounded-lg ${
                    record.type === "reward" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{record.worker}</h4>
                    <Badge
                      className={record.type === "reward" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {record.type === "reward" ? "+" : "-"}¥{record.amount}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{record.reason}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{record.date}</span>
                    {record.evidence && (
                      <Button variant="outline" size="sm" className="text-xs bg-transparent">
                        查看凭证
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
