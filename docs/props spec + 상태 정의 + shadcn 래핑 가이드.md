# 1. 공통 구현 원칙

## 1-1. 래핑 원칙

shadcn 원본은 `/components/ui/*`에 유지하고,

Dealer365 컴포넌트는 아래처럼 분리합니다.

```
/components/ui/*
/components/d365/atoms/*
/components/d365/molecules/*
/lib/design-system/*
```

즉:

- `Button`, `Input`, `Dialog` = shadcn vendor layer
- `StatusChip`, `SearchToolbar`, `QueueCard` = Dealer365 layer

---

## 1-2. 공통 스타일 원칙

### Radius

- button: `2px`
- input: `2px`
- badge/chip: `2px`
- card/panel: `3px`
- table wrapper: `0~2px`
- dialog/drawer: `3px`

### Border

- 그림자보다 보더 우선
- 기본 border는 중명도 neutral
- critical 상태만 accent border 허용

### Density

- compact: 32~36px
- default: 36~40px
- comfortable: 44px+

### Typography

- 제목은 강하게, 숫자는 명확하게
- 설명은 low contrast지만 읽히게
- mono font는 식별자/VIN/RO/Deal ID에만 제한 사용

---

## 1-3. 공통 타입

먼저 여러 컴포넌트가 공유할 공통 타입을 정의하는 것이 좋습니다.

```
exporttypeDensity="compact"|"default"|"comfortable";
exporttypeTone=
|"neutral"
|"info"
|"success"
|"warning"
|"danger"
|"accent";

exporttypeSize="sm"|"md"|"lg";

exporttypeAsyncState="idle"|"loading"|"success"|"error";
```

---

# 2. P0 컴포넌트 15개

---

# 2-1. DButton

## 역할

Dealer365 전역 액션 버튼

## 레이어

Primitive

## 기반 shadcn

`Button`

## Props Spec

```
exporttypeDButtonIntent=
|"primary"
|"secondary"
|"ghost"
|"outline"
|"danger"
|"quiet";

exporttypeDButtonProps= {
  children?:React.ReactNode;
  intent?:DButtonIntent;
  size?:"sm"|"md"|"lg";
  density?:Density;
  loading?:boolean;
  disabled?:boolean;
  leftIcon?:React.ReactNode;
  rightIcon?:React.ReactNode;
  fullWidth?:boolean;
  pressed?:boolean;
  onClick?: () =>void;
  type?:"button"|"submit"|"reset";
  className?:string;
};
```

## 상태 정의

- default
- hover
- active
- focus
- disabled
- loading

## shadcn 래핑 가이드

- shadcn `Button`의 variant를 그대로 노출하지 말고 `intent`로 재정의
- `rounded-[2px]`
- `h-8 / h-9 / h-10`로 size 관리
- loading 시 아이콘 + pointer-events 차단
- primary는 과한 saturation 금지

## 스타일 가이드

- primary: 짙은 중성 배경 + 밝은 텍스트
- secondary/outline: 얇은 보더 기반
- danger: 채도 낮은 red 계열

---

# 2-2. DInput

## 역할

전역 텍스트 입력

## 레이어

Primitive

## 기반 shadcn

`Input`

## Props Spec

```
exporttypeDInputProps= {
  value?:string;
  defaultValue?:string;
  placeholder?:string;
  disabled?:boolean;
  readOnly?:boolean;
  error?:boolean;
  success?:boolean;
  dense?:boolean;
  prefix?:React.ReactNode;
  suffix?:React.ReactNode;
  clearable?:boolean;
  onClear?: () =>void;
  onChange?: (value:string) =>void;
  onEnter?: () =>void;
  className?:string;
  type?:React.HTMLInputTypeAttribute;
  name?:string;
};
```

## 상태 정의

- default
- hover
- focus
- filled
- disabled
- error
- success
- readOnly

## shadcn 래핑 가이드

- 기본 `Input`을 wrapper div로 감싸 prefix/suffix 지원
- input 자체 radius 대신 wrapper에 radius 적용
- `rounded-[2px]`, `h-9`
- error/success border tone 중앙관리
- clear 버튼은 suffix slot으로 통합

## 스타일 가이드

- 배경 대비 낮게
- focus ring은 넓지 않고 정밀하게
- glow 스타일 금지

---

# 2-3. StatusChip

## 역할

도메인 상태값의 표준 표현

## 레이어

Atom

## 기반 shadcn

`Badge`

## Props Spec

```
exporttypeDealerStatus=
|"new"
|"open"
|"in_progress"
|"waiting_approval"
|"waiting_parts"
|"ready"
|"completed"
|"delivered"
|"closed"
|"hold"
|"reserved"
|"cancelled"
|"backorder"
|"approved"
|"declined"
|"draft";

exporttypeStatusChipDomain=
|"service"
|"sales"
|"inventory"
|"parts"
|"finance"
|"generic";

exporttypeStatusChipProps= {
  status:DealerStatus;
  domain?:StatusChipDomain;
  size?:"sm"|"md";
  withIcon?:boolean;
  outlined?:boolean;
  uppercase?:boolean;
  className?:string;
};
```

## 상태 정의

상태 자체가 visual state입니다.

UI interaction state는 아래만 있으면 됩니다.

- default
- hover(optional)
- selected(optional)

## shadcn 래핑 가이드

- `Badge`를 직접 쓰지 말고 status mapping 테이블을 둡니다.

```
constSTATUS_STYLE_MAP= {
  waiting_approval: { tone:"warning", label:"Waiting Approval" },
  in_progress: { tone:"info", label:"In Progress" },
  ready: { tone:"success", label:"Ready" },
};
```

- radius는 `2px`
- pill 형태 금지
- minimum width를 줘서 그리드 정렬성 확보

## 스타일 가이드

- neutral 상태가 가장 많아야 함
- 빨강은 정말 critical일 때만
- 텍스트 대비 우선

# 2-4. MoneyValue

## 역할

금액 표시 표준화

## 레이어

Atom

## 기반 shadcn

text primitive

## Props Spec

```
exporttypeMoneyValueProps= {
  amount:number|null|undefined;
  currency?:"USD"|"KRW";
  showSign?:boolean;
  emphasize?:boolean;
  negativeStyle?:"minus"|"parentheses";
  size?:"sm"|"md"|"lg";
  align?:"left"|"right";
  className?:string;
};
```

## 상태 정의

- default
- emphasis
- negative
- muted

## shadcn 래핑 가이드

- 별도 shadcn 의존 없음
- `Intl.NumberFormat` 기반 포맷
- 금액 정렬은 가능하면 tabular nums 적용

## 스타일 가이드

- total / payable / gross는 `emphasize`
- 작은 라인아이템은 muted tone
- 음수는 red 과장 금지, subdued tone

---

# 2-5. TimeValue

## 역할

시각, ETA, duration 표현 표준화

## 레이어

Atom

## 기반 shadcn

text primitive + optional icon

## Props Spec

```
exporttypeTimeValueMode="time"|"date"|"datetime"|"duration"|"relative";

exporttypeTimeValueProps= {
  value:string|number|Date;
  mode:TimeValueMode;
  prefixLabel?:string;
  emphasize?:boolean;
  overdue?:boolean;
  withIcon?:boolean;
  compact?:boolean;
  className?:string;
};
```

## 상태 정의

- default
- upcoming
- due-soon
- overdue
- muted-history

## shadcn 래핑 가이드

- formatting util 분리
- `overdue`일 때 텍스트/아이콘 tone만 변경
- icon은 optional

## 스타일 가이드

- 모든 시간을 한 형식으로 통일
- 예: `09:20 AM`, `1h 20m`, `27 min ago`

---

# 2-6. SearchField

## 역할

탐색형 화면 전역 검색 입력

## 레이어

Atom

## 기반 shadcn

`Input` + icon button

## Props Spec

```
exporttypeSearchFieldProps= {
  value?:string;
  placeholder?:string;
  debounceMs?:number;
  autoFocus?:boolean;
  loading?:boolean;
  clearable?:boolean;
  resultCount?:number;
  onChange?: (value:string) =>void;
  onSubmit?: (value:string) =>void;
  onClear?: () =>void;
  className?:string;
};
```

## 상태 정의

- idle
- typing
- loading
- has-value
- empty
- error(optional)

## shadcn 래핑 가이드

- `DInput` 위에 thin wrapper
- prefix로 search icon
- suffix로 loading/clear
- 검색창 높이 `36~38`

## 스타일 가이드

- 얇고 길게
- 과한 박스감 금지
- toolbar에 자연스럽게 붙게

---

# 2-7. WorkspaceHeader

## 역할

작업 화면 상단 공통 헤더

## 레이어

Molecule

## 기반 shadcn

`Card`, `Button`, `Badge`, `Separator`

## Props Spec

```
exporttypeWorkspaceHeaderAction= {
  key:string;
  label:string;
  icon?:React.ReactNode;
  intent?:"primary"|"secondary"|"ghost"|"danger";
  disabled?:boolean;
  onClick?: () =>void;
};

exporttypeWorkspaceHeaderProps= {
  title:string;
  subtitle?:string;
  entityLabel?:React.ReactNode;
  meta?:Array<{ label:string; value:React.ReactNode }>;
  statusChips?:React.ReactNode[];
  actions?:WorkspaceHeaderAction[];
  sticky?:boolean;
  className?:string;
};
```

## 상태 정의

- default
- sticky
- compact
- with-alert
- loading

## shadcn 래핑 가이드

- card처럼 보이되 과한 카드감 금지
- 상단 border / bottom border 중심
- sticky 시 backdrop blur 최소, solid surface 우선
- actions는 `DButton`만 사용

## 스타일 가이드

- 제목은 명확하게
- 메타는 1줄 또는 2줄 제한
- status chips 과다 배치 금지

---

# 2-8. StickySummaryBar

## 역할

RO totals, Deal totals, Invoice totals 같은 핵심 요약 고정 바

## 레이어

Molecule

## 기반 shadcn

`Card`, `Separator`

## Props Spec

```
exporttypeSummaryBarItem= {
  key:string;
  label:string;
  value:React.ReactNode;
  emphasize?:boolean;
};

exporttypeStickySummaryBarProps= {
  items:SummaryBarItem[];
  actions?:React.ReactNode;
  sticky?:boolean;
  density?:Density;
  className?:string;
};
```

## 상태 정의

- default
- sticky
- compact
- overflow-scroll

## shadcn 래핑 가이드

- 카드라기보다 summary strip처럼 구현
- item 간 separator
- sticky 위치 제어 props 허용
- 모바일/태블릿에서 가로 스크롤 가능

## 스타일 가이드

- 총액/ETA/승인 상태 같은 3~6개 핵심 항목만
- 숫자 강조는 1~2개만

---

# 2-9. SearchToolbar

## 역할

검색 + 필터 + 정렬 + 저장뷰 + 액션의 상단 제어 바

## 레이어

Molecule

## 기반 shadcn

`Input`, `Button`, `Select`, `Dropdown`, `Separator`

## Props Spec

```
exporttypeToolbarFilter= {
  key:string;
  label:string;
  active?:boolean;
  count?:number;
  onClick?: () =>void;
};

exporttypeSearchToolbarProps= {
  searchValue?:string;
  searchPlaceholder?:string;
  filters?:ToolbarFilter[];
  leftActions?:React.ReactNode[];
  rightActions?:React.ReactNode[];
  sortControl?:React.ReactNode;
  savedViewControl?:React.ReactNode;
  onSearchChange?: (value:string) =>void;
  className?:string;
};
```

## 상태 정의

- default
- has-active-filters
- compact
- sticky
- collapsed-on-mobile

## shadcn 래핑 가이드

- 내부 검색은 `SearchField`
- filter chip은 `FilterChip`
- 액션 정렬 규칙 고정
- toolbar 전체 높이 40 전후

## 스타일 가이드

- 과하게 카드처럼 감싸지 않기
- filter chip이 너무 둥글지 않게
- 정보 밀도는 높게, 행 높이는 짧게

---

# 2-10. FilterRail

## 역할

Explorer 좌측 필터 영역

## 레이어

Molecule

## 기반 shadcn

`Accordion`, `Checkbox`, `Select`, `Button`, `Separator`

## Props Spec

```
exporttypeFilterOption= {
  label:string;
  value:string;
  count?:number;
  selected?:boolean;
};

exporttypeFilterSection=
| {
      key:string;
      title:string;
      type:"checkbox";
      options:FilterOption[];
    }
| {
      key:string;
      title:string;
      type:"single";
      options:FilterOption[];
    }
| {
      key:string;
      title:string;
      type:"custom";
      content:React.ReactNode;
    };

exporttypeFilterRailProps= {
  sections:FilterSection[];
  onApply?: () =>void;
  onReset?: () =>void;
  sticky?:boolean;
  className?:string;
};
```

## 상태 정의

- default
- dirty
- collapsed-section
- active-filters
- empty-section

## shadcn 래핑 가이드

- 섹션은 `Accordion`
- 카운트는 CountBadge 또는 text
- apply/reset footer는 optional
- rail 폭 고정값 제공 (예: 240 / 280)

## 스타일 가이드

- 과한 box nesting 금지
- checkbox 라인 간격 좁게
- count는 보조색, 선택 여부는 명확하게

# 2-11. ResultTable

## 역할

Dealer365 공통 데이터 그리드

## 레이어

Molecule

## 기반 shadcn

`Table`

실제 구현은 **TanStack Table + shadcn styling wrapper** 권장

## Props Spec

```
exporttypeResultTableColumn<T>= {
  key:string;
  header:string;
  accessor?: (row:T) =>React.ReactNode;
  width?:number|string;
  align?:"left"|"center"|"right";
  sortable?:boolean;
  sticky?:boolean;
};

exporttypeResultTableProps<T>= {
  columns:ResultTableColumn<T>[];
  data:T[];
  rowKey: (row:T) =>string;
  density?:Density;
  selectable?:boolean;
  selectedRowKeys?:string[];
  onSelectRow?: (key:string,selected:boolean) =>void;
  onRowClick?: (row:T) =>void;
  rowActions?: (row:T) =>React.ReactNode;
  stickyHeader?:boolean;
  emptyState?:React.ReactNode;
  className?:string;
};
```

## 상태 정의

- default
- loading
- empty
- row-selected
- row-hover
- row-critical
- column-sorted

## shadcn 래핑 가이드

- shadcn `Table`은 스타일용만 사용
- 로직은 TanStack Table
- density 토큰은 table row class로 강제
- 행 상태 강조는 left border 또는 background tint 중심
- radius 거의 제거

## 스타일 가이드

- 헤더는 차분한 배경
- grid line 명확
- zebra는 아주 약하게 또는 없음
- 선택행 강조는 과하지 않게

---

# 2-12. QueueCard

## 역할

Queue / Inbox / Arrival / Approval / Pickup의 최소 단위 카드

## 레이어

Molecule

## 기반 shadcn

`Card`, `Badge`, `Button`

## Props Spec

```
exporttypeQueueCardProps= {
  title:string;
  subtitle?:string;
  entity?:React.ReactNode;
  meta?:Array<{ label:string; value:React.ReactNode }>;
  status?:React.ReactNode;
  priority?:React.ReactNode;
  sla?:React.ReactNode;
  actions?:React.ReactNode[];
  selected?:boolean;
  onClick?: () =>void;
  className?:string;
};
```

## 상태 정의

- default
- hover
- selected
- critical
- overdue
- disabled

## shadcn 래핑 가이드

- Card라기보다 row-card처럼 구현
- padding 작게, 정보 밀도 높게
- selection state는 border-left 또는 top stripe
- action은 hover 시 노출 가능

## 스타일 가이드

- 카드가 너무 둥글거나 크면 안 됨
- dense list 환경에 맞춰야 함

---

# 2-13. ContextPanel

## 역할

워크스페이스 우측 컨텍스트 드로어 / 사이드 패널

## 레이어

Molecule

## 기반 shadcn

`Sheet` or `Drawer`, `Tabs`, `Accordion`, `ScrollArea`

## Props Spec

```
exporttypeContextPanelTab= {
  key:string;
  label:string;
  content:React.ReactNode;
  count?:number;
};

exporttypeContextPanelProps= {
  open?:boolean;
  title?:string;
  subtitle?:string;
  tabs?:ContextPanelTab[];
  defaultTab?:string;
  width?:number|string;
  onOpenChange?: (open:boolean) =>void;
  className?:string;
};
```

## 상태 정의

- closed
- open
- tab-active
- loading
- pinned(optional)

## shadcn 래핑 가이드

- `Sheet`를 기본 사용
- 내부는 `Tabs + ScrollArea`
- width preset 제공: `sm`, `md`, `lg`
- sticky header/footer 옵션 추가

## 스타일 가이드

- side panel이 너무 카드처럼 뜨지 않게
- 메인 작업영역을 압도하지 않게
- subtle border와 다크 surface 층위로 분리

---

# 2-14. ActivityTimeline

## 역할

Lead / RO / Deal / Vehicle / Message 이력 표현

## 레이어

Molecule

## 기반 shadcn

`ScrollArea`, `Separator`

실제는 custom list

## Props Spec

```
exporttypeActivityTimelineItem= {
  id:string;
  type:string;
  title:string;
  description?:string;
  actor?:string;
  timestamp:string|Date;
  status?:string;
  icon?:React.ReactNode;
};

exporttypeActivityTimelineProps= {
  items:ActivityTimelineItem[];
  groupByDate?:boolean;
  compact?:boolean;
  className?:string;
};
```

## 상태 정의

- default
- compact
- grouped
- empty
- highlight-latest

## shadcn 래핑 가이드

- timeline line은 custom CSS
- item마다 icon slot
- timestamp는 `TimeValue` 사용
- actor/meta 줄을 일관화

## 스타일 가이드

- 로그처럼 보이되 복잡하지 않게
- 강조는 최근 항목 1개 정도만

---

# 2-15. StepWizardFrame

## 역할

Appointment / Check-in / Contract 같은 단계형 플로우 공통 프레임

## 레이어

Molecule

## 기반 shadcn

`Card`, `Button`, `Separator`, `Progress`

## Props Spec

```
exporttypeWizardStep= {
  key:string;
  label:string;
  description?:string;
  state?:"upcoming"|"current"|"done"|"error";
};

exporttypeStepWizardFrameProps= {
  title:string;
  steps:WizardStep[];
  currentStepKey:string;
  mainContent:React.ReactNode;
  sideSummary?:React.ReactNode;
  footerActions?:React.ReactNode;
  className?:string;
};
```

## 상태 정의

- step-upcoming
- step-current
- step-done
- step-error
- submitting
- blocked

## shadcn 래핑 가이드

- 상단은 stepper
- 본문은 2컬럼: main + summary
- footer action bar 고정 가능
- step state는 별도 style map

## 스타일 가이드

- 너무 onboarding처럼 보이면 안 됨
- enterprise form 느낌 유지
- summary panel은 가볍게

---

# 3. 상태 정의 중앙화 가이드

P0 컴포넌트는 아래 상태 정의를 중앙화하면 좋습니다.

## 3-1. Visual State Map

```
exportconstSTATE_TONE_MAP= {
  default:"neutral",
  loading:"info",
  success:"success",
  warning:"warning",
  error:"danger",
}asconst;
```

---

## 3-2. StatusChip 도메인별 매핑

```
exportconstSERVICE_STATUS_MAP= {
  open: { label:"Open", tone:"neutral" },
  in_progress: { label:"In Progress", tone:"info" },
  waiting_approval: { label:"Waiting Approval", tone:"warning" },
  waiting_parts: { label:"Waiting Parts", tone:"warning" },
  ready: { label:"Ready", tone:"success" },
  closed: { label:"Closed", tone:"neutral" },
}asconst;
```

이걸 Sales, Inventory, Finance까지 각각 두는 방식이 안전합니다.

---

# 4. shadcn 래핑 코드 구조 예시

```
/components/ui/button.tsx
/components/ui/input.tsx
/components/ui/table.tsx

/components/d365/atoms/status-chip.tsx
/components/d365/atoms/money-value.tsx
/components/d365/atoms/time-value.tsx
/components/d365/atoms/search-field.tsx

/components/d365/molecules/workspace-header.tsx
/components/d365/molecules/sticky-summary-bar.tsx
/components/d365/molecules/search-toolbar.tsx
/components/d365/molecules/filter-rail.tsx
/components/d365/molecules/result-table.tsx
/components/d365/molecules/queue-card.tsx
/components/d365/molecules/context-panel.tsx
/components/d365/molecules/activity-timeline.tsx
/components/d365/molecules/step-wizard-frame.tsx

/lib/design-system/status-map.ts
/lib/design-system/formatters.ts
/lib/design-system/classnames.ts
```

---

# 5. 예시: StatusChip 래핑 방식

```
typeStatusChipTone="neutral"|"info"|"success"|"warning"|"danger";

consttoneClassMap:Record<StatusChipTone,string>= {
  neutral:"border-border bg-muted text-foreground",
  info:"border-sky-700/40 bg-sky-950/40 text-sky-200",
  success:"border-emerald-700/40 bg-emerald-950/40 text-emerald-200",
  warning:"border-amber-700/40 bg-amber-950/40 text-amber-200",
  danger:"border-red-700/40 bg-red-950/40 text-red-200",
};
```

핵심은 **tone class를 컴포넌트 안이 아니라 중앙 맵으로 관리**하는 것입니다.

---

# 6. 디자인시스템 톤앤매너 반영 포인트

말씀하신 방향을 P0에 반영하면 이렇게 됩니다.

## 제네시스 느낌

- 깊은 neutral surface
- 절제된 accent
- 강한 질서감
- 과장 없는 hierarchy

## Linear 느낌

- dense toolbar
- 선명한 데이터 구조
- 텍스트 대비 우수
- 불필요한 장식 최소

## 반영 규칙

- radius 0~3
- border-based layout
- surface layering 3단계 내로 제한
- chip/pill 둥근 처리 금지
- action color 최소화