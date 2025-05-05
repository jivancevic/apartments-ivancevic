import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ApartmentGalleryProps {
  imagesPath: string;
}

const ApartmentGallery = ({ imagesPath }: ApartmentGalleryProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const currentImage = images[currentImageIndex] || "";
  
  useEffect(() => {
    // In a real application, we would fetch the list of images from the server
    // For now, we'll generate paths for 5 sample images in alphabetical order
    const baseUrl = imagesPath.endsWith('/') ? imagesPath : `${imagesPath}/`;
    const generatedImages = [
      `${baseUrl}1.jpg`,
      `${baseUrl}2.jpg`,
      `${baseUrl}3.jpg`,
      `${baseUrl}4.jpg`,
      `${baseUrl}5.jpg`,
    ];
    
    setImages(generatedImages);
  }, [imagesPath]);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (images.length === 0) {
    return (
      <div className="aspect-video bg-neutral mb-4 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Loading images...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Main Image with Navigation Arrows */}
      <div className="relative aspect-video bg-neutral mb-4 rounded-lg overflow-hidden group">
        <img
          src={currentImage}
          alt="Apartment view"
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        <button 
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-primary" />
        </button>
        
        <button 
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-primary" />
        </button>
        
        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-sm px-2 py-1 rounded">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.slice(0, 4).map((image: string, index: number) => (
          <div
            key={index}
            className={`aspect-square bg-neutral rounded-lg overflow-hidden cursor-pointer transition-all ${
              currentImageIndex === index ? "ring-2 ring-primary scale-95" : "hover:scale-95"
            }`}
            onClick={() => handleThumbnailClick(index)}
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