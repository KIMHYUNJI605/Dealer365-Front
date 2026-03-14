import { Customer, Customer360, CustomerSalesSummary, CustomerServiceSummary, CustomerVehicle } from "@/lib/types/customer";

export const mockCustomers: Customer[] = [
  {
    customerId: "CUST-001",
    firstName: "Jane",
    lastName: "Miller",
    fullName: "Jane Miller",
    phone: "555-010-2345",
    email: "jane.miller@example.com",
    customerType: "retail",
    status: "active",
    preferredContactMethod: "sms",
    marketingOptIn: true,
    createdAt: "2023-01-15T08:00:00Z",
    updatedAt: "2025-08-10T14:20:00Z"
  },
  {
    customerId: "CUST-002",
    firstName: "John",
    lastName: "Smith",
    fullName: "John Smith",
    phone: "555-020-5678",
    email: "john.s@example.com",
    customerType: "retail",
    status: "active",
    preferredContactMethod: "call",
    marketingOptIn: false,
    createdAt: "2024-05-20T10:00:00Z",
    updatedAt: "2025-10-02T09:15:00Z"
  },
  {
    customerId: "CUST-003",
    firstName: "Alice",
    lastName: "Johnson",
    fullName: "Alice Johnson",
    phone: "555-030-9012",
    email: "alice.j@business.com",
    customerType: "business",
    status: "prospect",
    preferredContactMethod: "email",
    marketingOptIn: true,
    createdAt: "2025-11-01T11:30:00Z",
    updatedAt: "2025-12-15T16:45:00Z"
  }
];

export const mockCustomerVehicles: Record<string, CustomerVehicle[]> = {
  "CUST-001": [
    {
      vehicleId: "VEH-101",
      year: 2023,
      make: "Hyundai",
      model: "Palisade",
      trim: "Calligraphy",
      vin: "KM881234567890ABC",
      plate: "XYZ-1234",
      mileage: 42120
    }
  ],
  "CUST-002": [
    {
      vehicleId: "VEH-102",
      year: 2018,
      make: "Honda",
      model: "Accord",
      trim: "EX-L",
      vin: "1HG881234567890DEF",
      plate: "ABC-5678",
      mileage: 85400
    }
  ],
  "CUST-003": []
};

export const mockSalesSummaries: Record<string, CustomerSalesSummary> = {
  "CUST-001": { totalPurchases: 1, activeOpportunities: 0, lastPurchaseDate: "2023-01-20T10:00:00Z" },
  "CUST-002": { totalPurchases: 0, activeOpportunities: 1, lastPurchaseDate: undefined },
  "CUST-003": { totalPurchases: 0, activeOpportunities: 2, lastPurchaseDate: undefined }
};

export const mockServiceSummaries: Record<string, CustomerServiceSummary> = {
  "CUST-001": { totalVisits: 4, openROs: 1, upcomingAppointments: 0, lastVisitDate: "2025-08-10T14:20:00Z" },
  "CUST-002": { totalVisits: 2, openROs: 0, upcomingAppointments: 1, lastVisitDate: "2025-10-02T09:15:00Z" },
  "CUST-003": { totalVisits: 0, openROs: 0, upcomingAppointments: 0, lastVisitDate: undefined }
};

export const getMockCustomer360 = (customerId: string): Customer360 | null => {
  const customer = mockCustomers.find(c => c.customerId === customerId);
  if (!customer) return null;

  return {
    customer,
    vehicles: mockCustomerVehicles[customerId] || [],
    salesSummary: mockSalesSummaries[customerId] || { totalPurchases: 0, activeOpportunities: 0 },
    serviceSummary: mockServiceSummaries[customerId] || { totalVisits: 0, openROs: 0, upcomingAppointments: 0 }
  };
};

export const mockCustomerCommunications: Record<string, { id: string; channel: string; direction: string; content: string; date: string; unread?: boolean }[]> = {
  "CUST-001": [
    { id: "MSG-1", channel: "sms", direction: "outbound", content: "Your vehicle is ready for pickup", date: "2025-08-10T14:20:00Z" },
    { id: "MSG-2", channel: "sms", direction: "inbound", content: "Great! I'll be there soon.", date: "2025-08-10T14:25:00Z", unread: true }
  ]
};
