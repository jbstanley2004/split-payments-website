# Thick 3D Button

A small, dependency‑free button that looks **thick** (visible sidewall), presses with a deep **plunger** feel, and reads correctly from the front edge (the sidewall compresses toward a fixed base).

- Sidewall is **bottom‑anchored**; it shortens on press while the base/lip stays put
- Specular highlight follows the cursor for curvature cues
- Tiny tilt toward the pointer, springy release (respects `prefers-reduced-motion`)
- Keyboard accessible (Space/Enter)

## Files
- `index.html` – Demo page
- `thick-button.css` – Component styles
- `thick-button.js` – Interaction (tilt, highlight, spring, keyboard)
- `styles.css` – Demo page chrome (optional)

## Usage
```html
<button class="btn3d" data-thickness="30" data-travel="22" data-tilt="10">
  <span class="btn3d__cap">
    <span class="btn3d__text">Let’s Split →</span>
  </span>
</button>
```
```html
<link rel="stylesheet" href="thick-button.css" />
<script src="thick-button.js"></script>
```

### Tuning
- `data-thickness` → visible height of the sidewall (px). 26–36 is chunky.
- `data-travel` → how deep the cap moves on press. Use ~70–80% of thickness.
- `data-tilt` → maximum hover tilt in degrees. Subtle is best (8–12).

Or override CSS variables:
```css
.btn3d{
  --radius: 22px;
  --cap-top: #e07b66;
  --cap-bottom: #c75a45;
  --side-top: #b55642;
  --side-bottom: #8d3a2c;
  --base: #5e2a22;
  --text: #fff;
}
```

## Why the front edge looks right
The sidewall pseudo‑element’s `bottom` is set to `-var(--thickness)`. On press we reduce both its `height` and its negative `bottom` by the same `var(--travel)` amount, so the **bottom edge remains aligned with the base** while the visible wall compresses. That avoids the “sliding forward” illusion.

## License
MIT — use anywhere.
