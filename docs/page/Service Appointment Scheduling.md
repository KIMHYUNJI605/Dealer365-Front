```
Dealer365 Service Appointment Scheduling 화면을 설계한다. 이 화면은 단순 예약 캘린더가 아니라 고객 예약과 내부 용량 계획을 연결하는 운영 인터페이스다. 상단에는 날짜, 지점, 검색, 새 예약, calendar/list toggle, capacity overlay를 배치한다. 좌측 intake 패널에는 고객, 차량, 서비스 요청, 증상, 방문 방식(Waiting / Drop-off / Shuttle)을 입력한다. 중앙에는 실제 예약 가능한 슬롯만 카드 형태로 표시하며, 각 슬롯은 시작시간, 예상 소요시간, waiting 적합 여부, 혼잡도, 추천 순위를 보여준다. 우측 패널에는 차량 이력, 리콜, maintenance due, declined history, AI recommendation을 표시한다. 하단 confirmation rail에는 선택 슬롯, 예상 시간, 사전 체크리스트, reminder 설정, confirm 버튼을 제공한다. AI는 smart slot recommendation, dynamic duration prediction, concern-to-service mapping, waiting suitability prediction, recall/due opportunity detection, no-show risk, pre-arrival intake summary를 제공한다. 전체 UX는 예약 화면이면서 운영용 command interface처럼 정확하고 실행 가능해야 한다.
```

미국 딜러십 서비스 운영에서는 **고객 경험의 시작점**이자, 내부적으로는 **Shop Capacity Control의 시작점**입니다.

예약이 잘못 잡히면 이후 모든 화면이 흔들립니다.

- Advisor Dashboard는 당일 입고가 꼬이고
- RO는 Promise Time을 지키기 어려워지고
- Dispatch는 과부하가 걸리고
- Technician Workbench는 대기/유휴가 반복되고
- Parts와 MPI까지 연쇄적으로 비효율이 생깁니다

그래서 Dealer365에서는 이 화면을 다음처럼 정의하는 것이 맞습니다.

**Service Appointment Scheduling = Customer Booking + Capacity Planning + Pre-RO Orchestration**

즉, 이 화면은

고객 입장에서는 “예약 화면”이지만

딜러십 입장에서는 **수요와 생산능력을 연결하는 운영 엔진**입니다.

---

# Detailed Solution

## 1. 화면 정의

### 목적

고객/상담원/BDC/Advisor가 서비스 예약을 생성·변경·확정할 수 있도록 하고,

동시에 딜러십 내부의 **Bay, Technician, Service Type, 예상 소요시간, 대기 고객, Drop-off, 리콜, 부품, 후속조치**를 고려해 **실행 가능한 예약만 받도록** 만드는 것입니다.

### 주요 사용자

- Primary: Customer, BDC Agent, Service Advisor
- Secondary: Dispatcher, Service Manager
- Internal system actors: Capacity engine, Recall checker, Parts check engine

### 핵심 질문

이 화면은 아래 질문에 답할 수 있어야 합니다.

- 이 고객은 언제 예약 가능한가
- 어떤 슬롯이 실제로 운영 가능한가
- 이 작업은 얼마나 걸릴 가능성이 높은가
- Waiting으로 받을 수 있는가
- Drop-off가 더 적합한가
- 리콜/캠페인이 있는가
- 예약 전에 어떤 사전 정보가 필요한가
- 예약 후 내부 운영에는 어떤 영향이 있는가

---

## 2. 실제 딜러십 Workflow

## A. 예약 진입

1. 고객 식별 또는 신규 고객 생성
2. 차량 식별 (VIN / Plate / 기존 차량 선택)
3. 예약 목적 선택
4. 증상 또는 요청사항 입력
5. 방문 방식 선택
    - Waiting
    - Drop-off
    - Shuttle
    - After-hours drop

---

## B. 예약 가능 시간 탐색

1. 서비스 유형별 예상 소요시간 계산
2. 매장 운영시간/휴무/점심/특수 일정 반영
3. Technician skill / bay capacity / current load 반영
4. 실제 예약 가능한 슬롯만 노출

---

## C. 사전 체크

1. Open recall / campaign 확인
2. 기존 미완료 추천 정비 / declined service 확인
3. 필요한 부품 또는 사전 주문 가능 여부 확인
4. VIP / Fleet / warranty / maintenance plan 여부 확인

---

## D. 예약 확정

1. 날짜/시간 선택
2. 담당 Advisor 지정 또는 자동 배정
3. 예약 요약 생성
4. 고객 동의/확인
5. 알림 발송

---

## E. 예약 이후

1. Reminder 전송
2. Pre-check-in / symptom confirmation
3. 당일 도착 전 Dashboard와 Dispatch에 연동
4. 필요 시 RO draft 생성

---

## F. 예약 변경 / 취소 / No-show

1. Reschedule
2. Cancel
3. Waitlist 승격
4. No-show 기록 및 정책 반영

즉, Appointment Scheduling은 독립 기능이 아니라

**Advisor Dashboard, RO Workspace, Dispatch, Capacity Planning의 선행 단계**입니다.

---

## 3. Dealer365 기준 IA

### 1뎁스

**Service**

### 2뎁스

**Appointments**

### 3뎁스 제안

- Appointment Calendar
- New Appointment
- Appointment Detail
- Capacity View
- Waitlist
- No-show / Cancel Log
- Templates / Service Types

MVP에서는 아래 구조가 현실적입니다.

- Appointments
    - Calendar / List
    - New Appointment
    - Appointment Detail
    - Capacity Overlay

---

## 4. 화면 패턴

Pattern ID 제안:

**PT-SVC-APT-001 — Service Appointment Scheduling Workspace**

이 패턴은

**Search + Service Selection + Slot Recommendation + Confirmation** 구조입니다.

세부 패턴은 3개로 나뉩니다.

### 패턴 A. Appointment Search / Intake

고객·차량·서비스 요청을 입력하는 단계

### 패턴 B. Slot Recommendation Board

예약 가능 시간대를 제안하는 단계

### 패턴 C. Confirmation & Pre-Arrival Summary

최종 확정과 사전 준비를 보여주는 단계

---

## 5. 권장 화면 구조

## 상단 Header

- 날짜
- 지점
- 빠른 검색
- 새 예약
- Calendar / List toggle
- Capacity overlay on/off

---

## 좌측 Intake Panel

- 고객
- 차량
- 서비스 유형
- 증상 / 요청사항
- 방문 방식
- 우선조건

---

## 중앙 Slot Selection

- 일별 / 주별 캘린더
- 추천 시간대
- 소요시간
- Waiting 적합 여부
- Advisor / Shop load

---

## 우측 Context Panel

- Vehicle history
- Recall / campaign
- Declined services
- Maintenance due
- AI recommendation
- 정책 / 제약사항

---

## 하단 Confirmation Rail

- 선택 슬롯
- 예상 소요시간
- 사전 체크리스트
- 알림 설정
- Confirm / Save Draft

---

## 6. 주요 화면 패널 정의

## 6-1. Customer / Vehicle Intake Panel

필드

- Customer search
- Contact info
- Vehicle select / add
- VIN
- Mileage
- Visit reason
- Symptom note
- Transportation preference

예시

```
Customer: Jane Miller
Vehicle: 2023 Hyundai Palisade
Mileage: 42,120
Visit reason: Brake noise + maintenance
Visit mode: Waiting
```

---

## 6-2. Service Selection Panel

구성

- Maintenance
- Repair Concern
- Recall / Campaign
- Tire / Brake
- Diagnostic
- Quick service
- Custom concern

선택 방식

- 템플릿형 + 자유입력 혼합

예시

```
Requested Services
[x] Oil Change
[x] Brake Noise Inspection
[ ] Tire Rotation
```

---

## 6-3. Slot Recommendation Board

이 화면의 핵심입니다.

노출 요소

- 날짜
- 시작시간
- 예상 소요시간
- waiting suitability
- load level
- 추천 순위
- earliest available
- preferred advisor availability

예시

```
Tue Mar 17
09:20 AM  ·  1h 20m  ·  Best Match
11:10 AM  ·  1h 20m  ·  Waiting Not Recommended
02:40 PM  ·  1h 20m  ·  Light Shop Load
```

---

## 6-4. Capacity Overlay

예약 화면에서 매우 중요합니다.

표시

- 시간대별 수용 가능도
- 과밀 구간
- EV / diagnostic / recall 전용 제약
- technician skill bottleneck
- bay saturation

시각화 예

- Green: 추천 가능
- Amber: 주의
- Red: 예약 제한

---

## 6-5. Appointment Summary Card

최종 확정용 카드

필드

- 고객명
- 차량
- 방문 목적
- 예약 일시
- 예상 소요시간
- waiting / drop-off
- advisor
- 안내 문구
- reminder 설정

---

## 6-6. Pre-Arrival Checklist Panel

예약 후 운영 효율을 높이는 영역입니다.

예시

- 고객 증상 확인됨
- 연락처 유효
- recall 확인 완료
- 부품 사전확보 필요
- maintenance plan 적용 가능
- drop-off instructions sent

---

## 7. 컴포넌트 정의

## 1) Customer Lookup Field

빠른 고객 검색 컴포넌트

---

## 2) Vehicle Selector

고객 보유 차량 목록 또는 신규 VIN 등록

---

## 3) Service Type Chip Group

서비스 유형 선택용 칩 / 카테고리 버튼

---

## 4) Concern Input Block

정형 + 자유입력 혼합 컴포넌트

예

- category dropdown
- symptom text
- voice input optional

---

## 5) Slot Card

예약 시간 하나를 카드화한 컴포넌트

표시

- time
- duration
- fit label
- waiting suitability
- load badge

---

## 6) Capacity Heatmap

시간대별 부하를 보여주는 시각 컴포넌트

---

## 7) Recall / Due Alert Banner

리콜 또는 정비시기 알림

## 8) Confirmation Footer

예약 확정, 저장, 리마인더 발송 액션 바

---

## 8. 데이터 모델

## Appointment

```
{
  "appointmentId":"APT-260313-1201",
  "storeId":"STORE-01",
  "customerId":"C-1009",
  "vehicleId":"VIN-8892",
  "status":"CONFIRMED",
  "source":"WEB",
  "scheduledStart":"2026-03-17T09:20:00-05:00",
  "scheduledEnd":"2026-03-17T10:40:00-05:00",
  "visitMode":"WAITING",
  "advisorId":"ADV-101",
  "estimatedDurationMin":80,
  "promiseType":"SAME_VISIT"
}
```

---

## AppointmentConcern

```
{
  "appointmentId":"APT-260313-1201",
  "category":"BRAKE",
  "customerStatement":"저속에서 브레이크 밟을 때 소리가 남",
  "requestedServices": [
"OIL_CHANGE",
"BRAKE_INSPECTION"
  ]
}
```

---

## SlotOption

```
{
  "slotId":"SLOT-20260317-0920",
  "start":"2026-03-17T09:20:00-05:00",
  "end":"2026-03-17T10:40:00-05:00",
  "estimatedDurationMin":80,
  "advisorAvailable":true,
  "waitingSuitable":true,
  "capacityScore":0.91,
  "loadLevel":"LOW",
  "recommendationRank":1
}
```

---

## AppointmentPrecheck

```
{
  "appointmentId":"APT-260313-1201",
  "openRecall":true,
  "maintenanceDueItems": [
"CABIN_FILTER",
"BRAKE_FLUID"
  ],
  "declinedHistoryCount":2,
  "partsPreorderRequired":false
}
```

---

## CapacitySnapshot

```
{
  "date":"2026-03-17",
  "timeBucket":"09:00",
  "shopLoad":0.62,
  "diagnosticLoad":0.75,
  "waitingCapacityAvailable":true,
  "evSkillCapacityAvailable":false
}
```

---

## 9. 상태 모델

## 예약 상태

- Draft
- Confirmed
- Checked In
- No Show
- Cancelled
- Rescheduled
- Converted to RO
- Closed

---

## 방문 방식

- Waiting
- Drop-off
- Shuttle
- After-hours Drop
- Loaner Requested
    
    ※ 현재 사용자 요구 기준에서는 대차 기능을 중심으로 확장하지 않음
    

---

## 슬롯 상태

- Available
- Limited
- Blocked
- Overflow
- Recommended

---

## 사전 체크 상태

- Not Checked
- Recall Found
- Due Service Found
- Parts Risk
- Ready for Arrival

---

## 10. UI 설계 원칙

## 1) 고객 예약 화면이면서 내부 운영 화면이어야 함

겉으로는 예약이지만, 실제로는 운영 로직이 깊게 깔려 있어야 합니다.

즉, 예쁜 달력만 있으면 안 되고

**실행 가능한 슬롯만 보여주는 로직 중심 UI**여야 합니다.

---

## 2) 슬롯은 “시간”이 아니라 “운영 가능성”까지 보여야 함

예를 들어 10:00 AM이 비어 있어도

실제로 Waiting customer를 받을 수 없으면 좋은 슬롯이 아닙니다.

따라서 슬롯 카드에는 반드시 보여야 합니다.

- 예상 소요시간
- waiting 적합 여부
- 혼잡도
- 추천 순위

---

## 3) 서비스 종류보다 고객 맥락이 먼저일 수 있음

고객은 정비 항목명을 정확히 모르는 경우가 많습니다.

그래서

- “오일 교환”
- “브레이크 소음”
- “체크엔진등”
- “이상 진동”

같은 **고객 언어 기반 진입**이 가능해야 합니다.

---

## 4) Drop-off / Waiting 구분은 매우 강하게 보여야 함

동일한 작업이라도 Waiting인지 Drop-off인지에 따라

적정 슬롯이 완전히 달라집니다.

---

## 5) 예약 단계에서 사전 세일즈 기회를 놓치지 않아야 함

리콜, due item, declined history는 예약 단계에서 이미 보여줘야 합니다.

---

## 11. Service Appointment Scheduling AI

이 화면은 AI 자동화 효과가 매우 큽니다.

이유는 예약 단계에서 이미 **수요 예측, 시간 예측, 분산 배치, 고객 안내**가 가능하기 때문입니다.

---

## AI 1. Smart Slot Recommendation

고객이 원하는 시간만 보여주는 것이 아니라

실제로 가장 성공 확률이 높은 슬롯을 추천합니다.

입력

- service type
- concern text
- visit mode
- vehicle history
- shop capacity
- technician skill load
- historical job duration

출력

- best match slot
- lowest delay risk slot
- earliest available slot
- advisor-preferred slot

예시

```
Best Match
Tue 09:20 AM
Low delay risk · Waiting suitable · 80 min estimate
```

---

## AI 2. Dynamic Duration Prediction

고정 30분/60분 템플릿이 아니라

실제 예상 시간을 동적으로 계산합니다.

예

- 오일교환 단독: 25분
- 오일교환 + 브레이크 소음: 80분
- 체크엔진 + EV 진단: 140분

이 기능이 없으면 예약 품질이 급격히 떨어집니다.

---

## AI 3. Concern-to-Service Mapping

고객이 자유 텍스트로 입력한 증상을

서비스 코드/카테고리로 자동 변환합니다.

예

```
"고속보다 저속에서 브레이크 밟을 때 소리 남"
→ Brake concern
→ Brake inspection recommended
```

---

## AI 4. Waiting Suitability Prediction

이 예약이 Waiting customer로 가능한지 예측합니다.

출력 예

- Suitable
- Borderline
- Not recommended

사유 예

- diagnostic uncertainty
- parts dependency risk
- high load period

---

## AI 5. Recall / Maintenance Opportunity Detection

예약 생성 시점에

리콜, due service, 과거 declined service를 묶어 제안합니다.

예

```
Also due at visit
- Cabin filter replacement
- Brake fluid service
Open campaign found
- Safety recall 24R1
```

---

## AI 6. No-show / Late Risk Prediction

고객의 과거 행동과 예약 특성을 바탕으로

No-show 가능성을 예측합니다.

활용

- reminder 강화
- deposit policy
- waitlist overbooking control
- advisor prep 우선순위 조정

---

## AI 7. Pre-Arrival Intake Assistant

예약 후 고객에게 보낼 사전 질문/확인 메시지를 자동 생성합니다.

예

- 증상 재확인
- warning light 여부
- 대기/픽업 방식 확인
- 연락처 및 도착시간 확인

---

## AI 8. Reschedule Recommendation

예약 변경 시

단순 빈 슬롯 대신 운영 최적 슬롯을 다시 제안합니다.

---

## AI 9. Capacity Balancing

한 Advisor/한 시간대에 예약이 몰리지 않도록

자동 분산 추천을 합니다.

---

## AI 10. Appointment Summary Generator

긴 예약 메모를 내부 운영용 3줄 요약으로 변환합니다.

예

```
Customer reports low-speed brake noise.
Requests same-visit maintenance if possible.
Waiting preferred, but drop-off recommended if diagnosis expands.
```

---

## 12. KPI 제안

### 운영 KPI

- Appointments Today
- Waiting Appointments
- Drop-off Appointments
- No-show Rate
- Reschedule Rate

### 품질 KPI

- On-time Check-in Rate
- Promise Time Hit Rate
- Booking-to-RO Conversion
- AI Recommended Slot Adoption Rate

### 생산성 KPI

- Capacity Utilization by Slot
- Advisor Load Balance
- Overbooked Time Buckets
- Same-day Fill Rate

---

## 13. 화면 카피 샘플

### Header

- Service Appointments
- New Appointment
- Capacity View
- Today / Week / List

### Intake

- Customer
- Vehicle
- Visit Reason
- Symptom Details
- Visit Mode

### Slot Area

- Recommended Times
- Earliest Available
- Waiting Friendly
- Lower Delay Risk

### Right Panel

- Vehicle History
- Open Recall
- Due Services
- AI Recommendations

### Confirmation

- Confirm Appointment
- Send Reminder
- Save Draft
- Start Pre-Check-in

---

## 14. 구현 프롬프트 초안

```
Dealer365 Service Appointment Scheduling 화면을 설계한다. 이 화면은 단순 예약 캘린더가 아니라 고객 예약과 내부 용량 계획을 연결하는 운영 인터페이스다. 상단에는 날짜, 지점, 검색, 새 예약, calendar/list toggle, capacity overlay를 배치한다. 좌측 intake 패널에는 고객, 차량, 서비스 요청, 증상, 방문 방식(Waiting / Drop-off / Shuttle)을 입력한다. 중앙에는 실제 예약 가능한 슬롯만 카드 형태로 표시하며, 각 슬롯은 시작시간, 예상 소요시간, waiting 적합 여부, 혼잡도, 추천 순위를 보여준다. 우측 패널에는 차량 이력, 리콜, maintenance due, declined history, AI recommendation을 표시한다. 하단 confirmation rail에는 선택 슬롯, 예상 시간, 사전 체크리스트, reminder 설정, confirm 버튼을 제공한다. AI는 smart slot recommendation, dynamic duration prediction, concern-to-service mapping, waiting suitability prediction, recall/due opportunity detection, no-show risk, pre-arrival intake summary를 제공한다. 전체 UX는 예약 화면이면서 운영용 command interface처럼 정확하고 실행 가능해야 한다.
```

---

# Advanced Insight

Appointment Scheduling은 보통 과소평가되지만,

Dealer365 Service 전체 품질을 결정하는 **첫 번째 제어점**입니다.

기존 시스템은 대체로 이 수준에 머뭅니다.

- 빈 시간 찾기
- 예약 넣기
- 문자 보내기

하지만 Dealer365는 그 수준을 넘어서야 합니다.

### 추천 포지셔닝

- 기존: Appointment Booking
- 개선: Smart Scheduling
- 최종: Pre-Service Orchestration

### 핵심 차별화 포인트

1. 슬롯 추천이 단순 빈칸 기반이 아니라 운영 가능성 기반
2. 예약 단계에서 Recall / Due / Declined를 통합
3. Waiting 적합성 판단
4. Capacity와 Dispatch까지 선행 반영
5. AI가 “언제 잡을지”뿐 아니라 “왜 이 시간이 좋은지”까지 설명

즉, 이 화면은

**고객 예약 화면**이 아니라

실제로는 **하루 서비스 운영 품질을 미리 결정하는 제어판**이어야 합니다.