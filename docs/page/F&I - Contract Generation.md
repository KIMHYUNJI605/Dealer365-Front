# Executive Summary

이 화면은 **Deal Desk 이후 계약 생성 단계**입니다.

흐름:

```
Deal Desk
   ↓
Finance Options
   ↓
Contract Generation
```

---

# 실제 Workflow

1. Deal 확정
2. Finance 조건 선택
3. 계약 생성
4. 서명

---

# IA

```
Sales
 ├ F&I
 │   ├ Finance Options
 │   ├ Contract
 │   └ Sign
```

---

# 화면 패턴

```
PT-SLS-FIN-001
F&I Workspace
```

---

# 컴포넌트

### Finance Panel

```
APR
Term
Down payment
Monthly payment
```

---

### F&I Products

```
Warranty
GAP
Maintenance
```

---

### Contract Generator

```
Preview
Generate contract
Sign
```

---

# 데이터 모델

### FinanceContract

```
{
  "contractId":"CONTRACT-101",
  "dealId":"DEAL-200",
  "apr":4.9,
  "term":60,
  "monthlyPayment":540
}
```

---

# UI 설계

```
Left: Customer / Deal
Center: Finance Options
Right: Contract Preview
Footer: Generate Contract
```

---

# 구현 프롬프트

```
Dealer365 F&I Contract Generation UI를 설계한다.
좌측에는 고객과 Deal 정보를 표시하고,
중앙에는 금융 조건(APR, Term, Down Payment)을 설정한다.
우측에는 계약서 미리보기를 표시하며 Generate Contract 버튼으로 계약을 생성한다.
```