import { DispatchTechnician, DispatchJob } from "@/lib/types/dispatch";

export const mockTechs: DispatchTechnician[] = [
  { techId: "T-22", name: "Mike Roberts", skills: ["GENERAL", "A_TECH"], status: "ACTIVE", utilizationPercent: 85, availableAt: "10:30 AM" },
  { techId: "T-05", name: "David Kim", skills: ["DIAGNOSTIC", "GENERAL"], status: "ACTIVE", utilizationPercent: 92, availableAt: "11:45 AM" },
  { techId: "T-18", name: "Sarah Connor", skills: ["EV", "A_TECH"], status: "ACTIVE", utilizationPercent: 60, availableAt: "Now" },
  { techId: "T-42", name: "Brian O'Connor", skills: ["LUBE", "C_TECH"], status: "ON_BREAK", utilizationPercent: 45, availableAt: "1:00 PM" }
];

export const mockUnassignedJobs: DispatchJob[] = [
  {
    roId: "RO-240313-0210", lineNo: 10, customerName: "Eleanor Pena", description: "Brake Inspection",
    vehicleSummary: "2023 Palisade", estimatedMinutes: 45, requiredSkills: ["GENERAL"], priority: "WAITING",
    partsStatus: "AVAILABLE", status: "UNASSIGNED", predictedMinutesAI: 52
  },
  {
    roId: "RO-240313-0215", lineNo: 20, customerName: "Robert Fox", description: "Transmission Fluid Exchange",
    vehicleSummary: "2020 Sonata", estimatedMinutes: 60, requiredSkills: ["GENERAL", "LUBE"], priority: "NORMAL",
    partsStatus: "AVAILABLE", status: "UNASSIGNED", predictedMinutesAI: 55
  },
  {
    roId: "RO-240313-0199", lineNo: 30, customerName: "Jane Miller", description: "EV Battery Diagnostic",
    vehicleSummary: "2024 Ioniq 5", estimatedMinutes: 90, requiredSkills: ["EV", "DIAGNOSTIC"], priority: "VIP",
    partsStatus: "AVAILABLE", status: "UNASSIGNED", predictedMinutesAI: 110
  }
];

export const mockDispatchedJobs: DispatchJob[] = [
    {
    roId: "RO-240313-0182", lineNo: 10, customerName: "Jane Miller", description: "Synthetic Oil Change & Filter",
    vehicleSummary: "2023 Palisade", estimatedMinutes: 30, requiredSkills: ["LUBE"], priority: "WAITING",
    partsStatus: "AVAILABLE", assignedTechId: "T-22", status: "IN_PROGRESS", predictedMinutesAI: 25
  },
  {
    roId: "RO-240313-0098", lineNo: 30, customerName: "Leslie Al.", description: "Check Engine Light Diagnostic",
    vehicleSummary: "2020 Genesis G70", estimatedMinutes: 60, requiredSkills: ["DIAGNOSTIC"], priority: "NORMAL",
    partsStatus: "AVAILABLE", assignedTechId: "T-05", status: "IN_PROGRESS"
  }
];
