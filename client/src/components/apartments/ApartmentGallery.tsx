import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ApartmentGalleryProps {
  imagesPath?: string;
  mainImage?: string;
  images?: string[];
}

const ApartmentGallery = ({ imagesPath, mainImage, images: propImages }: ApartmentGalleryProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentImage = images[currentImageIndex] || "";
  
  useEffect(() => {
    if (!imagesPath) {
      setIsLoading(false);
      return;
    }
    
    // Function to check if an image exists using fetch HEAD request
    async function checkImageExists(url: string): Promise<boolean> {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
      } catch (error) {
        return false;
      }
    }
    
    // Function to load images dynamically
    async function loadImages() {
      setIsLoading(true);
      const foundImages: string[] = [];
      // Using non-null assertion since we've already checked
      const path = imagesPath!;
      const normalizedPath = path.endsWith("/") ? path : `${path}/`;
      
      // Try to load up to 20 images
      for (let i = 1; i <= 20; i++) {
        const imageUrl = `${normalizedPath}${i}.jpg`;
        const exists = await checkImageExists(imageUrl);
        
        if (exists) {
          foundImages.push(imageUrl);
        } else {
          // Stop checking when an image doesn't exist
          break;
        }
      }
      
      setImages(foundImages);
      setIsLoading(false);
    }
    
    loadImages();
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

  if (isLoading) {
    return (
      <div className="aspect-video bg-neutral mb-4 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Loading images...</p>
      </div>
    );
  }
  
  if (images.length === 0) {
    return (
      <div className="aspect-video bg-neutral mb-4 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
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