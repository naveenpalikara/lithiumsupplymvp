"use client"

import type React from "react"
import { useState, useRef } from "react"
import { ChevronRight } from "lucide-react"

interface Node {
  id: string
  name: string
  stage: "mining" | "processing" | "battery"
  capacity: number
  utilization: number
  location?: string
}

interface Link {
  source: string
  target: string
  value: number
  isBottleneck?: boolean
}

const SANKEY_DATA = {
  nodes: [
    // Mining
    {
      id: "greenbushes",
      name: "Greenbushes Mine",
      stage: "mining",
      capacity: 280000,
      utilization: 92,
      location: "Australia",
    },
    {
      id: "mt-marion",
      name: "Mt Marion Mine",
      stage: "mining",
      capacity: 145000,
      utilization: 88,
      location: "Australia",
    },
    {
      id: "pilgangoora",
      name: "Pilgangoora Mine",
      stage: "mining",
      capacity: 260000,
      utilization: 85,
      location: "Australia",
    },
    {
      id: "atacama",
      name: "Atacama Salar",
      stage: "mining",
      capacity: 120000,
      utilization: 78,
      location: "Chile",
    },
    {
      id: "cauchari",
      name: "Cauchari-Olaroz",
      stage: "mining",
      capacity: 40000,
      utilization: 65,
      location: "Argentina",
    },
    {
      id: "maricunga",
      name: "Maricunga",
      stage: "mining",
      capacity: 90000,
      utilization: 72,
      location: "Chile",
    },
    {
      id: "olaroz",
      name: "Olaroz",
      stage: "mining",
      capacity: 55000,
      utilization: 70,
      location: "Argentina",
    },
    {
      id: "orocobre",
      name: "Orocobre",
      stage: "mining",
      capacity: 120000,
      utilization: 82,
      location: "Argentina",
    },
    {
      id: "tianqi",
      name: "Tianqi Lithium",
      stage: "mining",
      capacity: 90000,
      utilization: 88,
      location: "China",
    },
    // Processing
    {
      id: "kwinana",
      name: "Kwinana Processing",
      stage: "processing",
      capacity: 24000,
      utilization: 94,
      location: "Australia",
    },
    {
      id: "kemerton",
      name: "Kemerton Processing",
      stage: "processing",
      capacity: 40000,
      utilization: 89,
      location: "Australia",
    },
    {
      id: "perth",
      name: "Perth Plant",
      stage: "processing",
      capacity: 18000,
      utilization: 91,
      location: "Australia",
    },
    {
      id: "sqm-chile",
      name: "SQM Chile",
      stage: "processing",
      capacity: 40000,
      utilization: 86,
      location: "Chile",
    },
    {
      id: "lithium-argentina",
      name: "Lithium Argentina",
      stage: "processing",
      capacity: 15000,
      utilization: 75,
      location: "Argentina",
    },
    // Battery Manufacturing
    {
      id: "tesla-nevada",
      name: "Tesla Nevada",
      stage: "battery",
      capacity: 38,
      utilization: 85,
      location: "USA",
    },
    {
      id: "catl-ningde",
      name: "CATL Ningde",
      stage: "battery",
      capacity: 150,
      utilization: 92,
      location: "China",
    },
    {
      id: "lg-ochang",
      name: "LG Ochang",
      stage: "battery",
      capacity: 42,
      utilization: 88,
      location: "South Korea",
    },
    {
      id: "byd-qin",
      name: "BYD Qin",
      stage: "battery",
      capacity: 85,
      utilization: 90,
      location: "China",
    },
    {
      id: "sk-innovation",
      name: "SK Innovation",
      stage: "battery",
      capacity: 45,
      utilization: 83,
      location: "South Korea",
    },
  ] as Node[],

  links: [
    // Greenbushes flows
    { source: "greenbushes", target: "kwinana", value: 24000 },
    { source: "greenbushes", target: "kemerton", value: 20000 },

    // Mt Marion flows
    { source: "mt-marion", target: "kemerton", value: 20000 },
    { source: "mt-marion", target: "perth", value: 12000 },

    // Pilgangoora flows
    { source: "pilgangoora", target: "kwinana", value: 18000 },
    { source: "pilgangoora", target: "kemerton", value: 25000 },
    { source: "pilgangoora", target: "perth", value: 15000 },

    // Atacama flows
    { source: "atacama", target: "sqm-chile", value: 40000, isBottleneck: true },

    // Cauchari flows
    { source: "cauchari", target: "lithium-argentina", value: 15000 },

    // Other mining flows
    { source: "maricunga", target: "sqm-chile", value: 20000 },
    { source: "olaroz", target: "lithium-argentina", value: 15000 },
    { source: "orocobre", target: "lithium-argentina", value: 25000 },
    { source: "tianqi", target: "catl-ningde", value: 50000 },

    // Processing to Battery flows
    { source: "kwinana", target: "tesla-nevada", value: 10000 },
    { source: "kwinana", target: "lg-ochang", value: 8000 },
    { source: "kwinana", target: "catl-ningde", value: 25000 },

    { source: "kemerton", target: "tesla-nevada", value: 12000 },
    { source: "kemerton", target: "catl-ningde", value: 35000 },
    { source: "kemerton", target: "byd-qin", value: 15000 },

    { source: "perth", target: "lg-ochang", value: 10000 },
    { source: "perth", target: "sk-innovation", value: 8000 },

    { source: "sqm-chile", target: "lg-ochang", value: 24000, isBottleneck: true },
    { source: "sqm-chile", target: "byd-qin", value: 20000 },

    {
      source: "lithium-argentina",
      target: "sk-innovation",
      value: 15000,
      isBottleneck: true,
    },
  ] as Link[],
}

export function SankeyDiagram() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [highlightedPaths, setHighlightedPaths] = useState<Set<string>>(new Set())
  const [tooltip, setTooltip] = useState<{
    node: Node
    x: number
    y: number
  } | null>(null)

  const padding = 60
  const nodeWidth = 140
  const nodeHeight = 50
  const nodeRadius = 8
  const stageSpacing = 350

  // Calculate node positions
  const nodePositions = new Map<string, { x: number; y: number }>()
  const stages = ["mining", "processing", "battery"] as const
  const nodesByStage = {
    mining: SANKEY_DATA.nodes.filter((n) => n.stage === "mining"),
    processing: SANKEY_DATA.nodes.filter((n) => n.stage === "processing"),
    battery: SANKEY_DATA.nodes.filter((n) => n.stage === "battery"),
  }

  const yOffset = 0
  stages.forEach((stage, stageIndex) => {
    const nodes = nodesByStage[stage]
    const stageHeight = nodes.length * 70 + 20
    const startY = padding + (800 - stageHeight) / 2

    nodes.forEach((node, index) => {
      const x = padding + stageIndex * stageSpacing
      const y = startY + index * 70
      nodePositions.set(node.id, { x, y })
    })
  })

  const handleNodeClick = (nodeId: string) => {
    const paths = new Set<string>()

    // Find all connected paths
    SANKEY_DATA.links.forEach((link) => {
      if (link.source === nodeId) {
        paths.add(`${link.source}-${link.target}`)
      }
      if (link.target === nodeId) {
        paths.add(`${link.source}-${link.target}`)
      }
    })

    setHighlightedPaths(highlightedPaths.size === paths.size ? new Set() : paths)
  }

  const handleNodeHover = (nodeId: string, e: React.MouseEvent<SVGGElement>) => {
    const node = SANKEY_DATA.nodes.find((n) => n.id === nodeId)
    if (!node) return

    const rect = (e.currentTarget as SVGGElement).getBoundingClientRect()
    setTooltip({
      node,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    })
    setHoveredNode(nodeId)
  }

  // Render SVG paths (links)
  const renderLinks = () => {
    return SANKEY_DATA.links.map((link, index) => {
      const sourcePos = nodePositions.get(link.source)
      const targetPos = nodePositions.get(link.target)

      if (!sourcePos || !targetPos) return null

      const x1 = sourcePos.x + nodeWidth
      const y1 = sourcePos.y + nodeHeight / 2
      const x2 = targetPos.x
      const y2 = targetPos.y + nodeHeight / 2

      const controlX = (x1 + x2) / 2

      const isHighlighted = highlightedPaths.has(`${link.source}-${link.target}`)
      const isHovered = hoveredNode === link.source || hoveredNode === link.target

      // Link thickness proportional to capacity
      const maxValue = Math.max(...SANKEY_DATA.links.map((l) => l.value))
      const strokeWidth = 2 + (link.value / maxValue) * 15

      let strokeColor = "#06b6d4"
      let opacity = 0.4

      if (link.isBottleneck) {
        strokeColor = "#f59e0b"
        opacity = 0.6
      }

      if (isHighlighted) {
        opacity = 0.8
        if (link.isBottleneck) {
          strokeColor = "#ef4444"
        }
      } else if (isHovered) {
        opacity = 0.5
      } else if (highlightedPaths.size > 0) {
        opacity = 0.1
      }

      return (
        <g key={`link-${index}`}>
          <defs>
            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity={opacity} />
              <stop offset="50%" stopColor={strokeColor} stopOpacity={opacity} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={opacity} />
            </linearGradient>
          </defs>
          <path
            d={`M ${x1} ${y1} Q ${controlX} ${(y1 + y2) / 2} ${x2} ${y2}`}
            fill="none"
            stroke={`url(#gradient-${index})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="transition-all duration-300"
          />

          {/* Animated particles */}
          {isHighlighted && (
            <g>
              {[0, 0.33, 0.66].map((offset) => (
                <circle
                  key={`particle-${index}-${offset}`}
                  r="3"
                  fill={link.isBottleneck ? "#ef4444" : strokeColor}
                  opacity="0.8"
                >
                  <animateMotion dur="3s" repeatCount="indefinite" begin={`${offset}s`}>
                    <mpath href={`#path-${index}`} />
                  </animateMotion>
                </circle>
              ))}
              <path
                id={`path-${index}`}
                d={`M ${x1} ${y1} Q ${controlX} ${(y1 + y2) / 2} ${x2} ${y2}`}
                fill="none"
                stroke="none"
              />
            </g>
          )}
        </g>
      )
    })
  }

  // Render nodes
  const renderNodes = () => {
    return SANKEY_DATA.nodes.map((node) => {
      const pos = nodePositions.get(node.id)
      if (!pos) return null

      const isHighlighted = highlightedPaths.size === 0 || hoveredNode === node.id

      return (
        <g
          key={node.id}
          onMouseEnter={(e) => handleNodeHover(node.id, e)}
          onMouseLeave={() => {
            setHoveredNode(null)
            setTooltip(null)
          }}
          onClick={() => handleNodeClick(node.id)}
          className="cursor-pointer"
        >
          {/* Node background */}
          <rect
            x={pos.x}
            y={pos.y}
            width={nodeWidth}
            height={nodeHeight}
            rx={nodeRadius}
            fill={node.stage === "mining" ? "#a855f7" : node.stage === "processing" ? "#06b6d4" : "#22c55e"}
            opacity={highlightedPaths.size > 0 && !isHighlighted ? 0.2 : 0.85}
            className="transition-all duration-300"
            stroke={hoveredNode === node.id ? "#fbbf24" : "transparent"}
            strokeWidth="2"
          />

          {/* Node text */}
          <text
            x={pos.x + nodeWidth / 2}
            y={pos.y + nodeHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#ffffff"
            fontSize="12"
            fontWeight="bold"
            className="pointer-events-none"
          >
            {node.name}
          </text>
        </g>
      )
    })
  }

  return (
    <div className="space-y-4">
      <div className="relative bg-[#1e293b] rounded-lg border border-[#334155] p-6 shadow-lg overflow-x-auto">
        <svg ref={svgRef} width="1200" height="800" className="min-w-full" viewBox="0 0 1200 800">
          {/* Background */}
          <rect width="1200" height="800" fill="#1e293b" opacity="0.5" />

          {/* Stage labels */}
          <text x={padding + 70} y={30} textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="bold">
            MINING
          </text>
          <text
            x={padding + stageSpacing + 70}
            y={30}
            textAnchor="middle"
            fill="#cbd5e1"
            fontSize="14"
            fontWeight="bold"
          >
            PROCESSING
          </text>
          <text
            x={padding + 2 * stageSpacing + 70}
            y={30}
            textAnchor="middle"
            fill="#cbd5e1"
            fontSize="14"
            fontWeight="bold"
          >
            BATTERY MANUFACTURING
          </text>

          {/* Render flows and nodes */}
          {renderLinks()}
          {renderNodes()}
        </svg>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed bg-[#0f172a] border border-[#334155] rounded-lg p-3 text-white text-sm z-50 max-w-xs shadow-lg"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="font-bold text-[#0ea5e9]">{tooltip.node.name}</div>
          <div className="text-[#cbd5e1] text-xs mt-1">{tooltip.node.location}</div>
          <div className="text-[#cbd5e1] text-xs mt-2">
            Capacity:{" "}
            <span className="text-[#22c55e]">
              {(tooltip.node.capacity / 1000).toFixed(0)}K {tooltip.node.stage === "battery" ? "GWh" : "tonnes"}
            </span>
          </div>
          <div className="text-[#cbd5e1] text-xs">
            Utilization: <span className="text-[#f59e0b]">{tooltip.node.utilization}%</span>
          </div>
        </div>
      )}

      {/* Legend and bottleneck indicator */}
      <div className="bg-[#1e293b] rounded-lg border border-[#334155] p-4 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[#0ea5e9]">Legend</h3>
          <div className="space-y-1 text-xs text-[#cbd5e1]">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#a855f7]" />
              Mining Operations
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#06b6d4]" />
              Processing Facilities
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#22c55e]" />
              Battery Manufacturing
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[#0ea5e9]">Flow Indicators</h3>
          <div className="space-y-1 text-xs text-[#cbd5e1]">
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-6 bg-[#06b6d4]" />
              Normal Flow
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-6 bg-[#f59e0b]" />
              Bottleneck Area
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-[#22c55e]" />
              Click nodes to highlight paths
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
