"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, TrendingUp, AlertTriangle, ShoppingCart, Receipt } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProcurementItem {
  id: string
  name: string
  worker: string
  price: number
  marketPrice: number
  date: string
  receipt?: string
  status: "normal" | "warning" | "alert"
}

export function ProcurementMonitoring() {
  const [procurementData] = useState<ProcurementItem[]>([
    {
      id: "1",
      name: "猪肉",
      worker: "Maria",
      price: 32,
      marketPrice: 28,
      date: "今天",
      status: "warning",
    },
    {
      id: "2",
      name: "青菜",
      worker: "Ana",
      price: 8,
      marketPrice: 10,
      date: "今天",
      status: "normal",
    },
    {
      id: "3",
      name: "鸡蛋",
      worker: "Maria",
      price: 18,
      marketPrice: 12,
      date: "昨天",
      status: "alert",
    },
    {
      id: "4",
      name: "大米",
      worker: "Ana",
      price: 25,
      marketPrice: 26,
      date: "昨天",
      status: "normal",
    },
  ])

  const getPriceVariance = (price: number, marketPrice: number) => {
    return (((price - marketPrice) / marketPrice) * 100).toFixed(1)
  }

  const getStatusColor = (status: ProcurementItem["status"]) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800 border-green-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "alert":
        return "bg-red-100 text-red-800 border-red-200"
    }
  }

  const totalSpent = procurementData.reduce((sum, item) => sum + item.price, 0)
  const avgVariance =
    procurementData.reduce((sum, item) => {
      return sum + Number.parseFloat(getPriceVariance(item.price, item.marketPrice))
    }, 0) / procurementData.length

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">采购监控</h1>
          <p className="text-gray-600">实时比价和支出分析</p>
        </div>
        <Button size="sm" className="gap-2">
          <Camera className="w-4 h-4" />
          扫描小票
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">今日支出</p>
                <p className="text-2xl font-bold">¥{totalSpent}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "text-white",
            avgVariance > 0
              ? "bg-gradient-to-r from-red-500 to-red-600"
              : "bg-gradient-to-r from-green-500 to-green-600",
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm", avgVariance > 0 ? "text-red-100" : "text-green-100")}>平均溢价</p>
                <p className="text-2xl font-bold">
                  {avgVariance > 0 ? "+" : ""}
                  {avgVariance.toFixed(1)}%
                </p>
              </div>
              <TrendingUp className={cn("w-8 h-8", avgVariance > 0 ? "text-red-200" : "text-green-200")} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Price Comparison Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            价格比较热力图
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {procurementData.map((item) => {
              const variance = Number.parseFloat(getPriceVariance(item.price, item.marketPrice))
              const isOverpriced = variance > 30

              return (
                <div
                  key={item.id}
                  className={cn(
                    "p-4 rounded-lg border transition-all duration-200",
                    isOverpriced && "ring-2 ring-red-400 bg-red-50",
                    item.status === "warning" && "bg-yellow-50 border-yellow-200",
                    item.status === "normal" && "bg-green-50 border-green-200",
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        {item.name}
                        {isOverpriced && <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />}
                      </h3>
                      <p className="text-sm text-gray-600">采购员: {item.worker}</p>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {variance > 0 ? "+" : ""}
                      {variance}%
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>实际价格: ¥{item.price}</span>
                      <span>市场价格: ¥{item.marketPrice}</span>
                    </div>
                    <Progress
                      value={Math.min(100, (item.price / item.marketPrice) * 100)}
                      className={cn("h-2", variance > 30 && "bg-red-200")}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">{item.date}</span>
                    <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                      <Receipt className="w-3 h-3" />
                      查看小票
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* OCR Scanner */}
      <Card className="border-dashed border-2 border-gray-300">
        <CardContent className="p-6 text-center">
          <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="font-medium mb-2">小票OCR识别</h3>
          <p className="text-sm text-gray-600 mb-4">拍照自动提取商品价格信息</p>
          <Button className="gap-2">
            <Camera className="w-4 h-4" />
            开始扫描
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
