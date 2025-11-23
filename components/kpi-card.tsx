"use client"

import { type LucideIcon, ArrowUp } from "lucide-react"

interface KPICardProps {
  label: string
  value: string
  unit: string
  trend: string
  icon: LucideIcon
  isPositive: boolean
}

export default function KPICard({ label, value, unit, trend, icon: Icon, isPositive }: KPICardProps) {
  return (
    <div className="bg-gradient-to-br from-card to-card/80 border border-border rounded-lg p-5 shadow-lg hover:shadow-xl transition-shadow group">
      {/* Icon and trend */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold text-secondary">
          <ArrowUp className="w-4 h-4" />
          <span>{trend}</span>
        </div>
      </div>

      {/* Value */}
      <div className="mb-2">
        <p className="text-3xl font-bold font-mono text-foreground">{value}</p>
      </div>

      {/* Label and unit */}
      <div>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-xs text-muted-foreground/70">{unit}</p>
      </div>

      {/* Progress bar (for utilization) */}
      {label === "Average Utilization" && (
        <div className="mt-4 w-full bg-border rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-secondary w-[85.3%] rounded-full"></div>
        </div>
      )}
    </div>
  )
}
