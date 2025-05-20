import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ApartmentGalleryProps {
  mainImage?: string;
  images?: string[];
}

const ApartmentGallery = ({ mainImage, images: propImages }: ApartmentGalleryProps) => {
  const [images, setImages] = useState<string[]>(propImages || []);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const currentImage = images[currentImageIndex] || "";
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);
  
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

  // Listen for keyboard navigation in standard view
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!showModal && galleryRef.current) {
        // Only handle keyboard events when the gallery is in focus/viewport
        if (event.key === 'ArrowLeft') {
          handlePrevious();
        } else if (event.key === 'ArrowRight') {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal, currentImageIndex]);

  // Handle modal open/close
  useEffect(() => {
    if (showModal) {
      // Function to prevent default for arrow keys only
      const handleModalKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setShowModal(false);
        } else if (event.key === 'ArrowLeft') {
          // Only prevent default for arrow keys
          event.preventDefault();
          handlePrevious();
        } else if (event.key === 'ArrowRight') {
          // Only prevent default for arrow keys
          event.preventDefault();
          handleNext();
        }
      };
      
      // Add the keydown event listener 
      window.addEventListener('keydown', handleModalKeyDown);
      
      return () => {
        // Remove listener
        window.removeEventListener('keydown', handleModalKeyDown);
      };
    }
  }, [showModal, currentImageIndex]);
  
  // Create a modal overlay when the modal is shown
  useEffect(() => {
    if (showModal) {
      // Create a modal overlay using regular DOM
      // This ensures it appears over maps and calendars
      const modalRoot = document.createElement('div');
      modalRoot.id = 'gallery-modal-root';
      modalRoot.style.position = 'fixed';
      modalRoot.style.top = '0';
      modalRoot.style.left = '0';
      modalRoot.style.right = '0';
      modalRoot.style.bottom = '0';
      modalRoot.style.zIndex = '9998';
      
      // Use transparent background so we don't add another dark layer
      modalRoot.style.background = 'transparent'; 
      modalRoot.style.pointerEvents = 'none'; // Don't block clicks
      
      document.body.appendChild(modalRoot);
      
      return () => {
        // Clean up when component unmounts
        const root = document.getElementById('gallery-modal-root');
        if (root && root.parentNode) {
          root.parentNode.removeChild(root);
        }
      };
    }
  }, [showModal]);

  useEffect(() => {
    const body = document.body;
    if (showModal) {
      body.classList.add("modal-open");
    } else {
      body.classList.remove("modal-open");
    }
  }, [showModal]);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handlePrevious = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openModal = () => {
    setShowModal(true);
    // Add focus to the modal container to ensure keyboard events work properly
    window.setTimeout(() => {
      const modalElement = document.querySelector('.gallery-modal');
      if (modalElement) {
        (modalElement as HTMLElement).focus();
      }
    }, 100);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Close modal when clicking outside the image
  const handleModalBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
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
    <div ref={galleryRef} className="gallery-container pt-4 md:pt-6">
      {/* Main Image with Navigation Arrows */}
      <div className="relative w-full aspect-video bg-neutral mb-4 rounded-lg overflow-hidden group">
        <img
          src={currentImage}
          alt="Apartment view"
          className="w-full h-full object-cover cursor-pointer"
          onClick={openModal}
        />
        
        {/* Navigation Arrows */}
        <button 
          onClick={(e) => handlePrevious(e)}
          onMouseDown={(e) => e.preventDefault()}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-primary" />
        </button>
        
        <button 
          onClick={(e) => handleNext(e)}
          onMouseDown={(e) => e.preventDefault()}
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
      
      {/* Single row of scrollable thumbnails */}
      <div className="w-full">
        <div className="relative overflow-hidden w-full">
          <div 
            ref={thumbnailsContainerRef}
            className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-3 w-full"
          >
            {images.map((image: string, index: number) => (
              <div
                key={index}
                ref={el => thumbnailRefs.current[index] = el}
                className={`flex-none w-[calc(25%-1.5px)] sm:w-[calc(20%-1.6px)] md:w-[calc(16.66%-1.7px)] xl:w-[calc(14.28%-1.7px)] bg-neutral rounded-lg overflow-hidden cursor-pointer transition-all ${
                  currentImageIndex === index ? "ring-2 ring-primary scale-95" : "hover:scale-95"
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <div className="aspect-square w-full">
                  <img
                    src={image}
                    alt={`Apartment thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal/Lightbox with Animations */}
      <div 
        className={`gallery-modal fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out ${
          showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ 
          isolation: 'isolate', 
          paddingTop: 'calc(var(--header-height) + 2rem)',
          paddingBottom: '2rem',
          height: '100vh'
        }}
        onClick={handleModalBackdropClick}
        tabIndex={0}
        aria-modal="true"
        role="dialog"
        aria-label="Image gallery"
      >
        {/* Left Arrow - Fixed at left edge */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handlePrevious();
          }}
          onMouseDown={(e) => e.preventDefault()}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 transition-all z-[9999] shadow-lg"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        
        {/* Right Arrow - Fixed at right edge */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleNext();
          }}
          onMouseDown={(e) => e.preventDefault()}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 transition-all z-[9999] shadow-lg"
          aria-label="Next image"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
        
        <div 
          className={`relative max-w-[90vw] max-h-[calc(100vh-var(--header-height)-2rem)] transition-transform duration-300 ${
            showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
            onMouseDown={(e) => e.preventDefault()}
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-all z-10"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
          
          <img
            src={currentImage}
            alt="Large view"
            className="max-w-full max-h-[calc(100vh-var(--header-height)-4rem)] object-contain rounded-lg shadow-xl select-none"
            onDragStart={(e) => e.preventDefault()}
          />
          
          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full z-10">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>

        {/* Modal Thumbnails */}
        <div className="mt-4 max-w-[90vw] w-full overflow-x-auto hide-scrollbar px-2">
          <div className="flex items-center justify-center gap-2 pb-2">
            {images.map((img, idx) => (
              <div 
                key={`modal-thumb-${idx}`}
                className={`flex-none h-16 w-16 sm:h-20 sm:w-20 bg-black cursor-pointer rounded overflow-hidden transition-all duration-200 ${
                  idx === currentImageIndex 
                    ? 'border-2 border-primary scale-105 shadow-lg' 
                    : 'opacity-70 hover:opacity-100'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
              >
                <img 
                  src={img} 
                  alt={`Thumbnail ${idx + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentGallery;