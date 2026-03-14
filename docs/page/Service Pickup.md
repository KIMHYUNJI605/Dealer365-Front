# Executive Summary

이 화면은 **서비스 완료 후 고객 결제 및 차량 인도**를 처리합니다.

흐름:

```
RO Completed
   ↓
Pickup Queue
   ↓
Invoice
   ↓
Payment
   ↓
Close RO
```

---

# 실제 딜러십 Workflow

### 1. Ready for Pickup

RO 상태

```
Ready
```

---

### 2. 고객 도착

Pickup Queue에서 확인

---

### 3. Invoice Review

```
Labor
Parts
Tax
Fees
Warranty split
```

---

### 4. 결제

```
Credit card
Cash
Online payment
```

---

### 5. 차량 인도

```
Service explanation
Receipt
Close RO
```

---

# IA

```
Service
 ├ Pickup / Cashier
 │   ├ Pickup Queue
 │   ├ Invoice Detail
 │   ├ Payment
 │   └ Close RO
```

---

# 화면 패턴

```
PT-SVC-CSH-001
Service Cashier Workspace
```

구조

```
Pickup Queue
Invoice Panel
Payment Panel
Receipt
Close RO
```

---

# 주요 컴포넌트

### Pickup Queue

```
RO
Customer
Vehicle
Ready time
```

---

### Invoice Panel

```
Labor
Parts
Fees
Tax
Total
```

---

### Payment Panel

```
Card
Cash
Online link
```

---

# 데이터 모델

### Invoice

```
{
  "invoiceId":"INV-881",
  "roId":"RO-221",
  "laborTotal":350,
  "partsTotal":280,
  "tax":42,
  "total":672
}
```

---

### Payment

```
{
  "paymentId":"PAY-100",
  "invoiceId":"INV-881",
  "method":"CARD",
  "amount":672,
  "status":"PAID"
}
```

---

# UI 설계

```
Header: Customer / Vehicle
Left: Pickup Queue
Center: Invoice
Right: Payment
Footer: Close RO
```

---

# 구현 프롬프트

```
Dealer365 Service Pickup/Cashier UI를 설계한다.
좌측에는 Ready for Pickup 차량 목록을 표시하고,
중앙에는 Invoice 상세를 표시한다.
우측에는 결제 패널을 배치하여 카드, 현금, 온라인 결제를 처리한다.
결제 완료 후 RO를 Close 처리한다.
```