export type DispatchSkill = "GENERAL" | "DIAGNOSTIC" | "EV" | "LUBE" | "TRANSMISSION" | "A_TECH" | "B_TECH" | "C_TECH";

export type DispatchTechnician = {
  techId: string;
  name: string;
  skills: DispatchSkill[];
  status: "ACTIVE" | "ON_BREAK" | "OFF_SHIFT";
  utilizationPercent: number;
  availableAt: string;
};

export type DispatchJob = {
  roId: string;
  lineNo: number;
  customerName: string;
  description: string;
  vehicleSummary: string;
  estimatedMinutes: number;
  requiredSkills: DispatchSkill[];
  priority: "NORMAL" | "WAITING" | "COMEBACK" | "VIP";
  partsStatus: "AVAILABLE" | "BACKORDER" | "PENDING";
  assignedTechId?: string;
  status: "UNASSIGNED" | "ASSIGNED" | "IN_PROGRESS" | "PAUSED" | "COMPLETED";
  predictedMinutesAI?: number;
};
