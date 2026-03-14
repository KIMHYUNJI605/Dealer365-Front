# Dealer365 Design System v1

This document defines the **visual design rules** for Dealer365 UI.

Codex must follow these rules when generating UI.

---

# 1 Button System

Dealer365 only allows **4 button types**.

## Primary Button

Main action of the screen.

Examples
- New Appointment
- Next Step
- Save / Close
- Approve

Usage

<Button variant="default" size="sm" />

Rules
- solid background
- only ONE primary button per section
- never use multiple primary buttons side-by-side

---

## Secondary Button

Supporting actions.

Examples
- Update
- Check-in
- View Recall

Usage

<Button variant="outline" size="sm" />

Rules
- border only
- neutral tone

---

## Tertiary Button

Low emphasis actions.

Examples
- Filters
- Toggle view

Usage

<Button variant="ghost" size="sm" />

---

## Icon Button

Icon-only actions.

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

The following are NOT allowed

- custom background colors on buttons
- random heights (h-7, h-8, h-9)
- inline color styling
- multiple primary buttons in the same section

---

# 2 Button Size Rules

Allowed sizes

sm = 32px height  
default = 36px height  
icon = square

Do not use custom height utilities.

---

# 3 Icon Rules

All icons must use the D365 Icon wrapper.

Allowed

<Icon icon={Search}/>

Forbidden

<Search />
<FileText />
<Home />

Icons must not use

- h-4 w-4
- h-5 w-5
- manual strokeWidth

---

# 4 Typography Scale

Only use the following hierarchy.

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

Dealer365 uses **dense enterprise UI**.

Spacing rules

card padding = 16px  
toolbar height = 40px  
button height = 32px  
table row height = 40px  

Avoid large whitespace.

---

# 6 Card System

Cards must follow this structure.

Card Header  
Card Content  
Card Footer

Use shadcn Card components.

Do not create custom card containers.

---

# 7 Color Rules

Use only theme tokens.

Allowed

bg-primary  
bg-muted  
text-muted-foreground  
border-border

Forbidden

- inline hex colors
- random Tailwind color utilities

---

# 8 Action Hierarchy

Each screen should follow this order.

Primary Action  
Secondary Action  
Tertiary Action

Example

New Appointment (primary)

Search RO (secondary)

Filter (tertiary)

---

# 9 Codex Rules

When generating UI:

1. Use shadcn components as base
2. Use D365 wrappers
3. Follow button system
4. Follow typography scale
5. Follow spacing rules
6. Do not invent new UI styles