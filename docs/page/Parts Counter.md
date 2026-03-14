```
Dealer365 Parts Counter Workspace UI를 설계한다.
이 화면은 서비스 작업에 필요한 부품을 처리하는 운영 인터페이스다.
좌측에는 Parts Request Queue, 중앙에는 Part Lookup, 우측에는 Inventory Detail을 표시한다.
부품 검색은 part number, VIN, description, barcode 기반으로 가능하다.
재고 상태와 bin 위치를 표시하며 Issue, Reserve, Backorder, Order 기능을 제공한다.
AI 기능으로는 대체 부품 추천, 재고 부족 예측, 자동 발주 기능을 제공한다.
```

Parts Counter는 단순 재고 조회 화면이 아닙니다.

미국 딜러십에서 Parts Counter는 **Service + Parts + Technician + Inventory를 연결하는 운영 허브**입니다.

즉 이 화면은 다음 흐름의 중심입니다.

```
Repair Order
      ↓
Technician Workbench
      ↓
Parts Request
      ↓
Parts Counter
      ↓
Inventory / Order
      ↓
RO Update
```

Dealer365에서는 이 화면을 다음처럼 정의하는 것이 적합합니다.

**Parts Counter = Service Parts Fulfillment Workspace**

---

# Detailed Solution

# 1. 화면 정의

### 목적

RO 작업에 필요한 부품을 **조회 → 예약 → 출고 → 백오더 → 재주문**까지 처리하는 작업 화면입니다.

### 주요 사용자

Primary

- Parts Counter Staff

Secondary

- Service Advisor
- Technician
- Parts Manager

### 핵심 질문

Parts Counter 화면은 다음 질문에 답해야 합니다.

- 이 RO에 어떤 부품이 필요한가
- 재고가 있는가
- 어떤 위치에 있는가
- 지금 바로 출고 가능한가
- 주문이 필요한가
- 다른 RO에서 예약된 부품인가
- 대체 부품이 있는가

---

# 2. 실제 딜러십 Workflow

## A. Parts Request 발생

Parts 요청은 보통 두 곳에서 발생합니다.

### Technician

```
Technician Workbench
→ Parts Request
```

예

```
Front Brake Pad Kit 필요
```

---

### Service Advisor

```
RO Workspace
→ Estimate Parts
```

예

```
Brake pad replacement
```

---

## B. Parts Counter 확인

Parts Counter Staff는 다음 작업을 합니다.

```
Part lookup
Inventory check
Location 확인
Reservation
Issue
```

---

## C. Parts Issue

재고가 있으면

```
Pick
Issue to RO
```

---

## D. Backorder / Order

재고가 없으면

```
Backorder
Vendor order
ETA 확인
```

---

## E. RO 업데이트

Parts 상태가 RO에 반영됩니다.

예

```
Parts Ready
Waiting Parts
Backorder
```

---

# 3. Dealer365 IA

### 1뎁스

Service

### 2뎁스

Parts

### 3뎁스

```
Parts Counter
Inventory Lookup
Parts Orders
Backorders
Vendor Management
Parts History
```

하지만 실제 운영에서는 아래가 핵심입니다.

```
Parts Counter Workspace
```

---

# 4. 화면 패턴

Pattern ID

**PT-SVC-PART-001 — Parts Counter Workspace**

구조

```
Parts Request Queue
Part Lookup
Inventory Detail
Issue Panel
Order / Backorder Panel
```

---

# 5. 화면 레이아웃

## 상단 Header

```
Search part number
Search RO
Search VIN
```

---

## 좌측

### Parts Request Queue

예

```
RO 10425
Brake Pad Kit
Requested by Tech 22
Priority
```

---

## 중앙

### Part Lookup

예

```
Part Number
Description
Price
Availability
```

---

## 우측

### Inventory Detail

```
On hand
Reserved
Available
Location
Bin
```

---

## 하단

### Action Panel

```
Reserve
Issue
Backorder
Order
Substitute
```

---

# 6. 주요 컴포넌트

## 1️⃣ Parts Request Card

```
RO
Part needed
Technician
Priority
```

---

## 2️⃣ Part Lookup Field

검색 기준

```
Part number
VIN
Description
Barcode
```

---

## 3️⃣ Inventory Status Badge

```
In Stock
Low Stock
Reserved
Backorder
```

---

## 4️⃣ Bin Location Card

```
Warehouse
Shelf
Bin
```

예

```
A2-14-B
```

---

## 5️⃣ Issue Button

부품 출고

```
Issue to RO
```

---

## 6️⃣ Backorder Panel

```
Vendor
Order date
ETA
```

---

## 7️⃣ Substitute Recommendation

대체 부품 추천

---

# 7. 데이터 모델

## Part

```
{
  "partNumber":"58101-ABC12",
  "description":"Front Brake Pad Kit",
  "category":"Brake",
  "price":260
}
```

---

## Inventory

```
{
  "partNumber":"58101-ABC12",
  "onHand":6,
  "reserved":2,
  "available":4,
  "location":"A2-14-B"
}
```

---

## PartsRequest

```
{
  "requestId":"REQ-991",
  "roId":"RO-240313-0182",
  "partNumber":"58101-ABC12",
  "requestedBy":"TECH-22",
  "status":"REQUESTED"
}
```

---

## PartsIssue

```
{
  "issueId":"ISS-881",
  "partNumber":"58101-ABC12",
  "roId":"RO-240313-0182",
  "qty":1,
  "issuedAt":"2026-03-13T11:00:00Z"
}
```

---

# 8. 상태 모델

## Parts Request

```
Requested
Approved
Issued
Backordered
Cancelled
```

---

## Inventory

```
Available
Reserved
Low stock
Out of stock
```

---

## Order

```
Ordered
Shipped
Received
Cancelled
```

---

# 9. UI 설계 원칙

Parts Counter UI는 **속도 중심**입니다.

---

## 1️⃣ 키보드 중심

Parts staff는 빠른 입력이 필요합니다.

```
Enter
Tab
Barcode scan
```

---

## 2️⃣ 검색 속도

검색은 매우 빠르게 동작해야 합니다.

---

## 3️⃣ 상태 가시화

재고 상태는 한눈에 보여야 합니다.

---

## 4️⃣ RO 연동

Parts Counter는 항상 RO와 연결됩니다.

---

## 5️⃣ Bin 위치 표시

Warehouse 구조가 명확해야 합니다.

---

# 10. Parts Counter AI

AI는 Parts Counter에서도 유용합니다.

---

## AI 1. Part Suggestion

RO 작업 기반 부품 추천

---

## AI 2. Substitute Detection

대체 부품 추천

---

## AI 3. Inventory Prediction

재고 부족 예측

---

## AI 4. Auto Reorder

자동 발주

---

## AI 5. Parts Demand Forecast

서비스 작업 기반 수요 예측

---

## AI 6. Vendor ETA Prediction

배송 지연 예측

---

## AI 7. Pick Path Optimization

창고 이동 경로 최적화

---

## AI 8. Parts Fraud Detection

재고 이상 탐지

---

# 11. KPI

Parts Counter KPI

```
Parts fill rate
Backorder rate
Inventory turnover
Average pick time
Lost sales
```

---

# 12. 구현 프롬프트

```
Dealer365 Parts Counter Workspace UI를 설계한다.
이 화면은 서비스 작업에 필요한 부품을 처리하는 운영 인터페이스다.
좌측에는 Parts Request Queue, 중앙에는 Part Lookup, 우측에는 Inventory Detail을 표시한다.
부품 검색은 part number, VIN, description, barcode 기반으로 가능하다.
재고 상태와 bin 위치를 표시하며 Issue, Reserve, Backorder, Order 기능을 제공한다.
AI 기능으로는 대체 부품 추천, 재고 부족 예측, 자동 발주 기능을 제공한다.
```

---

# Advanced Insight

Parts Counter는 **Service 효율을 결정하는 숨겨진 핵심 시스템**입니다.

많은 딜러십에서 발생하는 문제는 다음과 같습니다.

```
Technician waiting parts
Parts staff searching inventory
Wrong parts ordered
```

Dealer365에서는 다음 구조가 이상적입니다.

```
RO Workspace
        ↓
Technician Workbench
        ↓
Parts Request
        ↓
Parts Counter
        ↓
Inventory / Vendor
```

즉 **Parts Counter는 Service 생산라인의 공급망 시스템**입니다.

---

# 현재 진행 상황