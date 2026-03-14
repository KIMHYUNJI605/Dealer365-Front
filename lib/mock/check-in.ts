import { ArrivalItem, CheckinSession } from "@/lib/types/check-in";

export const mockArrivals: ArrivalItem[] = [
  { appointmentId: "APT-8821", customerName: "Eleanor Pena", vehicleSummary: "2023 Palisade", arrivalTime: "10:00 AM", visitType: "WAITING", status: "PENDING" },
  { appointmentId: "APT-8825", customerName: "Guy Hawkins", vehicleSummary: "2020 Sonata", arrivalTime: "10:15 AM", visitType: "DROP_OFF", status: "IN_PROGRESS" },
  { appointmentId: "APT-8830", customerName: "Arlene McCoy", vehicleSummary: "2024 Ioniq 5", arrivalTime: "10:30 AM", visitType: "VALET", status: "PENDING" },
  { appointmentId: "APT-8832", customerName: "Jerome Bell", vehicleSummary: "2022 Tucson", arrivalTime: "11:00 AM", visitType: "WAITING", status: "PENDING" }
];

export const mockCheckinSession: CheckinSession = {
  checkinId: "CHK-2201",
  appointmentId: "APT-8825",
  customerId: "CUST-102",
  customerName: "Guy Hawkins",
  vehicleId: "VIN-SON-2020",
  vehicleSummary: "2020 Hyundai Sonata SEL",
  vin: "5NPE24AF8LH000000",
  mileage: 38240,
  fuelLevel: 65,
  concerns: ["Check engine light is on", "Oil change service", "Tire rotation"],
  walkaround: [
    { id: "w1", label: "Front Bumper", condition: "SCRATCH", notes: "Small scratch on left side" },
    { id: "w2", label: "Windshield", condition: "GOOD" },
    { id: "w3", label: "Tires", condition: "GOOD" },
    { id: "w4", label: "Rear Bumper", condition: "GOOD" }
  ],
  status: "IN_PROGRESS"
};
