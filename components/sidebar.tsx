"use client"

import { BarChart3, Zap, Factory, Battery, TrendingUp, Menu } from "lucide-react"
import { useState } from "react"

const navItems = [
  { label: "Overview", icon: BarChart3, href: "#" },
  { label: "Mining Operations", icon: Zap, href: "#" },
  { label: "Processing", icon: Factory, href: "#" },
  { label: "Battery Manufacturing", icon: Battery, href: "#" },
  { label: "Analytics", icon: TrendingUp, href: "#" },
]

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <aside
      className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${isExpanded ? "w-60" : "w-20"} flex flex-col`}
    >
      {/* Logo and toggle */}
      <div className="h-18 flex items-center justify-between px-4 border-b border-sidebar-border">
        {isExpanded && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-sidebar-primary to-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-bold text-sidebar-foreground text-sm">Li Supply</span>
          </div>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-sidebar-foreground" />
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon
          return (
            <a
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                index === 0
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isExpanded && <span className="text-sm font-medium">{item.label}</span>}
            </a>
          )
        })}
      </nav>

      {/* Footer */}
      {isExpanded && (
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60">© 2025 Lithium Corp</p>
        </div>
      )}
    </aside>
  )
}
