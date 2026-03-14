RO Workspace는 서비스 영역에서 가장 중요한 화면입니다.

이유는 단순합니다. **서비스 업무의 거의 모든 데이터와 액션이 RO를 중심으로 연결되기 때문**입니다.

이 화면은 다음을 동시에 처리해야 합니다.

- 고객 불편사항/증상 접수
- 작업 라인(오퍼레이션) 구성
- Technician 배정 및 진행 추적
- 부품/보증/판촉/내부작업 처리
- MPI/VHC 결과 반영
- 승인 요청 및 금액 변경
- 약속시간/출고시간 관리
- 최종 청구/인도 연계

Dealer365에서 RO Workspace는 단순 입력 폼이 아니라, 다음처럼 정의하는 것이 맞습니다.

**RO Workspace = Service Transaction Core + Operational Orchestration Screen**

---

# Detailed Solution

## 1. 화면 정의

### 화면 목적

하나의 Repair Order를 기준으로 **고객, 차량, 작업, 비용, 상태, 승인, 부품, 커뮤니케이션**을 한 화면에서 관리하는 것입니다.

### 사용자

- Main: Service Advisor
- Secondary: Dispatcher, Technician, Warranty Admin, Parts, Cashier, Manager

### 핵심 질문

이 화면은 사용자가 아래를 즉시 파악할 수 있어야 합니다.

- 이 RO의 현재 상태는 어디인가
- 고객이 무엇을 요청했는가
- 어떤 작업이 포함되었는가
- 추가 승인 대기 건이 무엇인가
- 부품 문제는 있는가
- 보증/유상/판촉 구성이 맞는가
- 고객에게 약속한 시간은 지킬 수 있는가
- 지금 다음으로 해야 할 액션은 무엇인가

---

## 2. 실제 딜러십 Workflow

RO Workspace는 실제 현장 흐름을 그대로 반영해야 합니다.

## A. 접수 / Write-up

1. 고객/차량 식별
2. Appointment 연결 또는 Walk-in 생성
3. Complaint / Concern / Symptom 입력
4. 기본 작업 추가
5. 약속시간/대기 여부/픽업 방식 확인
6. RO 생성

---

## B. 진단 및 작업 설계

1. Technician 또는 Dispatcher가 진단 대기 상태로 전환
2. 초기 점검 결과 등록
3. 필요한 Op line 추가
4. Labor / Parts / Sublet / Misc 구성
5. 필요 시 Warranty 또는 Internal 구분

---

## C. 추가 판매 / 승인

1. MPI/VHC 결과 유입
2. 추가 권장 정비 생성
3. Estimate 재산출
4. 고객 승인 요청 발송
5. 승인/거절 반영

---

## D. 작업 진행

1. Tech 배정
2. 작업 시작/중단/재개
3. 부품 입고/대기 상태 반영
4. ETA 업데이트
5. 품질검사/세차 등 후행 스텝 관리

---

## E. 완료 / 인도

1. Final line review
2. 총액 확인
3. 출고 준비
4. 결제 연계
5. Delivered / Closed 처리

즉, RO Workspace는 단순 “문서 화면”이 아니라 **서비스 운영의 실행 단위**입니다.

---

## 3. Dealer365 기준 IA

### 1뎁스

**Service**

### 2뎁스

**Repair Orders**

### 3뎁스

- RO List
- RO Workspace
- Estimates
- Approval History
- Delivery Prep
- Closed RO History

실제 MVP에서는 아래처럼 가져가는 것이 좋습니다.

- Repair Orders
    - Open RO List
    - RO Workspace
    - Approval Queue
    - Delivered / Closed

하지만 핵심은 **RO Workspace를 중심 허브로 두는 것**입니다.

---

## 4. 화면 패턴

Pattern ID 제안

**PT-SVC-RO-001 — Repair Order Workspace**

이 패턴은 **Master Header + Line-item Work Area + Status Rail + Context Panels** 구조가 적합합니다.

---

## 5. 권장 화면 구조

## 상단 고정 Header

RO의 핵심 정체성과 상태를 보여줍니다.

표시 요소

- RO 번호
- 상태
- 고객명
- 차량 정보
- 약속시간 / Promise Time
- 방문 유형
- Advisor / Technician
- 금액 요약
- 승인 상태
- 부품 상태

즉시 액션

- Save
- Send Update
- Send Approval
- Print / Preview
- Close RO
- Hold / Cancel

---

## 좌측 메인 영역

실제 작업 라인과 금액을 편집하는 핵심 영역입니다.

### 섹션

1. Customer Concern / Symptom
2. Operation Lines
3. Labor / Parts / Fees
4. Estimate Summary
5. Approval Blocks

---

## 우측 컨텍스트 패널

RO를 둘러싼 상태와 연결 정보를 보여줍니다.

### 섹션

- Vehicle History
- MPI/VHC Result
- Parts Availability
- Warranty Eligibility
- Dispatch / Tech Status
- Customer Communication Log
- AI Copilot

---

## 하단 또는 탭 영역

깊이 있는 세부정보를 탭으로 분리합니다.

- Timeline
- Notes
- Media
- Approval History
- Parts
- Warranty
- Audit Log

---

## 6. 주요 화면 패널 정의

## 6-1. RO Header Card

필수 필드

- RO No
- Status
- Customer Name
- VIN / Year / Make / Model
- Mileage
- Promise Time
- Advisor
- Assigned Tech
- Visit Mode
- Total Estimate
- Customer Approval Status

예시

```
RO-240313-0182
IN PROGRESS
2023 Hyundai Palisade · 42,120 mi
Customer: Jane Miller
Promise Time: 3:30 PM
Advisor: James Park
Tech: T-22
Estimate: $689.40
Approval: Pending
```

---

## 6-2. Customer Concern / Write-up Panel

이 영역은 아주 중요합니다.

고객의 원문 맥락이 손실되면 이후 모든 흐름이 틀어집니다.

구성

- Complaint Category
- Customer Statement
- Symptom Detail
- When/Where/How Often
- Requested Services
- Advisor Notes

예시 구조

```
Concern: Brake noise
Customer statement: 저속에서 브레이크 밟을 때 끽 소리가 남
Condition: cold start / low speed
Requested by customer: inspect only
```

---

## 6-3. Operation Line Grid

RO 화면의 핵심입니다.

한 줄이 하나의 작업 단위입니다.

### 컬럼 예시

- Line No
- Op Code
- Description
- Pay Type
- Labor Hours
- Labor Amount
- Parts Amount
- Fee
- Status
- Approval
- Assigned Tech

예시

```
10 | BRAKE-INSP | Brake Inspection | C | 0.8 | 120 | 0 | 0 | Open | N/A | T-22
20 | PAD-REPL   | Front Brake Pad Replace | C | 1.5 | 225 | 260 | 12 | Pending | Pending | T-22
30 | ROTOR-MACH | Rotor Resurface | C | 0.7 | 105 | 0 | 0 | Awaiting Approval | Pending | -
```

### Pay Type 예시

- C = Customer Pay
- W = Warranty
- I = Internal
- M = Maintenance Plan / Contract
- P = Promotional / Goodwill

---

## 6-4. Estimate Summary Panel

요약은 항상 우측 상단 또는 하단 고정으로 보여야 합니다.

구성

- Labor Total
- Parts Total
- Fees / Shop Supplies
- Tax
- Discounts
- Warranty Amount
- Customer Pay Total

예시

```
Labor      $330.00
Parts      $260.00
Fees       $12.00
Tax        $42.40
-------------------
Customer   $644.40
```

---

## 6-5. Approval Panel

추가 승인 건이 있는 경우 독립 패널로 분리해야 합니다.

구성

- Approval Items
- Sent Time
- Viewed 여부
- Customer Response
- Expiration / Follow-up time
- Resend / Call / Modify

예시

```
Front Brake Pad Replace
$489.99
Sent 10:42 AM
Viewed 10:47 AM
Response: No response
Next action: Call customer
```

---

## 6-6. Vehicle Context Panel

RO만 보면 부족합니다. 차량 맥락이 함께 보여야 합니다.

구성

- Previous ROs
- Declined services
- Open recalls / campaigns
- Repeated complaint
- Last visit date
- Maintenance due items

---

## 6-7. Parts Context Panel

구성

- Required parts by line
- On hand / ordered / backorder
- ETA
- pick status
- hold impact

예시

```
Front Brake Pad Kit
Status: Ordered
ETA: 2:30 PM
Impact: Cannot start line 20
```

---

## 6-8. Timeline Panel

RO의 시간 흐름을 보여줍니다.

예시

```
09:12 Check-in
09:18 RO Opened
09:42 Assigned to T-22
10:15 Initial diagnosis completed
10:42 Approval sent
11:07 Customer viewed estimate
```

이건 실제 운영에서 굉장히 중요합니다.

나중에 분쟁, CSI, 내부 리뷰 때 모두 근거가 됩니다.

---

## 7. 컴포넌트 정의

## 1) RO Header Bar

상태와 핵심 액션을 가진 sticky header

---

## 2) Line Item Grid

다중 작업 라인을 편집하는 grid/table

핵심 기능

- line add
- duplicate
- reorder
- split pay type
- status update
- tech assign
- collapse/expand detail

---

## 3) Pay Type Selector

작업 라인별 청구 타입을 분리하는 selector

예

- Customer Pay
- Warranty
- Internal
- Goodwill
- Contract

---

## 4) Approval Block Card

승인 요청 단위 카드

---

## 5) Estimate Summary Box

실시간 합계를 보여주는 floating summary

---

## 6) Context Side Panel

차량 이력 / MPI / Parts / Warranty / Communication을 스위칭

---

## 7) Timeline / Audit Accordion

시간 로그와 변경 이력을 펼쳐보는 패턴

---

## 8) Smart Action Bar

현재 상태에 따라 버튼이 달라지는 액션 바

예

- Open RO 상태: Assign Tech / Add Op
- Waiting Approval 상태: Resend / Call / Edit Estimate
- Ready 상태: Prepare Delivery / Close

---

## 8. 데이터 모델

## RepairOrder

```
{
  "roId":"RO-240313-0182",
  "status":"IN_PROGRESS",
  "appointmentId":"APT-20311",
  "customerId":"C-1009",
  "vehicleId":"VIN-8892",
  "advisorId":"ADV-101",
  "assignedTechId":"TECH-22",
  "openedAt":"2026-03-13T09:18:00Z",
  "promiseTime":"2026-03-13T15:30:00Z",
  "visitMode":"WAITING",
  "mileage":42120,
  "totals": {
    "labor":330.0,
    "parts":260.0,
    "fees":12.0,
    "tax":42.4,
    "discount":0.0,
    "customerPay":644.4,
    "warrantyPay":0.0
  }
}
```

---

## ROConcern

```
{
  "roId":"RO-240313-0182",
  "concernId":"CON-01",
  "category":"BRAKE",
  "customerStatement":"저속에서 브레이크 밟을 때 끽 소리가 남",
  "condition":"cold start / low speed",
  "advisorNote":"customer wants inspection first"
}
```

---

## ROOperationLine

```
{
  "lineNo":20,
  "roId":"RO-240313-0182",
  "opCode":"PAD-REPL",
  "description":"Front Brake Pad Replace",
  "payType":"CUSTOMER",
  "laborHours":1.5,
  "laborAmount":225.0,
  "partsAmount":260.0,
  "feeAmount":12.0,
  "status":"WAITING_APPROVAL",
  "approvalStatus":"SENT",
  "assignedTechId":"TECH-22"
}
```

---

## ROPart

```
{
  "roId":"RO-240313-0182",
  "lineNo":20,
  "partNo":"58101-ABC12",
  "description":"Front Brake Pad Kit",
  "qty":1,
  "status":"ORDERED",
  "eta":"2026-03-13T14:30:00Z"
}
```

---

## ROApproval

```
{
  "approvalId":"APR-8831",
  "roId":"RO-240313-0182",
  "lineNo":20,
  "amount":489.99,
  "sentAt":"2026-03-13T10:42:00Z",
  "viewedAt":"2026-03-13T10:47:00Z",
  "responseStatus":"NO_RESPONSE"
}
```

---

## ROEvent

```
{
  "eventId":"EVT-10021",
  "roId":"RO-240313-0182",
  "type":"APPROVAL_SENT",
  "timestamp":"2026-03-13T10:42:00Z",
  "actor":"ADV-101",
  "payload": {
    "approvalId":"APR-8831"
  }
}
```

## 9. 상태 모델

## RO 상태

- Draft
- Open
- Assigned
- In Diagnosis
- Waiting Approval
- Waiting Parts
- In Progress
- QC
- Ready
- Delivered
- Closed
- Cancelled

---

## 작업 라인 상태

- Not Started
- Diagnosed
- Pending Approval
- Waiting Parts
- Assigned
- In Progress
- Completed
- Hold
- Declined

---

## 승인 상태

- Not Required
- Draft
- Sent
- Viewed
- Approved
- Partially Approved
- Declined
- No Response
- Expired

---

## 부품 상태

- Not Needed
- Requested
- Picked
- Ordered
- Backorder
- Received
- Installed

이 상태 체계는 RO Workspace에서 직접 보여야 합니다.

숨겨진 백오피스 로직이 되면 안 됩니다.

---

## 10. UI 설계 원칙

## 1) 문서형 폼이 아니라 작업공간이어야 함

RO 화면이 고전 DMS처럼 수십 개 필드를 나열한 폼이면 사용성이 급격히 떨어집니다.

권장 방식

- 핵심 정보는 상단 고정
- 작업 라인은 메인
- 컨텍스트는 사이드 패널
- 세부정보는 탭/아코디언

---

## 2) 상태와 비용이 항상 보여야 함

사용자는 이 RO의 상태와 금액을 가장 자주 확인합니다.

고정 표시 추천

- RO status
- Promise time
- Approval status
- Total estimate
- Parts hold
- Next action

---

## 3) 라인 중심 설계

RO는 헤더보다 line-item이 본체입니다.

따라서 line grid UX에 가장 많은 품질을 투자해야 합니다.

필수

- line add/edit 빠름
- pay type 변경 쉬움
- parts 연결 직관적
- approval 연동 명확
- tech 배정 쉬움

---

## 4) 고객 원문 맥락 보존

Complaint를 코드/분류로만 치환하면 현장 정확도가 떨어집니다.

고객 원문과 구조화 데이터가 함께 있어야 합니다.

---

## 5) 예외가 잘 보여야 함

다음은 항상 눈에 띄어야 합니다.

- Promise time risk
- Waiting customer
- No response approval
- Parts backorder
- Repeat complaint
- Warranty block

---

## 11. Dealer365용 탭 구조 제안

RO Workspace 내부 탭 예시

- Overview
- Operations
- Parts
- Approvals
- MPI / Media
- Timeline
- Warranty
- Notes / Audit

MVP에서는 너무 많은 탭보다 아래 구성이 현실적입니다.

- Overview
- Operations
- Approvals
- Timeline

사이드 패널에서

- Vehicle History
- Parts
- MPI
    
    를 토글하는 방식이 더 효율적입니다.
    

---

## 12. RO Workspace AI

이 화면은 AI 자동화 효과가 매우 큽니다.

이유는 RO가 **입력 데이터가 많고, 판단 포인트가 많고, 예외가 많은 화면**이기 때문입니다.

---

## AI 1. Concern Structuring

Advisor가 입력한 고객 서술을 구조화합니다.

입력

- 자유 텍스트
- 음성 메모
- 예약 메모

출력

- complaint category
- symptom
- condition
- urgency
- likely related systems

예시

```
"고속보다는 저속에서 브레이크 밟을 때 소리가 남"
→ System: Brake
→ Condition: low speed
→ Symptom: squeal noise
```

---

## AI 2. Recommended Operation Lines

입력된 증상과 과거 RO를 바탕으로 추천 작업 라인을 제안합니다.

예시

- Brake noise → brake inspection / pad thickness check / rotor condition check
- Check engine → scan DTC / battery voltage check / charging system check

중요한 점은 **자동 추가보다 추천 우선**입니다.

UI

```
AI Suggested Lines
+ Brake Inspection
+ Pad Thickness Measure
+ Rotor Surface Check
```

---

## AI 3. Dynamic Time Prediction

각 line의 예상 소요시간을 정적으로 두지 않고 동적으로 예측합니다.

입력

- 차량
- 주행거리
- op code
- tech productivity
- 과거 유사 작업

출력

- predicted labor time
- confidence
- promise time risk

---

## AI 4. Warranty / Pay Type Assist

작업 라인별로 어떤 청구 타입이 가능성이 높은지 추천합니다.

예시

- recall candidate
- warranty likely
- goodwill consideration
- customer pay default

이 기능은 실제로 RO 작성 시간을 많이 줄일 수 있습니다.

---

## AI 5. Approval Package Builder

추가 정비 항목을 고객 입장에서 이해되게 묶어줍니다.

예시

```
Safety related
- Front brake pad replacement
- Rotor resurfacing

Optional future
- Cabin filter replacement
```

단순 line 나열보다 승인율이 높아집니다.

---

## AI 6. Estimate Explanation Generator

고객에게 보여줄 설명 문구를 자동 생성합니다.

예시

- 왜 이 작업이 필요한지
- 지금 하지 않을 경우 어떤 리스크가 있는지
- 가격 구성은 어떻게 되는지

---

## AI 7. Parts Risk Detection

현재 RO에서 부품 이슈로 막힐 라인을 미리 찾아냅니다.

예시

- 현재 재고 없음
- ETA 불명확
- 오늘 완료 위험
- 대체부품 필요 가능성

---

## AI 8. Repeat Repair / CSI Risk Detection

과거 같은 증상/같은 부품/같은 수리가 반복되면 경고합니다.

예시

```
AI Alert
Similar brake complaint found in prior 2 visits within 90 days
```

이건 고객 불만과 재작업 리스크를 크게 줄여줍니다.

---

## AI 9. Next Best Action

현재 시점에서 RO 담당자가 무엇을 해야 하는지 추천합니다.

예시

- Send approval now
- Call customer before parts order
- Ask dispatcher to reassign
- Update promise time
- Prepare delivery

---

## AI 10. RO Summary Generator

긴 RO 맥락을 3~5줄로 요약합니다.

사용처

- Advisor handoff
- Manager escalation
- Delivery explanation
- Next visit reference

예시

```
Customer reports low-speed brake squeal.
Initial inspection found front pads below threshold.
Pad replacement and rotor resurfacing recommended.
Approval sent, no response for 22 minutes.
Parts ETA 2:30 PM.
```

---

## 13. 추천 KPI / 상태 지표

RO Workspace 안에서 보여줄 핵심 지표

- Current Status
- Promise Time Risk
- Approval Aging
- Parts Blocking Count
- Technician Progress
- Customer Pay Total
- Warranty Amount
- Repeat Complaint Flag

---

## 14. 화면 카피 샘플

### Header

- Repair Order Workspace
- Promise Time
- Approval Pending
- Parts Hold
- Customer Pay Total

### Concern

- Customer Concern
- Symptom Details
- Advisor Notes

### Operations

- Operation Lines
- Add Line
- Assign Tech
- Edit Pay Type

### Right Panel

- Vehicle History
- MPI Results
- Parts Status
- AI Suggestions

### AI

- Suggested Lines
- Delay Risk
- Next Best Action
- Summary Draft

---

## 15. 구현 프롬프트 초안

```
Dealer365 Repair Order Workspace를 설계한다. 이 화면은 전통적인 DMS 폼이 아니라 Service 운영의 핵심 작업공간이다. 상단에는 RO 번호, 상태, 고객, 차량, 약속시간, Advisor, Technician, 승인 상태, 부품 상태, 총액을 sticky header로 배치한다. 메인 영역은 Customer Concern, Operation Line Grid, Estimate Summary, Approval Blocks로 구성한다. 우측 컨텍스트 패널에는 Vehicle History, MPI/VHC, Parts Status, Warranty Context, Communication Log, AI Copilot을 제공한다. 각 operation line은 op code, 설명, pay type, labor, parts, fee, 상태, 승인, tech 정보를 가진다. Promise time risk, waiting customer, no-response approval, parts backorder, repeat complaint는 우선 강조한다. AI는 concern 구조화, 추천 작업 라인, 시간 예측, pay type 추천, 승인 패키지 구성, next best action, RO summary를 제공한다. 전체 UX는 dense하지만 명확하고, 키보드/현장 운영/다크모드/대형 테이블 가독성을 고려한다.
```

---

# Advanced Insight

RO Workspace는 Dealer365 Service의 **심장**입니다.

이 화면이 약하면 Dispatch, MPI, Parts, Delivery가 모두 느슨해집니다.

기존 DMS의 RO 화면이 답답했던 이유는 대체로 같습니다.

- 폼 입력 중심
- line 관계가 복잡함
- 상태 흐름이 안 보임
- 승인/부품/이력이 분리됨
- 고객 커뮤니케이션과 연결이 약함

Dealer365는 반대로 가야 합니다.

### 추천 포지셔닝

- 기존: Repair Order Entry
- 개선: Repair Order Workspace
- 최종: RO Orchestration Hub

### 핵심 차별화 포인트

1. Line-item 중심 구조
2. 상태/비용/약속시간 동시 가시화
3. Approval / Parts / MPI / Dispatch와 실시간 연결
4. AI가 입력 보조가 아니라 판단 보조까지 수행
5. 고객 설명과 내부 실행이 하나의 흐름으로 이어짐

즉, 이 화면은 단순한 “RO 작성 화면”이 아니라

**고객 요구를 실제 서비스 작업과 수익으로 변환하는 오퍼레이션 허브**여야 합니다.