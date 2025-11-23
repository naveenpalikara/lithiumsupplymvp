"use client"

import { useState } from "react"
import { Search, Settings, Bell, RefreshCw, Download, Menu, X, ChevronDown } from "lucide-react"

interface DateRange {
  label: string
  value: string
}

interface FacilityFilter {
  label: string
  value: string
}

export function DashboardToolbar() {
  const [dateRange, setDateRange] = useState<string>("6M")
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
  const [showExportMenu, setShowExportMenu] = useState<boolean>(false)
  const [lastUpdated] = useState<string>("2 min ago")

  const dateRanges: DateRange[] = [
    { label: "1 Month", value: "1M" },
    { label: "3 Months", value: "3M" },
    { label: "6 Months", value: "6M" },
    { label: "1 Year", value: "1Y" },
    { label: "Custom", value: "custom" },
  ]

  const facilityFilters: FacilityFilter[] = [
    { label: "All Facilities", value: "all" },
    { label: "Operational Only", value: "operational" },
    { label: "Under Construction", value: "construction" },
    { label: "Planned", value: "planned" },
  ]

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`)
    setShowExportMenu(false)
  }

  return (
    <>
      {/* Desktop Toolbar */}
      <div className="hidden md:block sticky top-16 z-40 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="px-6 py-3 flex items-center justify-between gap-3">
          {/* Left Section: Date range and filters */}
          <div className="flex items-center gap-3">
            {/* Date Range Picker */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-200 transition-colors">
                <span>Last {dateRange}</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-2 w-40 bg-slate-800 border border-slate-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {dateRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setDateRange(range.value)}
                    className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-slate-700">
              {facilityFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedFilter === filter.value
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Center Section: Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search facilities, countries, metrics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 bg-slate-700 px-2 py-0.5 rounded">
                ⌘K
              </span>
            </div>
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center gap-2">
            {/* Refresh Button */}
            <div className="relative group">
              <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 transition-colors">
                <RefreshCw size={18} />
              </button>
              <div className="absolute right-0 mt-1 px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                Updated {lastUpdated}
              </div>
            </div>

            {/* Export Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 transition-colors"
              >
                <Download size={18} />
              </button>
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
                  <button
                    onClick={() => handleExport("PDF")}
                    className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 first:rounded-t-lg"
                  >
                    PDF Report
                  </button>
                  <button
                    onClick={() => handleExport("CSV")}
                    className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700"
                  >
                    CSV Data
                  </button>
                  <button
                    onClick={() => handleExport("Excel")}
                    className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 last:rounded-b-lg"
                  >
                    Excel Workbook
                  </button>
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 transition-colors">
              <Settings size={18} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 transition-colors">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Toolbar */}
      <div className="md:hidden sticky top-16 z-40 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 mr-3">
            <div className="relative">
              <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Menu Toggle */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="px-4 py-3 border-t border-white/10 bg-slate-800/50 backdrop-blur-sm">
            {/* Date Range */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-slate-400 mb-2">Date Range</p>
              <div className="flex gap-2 flex-wrap">
                {dateRanges.slice(0, 4).map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setDateRange(range.value)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      dateRange === range.value
                        ? "bg-cyan-500/20 text-cyan-300"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {range.value}
                  </button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-slate-400 mb-2">Filters</p>
              <div className="flex flex-col gap-1.5">
                {facilityFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => {
                      setSelectedFilter(filter.value)
                      setShowMobileMenu(false)
                    }}
                    className={`px-3 py-1.5 rounded text-sm text-left transition-colors ${
                      selectedFilter === filter.value
                        ? "bg-cyan-500/20 text-cyan-300"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2 border-t border-slate-700">
              <button className="flex-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5">
                <RefreshCw size={14} />
                Refresh
              </button>
              <button className="flex-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5">
                <Download size={14} />
                Export
              </button>
              <button className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200">
                <Settings size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
