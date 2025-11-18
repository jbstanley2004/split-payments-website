# Split Branding Guidelines

This document provides a comprehensive guide to the visual identity and design system for the Split website. It is intended for developers and designers to ensure consistency and a cohesive user experience across all pages.

## 1. Core Design Tokens

This section defines the fundamental building blocks of our design system.

### 1.1. Colors

Our color palette is designed to be warm, trustworthy, and modern.

#### Backgrounds
- `--bg-page`: `#F4F2EE` (Primary page background)
- `--bg-section-cream`: `#E8DDD0` (Light neutral card/section background)
- `--bg-section-stone`: `#C5B092` (Stronger neutral card/section background)

#### Brand Surfaces
- `--blue-soft`: `#8196A9` (Soft blue surfaces, hero chips, cards)
- `--blue-deep`: `#3F6587` (Primary CTA background)
- `--sage`: `#7E987C` (Green system/workflow surfaces)
- `--rose`: `#B099A2` (Approvals/finance surfaces)

#### Accent
- `--accent-orange`: `#D97757` (Used sparingly for dots and tiny icon fills)

#### Text
- `--text-main`: `#151515` (Primary text color)
- `--text-subtle`: `#5B534B` (Secondary text color)
- `--text-on-dark`: `#FFFFFF` (Text for dark backgrounds)

### 1.2. Radii

- `--radius-pill`: `999px` (For pill-shaped elements like buttons and chips)
- `--radius-card`: `24px` (For card elements)

### 1.3. Shadows

- `--shadow-soft`: `0 18px 40px rgba(15, 7, 0, 0.10)` (For creating a sense of depth on cards and buttons)

## 2. Component Recipes

This section provides standardized CSS classes and usage examples for common UI components.

### 2.1. Primary CTA Button (`.btn-primary`)

The primary call-to-action button should be used for the most important action on a page.

**CSS:**
```css
.btn-primary {
  background: var(--blue-deep);
  color: var(--text-on-dark);
  border-radius: var(--radius-pill);
  padding: 10px 22px;
  font-weight: 600;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: var(--shadow-soft);
}
.btn-primary .dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--accent-orange);
}
```

### 2.2. Chips (`.chip`)

Chips are used for tags, categories, and short status indicators.

**CSS:**
```css
.chip {
  border-radius: var(--radius-pill);
  padding: 4px 12px 4px 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}
.chip .dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--accent-orange);
}
```

**Variants:**
- `.chip--neutral`
- `.chip--blue`
- `.chip--sage`
- `.chip--rose`

### 2.3. Feature Cards (`.card`)

Cards are used to group related content and actions.

**CSS:**
```css
.card {
  border-radius: var(--radius-card);
  padding: 24px;
  box-shadow: var(--shadow-soft);
}
.card__icon {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: var(--accent-orange);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  margin-bottom: 16px;
}
```

**Variants:**
- `.card--neutral`
- `.card--blue`
- `.card--sage`
- `.card--rose`

### 2.4. Stat Tiles (`.tile`)

Tiles are used to display key metrics and stats.

**CSS:**
```css
.tile {
  background: #F8F3EC;
  border-radius: 18px;
  padding: 16px;
  border: 1px solid var(--border-subtle);
}
```

### 2.5. FAQ Rows (`.faq-row`)

FAQ rows are used for question-and-answer formats.

**CSS:**
```css
.faq-row {
  background: var(--bg-section-cream);
  border-radius: var(--radius-pill);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid var(--border-subtle);
}
```

### 2.6. Top Nav Pills (`.nav-pill`)

The top navigation pills are used for the primary navigation links at the top of each page.

**CSS:**
```css
.nav-pill {
  background: #FFFFFF;
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-soft);
  padding: 6px 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.nav-pill .dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--accent-orange);
}

.nav-pill--active {
  outline: 1px solid var(--blue-soft);
}
```

## 3. Usage Mappings

This section provides a page-by-page mapping of how the new branding components are applied.

### 3.1. Home Page

- **Hero Topic Chips:** `chip--blue`, `chip--sage`, `chip--rose`, `chip--neutral`
- **"Smarter payments" Cards:** `card--neutral`, `card--blue`, `card--sage`
- **CTA Button:** `btn-primary`

### 3.2. Funding Page

- **Feature Chips:** `chip--neutral`
- **Diagram Dots:** `accent-orange`

### 3.3. Payments Page

- **Hero Feature Chips:** `chip--neutral`, `chip--blue`, `chip--sage`, `chip--rose`
- **Coverage Cards:** `card--neutral`, `card--blue`, `card--sage`
- **CTA Button:** `btn-primary`

### 3.4. CC Split Page

- **Hero Tags:** `chip--sage`, `chip--rose`, `chip--blue`, `chip--neutral`
- **"Designed for operators" Cards:** `card--neutral`, `card--blue`, `card--sage`, `card--rose`
- **Metric Tiles:** `tile`
- **CTA Button:** `btn-primary`

### 3.5. Partnerships Page

- **Hero Metric Tiles:** `tile` (with `--bg-section-stone` background)
- **Program Cards:** `card--neutral`
- **FAQ Pills:** `faq-row`
- **CTA Button:** `btn-primary`
