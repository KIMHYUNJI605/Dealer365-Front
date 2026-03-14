import { RepairOrder, ROTimelineEvent } from "@/lib/types/repair-order";

export const mockRO: RepairOrder = {
  roId: "RO-240313-0182",
  status: "IN_PROGRESS",
  appointmentId: "APT-20311",
  customerId: "C-1009",
  customerName: "Jane Miller",
  vehicleId: "VIN-8892",
  vehicleSummary: "2023 Hyundai Palisade",
  advisorId: "ADV-101",
  assignedTechId: "TECH-22",
  openedAt: "2026-03-13T09:18:00Z",
  promiseTime: "2026-03-13T15:30:00Z",
  visitMode: "WAITING",
  mileage: 42120,
  totals: {
    labor: 180.0,
    parts: 45.0,
    fees: 12.0,
    tax: 18.25,
    discount: 0.0,
    customerPay: 255.25,
    warrantyPay: 0.0
  },
  concerns: [
    {
      concernId: "CON-01",
      roId: "RO-240313-0182",
      category: "BRAKE",
      customerStatement: "저속에서 브레이크 밟을 때 끽 소리가 남",
      condition: "cold start / low speed",
      advisorNote: "Customer wants inspection first before replacing pads"
    },
    {
      concernId: "CON-02",
      roId: "RO-240313-0182",
      category: "MAINTENANCE",
      customerStatement: "오일 교환 시기 지남",
      advisorNote: "Standard synthetic oil change"
    }
  ],
  lines: [
    {
      lineNo: 10,
      roId: "RO-240313-0182",
      opCode: "OIL-SYN",
      description: "Synthetic Oil Change & Filter",
      payType: "C",
      laborHours: 0.5,
      laborAmount: 60.0,
      partsAmount: 45.0,
      feeAmount: 12.0,
      status: "COMPLETED",
      approvalStatus: "N/A",
      assignedTechId: "TECH-22",
      parts: [
        {
          roId: "RO-240313-0182",
          lineNo: 10,
          partNo: "26300-35505",
          description: "Oil Filter",
          qty: 1,
          status: "INSTALLED"
        }
      ]
    },
    {
      lineNo: 20,
      roId: "RO-240313-0182",
      opCode: "BRAKE-INSP",
      description: "Brake System Inspection",
      payType: "C",
      laborHours: 0.8,
      laborAmount: 120.0,
      partsAmount: 0.0,
      feeAmount: 0.0,
      status: "COMPLETED",
      approvalStatus: "N/A",
      assignedTechId: "TECH-22",
      parts: []
    },
    {
      lineNo: 30,
      roId: "RO-240313-0182",
      opCode: "PAD-REPL",
      description: "Front Brake Pad Replace",
      payType: "C",
      laborHours: 1.5,
      laborAmount: 225.0,
      partsAmount: 260.0,
      feeAmount: 0.0,
      status: "WAITING_APPROVAL",
      approvalStatus: "SENT",
      parts: [
        {
          roId: "RO-240313-0182",
          lineNo: 30,
          partNo: "58101-ABC12",
          description: "Front Brake Pad Kit",
          qty: 1,
          status: "AVAILABLE",
          eta: "In Stock"
        }
      ]
    }
  ]
};

export const mockROTimeline: ROTimelineEvent[] = [
  {
    eventId: "EVT-1",
    roId: "RO-240313-0182",
    type: "Check-in",
    timestamp: "2026-03-13T09:12:00Z",
    actor: "ADV-101",
    description: "Customer arrival and check-in"
  },
  {
    eventId: "EVT-2",
    roId: "RO-240313-0182",
    type: "RO Opened",
    timestamp: "2026-03-13T09:18:00Z",
    actor: "ADV-101",
    description: "RO generated with 2 initial concerns"
  },
  {
    eventId: "EVT-3",
    roId: "RO-240313-0182",
    type: "Assigned",
    timestamp: "2026-03-13T09:42:00Z",
    actor: "DISPATCH-1",
    description: "Assigned to Technician T-22"
  },
  {
    eventId: "EVT-4",
    roId: "RO-240313-0182",
    type: "Diagnosis",
    timestamp: "2026-03-13T10:15:00Z",
    actor: "TECH-22",
    description: "Initial diagnosis and oil change completed"
  },
  {
    eventId: "EVT-5",
    roId: "RO-240313-0182",
    type: "Approval Sent",
    timestamp: "2026-03-13T10:42:00Z",
    actor: "ADV-101",
    description: "Sent approval request for Front Brake Pad Replace ($485)"
  }
];
