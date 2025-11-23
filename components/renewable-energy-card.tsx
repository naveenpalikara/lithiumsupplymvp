"use client"

import { useState } from "react"
import { Zap } from "lucide-react"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

const energyData = [
  { name: "Solar", value: 20, color: "#fbbf24" },
  { name: "Wind", value: 10, color: "#38bdf8" },
  { name: "Hydro", value: 5, color: "#22d3ee" },
  { name: "Grid", value: 65, color: "#475569" },
]

const renewableData = [
  { name: "Renewable", value: 35 },
  { name: "Grid", value: 65 },
]

export function RenewableEnergyCard() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="relative bg-[#1E293B] border border-white/10 rounded-lg p-6 cursor-pointer hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 overflow-hidden group"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <Zap className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <h3 className="text-sm text-white/70 font-medium leading-tight">Renewable Energy Mix</h3>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="pb-6">
          {/* Circular progress */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-20 h-20 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={renewableData}
                    cx="50%"
                    cy="50%"
                    innerRadius={28}
                    outerRadius={40}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    isAnimationActive={true}
                    animationDuration={1000}
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#475569" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-emerald-400">35%</span>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-white/80">Solar 20%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="text-white/80">Wind 10%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-white/80">Hydro 5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Target Footer Section */}
        <div className="mt-2 pt-3 border-t border-white/5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/60">Target by 2026:</span>
            <span className="text-emerald-400 font-semibold">50%</span>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-2 animate-in fade-in duration-200">
            <p className="text-xs text-white/60 leading-relaxed">Progress toward sustainability goals:</p>
            <div className="space-y-2 text-xs text-white/50 leading-relaxed">
              <p>Current renewable energy mix: 35% of total consumption</p>
              <p>2026 target: 50% renewable sources</p>
              <p>Requires 15 percentage point increase through expanded solar and wind capacity</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
