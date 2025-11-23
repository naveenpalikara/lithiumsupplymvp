# Lithium Supply Chain Operations Dashboard

A comprehensive real-time monitoring dashboard for global lithium supply chain operations, tracking mining, processing, and battery manufacturing facilities across the complete value chain.

## 🌍 Overview

This application provides visibility into:
- **9 Mining Operations** across Australia, Chile, Argentina, China, and USA
- **5 Processing Facilities** for lithium conversion and refinement
- **5 Battery Manufacturing Plants** with 286.5 GWh operational capacity
- **Real-time metrics** on capacity, utilization, and environmental impact

## 📊 Features

- **Live KPI Dashboard**: Track total capacity, active facilities, and utilization rates
- **Operations Table**: Sortable, filterable view of all 19 facilities
- **Supply Chain Flow**: Sankey diagram visualizing material flow
- **Production Trends**: Historical and forecasted production data
- **Environmental Metrics**: Carbon intensity, water consumption, renewable energy tracking
- **Geographic Coverage**: 6 countries (AU, CL, AR, CN, US, SE, KR)
- **100% Metric System**: All measurements in standardized SI units

## 🚀 Tech Stack

- **Framework**: Next.js 16.0.3 (React 19.2.0)
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Data**: PostgreSQL-structured JSON (metric-compliant)

## 🏗️ Project Structure

```
├── app/
│   ├── page.tsx              # Main dashboard
│   ├── layout.tsx            # Root layout
│   ├── sitemap.ts            # SEO sitemap
│   └── globals.css           # Global styles
├── components/
│   ├── kpi-card.tsx          # KPI display cards
│   ├── operations-table.tsx  # Facilities table
│   ├── sankey-diagram.tsx    # Supply chain flow
│   ├── production-trends-chart.tsx
│   ├── carbon-intensity-card.tsx
│   ├── water-consumption-card.tsx
│   ├── renewable-energy-card.tsx
│   ├── activity-feed.tsx     # Real-time updates
│   ├── sidebar.tsx           # Navigation
│   └── ui/                   # Reusable UI components
├── lib/
│   ├── data/
│   │   ├── mining-operations.json
│   │   ├── processing-facilities.json
│   │   ├── battery-manufacturing.json
│   │   └── supply-chain-data.ts  # Data access layer
│   └── utils.ts
└── exported-assets/          # SQL schema & documentation
    ├── 01_schema_core_tables.sql
    ├── lithium_supply_complete_report.md
    └── ...
```

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Deploy with zero configuration

### Manual Deployment

```bash
# Build production bundle
pnpm build

# Start production server
pnpm start
```

## 📊 Data Sources

All data is sourced from:
- USGS Mineral Commodity Summaries
- Geoscience Australia CMMI Portal
- SEC EDGAR filings
- Company annual reports
- OpenStreetMap (coordinates)
- Wikidata (company data)

**Data Quality**: 42% high-confidence sources, 100% metric system compliance

## 🔒 Data Compliance

- ✅ 100% metric units (SI system)
- ✅ Zero imperial units
- ✅ WGS84 coordinate system
- ✅ 65 standardized metric units
- ✅ PostgreSQL-validated schema

## 📝 License

Private - All Rights Reserved

---

**Last Updated**: November 2025  
**Version**: 1.0.0  
**Status**: Production Ready
