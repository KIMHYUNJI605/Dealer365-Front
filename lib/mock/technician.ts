import { TechnicianJob, MPIItem } from "@/lib/types/technician";

export const mockTechJobs: TechnicianJob[] = [
  {
    jobId: "JOB-901",
    roId: "RO-240313-0182",
    opLineNo: 20,
    description: "Brake System Inspection (Customer hears noise)",
    customerConcern: "Grinding noise when braking at low speeds, mostly in the morning.",
    status: "IN_PROGRESS",
    laborHours: 0.8,
    advisorName: "James Park",
    promiseTime: "2026-03-13T15:30:00Z",
    startTime: "2026-03-13T10:14:00Z",
    consumedTimeMinutes: 28,
    vehicle: {
      vin: "KND21182283A",
      description: "2023 Hyundai Palisade",
      mileage: 42120
    }
  },
  {
    jobId: "JOB-902",
    roId: "RO-240313-0182",
    opLineNo: 10,
    description: "Synthetic Oil Change & Filter",
    status: "COMPLETED",
    laborHours: 0.5,
    advisorName: "James Park",
    promiseTime: "2026-03-13T15:30:00Z",
    consumedTimeMinutes: 25,
    vehicle: {
      vin: "KND21182283A",
      description: "2023 Hyundai Palisade",
      mileage: 42120
    }
  },
  {
    jobId: "JOB-904",
    roId: "RO-240313-0098",
    opLineNo: 30,
    description: "Replace Water Pump (Wait Parts)",
    status: "PAUSED",
    laborHours: 3.2,
    advisorName: "Sarah Connor",
    vehicle: {
      vin: "1G1BE5SM6E",
      description: "2021 Hyundai Tucson",
      mileage: 65120
    }
  },
  {
    jobId: "JOB-910",
    roId: "RO-240313-0210",
    opLineNo: 10,
    description: "Check Engine Light Diagnosis",
    customerConcern: "Check engine light came on yesterday. Running rough at idle.",
    status: "NOT_STARTED",
    laborHours: 1.0,
    advisorName: "David Kim",
    promiseTime: "2026-03-13T17:00:00Z",
    vehicle: {
      vin: "KMHC14AC1E",
      description: "2020 Genesis GV80",
      mileage: 38500
    }
  }
];

export const mockMPIResults: MPIItem[] = [
  {
    id: "MPI-01",
    category: "Brakes & Tires",
    name: "Front Brake Pads",
    result: "FAIL",
    measurement: "2mm",
    recommendation: "Replace front brake pads and machine rotors.",
    media: [
      { id: "M1", type: "PHOTO", url: "/mock-pad.jpg", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "MPI-02",
    category: "Brakes & Tires",
    name: "Rear Brake Pads",
    result: "PASS",
    measurement: "6mm"
  },
  {
    id: "MPI-03",
    category: "Fluids",
    name: "Brake Fluid",
    result: "WARNING",
    recommendation: "Fluid is dark, recommend flush next visit."
  },
  {
    id: "MPI-04",
    category: "Underhood",
    name: "Air Filter",
    result: "NOT_CHECKED"
  }
];
