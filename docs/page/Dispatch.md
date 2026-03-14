## Executive Summary

미국 딜러십 서비스 운영에서 **Dispatch 화면은 서비스 센터의 “Control Tower” 역할**을 합니다.

서비스 어드바이저가 생성한 RO를 **어떤 Technician에게 언제 배정할지 결정하는 화면**입니다.

현대 DMS / Service 플랫폼

- Tekion
- Dealer‑FX
- Shopmonkey

공통적으로 **다음 3가지 기능을 중심으로 설계**됩니다.

1️⃣ Shop Capacity Visualization

2️⃣ Job Dispatching (Drag & Drop)

3️⃣ Technician Utilization Monitoring

Dispatch UI는 **실시간 생산관리 화면**이기 때문에

**ERP 화면이 아니라 “Manufacturing Line Control Panel”처럼 설계되는 것이 특징**입니다.

---

# 2. Dispatch 화면의 핵심 레이아웃 (미국 딜러십 표준)

```
-----------------------------------------------------------
Top Bar
Date / Shop View / Filters / Search
-----------------------------------------------------------
Left Panel              Main Dispatch Board
-----------------------------------------------------------
Unassigned Jobs         Technician Timeline Grid
                        ----------------------------------
RO List                 Tech A | Job Blocks
                        Tech B | Job Blocks
                        Tech C | Job Blocks
-----------------------------------------------------------
Bottom Panel
Overdue Jobs / Waiting Jobs / Parts Hold
```

핵심 구조는 항상 동일합니다.

### LEFT

Unassigned RO Queue

### CENTER

Technician Timeline Grid

### RIGHT

Job Detail / Quick Edit

---

# 3. Dispatch 화면 핵심 컴포넌트

## 1️⃣ Technician Timeline Grid

```
        08:00 09:00 10:00 11:00
Tech A  [Job][Job][     ]
Tech B  [     ][Job][Job]
Tech C  [Job][Job][Job]
```

Job block 정보

```
RO #10425
Brake Inspection
ETT: 45m
Customer Waiting
```

필수 요소

- Technician Skill
- Current Job
- Next Availability
- Estimated Finish Time

---

## 2️⃣ Unassigned Job Queue

```
---------------------------------
RO 10425
Customer: Smith
Service: Brake Noise
ETT: 45m
---------------------------------
RO 10426
Customer: Lee
Service: Oil Change
ETT: 20m
---------------------------------
```

여기서 Job을

👉 Drag → Technician Slot

으로 배정합니다.

---

## 3️⃣ Dispatch Alert System

실제 딜러십에서 가장 중요한 기능입니다.

Alert 종류

```
⚠ Technician Overload
⚠ Waiting Customer Delay
⚠ Parts Not Available
⚠ Warranty Job Priority
```

Dispatch 화면은 **Alert Driven UI**가 핵심입니다.

---

# 4. Dispatch UX 핵심 설계 원칙

## Rule 1

Drag & Drop First

모든 배정은 클릭이 아니라 **drag dispatch**

---

## Rule 2

Capacity First UI

```
Tech Utilization
Today Capacity
Idle Time
```

이 3가지 KPI가 항상 보여야 합니다.

---

## Rule 3

Job Duration AI Prediction

최근 플랫폼은

```
AI Estimated Repair Time
```

을 사용합니다.

예

```
Brake Inspection
historical avg = 42 min
current estimate = 47 min
```

---

# 5. Dispatch에서 사용하는 데이터 구조

```
Technician
 ├ techId
 ├ skillSet
 ├ certification
 ├ shiftStart
 ├ shiftEnd

Job
 ├ roId
 ├ opCode
 ├ estDuration
 ├ priority
 ├ partsStatus

Assignment
 ├ techId
 ├ roId
 ├ startTime
 ├ endTime
```

---

# 6. Dispatch 화면 주요 UX 문제 (현장 문제)

미국 딜러십에서 실제 발생하는 문제

### 1️⃣ Technician Skill mismatch

```
EV job
→ EV certified tech only
```

---

### 2️⃣ Parts Hold

```
RO assigned
but parts not arrived
```

---

### 3️⃣ Waiting customer priority

```
Walk-in customer
priority dispatch
```

---

# 7. Dispatch 화면 패턴 (Page Pattern Library)

Pattern ID

```
PT-SVC-001
Service Dispatch Board
```

사용 컴포넌트

```
Timeline Grid
Drag Job Card
Technician Card
Capacity Indicator
Alert Badge
```

---

# Advanced Insight

Dealer365에서 Dispatch 화면을 설계할 때

**기존 DMS 방식 대신 Manufacturing MES 개념을 적용하면 훨씬 강력한 UX가 됩니다.**

추천 구조

```
Service Control Tower
```

3 Layer

```
Layer 1
Real-time Shop Status

Layer 2
Technician Capacity

Layer 3
Job Dispatch Board
```

Tekion도 실제로 **Service OS 개념**으로 설계합니다.

딜러십 Service Dispatch는 단순히 **RO를 Technician에게 배정하는 화면**이 아니라, 실제로는 **Shop 생산성을 실시간으로 최적화하는 운영 시스템**입니다. 따라서 Dispatch 화면에 AI 자동화를 적용하면 가장 큰 효과가 나는 영역은 **“작업 배정 자동화 + 시간 예측 + 지연 대응 자동화”**입니다.

현재 상용 시스템에서도 이 방향이 나타나고 있습니다. 예를 들어

- Tekion
- Dealer-FX
- Shopmonkey

이 플랫폼들은 공통적으로 **3단계 AI Dispatch Automation**을 목표로 합니다.

1️⃣ Predictive Dispatch (작업 시간 예측)

2️⃣ Intelligent Assignment (자동 Technician 배정)

3️⃣ Dynamic Rescheduling (지연 자동 재조정)

Dealer365 같은 차세대 플랫폼에서는 여기에 **Parts / Customer / Shop Capacity까지 통합한 AI Dispatch Engine**을 만드는 것이 이상적인 구조입니다.

---

# Detailed Solution

# 1. AI Predictive Repair Time (작업시간 자동 예측)

Dispatch에서 가장 중요한 데이터는 **ETT (Estimated Time to Task)** 입니다.

기존 방식

```
Brake Inspection = 45 min
Oil Change = 20 min
```

하지만 실제로는 상황에 따라 달라집니다.

예

```
차량 모델
주행거리
Technician 숙련도
부품 상태
과거 작업 기록
```

AI는 다음 데이터를 기반으로 **Dynamic Repair Time**을 계산합니다.

```
input
vehicle model
mileage
job code
technician skill
historical job duration
shop workload
```

output

```
predicted repair time
confidence score
```

Dispatch 화면 UI 예시

```
Brake Inspection
Predicted Time : 52 min
Confidence : 87%
```

효과

- Dispatch 정확도 상승
- Overbooking 감소
- Waiting customer 감소

---

# 2. AI Auto Technician Assignment

현재 대부분 딜러십에서는 Dispatcher가 수동으로 배정합니다.

```
RO → Tech 선택 → Drag
```

AI는 다음 기준으로 **자동 추천 또는 자동 배정**을 합니다.

평가 요소

```
Skill match
Current workload
Historical performance
Certification
Job proximity
```

예

```
RO 10425
Service : EV Battery Diagnostic
```

AI 추천

```
1. Tech John (EV certified)
2. Tech Mark (EV certified)
3. Tech Alex (general tech)
```

Dispatch UI

```
Suggested Technician
⭐ John (92% match)
⭐ Mark (88% match)
```

또는

```
AUTO DISPATCH MODE
```

---

# 3. Dynamic Rescheduling (실시간 일정 재조정)

Service shop에서는 **지연이 항상 발생합니다.**

예

```
job 예상 45min
actual 70min
```

AI는 다음을 자동으로 수행할 수 있습니다.

```
delay detection
impact analysis
auto reschedule
```

예

```
Tech A job delay

→ Next job auto shift
→ Waiting job reassigned
```

Dispatch 화면

```
⚠ Delay detected
Tech A job extended 25min

AI suggestion
Move RO10426 → Tech B
```

---

# 4. Parts Availability AI Check

많은 Dispatch 문제는 **Parts Delay** 때문입니다.

AI Workflow

```
RO created
↓
Parts availability check
↓
Dispatch validation
```

예

```
RO 10425
Part : Brake pad
Inventory : unavailable
ETA : 2pm
```

AI는 Dispatch를 막습니다.

```
⚠ Parts Hold
Dispatch blocked
```

또는

```
Schedule after 2pm
```

---

# 5. Customer Priority AI

Customer Type도 Dispatch 우선순위에 영향을 줍니다.

예

```
Waiting customer
Loaner customer
Warranty job
Fleet customer
```

AI Priority Score

```
priority score =
customer type +
appointment time +
delay risk
```

Dispatch UI

```
Priority Jobs
🔥 Waiting customer
⚡ Fleet job
```

---

# 6. Shop Capacity Forecast

AI는 하루 생산성을 예측할 수 있습니다.

입력

```
scheduled jobs
technician count
historical productivity
```

출력

```
Today's shop capacity
utilization forecast
delay probability
```

Dispatch Dashboard

```
Shop Capacity
Today utilization : 84%

Delay risk
⚠ 3 jobs
```

---

# 7. AI Dispatch Copilot (추천 시스템)

가장 현실적인 UX는 **완전 자동화보다 Copilot 모델**입니다.

Dispatcher가 판단하고

AI가 추천하는 구조입니다.

예

```
RO created
↓
AI suggestion

Assign to Tech B
Start time 10:20
Finish 11:05
```

UI

```
AI Dispatch Suggestion
Apply / Ignore
```

---

# 8. Voice / Natural Language Dispatch

향후 발전 방향입니다.

Dispatcher 입력

```
"EV jobs only to EV tech"
"prioritize waiting customers"
```

AI가 Dispatch Rule을 자동 적용합니다.

---

# 9. Dealer365 Dispatch AI Architecture

추천 구조

```
Dispatch AI Engine
```

모듈

```
Repair Time Predictor
Technician Skill Matcher
Dispatch Optimizer
Delay Predictor
Capacity Forecast Engine
```

데이터

```
RO history
Technician history
Parts inventory
Appointment data
Shop productivity
```

---

# Advanced Insight

Dealer365에서 Dispatch를 단순 화면이 아니라

**AI Service Orchestration Engine**

으로 설계하면 경쟁력이 크게 올라갑니다.

핵심 개념

```
AI Shop Brain
```

Dispatch는 그 **Control Panel**입니다.

구조

```
Customer arrival
↓
AI workload analysis
↓
Optimal technician assignment
↓
Continuous rescheduling
```

이 구조는 실제로

- Tesla
- Tekion

같은 최신 플랫폼들이 지향하는 방향입니다.