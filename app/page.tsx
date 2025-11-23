"use client"

import { BarChart3, Zap, Factory, Battery, TrendingUp } from "lucide-react"
import Sidebar from "@/components/sidebar"
import TopNav from "@/components/top-nav"
import KPICard from "@/components/kpi-card"
import { DashboardToolbar } from "@/components/dashboard-toolbar"
import { SankeyDiagram } from "@/components/sankey-diagram"
import { OperationsTable } from "@/components/operations-table"
import ProductionTrendsChart from "@/components/production-trends-chart"
import { UtilizationChart } from "@/components/utilization-chart"
import { CarbonIntensityCard } from "@/components/carbon-intensity-card"
import { WaterConsumptionCard } from "@/components/water-consumption-card"
import { RenewableEnergyCard } from "@/components/renewable-energy-card"
import { ActivityFeed } from "@/components/activity-feed"
import { calculateKPIs } from "@/lib/data/supply-chain-data"

export default function Dashboard() {
  const kpis = calculateKPIs();

  const kpiData = [
    {
      label: "Total Mining Capacity",
      value: (kpis.totalMiningCapacity / 1000).toFixed(0) + "K",
      unit: "tonnes LCE/year",
      trend: "+12.5%",
      icon: BarChart3,
      isPositive: true,
    },
    {
      label: "Active Facilities",
      value: kpis.activeFacilities.toString(),
      unit: "total",
      trend: "+2 facilities",
      icon: Factory,
      isPositive: true,
    },
    {
      label: "Processing Output",
      value: (kpis.processingOutput / 1000).toFixed(0) + "K",
      unit: "tonnes/year refined",
      trend: "+8.2%",
      icon: Zap,
      isPositive: true,
    },
    {
      label: "Battery Production",
      value: kpis.batteryCapacity.toFixed(1),
      unit: "GWh annual capacity",
      trend: "+15.3%",
      icon: Battery,
      isPositive: true,
    },
    {
      label: "Average Utilization",
      value: kpis.avgUtilization.toFixed(1) + "%",
      unit: "facility utilization",
      trend: "+3.1%",
      icon: TrendingUp,
      isPositive: true,
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <TopNav />

        <DashboardToolbar />

        {/* Hero Metrics */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Lithium Supply Chain Overview</h1>
            <p className="text-muted-foreground">Real-time monitoring of global lithium operations</p>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            {kpiData.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </div>

          {/* Environmental KPIs section */}
          <div className="mb-8">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-foreground mb-2">Environmental Impact</h2>
              <p className="text-sm text-muted-foreground">
                Sustainability metrics tracking carbon emissions, water usage, and renewable energy adoption across
                supply chain.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <CarbonIntensityCard />
              <WaterConsumptionCard />
              <RenewableEnergyCard />
            </div>
          </div>

          {/* Sankey diagram section */}
          <div className="mb-8">
            <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-foreground mb-2">Supply Chain Flow</h2>
                <p className="text-sm text-muted-foreground">
                  Lithium flow from mining through processing to battery manufacturing. Click nodes to highlight
                  connected paths.
                </p>
              </div>
              <SankeyDiagram />
            </div>
          </div>

          {/* Operations Table section */}
          <div className="mb-8">
            <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-foreground mb-2">Facility Operations Monitoring</h2>
                <p className="text-sm text-muted-foreground">
                  Real-time status and utilization metrics for all mining, processing, and battery manufacturing
                  facilities.
                </p>
              </div>
              <OperationsTable />
            </div>
          </div>

          {/* Production Trends and Facility Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
              <ProductionTrendsChart />
            </div>
            <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
              <UtilizationChart />
            </div>
          </div>
        </main>
      </div>

      {/* Activity Feed Panel */}
      <ActivityFeed />
    </div>
  )
}
