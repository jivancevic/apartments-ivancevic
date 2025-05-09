import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ApartmentGalleryProps {
  mainImage?: string;
  images?: string[];
}

const ApartmentGallery = ({ mainImage, images: propImages }: ApartmentGalleryProps) => {
  const [images, setImages] = useState<string[]>(propImages || []);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentImage = images[currentImageIndex] || "";
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Initialize thumbnailRefs with the correct length
  useEffect(() => {
    thumbnailRefs.current = Array(images.length).fill(null);
  }, [images.length]);
  
  // Set images when propImages change
  useEffect(() => {
    if (propImages && propImages.length > 0) {
      setImages(propImages);
      setIsLoading(false);
    }
  }, [propImages]);

  // Scroll selected thumbnail into view
  useEffect(() => {
    const selectedThumbnail = thumbnailRefs.current[currentImageIndex];
    if (selectedThumbnail && thumbnailsContainerRef.current) {
      selectedThumbnail.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentImageIndex]);

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
      
      {/* Thumbnails - Horizontal Scrollable */}
      <div 
        ref={thumbnailsContainerRef}
        className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        style={{ scrollbarWidth: 'thin' }}
      >
        {images.map((image: string, index: number) => (
          <div
            key={index}
            ref={el => thumbnailRefs.current[index] = el}
            className={`flex-none w-20 h-20 bg-neutral rounded-lg overflow-hidden cursor-pointer transition-all ${
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