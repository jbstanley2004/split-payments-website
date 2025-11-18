# Image Metadata System

This repository includes a comprehensive metadata system for all images, designed to help AI agents and developers understand exactly what kind of images are stored in the repository.

## Overview

The image metadata system provides structured information about every image file, including:
- **Category**: The type of image (logo, screenshot, photo, etc.)
- **Labels**: Human-readable descriptive labels
- **Tags**: Searchable keywords for filtering
- **Description**: Detailed description of the image content
- **Context**: Where and how the image is used

## Files

### Metadata File
- **Location**: `/public/image-metadata.json`
- **Format**: JSON
- **Structure**: Contains a collection of image metadata entries

### TypeScript Utilities
- **Client-side**: `/src/lib/image-metadata.ts` - For browser/client usage
- **Server-side**: `/src/lib/image-metadata-server.ts` - For server-side usage (Next.js)

## Usage Examples

### Client-Side (Browser)

```typescript
import {
  getImageMetadata,
  searchImagesByTags,
  searchImagesByCategory,
  filterImages,
} from "@/lib/image-metadata";

// Get metadata for a specific image
const metadata = await getImageMetadata("/hero-light.png");
console.log(metadata?.description); // "Hero dashboard screenshot in light mode"

// Search by tags
const paymentLogos = await searchImagesByTags(["payment", "card"]);
console.log(paymentLogos.length); // Number of payment card logos

// Search by category
const screenshots = await searchImagesByCategory("ui-screenshot");
console.log(screenshots.length); // Number of UI screenshots

// Advanced filtering
const results = await filterImages({
  categories: ["logo", "icon"],
  tags: ["brand"],
  searchText: "payment",
});
```

### Server-Side (Next.js)

```typescript
import {
  getImageMetadataServer,
  searchImagesByTagsServer,
  filterImagesServer,
} from "@/lib/image-metadata-server";

// Get metadata for a specific image
const metadata = getImageMetadataServer("/hero-light.png");

// Search by tags
const paymentLogos = searchImagesByTagsServer(["payment", "card"]);

// Advanced filtering
const results = filterImagesServer({
  categories: ["ui-screenshot"],
  tags: ["dark-mode"],
});
```

## Image Categories

The system uses the following categories:

- **`logo`**: Company logos, brand logos, partner logos
- **`icon`**: Application icons, favicons, small icons
- **`photo`**: Photographs of people, team members, real-world images
- **`ui-screenshot`**: Screenshots of user interfaces, dashboards, features
- **`payment-card-logo`**: Payment card brand logos (Visa, Mastercard, Amex, etc.)
- **`branding`**: Branding materials, marketing visuals
- **`illustration`**: Illustrations, graphics, decorative elements
- **`industry`**: Industry-specific images (restaurants, hotels, etc.)
- **`other`**: Other types of images

## Metadata Structure

Each image entry follows this structure:

```typescript
{
  path: string;              // Image path (e.g., "/hero-light.png")
  category: ImageCategory;   // One of the categories above
  labels: string[];          // Human-readable labels
  tags: string[];           // Searchable keywords
  description: string;      // Detailed description
  context: string;         // Usage context
}
```

## Benefits for AI Agents

This metadata system enables AI agents to:

1. **Understand Image Content**: Quickly determine what an image contains without analyzing the image itself
2. **Filter and Search**: Find images by category, tags, or keywords
3. **Context Awareness**: Understand where and how images are used
4. **Semantic Search**: Search for images using natural language queries
5. **Automated Processing**: Programmatically categorize and organize images

## Adding New Images

When adding new images to the repository:

1. Add the image file to the appropriate directory
2. Add a metadata entry to `/public/image-metadata.json`
3. Include:
   - Accurate category classification
   - Relevant labels and tags
   - Clear description
   - Usage context

## Query Examples

### Find all payment-related images
```typescript
const paymentImages = await filterImages({
  tags: ["payment"],
});
```

### Find all dark mode screenshots
```typescript
const darkScreenshots = await filterImages({
  categories: ["ui-screenshot"],
  tags: ["dark-mode"],
});
```

### Find team photos
```typescript
const teamPhotos = await filterImages({
  categories: ["photo"],
  tags: ["team", "people"],
});
```

### Search by description
```typescript
const invoiceImages = await searchImagesByText("invoice");
```

## Maintenance

The metadata file should be updated whenever:
- New images are added
- Images are removed
- Image usage changes
- New categories are needed

## Future Enhancements

Potential improvements:
- Automatic metadata generation from image analysis
- Integration with image optimization tools
- Metadata validation scripts
- Search interface for developers
- Export to other formats (CSV, YAML, etc.)

