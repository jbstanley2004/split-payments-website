/**
 * Image Metadata Types and Utilities
 * 
 * This module provides types and utilities for working with image metadata
 * that helps AI agents understand what kind of images are in the repository.
 */

export type ImageCategory =
  | "logo"
  | "icon"
  | "photo"
  | "ui-screenshot"
  | "payment-card-logo"
  | "branding"
  | "illustration"
  | "industry"
  | "other";

export interface ImageMetadata {
  path: string;
  category: ImageCategory;
  labels: string[];
  tags: string[];
  description: string;
  context: string;
}

export interface ImageMetadataCollection {
  version: string;
  lastUpdated: string;
  images: ImageMetadata[];
}

/**
 * Load image metadata from the JSON file
 */
export async function loadImageMetadata(): Promise<ImageMetadataCollection> {
  try {
    const response = await fetch("/image-metadata.json");
    if (!response.ok) {
      throw new Error(`Failed to load image metadata: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error loading image metadata:", error);
    throw error;
  }
}

/**
 * Get metadata for a specific image by path
 */
export async function getImageMetadata(
  imagePath: string
): Promise<ImageMetadata | null> {
  const metadata = await loadImageMetadata();
  return (
    metadata.images.find(
      (img) => img.path === imagePath || img.path === `/${imagePath}`
    ) || null
  );
}

/**
 * Search images by tags
 */
export async function searchImagesByTags(
  tags: string[]
): Promise<ImageMetadata[]> {
  const metadata = await loadImageMetadata();
  const lowerTags = tags.map((tag) => tag.toLowerCase());
  return metadata.images.filter((img) =>
    img.tags.some((tag) => lowerTags.includes(tag.toLowerCase()))
  );
}

/**
 * Search images by category
 */
export async function searchImagesByCategory(
  category: ImageCategory
): Promise<ImageMetadata[]> {
  const metadata = await loadImageMetadata();
  return metadata.images.filter((img) => img.category === category);
}

/**
 * Search images by label
 */
export async function searchImagesByLabel(
  label: string
): Promise<ImageMetadata[]> {
  const metadata = await loadImageMetadata();
  const lowerLabel = label.toLowerCase();
  return metadata.images.filter((img) =>
    img.labels.some((l) => l.toLowerCase().includes(lowerLabel))
  );
}

/**
 * Search images by description or context
 */
export async function searchImagesByText(
  searchText: string
): Promise<ImageMetadata[]> {
  const metadata = await loadImageMetadata();
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
 * Get all unique categories
 */
export async function getAllCategories(): Promise<ImageCategory[]> {
  const metadata = await loadImageMetadata();
  const categories = new Set<ImageCategory>();
  metadata.images.forEach((img) => categories.add(img.category));
  return Array.from(categories);
}

/**
 * Get all unique tags
 */
export async function getAllTags(): Promise<string[]> {
  const metadata = await loadImageMetadata();
  const tags = new Set<string>();
  metadata.images.forEach((img) => {
    img.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get metadata for multiple images by paths
 */
export async function getMultipleImageMetadata(
  imagePaths: string[]
): Promise<Map<string, ImageMetadata>> {
  const metadata = await loadImageMetadata();
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
 * Filter images by multiple criteria
 */
export interface ImageFilter {
  categories?: ImageCategory[];
  tags?: string[];
  labels?: string[];
  searchText?: string;
}

export async function filterImages(
  filter: ImageFilter
): Promise<ImageMetadata[]> {
  const metadata = await loadImageMetadata();
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

