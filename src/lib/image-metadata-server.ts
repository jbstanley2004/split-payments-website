/**
 * Server-side Image Metadata Utilities
 * 
 * This module provides server-side utilities for working with image metadata
 * without requiring fetch calls.
 */

import imageMetadata from "../../public/image-metadata.json";
import type {
  ImageMetadata,
  ImageMetadataCollection,
  ImageCategory,
  ImageFilter,
} from "./image-metadata";

/**
 * Get the image metadata collection (server-side)
 */
export function getImageMetadataCollection(): ImageMetadataCollection {
  return imageMetadata as ImageMetadataCollection;
}

/**
 * Get metadata for a specific image by path (server-side)
 */
export function getImageMetadataServer(
  imagePath: string
): ImageMetadata | null {
  const metadata = getImageMetadataCollection();
  return (
    metadata.images.find(
      (img) => img.path === imagePath || img.path === `/${imagePath}`
    ) || null
  );
}

/**
 * Search images by tags (server-side)
 */
export function searchImagesByTagsServer(
  tags: string[]
): ImageMetadata[] {
  const metadata = getImageMetadataCollection();
  const lowerTags = tags.map((tag) => tag.toLowerCase());
  return metadata.images.filter((img) =>
    img.tags.some((tag) => lowerTags.includes(tag.toLowerCase()))
  );
}

/**
 * Search images by category (server-side)
 */
export function searchImagesByCategoryServer(
  category: ImageCategory
): ImageMetadata[] {
  const metadata = getImageMetadataCollection();
  return metadata.images.filter((img) => img.category === category);
}

/**
 * Search images by label (server-side)
 */
export function searchImagesByLabelServer(
  label: string
): ImageMetadata[] {
  const metadata = getImageMetadataCollection();
  const lowerLabel = label.toLowerCase();
  return metadata.images.filter((img) =>
    img.labels.some((l) => l.toLowerCase().includes(lowerLabel))
  );
}

/**
 * Search images by description or context (server-side)
 */
export function searchImagesByTextServer(
  searchText: string
): ImageMetadata[] {
  const metadata = getImageMetadataCollection();
  const lowerSearch = searchText.toLowerCase();
  return metadata.images.filter(
    (img) =>
      img.description.toLowerCase().includes(lowerSearch) ||
      img.context.toLowerCase().includes(lowerSearch) ||
      img.labels.some((label) => label.toLowerCase().includes(lowerSearch)) ||
      img.tags.some((tag) => tag.toLowerCase().includes(lowerSearch))
  );
}

/**
 * Get all unique categories (server-side)
 */
export function getAllCategoriesServer(): ImageCategory[] {
  const metadata = getImageMetadataCollection();
  const categories = new Set<ImageCategory>();
  metadata.images.forEach((img) => categories.add(img.category));
  return Array.from(categories);
}

/**
 * Get all unique tags (server-side)
 */
export function getAllTagsServer(): string[] {
  const metadata = getImageMetadataCollection();
  const tags = new Set<string>();
  metadata.images.forEach((img) => {
    img.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get metadata for multiple images by paths (server-side)
 */
export function getMultipleImageMetadataServer(
  imagePaths: string[]
): Map<string, ImageMetadata> {
  const metadata = getImageMetadataCollection();
  const result = new Map<string, ImageMetadata>();
  
  imagePaths.forEach((path) => {
    const img = metadata.images.find(
      (img) => img.path === path || img.path === `/${path}`
    );
    if (img) {
      result.set(path, img);
    }
  });
  
  return result;
}

/**
 * Filter images by multiple criteria (server-side)
 */
export function filterImagesServer(
  filter: ImageFilter
): ImageMetadata[] {
  const metadata = getImageMetadataCollection();
  let results = metadata.images;

  if (filter.categories && filter.categories.length > 0) {
    results = results.filter((img) =>
      filter.categories!.includes(img.category)
    );
  }

  if (filter.tags && filter.tags.length > 0) {
    const lowerTags = filter.tags.map((tag) => tag.toLowerCase());
    results = results.filter((img) =>
      img.tags.some((tag) => lowerTags.includes(tag.toLowerCase()))
    );
  }

  if (filter.labels && filter.labels.length > 0) {
    const lowerLabels = filter.labels.map((label) => label.toLowerCase());
    results = results.filter((img) =>
      img.labels.some((label) =>
        lowerLabels.some((l) => label.toLowerCase().includes(l))
      )
    );
  }

  if (filter.searchText) {
    const lowerSearch = filter.searchText.toLowerCase();
    results = results.filter(
      (img) =>
        img.description.toLowerCase().includes(lowerSearch) ||
        img.context.toLowerCase().includes(lowerSearch) ||
        img.labels.some((label) => label.toLowerCase().includes(lowerSearch)) ||
        img.tags.some((tag) => tag.toLowerCase().includes(lowerSearch))
    );
  }

  return results;
}

