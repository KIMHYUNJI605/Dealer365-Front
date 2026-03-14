# Executive Summary

Service Lane Check-in은 **예약(Appointment)을 실제 서비스 작업(RO)으로 전환하는 화면**입니다.

미국 딜러십에서는 고객이 도착했을 때 **Service Lane Advisor 또는 Service Receptionist가 태블릿으로 체크인**을 진행합니다.

흐름:

```
Appointment
   ↓
Customer Arrival
   ↓
Check-in
   ↓
Repair Order Draft
```

---

# 실제 딜러십 Workflow

### 1. 고객 도착

```
Customer arrives
Advisor opens Lane Check-in
```

---

### 2. 예약 조회

검색 기준

```
phone
name
appointment
VIN
plate
```

---

### 3. 차량 확인

```
VIN scan
Mileage capture
Vehicle condition walk-around
```

---

### 4. 고객 Concern 확인

```
Appointment concern
Customer statement
Additional notes
```

---

### 5. Walk-around Inspection

보통 포함되는 항목

```
tire
body damage
warning lights
fuel level
```

---

### 6. 고객 서명

```
Digital signature
Estimate authorization
```

---

### 7. RO 생성

```
Create RO
Assign Advisor
Send to Dispatch
```

---

# IA

```
Service
 ├ Lane Check-in
 │   ├ Arrival Queue
 │   ├ Customer Lookup
 │   ├ Vehicle Check
 │   ├ Walk-around
 │   └ Create RO
```

---

# 화면 패턴

Pattern ID

```
PT-SVC-CHK-001
Service Lane Check-in Workspace
```

구조

```
Arrival Queue
Customer Lookup
Vehicle Confirmation
Concern Panel
Walk-around
Signature Panel
Create RO
```

---

# 주요 컴포넌트

### Arrival Queue Card

```
Customer
Vehicle
Appointment time
Visit type
```

---

### Customer Lookup

```
Phone
Name
VIN
Plate
```

---

### Vehicle Walk-around Panel

```
Body damage capture
Tire condition
Fuel level
Photos
```

---

### Concern Confirmation

```
Appointment concern
Customer description
Advisor notes
```

---

### Signature Panel

```
Estimate authorization
Digital signature
```

---

# 데이터 모델

### CheckinSession

```
{
  "checkinId":"CHK-2201",
  "appointmentId":"APT-8821",
  "customerId":"CUST-101",
  "vehicleId":"VIN-882",
  "mileage":42110,
  "advisorId":"ADV-21",
  "status":"IN_PROGRESS"
}
```

---

### WalkaroundItem

```
{
  "checkinId":"CHK-2201",
  "item":"FRONT_BUMPER",
  "condition":"SCRATCH",
  "photoUrl":"/media/walkaround1.jpg"
}
```

---

# UI 설계

핵심 특징

```
Tablet first
Large touch targets
Minimal typing
Camera heavy UI
```

화면 구조

```
Header: Customer / Vehicle
Left: Arrival Queue
Center: Check-in workflow
Right: Vehicle summary
Bottom: Create RO
```

---

# 구현 프롬프트 초안

```
Dealer365 Service Lane Check-in UI를 설계한다.
이 화면은 고객이 서비스 레인에 도착했을 때 태블릿으로 체크인을 수행하는 인터페이스다.
좌측에는 Arrival Queue, 중앙에는 고객 조회와 차량 확인,
Walk-around inspection과 Concern 확인을 제공한다.
VIN 스캔, 사진 촬영, 디지털 서명을 지원하며
체크인 완료 시 Repair Order를 생성한다.
터치 중심 UI와 최소 입력을 적용한다.
```