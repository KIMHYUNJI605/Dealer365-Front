# IA 정제본 v2

# 바로 복붙해서 쓸 수 있는 IA v2 템플릿

```
| IA ID | IA Path | Label | Domain | Node Type | Parent | Canonical Route | Route Path | Pattern ID | Embedded Patterns | Delivery Phase | Role | Entity | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| SVC-RO-002 | 2.4.2 | RO Workspace | Service | Route | Repair Orders | Yes | /service/repair-orders/:roId | PT-SVC-011 | PT-CMN-010, PT-CMN-005 | MVP | Advisor | RepairOrder | Primary RO detail screen |
```

# 1. IA 정제본 v2 포맷

현재 IA의 가장 큰 문제는 **메뉴 / 라우트 / 탭 / 섹션 / 드로어가 같은 depth로 섞여 보이는 점**입니다.

그래서 v2에서는 **트리 구조는 유지하되, 각 노드의 성격을 메타데이터로 분리**해야 합니다.

---

## 1-1. IA v2 필수 컬럼 정의

아래 컬럼을 기본으로 잡는 것을 권장합니다.

| 컬럼명 | 설명 | 예시 |
| --- | --- | --- |
| IA ID | 고유 식별자 | `SVC-RO-001` |
| IA Path | 트리 경로 | `2.4.2` |
| Label | 화면/노드 이름 | `RO Workspace` |
| Domain | 도메인 | `Service` |
| Node Type | 노드 유형 | `Route / Tab / Drawer / Section / Utility / Modal` |
| Parent | 상위 노드 | `Repair Orders` |
| Canonical Route | 실제 대표 라우트 여부 | `Yes / No` |
| Route Path | URL 또는 logical route | `/service/repair-orders/:roId` |
| Pattern ID | 주 패턴 | `PT-SVC-011` |
| Embedded Patterns | 포함 패턴 | `PT-CMN-010, PT-CMN-005` |
| Delivery Phase | 구현 단계 | `MVP / Phase2 / Concept` |
| Role | 주요 사용자 | `Advisor, Manager` |
| Entity | 주요 엔터티 | `RepairOrder` |
| Notes | 비고 | `Approval Queue는 내부 탭으로 우선 처리` |

---

## 1-2. Node Type 규칙

이건 꼭 고정해야 합니다.

### Route

실제 페이지 또는 독립 라우트

예:

- Lead Inbox
- RO Workspace
- Inventory List
- Deal Desk Workspace

---

### Tab

같은 페이지 안의 전환 영역

예:

- RO Timeline
- Communication History
- Purchase History
- Media Review

---

### Drawer

우측 컨텍스트 패널, 상세 보조 패널

예:

- Vehicle Confirmation
- Trade-in Panel
- Right-side Context Drawer 내부 정보

---

### Section

페이지 안의 고정 섹션

예:

- KPI Snapshot
- Approval Messages
- Delivery Notifications

---

### Utility

도우미 기능, 단독 페이지가 아닐 수 있음

예:

- Duplicate / Merge
- Lender Program Selector

---

### Modal

독립 라우트보다 모달/다이얼로그로 보는 것이 맞는 것

예:

- Signature / Authorization
- Receipt Preview
- Quick Hold Vehicle

---

## 1-3. Canonical Route 규칙

이 컬럼이 매우 중요합니다.

같은 데이터를 여러 도메인에서 보더라도, **대표 상세 화면은 하나만** 있어야 합니다.

예를 들면:

- Customer 상세는 `Shared / Customer 360`이 canonical
- Vehicle 상세는 `Shared / Vehicle 360` 또는 `Inventory > Vehicle Detail` 중 하나를 canonical로 결정
- Sales/Service 내 Customer는 진입 리스트로만 사용

### 규칙 예시

- `Sales > Customers > Customer Profile` → Canonical Route = No
- `Shared > Global Customer Profile > Profile Overview` → Canonical Route = Yes

---

# 2. IA 정제본 v2 예시

아래는 지금 IA를 실제 Codex 친화형으로 바꾼 예시입니다.

---

## 2-1. Sales 예시

| IA ID | IA Path | Label | Node Type | Canonical Route | Route Path | Pattern ID | Delivery Phase | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SLS-LEAD-001 | 1.2.1 | Lead Inbox | Route | Yes | `/sales/leads` | PT-CMN-002 | MVP | Explorer 진입점 |
| SLS-LEAD-002 | 1.2.2 | Lead Pipeline | Route | Yes | `/sales/leads/pipeline` | PT-SLS-001 | MVP | Board view |
| SLS-LEAD-003 | 1.2.3 | Lead Detail | Route | Yes | `/sales/leads/:leadId` | PT-CMN-003 | MVP | master-detail |
| SLS-LEAD-004 | 1.2.4 | Communication History | Tab | No | - | PT-CMN-005 | MVP | Lead Detail 내부 탭 |
| SLS-LEAD-005 | 1.2.5 | Tasks / Follow-ups | Tab | No | - | PT-SLS-002 | MVP | Lead Detail 내부 탭 |
| SLS-LEAD-006 | 1.2.6 | Appointment / Visit Booking | Modal | No | - | PT-CMN-006 | Optional | Lead Detail에서 호출 |
| SLS-LEAD-007 | 1.2.7 | Duplicate / Merge | Utility | No | - | PT-SLS-003 | Phase2 | 관리자 또는 CRM 유틸 |

---

## 2-2. Service 예시

| IA ID | IA Path | Label | Node Type | Canonical Route | Route Path | Pattern ID | Delivery Phase | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SVC-APT-001 | 2.2.1 | Appointment Calendar | Route | Yes | `/service/appointments` | PT-SVC-003 | MVP | 캘린더 기본 진입 |
| SVC-APT-002 | 2.2.2 | Appointment List | Tab | No | - | PT-CMN-002 | MVP | 같은 화면의 리스트 뷰 |
| SVC-APT-003 | 2.2.3 | New Appointment | Route | Yes | `/service/appointments/new` | PT-CMN-006 | MVP | guided flow |
| SVC-CHK-001 | 2.3.1 | Arrival Queue | Route | Yes | `/service/check-in` | PT-SVC-008 | MVP | Lane Check-in 진입 |
| SVC-CHK-002 | 2.3.3 | Vehicle Confirmation | Section | No | - | PT-SVC-009 | MVP | Check-in 내부 섹션 |
| SVC-CHK-003 | 2.3.4 | Walk-around | Section | No | - | PT-SVC-010 | MVP | Check-in 내부 섹션 |
| SVC-CHK-004 | 2.3.5 | Signature / Authorization | Modal | No | - | PT-CMN-012 | MVP | 서명 다이얼로그 |
| SVC-RO-001 | 2.4.1 | Open RO List | Route | Yes | `/service/repair-orders` | PT-CMN-002 | MVP | list entry |
| SVC-RO-002 | 2.4.2 | RO Workspace | Route | Yes | `/service/repair-orders/:roId` | PT-SVC-011 | MVP | 핵심 상세 |
| SVC-RO-003 | 2.4.3 | Approval Queue | Tab | No | - | PT-CMN-007 | MVP | RO 내부 탭 또는 Dashboard 연결 |
| SVC-RO-004 | 2.4.5 | RO Timeline | Tab | No | - | PT-CMN-005 | MVP | RO 내부 탭 |

---

## 2-3. Shared 예시

| IA ID | IA Path | Label | Node Type | Canonical Route | Route Path | Pattern ID | Delivery Phase | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SHR-CUS-001 | 3.1.1 | Profile Overview | Route | Yes | `/customers/:customerId` | PT-CMN-008 | MVP | Customer 상세 canonical |
| SHR-CUS-002 | 3.1.3 | Sales History | Tab | No | - | PT-CMN-005 | MVP | Customer 360 내부 탭 |
| SHR-CUS-003 | 3.1.4 | Service History | Tab | No | - | PT-CMN-005 | MVP | Customer 360 내부 탭 |
| SHR-CUS-004 | 3.1.6 | Communication History | Tab | No | - | PT-CMN-011 | MVP | Customer 360 내부 탭 |

---

# 3. IA v2로 정제할 때 삭제/흡수 권장 항목

아래는 독립 노드로 두기보다 **흡수**하는 게 더 좋은 항목입니다.

## 독립 Route로 두지 말고 Tab/Section으로 흡수

- Communication History
- Activity Timeline
- Purchase History
- RO Timeline
- Receipt / Signature
- Approval Messages
- Delivery / Delay Notifications

## Utility 또는 Modal로 내리는 것이 좋은 항목

- Duplicate / Merge
- Signature / Authorization
- Lender / Program Selection
- Quick Hold / Release
- Record Merge

---

# 4. Pattern Recipe 문서

이 문서는 Codex에게 더 직접적입니다.

핵심은 각 패턴마다 **무조건 들어가야 하는 구성요소**를 강제하는 것입니다.

---

## 4-1. Pattern Recipe 표준 포맷

아래 템플릿으로 패턴마다 작성하면 됩니다.

```
Pattern ID:
Pattern Name:
Pattern Level: Page / Embedded / Utility
Purpose:
Used In:
Base Pattern:
Required Components:
Optional Components:
Forbidden Components:
Layout Rules:
Data Rules:
Interaction Rules:
Responsive Rules:
Notes:
```

---

# 5. 핵심 Pattern Recipe 문서

아래는 바로 쓸 수 있는 핵심 레시피입니다.

---

## 5-1. PT-CMN-002 Search + Faceted Explorer

**Pattern ID**

`PT-CMN-002`

**Pattern Name**

Search + Faceted Explorer

**Pattern Level**

Page

**Purpose**

검색, 필터, 정렬, 저장뷰를 이용해 대량 엔터티를 탐색하는 화면

**Used In**

Leads, Inventory, Appointments, Open RO, Customers

**Base Pattern**

None

**Required Components**

- `SearchToolbar`
- `FilterRail`
- `ResultTable`
- `EmptyStateBlock`

**Optional Components**

- `BulkActionBar`
- `SavedViewSwitcher`
- `StickySummaryBar`
- `Pagination`

**Forbidden Components**

- 대형 hero 영역
- full-width KPI tiles 6개 이상
- 불필요한 marketing banner

**Layout Rules**

- 좌측 `FilterRail`
- 상단 `SearchToolbar`
- 중앙 `ResultTable`
- 우측 Context Drawer는 선택적

**Data Rules**

- row selection은 optional
- sort 가능한 최소 2개 컬럼 필요
- empty/loading/error 상태 명시 필요

**Interaction Rules**

- search는 debounce 허용
- filter change는 즉시 또는 apply 방식 중 하나로 통일
- row click 시 detail route 또는 drawer

**Responsive Rules**

- 모바일에서는 rail collapse
- 태블릿에서는 overlay filter 허용

---

## 5-2. PT-CMN-003 Master-Detail Workspace

**Pattern ID**

`PT-CMN-003`

**Pattern Name**

Master-Detail Workspace

**Pattern Level**

Page

**Purpose**

좌측 리스트에서 엔터티를 선택하고, 중앙에서 상세 작업을 수행하는 구조

**Used In**

Lead Detail, Opportunity Detail, Communication Hub

**Required Components**

- `SearchToolbar` 또는 list header
- `QueueCard` 또는 compact list row
- `WorkspaceHeader`
- `ContextPanel` 또는 embedded side section

**Optional Components**

- `ActivityTimeline`
- `StickySummaryBar`
- `ApprovalMessageCard`

**Forbidden Components**

- 완전 독립형 full-screen wizard
- heavy dashboard KPI block

**Layout Rules**

- 좌측 list rail
- 중앙 detail workspace
- 우측 context panel optional

**Data Rules**

- 선택된 entity가 명확해야 함
- empty selection 상태 정의 필요

**Interaction Rules**

- row selection과 detail sync 필요
- selection 유지 규칙 필요

---

## 5-3. PT-CMN-007 Approval / Exception Queue

**Pattern ID**

`PT-CMN-007`

**Pattern Name**

Approval / Exception Queue

**Pattern Level**

Page / Embedded

**Purpose**

승인 대기, SLA 초과, 지연, 예외 항목을 우선순위로 처리

**Used In**

Approval Queue, Pickup Queue, Delay Queue, Waitlist, Parts Request Queue

**Required Components**

- `QueueCard`
- `PriorityChip`
- `SLAIndicator`
- `ExceptionBanner`

**Optional Components**

- `SearchToolbar`
- `QueueGroupHeader`
- `ContextPanel`

**Forbidden Components**

- 대형 DataGrid 중심 구조
- 과한 form 입력 구조

**Layout Rules**

- 리스트 또는 그룹형 큐
- 우선순위, 시간, 상태가 최우선 시각 요소

**Data Rules**

- status
- priority
- age/SLA
- next action
    
    이 4개는 반드시 필요
    

**Interaction Rules**

- queue item 클릭 시 action or detail
- quick action 최소 1개 이상 필요

---

## 5-4. PT-SVC-011 Repair Order Workspace

**Pattern ID**

`PT-SVC-011`

**Pattern Name**

Repair Order Workspace

**Pattern Level**

Page

**Purpose**

RO 기반 작업, 승인, 비용, 상태, parts, history를 통합 관리

**Used In**

Service > Repair Orders > RO Workspace

**Base Pattern**

- `PT-CMN-004 Command Console Workspace`

**Required Components**

- `WorkspaceHeader`
- `StickySummaryBar`
- `OperationLineGrid`
- `ContextPanel`
- `ActivityTimeline`
- `StatusChip`
- `MoneyValue`
- `TimeValue`

**Optional Components**

- `ApprovalMessageCard`
- `ExceptionBanner`
- `RecommendationCard`

**Forbidden Components**

- 단순 폼형 CRUD 페이지
- wizard형 전체 화면
- 과한 카드 분절

**Layout Rules**

- 상단 sticky header
- 중앙 line item workspace
- 우측 context panel
- 하단 또는 탭으로 timeline/history

**Data Rules**

- RO status
- promise time
- totals
- approval state
- parts state
    
    반드시 존재
    

**Interaction Rules**

- line edit는 inline 우선
- approval / send update / assign tech 액션은 헤더 또는 summary에서 접근 가능해야 함

---

## 5-5. PT-SLS-012 Deal Structuring Workspace

**Pattern ID**

`PT-SLS-012`

**Pattern Name**

Deal Structuring Workspace

**Pattern Level**

Page

**Purpose**

차량 가격, 할인, trade, finance, F&I, gross를 구성

**Used In**

Sales > Deal Desk

**Base Pattern**

- `PT-CMN-004 Command Console Workspace`

**Required Components**

- `WorkspaceHeader`
- `StickySummaryBar`
- `DealCalculatorPanel`
- `VehiclePricingPanel`
- `TotalBreakdownCard`
- `StatusChip`
- `MoneyValue`

**Optional Components**

- `ContextPanel`
- `ActivityTimeline`
- `Approval / Exception Queue`

**Forbidden Components**

- 단순 list-only layout
- multi-step wizard only flow

**Layout Rules**

- 고객/차량/금융/총액이 동시에 보여야 함
- gross와 total due는 항상 visible

**Data Rules**

- MSRP
- discount
- trade value
- payoff
- APR
- term
- monthly
- gross

**Interaction Rules**

- 숫자 변경 시 즉시 재계산
- manager approval threshold 반영 필요

---

## 5-6. PT-SVC-008 Lane Check-in Workspace

**Pattern ID**

`PT-SVC-008`

**Pattern Name**

Lane Check-in Workspace

**Pattern Level**

Page

**Purpose**

Appointment 도착 후 실제 RO 생성 전 체크인

**Used In**

Service > Lane Check-in

**Base Pattern**

- `PT-CMN-006 Step-by-step Intake Wizard`

**Required Components**

- `StepWizardFrame`
- `EntityLookupField`
- `WalkaroundCapturePanel`
- `SignatureSection`
- `StickySummaryBar`

**Optional Components**

- `CustomerContextCard`
- `MediaThumb`

**Forbidden Components**

- 단순 테이블형 체크인
- 분절된 다수 모달 흐름

**Layout Rules**

- stepper + main content + side summary
- appointment/vehicle/customer context는 항상 visible

**Data Rules**

- customer
- vehicle
- mileage
- concern
- signature
- RO creation state

---

## 5-7. PT-CMN-011 Communication Thread Workspace

**Pattern ID**

`PT-CMN-011`

**Pattern Name**

Communication Thread Workspace

**Pattern Level**

Page

**Purpose**

고객 메시지, 승인, 템플릿, 응답을 관리

**Used In**

Service Communications, Unified Inbox, Customer 360 Communication

**Required Components**

- `ConversationList`
- `MessageThread`
- `MessageComposer`
- `TemplatePicker`
- `StatusChip`

**Optional Components**

- `CustomerContextCard`
- `ApprovalMessageCard`
- `AttachmentGallery`

**Forbidden Components**

- 단순 readonly log page
- 리스트만 있고 thread 없는 구조

**Layout Rules**

- 좌측 conversation list
- 중앙 thread
- 우측 context optional

**Data Rules**

- channel
- sender
- timestamp
- delivery/read status
- linked entity(RO, lead, deal) 가능해야 함

---

# 6. Pattern Recipe 문서에 추가할 강제 규칙

이건 Codex용으로 매우 중요합니다.

## 6-1. Pattern Composition Rule

예시:

```
Explorer 패턴은 반드시
SearchToolbar + FilterRail + ResultTable
조합을 기본으로 한다.
```

```
Workspace 패턴은 반드시
WorkspaceHeader + main working area
를 포함해야 하며,
ContextPanel은 optional 또는 required로 명시한다.
```

```
Queue 패턴은 반드시
QueueCard + Priority/SLA 표현
을 포함해야 한다.
```

---

## 6-2. Forbidden Rule

Codex는 금지 규칙이 없으면 자주 다른 UI를 섞습니다.

예:

- Explorer에 KPI dashboard를 크게 넣지 않는다
- Queue 패턴을 table-only로 만들지 않는다
- Workspace를 wizard-only로 만들지 않는다
- Status 표현은 badge raw 사용 금지, 반드시 `StatusChip`

---

## 6-3. Wrapper Rule

모든 Pattern Recipe 끝에 아래를 붙이는 걸 권장합니다.

```
Component Rule:
- shadcn primitive direct usage 최소화
- d365 wrapper 우선
- 상태 표현은 StatusChip
- 데이터 테이블은 ResultTable
- 헤더는 WorkspaceHeader
```

---

ㄴ