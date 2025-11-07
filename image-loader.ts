interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({
  src,
  width,
  quality = 80,
}: ImageLoaderParams): string {
  // Return the source as-is for local images
  // This allows Next.js to serve images from the public directory
  return src;
}
