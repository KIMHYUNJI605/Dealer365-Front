export type Customer = {
  customerId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone?: string;
  email?: string;
  customerType?: "retail" | "business" | "fleet";
  status?: "active" | "inactive" | "prospect";
  preferredContactMethod?: "call" | "sms" | "email";
  marketingOptIn?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CustomerVehicle = {
  vehicleId: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  vin: string;
  plate?: string;
  mileage?: number;
};

export type CustomerSalesSummary = {
  totalPurchases: number;
  activeOpportunities: number;
  lastPurchaseDate?: string;
};

export type CustomerServiceSummary = {
  totalVisits: number;
  openROs: number;
  upcomingAppointments: number;
  lastVisitDate?: string;
};

export type Customer360 = {
  customer: Customer;
  vehicles: CustomerVehicle[];
  salesSummary: CustomerSalesSummary;
  serviceSummary: CustomerServiceSummary;
};
