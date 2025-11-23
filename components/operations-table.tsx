"use client"

import { useState, useMemo } from "react"
import { ChevronUp, ChevronDown, Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAllFacilities } from "@/lib/data/supply-chain-data"

type SortField = "facility" | "type" | "country" | "capacity" | "utilization" | null
type SortDirection = "asc" | "desc"

interface Facility {
  id: string
  name: string
  type: "Mining" | "Processing" | "Battery"
  country: string
  countryCode: string
  capacity: string
  utilization: number | string
  status: "active" | "caution" | "construction"
}

export function OperationsTable() {
  // Replace hardcoded FACILITIES with real data
  const FACILITIES = getAllFacilities();
  
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter and sort data
  const filteredData = useMemo(() => {
    const filtered = FACILITIES.filter((facility) => {
      const matchesSearch =
        facility.name.toLowerCase().includes(search.toLowerCase()) ||
        facility.country.toLowerCase().includes(search.toLowerCase())
      const matchesType = typeFilter === "all" || facility.type === typeFilter
      const matchesStatus = statusFilter === "all" || facility.status === statusFilter
      return matchesSearch && matchesType && matchesStatus
    })

    // Sort
    if (sortField) {
      filtered.sort((a, b) => {
        let aVal: any = a[sortField as keyof Facility]
        let bVal: any = b[sortField as keyof Facility]

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal
        }

        aVal = String(aVal).toLowerCase()
        bVal = String(bVal).toLowerCase()
        return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      })
    }

    return filtered
  }, [search, typeFilter, statusFilter, sortField, sortDirection])

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleExportCSV = () => {
    const headers = ["Status", "Facility Name", "Type", "Country", "Capacity", "Utilization"]
    const rows = filteredData.map((f) => [
      f.status,
      f.name,
      f.type,
      f.country,
      f.capacity,
      typeof f.utilization === "number" ? `${f.utilization}%` : f.utilization,
    ])

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `facility-operations-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400"
      case "caution":
        return "bg-amber-500/20 text-amber-400"
      case "construction":
        return "bg-blue-500/20 text-blue-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "caution":
        return "bg-amber-500"
      case "construction":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <div className="w-4 h-4" />
    return sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex gap-3 flex-wrap items-end">
        <div className="flex-1 min-w-60">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Search</label>
          <Input
            placeholder="Search facility name or country..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="bg-input border-border"
          />
        </div>
        <div className="w-40">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Type</label>
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Types</option>
            <option value="Mining">Mining</option>
            <option value="Processing">Processing</option>
            <option value="Battery">Battery</option>
          </select>
        </div>
        <div className="w-40">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="caution">Caution</option>
            <option value="construction">Construction</option>
          </select>
        </div>
        <Button onClick={handleExportCSV} className="bg-primary hover:bg-primary/90 gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-card border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground w-12">
                  <div className="w-3 h-3 rounded-full bg-muted" />
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort("facility")}
                >
                  <div className="flex items-center gap-2">
                    Facility Name
                    <SortIcon field="facility" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort("type")}
                >
                  <div className="flex items-center gap-2">
                    Type
                    <SortIcon field="type" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort("country")}
                >
                  <div className="flex items-center gap-2">
                    Country
                    <SortIcon field="country" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort("capacity")}
                >
                  <div className="flex items-center gap-2">
                    Capacity
                    <SortIcon field="capacity" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort("utilization")}
                >
                  <div className="flex items-center gap-2">
                    Utilization
                    <SortIcon field="utilization" />
                  </div>
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-foreground w-12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((facility, idx) => (
                <tr
                  key={facility.id}
                  className={`border-b border-border transition-colors hover:bg-primary/5 ${
                    idx % 2 === 0 ? "bg-card/50" : "bg-card"
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusDot(facility.status)}`} />
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground font-medium">{facility.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{facility.type}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground font-mono">{facility.countryCode}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground font-mono">{facility.capacity}</td>
                  <td className="px-4 py-3">
                    {typeof facility.utilization === "number" ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              facility.utilization >= 90
                                ? "bg-green-500"
                                : facility.utilization >= 80
                                  ? "bg-primary"
                                  : "bg-amber-500"
                            }`}
                            style={{ width: `${facility.utilization}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-foreground w-10 text-right">
                          {facility.utilization}%
                        </span>
                      </div>
                    ) : (
                      <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(facility.status)}`}>
                        {facility.utilization}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="inline-flex items-center justify-center p-1.5 rounded hover:bg-primary/20 text-primary transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)}{" "}
          of {filteredData.length} facilities
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-foreground border-border hover:bg-card"
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-2.5 py-1.5 rounded text-sm font-medium transition-colors ${
                  currentPage === i + 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:bg-card/80"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-foreground border-border hover:bg-card"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
