'use client';

import { memo, useState } from "react";
import Image from "next/image";

interface TripImageProps {
  imageLinks: string[],
  alt: string,
  sizes: string,
  isInCollection?: boolean,
}

const TripImage: React.FC<TripImageProps> 
= ({ imageLinks, alt, sizes, isInCollection = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTripImages, setIsTripImages] = useState(!!imageLinks.length);
  const handleImageError = () => {
    if (currentImageIndex + 1 < imageLinks.length) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setIsTripImages(false);
    }
  };

  return (
    <>
      {isTripImages ? (
        <Image
          src={imageLinks[currentImageIndex]}
          alt={alt}
          fill
          sizes={sizes}
          className="cursor-pointer object-cover"
          onError={handleImageError}
        />
      ) : (
        <div 
          className="absolute inset-0 flex 
          items-center justify-center bg-gray-30"
        >
          <Image 
            src="/trip-default.webp" 
            alt="No card images"
            width={isInCollection ? 70 : 120}
            height={isInCollection ? 70 : 120}
            className={isInCollection ? "h-20 w-20" : "h-32 w-32"}
            priority={true}
          />
        </div>
      )}
    </>
  );
};

export default memo(TripImage);