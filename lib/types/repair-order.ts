export type PayType = "C" | "W" | "I" | "M" | "P";

export type ROPart = {
  roId: string;
  lineNo: number;
  partNo: string;
  description: string;
  qty: number;
  status: "ORDERED" | "BACKORDER" | "AVAILABLE" | "INSTALLED" | "PENDING";
  eta?: string;
};

export type ROOperationLine = {
  lineNo: number;
  roId: string;
  opCode: string;
  description: string;
  payType: PayType;
  laborHours: number;
  laborAmount: number;
  partsAmount: number;
  feeAmount: number;
  status: "OPEN" | "WAITING_APPROVAL" | "PENDING" | "COMPLETED";
  approvalStatus: "PENDING" | "SENT" | "APPROVED" | "DECLINED" | "N/A";
  assignedTechId?: string;
  parts: ROPart[];
};

export type ROConcern = {
  concernId: string;
  roId: string;
  category: string;
  customerStatement: string;
  condition?: string;
  advisorNote?: string;
};

export type RepairOrder = {
  roId: string;
  status: "WRITE_UP" | "IN_PROGRESS" | "WAITING_APPROVAL" | "WAITING_PARTS" | "QC_WASH" | "READY" | "CLOSED";
  appointmentId?: string;
  customerId: string;
  customerName: string;
  vehicleId: string;
  vehicleSummary: string;
  advisorId: string;
  assignedTechId?: string;
  openedAt: string;
  promiseTime?: string;
  visitMode: "WAITING" | "DROP_OFF";
  mileage?: number;
  totals: {
    labor: number;
    parts: number;
    fees: number;
    tax: number;
    discount: number;
    customerPay: number;
    warrantyPay: number;
  };
  concerns: ROConcern[];
  lines: ROOperationLine[];
};

export type ROTimelineEvent = {
  eventId: string;
  roId: string;
  type: string;
  timestamp: string;
  actor: string;
  description: string;
};
