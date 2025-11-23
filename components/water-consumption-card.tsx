"use client"

import { useState } from "react"
import { Droplet } from "lucide-react"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const waterData = [
  { intensity: 4.8, efficiency: 92 },
  { intensity: 5.0, efficiency: 88 },
  { intensity: 5.1, efficiency: 85 },
  { intensity: 5.2, efficiency: 82 },
  { intensity: 5.3, efficiency: 78 },
  { intensity: 5.4, efficiency: 75 },
  { intensity: 5.5, efficiency: 70 },
]

export function WaterConsumptionCard() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="relative bg-[#1E293B] border border-white/10 rounded-lg p-6 cursor-pointer hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 overflow-hidden group"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <Droplet className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <h3 className="text-sm text-white/70 font-medium leading-tight">Water Usage Efficiency</h3>
          </div>
        </div>

        {/* Main Metric Value Section */}
        <div className="pb-6">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-4xl font-bold text-white">5,200</span>
            <span className="text-sm text-white/60">m³/tonne</span>
          </div>
          
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <div className="text-xs font-semibold text-cyan-400 bg-cyan-400/10 px-3 py-1.5 rounded-md border border-cyan-400/20">
              Average consumption
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-4">
          <div className="h-20 -mx-2">
          <div className="h-20 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="intensity"
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fontSize: 10 }}
                  type="number"
                  domain={[4.5, 5.5]}
                />
                <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 10 }} domain={[65, 95]} />
                <Scatter
                  name="Facilities"
                  data={waterData}
                  fill="#06b6d4"
                  fillOpacity={0.6}
                  isAnimationActive={true}
                  animationDuration={1000}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Range Footer Section */}
        <div className="mt-2 pt-3 border-t border-white/5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/60">Range:</span>
            <span className="text-white font-semibold">4,800 - 5,500 m³/tonne</span>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-2 animate-in fade-in duration-200">
            <p className="text-xs text-white/60 leading-relaxed">
              Facilities show inverse relationship between intensity and efficiency.
            </p>
            <p className="text-xs text-white/50 leading-relaxed">
              Lower water intensity correlates with higher operational efficiency across processing facilities.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
