# Dealer365 MVP — Vibe Coding Implementation Guide

## 1. Project Goal

Dealer365 is a U.S. dealership-focused cloud DMS MVP.  
This repository implements the MVP UI/UX for both **Service** and **Sales** domains using a **pattern-driven design system** and **shadcn/ui-based wrappers**.

The goal is not to build random pages.  
The goal is to build a **cohesive operational product** based on:

- IA v2 (final implementation IA)
- Page Pattern Library
- Pattern Recipe
- Dealer365 design system tone & manner
- d365 wrapper components on top of shadcn/ui

---

## 2. Source of Truth

Use the following documents in this exact priority order:

### Primary
1. `IA 정제본 v2`
2. `Pattern Recipe`
3. `Dealer365 Page Pattern Library (shadcn)`
4. `props spec + 상태 정의 + shadcn 래핑 가이드`
5. `컴포넌트 실제 TSX 초안`

### Secondary
6. `Dealer365 전체 IA 구조`
7. individual domain screen docs
   - Dispatch
   - Service Advisor Dashboard
   - RO Workspace
   - Technician Workbench
   - MPI / VHC Inspection
   - Service Appointment Scheduling
   - Parts Counter
   - Lead Management
   - Deal Desk / Deal Structure
   - Inventory
   - Service Lane Check-in / Reception
   - Service Pickup / Cashier / Payment
   - Customer Communication Center
   - F&I / Contract Generation

### Rule
If there is any conflict:
- **IA v2 wins**
- then **Pattern Recipe**
- then **Page Pattern Library**
- then **component wrapper rules**

Do not invent new page structures unless explicitly required.

---

## 3. Final IA Rule

### Final implementation IA
Use **IA v2** as the final MVP IA.

### Interpretation rule
- `Route` = actual page / screen
- `Tab` = internal view inside a page
- `Drawer` = side drawer / contextual panel
- `Section` = fixed section inside page
- `Utility` = helper flow, tool, or action UI
- `Modal` = dialog-level interaction

Do not convert every IA node into a route.  
Only `Route` nodes become actual pages unless otherwise specified.

---

## 4. Product Scope

### Domains
- Service
- Sales
- Shared / Customer 360
- Admin / Configuration (MVP minimal)

### MVP target screens

#### Service
- Appointment Scheduling
- Lane Check-in
- Service Advisor Dashboard
- RO Workspace
- Dispatch
- Technician Workbench
- MPI / VHC Inspection
- Parts Counter
- Pickup / Cashier
- Communications

#### Sales
- Lead Management
- Inventory
- Deal Desk
- F&I / Contract Generation

#### Shared
- Customer 360
- Vehicle 360

#### Admin
- minimal settings only if required by current flows

### Out of scope for now
- deep accounting
- advanced warranty workflow
- full procurement/returns
- used car recon
- advanced lender integration
- full reporting suite

---

## 5. Tech Stack

- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react
- TanStack Table (for ResultTable / data grids)
- local mock data or mock API for MVP
- no backend dependency required for initial UI flows

---

## 6. Design Direction

### Visual tone
- premium
- calm
- information-dense
- readable
- operational
- precise

### Reference mood
- Genesis-like calm premium tone
- Linear-like density and readability

### Visual rules
- avoid rounded consumer-app UI
- use angular / restrained UI
- radius should stay mostly in **0–3px**
- border-based hierarchy over heavy shadows
- minimal color accents
- neutral dark surfaces
- high text contrast
- avoid playful gradients or inflated cards

### Radius scale
- `0px`
- `2px`
- `3px`

### Examples
- button: 2px
- input: 2px
- badge/chip: 2px
- card/panel: 3px
- table wrappers: 0–2px
- dialog/sheet: 3px

---

## 7. Architecture Rule

Do not use raw shadcn primitives directly inside page screens unless absolutely necessary.

Use this layer structure:

```text
/components/ui/*                 # shadcn vendor layer
/components/d365/atoms/*         # Dealer365 atoms
/components/d365/molecules/*     # Dealer365 molecules
/components/d365/patterns/*      # page-level pattern blocks
/components/domain/*             # domain-specific composite blocks
/lib/design-system/*             # tokens, mappings, formatters
/app/* or /routes/*              # actual pages
```

### Wrapper-first rule
Always prefer:
- `StatusChip`
- `WorkspaceHeader`
- `SearchToolbar`
- `ResultTable`
- `QueueCard`
- `ContextPanel`
- `ActivityTimeline`
- `StepWizardFrame`

Do not style every screen independently.

---

## 8. Core Pattern Rules

### Explorer pattern
Must include:
- `SearchToolbar`
- `FilterRail`
- `ResultTable`

Used in:
- Leads
- Inventory
- Appointments
- Open RO
- Customers

### Workspace pattern
Must include:
- `WorkspaceHeader`
- main working area
- optional or required `ContextPanel`

Used in:
- RO Workspace
- Deal Desk
- Technician Workbench
- Parts Counter

### Queue pattern
Must include:
- `QueueCard`
- `PriorityChip`
- `SLAIndicator`

Used in:
- Dispatch queues
- Pickup queue
- Approval queue
- Arrival queue
- Waitlist

### Wizard pattern
Must include:
- `StepWizardFrame`
- summary panel
- footer actions
- `SignatureSection` when needed

Used in:
- Appointment creation
- Lane Check-in
- Contract generation

### Communication pattern
Must include:
- `ConversationList`
- `MessageThread`
- `MessageComposer`
- `TemplatePicker`

Used in:
- Communication Center
- Unified Inbox
- Customer communication tabs

---

## 9. Component Rules

### Mandatory wrappers
Use these components as standard:
- `DButton`
- `DInput`
- `StatusChip`
- `MoneyValue`
- `TimeValue`
- `SearchField`
- `WorkspaceHeader`
- `StickySummaryBar`
- `SearchToolbar`
- `FilterRail`
- `ResultTable`
- `QueueCard`
- `ContextPanel`
- `ActivityTimeline`
- `StepWizardFrame`

### Forbidden shortcuts
- no direct raw `<button>` styling for primary actions
- no raw status badges in page code
- no custom table implementation outside `ResultTable`
- no ad hoc sticky headers outside `WorkspaceHeader` / `StickySummaryBar`
- no inconsistent rounded classes like `rounded-xl`, `rounded-2xl`

---

## 10. Status / Enum Rule

Do not hardcode status labels repeatedly in screens.

All status values must be mapped centrally in:
- `/lib/design-system/status-map.ts`

Separate status dictionaries by domain:
- service
- sales
- inventory
- parts
- finance

Example:
- `SERVICE_STATUS_MAP`
- `LEAD_STATUS_MAP`
- `DEAL_STATUS_MAP`
- `INVENTORY_STATUS_MAP`

Always render status using `StatusChip`.

---

## 11. Route Rule

Only IA v2 nodes marked as `Route` should become pages.

Examples:
- `/service/appointments`
- `/service/check-in`
- `/service/repair-orders`
- `/service/repair-orders/:roId`
- `/sales/leads`
- `/sales/leads/:leadId`
- `/sales/inventory`
- `/sales/deals/:dealId`
- `/sales/contracts/:dealId`
- `/customers/:customerId`

Internal tabs should stay inside route screens.

---

## 12. Data Strategy

For MVP, use mock data or local JSON-based typed fixtures.

Required:
- typed mock entities
- empty state examples
- loading state examples
- error state examples

Core entities:
- Customer
- Vehicle
- Appointment
- RepairOrder
- OperationLine
- DispatchJob
- Inspection
- Part
- Lead
- Opportunity
- Deal
- Contract
- InventoryUnit

Do not start with backend coupling.  
Start with typed front-end models and predictable mocks.

---

## 13. Screen State Rule

Every MVP route must support at least:
- loading
- empty
- populated
- error

Where relevant also support:
- selected row
- overdue
- warning
- approval pending
- partial data

No happy-path-only screens.

---

## 14. Accessibility / Usability Rule

This is an operational enterprise product.

### Must support
- keyboard navigation in grids and toolbars
- visible focus states
- high contrast text
- compact but readable layout
- large enough touch targets for tablet-heavy service flows

### Especially important for
- Technician Workbench
- Lane Check-in
- Pickup / Cashier
- Inspection Workspace

---

## 15. Build Order

Implement in this order:

### Phase A — foundations
1. `StatusChip`
2. `WorkspaceHeader`
3. `SearchToolbar`
4. `ResultTable`
5. `ContextPanel`
6. `QueueCard`
7. `ActivityTimeline`
8. `StepWizardFrame`

### Phase B — base routes
9. Sales Lead Inbox
10. Inventory List
11. Service Appointment Scheduling
12. Lane Check-in
13. RO Workspace
14. Dispatch
15. Deal Desk

### Phase C — connected flows
16. Technician Workbench
17. MPI / VHC Inspection
18. Parts Counter
19. Pickup / Cashier
20. Communication Center
21. F&I / Contract Generation

---

## 16. Definition of Done

A route is considered done only if:

- it follows IA v2 node type correctly
- it uses the correct pattern recipe
- it uses d365 wrapper components
- it has loading / empty / error states
- it respects radius and tone rules
- it does not bypass shared status mappings
- it fits the premium dense operational visual language

---

## 17. Prompting Rule for Codex

When generating a screen:

1. identify the IA v2 node
2. identify the assigned Pattern ID
3. load required components from Pattern Recipe
4. use d365 wrapper components only
5. respect route type vs tab/section/drawer type
6. do not invent unrelated layout structures
7. generate strongly typed mock data if backend is not provided

### Example prompt style
“Build the Dealer365 Service RO Workspace route based on IA v2 node `SVC-RO-002`, using pattern `PT-SVC-011`. Use `WorkspaceHeader`, `StickySummaryBar`, `OperationLineGrid`, `ContextPanel`, and `ActivityTimeline`. Apply the Dealer365 dark premium dense visual language and radius 0–3px rule. Do not use raw badges for status; use `StatusChip`.”

---

## 18. File Naming Rule

### Components
- kebab-case files
- named exports preferred
- one component per file where practical

Examples:
- `status-chip.tsx`
- `workspace-header.tsx`
- `search-toolbar.tsx`
- `result-table.tsx`

### Routes
Use domain-first grouping.

Examples:
- `/app/service/appointments/page.tsx`
- `/app/service/check-in/page.tsx`
- `/app/service/repair-orders/[roId]/page.tsx`
- `/app/sales/leads/page.tsx`
- `/app/sales/inventory/page.tsx`

---

## 19. Final Rule

This repository is not a collection of pretty isolated pages.  
It is a pattern-based dealership operating product.

When uncertain:
- trust IA v2 first
- trust Pattern Recipe second
- trust d365 wrapper components third

Do not improvise page architecture.  
Compose from the system.
