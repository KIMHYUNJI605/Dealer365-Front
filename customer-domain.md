# Dealer365 Customer Domain Specification (MVP)

This document defines the **Customer domain architecture** for Dealer365 MVP.
Place this file inside `/docs/customer-domain.md` and let Codex read it before generating code.

The goal is to ensure **Customer-related screens are implemented consistently across Sales and Service**.

---

# 1. Core Rule

Dealer365 has **multiple entry points for customers but only one canonical customer detail page**.

Navigation structure:

Sales Customers List  
→ /sales/customers

Service Customers List  
→ /service/customers

Customer 360 Detail  
→ /customers/:customerId

Rules:

- Customer detail page must exist **only once**
- All customer rows must navigate to `/customers/:customerId`
- Sales and Service only own **list entry points**
- All detailed information must live in **Customer 360**

---

# 2. Routes

## Sales Customers

Route  
/sales/customers

Pattern  
PT-CMN-002 Search + Faceted Explorer

Required Components

- SearchToolbar
- FilterRail
- ResultTable
- CustomerIdentity

Suggested Columns

- Name
- Phone
- Email
- Last Activity
- Active Opportunities
- Last Purchase

Row click behavior

/customers/:customerId

---

## Service Customers

Route  
/service/customers

Pattern  
PT-CMN-002 Search + Faceted Explorer

Required Components

- SearchToolbar
- FilterRail
- ResultTable
- CustomerIdentity

Suggested Columns

- Name
- Phone
- Vehicles
- Upcoming Appointment
- Open RO
- Last Visit
- Declined Services

Row click behavior

/customers/:customerId

---

## Customer 360

Route  
/customers/:customerId

Pattern  
PT-CMN-008 360 Context Profile

Required Components

- WorkspaceHeader
- StickySummaryBar
- Tabs
- CustomerContextCard
- ActivityTimeline

Tabs

- Overview
- Sales History
- Service History
- Vehicles
- Communications

---

# 3. Data Model

## Customer

```ts
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
```

---

## Customer Vehicle

```ts
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
```

---

## Customer Sales Summary

```ts
export type CustomerSalesSummary = {
  totalPurchases: number;
  activeOpportunities: number;
  lastPurchaseDate?: string;
};
```

---

## Customer Service Summary

```ts
export type CustomerServiceSummary = {
  totalVisits: number;
  openROs: number;
  upcomingAppointments: number;
  lastVisitDate?: string;
};
```

---

# 4. Customer 360 Aggregate

```ts
export type Customer360 = {
  customer: Customer;
  vehicles: CustomerVehicle[];
  salesSummary: CustomerSalesSummary;
  serviceSummary: CustomerServiceSummary;
};
```

---

# 5. Shared Components

## CustomerIdentity

```ts
export type CustomerIdentityProps = {
  customerId: string;
  fullName: string;
  phone?: string;
  email?: string;
};
```

Used in

- tables
- headers
- cards
- communication panels

---

## CustomerContextCard

```ts
export type CustomerContextCardProps = {
  customer: Customer;
  salesSummary?: CustomerSalesSummary;
  serviceSummary?: CustomerServiceSummary;
};
```

Used in

- RO Workspace
- Deal Desk
- Lane Check-in
- Communication Center

---

# 6. Mock Data

Fixtures required

```ts
mockCustomers
mockCustomer360
mockCustomerSalesHistory
mockCustomerServiceHistory
mockCustomerCommunications
```

Include edge cases:

- customers without vehicles
- customers with service only
- customers with sales only
- customers with both
- customers with unread communication

---

# 7. Screen States

All screens must support

- loading
- empty
- populated
- error

Customer 360 additional

- customer not found
- no vehicles
- no sales history
- no service history

---

# 8. Navigation Rules

Allowed flows

Sales

Lead Detail → Customer 360  
Opportunity Detail → Customer 360

Service

Appointment Detail → Customer 360  
RO Workspace → Customer 360  
Lane Check-in → Customer 360

Forbidden

/sales/customers/:customerId  
/service/customers/:customerId

Only allowed detail route

/customers/:customerId

---

# 9. Implementation Order

1. Customer types
2. mock data
3. CustomerIdentity component
4. CustomerContextCard component
5. Sales Customers List
6. Service Customers List
7. Customer 360 Route
8. Customer 360 tabs
9. Communication integration

---

# 10. Final Rule

Customer is a **shared entity across Sales and Service**.

Therefore

- lists can exist in multiple domains
- detail exists only once
- context components must be reused
- all navigation converges to Customer 360
