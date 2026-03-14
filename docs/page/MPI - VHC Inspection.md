```
Dealer365 MPI Inspection Workspace UI를 설계한다.
이 화면은 Technician 태블릿에서 사용하는 디지털 차량 검사 인터페이스다.
좌측에는 검사 카테고리, 중앙에는 검사 항목, 우측에는 사진 및 노트를 표시한다.
각 항목은 Green / Yellow / Red 상태를 빠르게 선택할 수 있어야 한다.
사진 촬영과 측정값 입력을 지원한다.
추천 정비를 생성할 수 있으며 Advisor에게 전달된다.
고객에게 전달되는 디지털 리포트를 자동 생성한다.
AI 기능으로 사진 분석, 문제 탐지, 추천 정비 생성, 고객 설명 생성 기능을 제공한다.
```

# Executive Summary

이제 **4️⃣ MPI / VHC Inspection (Multi-Point Inspection / Vehicle Health Check)**를 **Dealer365 Service Platform 기준**으로 설계합니다.

MPI/VHC는 단순 점검 체크리스트가 아닙니다.

미국 딜러십에서는 다음 세 가지 목적을 동시에 수행합니다.

1. **차량 상태 진단**
2. **추가 정비 기회 발견**
3. **고객 신뢰 확보**

실제 딜러십에서 **추가 매출(upsell)의 60~80%가 MPI에서 발생**합니다.

그래서 최근 서비스 플랫폼들은 MPI를 핵심 기능으로 발전시켰습니다.

대표 플랫폼 예

- Tekion
- Dealer-FX
- Cox Automotive

Dealer365에서는 MPI를 다음처럼 정의하는 것이 좋습니다.

**MPI / VHC = Digital Inspection + Customer Communication + Upsell Engine**

즉

```
Technician → Inspection
AI → Issue detection
Advisor → Approval
Customer → Decision
```

이 흐름을 하나의 시스템으로 연결하는 UI입니다.

---

# Detailed Solution

# 1. 화면 정의

### 목적

Technician이 차량 상태를 검사하고

Advisor가 고객에게 **디지털 리포트 형태로 전달**할 수 있게 하는 시스템입니다.

### 사용자

Primary

- Technician

Secondary

- Service Advisor
- Customer

### 핵심 질문

이 화면은 아래 질문에 답해야 합니다.

- 차량의 현재 상태는 어떤가
- 어떤 항목이 문제가 있는가
- 어떤 항목은 곧 교체가 필요한가
- 고객에게 무엇을 추천해야 하는가
- 고객이 이해할 수 있는 설명인가

---

# 2. 실제 딜러십 Workflow

## A. Inspection 시작

1. Technician 작업 시작
2. MPI 체크리스트 로드
3. 차량 기본 정보 확인

---

## B. 항목별 검사

각 항목을 검사합니다.

예

```
Brake
Tire
Battery
Fluid
Filter
Suspension
Lights
Belts
```

각 항목 상태 입력

```
Green  정상
Yellow 곧 교체
Red    교체 필요
```

---

## C. 사진 / 영상 기록

문제 발견 시

- 사진
- 영상
- 음성

기록

---

## D. 추가 정비 추천

문제 항목 → 추천 작업 생성

예

```
Brake pad replacement
Cabin filter replacement
Battery replacement
```

---

## E. Advisor 전달

MPI 결과 → Advisor Dashboard

---

## F. 고객 승인

고객에게 **디지털 리포트 링크** 전달

고객은

```
Approve
Decline
Ask Question
```

선택

---

# 3. Dealer365 기준 IA

### 1뎁스

Service

### 2뎁스

Inspection

### 3뎁스

- MPI Dashboard
- Inspection Workspace
- Customer View
- Inspection Templates
- Inspection History

실제 UX에서는 다음 구조가 좋습니다.

```
Inspection Workspace
```

내부 탭

- Overview
- Inspection Checklist
- Media
- Recommendations
- Customer Report

---

# 4. 화면 패턴

Pattern ID

**PT-SVC-MPI-001 — Digital Inspection Workspace**

구조

```
Inspection Header
Inspection Grid
Media Capture
Recommendation Builder
Customer Report
```

---

# 5. 화면 레이아웃

MPI 화면은 **Technician Tablet UI** 중심입니다.

## 상단

```
RO
Vehicle
Mileage
Technician
Inspection Progress
```

예

```
MPI Progress
12 / 28 items
```

---

## 좌측

Inspection Category

```
Brakes
Tires
Battery
Fluids
Engine
Suspension
Exterior
Interior
```

---

## 중앙

Inspection Item

예

```
Front Brake Pad Thickness
```

입력

```
Green
Yellow
Red
```

---

## 우측

Media + Notes

---

## 하단

Action

```
Add Recommendation
Add Photo
Next Item
```

---

# 6. 주요 컴포넌트

## 1) Inspection Progress

```
Completed
Remaining
```

---

## 2) Inspection Category List

예

```
Brakes
Tires
Battery
```

---

## 3) Inspection Item Card

예

```
Front Brake Pad Thickness
Status
Green / Yellow / Red
Measurement
mm
```

---

## 4) Media Capture

기능

```
Photo
Video
Voice
```

---

## 5) Measurement Input

예

```
Pad thickness
Tire tread
Battery voltage
```

---

## 6) Recommendation Builder

Technician이 추천 작업 생성

---

## 7) Customer Report Builder

고객에게 전달할 리포트 생성

---

# 7. 데이터 모델

## Inspection

```
{
  "inspectionId":"INS-2233",
  "roId":"RO-240313-0182",
  "vehicleId":"VIN-8892",
  "techId":"TECH-22",
  "startedAt":"2026-03-13T10:20:00Z",
  "status":"IN_PROGRESS"
}
```

---

## InspectionItem

```
{
  "itemId":"ITEM-101",
  "inspectionId":"INS-2233",
  "category":"BRAKES",
  "name":"Front Brake Pad Thickness",
  "status":"RED",
  "measurement":2
}
```

---

## InspectionMedia

```
{
  "mediaId":"MEDIA-883",
  "inspectionId":"INS-2233",
  "itemId":"ITEM-101",
  "type":"PHOTO",
  "url":"/media/brake-pad.jpg"
}
```

---

## InspectionRecommendation

```
{
  "recommendationId":"REC-221",
  "inspectionId":"INS-2233",
  "description":"Front brake pad replacement",
  "laborHours":1.5,
  "partsAmount":260
}
```

---

# 8. 상태 모델

## Inspection 상태

- Not Started
- In Progress
- Completed
- Reviewed
- Sent to Customer

---

## Item 상태

- Green
- Yellow
- Red

---

## Recommendation 상태

- Draft
- Sent
- Approved
- Declined

---

# 9. UI 설계 원칙

MPI 화면은 **단순 체크리스트가 아니라 고객 설득 도구**입니다.

---

## 1️⃣ 사진 중심 UI

텍스트보다 사진이 중요합니다.

---

## 2️⃣ 최소 입력

Technician 입력을 최소화

---

## 3️⃣ 빠른 상태 선택

Green / Yellow / Red

큰 버튼

---

## 4️⃣ 고객 친화적 설명

고객 리포트는 기술 용어 최소화

---

## 5️⃣ Progress 가시화

검사 진행률 표시

---

# 10. MPI AI

MPI는 AI 적용 효과가 매우 큽니다.

---

## AI 1. Image Recognition

사진 분석

예

```
Brake pad thickness
Tire wear
Fluid leak
```

---

## AI 2. Automatic Issue Detection

AI가 문제 탐지

---

## AI 3. Recommendation Generator

문제 → 추천 작업

---

## AI 4. Severity Prediction

문제 심각도 판단

---

## AI 5. Customer Explanation Generator

고객 설명 생성

---

## AI 6. Repair Cost Prediction

예상 비용 계산

---

## AI 7. Upsell Opportunity Detection

추가 정비 기회 탐지

---

## AI 8. Warranty Check

보증 가능성 확인

---

## AI 9. Inspection Quality Check

Technician 검사 품질 평가

---

## AI 10. Historical Pattern Detection

과거 검사 패턴 분석

---

# 11. KPI

MPI 관련 KPI

- Inspection Completion Rate
- Recommendation Acceptance Rate
- Average Upsell Value
- Media Usage Rate
- Inspection Time

---

# 12. 구현 프롬프트

```
Dealer365 MPI Inspection Workspace UI를 설계한다.
이 화면은 Technician 태블릿에서 사용하는 디지털 차량 검사 인터페이스다.
좌측에는 검사 카테고리, 중앙에는 검사 항목, 우측에는 사진 및 노트를 표시한다.
각 항목은 Green / Yellow / Red 상태를 빠르게 선택할 수 있어야 한다.
사진 촬영과 측정값 입력을 지원한다.
추천 정비를 생성할 수 있으며 Advisor에게 전달된다.
고객에게 전달되는 디지털 리포트를 자동 생성한다.
AI 기능으로 사진 분석, 문제 탐지, 추천 정비 생성, 고객 설명 생성 기능을 제공한다.
```

---

# Advanced Insight

MPI는 단순 기능이 아니라 **Service Revenue Engine**입니다.

Dealer365에서는 MPI를 다음처럼 설계하는 것이 좋습니다.

```
Inspection
→ AI Analysis
→ Recommendation
→ Advisor Review
→ Customer Approval
→ RO Update
```

즉

```
MPI = Upsell Pipeline
```

이 구조를 잘 만들면

- 딜러십 매출 증가
- 고객 신뢰 증가
- Technician 생산성 증가

효과가 동시에 발생합니다.