Dealer365 패턴 라이브러리의 기본은 크게 5층.

1. **Foundation** — 토큰, 레이아웃, 타이포, 컬러, spacing
2. **Atomic UI** — button, input, badge, checkbox 같은 최소 단위
3. **Data / Status Atoms** — KPI, 상태, 시간, 금액, 우선순위 표현용 원자
4. **Composite Blocks** — card row, filter bar, detail header, timeline item 같은 조합 블록
5. **Pattern Templates** — Explorer, Workspace, Queue, Timeline, Wizard 같은 페이지 패턴

# Detailed Solution

# 1. Dealer365 패턴 라이브러리의 기본 구조

권장 계층은 아래처럼 잡는 게 가장 안정적입니다.

```
Layer 0. Design Tokens
Layer 1. Atomic Primitives
Layer 2. Domain Atoms
Layer 3. Composite Components
Layer 4. Page Patterns
Layer 5. Screens
```

shadcn/ui는 주로 **Layer 1**을 담당합니다.

하지만 Dealer365 패턴 라이브러리를 만들려면 실제로 중요한 건 **Layer 2~4**입니다.

---

# 2. Layer 1 — shadcn 기반 Atomic Primitives

아래는 **무조건 기본으로 가져가야 하는 shadcn 원자 컴포넌트**입니다.

## A. Input 계열

이건 거의 모든 DMS 화면의 바닥입니다.

- `Button`
- `Input`
- `Textarea`
- `Checkbox`
- `Radio Group`
- `Switch`
- `Select`
- `Combobox`
    
    → shadcn 기본 조합으로 구현
    
- `Date Picker`
- `Time Picker`
    
    → 커스텀 확장 필요
    
- `Slider`
- `OTP/Input PIN`
    
    → 있으면 좋지만 우선순위 낮음
    

---

## B. Overlay / Context 계열

DMS는 세부정보와 예외 처리가 많아서 필수입니다.

- `Dialog`
- `Alert Dialog`
- `Drawer`
- `Sheet`
- `Popover`
- `Tooltip`
- `Hover Card`
- `Dropdown Menu`
- `Context Menu`

---

## C. Structure 계열

페이지 패턴 조립에 필수입니다.

- `Card`
- `Tabs`
- `Accordion`
- `Separator`
- `Scroll Area`
- `Resizable`
- `Collapsible`

---

## D. Feedback / Status 계열

DMS는 상태 중심이라 중요합니다.

- `Badge`
- `Progress`
- `Skeleton`
- `Toast`
- `Alert`

---

## E. Navigation 계열

메뉴 구조에 필요합니다.

- `Navigation Menu`
- `Breadcrumb`
- `Pagination`
- `Command`
- `Menubar`

---

## F. Data Display 계열

DMS에서 가장 중요한 축입니다.

- `Table`
- `Avatar`
- `Calendar`
- `Chart`
    
    → shadcn 자체보다 recharts wrapper 권장
    

---

# 3. Layer 2 — Dealer365 Domain Atoms

이게 핵심입니다.

이건 shadcn 기본 컴포넌트가 아니라, **Dealer365 도메인에 맞게 래핑한 원자 컴포넌트**입니다.

즉, 패턴의 진짜 최소 단위는 아래 같은 것들입니다.

---

## 3-1. Status Atom 계열

### 1) `StatusChip`

딜러십 상태를 색/아이콘/텍스트로 표현

예:

- New
- Open
- Waiting Approval
- In Progress
- Ready
- Delivered
- Hold
- Reserved
- Backorder
- No-show

권장 props

```
typeStatusChipProps= {
  status:
|"new"
|"open"
|"in_progress"
|"waiting_approval"
|"waiting_parts"
|"ready"
|"delivered"
|"hold"
|"reserved"
|"backorder"
|"cancelled";
  size?:"sm"|"md";
  withIcon?:boolean;
}
```

기반 shadcn:

- `Badge`

---

### 2) `PriorityChip`

우선순위 전용

예:

- Critical
- High
- Medium
- Low
- Waiting Customer
- VIP
- Recall

기반:

- `Badge`

---

### 3) `SLAIndicator`

시간 압박 표시 원자

예:

- 8 min to arrival
- 27 min pending approval
- 43 min overdue

기반:

- `Badge` + icon + utility text

---

### 4) `HealthIndicator`

MPI / Inspection용

예:

- Green
- Yellow
- Red

기반:

- `Button` 또는 `Toggle Group`

---

## 3-2. Data Atom 계열

### 5) `KpiValue`

숫자 + 단위 + 증감 표현

예:

- Open ROs 23
- ARO $612
- Approval Rate 68%

기반:

- text primitives + `Badge`

---

### 6) `MoneyValue`

통화 표시 원자

예:

- `$644.40`
- 세금 포함/제외 옵션
- 음수/할인 표현

---

### 7) `TimeValue`

시간/ETA 표시

예:

- 09:20 AM
- ETA 11:35
- 1h 20m

---

### 8) `DeltaValue`

상승/하락/위험 표시

예:

- +12%
- 3 jobs
- 25 min delay

---

### 9) `EntityLabel`

고객, 차량, RO, Deal, Lead 식별자 표시

예:

- RO-240313-0182
- STK-4421
- Lead #1023
- 2024 Tucson Limited

---

## 3-3. Input Atom 계열

### 10) `SearchField`

shadcn `Input`의 래퍼

옵션:

- icon
- clear
- debounce
- shortcut hint

---

### 11) `FilterChip`

Explorer 패턴용 필터 토큰

예:

- Waiting
- Open RO
- New Lead
- Backorder

기반:

- `Button` / `Badge`

---

### 12) `InlineEditableField`

RO, Deal, Inventory에서 많이 씀

예:

- price
- mileage
- promise time
- APR

기반:

- `Input`
- `Popover`
- `Button`

---

## 3-4. Media Atom 계열

### 13) `MediaThumb`

MPI, Walk-around, Technician Media용

기반:

- `Card`
- `Dialog`

---

### 14) `AvatarWithMeta`

직원/고객 식별

기반:

- `Avatar`

---

# 4. Layer 3 — Composite Components

이제부터가 실제 패턴을 만드는 재료입니다.

아래는 Dealer365에서 **반드시 공통화해야 할 조합 컴포넌트**입니다.

## 4-1. Header / Summary 계열

### 1) `WorkspaceHeader`

모든 작업 화면 상단 공통

구성:

- Title
- Entity meta
- Status chips
- Quick actions

사용처:

- RO Workspace
- Deal Desk
- Inventory Detail
- Appointment Detail
- Lane Check-in

기반:

- `Card`, `Button`, `Badge`, `Separator`

---

### 2) `StickySummaryBar`

금액/상태/ETA 같은 중요한 값 고정

사용처:

- RO totals
- Deal summary
- Invoice summary

---

## 4-2. Explorer 계열

### 3) `FilterRail`

좌측 필터 레일

구성:

- accordion sections
- checkbox groups
- range filter
- status chips

사용처:

- Leads
- Inventory
- Open ROs
- Appointments

---

### 4) `SearchToolbar`

상단 검색, 필터, 정렬, 저장뷰

사용처:

- 거의 모든 Explorer/List

---

### 5) `ResultTable`

Dealer365 공통 데이터 테이블 래퍼

필수 기능:

- column config
- sort
- row selection
- sticky header
- row action
- empty state

기반:

- `Table`

이건 사실상 shadcn `Table`을 직접 쓰지 말고

**TanStack Table + shadcn styling wrapper**로 가는 게 맞습니다.

---

## 4-3. Queue / Board 계열

### 6) `QueueCard`

우선순위/상태/시간이 있는 카드

사용처:

- Arrival Queue
- Pickup Queue
- Parts Request Queue
- Approval Queue
- Lead Inbox

---

### 7) `TimelineLane`

시간축/단계축 기반 보드

사용처:

- Dispatch
- Technician Timeline
- Activity Timeline

---

### 8) `ExceptionBanner`

지연/예외/경고 상단 강조 컴포넌트

---

## 4-4. Context 계열

### 9) `ContextPanel`

우측 사이드 컨텍스트 패널

구성:

- tabs / accordion
- vehicle history
- communication
- AI recommendation
- activity

사용처:

- RO
- Deal Desk
- Inventory
- Lead Detail

기반:

- `Sheet`, `Tabs`, `Accordion`

---

### 10) `ActivityTimeline`

공통 활동 이력

사용처:

- Lead
- RO
- Deal
- Messages
- Vehicle history

---

## 4-5. Messaging 계열

### 11) `ConversationList`

### 12) `MessageThread`

### 13) `TemplatePicker`

### 14) `Composer`

이 4개 조합으로 Communication Center 전체를 구성할 수 있습니다.

---

## 4-6. Wizard 계열

### 15) `StepWizardFrame`

Appointment / Check-in / Contract 공통 프레임

구성:

- stepper
- main form
- side summary
- footer actions

---

### 16) `SignatureSection`

전자서명, 동의 체크, 확인

---

## 4-7. Domain Composite 계열

### 17) `OperationLineGrid`

RO 전용 핵심 조합

### 18) `DealCalculatorPanel`

Deal Desk 전용

### 19) `InspectionChecklist`

MPI 전용

### 20) `PartsLookupPanel`

Parts Counter 전용

### 21) `VehiclePricingPanel`

Inventory / Deal 공용

이건 이미 “원자”는 아니고 **도메인별 복합 블록**입니다.

하지만 패턴보다 한 단계 아래라서 공통화해야 합니다.

---

## 4-1. Header / Summary 계열

### 1) `WorkspaceHeader`

모든 작업 화면 상단 공통

구성:

- Title
- Entity meta
- Status chips
- Quick actions

사용처:

- RO Workspace
- Deal Desk
- Inventory Detail
- Appointment Detail
- Lane Check-in

기반:

- `Card`, `Button`, `Badge`, `Separator`

---

### 2) `StickySummaryBar`

금액/상태/ETA 같은 중요한 값 고정

사용처:

- RO totals
- Deal summary
- Invoice summary

---

## 4-2. Explorer 계열

### 3) `FilterRail`

좌측 필터 레일

구성:

- accordion sections
- checkbox groups
- range filter
- status chips

사용처:

- Leads
- Inventory
- Open ROs
- Appointments

---

### 4) `SearchToolbar`

상단 검색, 필터, 정렬, 저장뷰

사용처:

- 거의 모든 Explorer/List

---

### 5) `ResultTable`

Dealer365 공통 데이터 테이블 래퍼

필수 기능:

- column config
- sort
- row selection
- sticky header
- row action
- empty state

기반:

- `Table`

이건 사실상 shadcn `Table`을 직접 쓰지 말고

**TanStack Table + shadcn styling wrapper**로 가는 게 맞습니다.

---

## 4-3. Queue / Board 계열

### 6) `QueueCard`

우선순위/상태/시간이 있는 카드

사용처:

- Arrival Queue
- Pickup Queue
- Parts Request Queue
- Approval Queue
- Lead Inbox

---

### 7) `TimelineLane`

시간축/단계축 기반 보드

사용처:

- Dispatch
- Technician Timeline
- Activity Timeline

---

### 8) `ExceptionBanner`

지연/예외/경고 상단 강조 컴포넌트

---

## 4-4. Context 계열

### 9) `ContextPanel`

우측 사이드 컨텍스트 패널

구성:

- tabs / accordion
- vehicle history
- communication
- AI recommendation
- activity

사용처:

- RO
- Deal Desk
- Inventory
- Lead Detail

기반:

- `Sheet`, `Tabs`, `Accordion`

---

### 10) `ActivityTimeline`

공통 활동 이력

사용처:

- Lead
- RO
- Deal
- Messages
- Vehicle history

---

## 4-5. Messaging 계열

### 11) `ConversationList`

### 12) `MessageThread`

### 13) `TemplatePicker`

### 14) `Composer`

이 4개 조합으로 Communication Center 전체를 구성할 수 있습니다.

---

## 4-6. Wizard 계열

### 15) `StepWizardFrame`

Appointment / Check-in / Contract 공통 프레임

구성:

- stepper
- main form
- side summary
- footer actions

---

### 16) `SignatureSection`

전자서명, 동의 체크, 확인

---

## 4-7. Domain Composite 계열

### 17) `OperationLineGrid`

RO 전용 핵심 조합

### 18) `DealCalculatorPanel`

Deal Desk 전용

### 19) `InspectionChecklist`

MPI 전용

### 20) `PartsLookupPanel`

Parts Counter 전용

### 21) `VehiclePricingPanel`

Inventory / Deal 공용

이건 이미 “원자”는 아니고 **도메인별 복합 블록**입니다.

하지만 패턴보다 한 단계 아래라서 공통화해야 합니다.