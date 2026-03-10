import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

const ProjectGallery = ({ images = [], onImageClick, theme = 'light', fullHeight = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isDark = theme === 'dark'

  // Reset index when images change
  useEffect(() => {
    setCurrentIndex(0)
  }, [images])

  if (!images || images.length === 0) return null

  const handlePrev = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div className={`flex flex-col gap-4 ${fullHeight ? 'h-full' : ''}`}>
      {/* Main Image Container */}
      <div className={`relative group w-full rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 bg-slate-100 dark:bg-slate-900/50 shadow-sm ${
        fullHeight ? 'flex-1 min-h-0' : 'aspect-video'
      }`}>
        
        {/* Blurred Background Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110 transition-all duration-700"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />
        
        {/* Main Image */}
        <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
          <img 
            src={images[currentIndex]} 
            alt={`Screenshot ${currentIndex + 1}`} 
            className="w-full h-full object-contain relative z-10 transition-transform duration-500 hover:scale-[1.01] cursor-pointer drop-shadow-2xl"
            onClick={() => onImageClick && onImageClick(images[currentIndex])}
          />
        </div>

        {/* Hover Overlay Icon */}
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="p-2 rounded-full bg-black/50 text-white backdrop-blur-sm">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
        
        {/* Counter Badge */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-xs font-medium backdrop-blur-md z-20">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails Strip */}
      {images.length > 1 && (
        <div className="relative">
          <div className="flex gap-3 overflow-x-auto pb-4 pt-1 px-1 hide-scrollbar snap-x">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative shrink-0 h-20 rounded-lg overflow-hidden transition-all duration-300 snap-center group/thumb ${
                  currentIndex === idx 
                    ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-transparent shadow-lg scale-105 z-10' 
                    : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
                style={{
                  aspectRatio: 'auto', // Allow natural aspect ratio
                  minWidth: '3.5rem'   // Prevent too narrow for portrait
                }}
              >
                {/* Thumbnail Background Blur */}
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-sm opacity-50"
                  style={{ backgroundImage: `url(${img})` }}
                />
                
                {/* Actual Thumbnail Image */}
                <img 
                  src={img} 
                  alt={`Thumbnail ${idx + 1}`} 
                  className="h-full w-auto object-contain relative z-10 mx-auto"
                />
                
                {/* Active Indicator Overlay */}
                {currentIndex !== idx && (
                  <div className="absolute inset-0 bg-black/10 group-hover/thumb:bg-transparent transition-colors z-20" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectGallery
