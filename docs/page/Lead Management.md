# Executive Summary

이제 **Dealer365 DMS 핵심 화면 중 Sales 영역의 첫 번째 화면인 `Lead Management`**를 설계합니다.

지금까지 설계한 것은 대부분 **Service 운영 시스템**이었고, 이제 **Sales CRM 영역**으로 넘어갑니다.

Lead Management는 자동차 딜러십에서 **모든 판매 기회의 시작점**입니다.

웹사이트, 전화, 워크인, 광고, OEM 포털 등에서 들어오는 고객 문의를 **판매 기회(Opportunity)**로 전환하고 관리하는 시스템입니다.

Dealer365에서 Lead Management는 다음처럼 정의하는 것이 적합합니다.

**Lead Management = Automotive CRM + Opportunity Pipeline + Follow-up Engine**

즉 단순 고객 리스트가 아니라

```
Lead Intake → Qualification → Opportunity → Test Drive → Deal Desk
```

로 이어지는 **판매 파이프라인의 첫 단계**입니다.

---

# Detailed Solution

# 1. 화면 정의

### 목적

딜러십으로 들어오는 모든 고객 문의(Lead)를 수집하고,

영업 담당자가 **빠르게 대응하고 판매 기회로 전환하도록 관리**하는 것입니다.

### 주요 사용자

Primary

- Salesperson
- BDC Agent (Business Development Center)

Secondary

- Sales Manager

### 핵심 질문

Lead Management 화면은 아래 질문에 답해야 합니다.

- 지금 새로 들어온 고객 문의는 무엇인가
- 어떤 고객이 아직 연락을 받지 못했는가
- 어떤 고객이 구매 의향이 높은가
- 어떤 Lead가 판매 기회로 전환되고 있는가
- 어느 salesperson에게 배정되었는가

---

# 2. 실제 딜러십 Workflow

## A. Lead 유입

Lead는 여러 채널에서 들어옵니다.

```
Dealer Website
OEM Lead Portal
Phone inquiry
Walk-in
Marketplace (Cars.com 등)
Email inquiry
```

Lead 생성 예

```
Customer: John Smith
Interest: 2024 Tucson
Channel: Website
```

---

## B. Lead 배정

Lead는 다음 방식으로 배정됩니다.

```
Auto assignment
Round robin
Manager assignment
BDC assignment
```

---

## C. 첫 연락 (First Contact)

Lead가 들어오면 보통 **10~15분 내 연락**해야 합니다.

예

```
Call customer
Send SMS
Send email
```

---

## D. Qualification

고객의 구매 의사를 확인합니다.

```
Budget
Vehicle interest
Trade-in 여부
Timeline
Financing
```

---

## E. Opportunity 생성

구매 가능성이 확인되면 Lead가 Opportunity로 전환됩니다.

```
Lead → Opportunity
```

---

## F. Sales Pipeline

Opportunity는 다음 단계를 거칩니다.

```
Contacted
Appointment set
Showroom visit
Test drive
Negotiation
Deal
```

---

# 3. Dealer365 IA

### 1뎁스

Sales

### 2뎁스

Leads

### 3뎁스

```
Lead Inbox
Pipeline
Lead Detail
Tasks / Follow-ups
Communication History
```

MVP 구조

```
Leads
 ├ Lead Inbox
 ├ Pipeline
 ├ Lead Detail
```

---

# 4. 화면 패턴

Pattern ID

**PT-SLS-LEAD-001 — Lead Management Workspace**

구조

```
Lead Inbox
Lead Detail Panel
Pipeline View
Activity Panel
```

---

# 5. 화면 레이아웃

## 상단 Header

```
Search lead
Filters
New lead
```

필터 예

```
Source
Status
Salesperson
Date
Vehicle interest
```

---

## 좌측

### Lead Inbox

예

```
John Smith
2024 Tucson
Website Lead
Received 5 min ago
```

상태

```
New
Contacted
Appointment
Opportunity
Lost
```

---

## 중앙

### Lead Detail

예

```
Customer
Phone
Email

Interested Vehicle
2024 Tucson Limited

Budget
$35,000
```

---

## 우측

### Activity Panel

예

```
Call log
SMS
Email
Notes
Tasks
```

---

# 6. 주요 컴포넌트

## 1️⃣ Lead Card

```
Customer name
Vehicle interest
Source
Status
Assigned salesperson
Time received
```

---

## 2️⃣ Lead Status Badge

```
New
Contacted
Qualified
Opportunity
Lost
```

---

## 3️⃣ Activity Timeline

```
Call attempt
SMS sent
Email sent
Appointment booked
```

---

## 4️⃣ Vehicle Interest Card

```
Vehicle model
Trim
Stock availability
```

---

## 5️⃣ Task Card

```
Call customer
Send quote
Schedule test drive
```

---

## 6️⃣ Pipeline Board

Kanban 스타일

```
New
Contacted
Appointment
Test Drive
Negotiation
Deal
```

---

# 7. 데이터 모델

## Lead

```
{
  "leadId":"LEAD-001",
  "customerName":"John Smith",
  "phone":"555-1234",
  "email":"john@example.com",
  "source":"WEBSITE",
  "status":"NEW",
  "vehicleInterest":"2024 Tucson",
  "assignedSalesperson":"SP-12"
}
```

---

## LeadActivity

```
{
  "activityId":"ACT-001",
  "leadId":"LEAD-001",
  "type":"CALL",
  "timestamp":"2026-03-13T10:00:00Z",
  "result":"NO ANSWER"
}
```

---

## LeadTask

```
{
  "taskId":"TASK-001",
  "leadId":"LEAD-001",
  "type":"CALL",
  "dueAt":"2026-03-13T11:00:00Z"
}
```

---

# 8. 상태 모델

## Lead Status

```
New
Contacted
Qualified
Opportunity
Lost
```

---

## Opportunity Status

```
Appointment
Showroom
Test drive
Negotiation
Deal
```

---

# 9. UI 설계 원칙

## 1️⃣ Inbox 중심

Lead CRM은 이메일처럼 **Inbox 중심**이 가장 효율적입니다.

---

## 2️⃣ Activity 중심 UI

CRM은 고객 데이터보다 **활동 기록**이 중요합니다.

---

## 3️⃣ Follow-up 가시화

Follow-up이 없는 Lead는 사라집니다.

---

## 4️⃣ Pipeline 시각화

Sales manager는 Pipeline을 봅니다.

---

# 10. Lead Management AI

AI는 CRM에서 매우 중요한 역할을 합니다.

---

## AI 1. Lead Scoring

구매 가능성 예측

```
High
Medium
Low
```

---

## AI 2. Next Best Action

추천 행동

```
Call now
Send quote
Schedule test drive
```

---

## AI 3. Response Assistant

고객 메시지 자동 작성

---

## AI 4. Lead Routing

자동 salesperson 배정

---

## AI 5. Duplicate Lead Detection

중복 Lead 탐지

---

## AI 6. Conversation Summary

통화/메시지 요약

---

# 11. KPI

Sales CRM KPI

```
Lead response time
Lead conversion rate
Appointment rate
Test drive rate
Deal close rate
```

---

# Advanced Insight

Dealer365 Sales CRM에서 가장 중요한 구조는 **Lead → Opportunity → Deal** 연결입니다.

```
Lead
   ↓
Opportunity
   ↓
Deal Desk
   ↓
Vehicle Delivery
```

즉 Lead Management는 **Deal Desk의 전 단계 시스템**입니다.