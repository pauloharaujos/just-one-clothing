/**
 * Get Cloudinary public ID for a product image based on SKU
 * Images are stored in the 'images/' folder in Cloudinary
 */
export function getCloudinaryPublicId(sku: string): string {
  return `${sku}`;
}

