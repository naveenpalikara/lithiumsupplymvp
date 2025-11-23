"use client"

import { useState } from "react"
import { X, RefreshCw, ChevronLeft } from "lucide-react"

interface ActivityItem {
  id: string
  emoji: string
  type: "alert" | "update" | "milestone" | "contract"
  title: string
  description: string
  timestamp: string
  minutesAgo: number
}

export function ActivityFeed() {
  const [isOpen, setIsOpen] = useState(true)
  const [activeFilter, setActiveFilter] = useState<"all" | "alerts" | "updates">("all")
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const activityItems: ActivityItem[] = [
    {
      id: "1",
      emoji: "⚠️",
      type: "alert",
      title: "CAPACITY ALERT",
      description: "Mt Marion utilization dropped to 82%",
      timestamp: "2 minutes ago",
      minutesAgo: 2,
    },
    {
      id: "2",
      emoji: "✓",
      type: "update",
      title: "STATUS UPDATE",
      description: "Kemerton Phase 2 now operational",
      timestamp: "1 hour ago",
      minutesAgo: 60,
    },
    {
      id: "3",
      emoji: "📊",
      type: "milestone",
      title: "PRODUCTION MILESTONE",
      description: "Tesla Nevada reached 40 GWh annual output",
      timestamp: "3 hours ago",
      minutesAgo: 180,
    },
    {
      id: "4",
      emoji: "🔔",
      type: "contract",
      title: "NEW CONTRACT",
      description: "Pilbara ↔ CATL: 180K tonnes/year agreement",
      timestamp: "5 hours ago",
      minutesAgo: 300,
    },
  ]

  const filteredItems =
    activeFilter === "all"
      ? activityItems
      : activeFilter === "alerts"
        ? activityItems.filter((item) => item.type === "alert")
        : activityItems.filter((item) => item.type !== "alert")

  const handleRefresh = () => {
    setLastRefresh(new Date())
  }

  return (
    <>
      {/* Toggle button when collapsed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground p-2 z-40 rounded-l-lg transition-colors"
          aria-label="Open activity feed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Activity Feed Panel */}
      <div
        className={`fixed right-0 top-0 h-screen bg-slate-900 border-l border-slate-700 flex flex-col shadow-xl transition-all duration-300 z-50 ${
          isOpen ? "w-80" : "w-0 overflow-hidden"
        }`}
      >
        {/* Header */}
        <div className="flex-shrink-0 border-b border-slate-700 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white tracking-wide">ACTIVITY FEED</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Close activity feed"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {["all", "alerts", "updates"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as "all" | "alerts" | "updates")}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-slate-300"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Refresh indicator */}
        <div className="flex-shrink-0 px-4 py-2 bg-slate-800/50 flex items-center justify-between text-xs text-slate-400">
          <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
          <button
            onClick={handleRefresh}
            className="text-slate-400 hover:text-slate-300 transition-colors"
            aria-label="Refresh activity"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Activity Items - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm">No activities found</div>
          ) : (
            <div>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className={`border-b border-slate-700 p-4 cursor-pointer transition-colors hover:bg-slate-800/50 ${
                    expandedId === item.id ? "bg-slate-800/30" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Emoji icon */}
                    <div className="text-2xl flex-shrink-0 pt-0.5">{item.emoji}</div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-white leading-tight mb-1">{item.title}</div>
                      <p className="text-xs text-slate-300 leading-snug">{item.description}</p>
                      <div className="text-xs text-slate-500 mt-2">{item.timestamp}</div>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {expandedId === item.id && (
                    <div className="mt-3 pt-3 border-t border-slate-700 animate-in fade-in duration-200">
                      <div className="text-xs text-slate-400 space-y-2">
                        <div>
                          <span className="font-semibold text-slate-300">Type:</span> {item.type}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-300">Status:</span> Active
                        </div>
                        <button className="mt-2 w-full px-2 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs rounded transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Backdrop when open */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setIsOpen(false)} style={{ right: "320px" }} />
      )}
    </>
  )
}
