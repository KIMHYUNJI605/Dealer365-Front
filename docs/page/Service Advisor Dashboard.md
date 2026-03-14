```
Dealer365 Service Advisor Dashboard를 설계한다. 이 화면은 KPI 대시보드가 아니라 Service Advisor의 업무 콘솔이다. 12컬럼 레이아웃을 사용하고, 상단에는 날짜/지점/Advisor 선택, 검색, 퀵액션을 배치한다. 본문은 Arrivals, Open ROs, Approval Queue, Ready for Delivery, Alerts, AI Copilot으로 구성한다. 각 카드에는 상태, 시간경과, 고객명, 차량, ETA, 승인 상태, 부품 상태를 표시하고 즉시 액션(Call, Text, Open RO, Send Update)을 포함한다. Waiting customer와 overdue 항목은 시각적으로 우선 강조한다. 우측 패널에는 AI Priorities, Delay Risk, Suggested Updates, Next Best Action을 제공한다. 전체 UX는 운영용 command center처럼 밀도 높고 즉시 액션 가능한 구조로 설계하며, 다크모드/현장 가독성/키보드 접근성을 고려한다.
```

미국 딜러십 서비스 운영에서 **Service Advisor의 하루 업무를 시작하고 끝내는 핵심 허브**입니다. 단순 KPI 대시보드가 아니라, 실제로는 아래 업무를 하나의 화면에서 연결해야 합니다.

- 오늘 입고 고객/예약 확인
- 현재 진행 중인 RO 상태 추적
- 추가 승인 대기 건 확인
- 지연/병목/부품 이슈 대응
- 고객 커뮤니케이션
- 매출 및 생산성 확인

시장 방향도 이와 같습니다. Tekion은 자사 플랫폼을 **AI-powered retail / service experience**로 포지셔닝하고 있고, 2025년에는 **AI Copilot for Service**를 공개했습니다. Xtime도 2025년에 **real-time performance dashboard**와 서비스 레인 인사이트 강화를 발표했습니다. Dealer-FX 역시 서비스 대시보드를 “단일 운영 시야(single source of truth)” 성격으로 설명해 왔습니다.

Dealer365에서는 이 화면을 단순 대시보드가 아니라 다음처럼 정의하는 것이 맞습니다.

**Service Advisor Dashboard = 운영 허브 + 액션 허브 + AI 코파일럿 허브**

---

# Detailed Solution

## 1. 화면 정의

### 화면 목적

Service Advisor가 **지금 당장 처리해야 하는 일**을 우선순위대로 보고, 바로 액션할 수 있게 만드는 화면입니다.

### 사용자

- Main: Service Advisor
- Secondary: Service Manager, Lane Manager, Cashier 일부

### 핵심 질문

이 화면은 사용자가 아래 질문에 즉시 답할 수 있어야 합니다.

- 오늘 내 고객 중 누가 곧 도착하는가
- 어떤 RO가 지연되고 있는가
- 어떤 고객 승인이 밀려 있는가
- 어떤 차량이 추가 매출 기회가 있는가
- 어떤 고객에게 지금 연락해야 하는가
- 내 오늘 실적은 어떤 상태인가

---

## 2. 실제 딜러십 Workflow

Service Advisor Dashboard는 아래 실제 업무 흐름을 반영해야 합니다.

### A. 업무 시작 전

1. 오늘 예약 차량/Walk-in 예상 확인
2. Waiting customer / Shuttle / Early bird / Drop-off 구분 확인
3. Advisor별 할당 고객 수와 예상 부하 확인
4. 리콜, 캠페인, 선행 미승인 작업, declined service 확인

### B. 고객 입고 시간대

1. 도착 예정 고객 확인
2. Check-in 진행
3. 증상 / 요구사항 입력
4. RO 생성 또는 기존 예약 RO 오픈
5. 대기 고객 여부 및 약속 시간 확인

### C. 작업 진행 중

1. Technician 진척 상태 확인
2. MPI/VHC 결과 확인
3. 추가 정비 추천 승인 요청
4. Parts availability / backorder 확인
5. 고객에게 상태 전달

### D. 출고 직전

1. 모든 작업 완료 여부 확인
2. 최종 금액/보증/판촉 적용 확인
3. 고객 픽업 준비 상태 확인
4. 결제 및 인도 준비

### E. 업무 마감

1. 당일 미종결 RO 확인
2. 미승인/미연락 고객 확인
3. 내일 후속조치 대상 정리

즉 이 화면은 단순 “현황판”이 아니라, **Advisor의 하루 운영 큐(queue manager)**여야 합니다.

---

## 3. Dealer365 기준 IA

### 1뎁스

**Service**

### 2뎁스

**Advisor Dashboard**

### 3뎁스 구성

아래처럼 분리하는 것이 가장 직관적입니다.

- Today Overview
- Arrivals & Check-in
- Open ROs
- Approvals
- Customer Communication
- Ready for Delivery
- Exceptions
- Performance

하지만 실제 MVP에서는 별도 메뉴로 쪼개기보다, **하나의 대시보드 안에서 탭/섹션 구조**로 통합하는 편이 더 강합니다.

### 추천 IA 구조

- Dashboard Home
    - My Day
    - Arrivals
    - In Progress
    - Approval Queue
    - Delivery Queue
    - Alerts & Exceptions
    - KPI Snapshot

---

## 4. 화면 패턴

Dealer365 Page Pattern ID 제안:

**PT-SVC-AD-001 — Advisor Command Dashboard**

이 패턴은 “리스트 + 상태 + 액션” 조합입니다.

### 화면 패턴 구조

### 패턴 A. Command Center Header

상단에서 오늘 날짜, 내 담당 건수, 핵심 KPI, 필터를 보여줍니다.

### 패턴 B. Priority Action Rail

지금 가장 먼저 처리할 액션 카드만 모아서 보여주는 영역입니다.

예:

- 10분 내 도착 고객 3건
- 승인 대기 5건
- 지연 위험 2건
- Ready for pickup 4건

### 패턴 C. Operational Queue Panels

중앙은 업무 큐 중심입니다.

- Arrivals
- Open ROs
- Approvals
- Delivery

### 패턴 D. Exceptions & Alerts Sidebar

오른쪽 또는 하단에서 병목과 예외를 따로 모읍니다.

- Parts hold
- No response customer
- Overdue RO
- Waiting > SLA

### 패턴 E. KPI Footer / Sticky Summary

오늘 실적 요약

- Closed RO
- ARO
- ELR 영향 지표
- Approval conversion
- CSI risk

---

## 5. 화면 레이아웃 제안

### 데스크탑 12컬럼

- 1~8컬럼: 메인 운영 패널
- 9~12컬럼: 예외/알림/AI 제안

### 권장 구조

### 상단

- Global search
- 날짜/지점/Advisor 필터
- 내 KPI
- 빠른 액션 버튼

### 중단 좌측

- Arrivals
- Open ROs

### 중단 중앙

- Approval Queue
- Vehicle Status Timeline

### 중단 우측

- AI Copilot
- Alerts
- Customer Comms

### 하단

- Ready for Delivery
- Daily Performance

---

## 6. 주요 컴포넌트

### 1) KPI Tile

예:

- Today Arrivals
- Open ROs
- Approval Pending
- Ready for Pickup

필드

- label
- current value
- delta
- status color
- click action

---

### 2) Customer Arrival Card

필드

- 고객명
- 약속시간
- 차량 정보
- 목적 방문
- Waiting/Drop-off 여부
- VIP/Recall/Loaner 필요 여부는 현재 사용자 요구상 제외 가능

액션

- Check-in
- View Appointment
- Start RO

---

### 3) RO Status Card

필드

- RO 번호
- 차량
- 현재 상태
- 담당 Technician
- ETA
- 승인 대기 여부
- 부품 상태
- 고객 응답 상태

액션

- Open RO
- Send Update
- Call Customer
- View MPI

---

### 4) Approval Queue Card

필드

- 추천 정비 항목
- 금액
- 승인 요청 시각
- 고객 응답 상태
- 위험도

액션

- Resend
- Call
- Modify Estimate
- Approve / Decline 처리 이동

---

### 5) Alert Chip / Exception Banner

종류

- Parts Delay
- Technician Delay
- Warranty Block
- Customer Unreachable
- Overdue Pickup

---

### 6) AI Copilot Panel

이 화면의 차별화 핵심입니다.

구성

- 오늘 리스크 요약
- 지금 연락할 고객 추천
- 승인 가능성이 높은 건 추천
- 재배정 필요 RO 추천
- 오늘 마감 전 미처리 건 요약

---

## 7. 데이터 모델

### AdvisorDashboardSummary

```
{
  "advisorId":"ADV-101",
  "date":"2026-03-13",
  "todayArrivals":14,
  "openROs":23,
  "approvalPending":6,
  "readyForPickup":4,
  "overdue":3,
  "closedROs":9,
  "aro":612.45
}
```

### Arrival

```
{
  "appointmentId":"APT-20311",
  "customerId":"C-1009",
  "customerName":"Jane Miller",
  "vehicleId":"VIN-8892",
  "vehicleSummary":"2023 Hyundai Palisade",
  "arrivalTime":"09:20",
  "serviceType":"Maintenance + Brake Noise",
  "visitMode":"WAITING",
  "status":"ARRIVING_SOON"
}
```

### ROStatus

```
{
  "roId":"RO-240311-0102",
  "customerName":"Jane Miller",
  "vehicleSummary":"2023 Hyundai Palisade",
  "advisorId":"ADV-101",
  "techId":"TECH-22",
  "currentStage":"IN_PROGRESS",
  "eta":"11:35",
  "approvalPending":true,
  "partsStatus":"AVAILABLE",
  "customerResponseStatus":"PENDING"
}
```

### ApprovalItem

```
{
  "approvalId":"APR-8831",
  "roId":"RO-240311-0102",
  "recommendationType":"BRAKE_SERVICE",
  "amount":489.99,
  "sentAt":"2026-03-13T10:42:00Z",
  "responseStatus":"NO_RESPONSE",
  "aiCloseProbability":0.74
}
```

### AdvisorAlert

```
{
  "alertId":"ALT-9001",
  "type":"PARTS_DELAY",
  "severity":"HIGH",
  "roId":"RO-240311-0107",
  "message":"Front brake pad ETA delayed to 15:00",
  "recommendedAction":"Contact customer and revise ETA"
}
```

---

## 8. 상태 모델

### 방문 상태

- Arriving Soon
- Checked In
- Waiting
- Dropped Off
- No Show

### RO 상태

- Write-up
- Open
- In Diagnosis
- Waiting Approval
- Waiting Parts
- In Progress
- QC / Wash
- Ready
- Delivered
- Closed

### 승인 상태

- Not Sent
- Sent
- Viewed
- Approved
- Declined
- No Response
- Expired

이 상태값은 Dashboard에서 그대로 시각화되어야 합니다.

별도 설명 페이지에서만 보이면 늦습니다.

---

## 9. UI 설계 원칙

### 1) 대시보드가 아니라 “업무 콘솔”처럼 보여야 함

숫자만 크고 예쁜 KPI 타일 중심이면 실패합니다.

Advisor는 액션 중심으로 움직입니다.

따라서 KPI는 보조이고, 메인은 **Queue + Action**입니다.

---

### 2) 읽기보다 즉시 조치가 가능해야 함

각 카드에 최소 1~3개의 즉시 액션이 들어가야 합니다.

예:

- Call
- Text
- Open RO
- Send Approval
- Recheck ETA

---

### 3) Waiting customer는 항상 상위 강조

딜러십 현장에서 Waiting customer는 별도 우선순위로 취급됩니다.

카드 테두리, 상단 고정, 긴급 칩 등으로 분리해야 합니다.

---

### 4) 시간 기반 시각화 필요

단순 상태만 보여주지 말고 시간 압박도 보여야 합니다.

예:

- Approval pending for 28 min
- Vehicle ready for 43 min
- Appointment in 12 min

---

### 5) Alert와 Noise를 구분

모든 상태를 빨갛게 만들면 오히려 운영성이 망가집니다.

권장

- Critical: red
- Risk: amber
- Informational: blue/neutral
- Completed/healthy: green

---

## 10. Service Advisor Dashboard AI

이 화면은 AI 자동화 효과가 매우 큽니다.

이유는 Advisor가 하루 동안 처리하는 업무가 **판단, 우선순위화, 커뮤니케이션, 후속조치** 중심이기 때문입니다.

아래 기능을 권장합니다.

---

### AI 1. Priority Inbox

AI가 현재 시점에서 가장 먼저 처리할 건을 우선순위로 정렬합니다.

입력

- appointment time
- waiting 여부
- overdue time
- parts risk
- approval age
- customer response history

출력 예:

- 지금 전화해야 할 고객 2명
- 15분 내 체크인 준비 건 3건
- 20분 이상 미응답 승인 건 1건

UI

```
AI Priorities
1. Call RO-1027 customer now
2. Approve revised estimate before 10:30
3. Reassign delayed waiting vehicle
```

---

### AI 2. Approval Conversion Prediction

추가 정비 추천 건마다 승인 가능성을 계산합니다.

입력

- 과거 승인 패턴
- 추천 항목 유형
- 금액대
- 고객 과거 declined history
- 현재 방문 유형
- 차량 마일리지 및 정비 이력

출력

- approval likelihood
- best next action

예:

- 81%: 문자 재발송보다 전화가 효과적
- 34%: 금액 재구성 필요
- 67%: MPI 영상 재전송 권장

---

### AI 3. Delay Risk Prediction

지금은 정상처럼 보이지만 곧 지연될 RO를 미리 찾아냅니다.

입력

- 현재 stage dwell time
- technician productivity
- parts ETA
- waiting customer SLA
- historical repair duration

출력

- delay risk score
- likely missed promise time

UI

- “RO-1042 has 78% risk of missing promised time by 25 min”

---

### AI 4. Smart Customer Update Draft

고객 상태 안내 문구를 자동 초안으로 생성합니다.

예:

- 진단 지연 안내
- 부품 ETA 변경 안내
- 승인 요청 후속 메시지
- 출고 준비 완료 메시지

이 기능은 Tekion이 2025년 발표한 Service Copilot 방향성과도 맞닿아 있습니다. 공개 설명상 서비스 팀의 시간 절감과 효율 향상을 목표로 합니다.

---

### AI 5. RO Summary Generation

긴 RO/이력/MPI 내용을 Advisor가 읽기 쉽게 3줄 요약합니다.

예:

- “지난 2회 방문에서 브레이크 권고 거절”
- “이번 방문에서 소음 재현됨”
- “전륜 패드 교체 + 로터 연마 권장”

---

### AI 6. Next Best Action

현재 카드마다 가장 적절한 행동 하나를 추천합니다.

예:

- Call now
- Resend estimate
- Escalate to dispatcher
- Ask parts ETA
- Prepare delivery

이 기능이 들어가면 Dashboard가 진짜 **Action Hub**가 됩니다.

---

### AI 7. No-Response Recovery

승인 메시지를 봤지만 반응 없는 고객을 자동 탐지합니다.

추천 액션

- 전화 전환
- 간단 요약 재발송
- 비용 분리 제안
- 픽업 시간 재협의

---

### AI 8. CSI Risk Detection

고객 불만 가능성을 조기에 탐지합니다.

입력

- promised time 초과
- waiting 시간
- 연락 공백
- 과거 불만 이력
- 반복 방문 동일 증상

출력

- CSI risk score
- proactive appeasement action

---

### AI 9. Daily Wrap-up Generator

퇴근 전 Advisor별 미완료/후속조치 리스트 자동 생성

예:

- 미종결 RO 4건
- 내일 아침 우선 연락 2건
- 부품 ETA 대기 1건

---

### AI 10. Voice Note to Structured RO Context

Advisor가 음성으로 남긴 메모를 구조화합니다.

예:

- “고객이 오후 4시 전에 꼭 찾으러 온다고 했고 브레이크 소음은 고속보다 저속에서 심하다고 했음”
    
    → 자동 구조화
    
- promised pickup
- symptom context
- special note

---

## 11. 추천 KPI

### 운영 KPI

- Today Arrivals
- Open ROs
- Waiting Vehicles
- Approval Pending
- Ready for Pickup
- Overdue RO

### 성과 KPI

- Closed RO
- ARO
- Approval Rate
- Additional Sales
- Contact SLA Compliance

### 품질 KPI

- CSI Risk Count
- Rework Risk
- No Update > X min Count

---

## 12. Dealer365용 최종 화면 구조안

### Header

- Date
- Location
- Advisor selector
- Search
- Quick actions

### Row 1

- KPI tiles 6개
- AI priority rail

### Row 2

- Arrivals
- Open ROs
- Approval Queue

### Row 3

- Ready for Delivery
- Alerts & Exceptions
- AI Copilot panel

### Row 4

- My Performance
- Communication Log / Follow-up

---

## 13. 화면 카피 샘플

### 헤더

- My Service Day
- Friday, Mar 13
- Advisor: James Park

### KPI

- Arrivals Today
- Open ROs
- Approval Pending
- Ready for Pickup

### AI 패널

- AI Priorities
- Likely Delays
- Suggested Customer Updates
- High-Probability Approvals

### 액션 버튼

- Start Check-in
- Open RO
- Send Update
- Call Customer
- View MPI

---

## 14. 구현 프롬프트 초안

```
Dealer365 Service Advisor Dashboard를 설계한다. 이 화면은 KPI 대시보드가 아니라 Service Advisor의 업무 콘솔이다. 12컬럼 레이아웃을 사용하고, 상단에는 날짜/지점/Advisor 선택, 검색, 퀵액션을 배치한다. 본문은 Arrivals, Open ROs, Approval Queue, Ready for Delivery, Alerts, AI Copilot으로 구성한다. 각 카드에는 상태, 시간경과, 고객명, 차량, ETA, 승인 상태, 부품 상태를 표시하고 즉시 액션(Call, Text, Open RO, Send Update)을 포함한다. Waiting customer와 overdue 항목은 시각적으로 우선 강조한다. 우측 패널에는 AI Priorities, Delay Risk, Suggested Updates, Next Best Action을 제공한다. 전체 UX는 운영용 command center처럼 밀도 높고 즉시 액션 가능한 구조로 설계하며, 다크모드/현장 가독성/키보드 접근성을 고려한다.
```

---

# Advanced Insight

이 화면은 Dealer365에서 단순히 “예쁜 홈 화면”으로 가면 안 됩니다.

정확히는 **Advisor Work Orchestrator**가 되어야 합니다.

기존 DMS 대시보드가 자주 실패하는 이유는,

숫자는 보여주지만 **“그래서 지금 뭘 해야 하는지”**를 말해주지 못하기 때문입니다.

Dealer365는 이 점에서 차별화해야 합니다.

### 추천 포지셔닝

- 기존: Dashboard
- 개선: Advisor Console
- 최종: Advisor AI Workbench

### 경쟁력 포인트

1. Queue 중심
2. 시간경과 중심
3. 상태+액션 결합
4. AI가 다음 행동까지 추천
5. RO / MPI / Dispatch / Parts와 강하게 연결

즉, Service Advisor Dashboard는 독립 화면이 아니라 아래의 허브가 되어야 합니다.

- Appointment
- RO
- Dispatch
- Technician
- MPI/VHC
- Parts
- Delivery
- Customer Communication

그렇게 설계해야 Dealer365의 Service 모듈 전체가 하나의 운영 체계처럼 보입니다.

## 구현 프롬프트 초안

```
Dealer365 Service Advisor Dashboard를 설계한다. 이 화면은 KPI 대시보드가 아니라 Service Advisor의 업무 콘솔이다. 12컬럼 레이아웃을 사용하고, 상단에는 날짜/지점/Advisor 선택, 검색, 퀵액션을 배치한다. 본문은 Arrivals, Open ROs, Approval Queue, Ready for Delivery, Alerts, AI Copilot으로 구성한다. 각 카드에는 상태, 시간경과, 고객명, 차량, ETA, 승인 상태, 부품 상태를 표시하고 즉시 액션(Call, Text, Open RO, Send Update)을 포함한다. Waiting customer와 overdue 항목은 시각적으로 우선 강조한다. 우측 패널에는 AI Priorities, Delay Risk, Suggested Updates, Next Best Action을 제공한다. 전체 UX는 운영용 command center처럼 밀도 높고 즉시 액션 가능한 구조로 설계하며, 다크모드/현장 가독성/키보드 접근성을 고려한다.
```