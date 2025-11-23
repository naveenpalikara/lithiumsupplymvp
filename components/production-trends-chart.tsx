"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Plus, Minus } from "lucide-react"

const ProductionTrendsChart = () => {
  const [chartData] = useState([
    {
      month: "Jun",
      mining: 185,
      processing: 10.2,
      battery: 21.5,
      targetMining: 190,
      targetProcessing: 10.5,
      targetBattery: 22,
    },
    {
      month: "Jul",
      mining: 192,
      processing: 10.5,
      battery: 22.1,
      targetMining: 190,
      targetProcessing: 10.5,
      targetBattery: 22,
    },
    {
      month: "Aug",
      mining: 178,
      processing: 10.8,
      battery: 23.2,
      targetMining: 190,
      targetProcessing: 10.5,
      targetBattery: 22,
    },
    {
      month: "Sep",
      mining: 205,
      processing: 11.1,
      battery: 20.8,
      targetMining: 190,
      targetProcessing: 10.5,
      targetBattery: 22,
    },
    {
      month: "Oct",
      mining: 210,
      processing: 11.5,
      battery: 24.5,
      targetMining: 190,
      targetProcessing: 10.5,
      targetBattery: 22,
    },
    {
      month: "Nov",
      mining: 195,
      processing: 12.0,
      battery: 25.0,
      targetMining: 190,
      targetProcessing: 10.5,
      targetBattery: 22,
    },
  ])

  const [visibleLines, setVisibleLines] = useState({
    mining: true,
    processing: true,
    battery: true,
  })

  const [showTargets, setShowTargets] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  const handleLineToggle = (line: string) => {
    setVisibleLines((prev) => ({
      ...prev,
      [line]: !prev[line],
    }))
  }

  const handleZoom = (direction: "in" | "out") => {
    setZoomLevel((prev) => {
      if (direction === "in") {
        return Math.min(prev + 0.2, 2)
      } else {
        return Math.max(prev - 0.2, 0.8)
      }
    })
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const miningPrev =
        chartData[Math.max(0, chartData.findIndex((d) => d.month === label) - 1)]?.mining || data.mining
      const miningChange = (((data.mining - miningPrev) / miningPrev) * 100).toFixed(1)
      const processingPrev =
        chartData[Math.max(0, chartData.findIndex((d) => d.month === label) - 1)]?.processing || data.processing
      const processingChange = (((data.processing - processingPrev) / processingPrev) * 100).toFixed(1)
      const batteryPrev =
        chartData[Math.max(0, chartData.findIndex((d) => d.month === label) - 1)]?.battery || data.battery
      const batteryChange = (((data.battery - batteryPrev) / batteryPrev) * 100).toFixed(1)

      return (
        <div className="bg-slate-900 border border-slate-700 rounded p-3 shadow-lg">
          <p className="text-white font-semibold text-sm">{label} 2024</p>
          {visibleLines.mining && (
            <p className="text-purple-400 text-sm">
              Mining: {data.mining}K tonnes{" "}
              <span className="text-purple-300">
                ({miningChange > 0 ? "+" : ""}
                {miningChange}%)
              </span>
            </p>
          )}
          {visibleLines.processing && (
            <p className="text-cyan-400 text-sm">
              Processing: {data.processing}K tonnes{" "}
              <span className="text-cyan-300">
                ({processingChange > 0 ? "+" : ""}
                {processingChange}%)
              </span>
            </p>
          )}
          {visibleLines.battery && (
            <p className="text-lime-400 text-sm">
              Battery: {data.battery} GWh{" "}
              <span className="text-lime-300">
                ({batteryChange > 0 ? "+" : ""}
                {batteryChange}%)
              </span>
            </p>
          )}
        </div>
      )
    }
    return null
  }

  const handleLegendClick = (e: any) => {
    const dataKey = e.dataKey
    if (["mining", "processing", "battery"].includes(dataKey)) {
      handleLineToggle(dataKey)
    }
  }

  return (
    <div className="w-full" style={{ height: "450px" }}>
      {/* Header with controls */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground">6-Month Production Trends</h3>
          <p className="text-sm text-muted-foreground">Comparison across supply chain stages</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Zoom controls */}
          <div className="flex gap-1 bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => handleZoom("out")}
              className="p-1.5 hover:bg-slate-700 rounded transition-colors"
              title="Zoom out"
            >
              <Minus size={16} className="text-slate-400" />
            </button>
            <button
              onClick={() => handleZoom("in")}
              className="p-1.5 hover:bg-slate-700 rounded transition-colors"
              title="Zoom in"
            >
              <Plus size={16} className="text-slate-400" />
            </button>
          </div>

          {/* Target toggle */}
          <button
            onClick={() => setShowTargets(!showTargets)}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              showTargets ? "bg-primary text-primary-foreground" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {showTargets ? "Hide" : "Show"} Targets
          </button>
        </div>
      </div>

      {/* Chart container */}
      <div className="bg-slate-900 rounded-lg p-4 border border-slate-800" style={{ height: "380px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 60, left: 60, bottom: 5 }}
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center" }}
          >
            <defs>
              <linearGradient id="gradientMining" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradientProcessing" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradientBattery" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#84cc16" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#84cc16" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={true} />

            <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />

            <YAxis
              yAxisId="left"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              label={{ value: "Tonnes (K)", angle: -90, position: "insideLeft", fill: "#94a3b8" }}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              label={{ value: "GWh", angle: 90, position: "insideRight", fill: "#94a3b8" }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              onClick={handleLegendClick}
              wrapperStyle={{ cursor: "pointer", paddingTop: "20px" }}
              iconType="circle"
              textValue="Interactive legend"
            />

            {/* Mining Production line */}
            {visibleLines.mining && (
              <>
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="mining"
                  stroke="#a78bfa"
                  strokeWidth={2.5}
                  dot={{ fill: "#a78bfa", r: 4 }}
                  activeDot={{ r: 6 }}
                  fill="url(#gradientMining)"
                  animationDuration={1000}
                  name="Mining Production"
                />
                {showTargets && (
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="targetMining"
                    stroke="#a78bfa"
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                    animationDuration={1000}
                    name="Mining Target"
                  />
                )}
              </>
            )}

            {/* Processing Output line */}
            {visibleLines.processing && (
              <>
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="processing"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  dot={{ fill: "#06b6d4", r: 4 }}
                  activeDot={{ r: 6 }}
                  fill="url(#gradientProcessing)"
                  animationDuration={1000}
                  name="Processing Output"
                />
                {showTargets && (
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="targetProcessing"
                    stroke="#06b6d4"
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                    animationDuration={1000}
                    name="Processing Target"
                  />
                )}
              </>
            )}

            {/* Battery Manufacturing line */}
            {visibleLines.battery && (
              <>
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="battery"
                  stroke="#84cc16"
                  strokeWidth={2.5}
                  dot={{ fill: "#84cc16", r: 4 }}
                  activeDot={{ r: 6 }}
                  fill="url(#gradientBattery)"
                  animationDuration={1000}
                  name="Battery Manufacturing"
                />
                {showTargets && (
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="targetBattery"
                    stroke="#84cc16"
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                    animationDuration={1000}
                    name="Battery Target"
                  />
                )}
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend explanation */}
      <div className="mt-4 flex gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
          <span>Mining (K tonnes)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
          <span>Processing (K tonnes)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-lime-400"></div>
          <span>Battery (GWh)</span>
        </div>
      </div>
    </div>
  )
}

export default ProductionTrendsChart
