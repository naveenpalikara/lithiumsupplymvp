/**
 * Supply Chain Data Access Layer
 * Provides typed interfaces for all supply chain entities
 */

import miningOperations from './mining-operations.json';
import processingFacilities from './processing-facilities.json';
import batteryManufacturing from './battery-manufacturing.json';

// Type definitions
export interface Measurement {
  value: number;
  unit: string;
}

export interface MiningOperation {
  id: string;
  name: string;
  entityType: 'mining_operation';
  operator: string;
  country: string;
  countryName: string;
  stateProvince?: string;
  latitude: number;
  longitude: number;
  operationType: string;
  oreType: string;
  oreGrade: Measurement;
  nameplateCapacity: Measurement;
  actualProduction?: {
    value: number;
    year: number;
  };
  utilizationRate?: number;
  waterConsumption?: Measurement;
  carbonIntensity?: Measurement;
  renewableEnergyPercent?: number;
  status: 'operational' | 'under_construction' | 'planned' | 'suspended' | 'closed';
  firstProduction?: string;
  confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface ProcessingFacility {
  id: string;
  name: string;
  entityType: 'processing_facility';
  operator: string;
  country: string;
  countryName: string;
  stateProvince?: string;
  latitude: number;
  longitude: number;
  facilityType: string;
  processingTechnology: string;
  inputMaterial: {
    type: string;
    capacity: number;
    unit: string;
  };
  outputProduct: {
    type: string;
    capacity: number;
    unit: string;
    grade: string;
  };
  energyConsumption?: Measurement;
  waterConsumption?: Measurement;
  renewableEnergyPercent?: number;
  utilizationRate?: number;
  status: string;
  commissioningDate?: string;
  confidenceLevel: string;
}

export interface BatteryManufacturing {
  id: string;
  name: string;
  entityType: 'battery_manufacturing';
  operator: string;
  country: string;
  countryName: string;
  stateProvince?: string;
  latitude: number;
  longitude: number;
  facilityType: string;
  batteryChemistry: string[];
  annualCapacity: Measurement;
  lithiumInput: {
    value: number;
    unit: string;
    material: string;
  };
  energyConsumption?: Measurement;
  renewableEnergyPercent?: number;
  utilizationRate?: number;
  status: string;
  commissioningDate?: string;
  confidenceLevel: string;
}

// Data exports
export const getAllMiningOperations = (): MiningOperation[] => miningOperations as MiningOperation[];
export const getAllProcessingFacilities = (): ProcessingFacility[] => processingFacilities as ProcessingFacility[];
export const getAllBatteryManufacturing = (): BatteryManufacturing[] => batteryManufacturing as BatteryManufacturing[];

// Aggregated facilities for operations table
export const getAllFacilities = () => {
  const mining = getAllMiningOperations().map(m => ({
    id: m.id,
    name: m.name,
    type: 'Mining' as const,
    country: m.countryName,
    countryCode: m.country,
    capacity: `${m.nameplateCapacity.value.toLocaleString()} ${m.nameplateCapacity.unit}`,
    utilization: m.utilizationRate ?? 'Under Construction',
    status: m.status === 'operational' ? 'active' as const : 
            m.status === 'under_construction' ? 'construction' as const : 
            'caution' as const
  }));

  const processing = getAllProcessingFacilities().map(p => ({
    id: p.id,
    name: p.name,
    type: 'Processing' as const,
    country: p.countryName,
    countryCode: p.country,
    capacity: `${p.outputProduct.capacity.toLocaleString()} ${p.outputProduct.unit}`,
    utilization: p.utilizationRate ?? 'N/A',
    status: p.status === 'operational' ? 'active' as const : 'caution' as const
  }));

  const battery = getAllBatteryManufacturing().map(b => ({
    id: b.id,
    name: b.name,
    type: 'Battery' as const,
    country: b.countryName,
    countryCode: b.country,
    capacity: `${b.annualCapacity.value} ${b.annualCapacity.unit}`,
    utilization: b.utilizationRate ?? 'Under Construction',
    status: b.status === 'operational' ? 'active' as const : 
            b.status === 'under_construction' ? 'construction' as const : 
            'caution' as const
  }));

  return [...mining, ...processing, ...battery];
};

// KPI calculations
export const calculateKPIs = () => {
  const mining = getAllMiningOperations();
  const processing = getAllProcessingFacilities();
  const battery = getAllBatteryManufacturing();

  // Total mining capacity (operational + under construction)
  const totalMiningCapacity = mining
    .filter(m => m.status === 'operational' || m.status === 'under_construction')
    .reduce((sum, m) => sum + m.nameplateCapacity.value, 0);

  // Active facilities
  const activeFacilities = [
    ...mining.filter(m => m.status === 'operational'),
    ...processing.filter(p => p.status === 'operational'),
    ...battery.filter(b => b.status === 'operational')
  ].length;

  // Processing output
  const processingOutput = processing
    .filter(p => p.status === 'operational')
    .reduce((sum, p) => sum + p.outputProduct.capacity, 0);

  // Battery capacity
  const batteryCapacity = battery
    .filter(b => b.status === 'operational')
    .reduce((sum, b) => sum + b.annualCapacity.value, 0);

  // Average utilization
  const operationalFacilities = [
    ...mining.filter(m => m.status === 'operational' && m.utilizationRate),
    ...processing.filter(p => p.status === 'operational' && p.utilizationRate),
    ...battery.filter(b => b.status === 'operational' && b.utilizationRate)
  ];
  const avgUtilization = operationalFacilities.length > 0
    ? operationalFacilities.reduce((sum, f) => sum + (f.utilizationRate ?? 0), 0) / operationalFacilities.length
    : 0;

  return {
    totalMiningCapacity,
    activeFacilities,
    processingOutput,
    batteryCapacity,
    avgUtilization
  };
};

// Environmental metrics
export const calculateEnvironmentalMetrics = () => {
  const mining = getAllMiningOperations().filter(m => m.status === 'operational');

  // Average carbon intensity
  const carbonData = mining.filter(m => m.carbonIntensity);
  const avgCarbonIntensity = carbonData.length > 0
    ? carbonData.reduce((sum, m) => sum + (m.carbonIntensity?.value ?? 0), 0) / carbonData.length
    : 0;

  // Average water consumption
  const waterData = mining.filter(m => m.waterConsumption);
  const avgWaterConsumption = waterData.length > 0
    ? waterData.reduce((sum, m) => sum + (m.waterConsumption?.value ?? 0), 0) / waterData.length
    : 0;

  // Average renewable energy
  const allFacilities = [
    ...getAllMiningOperations(),
    ...getAllProcessingFacilities(),
    ...getAllBatteryManufacturing()
  ].filter(f => f.status === 'operational' && f.renewableEnergyPercent);

  const avgRenewableEnergy = allFacilities.length > 0
    ? allFacilities.reduce((sum, f) => sum + (f.renewableEnergyPercent ?? 0), 0) / allFacilities.length
    : 0;

  return {
    avgCarbonIntensity,
    avgWaterConsumption,
    avgRenewableEnergy
  };
};

// Export all data for Sankey diagram
export const getSupplyChainFlow = () => {
  const mining = getAllMiningOperations().filter(m => m.status === 'operational');
  const processing = getAllProcessingFacilities().filter(p => p.status === 'operational');
  const battery = getAllBatteryManufacturing().filter(b => b.status === 'operational');

  return {
    nodes: [
      ...mining.map(m => ({
        id: m.id,
        name: m.name,
        stage: 'mining' as const,
        capacity: m.nameplateCapacity.value,
        utilization: m.utilizationRate ?? 0,
        location: m.countryName
      })),
      ...processing.map(p => ({
        id: p.id,
        name: p.name,
        stage: 'processing' as const,
        capacity: p.outputProduct.capacity,
        utilization: p.utilizationRate ?? 0,
        location: p.countryName
      })),
      ...battery.map(b => ({
        id: b.id,
        name: b.name,
        stage: 'battery' as const,
        capacity: b.annualCapacity.value,
        utilization: b.utilizationRate ?? 0,
        location: b.countryName
      }))
    ],
    links: []  // Links can be generated based on actual supply contracts
  };
};
