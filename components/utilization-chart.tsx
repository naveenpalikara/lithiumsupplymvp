"use client"

import { useState } from "react"
import { Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from "recharts"

interface UtilizationData {
  stage: string
  utilized: number
  unused: number
  absoluteUtilized?: number
  absoluteUnused?: number
  capacity?: string
  utilizedText?: string
}

export function UtilizationChart() {
  const [isPercentage, setIsPercentage] = useState(true)

  // Data for percentage view
  const percentageData: UtilizationData[] = [
    {
      stage: "Mining Operations",
      utilized: 85.3,
      unused: 14.7,
      absoluteUtilized: 1.706,
      absoluteUnused: 0.294,
      capacity: "Mining: 1.706M / 2.0M tonnes",
      utilizedText: "85.3%",
    },
    {
      stage: "Processing Facilities",
      utilized: 78.1,
      unused: 21.9,
      absoluteUtilized: 1.248,
      absoluteUnused: 0.352,
      capacity: "Processing: 1.248M / 1.6M tonnes",
      utilizedText: "78.1%",
    },
    {
      stage: "Battery Manufacturing",
      utilized: 82.4,
      unused: 17.6,
      absoluteUtilized: 240.2,
      absoluteUnused: 51.3,
      capacity: "Battery: 240.2 / 291.5 GWh",
      utilizedText: "82.4%",
    },
  ]

  // Data for absolute values view
  const absoluteData: UtilizationData[] = [
    {
      stage: "Mining Operations",
      utilized: 1.706,
      unused: 0.294,
      absoluteUtilized: 1.706,
      absoluteUnused: 0.294,
      capacity: "Mining: 1.706M / 2.0M tonnes",
      utilizedText: "1.706M tonnes",
    },
    {
      stage: "Processing Facilities",
      utilized: 1.248,
      unused: 0.352,
      absoluteUtilized: 1.248,
      absoluteUnused: 0.352,
      capacity: "Processing: 1.248M / 1.6M tonnes",
      utilizedText: "1.248M tonnes",
    },
    {
      stage: "Battery Manufacturing",
      utilized: 240.2,
      unused: 51.3,
      absoluteUtilized: 240.2,
      absoluteUnused: 51.3,
      capacity: "Battery: 240.2 / 291.5 GWh",
      utilizedText: "240.2 GWh",
    },
  ]

  const data = isPercentage ? percentageData : absoluteData
  const maxValue = isPercentage ? 100 : 2

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold">{data.stage}</p>
          <p className="text-cyan-400 text-sm">{data.capacity}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Capacity Utilization by Stage</h2>
          <p className="text-sm text-muted-foreground">Current vs Target Efficiency</p>
        </div>
        <button
          onClick={() => setIsPercentage(!isPercentage)}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors duration-200"
        >
          {isPercentage ? "Show Absolute Values" : "Show Percentage"}
        </button>
      </div>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 160, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis type="number" domain={[0, maxValue]} stroke="#cbd5e1" />
            <YAxis dataKey="stage" type="category" stroke="#cbd5e1" tick={{ fill: "#cbd5e1" }} width={150} />

            {isPercentage && (
              <Line x1="90%" y1="0%" x2="90%" y2="100%" stroke="#ef4444" strokeDasharray="5 5" strokeWidth={2} />
            )}

            <Tooltip content={<CustomTooltip />} />

            <Bar dataKey="utilized" stackId="a" fill="#10b981" radius={[0, 8, 8, 0]} isAnimationActive>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "#22c55e" : index === 1 ? "#06b6d4" : "#84cc16"} />
              ))}
            </Bar>
            <Bar dataKey="unused" stackId="a" fill="#475569" radius={[0, 8, 8, 0]} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 space-y-4">
        {data.map((item, index) => {
          const colors = [
            { utilized: "from-green-500 to-emerald-600", unused: "bg-slate-600" },
            { utilized: "from-cyan-500 to-blue-600", unused: "bg-slate-600" },
            { utilized: "from-lime-500 to-green-600", unused: "bg-slate-600" },
          ]

          const utilized = item.utilized
          const unused = item.unused

          return (
            <div key={item.stage} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">{item.stage}</span>
                <span className="text-sm font-semibold text-primary">{item.utilizedText}</span>
              </div>

              <div className="flex h-12 bg-slate-700 rounded-lg overflow-hidden border border-slate-600">
                <div
                  className={`bg-gradient-to-r ${colors[index].utilized} flex items-center justify-center transition-all duration-500 ease-out`}
                  style={{ width: `${utilized}%` }}
                >
                  {utilized > 5 && <span className="text-white text-sm font-bold">{utilized.toFixed(1)}%</span>}
                </div>
                <div
                  className={`${colors[index].unused} flex items-center justify-center transition-all duration-500 ease-out`}
                  style={{ width: `${unused}%` }}
                >
                  {unused > 5 && <span className="text-slate-300 text-sm font-bold">{unused.toFixed(1)}%</span>}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-700 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-red-500 border-t-2 border-dashed border-red-500"></div>
          <span className="text-sm text-foreground">90% Target</span>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded"></div>
            <span className="text-muted-foreground">Mining Utilized</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded"></div>
            <span className="text-muted-foreground">Processing Utilized</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-lime-500 to-green-600 rounded"></div>
            <span className="text-muted-foreground">Battery Utilized</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-600 rounded"></div>
            <span className="text-muted-foreground">Unused Capacity</span>
          </div>
        </div>
      </div>
    </div>
  )
}
