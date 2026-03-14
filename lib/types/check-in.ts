export type CheckinStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export type ArrivalItem = {
  appointmentId: string;
  customerName: string;
  vehicleSummary: string;
  arrivalTime: string;
  visitType: "WAITING" | "VALET" | "DROP_OFF";
  status: CheckinStatus;
};

export type WalkaroundCondition = "GOOD" | "SCRATCH" | "DENT" | "CRACKED" | "REPLACE";

export type WalkaroundItem = {
  id: string;
  label: string;
  condition: WalkaroundCondition;
  photoUrl?: string;
  notes?: string;
};

export type CheckinSession = {
  checkinId: string;
  appointmentId: string;
  customerId: string;
  customerName: string;
  vehicleId: string;
  vehicleSummary: string;
  vin: string;
  mileage: number;
  fuelLevel: number; // 0-100
  concerns: string[];
  walkaround: WalkaroundItem[];
  signatureUrl?: string;
  status: CheckinStatus;
};
