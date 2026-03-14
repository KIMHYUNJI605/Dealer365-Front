```
Dealer365 Vehicle Inventory Workspace를 설계한다. 이 화면은 차량 재고를 단순 목록이 아니라 판매 가능성과 운영 상태까지 함께 관리하는 딜러십 재고 운영 인터페이스다. 상단에는 검색, saved views, incoming toggle, grid/list toggle을 배치한다. 좌측에는 faceted filters를 두고 New/Used/CPO, status, price, mileage, days in stock, location, listing readiness를 필터링한다. 중앙에는 stock grid를 배치하고 stock no, VIN, vehicle, condition, status, price, days in stock, location, merchandising readiness, hold/deal 상태를 보여준다. 우측 상세 패널에는 vehicle summary, pricing, location, merchandising checklist, linked leads/deals, quick actions를 표시한다. quick actions는 Hold, Release, Update Price, Create Deal, Assign to Lead, Move Location을 포함한다. AI는 lead-to-unit recommendation, price optimization, aging risk detection, listing quality check, best next action, incoming demand matching을 제공한다. 전체 UX는 빠른 검색과 운영 상태 가시화가 핵심이며 Sales와 Deal Desk 연결성을 강하게 보여줘야 한다.
```

# Executive Summary

이제 마지막 남은 핵심 화면인 **🔟 Inventory (Vehicle Inventory Management)**를 **Dealer365 기준**으로 정리하겠습니다.

Inventory는 단순히 “차량 재고 목록”이 아닙니다.

미국 딜러십에서 Inventory 화면은 **Sales, Merchandising, Pricing, Vehicle Ops, Deal Desk**를 연결하는 운영 허브입니다.

즉 이 화면은 아래를 동시에 담당합니다.

- 현재 판매 가능한 차량 관리
- 입고 예정 차량 관리
- 차량 상태 / 위치 / 준비 상태 추적
- 가격 / 할인 / 온라인 노출 관리
- Lead / Deal Desk와의 연결
- Aging / Turn / Gross 관점의 재고 운영

Dealer365에서는 이 화면을 다음처럼 정의하는 것이 적합합니다.

**Inventory = Vehicle Stock Control + Merchandising Workspace + Sales Availability Engine**

---

# Detailed Solution

## 1. 화면 정의

### 목적

딜러십이 보유하거나 곧 입고될 차량을 한 곳에서 관리하고,

판매 가능한 상태로 운영하며,

Lead / Opportunity / Deal Desk에서 즉시 활용할 수 있도록 만드는 것입니다.

### 주요 사용자

- Primary: Inventory Manager, Sales Manager
- Secondary: Salesperson, BDC, Merchandising 담당자, General Manager

### 핵심 질문

이 화면은 아래 질문에 답해야 합니다.

- 지금 판매 가능한 차량은 무엇인가
- 어떤 차량이 입고 예정인가
- 어떤 차량이 홀드/예약/판매완료 상태인가
- 차량은 현재 어디에 있는가
- 사진/옵션/가격 정보가 준비되었는가
- 오래된 재고는 무엇인가
- 어떤 차량을 우선 팔아야 하는가
- 이 차량을 Deal Desk에 바로 넣을 수 있는가

---

## 2. 실제 딜러십 Workflow

## A. 재고 유입

1. OEM allocation / incoming vehicle 수신
2. VIN 생성 또는 입고 정보 반영
3. ETA / transport 상태 추적
4. 딜러 재고에 등록

---

## B. 차량 준비

1. 차량 입고
2. PDI / 세차 / 사진촬영 / 옵션 확인
3. 스티커 / 가격 / 설명 / 온라인 노출 준비
4. 판매 가능 상태 전환

---

## C. 판매 운영

1. Salesperson이 재고 검색
2. 고객 조건에 맞는 차량 조회
3. Lead / Opportunity에 차량 연결
4. Deal Desk로 전달

---

## D. 예약 / 홀드 / 판매

1. 특정 고객에게 hold
2. deal 진행 중 상태 변경
3. sold / delivered 처리
4. 재고 차감

---

## E. 재고 관리

1. aging 추적
2. 가격 조정
3. low interest unit 식별
4. lot location 재배치
5. 온라인 listing 상태 관리

즉 Inventory는 **판매용 카탈로그**가 아니라 **실제 차량 운영 시스템**입니다.

---

## 3. Dealer365 기준 IA

### 1뎁스

**Sales**

### 2뎁스

**Inventory**

### 3뎁스 제안

- Inventory List
- Inventory Detail
- Incoming Units
- Pricing & Merchandising
- Holds / Reserved
- Aging View
- Lot Management

MVP 기준 권장 구조는 아래입니다.

- Inventory
    - Inventory List
    - Vehicle Detail
    - Incoming
    - Holds / Reserved

---

## 4. 화면 패턴

Pattern ID 제안:

**PT-SLS-INV-001 — Vehicle Inventory Workspace**

이 패턴은

**Search + Faceted Filter + Stock Grid + Vehicle Detail + Status Actions** 구조가 가장 적합합니다.

세부 패턴은 3개입니다.

### 패턴 A. Inventory Explorer

재고를 탐색하고 필터링하는 리스트 화면

### 패턴 B. Vehicle Detail Workspace

개별 차량의 상세 상태를 보는 화면

### 패턴 C. Inventory Ops Console

상태 변경, 가격 변경, 홀드, 온라인 게시 상태를 다루는 운영 패널

---

## 5. 화면 레이아웃

## 상단 Header

- 빠른 검색
- 저장된 필터
- 새 입고 등록
- Incoming toggle
- Grid / List toggle

## 좌측 Filter Rail

- New / Used / CPO
- Make / Model / Trim
- Body type
- Color
- Price range
- Mileage
- Status
- Location
- Days in stock
- Online listed 여부

---

## 중앙 Main Grid

재고 목록 그리드

표시 컬럼 예

- Stock No
- VIN
- Year / Make / Model / Trim
- Exterior / Interior
- MSRP / Asking price
- Status
- Days in stock
- Location
- Photos status
- Online listing
- Hold / Reserved status

---

## 우측 Detail Panel 또는 상세 화면

선택 차량의 상세

- vehicle summary
- equipment / options
- pricing
- age / turn
- location
- merchandising status
- linked leads / deals
- action buttons

---

## 하단 Ops Rail 또는 Quick Actions

- Hold
- Release
- Mark ready
- Update price
- Push to listing
- Create deal
- Assign to lead

---

## 6. 주요 화면 패널 정의

## 6-1. Inventory List Grid

핵심 컬럼

- Stock #
- VIN
- Vehicle
- Condition
- Status
- Price
- Days in stock
- Lot / location
- Merchandising readiness
- Assigned hold / deal

예시

```
STK-4421 | KMH...234 | 2024 Tucson Limited | New | Available | $34,995 | 18 days | Front Lot B3 | Photos Ready | None
```

---

## 6-2. Vehicle Summary Card

구성

- 대표 이미지
- Year / Make / Model / Trim
- VIN
- Stock No
- Odometer
- Color
- Package / drivetrain
- certification 여부

---

## 6-3. Pricing Panel

표시

- MSRP
- Internet Price
- Dealer Discount
- Pack / cost
- Suggested list price
- Current advertised price
- price change history

이 패널은 Deal Desk와 강하게 연결됩니다.

---

## 6-4. Vehicle Status Panel

상태 예시

- Incoming
- At port
- In transit
- On lot
- Recon
- Photo pending
- Ready for sale
- Hold
- Reserved
- In deal
- Sold
- Delivered

---

## 6-5. Location Panel

구성

- lot
- row
- spot
- showroom
- service
- detail / photo bay

예시

```
Location: Front Lot · Row B · Spot 3
```

---

## 6-6. Merchandising Panel

구성

- photo complete
- description complete
- window sticker available
- online listed
- OEM site synced
- third-party listing synced

---

## 6-7. Linked Activity Panel

이 차량과 연결된 영업 활동

예시

- linked leads 3
- active opportunity 1
- quote created 2
- current deal 1

---

## 7. 컴포넌트 정의

## 1) Inventory Search Bar

검색 기준

- Stock No
- VIN
- Year / Model
- keyword
- exact VIN partial match

---

## 2) Faceted Filter Panel

멀티 필터 조합

예

- New / Used / CPO
- price
- mileage
- status
- age bucket

---

## 3) Vehicle Inventory Card / Row

차량 하나의 요약 정보 카드

---

## 4) Status Chip

예

- Available
- Hold
- Ready
- Incoming
- Sold

---

## 5) Aging Badge

예

- 0–15 days
- 16–30 days
- 31–60 days
- 60+ days

---

## 6) Merchandising Readiness Checklist

예

- Photos
- Description
- Pricing
- Listing
- Sticker

---

## 7) Quick Action Bar

예

- Hold Unit
- Release Hold
- Create Opportunity
- Start Deal
- Update Price
- Move Location

---

## 8. 데이터 모델

## VehicleInventory

```
{
  "inventoryId":"INV-20260313-04421",
  "stockNo":"STK-4421",
  "vin":"5NPEB4AC8KH123456",
  "year":2024,
  "make":"Hyundai",
  "model":"Tucson",
  "trim":"Limited",
  "condition":"NEW",
  "status":"AVAILABLE",
  "odometer":18,
  "exteriorColor":"Amazon Gray",
  "interiorColor":"Black",
  "drivetrain":"AWD",
  "msrp":36995,
  "internetPrice":34995,
  "daysInStock":18,
  "locationCode":"FRONT-B-03"
}
```

---

## IncomingVehicle

```
{
  "incomingId":"INC-8831",
  "vin":"5NPEB4AC8KH987654",
  "etaDate":"2026-03-20",
  "transportStatus":"IN_TRANSIT",
  "allocatedStoreId":"STORE-01",
  "preSold":false
}
```

---

## VehicleHold

```
{
  "holdId":"HLD-3001",
  "inventoryId":"INV-20260313-04421",
  "customerId":"CUST-1020",
  "opportunityId":"OPP-2201",
  "status":"ACTIVE",
  "heldBy":"SP-12",
  "heldAt":"2026-03-13T14:10:00Z",
  "expiresAt":"2026-03-14T14:10:00Z"
}
```

---

## VehiclePricing

```
{
  "inventoryId":"INV-20260313-04421",
  "msrp":36995,
  "dealerCost":33200,
  "internetPrice":34995,
  "dealerDiscount":2000,
  "packAmount":495
}
```

---

## MerchandisingStatus

```
{
  "inventoryId":"INV-20260313-04421",
  "photosReady":true,
  "descriptionReady":true,
  "windowStickerReady":true,
  "onlineListed":true,
  "thirdPartySynced":false
}
```

---

## 9. 상태 모델

## 차량 상태

- Incoming
- In Transit
- On Lot
- Recon
- Photo Pending
- Ready for Sale
- Hold
- Reserved
- In Deal
- Sold
- Delivered
- Wholesale / Exit

---

## 판매 가능 상태

- Available
- Limited Availability
- Not Sale Ready
- Customer Hold
- Deal Pending
- Unavailable

---

## 머천다이징 상태

- Not Started
- In Progress
- Ready
- Published
- Sync Error

이 상태값은 Inventory 화면에서 항상 드러나야 합니다.

숨겨진 텍스트보다 **칩 / 배지 / 체크리스트** 형태가 적합합니다.

---

## 10. UI 설계 원칙

## 1) 검색과 필터가 가장 중요

Inventory 화면은 사용자가 원하는 차량을 **3~10초 안에 찾게 해줘야** 합니다.

따라서

- 검색 속도
- 필터 정확성
- 저장된 뷰
    
    가 매우 중요합니다.
    

---

## 2) 상태와 판매 가능성이 한눈에 보여야 함

차량이 존재한다고 바로 팔 수 있는 것이 아닙니다.

반드시 같이 보여야 하는 정보

- Available 여부
- recon 상태
- photos status
- hold 여부
- active deal 여부

---

## 3) 리스트와 상세가 자연스럽게 이어져야 함

Salesperson은 빠르게 찾고 싶고, Manager는 상세 운영 상태를 보고 싶습니다.

그래서 list → side panel 또는 detail drawer 구조가 유리합니다.

---

## 4) Aging / Gross 관점이 보여야 함

재고는 단순 catalog가 아닙니다.

Days in stock, price position, exit risk가 중요합니다.

---

## 5) Deal Desk / Lead와 강하게 연결

Inventory는 독립 모듈이 아니라

- Lead에 추천 차량 연결
- Opportunity에 unit 지정
- Deal Desk에 즉시 반영
    
    이 되어야 합니다.
    

---

## 11. Inventory AI

이 화면도 AI 자동화 효과가 큽니다.

## AI 1. Vehicle Recommendation for Lead

Lead 성향 / 예산 / 관심 차종 기반으로 적합 차량 추천

예

```
Best Fit Units
- 2024 Tucson Limited · Stock 4421
- 2024 Sportage EX · Stock 3902
```

---

## AI 2. Price Optimization

시장 / aging / 유사 재고를 바탕으로 가격 조정 추천

출력 예

- Reduce internet price by $300
- Hold current price
- Promote due to low VDP views

---

## AI 3. Aging Risk Detection

오래된 재고 중 판매 위험 차량 탐지

예

```
Aging Risk: High
62 days in stock
Low lead engagement
No active deal
```

---

## AI 4. Listing Quality Check

사진 부족, 설명 미흡, 스티커 누락 등 자동 탐지

---

## AI 5. Best Next Action

차량별 다음 액션 추천

예

- move to front line
- lower price
- assign to hot lead
- retake photos
- mark exit candidate

## AI 6. Incoming Demand Matching

입고 예정 차량을 기존 Lead / 예약 고객과 매칭

---

## AI 7. Hold Expiry Management

만료 예정 홀드를 자동 알림 및 재배정 추천

---

## AI 8. Deal Probability by Unit

특정 차량이 실제 거래로 이어질 가능성 예측

---

## 12. KPI 제안

### 운영 KPI

- Units Available
- Incoming Units
- Holds / Reserved
- Not Sale Ready Count
- Average Days in Stock

### 판매 KPI

- Inventory Turn
- Sell-through Rate
- Lead-to-Unit Match Rate
- Deal Conversion by Unit

### 머천다이징 KPI

- Photo Completion Rate
- Listing Publish Rate
- Average Time to Sale Ready

### 수익 KPI

- Gross by Unit
- Aging Loss Risk
- Price Change Effectiveness

---

## 13. 화면 카피 샘플

### Header

- Vehicle Inventory
- Incoming Units
- Holds
- Sale Ready
- Saved Views

### Filters

- New / Used / CPO
- Status
- Days in Stock
- Price Range
- Location

### Grid

- Available
- Hold
- In Deal
- Recon
- Online Ready

### Detail Panel

- Vehicle Summary
- Pricing
- Merchandising
- Linked Leads
- Actions

### Actions

- Hold Unit
- Release Hold
- Update Price
- Create Deal
- Assign to Lead
- Move Location

---

## 14. 구현 프롬프트 초안

```
Dealer365 Vehicle Inventory Workspace를 설계한다. 이 화면은 차량 재고를 단순 목록이 아니라 판매 가능성과 운영 상태까지 함께 관리하는 딜러십 재고 운영 인터페이스다. 상단에는 검색, saved views, incoming toggle, grid/list toggle을 배치한다. 좌측에는 faceted filters를 두고 New/Used/CPO, status, price, mileage, days in stock, location, listing readiness를 필터링한다. 중앙에는 stock grid를 배치하고 stock no, VIN, vehicle, condition, status, price, days in stock, location, merchandising readiness, hold/deal 상태를 보여준다. 우측 상세 패널에는 vehicle summary, pricing, location, merchandising checklist, linked leads/deals, quick actions를 표시한다. quick actions는 Hold, Release, Update Price, Create Deal, Assign to Lead, Move Location을 포함한다. AI는 lead-to-unit recommendation, price optimization, aging risk detection, listing quality check, best next action, incoming demand matching을 제공한다. 전체 UX는 빠른 검색과 운영 상태 가시화가 핵심이며 Sales와 Deal Desk 연결성을 강하게 보여줘야 한다.
```

---