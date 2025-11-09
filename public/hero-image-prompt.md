# Hero Background Image Prompt

## Main Hero Image
**Cinematic stylized Unreal Engine 3D render in painterly Ghibli style. Wide-angle composition showing a calm horizon with soft mountains and gentle haze. Warm sunrise glow orb behind minimalist landscape shapes. Smooth cel-shading, subtle volumetric light, no outlines. Scene feels tactile and serene, designed as a dynamic background for a fintech landing page. Use color palette: #141413 (deep base), #faf9f5 (light contrast), #d97757 (accent orange glow), #6a9bcc (secondary sky blue), #788c5d (green foliage). Keep large clean negative space for text overlay. Mood: optimistic, sophisticated, adventurous, Unreal-Engine-like lighting.**

## Technical Specifications
- **Format**: WebP (for performance) with PNG fallback
- **Dimensions**: 2560x1440px minimum (supports 4K displays)
- **Aspect Ratio**: 16:9 or wider (21:9 for ultrawide support)
- **File Size Target**: <500KB compressed
- **Color Space**: sRGB
- **Compression**: High quality (85-90%)

## Key Elements to Include
1. **Horizon line**: Lower third of composition for text space
2. **Glow orb**: Upper right area (#d97757 orange)
3. **Mountains**: Soft, layered silhouettes with atmospheric perspective
4. **Haze/Mist**: Volumetric fog in middle distance
5. **Negative Space**: Center and left side for "Your Future is Bright" text
6. **Subtle Details**: Floating particles, gentle light rays

## Brand Color Integration
- **Deep Background**: #141413 (primary dark)
- **Light Highlights**: #faf9f5 (text-safe contrast)
- **Primary Glow**: #d97757 (warm orange accent)
- **Sky Accents**: #6a9bcc (calm blue tones)
- **Foliage/Ground**: #788c5d (muted green)

## Generation Tools (Recommended)
1. **Midjourney**: Use `--style raw --ar 16:9 --quality 2`
2. **DALL-E 3**: Request wide format, specify no text
3. **Stable Diffusion XL**: Use landscape orientation
4. **Adobe Firefly**: Set to "Photo" mode with artistic style
5. **Leonardo.ai**: Use "3D Render" + "Anime" models combined

## Export Settings
```bash
# After generation, optimize with:
# Convert to WebP
cwebp -q 85 hero-image.png -o hero-image.webp

# Create responsive versions
convert hero-image.png -resize 1920x1080 hero-image-1080p.webp
convert hero-image.png -resize 1280x720 hero-image-720p.webp
convert hero-image.png -resize 640x360 hero-image-360p.webp
```

## Implementation
Once generated, place image files in `/public/` directory:
- `hero-bg.webp` (main image)
- `hero-bg.png` (fallback)
- `hero-bg-mobile.webp` (optional mobile version)

## Current Implementation Note
The landing page currently uses CSS gradients for the background. To switch to the generated image, update `src/app/page.tsx` line 313:

**Current:**
```css
background: var(--color-dark);
```

**With Image:**
```css
background: url('/hero-bg.webp') center/cover no-repeat, var(--color-dark);
background-blend-mode: overlay;
```

Or use Next.js Image component for better optimization.
