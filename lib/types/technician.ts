export type TechJobStatus = "NOT_STARTED" | "IN_PROGRESS" | "PAUSED" | "COMPLETED";

export type TechnicianJob = {
  jobId: string;
  roId: string;
  opLineNo: number;
  description: string;
  customerConcern?: string;
  laborHours: number;
  status: TechJobStatus;
  advisorName: string;
  promiseTime?: string;
  vehicle: {
    vin: string;
    description: string;
    mileage: number;
  };
  startTime?: string;
  consumedTimeMinutes?: number;
};

export type MediaItem = {
  id: string;
  url: string;
  type: "PHOTO" | "VIDEO";
  note?: string;
  createdAt: string;
};

export type InspectionItemResult = "PASS" | "WARNING" | "FAIL" | "NOT_CHECKED";

export type MPIItem = {
  id: string;
  category: string;
  name: string;
  result: InspectionItemResult;
  measurement?: string;
  recommendation?: string;
  media?: MediaItem[];
};
