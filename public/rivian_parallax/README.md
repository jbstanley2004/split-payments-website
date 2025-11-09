# Rivian-style Layered Backdrop (Brand-ready)

This folder contains the **layered assets** and CSS/JS needed to render a subtle, Rivian-like animated background behind content.

## Files
- `rivian.css` — styles and animations.
- `rivian.js` — setup function.
- `layers/sky.svg`, `layers/haze.svg`, `layers/ridge-left.svg`, `layers/ridge-right.svg` — background layers.

## Usage
Add `rivian-surface rivian-using-assets` to your section and either import the React component or run the init function.

```html
<link rel="stylesheet" href="/rivian_parallax/rivian.css">
<script type="module" src="/rivian_parallax/rivian.js"></script>
<section id="split-funding-process" class="rivian-surface rivian-using-assets"> ... </section>
<script type="module">
  import { initRivianBackdrop } from '/rivian_parallax/rivian.js';
  initRivianBackdrop({ target: '#split-funding-process', useAssets: true });
</script>
```

### Next.js
```tsx
import '@/styles/rivian.css'
import { RivianBackdrop } from '@/components/RivianBackdrop'

export default function HowItWorks(){
  return (
    <section id="split-funding-process" className="rivian-surface rivian-using-assets">
      <RivianBackdrop />
      {/* content */}
    </section>
  )
}
```
