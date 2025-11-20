# Brand Guidelines: The "Elegant" Design System

> **Note**: This document is the **sole source of truth** for the design system. Ignore any legacy guidelines found elsewhere in the repository. These guidelines are derived directly from the implementation of the new Home Page, Navigation, and Hardware Spotlight.

## 1. Core Philosophy
**"Notion-esque Elegance meets FinTech Power."**

Our aesthetic is defined by high contrast, extreme clarity, and "tangible" UI elements. We reject unnecessary decoration in favor of content, typography, and subtle, premium interactions.

### The 3 Pillars
1.  **Tangible & Fluid**: Elements should feel like physical objects (cards, hardware) or premium materials (liquid glass). Animations must be smooth and physics-based.
2.  **Editorial Typography**: We treat UI like a magazine. Serif fonts (Lora) are used for body and "voice" text, while Sans (Poppins) is used for structure and data.
3.  **Compact & Focused**: We use "Notion-style" spacing—tight, efficient, and distraction-free. No massive empty voids; just clean, breathable density.

---

## 2. Design Physics (Mathematical Constants)

We use a strict mathematical scale for all design elements to ensure consistency.

### **Corner Radius Scale**
*   **Small (8px)**: `rounded-lg`
    *   *Usage*: Icons, small buttons, internal card elements.
*   **Medium (16px)**: `rounded-2xl`
    *   *Usage*: Content Cards (Features, Testimonials), Standard Containers.
*   **Large (48px)**: `rounded-[3rem]`
    *   *Usage*: Hero Elements, Hardware Spotlight Image Container.
*   **Full (9999px)**: `rounded-full`
    *   *Usage*: Pills, Badges, Avatars, Navigation Buttons.

### **Shadow Physics**
*   **Static (Floating)**: `shadow-lg`
    *   *Usage*: Cards that need to separate from the white background.
*   **Deep (Suspended)**: `drop-shadow-2xl`
    *   *Usage*: Hardware images, "floating" objects.
*   **Hover (Lift)**: `hover:shadow-xl`
    *   *Usage*: Interactive cards on hover.

---

## 3. Typography System

We use a **Dual-Font Strategy** to create hierarchy and warmth.

### **Primary Sans: Poppins**
*Used for: Headings, UI Labels, Buttons, Navigation, Data/Specs.*
*   **Why**: Geometric, friendly, and highly legible.
*   **Key Styles**:
    *   **Display**: `font-poppins font-semibold tracking-tight` (e.g., "Payments and funding.")
    *   **UI Label**: `font-poppins font-medium uppercase tracking-widest text-xs` (e.g., "BRAND", "CATEGORY")
    *   **Nav Link**: `font-poppins font-medium text-sm`

### **Primary Serif: Lora**
*Used for: Hero Subtext, Body Copy, Testimonials, Product Names, "Voice" Elements.*
*   **Why**: Adds sophistication, editorial authority, and readability to long text.
*   **Key Styles**:
    *   **Hero Subtext**: `font-lora text-xl md:text-2xl text-brand-black/70`
    *   **Product Title**: `font-lora font-medium italic` (e.g., *"Powerful to use"*)
    *   **Body**: `font-lora text-brand-black/70 leading-relaxed`

---

## 4. Color System (Monochrome + Depth)

We do not rely on color for structure. We use **shade and depth**.

| Role | Tailwind Class | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas** | `bg-white` | `#FFFFFF` | **ALWAYS** the background for content sections. |
| **Ink (Primary)** | `text-brand-black` | `#111111` | Primary text. Softer than pure black. |
| **Ink (Secondary)** | `text-brand-black/70` | `rgba(17,17,17,0.7)` | Body text, descriptions. |
| **Ink (Tertiary)** | `text-brand-black/40` | `rgba(17,17,17,0.4)` | Labels, inactive states. |
| **Divider** | `border-brand-stone/30` | - | Subtle separation. |
| **Glass** | `bg-white/10` | - | Navigation background. |

---

## 5. Component Library

### A. Navigation ("Liquid Glass")
The navigation bar is a signature element. It must feel like a slice of glass floating over the content.
*   **Container**: `fixed z-50 backdrop-blur-xl bg-white/10 backdrop-saturate-150`
*   **Links**:
    *   **Style**: Text-only. **NO PILLS. NO BORDERS.**
    *   **Typography**: `text-brand-black font-medium`
    *   **Visibility Hack**: `[text-shadow:_0_0_12px_rgb(255_255_255_/_90%)]` (Ensures readability over dark backgrounds).
    *   **Active State**: No underline. Just the text.
    *   **Accent**: A small red dot (`bg-red-500`) creates a focal point.

### B. Content Cards (Features & Testimonials)
Cards should sit directly on the white page background or float slightly.
*   **Container**: `bg-white rounded-2xl border border-gray-200`
*   **Shadows**:
    *   **Static**: `shadow-lg` (Always visible, not just on hover).
    *   **Hover**: `transition-all duration-300 hover:shadow-xl` (Subtle lift).
*   **Imagery**: Full-bleed images at the top of cards (`h-48 object-cover`).

### C. Hardware Spotlight (The "Apple" Look)
Products are presented as premium objects, not commodity hardware.
*   **Layout**: Split 50/50 (Image Left / Details Right).
*   **Image Container**: `bg-brand-gray/5 rounded-[3rem]` (Organic, soft shape).
*   **Product Image**: `drop-shadow-2xl` (Deep, soft shadow to simulate floating).
*   **Animation**: `Framer Motion` with `AnimatePresence` for smooth crossfades.

---

## 6. Layout & Spacing Principles ("Notion Style")

We have moved away from expansive, loose spacing to a tighter, more information-dense layout.

### **The Golden Rule of Spacing**
*   **Section Padding**: `py-16` (64px).
    *   *Old Standard*: `py-32` (Too loose).
    *   *New Standard*: `py-16` (Compact, professional).
*   **Section Backgrounds**: **ALWAYS FULL WIDTH WHITE.**
    *   Wrap content in `<div className="w-full bg-white">`.
    *   Never let content float on a transparent/gray background unless it's the specific Hero/Footer area.

---

## 7. Motion Guidelines

Motion should be "felt," not just seen.

*   **Transitions**: `ease-out` or `circOut`.
*   **Duration**: `0.4s` to `0.6s` (Slightly slower for elegance).
*   **Scroll**: Elements should `fade-in-up` as they enter the viewport (`y: 20` -> `y: 0`).

---

## 8. Do's and Don'ts

| ✅ DO | ❌ DON'T |
| :--- | :--- |
| **Do** use `text-shadow` on nav links to ensure contrast. | **Don't** use solid white backgrounds for the nav bar. |
| **Do** use `py-16` for section spacing. | **Don't** use `py-32` or massive gaps between headers and content. |
| **Do** mix Serif (Lora) and Sans (Poppins). | **Don't** use only one font family for the whole page. |
| **Do** make shadows static and visible. | **Don't** hide shadows behind hover states. |
| **Do** use full-width white backgrounds for sections. | **Don't** box content into narrow containers with gray margins. |
