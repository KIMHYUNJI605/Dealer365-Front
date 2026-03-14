# Detailed Solution

# 1. Page Pattern 분류 체계

먼저 Dealer365에서 반복적으로 쓰일 **상위 페이지 패턴 타입**을 정의합니다.

## A. 공통 패턴 타입

| Pattern Type | 설명 |
| --- | --- |
| Dashboard | KPI + 우선순위 액션 + 큐 중심의 운영 홈 |
| Workspace | 실제 업무를 처리하는 메인 작업 화면 |
| List / Explorer | 검색, 필터, 정렬, 리스트 탐색 중심 화면 |
| Detail | 단일 엔터티의 상세 정보 중심 화면 |
| Queue Board | 시간/상태/우선순위 기반 운영 큐 |
| Timeline / Activity | 이벤트 흐름, 로그, 활동 이력 중심 |
| Wizard / Guided Flow | 단계형 입력/생성 플로우 |
| Communication Hub | 메시지, 템플릿, 고객 응답 관리 |
| Admin / Config | 설정, 규칙, 마스터 관리 |
| 360 Profile | 고객/차량 등 통합 컨텍스트 허브 |

---

# 2. Dealer365 Pattern ID 체계

권장 패턴 ID 규칙:

```
PT-{DOMAIN}-{NNN}
```

예:

- `PT-CMN-001` 공통 대시보드
- `PT-SLS-003` Deal Desk
- `PT-SVC-004` RO Workspace
- `PT-ADM-002` 설정형 관리자 화면

도메인 구분:

- `CMN` = Common / Shared
- `SLS` = Sales
- `SVC` = Service
- `OPS` = Operations
- `ADM` = Admin

---

# 3. Dealer365 Core Page Pattern Library

아래는 플랫폼 전반에서 재사용되는 핵심 패턴 라이브러리입니다.

| Pattern ID | Pattern Name | Pattern Type | 설명 | 대표 사용 화면 |
| --- | --- | --- | --- | --- |
| PT-CMN-001 | Role-based Landing Dashboard | Dashboard | 역할별 KPI, Tasks, Alerts, Quick Actions | Home, Sales Dashboard, Service Dashboard |
| PT-CMN-002 | Search + Faceted Explorer | List / Explorer | 검색, 필터, 저장뷰, 결과 리스트 | Leads, Inventory, Open RO, Customers |
| PT-CMN-003 | Master-Detail Workspace | Workspace | 좌측 리스트 + 중앙 작업영역 + 우측 컨텍스트 | Lead Detail, Communication Hub |
| PT-CMN-004 | Command Console Workspace | Workspace | KPI보다 액션이 중심인 운영 콘솔 | Advisor Dashboard, Dispatch, Cashier |
| PT-CMN-005 | Timeline / Activity History | Timeline / Activity | 활동이력, 변경로그, 이벤트 흐름 | Lead Activity, RO Timeline, Deal Activity |
| PT-CMN-006 | Step-by-step Intake Wizard | Wizard / Guided Flow | 체크인/예약/계약 등 단계형 입력 | Lane Check-in, Appointment Booking, Contract Generation |
| PT-CMN-007 | Approval / Exception Queue | Queue Board | 승인 대기, 예외, 지연, SLA 초과 큐 | Approval Queue, Delay Queue, Pickup Queue |
| PT-CMN-008 | 360 Context Profile | 360 Profile | 통합 고객/차량 정보 허브 | Customer 360, Vehicle 360 |
| PT-CMN-009 | Configurable Data Grid | List / Explorer | 대형 데이터 테이블, 컬럼 제어, 일괄 액션 | Inventory Grid, RO Lines, Parts Lookup |
| PT-CMN-010 | Right-side Context Drawer | Detail | 히스토리, 상태, 추천 정보 보조 패널 | RO, Deal Desk, Inventory, Lead Detail |
| PT-CMN-011 | Communication Thread Workspace | Communication Hub | 대화 목록 + 메시지 스레드 + 템플릿 | Communications |
| PT-CMN-012 | Signature / Confirmation Flow | Wizard / Guided Flow | 전자서명, 동의, 최종 확인 | Check-in, Cashier, Contract |

---

# 4. Sales Domain 매핑표

## 4-1. Sales IA → Pattern 매핑

| IA Depth | Screen / Node | Pattern ID | Primary Pattern Name | Secondary Pattern | MVP |
| --- | --- | --- | --- | --- | --- |
| 1.1 | Sales Dashboard | PT-CMN-001 | Role-based Landing Dashboard | PT-CMN-007 | Yes |
| 1.2.1 | Lead Inbox | PT-CMN-002 | Search + Faceted Explorer | PT-CMN-007 | Yes |
| 1.2.2 | Lead Pipeline | PT-SLS-001 | Sales Pipeline Board | PT-CMN-003 | Yes |
| 1.2.3 | Lead Detail | PT-CMN-003 | Master-Detail Workspace | PT-CMN-005 / PT-CMN-010 | Yes |
| 1.2.4 | Communication History | PT-CMN-005 | Timeline / Activity History | PT-CMN-011 | Yes |
| 1.2.5 | Tasks / Follow-ups | PT-SLS-002 | Follow-up Task Board | PT-CMN-007 | Yes |
| 1.2.6 | Appointment / Visit Booking | PT-CMN-006 | Step-by-step Intake Wizard | PT-CMN-012 | Optional |
| 1.2.7 | Duplicate / Merge | PT-SLS-003 | Record Merge Utility | - | Later |
| 1.3.1 | Opportunity List | PT-CMN-002 | Search + Faceted Explorer | PT-SLS-001 | Yes |
| 1.3.2 | Opportunity Detail | PT-CMN-003 | Master-Detail Workspace | PT-CMN-005 / PT-CMN-010 | Yes |
| 1.3.3 | Vehicle Match | PT-SLS-004 | Opportunity-to-Inventory Match | PT-CMN-002 | Yes |
| 1.3.4 | Quote / Pencil History | PT-CMN-005 | Timeline / Activity History | PT-SLS-005 | Yes |
| 1.3.5 | Activity Timeline | PT-CMN-005 | Timeline / Activity History | - | Yes |
| 1.4.1 | Inventory List | PT-CMN-002 | Search + Faceted Explorer | PT-CMN-009 | Yes |
| 1.4.2 | Vehicle Detail | PT-SLS-006 | Vehicle Inventory Detail Workspace | PT-CMN-010 | Yes |
| 1.4.3 | Incoming Units | PT-SLS-007 | Incoming Inventory Tracker | PT-CMN-009 | Yes |
| 1.4.4 | Holds / Reserved | PT-SLS-008 | Unit Hold Management Board | PT-CMN-007 | Yes |
| 1.4.5 | Pricing & Merchandising | PT-SLS-009 | Pricing & Merchandising Workspace | PT-CMN-009 | Later |
| 1.4.6 | Aging View | PT-SLS-010 | Inventory Aging Performance Board | PT-CMN-009 | Later |
| 1.4.7 | Lot Management | PT-SLS-011 | Lot Location Management | PT-CMN-009 | Later |
| 1.5.1 | Deal Pipeline | PT-SLS-001 | Sales Pipeline Board | PT-CMN-007 | Yes |
| 1.5.2 | Deal Desk Workspace | PT-SLS-012 | Deal Structuring Workspace | PT-CMN-010 | Yes |
| 1.5.3 | Trade-in Panel | PT-SLS-013 | Trade-in Evaluation Panel | PT-CMN-010 | Yes |
| 1.5.4 | Finance Terms | PT-SLS-014 | Finance Calculator Workspace | - | Yes |
| 1.5.5 | F&I Product Selection | PT-SLS-015 | Product Menu Selector | - | Yes |
| 1.5.6 | Approval Workflow | PT-CMN-007 | Approval / Exception Queue | PT-SLS-016 | Yes |
| 1.5.7 | Deal Summary | PT-SLS-017 | Deal Summary & Profit View | - | Yes |
| 1.6.1 | Finance Options | PT-SLS-014 | Finance Calculator Workspace | PT-SLS-015 | Yes |
| 1.6.2 | Lender / Program Selection | PT-SLS-018 | Lender Program Selector | - | Optional |
| 1.6.3 | Product Menu | PT-SLS-015 | Product Menu Selector | - | Yes |
| 1.6.4 | Contract Preview | PT-SLS-019 | Contract Preview Workspace | PT-CMN-012 | Yes |
| 1.6.5 | Contract Generation | PT-CMN-006 | Step-by-step Intake Wizard | PT-SLS-019 | Yes |
| 1.6.6 | Signature / Completion | PT-CMN-012 | Signature / Confirmation Flow | - | Yes |
| 1.7.1 | Customer List | PT-CMN-002 | Search + Faceted Explorer | - | Yes |
| 1.7.2 | Customer Profile | PT-CMN-008 | 360 Context Profile | PT-CMN-005 | Yes |
| 1.7.3 | Household / Relationships | PT-SLS-020 | Relationship Graph / Household View | - | Later |
| 1.7.4 | Purchase History | PT-CMN-005 | Timeline / Activity History | - | Yes |
| 1.7.5 | Communication Preferences | PT-CMN-008 | 360 Context Profile | - | Yes |

---

## 4-2. Sales 전용 Pattern 정의

| Pattern ID | Pattern Name | Type | 핵심 특징 |
| --- | --- | --- | --- |
| PT-SLS-001 | Sales Pipeline Board | Queue Board | Kanban 기반 Lead/Opportunity 단계 관리 |
| PT-SLS-002 | Follow-up Task Board | Queue Board | Due task, stale lead, overdue call 관리 |
| PT-SLS-003 | Record Merge Utility | Utility | 중복 Lead/Customer 병합 |
| PT-SLS-004 | Opportunity-to-Inventory Match | Workspace | Opportunity와 Inventory 매칭 |
| PT-SLS-005 | Quote / Pencil Workspace | Workspace | 견적 버전 비교, 월납입금 시나리오 |
| PT-SLS-006 | Vehicle Inventory Detail Workspace | Detail | 차량 상세 + 가격 + 상태 + linked deal |
| PT-SLS-007 | Incoming Inventory Tracker | List / Explorer | 입고 예정 차량 추적 |
| PT-SLS-008 | Unit Hold Management Board | Queue Board | 차량 홀드/예약 관리 |
| PT-SLS-009 | Pricing & Merchandising Workspace | Workspace | 가격, 사진, listing 상태 관리 |
| PT-SLS-010 | Inventory Aging Performance Board | Dashboard | aging, turn, pricing risk |
| PT-SLS-011 | Lot Location Management | Workspace | lot / row / spot 위치 관리 |
| PT-SLS-012 | Deal Structuring Workspace | Workspace | 가격, trade, tax, finance, gross 계산 |
| PT-SLS-013 | Trade-in Evaluation Panel | Detail | trade 정보 및 equity 계산 |
| PT-SLS-014 | Finance Calculator Workspace | Workspace | APR, term, down payment, monthly payment |
| PT-SLS-015 | Product Menu Selector | Workspace | F&I 상품 선택 |
| PT-SLS-016 | Deal Approval Flow | Queue Board | discount/gross 기준 승인 흐름 |
| PT-SLS-017 | Deal Summary & Profit View | Detail | front/back gross, total due, monthly summary |
| PT-SLS-018 | Lender Program Selector | Utility | lender/program 선택 |
| PT-SLS-019 | Contract Preview Workspace | Workspace | 계약서 미리보기 및 생성 |
| PT-SLS-020 | Relationship Graph / Household View | Detail | household / co-buyer 관계 |

---

# 5. Service Domain 매핑표

## 5-1. Service IA → Pattern 매핑

| IA Depth | Screen / Node | Pattern ID | Primary Pattern Name | Secondary Pattern | MVP |
| --- | --- | --- | --- | --- | --- |
| 2.1.1 | Service Advisor Dashboard | PT-SVC-001 | Advisor Command Dashboard | PT-CMN-007 / PT-CMN-010 | Yes |
| 2.1.2 | Manager View | PT-SVC-002 | Service Manager Control Tower | PT-CMN-001 | Later |
| 2.1.3 | Today Overview | PT-CMN-001 | Role-based Landing Dashboard | - | Yes |
| 2.1.4 | Alerts / Exceptions | PT-CMN-007 | Approval / Exception Queue | - | Yes |
| 2.1.5 | Performance Snapshot | PT-CMN-001 | Role-based Landing Dashboard | - | Yes |
| 2.2.1 | Appointment Calendar | PT-SVC-003 | Appointment Scheduling Workspace | PT-CMN-002 | Yes |
| 2.2.2 | Appointment List | PT-CMN-002 | Search + Faceted Explorer | - | Yes |
| 2.2.3 | New Appointment | PT-CMN-006 | Step-by-step Intake Wizard | PT-SVC-003 | Yes |
| 2.2.4 | Appointment Detail | PT-SVC-004 | Appointment Detail Workspace | PT-CMN-010 | Yes |
| 2.2.5 | Capacity Overlay | PT-SVC-005 | Capacity Heatmap Board | PT-CMN-009 | Yes |
| 2.2.6 | Waitlist | PT-SVC-006 | Waitlist Queue | PT-CMN-007 | Optional |
| 2.2.7 | No-show / Cancel Log | PT-SVC-007 | No-show / Cancel Monitor | PT-CMN-009 | Optional |
| 2.3.1 | Arrival Queue | PT-SVC-008 | Lane Check-in Workspace | PT-CMN-007 | Yes |
| 2.3.2 | Customer / Appointment Lookup | PT-CMN-002 | Search + Faceted Explorer | - | Yes |
| 2.3.3 | Vehicle Confirmation | PT-SVC-009 | Vehicle Check-in Verification Panel | PT-CMN-010 | Yes |
| 2.3.4 | Walk-around | PT-SVC-010 | Walk-around Capture Workspace | PT-CMN-012 | Yes |
| 2.3.5 | Signature / Authorization | PT-CMN-012 | Signature / Confirmation Flow | - | Yes |
| 2.3.6 | Create RO | PT-CMN-006 | Step-by-step Intake Wizard | PT-SVC-011 | Yes |
| 2.4.1 | Open RO List | PT-CMN-002 | Search + Faceted Explorer | PT-CMN-007 | Yes |
| 2.4.2 | RO Workspace | PT-SVC-011 | Repair Order Workspace | PT-CMN-010 / PT-CMN-005 | Yes |
| 2.4.3 | Approval Queue | PT-CMN-007 | Approval / Exception Queue | - | Yes |
| 2.4.4 | Delivered / Closed RO | PT-CMN-002 | Search + Faceted Explorer | PT-CMN-005 | Yes |
| 2.4.5 | RO Timeline | PT-CMN-005 | Timeline / Activity History | - | Yes |
| 2.4.6 | RO Search / History | PT-CMN-002 | Search + Faceted Explorer | - | Yes |
| 2.5.1 | Dispatch Board | PT-SVC-012 | Service Dispatch Board | PT-SVC-005 | Yes |
| 2.5.2 | Unassigned Jobs | PT-CMN-007 | Approval / Exception Queue | PT-SVC-012 | Yes |
| 2.5.3 | Technician Timeline | PT-SVC-013 | Technician Timeline Board | - | Yes |
| 2.5.4 | Capacity View | PT-SVC-005 | Capacity Heatmap Board | - | Yes |
| 2.5.5 | Delay / Exception Monitor | PT-SVC-014 | Delay / Exception Monitor | PT-CMN-007 | Yes |
| 2.6.1 | My Jobs | PT-SVC-015 | Technician Workbench | PT-CMN-007 | Yes |
| 2.6.2 | Current Job | PT-SVC-015 | Technician Workbench | PT-CMN-010 | Yes |
| 2.6.3 | Inspection | PT-SVC-016 | Digital Inspection Workspace | - | Yes |
| 2.6.4 | Media | PT-SVC-017 | Media Capture Review Panel | - | Yes |
| 2.6.5 | Notes | PT-SVC-018 | Technician Notes Workspace | - | Yes |
| 2.6.6 | Parts Request | PT-SVC-019 | Technician Parts Request Panel | PT-CMN-010 | Yes |
| 2.7.1 | Inspection Workspace | PT-SVC-016 | Digital Inspection Workspace | PT-SVC-017 | Yes |
| 2.7.2 | Checklist | PT-SVC-020 | Inspection Checklist Board | - | Yes |
| 2.7.3 | Media Review | PT-SVC-017 | Media Capture Review Panel | - | Yes |
| 2.7.4 | Recommendations | PT-SVC-021 | Inspection Recommendation Builder | - | Yes |
| 2.7.5 | Customer Report | PT-SVC-022 | Customer-facing Inspection Report | PT-CMN-012 | Yes |
| 2.7.6 | Templates | PT-SVC-023 | Inspection Template Manager | PT-ADM-002 | Later |
| 2.7.7 | Inspection History | PT-CMN-005 | Timeline / Activity History | - | Optional |
| 2.8.1 | Parts Counter | PT-SVC-024 | Parts Counter Workspace | PT-CMN-009 | Yes |
| 2.8.2 | Parts Request Queue | PT-CMN-007 | Approval / Exception Queue | PT-SVC-024 | Yes |
| 2.8.3 | Inventory Lookup | PT-CMN-009 | Configurable Data Grid | PT-CMN-002 | Yes |
| 2.8.4 | Backorders | PT-SVC-025 | Backorder Tracker | PT-CMN-009 | Yes |
| 2.8.5 | Receiving (MVP light) | PT-SVC-026 | Light Receiving Workspace | PT-CMN-009 | Yes |
| 2.8.6 | Orders / Vendor | PT-SVC-027 | Parts Procurement Workspace | - | Later |
| 2.8.7 | Returns / Core | PT-SVC-028 | Parts Return / Core Management | - | Later |
| 2.9.1 | Pickup Queue | PT-CMN-007 | Approval / Exception Queue | PT-SVC-029 | Yes |
| 2.9.2 | Invoice Detail | PT-SVC-029 | Service Cashier Workspace | PT-CMN-010 | Yes |
| 2.9.3 | Payment | PT-SVC-030 | Payment Panel Workspace | PT-CMN-012 | Yes |
| 2.9.4 | Receipt / Signature | PT-CMN-012 | Signature / Confirmation Flow | - | Yes |
| 2.9.5 | Close RO | PT-SVC-029 | Service Cashier Workspace | - | Yes |
| 2.10.1 | Conversation List | PT-CMN-011 | Communication Thread Workspace | - | Yes |
| 2.10.2 | Message Thread | PT-CMN-011 | Communication Thread Workspace | - | Yes |
| 2.10.3 | Templates | PT-SVC-031 | Service Messaging Template Manager | PT-ADM-002 | Yes |
| 2.10.4 | Approval Messages | PT-SVC-032 | Approval Messaging Workspace | PT-CMN-011 | Yes |
| 2.10.5 | Delivery / Delay Notifications | PT-SVC-033 | Status Notification Center | PT-CMN-011 | Yes |
| 2.11.1 | Warranty Claim Workspace | PT-SVC-034 | Warranty Claim Workspace | PT-CMN-009 | Concept |
| 2.11.2 | Claim Draft | PT-SVC-034 | Warranty Claim Workspace | - | Concept |
| 2.11.3 | Submission Status | PT-CMN-007 | Approval / Exception Queue | - | Concept |
| 2.11.4 | Rejection / Resubmission | PT-SVC-035 | Warranty Rework Queue | - | Concept |
| 2.12.1 | Shop Capacity View | PT-SVC-005 | Capacity Heatmap Board | PT-CMN-001 | Optional |
| 2.12.2 | Technician Skill Matrix | PT-SVC-036 | Skill Matrix Planner | PT-CMN-009 | Optional |
| 2.12.3 | Waiter Capacity | PT-SVC-037 | Waiter Capacity Board | - | Optional |
| 2.12.4 | Forecast View | PT-SVC-038 | Service Forecast Dashboard | PT-CMN-001 | Optional |
| 2.13.1 | Service Customers | PT-CMN-002 | Search + Faceted Explorer | - | Yes |
| 2.13.2 | Vehicle Profiles | PT-CMN-008 | 360 Context Profile | - | Yes |
| 2.13.3 | Service History | PT-CMN-005 | Timeline / Activity History | - | Yes |
| 2.13.4 | Declined Services | PT-SVC-039 | Declined Service Tracker | PT-CMN-007 | Yes |
| 2.13.5 | Recall / Campaign Status | PT-SVC-040 | Recall / Campaign Status Panel | - | Yes |

---

## 5-2. Service 전용 Pattern 정의

| Pattern ID | Pattern Name | Type | 핵심 특징 |
| --- | --- | --- | --- |
| PT-SVC-001 | Advisor Command Dashboard | Dashboard | Advisor 업무 콘솔 |
| PT-SVC-002 | Service Manager Control Tower | Dashboard | 서비스 매니저용 운영 뷰 |
| PT-SVC-003 | Appointment Scheduling Workspace | Workspace | 슬롯 추천, capacity overlay |
| PT-SVC-004 | Appointment Detail Workspace | Detail | 예약 상세 + pre-check |
| PT-SVC-005 | Capacity Heatmap Board | Queue Board | 시간대/스킬/대기 수용도 |
| PT-SVC-006 | Waitlist Queue | Queue Board | 대기예약 승격 |
| PT-SVC-007 | No-show / Cancel Monitor | List / Explorer | 취소/노쇼 추적 |
| PT-SVC-008 | Lane Check-in Workspace | Workspace | 도착 확인, concern, 서명 |
| PT-SVC-009 | Vehicle Check-in Verification Panel | Detail | 차량/마일리지/예약 확인 |
| PT-SVC-010 | Walk-around Capture Workspace | Workspace | 손상/타이어/사진 캡처 |
| PT-SVC-011 | Repair Order Workspace | Workspace | RO 라인, 승인, 비용, 상태 |
| PT-SVC-012 | Service Dispatch Board | Workspace | 디스패치 및 배정 |
| PT-SVC-013 | Technician Timeline Board | Queue Board | 테크 시간축 배정 |
| PT-SVC-014 | Delay / Exception Monitor | Queue Board | 지연/예외 알림 |
| PT-SVC-015 | Technician Workbench | Workspace | 태블릿 중심 작업 실행 UI |
| PT-SVC-016 | Digital Inspection Workspace | Workspace | MPI/VHC 검사 |
| PT-SVC-017 | Media Capture Review Panel | Detail | 사진/영상 검토 |
| PT-SVC-018 | Technician Notes Workspace | Workspace | 정비 메모/음성 텍스트화 |
| PT-SVC-019 | Technician Parts Request Panel | Detail | 테크 부품 요청 |
| PT-SVC-020 | Inspection Checklist Board | Queue Board | 검사 항목 진행 |
| PT-SVC-021 | Inspection Recommendation Builder | Workspace | 추가 정비 추천 |
| PT-SVC-022 | Customer-facing Inspection Report | Detail | 고객 리포트 |
| PT-SVC-023 | Inspection Template Manager | Admin / Config | 템플릿 관리 |
| PT-SVC-024 | Parts Counter Workspace | Workspace | 부품 찾기/출고/예약 |
| PT-SVC-025 | Backorder Tracker | Queue Board | 부품 백오더 추적 |
| PT-SVC-026 | Light Receiving Workspace | Workspace | 간단 입고 처리 |
| PT-SVC-027 | Parts Procurement Workspace | Workspace | 발주/벤더 |
| PT-SVC-028 | Parts Return / Core Management | Workspace | 반품/코어 |
| PT-SVC-029 | Service Cashier Workspace | Workspace | 청구/픽업/종결 |
| PT-SVC-030 | Payment Panel Workspace | Workspace | 결제 수단 처리 |
| PT-SVC-031 | Service Messaging Template Manager | Admin / Config | 메시지 템플릿 |
| PT-SVC-032 | Approval Messaging Workspace | Communication Hub | 승인 요청/응답 |
| PT-SVC-033 | Status Notification Center | Communication Hub | 지연/완료/픽업 알림 |
| PT-SVC-034 | Warranty Claim Workspace | Workspace | 클레임 작성/제출 |
| PT-SVC-035 | Warranty Rework Queue | Queue Board | 리젝/재제출 |
| PT-SVC-036 | Skill Matrix Planner | Admin / Config | 테크 스킬 매트릭스 |
| PT-SVC-037 | Waiter Capacity Board | Queue Board | waiter 전용 수용도 |
| PT-SVC-038 | Service Forecast Dashboard | Dashboard | 생산성/지연 예측 |
| PT-SVC-039 | Declined Service Tracker | Queue Board | decline follow-up |
| PT-SVC-040 | Recall / Campaign Status Panel | Detail | 리콜 상태 |

---

# 6. Shared / Customer 360 매핑표

| IA Depth | Screen / Node | Pattern ID | Primary Pattern Name | Secondary Pattern | MVP |
| --- | --- | --- | --- | --- | --- |
| 3.1.1 | Profile Overview | PT-CMN-008 | 360 Context Profile | PT-CMN-010 | Yes |
| 3.1.2 | Contact & Preferences | PT-CMN-008 | 360 Context Profile | - | Yes |
| 3.1.3 | Sales History | PT-CMN-005 | Timeline / Activity History | - | Yes |
| 3.1.4 | Service History | PT-CMN-005 | Timeline / Activity History | - | Yes |
| 3.1.5 | Vehicles Owned | PT-CMN-008 | 360 Context Profile | PT-CMN-002 | Yes |
| 3.1.6 | Communication History | PT-CMN-011 | Communication Thread Workspace | PT-CMN-005 | Yes |
| 3.2.1 | Vehicle Overview | PT-CMN-008 | 360 Context Profile | - | Yes |
| 3.2.2 | Inventory / Ownership Status | PT-SLS-006 | Vehicle Inventory Detail Workspace | PT-CMN-008 | Yes |
| 3.2.3 | RO History | PT-CMN-005 | Timeline / Activity History | - | Yes |
| 3.2.4 | Inspection History | PT-CMN-005 | Timeline / Activity History | - | Optional |
| 3.2.5 | Recall / Campaigns | PT-SVC-040 | Recall / Campaign Status Panel | - | Yes |
| 3.2.6 | Trade / Appraisal Context | PT-SLS-013 | Trade-in Evaluation Panel | - | Later |
| 3.3.1 | Unified Inbox | PT-CMN-011 | Communication Thread Workspace | - | Yes |
| 3.3.2 | Templates | PT-OPS-001 | Template Management Workspace | - | Yes |
| 3.3.3 | Opt-in / Preferences | PT-CMN-008 | 360 Context Profile | - | Yes |
| 3.3.4 | Delivery Status / Logs | PT-CMN-005 | Timeline / Activity History | - | Yes |

---

# 7. Operations / Admin 매핑표

## 7-1. Operations

| IA Depth | Screen / Node | Pattern ID | Primary Pattern Name | Secondary Pattern | MVP |
| --- | --- | --- | --- | --- | --- |
| 4.1.1 | Sales Snapshot | PT-CMN-001 | Role-based Landing Dashboard | - | Optional |
| 4.1.2 | Service Snapshot | PT-CMN-001 | Role-based Landing Dashboard | - | Optional |
| 4.1.3 | Inventory Snapshot | PT-CMN-001 | Role-based Landing Dashboard | - | Optional |
| 4.1.4 | Alerts / KPI Monitor | PT-OPS-002 | Executive KPI Monitor | PT-CMN-007 | Optional |
| 4.2.1 | Users / Roles | PT-ADM-001 | User Role Management | - | Yes |
| 4.2.2 | Advisor Assignment | PT-OPS-003 | Assignment Management Board | - | Optional |
| 4.2.3 | Salesperson Assignment | PT-OPS-003 | Assignment Management Board | - | Optional |
| 4.2.4 | Technician Roster | PT-SVC-036 | Skill Matrix Planner | PT-CMN-009 | Optional |
| 4.3.1 | Appointment Templates | PT-OPS-001 | Template Management Workspace | - | Optional |
| 4.3.2 | Inspection Templates | PT-SVC-023 | Inspection Template Manager | - | Optional |
| 4.3.3 | Message Templates | PT-OPS-001 | Template Management Workspace | - | Yes |
| 4.3.4 | Deal Rules / Approval Rules | PT-ADM-002 | Rules / Config Workspace | - | Optional |
| 4.3.5 | Price / Discount Rules | PT-ADM-002 | Rules / Config Workspace | - | Optional |
| 4.4.1 | Activity Log | PT-CMN-005 | Timeline / Activity History | - | Optional |
| 4.4.2 | Message Log | PT-CMN-005 | Timeline / Activity History | - | Optional |
| 4.4.3 | Deal / RO Change Log | PT-CMN-005 | Timeline / Activity History | - | Optional |
| 4.4.4 | Signature / Consent Log | PT-CMN-005 | Timeline / Activity History | - | Optional |

## 7-2. Admin

| IA Depth | Screen / Node | Pattern ID | Primary Pattern Name | Secondary Pattern | MVP |
| --- | --- | --- | --- | --- | --- |
| 5.1.1 | Dealership Profile | PT-ADM-003 | Store Profile Settings | - | Yes |
| 5.1.2 | Business Hours | PT-ADM-004 | Hours & Calendar Settings | - | Yes |
| 5.1.3 | Departments / Locations | PT-ADM-005 | Department / Location Manager | - | Yes |
| 5.1.4 | Taxes / Fees | PT-ADM-006 | Tax / Fee Config | - | Yes |
| 5.2.1 | Users | PT-ADM-001 | User Role Management | - | Yes |
| 5.2.2 | Roles / Permissions | PT-ADM-001 | User Role Management | - | Yes |
| 5.2.3 | Login / Security | PT-ADM-007 | Security Settings | - | Optional |
| 5.3.1 | OEM / Recall | PT-ADM-008 | Integration Settings | - | Optional |
| 5.3.2 | Messaging / Email | PT-ADM-008 | Integration Settings | - | Yes |
| 5.3.3 | Payment | PT-ADM-008 | Integration Settings | - | Yes |
| 5.3.4 | Inventory Feed / Listing | PT-ADM-008 | Integration Settings | - | Optional |
| 5.3.5 | Lender / Contracting | PT-ADM-008 | Integration Settings | - | Optional |
| 5.4.1 | Vehicle Catalog | PT-ADM-009 | Master Data Manager | - | Optional |
| 5.4.2 | Service Codes / Op Codes | PT-ADM-009 | Master Data Manager | - | Optional |
| 5.4.3 | Parts Master | PT-ADM-009 | Master Data Manager | - | Optional |
| 5.4.4 | Pricing Programs | PT-ADM-009 | Master Data Manager | - | Optional |
| 5.4.5 | F&I Product Master | PT-ADM-009 | Master Data Manager | - | Optional |
| 5.5.1 | Lead Scoring Rules | PT-ADM-010 | AI Automation Settings | - | Optional |
| 5.5.2 | Scheduling Rules | PT-ADM-010 | AI Automation Settings | - | Optional |
| 5.5.3 | Dispatch Rules | PT-ADM-010 | AI Automation Settings | - | Optional |
| 5.5.4 | Messaging Templates / Copilot | PT-ADM-010 | AI Automation Settings | - | Optional |
| 5.5.5 | Recommendation Settings | PT-ADM-010 | AI Automation Settings | - | Optional |

---

# 8. 패턴 재사용 관점에서 가장 중요한 묶음

실제로 디자인 시스템과 페이지 패턴 라이브러리를 운영할 때는 아래 8개가 핵심 재사용 축입니다.

## 1) Explorer 계열

- Leads
- Inventory
- Open RO
- Customers
- Appointments

공통 패턴: `PT-CMN-002`, `PT-CMN-009`

---

## 2) Master-Detail 계열

- Lead Detail
- Opportunity Detail
- Customer Profile
- Vehicle Profile

공통 패턴: `PT-CMN-003`, `PT-CMN-010`, `PT-CMN-005`

---

## 3) Command Console 계열

- Service Advisor Dashboard
- Dispatch
- Cashier
- Manager View

공통 패턴: `PT-CMN-004`, `PT-CMN-007`

---

## 4) Workspace 계열

- RO Workspace
- Deal Desk
- Technician Workbench
- Appointment Scheduling
- Lane Check-in
- Parts Counter

공통 패턴: 개별 도메인 특화 Workspace + 우측 Context Drawer

---

## 5) Queue 계열

- Approval Queue
- Pickup Queue
- Backorder Queue
- Waitlist
- Follow-up Queue

공통 패턴: `PT-CMN-007`

---

## 6) Timeline 계열

- RO Timeline
- Lead Activity
- Deal Activity
- Message History

공통 패턴: `PT-CMN-005`

---

## 7) Communication 계열

- Unified Inbox
- Service Communication Center
- Approval Messaging

공통 패턴: `PT-CMN-011`

---

## 8) Guided Flow 계열

- New Appointment
- Check-in
- Contract Generation
- Signature

공통 패턴: `PT-CMN-006`, `PT-CMN-012`

---

# 9. Figma / 구현용 우선순위

MVP 기준으로 Figma에서 먼저 잡아야 할 패턴 우선순위는 아래가 맞습니다.

## P0

- PT-CMN-001 Role-based Dashboard
- PT-CMN-002 Search + Faceted Explorer
- PT-CMN-003 Master-Detail Workspace
- PT-CMN-005 Timeline / Activity
- PT-CMN-007 Approval / Exception Queue
- PT-CMN-010 Right-side Context Drawer
- PT-CMN-011 Communication Thread
- PT-CMN-012 Signature / Confirmation

## P1

- PT-SVC-001 Advisor Dashboard
- PT-SVC-003 Appointment Scheduling
- PT-SVC-008 Lane Check-in
- PT-SVC-011 RO Workspace
- PT-SVC-012 Dispatch
- PT-SVC-015 Technician Workbench
- PT-SVC-016 Digital Inspection
- PT-SVC-024 Parts Counter
- PT-SVC-029 Service Cashier
- PT-SLS-012 Deal Desk
- PT-SLS-014 Finance Calculator
- PT-SLS-019 Contract Preview
- PT-SLS-006 Vehicle Inventory Detail