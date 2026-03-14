export type AdvisorDashboardSummary = {
  advisorId: string;
  date: string;
  todayArrivals: number;
  openROs: number;
  approvalPending: number;
  readyForPickup: number;
  overdue: number;
  closedROs: number;
  aro: number;
};

export type Arrival = {
  appointmentId: string;
  customerId: string;
  customerName: string;
  vehicleId: string;
  vehicleSummary: string;
  arrivalTime: string;
  serviceType: string;
  visitMode: "WAITING" | "DROP_OFF";
  status: "ARRIVING_SOON" | "CHECKED_IN" | "NO_SHOW";
};

export type ROStatus = {
  roId: string;
  customerName: string;
  vehicleSummary: string;
  advisorId: string;
  techId?: string;
  currentStage: "WRITE_UP" | "IN_DIAGNOSIS" | "WAITING_APPROVAL" | "WAITING_PARTS" | "IN_PROGRESS" | "QC_WASH" | "READY" | "CLOSED";
  eta?: string;
  approvalPending: boolean;
  partsStatus: "AVAILABLE" | "BACKORDER" | "PENDING" | "N/A";
  customerResponseStatus: "PENDING" | "RESPONDED" | "N/A";
};

export type ApprovalItem = {
  approvalId: string;
  roId: string;
  customerName: string;
  recommendationType: string;
  amount: number;
  sentAt: string;
  responseStatus: "NO_RESPONSE" | "VIEWED" | "APPROVED" | "DECLINED";
  aiCloseProbability: number;
};

export type AdvisorAlert = {
  alertId: string;
  type: "PARTS_DELAY" | "TECH_DELAY" | "CUSTOMER_UNREACHABLE" | "OVERDUE_PICKUP" | "VIP_ARRIVAL";
  severity: "HIGH" | "MEDIUM" | "LOW";
  roId?: string;
  appointmentId?: string;
  message: string;
  recommendedAction: string;
};
