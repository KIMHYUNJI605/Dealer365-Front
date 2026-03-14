- **무드**: 제네시스처럼 고급스럽고 차분한 톤
- **구조**: Linear처럼 정보밀도는 높지만 가독성은 좋음
- **형태**: 과하게 둥글지 않은, 거의 각진 UI
- **Radius 원칙**: `0 ~ 3px` 중심
- **목표**: shadcn primitive를 그대로 쓰지 않고, **Dealer365용 wrapper atom/molecule**로 재정의

핵심은 이겁니다.

**shadcn를 직접 페이지에 쓰지 말고, Dealer365 Atomic Inventory를 먼저 만든 뒤 그 위에 패턴을 쌓아야 합니다.**

---

# Detailed Solution

# 1. Dealer365 디자인 시스템 톤앤매너 기준

먼저 이번 인벤토리의 전제 기준을 짧게 고정합니다.

## Visual Direction

### Mood

- Premium
- Calm
- Dense
- Operational
- Precise

### Avoid

- 과한 라운드
- 과한 그림자
- 소비자 앱 같은 장난스러운 컬러
- 불필요한 카드 중첩
- 지나치게 큰 여백
- 복잡해보이는 레이아웃

---

## Radius Rule

권장 토큰:

```
radius-none = 0
radius-2xs = 2
radius-xs = 3
```

실제 적용 원칙:

- Table / Grid / Input / Filter / Toolbar: `0 ~ 2`
- Card / Panel / Drawer: `2 ~ 3`
- Modal: `3`
- Pill chip 형태는 지양, badge도 직사각형 기반 유지

즉 shadcn 기본의 `rounded-md`, `rounded-lg`는 거의 그대로 쓰지 않고 오버라이드해야 합니다.

---

## Density Rule

- Toolbar 높이: 36~40
- Input 높이: 34~38
- Row 높이: 36 / 44 / 52 (dense / default / comfortable)
- 패널 간격: 8~12
- 카드 padding: 8~12
- 숫자/KPI는 크되 과장하지 않음

# 2. Layer 정의

이번 Inventory는 아래 3개 레이어로 정리합니다.

- **Primitive**: shadcn 기본 primitive 또는 매우 얇은 wrapper
- **Atom**: Dealer365 도메인에서 반복되는 최소 표현 단위
- **Molecule**: Atom 여러 개가 묶여 패턴의 재료가 되는 조합 블록

---

# 3. Dealer365 Atomic Component Inventory 표

## 3-1. Primitive Layer

| 컴포넌트명 | 레이어 | 기반 shadcn 컴포넌트 | 주요 props | 사용 패턴 | 우선순위 | 코드화 |
| --- | --- | --- | --- | --- | --- | --- |
| DButton | Primitive | Button | variant, size, intent, iconLeft, iconRight, loading, destructive | 모든 패턴 | P0 | 필수 |
| DInput | Primitive | Input | value, placeholder, prefix, suffix, state, dense | Explorer, Wizard, Workspace | P0 | 필수 |
| DTextarea | Primitive | Textarea | rows, resize, state, dense | RO, Check-in, Communications | P0 | 필수 |
| DSelect | Primitive | Select | options, value, placeholder, disabled, dense | Wizard, Filters, Detail | P0 | 필수 |
| DCheckbox | Primitive | Checkbox | checked, indeterminate, disabled | Grid, FilterRail | P0 | 필수 |
| DRadioGroup | Primitive | Radio Group | options, value, orientation | Wizard, Payment, F&I | P1 | 필수 |
| DSwitch | Primitive | Switch | checked, disabled, label | Settings, Filters | P2 | 권장 |
| DDialog | Primitive | Dialog | open, title, description, footerActions | Confirm, Edit, Approval | P0 | 필수 |
| DDrawer | Primitive | Drawer / Sheet | side, size, open, title | ContextPanel, Detail Drawer | P0 | 필수 |
| DPopover | Primitive | Popover | trigger, content, align | Inline Edit, Quick Actions | P1 | 필수 |
| DTooltip | Primitive | Tooltip | content, side | Dense UI 전체 | P1 | 필수 |
| DDropdown | Primitive | Dropdown Menu | items, align, dangerKeys | Table row actions, headers | P0 | 필수 |
| DTabs | Primitive | Tabs | tabs, value, orientation | Workspace, ContextPanel | P0 | 필수 |
| DAccordion | Primitive | Accordion | items, multiple | FilterRail, ContextPanel | P1 | 필수 |
| DSeparator | Primitive | Separator | orientation, inset | 모든 패턴 | P0 | 필수 |
| DBadgeBase | Primitive | Badge | tone, size, icon, shape | Status / Priority atoms 기반 | P0 | 필수 |
| DProgress | Primitive | Progress | value, tone, size | Inspection, Upload, KPI | P2 | 권장 |
| DAlert | Primitive | Alert | tone, title, description | Exception, Warning | P1 | 필수 |
| DSkeleton | Primitive | Skeleton | variant, lines | Loading states | P1 | 권장 |
| DTableBase | Primitive | Table | columns, rows, stickyHeader, density | Explorer, Grid | P0 | 필수 |
| DScrollArea | Primitive | Scroll Area | orientation, maxHeight | Panels, Threads, Drawers | P1 | 필수 |
| DCalendar | Primitive | Calendar | selected, mode, disabledDates | Appointment, Date Filter | P1 | 필수 |
| DCommand | Primitive | Command | items, searchPlaceholder | Global Search, Lookup | P1 | 권장 |
| DAvatar | Primitive | Avatar | src, fallback, size | Staff, Customer | P2 | 권장 |

---

## 3-2. Atom Layer

| 컴포넌트명 | 레이어 | 기반 shadcn 컴포넌트 | 주요 props | 사용 패턴 | 우선순위 | 코드화 |
| --- | --- | --- | --- | --- | --- | --- |
| StatusChip | Atom | Badge | status, domain, size, withIcon | Queue, Workspace, Explorer | P0 | 필수 |
| PriorityChip | Atom | Badge | priority, compact, withIcon | Queue, Dispatch, Advisor | P0 | 필수 |
| SLAIndicator | Atom | Badge + text | valueMin, state, showIcon | Queue, Dashboard, Pickup | P0 | 필수 |
| HealthIndicator | Atom | Button / Toggle | level(green/yellow/red), selected | MPI, Checklists | P0 | 필수 |
| KpiValue | Atom | text + badge | label, value, delta, trend, compact | Dashboard | P0 | 필수 |
| MoneyValue | Atom | text | amount, currency, negativeStyle, emphasis | Deal, RO, Invoice | P0 | 필수 |
| TimeValue | Atom | text + icon | datetime, mode(time/duration/eta), relative | Queue, Header, Timeline | P0 | 필수 |
| DeltaValue | Atom | text + icon | value, direction, unit, tone | KPI, Forecast, Pricing | P1 | 권장 |
| EntityLabel | Atom | text + badge | type(ro/deal/lead/stock/vin), value, muted | Grid, Header, Cards | P0 | 필수 |
| MetaPair | Atom | text | label, value, truncate, mono | Detail, Header, Summary | P0 | 필수 |
| SectionTitle | Atom | text + action | title, subtitle, action | 모든 패턴 | P0 | 필수 |
| SearchField | Atom | Input | query, onSearch, clearable, shortcutHint | Explorer, Toolbars | P0 | 필수 |
| FilterChip | Atom | Button / Badge | label, active, removable, count | Explorer, Toolbar | P0 | 필수 |
| InlineEditableField | Atom | Input + Popover | value, type, editable, onSave | RO, Deal, Inventory | P1 | 필수 |
| TagValue | Atom | Badge | label, tone, compact | Summary, Detail | P1 | 권장 |
| FileAttachmentPill | Atom | Badge + icon | filename, type, size | Messages, Notes | P2 | 선택 |
| MediaThumb | Atom | Card + Dialog | src, type, status, removable | MPI, Walk-around, Media | P1 | 필수 |
| IconStat | Atom | icon + text | icon, value, label, tone | KPI, inline metrics | P1 | 권장 |
| EmptyStateBlock | Atom | Card + Button | title, description, action | Explorer, Queue | P1 | 필수 |
| RowSelectIndicator | Atom | Checkbox | selected, partial | Grid | P0 | 필수 |
| CountBadge | Atom | Badge | count, tone, max | Tabs, Queues, chips | P1 | 권장 |
| PresenceDot | Atom | div/badge | state(active/idle/offline) | Staff, Communication | P2 | 선택 |
| SignaturePadTrigger | Atom | Button + Dialog | signed, signerName, timestamp | Check-in, Cashier, Contract | P1 | 필수 |
| ApprovalStatePill | Atom | Badge | state(sent/viewed/approved/declined/expired) | RO, Messages, MPI | P0 | 필수 |
| VehicleIdentity | Atom | text stack | year, make, model, trim, vinTail | Inventory, RO, Appointment | P0 | 필수 |
| PersonIdentity | Atom | Avatar + text | name, role, contact, compact | Leads, Messages, Header | P1 | 필수 |

---

## 3-3. Molecule Layer

| 컴포넌트명 | 레이어 | 기반 shadcn 컴포넌트 | 주요 props | 사용 패턴 | 우선순위 | 코드화 |
| --- | --- | --- | --- | --- | --- | --- |
| WorkspaceHeader | Molecule | Card + Badge + Button | title, entity, status, actions, breadcrumbs | Workspace 전반 | P0 | 필수 |
| StickySummaryBar | Molecule | Card + Separator | items, sticky, compact, actions | RO, Deal, Invoice, Contract | P0 | 필수 |
| SearchToolbar | Molecule | Input + Select + Button + chips | search, filters, sort, savedView, actions | Explorer 전반 | P0 | 필수 |
| FilterRail | Molecule | Accordion + Checkbox + chips | sections, values, applyMode | Explorer 전반 | P0 | 필수 |
| ResultTable | Molecule | Table + Dropdown + Checkbox | columns, data, density, rowActions, bulkActions | Explorer, Grids | P0 | 필수 |
| QueueCard | Molecule | Card + chips + meta | title, subtitle, status, priority, sla, actions | Queue, Inbox | P0 | 필수 |
| QueueGroupHeader | Molecule | text + badge + action | label, count, collapse | Queue Board | P1 | 필수 |
| ContextPanel | Molecule | Drawer/Sheet + Tabs | sections, tabs, width, stickyActions | Workspace 전반 | P0 | 필수 |
| ActivityTimeline | Molecule | list + icons + meta | items, groupByDate, compact | Lead, RO, Deal, Vehicle | P0 | 필수 |
| ActivityItem | Molecule | icon + meta + actions | actor, type, timestamp, content | Timeline | P1 | 필수 |
| ConversationList | Molecule | list + badge + text | items, selectedId, unreadCount | Communication | P0 | 필수 |
| MessageThread | Molecule | ScrollArea + message item | messages, channel, grouped | Communication | P0 | 필수 |
| MessageComposer | Molecule | Textarea + templates + send | text, attachments, channel, sendState | Communication | P0 | 필수 |
| TemplatePicker | Molecule | Popover + Command | templates, category, onSelect | Communication, Approval | P1 | 필수 |
| StepWizardFrame | Molecule | Steps + layout + footer | steps, currentStep, summary, footerActions | Appointment, Check-in, Contract | P0 | 필수 |
| StepperHeader | Molecule | text + progress | steps, current, dense | Wizard | P1 | 필수 |
| SignatureSection | Molecule | Alert + Button + Dialog | consentItems, signer, mode | Check-in, Cashier, Contract | P0 | 필수 |
| DetailSummaryCard | Molecule | Card + meta pairs | title, meta, chips, actions | Detail, side panel | P1 | 필수 |
| StatTile | Molecule | Card + KpiValue | label, value, delta, action | Dashboard | P1 | 필수 |
| ExceptionBanner | Molecule | Alert | tone, message, actions, dismissible | Queue, Workspace | P0 | 필수 |
| EmptyQueuePanel | Molecule | Card | title, helper, action | Queue, Inbox | P2 | 권장 |
| SectionCard | Molecule | Card + header | title, action, children, density | 대부분 화면 | P0 | 필수 |
| FormRow | Molecule | label + input + helper | label, required, error, control | Wizard, forms | P0 | 필수 |
| InspectorSidePanel | Molecule | Tabs + meta + list | context, history, ai, notes | RO, Deal, Inventory | P1 | 필수 |
| ApprovalMessageCard | Molecule | Card + state + actions | item, sentAt, viewedAt, status | RO, MPI, Comm | P1 | 필수 |
| AttachmentGallery | Molecule | thumbs + preview | files, previewMode | MPI, Messages, Walk-around | P2 | 권장 |
| PaymentMethodSelector | Molecule | Radio + cards | methods, selected, fees | Cashier | P1 | 필수 |
| TotalBreakdownCard | Molecule | Card + money rows | lineItems, total, highlight | RO, Deal, Invoice | P0 | 필수 |
| EntityLookupField | Molecule | Command + Input + result item | entityType, query, results, createNew | Customer, Vehicle, Appointment | P0 | 필수 |
| CalendarSlotCard | Molecule | Card + badges | start, duration, score, fit, selected | Scheduling | P1 | 필수 |
| CapacityHeatCell | Molecule | div + tooltip | load, state, label | Scheduling, Dispatch | P1 | 필수 |
| InspectionChecklist | Molecule | list + status controls | items, progress, grouped | MPI | P1 | 필수 |
| RecommendationCard | Molecule | Card + money + action | title, reason, estimate, status | MPI, RO | P1 | 필수 |
| OperationLineGrid | Molecule | DataGrid wrapper | lines, editable, totals, status | RO | P0 | 필수 |
| DealCalculatorPanel | Molecule | Form + summary | msrp, discount, taxes, apr, trade | Deal Desk | P0 | 필수 |
| VehiclePricingPanel | Molecule | Card + inline edit | msrp, price, discount, history | Inventory, Deal | P1 | 필수 |
| PartsLookupPanel | Molecule | Search + table + action | query, stock, substitutes, issue | Parts Counter | P1 | 필수 |
| WalkaroundCapturePanel | Molecule | Media + checklist + note | areas, photos, condition | Check-in | P1 | 필수 |
| CustomerContextCard | Molecule | summary + history links | customer, vehicles, preferences | Shared, Comm, Lead | P1 | 필수 |

---

# 4. 우선순위 해석 기준

## P0

패턴 라이브러리와 MVP 화면을 바로 만들기 위해 **먼저 코드화해야 하는 컴포넌트**

## P1

핵심 화면 완성도를 높이기 위해 **1차 스프린트 내 포함 권장**

## P2

운영성/품질 향상용, 또는 2차 확장에 적합

---

# 5. 패턴별 필수 컴포넌트 매핑

아래는 “어떤 패턴에 어떤 원자/조합이 꼭 필요한가”를 빠르게 보는 표입니다.

| 패턴 | 필수 컴포넌트 |
| --- | --- |
| Explorer | SearchToolbar, FilterRail, ResultTable, StatusChip, EmptyStateBlock |
| Workspace | WorkspaceHeader, StickySummaryBar, SectionCard, ContextPanel, ActivityTimeline |
| Queue | QueueCard, QueueGroupHeader, SLAIndicator, PriorityChip, ExceptionBanner |
| Wizard | StepWizardFrame, StepperHeader, FormRow, SignatureSection, StickySummaryBar |
| Communication | ConversationList, MessageThread, MessageComposer, TemplatePicker, ApprovalStatePill |
| Dashboard | StatTile, KpiValue, ExceptionBanner, QueueCard |
| Detail / 360 | DetailSummaryCard, CustomerContextCard, ActivityTimeline, MetaPair |
| Grid-heavy Ops | ResultTable, InlineEditableField, TotalBreakdownCard, StatusChip |

---

# 6. shadcn 코드화 원칙

이 인벤토리를 실제 코드로 옮길 때는 아래 원칙이 중요합니다.

## 1) `/ui`와 `/atoms`를 분리

`Button`, `Input`은 `/ui`에 두고

`StatusChip`, `MoneyValue`, `EntityLookupField`는 `/atoms` 또는 `/molecules`로 분리합니다.

---

## 2) 상태 표현을 토큰화

`StatusChip` 하나 안에서 아래를 모두 관리해야 합니다.

- color
- icon
- label
- density
- domain mapping

예:

- service status
- sales status
- finance status
- inventory status

---

## 3) Radius를 전역 오버라이드

말씀하신 성향을 반영하면 아래처럼 가는 게 맞습니다.

```
Button: 2px
Input: 2px
Select trigger: 2px
Card: 3px
Dialog: 3px
Badge: 2px
Table container: 0~2px
```

즉 Tailwind/shadcn 토큰에서 `rounded-md`, `rounded-lg`를 거의 쓰지 않고,

`rounded-[2px]`, `rounded-[3px]`, `rounded-none` 위주로 정리해야 합니다.

---

## 4) 그림자보다 선과 대비 중심

제네시스 같은 차분한 프리미엄 무드를 원하면,

- heavy shadow 최소화
- panel elevation보다 border / surface contrast 사용
- neutral gray scale + restrained accent
    
    이 맞습니다.
    

즉 컴포넌트도 다음 원칙이 좋습니다.

- 카드: 그림자 거의 없음 또는 아주 약함
- 보더 선명도 높음
- 텍스트 대비 충분
- 액션 컬러 최소화

---

# 7. 추천 토큰 방향 간단 초안

## Radius

```
--radius-none: 0px
--radius-2xs: 2px
--radius-xs: 3px
```

## Border

```
--border-strong: 1px solid rgba(255,255,255,0.12)
--border-muted: 1px solid rgba(255,255,255,0.08)
```

## Surface

```
--surface-0: #0B0D10
--surface-1: #111317
--surface-2: #161A20
--surface-3: #1B2028
```

## Accent

제네시스처럼 과한 블루보다

차분한 실버/웜그레이/딥네이비 계열이 더 어울립니다.

---

# 8. 실제 개발팀 기준 “먼저 코드화할 15개”

가장 먼저 만들어야 하는 세트만 따로 뽑으면 이렇습니다.

1. DButton
2. DInput
3. StatusChip
4. MoneyValue
5. TimeValue
6. SearchField
7. WorkspaceHeader
8. StickySummaryBar
9. SearchToolbar
10. FilterRail
11. ResultTable
12. QueueCard
13. ContextPanel
14. ActivityTimeline
15. StepWizardFrame

이 15개가 있으면, 지금까지 정의한 Dealer365 핵심 화면 대부분을 조립할 수 있습니다.