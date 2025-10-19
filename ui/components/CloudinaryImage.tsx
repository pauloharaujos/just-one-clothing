'use client';

import { CldImage } from 'next-cloudinary';
import { getCloudinaryPublicId } from '@/services/cloudinary/cloudinaryService';

interface CloudinaryImageProps {
  sku: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function CloudinaryImage({
  sku,
  alt,
  width,
  height,
  className
}: CloudinaryImageProps) {
  return (
    <CldImage
      src={getCloudinaryPublicId(sku)}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
