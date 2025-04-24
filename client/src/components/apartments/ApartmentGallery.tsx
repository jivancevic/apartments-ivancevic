import { useState } from "react";

interface ApartmentGalleryProps {
  mainImage: string;
  images: string[];
}

const ApartmentGallery = ({ mainImage, images }: ApartmentGalleryProps) => {
  const [currentImage, setCurrentImage] = useState<string>(mainImage);

  const handleThumbnailClick = (image: string) => {
    setCurrentImage(image);
  };

  // Combine main image with gallery images
  const allImages = [mainImage, ...images];

  return (
    <div>
      {/* Main Image */}
      <div className="aspect-video bg-neutral mb-4 rounded-lg overflow-hidden">
        <img
          src={currentImage}
          alt="Apartment view"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {allImages.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className={`aspect-square bg-neutral rounded-lg overflow-hidden cursor-pointer ${
              currentImage === image ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleThumbnailClick(image)}
          >
            <img
              src={image}
              alt={`Apartment thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApartmentGallery;
