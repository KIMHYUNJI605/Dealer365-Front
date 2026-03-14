자동차 딜러십 시스템에서 이 화면은 **가장 복잡하고 가장 중요한 Sales UI**입니다.

실제로 Deal Desk는 판매 과정에서 **가격 구조, 금융, 트레이드인, 세금, F&I 상품, 딜러 마진**을 모두 계산하는 **판매 거래 엔진**입니다.

Dealer365에서는 이 화면을 다음처럼 정의하는 것이 적합합니다.

**Deal Desk = Deal Structuring Engine + Profit Calculator + Approval Workflow**

즉 다음 흐름의 중심입니다.

```
Lead
  ↓
Opportunity
  ↓
Vehicle Selection
  ↓
Deal Desk
  ↓
Finance / F&I
  ↓
Contract
  ↓
Delivery
```

즉 **Lead Management → Deal Desk → Inventory → Delivery**로 이어지는 Sales 파이프라인의 핵심입니다.

---

# Detailed Solution

# 1. 화면 정의

### 목적

차량 판매 거래를 구성하고 다음 요소들을 계산합니다.

- 차량 가격
- 할인
- 트레이드인
- 금융 조건
- 세금
- F&I 상품
- 총 결제 금액
- 딜러 마진

### 주요 사용자

Primary

- Salesperson
- Finance Manager

Secondary

- Sales Manager

### 핵심 질문

Deal Desk 화면은 아래 질문에 답해야 합니다.

- 고객이 구매하려는 차량은 무엇인가
- 차량 가격은 어떻게 구성되는가
- 트레이드인 차량 가치는 얼마인가
- 금융 조건은 무엇인가
- 고객의 월 납입금은 얼마인가
- 딜러의 마진은 얼마인가
- 이 딜은 승인 가능한가

---

# 2. 실제 딜러십 Workflow

## A. Opportunity 생성

Lead가 Opportunity로 전환됩니다.

예

```
Customer: John Smith
Interested Vehicle: 2024 Tucson
```

---

## B. 차량 선택

딜러 재고에서 차량 선택

```
VIN
Trim
Price
```

---

## C. Deal Structure 생성

가격 구조 생성

```
Vehicle price
Discount
Dealer fee
Accessories
```

---

## D. Trade-in 평가

고객 차량 평가

```
Trade vehicle
Mileage
Condition
Trade value
Payoff
```

---

## E. Financing

금융 조건 계산

```
Down payment
APR
Term
Monthly payment
```

---

## F. F&I Products

추가 상품

```
Extended warranty
GAP insurance
Maintenance plan
```

---

## G. Manager Approval

할인이나 마진이 일정 기준 이하일 경우 승인 필요

---

## H. 계약 생성

Deal → Contract

---

# 3. Dealer365 IA

### 1뎁스

Sales

### 2뎁스

Deals

### 3뎁스

```
Deal Pipeline
Deal Desk
Finance
Contracts
Delivery
```

MVP 기준

```
Deals
 ├ Deal Pipeline
 ├ Deal Desk
 ├ Contract
```

---

# 4. 화면 패턴

Pattern ID

**PT-SLS-DEAL-001 — Deal Desk Workspace**

구조

```
Customer Panel
Vehicle Panel
Trade-in Panel
Finance Panel
Deal Summary
Profit Panel
```

---

# 5. 화면 레이아웃

## 상단 Header

```
Deal ID
Customer
Salesperson
Deal Status
```

---

## 좌측

### Customer Panel

```
Customer name
Phone
Email
Lead source
```

---

## 중앙

### Vehicle Panel

```
Vehicle
VIN
MSRP
Dealer price
```

---

## 중앙 하단

### Trade-in Panel

```
Trade vehicle
Value
Payoff
Equity
```

---

## 우측

### Finance Panel

```
Down payment
APR
Term
Monthly payment
```

---

## 우측 하단

### Deal Summary

```
Vehicle price
Trade value
Taxes
Fees
Total
```

---

## 하단

### Profit Panel

```
Front gross
Back gross
Total profit
```

---

# 6. 주요 컴포넌트

## 1️⃣ Vehicle Selector

재고 차량 선택

---

## 2️⃣ Price Structure Grid

```
MSRP
Dealer discount
Dealer fee
Accessories
```

---

## 3️⃣ Trade-in Evaluator

```
Vehicle
Mileage
Condition
Value
```

---

## 4️⃣ Finance Calculator

```
APR
Term
Monthly payment
```

---

## 5️⃣ F&I Product Selector

```
Warranty
GAP
Maintenance
```

---

## 6️⃣ Deal Summary Card

```
Total price
Monthly payment
Cash due
```

---

## 7️⃣ Profit Calculator

```
Front gross
Back gross
Dealer net
```

---

# 7. 데이터 모델

## Deal

```
{
  "dealId":"DEAL-001",
  "customerId":"C-100",
  "vehicleId":"VIN-883",
  "status":"STRUCTURING",
  "salespersonId":"SP-12"
}
```

---

## DealPrice

```
{
  "dealId":"DEAL-001",
  "msrp":35000,
  "discount":1500,
  "dealerFee":399
}
```

---

## TradeIn

```
{
  "dealId":"DEAL-001",
  "vehicle":"2018 Sonata",
  "value":12000,
  "payoff":9000
}
```

---

## Finance

```
{
  "dealId":"DEAL-001",
  "downPayment":3000,
  "apr":4.9,
  "term":60
}
```

---

## DealProfit

```
{
  "dealId":"DEAL-001",
  "frontGross":1800,
  "backGross":900,
  "totalGross":2700
}
```

---

# 8. 상태 모델

## Deal Status

```
Structuring
Quoted
Negotiation
Approved
Contract
Delivered
Lost
```

---

## Approval Status

```
Not Required
Pending
Approved
Rejected
```

---

# 9. UI 설계 원칙

## 1️⃣ Deal Flow 중심

Deal Desk는 계산기입니다.

---

## 2️⃣ 실시간 계산

가격 변경 시 즉시 계산

---

## 3️⃣ Profit 가시화

딜러 마진은 항상 보여야 합니다.

---

## 4️⃣ Approval Workflow

Manager 승인 필요

---

# 10. Deal Desk AI

AI는 Sales에서도 중요합니다.

---

## AI 1. Price Recommendation

시장 데이터 기반 가격 추천

---

## AI 2. Discount Optimization

할인 최적화

---

## AI 3. Finance Plan Recommendation

금융 옵션 추천

---

## AI 4. F&I Product Recommendation

고객 프로필 기반 추천

---

## AI 5. Deal Close Probability

Deal 성공 확률

---

## AI 6. Trade-in Price Prediction

시장 가격 기반 추천

---

# 11. KPI

Sales KPI

```
Deal close rate
Average deal gross
F&I penetration
Discount rate
Sales cycle length
```

---

# Advanced Insight

Deal Desk는 Dealer365 Sales 시스템의 **핵심 수익 엔진**입니다.

전체 Sales 흐름은 다음과 같습니다.

```
Lead Management
      ↓
Opportunity
      ↓
Deal Desk
      ↓
Finance
      ↓
Contract
      ↓
Delivery
```

즉 Lead Management와 Deal Desk가 **Sales CRM의 중심**입니다.