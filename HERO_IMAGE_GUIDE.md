# Hero Image Generation & Integration Guide

## 🎨 Quick Start

Your landing page is ready for a custom hero background! Follow these steps to bring the Unreal/Ghibli vision to life.

---

## Step 1: Generate the Image

### Using Midjourney (Recommended)

```
/imagine prompt: Cinematic stylized Unreal Engine 3D render in painterly Ghibli style. Wide-angle composition showing a calm horizon with soft mountains and gentle haze. Warm sunrise glow orb behind minimalist landscape shapes. Smooth cel-shading, subtle volumetric light, no outlines. Scene feels tactile and serene, designed as a dynamic background for a fintech landing page. Use color palette: #141413 (deep base), #faf9f5 (light contrast), #d97757 (accent orange glow), #6a9bcc (secondary sky blue), #788c5d (green foliage). Keep large clean negative space for text overlay. Mood: optimistic, sophisticated, adventurous, Unreal-Engine-like lighting. --ar 16:9 --style raw --quality 2 --no text --no people --no buildings
```

### Using DALL-E 3 (ChatGPT/Bing)

Copy the prompt from `/public/hero-image-prompt.md` and add:
- "Create in wide format, 16:9 aspect ratio"
- "No text or typography in the image"
- "Suitable as a website background"

### Using Leonardo.ai

1. Select "3D Render" model
2. Enable "Anime" style preset
3. Set aspect ratio to 16:9
4. Paste the prompt
5. Generate 4 variations

### Using Stable Diffusion (Local)

```bash
# Model: SDXL 1.0 + Ghibli LoRA
# Settings:
# - Steps: 40-50
# - CFG Scale: 7-8
# - Sampler: DPM++ 2M Karras
# - Resolution: 1920x1080 or 2560x1440
```

---

## Step 2: Optimize the Image

### Install ImageMagick & cwebp (if needed)

```bash
# macOS
brew install imagemagick webp

# Ubuntu/Debian
sudo apt-get install imagemagick webp

# Windows
# Download from: https://imagemagick.org/script/download.php
```

### Convert to WebP

```bash
# Navigate to your downloads folder
cd ~/Downloads

# Convert to WebP (85% quality for good balance)
cwebp -q 85 your-generated-image.png -o hero-bg.webp

# Create PNG fallback
convert your-generated-image.png -quality 90 hero-bg.png

# Optional: Create mobile-optimized version
cwebp -q 80 your-generated-image.png -resize 1080 608 -o hero-bg-mobile.webp
```

### Optimize File Sizes

Target sizes:
- `hero-bg.webp`: < 500 KB
- `hero-bg.png`: < 1 MB
- `hero-bg-mobile.webp`: < 200 KB

If files are too large:

```bash
# Reduce quality
cwebp -q 75 your-generated-image.png -o hero-bg.webp

# Or resize slightly
convert your-generated-image.png -resize 90% temp.png
cwebp -q 85 temp.png -o hero-bg.webp
rm temp.png
```

---

## Step 3: Add to Your Project

### Copy Files

```bash
# Copy optimized images to public folder
cp hero-bg.webp /path/to/split-payments-website/public/
cp hero-bg.png /path/to/split-payments-website/public/

# Optional: Mobile version
cp hero-bg-mobile.webp /path/to/split-payments-website/public/
```

---

## Step 4: Update the Landing Page

### Option A: Use the HeroBackground Component (Recommended)

**Edit `src/app/page.tsx` line 164:**

```tsx
// BEFORE (current):
<div className="hero-bg" aria-hidden="true" />

// AFTER (with component):
import { HeroBackground } from "@/components/HeroBackground";

// Then in the JSX:
<HeroBackground />
```

This component automatically:
- Uses your custom image if available
- Falls back to CSS gradients if not
- Blends the image with ambient effects
- Handles loading states

### Option B: Direct CSS Implementation

**Edit the `<style jsx>` section in `src/app/page.tsx` around line 313:**

```css
/* BEFORE */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 4vw, 4rem);
  overflow: hidden;
  background: var(--color-dark);
}

/* AFTER */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 4vw, 4rem);
  overflow: hidden;
  background:
    linear-gradient(rgba(20, 20, 19, 0.3), rgba(20, 20, 19, 0.5)),
    url('/hero-bg.webp') center/cover no-repeat,
    var(--color-dark);
}
```

### Option C: Use Next.js Image Component

**Replace the `.hero-bg` div entirely:**

```tsx
<section className="hero-section">
  {/* Background Image */}
  <Image
    src="/hero-bg.webp"
    alt=""
    fill
    priority
    quality={90}
    className="hero-bg-image"
    sizes="100vw"
    style={{
      objectFit: "cover",
      objectPosition: "center",
      zIndex: 0,
    }}
  />

  {/* Overlay gradient for text readability */}
  <div className="hero-overlay" aria-hidden="true" />

  {/* Existing content... */}
  <motion.div className="hero-content">
    {/* ... */}
  </motion.div>
</section>
```

Then add to styles:

```css
.hero-bg-image {
  mix-blend-mode: overlay;
  opacity: 0.85;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(20, 20, 19, 0.2),
    rgba(20, 20, 19, 0.4)
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
}
```

---

## Step 5: Test & Fine-Tune

### Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and check:
- ✅ Image loads properly
- ✅ Text is readable over background
- ✅ Animations work smoothly
- ✅ Mobile responsive
- ✅ Image doesn't stretch/distort

### Adjust Blend Mode (If Needed)

If the image is too bright/dark, adjust in CSS:

```css
/* Make image more subtle */
mix-blend-mode: overlay;
opacity: 0.6;

/* Make image more prominent */
mix-blend-mode: normal;
opacity: 0.9;

/* Different blend modes to try */
mix-blend-mode: multiply;    /* Darker */
mix-blend-mode: screen;      /* Lighter */
mix-blend-mode: soft-light;  /* Subtle */
```

### Adjust Gradient Overlay

```css
/* Darker overlay for better text contrast */
background: linear-gradient(
  rgba(20, 20, 19, 0.4),
  rgba(20, 20, 19, 0.6)
);

/* Lighter for more image visibility */
background: linear-gradient(
  rgba(20, 20, 19, 0.1),
  rgba(20, 20, 19, 0.3)
);
```

---

## 🎯 Expected Result

When done correctly, your hero section will have:

1. **Beautiful Unreal/Ghibli background** with warm orange glow
2. **Perfect text contrast** - "Your Future is Bright" clearly visible
3. **Smooth animations** - gradients and image blend seamlessly
4. **Fast loading** - WebP format optimized for performance
5. **Responsive** - looks great on all screen sizes

---

## 🔧 Troubleshooting

### Image Not Showing

```bash
# Verify file exists
ls -la public/hero-bg.webp

# Check file permissions
chmod 644 public/hero-bg.webp

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Image Too Large

```bash
# Compress more aggressively
cwebp -q 70 -m 6 original.png -o hero-bg.webp

# Or use online tools:
# https://squoosh.app/
# https://tinypng.com/
```

### Text Hard to Read

Add a darker gradient overlay:

```css
.hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    transparent 20%,
    rgba(20, 20, 19, 0.7) 80%
  );
  z-index: 1;
}
```

---

## 📝 Current Status

**✅ Landing page code ready** - All styles and animations in place
**⏳ Waiting for generated image** - Use prompt in `/public/hero-image-prompt.md`
**🎨 Fallback active** - CSS gradients currently serving as placeholder

Once you generate and add the image, the page will automatically level up to the full Unreal/Ghibli vision!

---

## 💡 Pro Tips

1. **Test multiple generations** - Generate 3-4 versions and pick the best
2. **Adjust focal point** - Ensure the orange glow is in upper-right for best composition
3. **Consider seasons** - You could create variants (dawn, dusk, seasons) and rotate them
4. **A/B test** - Try with/without image to see user engagement difference
5. **Compress smartly** - Use https://squoosh.app/ for fine-tuned compression control

---

## 📊 Performance Checklist

Before deploying:

- [ ] WebP format used
- [ ] File size under 500 KB
- [ ] Image dimensions at least 1920x1080
- [ ] Tested on mobile (responsive)
- [ ] Text remains readable
- [ ] Lighthouse score > 90
- [ ] Animations smooth (60fps)

---

**Need help?** Check the HeroBackground component at `src/components/HeroBackground.tsx` for a drop-in solution!
