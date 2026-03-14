# Dealer365 UI Rules for Codex

This document defines strict UI rules for the Dealer365 frontend.

Codex must follow these rules when generating UI.

---

# 1 Button System

Dealer365 uses **shadcn Button as the base component**.

Allowed variants:

default  
secondary  
outline  
ghost  
destructive  
link

Reference: shadcn button variants:contentReference[oaicite:0]{index=0}

However Dealer365 restricts usage to the following patterns.

---

## Primary Button

Used for the main action.

Examples

- New Appointment
- Next Step
- Save / Close
- Approve

Usage

<Button variant="default" size="sm" />

Rules

- Only ONE primary button per section
- Always solid background
- Must be visually dominant

---

## Secondary Button

Used for supporting actions.

Examples

- Update
- Check-in
- View Recall

Usage

<Button variant="outline" size="sm" />

Rules

- Border only
- Neutral background
- Never visually stronger than primary

---

## Tertiary Button

Used for low emphasis actions.

Examples

- Filters
- Toggle view

Usage

<Button variant="ghost" size="sm" />

---

## Icon Button

Used for icon-only actions.

Examples

- settings
- notifications
- sidebar toggle

Usage

<Button variant="ghost" size="icon">
 <Icon icon={Bell}/>
</Button>

---

# Forbidden Button Styles

Do NOT create new button styles.

Forbidden patterns:

- custom background colors
- random height classes (h-7 h-8 h-9)
- inline color styling
- multiple primary buttons
- custom button components

---

# 2 Button Sizes

Allowed sizes

sm = 32px height  
default = 36px height  
icon = square button

Do not override height with Tailwind utilities.

---

# 3 Icon System

All icons must use the Dealer365 wrapper.

Allowed

<Icon icon={Search} />

Forbidden

<Search />
<FileText />
<Home />

Icons must not use

- h-4 w-4
- h-5 w-5
- custom strokeWidth

---

# 4 Typography Hierarchy

Only use the following scale.

Page Title  
text-2xl font-semibold

Workspace Title  
text-xl font-semibold

Card Title  
text-base font-semibold

Label  
text-xs uppercase tracking-wide text-muted-foreground

Body  
text-sm

Caption  
text-xs text-muted-foreground

---

# 5 Layout Density

Dealer365 uses dense enterprise UI.

Spacing rules

card padding = 16px  
toolbar height = 40px  
button height = 32px  
table row height = 40px  

Avoid large whitespace.

---

# 6 Card System

Cards must use shadcn Card.

Structure

CardHeader  
CardContent  
CardFooter

Do not create custom card containers.

---

# 7 Color Rules

Use theme tokens only.

Allowed

bg-primary  
bg-muted  
text-muted-foreground  
border-border  

Forbidden

- inline hex colors
- random Tailwind colors

---

# 8 Action Hierarchy

Every screen should follow

Primary Action  
Secondary Action  
Tertiary Action

Example

New Appointment (primary)

Search RO (secondary)

Filter (tertiary)

---

# 9 Codex Generation Rules

When generating UI:

1. Use shadcn components
2. Use D365 wrappers
3. Follow button system
4. Follow typography scale
5. Follow spacing rules
6. Do not invent new UI styles

If unsure, prefer simpler UI.