# Executive Summary

이 화면은 고객과의 **SMS / Email / Approval / Update 커뮤니케이션을 관리**합니다.

Xtime 스타일 기능입니다.

---

# 실제 Workflow

```
RO Update
   ↓
Send SMS
   ↓
Customer Reply
   ↓
Approval / Question
```

---

# IA

```
Service
 ├ Communications
 │   ├ Conversations
 │   ├ Message Thread
 │   ├ Templates
```

---

# 화면 패턴

```
PT-CRM-COM-001
Communication Hub
```

구조

```
Conversation List
Message Thread
Template Panel
Send Message
```

---

# 컴포넌트

### Conversation List

```
Customer
Last message
RO reference
```

---

### Message Thread

```
SMS
Email
Approval messages
```

---

# 데이터 모델

### Conversation

```
{
  "conversationId":"CON-100",
  "customerId":"CUST-100",
  "channel":"SMS"
}
```

---

### Message

```
{
  "messageId":"MSG-882",
  "conversationId":"CON-100",
  "sender":"ADVISOR",
  "text":"Your vehicle is ready for pickup"
}
```

---

# UI 설계

```
Left: Conversation list
Center: Message thread
Right: Customer context
Bottom: Message input
```

---

# 구현 프롬프트

```
Dealer365 Customer Communication Center를 설계한다.
좌측에는 고객 대화 목록,
중앙에는 메시지 스레드,
우측에는 RO 및 고객 정보를 표시한다.
SMS, 이메일, 승인 메시지를 통합 관리한다.
```