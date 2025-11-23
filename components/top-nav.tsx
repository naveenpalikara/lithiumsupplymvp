"use client"

import { Search, Bell, Settings, LogOut } from "lucide-react"

export default function TopNav() {
  return (
    <header className="h-18 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search operations..."
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-accent/10 rounded-lg transition-colors text-foreground">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-accent/10 rounded-lg transition-colors text-foreground">
          <Settings className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-sm font-bold text-foreground cursor-pointer">
          JD
        </div>
        <button className="p-2 hover:bg-accent/10 rounded-lg transition-colors text-foreground ml-2">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
