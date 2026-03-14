# Dealer365 Pattern Rules

This document defines **UI page structure rules** for Dealer365.

Codex must follow these rules when generating screens.

These patterns ensure consistent layout across the application.

---

# 1 Explorer Pattern

Used for list/search pages.

Examples

- Leads
- Inventory
- Customers
- Appointments
- Repair Orders

Structure

Page Header  
SearchToolbar  
FilterRail (optional)  
ResultTable  

Layout

Header
Toolbar
Table

Rules

- Always include SearchToolbar
- Tables must use ResultTable
- Use pagination or infinite scroll
- Rows must open a detail page

Example

Customers List  
Inventory List  
Leads List

---

# 2 Workspace Pattern

Used for operational work screens.

Examples

- Repair Order Workspace
- Deal Desk
- Technician Workbench
- Dispatch

Structure

WorkspaceHeader  
Main Content Area  
Right Context Panel  

Layout

Header  
Workspace  
Context Panel  

Rules

- Always show entity context
- Primary action must be visible
- Context panel shows related data

Example

Repair Order Workspace

---

# 3 Queue Pattern

Used for operational queues.

Examples

- Dispatch Queue
- Approval Queue
- Pickup Queue
- Arrival Queue

Structure

Queue Header  
Queue Cards  

Rules

- Show status badge
- Show time indicator
- Show quick action buttons

Example

Upcoming Arrivals  
Pending Approvals

---

# 4 Wizard Pattern

Used for step-by-step flows.

Examples

- Lane Check-in
- Contract Generation
- Appointment Booking

Structure

Step Indicator  
Form Content  
Footer Actions  

Rules

- Always show step progress
- Always show next action
- Only one primary action

Example

Lane Check-in

Step 1  
Vehicle Info

Step 2  
Customer Confirmation

---

# 5 Communication Pattern

Used for messaging.

Examples

- Customer Communication
- Advisor Messaging
- Notifications

Structure

Conversation List  
Message Thread  
Message Composer  

Rules

- Left panel = conversations
- Right panel = thread
- Composer always visible

---

# 6 Dashboard Pattern

Used for overview pages.

Examples

- Service Dashboard
- Sales Dashboard

Structure

KPI Row  
Operational Cards  
Alerts Panel  

Rules

- KPIs at top
- Operational queues in middle
- Alerts on right side

---

# 7 Layout Grid

Dealer365 uses a **3 column workspace layout**

Example

Main Content  
Secondary Content  
Context Panel

Width rule

Main = 60%  
Secondary = 25%  
Context = 15%

---

# 8 Pattern Restrictions

Do NOT invent new layouts.

Only allowed patterns

Explorer  
Workspace  
Queue  
Wizard  
Communication  
Dashboard  

If a screen does not fit one of these patterns, default to Workspace.

---

# 9 Codex Rules

When generating a screen

1. Identify screen type
2. Choose pattern
3. Apply pattern layout
4. Use design system components

Example

Repair Order Workspace

Pattern → Workspace

Components

WorkspaceHeader  
Cards  
ContextPanel

---

# 10 Pattern Priority

If unsure

Use this priority

Workspace  
Explorer  
Queue  

Do not invent layouts.