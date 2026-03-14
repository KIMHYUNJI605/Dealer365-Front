import { AdvisorDashboardSummary, Arrival, ROStatus, ApprovalItem, AdvisorAlert } from "@/lib/types/service";

export const mockDashboardSummary: AdvisorDashboardSummary = {
  advisorId: "ADV-101",
  date: "2026-03-13",
  todayArrivals: 14,
  openROs: 23,
  approvalPending: 6,
  readyForPickup: 4,
  overdue: 3,
  closedROs: 9,
  aro: 612.45
};

export const mockArrivals: Arrival[] = [
  {
    appointmentId: "APT-20311",
    customerId: "C-1009",
    customerName: "Jane Miller",
    vehicleId: "VIN-8892",
    vehicleSummary: "2023 Hyundai Palisade",
    arrivalTime: "09:20",
    serviceType: "Maintenance + Brake Noise",
    visitMode: "WAITING",
    status: "ARRIVING_SOON"
  },
  {
    appointmentId: "APT-20312",
    customerId: "C-1010",
    customerName: "Robert Fox",
    vehicleId: "VIN-9123",
    vehicleSummary: "2020 Genesis GV80",
    arrivalTime: "10:00",
    serviceType: "Check Engine Light",
    visitMode: "DROP_OFF",
    status: "ARRIVING_SOON"
  },
  {
    appointmentId: "APT-20313",
    customerId: "C-1011",
    customerName: "Eleanor Pena",
    vehicleId: "VIN-4481",
    vehicleSummary: "2019 Hyundai Sonata",
    arrivalTime: "08:15",
    serviceType: "Oil Change",
    visitMode: "WAITING",
    status: "CHECKED_IN"
  }
];

export const mockOpenROs: ROStatus[] = [
  {
    roId: "RO-240311-0102",
    customerName: "Jane Miller",
    vehicleSummary: "2023 Hyundai Palisade",
    advisorId: "ADV-101",
    techId: "TECH-22",
    currentStage: "IN_PROGRESS",
    eta: "11:35",
    approvalPending: true,
    partsStatus: "AVAILABLE",
    customerResponseStatus: "PENDING"
  },
  {
    roId: "RO-240311-0098",
    customerName: "Bessie Cooper",
    vehicleSummary: "2021 Hyundai Tucson",
    advisorId: "ADV-101",
    techId: "TECH-05",
    currentStage: "WAITING_PARTS",
    eta: "Tomorrow 14:00",
    approvalPending: false,
    partsStatus: "BACKORDER",
    customerResponseStatus: "N/A"
  },
  {
    roId: "RO-240311-0110",
    customerName: "Leslie Alexander",
    vehicleSummary: "2022 Genesis G70",
    advisorId: "ADV-101",
    techId: "TECH-12",
    currentStage: "QC_WASH",
    eta: "Today 16:30",
    approvalPending: false,
    partsStatus: "N/A",
    customerResponseStatus: "N/A"
  }
];

export const mockApprovals: ApprovalItem[] = [
  {
    approvalId: "APR-8831",
    roId: "RO-240311-0102",
    customerName: "Jane Miller",
    recommendationType: "BRAKE_SERVICE",
    amount: 489.99,
    sentAt: "2026-03-13T09:42:00Z",
    responseStatus: "NO_RESPONSE",
    aiCloseProbability: 0.74
  },
  {
    approvalId: "APR-8832",
    roId: "RO-240311-0092",
    customerName: "Marvin McKinney",
    recommendationType: "ALIGNMENT",
    amount: 129.99,
    sentAt: "2026-03-13T10:15:00Z",
    responseStatus: "NO_RESPONSE",
    aiCloseProbability: 0.92
  }
];

export const mockAlerts: AdvisorAlert[] = [
  {
    alertId: "ALT-9001",
    type: "PARTS_DELAY",
    severity: "HIGH",
    roId: "RO-240311-0098",
    message: "Water pump for 2021 Tucson ETA delayed to tomorrow",
    recommendedAction: "Call customer and revise ETA"
  },
  {
    alertId: "ALT-9002",
    type: "CUSTOMER_UNREACHABLE",
    severity: "MEDIUM",
    roId: "RO-240311-0102",
    message: "No response to brake approval sent at 9:42 AM",
    recommendedAction: "Send simple update or call again"
  }
];
