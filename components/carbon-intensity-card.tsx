"use client"

import { useState } from "react"
import { Leaf } from "lucide-react"
import { AreaChart, Area, CartesianGrid, ResponsiveContainer } from "recharts"

const carbonData = [
  { month: "Jun", value: 3.2 },
  { month: "Jul", value: 3.3 },
  { month: "Aug", value: 3.4 },
  { month: "Sep", value: 3.5 },
  { month: "Oct", value: 3.6 },
  { month: "Nov", value: 3.5 },
]

export function CarbonIntensityCard() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="relative bg-[#1E293B] border border-white/10 rounded-lg p-6 cursor-pointer hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 overflow-hidden group"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <Leaf className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <h3 className="text-sm text-white/70 font-medium leading-tight">Average Carbon Intensity</h3>
          </div>
        </div>

        {/* Main Metric Value Section */}
        <div className="pb-6">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-4xl font-bold text-white">3.5</span>
            <span className="text-sm text-white/60">kg CO₂/tonne</span>
          </div>
          
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <div className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-md border border-amber-400/20">
              ⚠️ 9% above target
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-4">
          <div className="h-20 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={carbonData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#fbbf24"
                  fill="url(#carbonGradient)"
                  isAnimationActive={true}
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Target Footer Section */}
        <div className="mt-2 pt-3 border-t border-white/5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/60">Target:</span>
            <span className="text-white font-semibold">3.2 kg CO₂/tonne</span>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-2 animate-in fade-in duration-200">
            <p className="text-xs text-white/60 leading-relaxed">
              Trend shows increasing carbon intensity in recent months.
            </p>
            <p className="text-xs text-white/50 leading-relaxed">
              Focus on renewable energy adoption and process optimization to reach 3.2 target.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
