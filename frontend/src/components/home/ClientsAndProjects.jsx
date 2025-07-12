import React, { useState, useEffect, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { clients } from '../../data/clientsData';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const ClientsAndProjects = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false })
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const toggleAutoplay = () => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    if (autoplay.isPlaying()) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
    setIsAutoPlaying(!isAutoPlaying);
  };

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  // ---  A reusable component for rendering testimonials to avoid code duplication ---
  const TestimonialContent = ({ testimonial }) => {
  // conditional (ternary) operator to check the data type.
  const isList = Array.isArray(testimonial);

  return (
    <div className="text-sm leading-relaxed text-gray-700">
      {isList ? (
        <ul className="space-y-3 list-none">    
          {testimonial.map((item, index) => (
            // Each list item is a flex container for perfect alignment.
            <li key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 mt-1.5 bg-orange-400 rounded-full"></div>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        // If the testimonial is just a string, render it as a simple paragraph.
        <p>{testimonial}</p>
      )}
    </div>
  );
};

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Our Clients and <span className="text-orange-500">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>
        
        {/* --- Carousel for BOTH desktop and mobile --- */}
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {clients.map((client, index) => (
              <div 
                className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.3333%] min-w-0 px-4" 
                key={index}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                  <div className="p-8 pb-6 flex-grow">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                      <Quote className="w-6 h-6 text-white" />
                    </div>
                    <TestimonialContent testimonial={client.testimonial} />
                  </div>
                  <div className="px-8 pb-8">
                    <div className="flex items-center space-x-4 pt-6 border-t border-gray-100">
                      <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-inner flex items-center justify-center p-3 border border-slate-200">
                        <img 
                          src={client.logo} 
                          alt={client.name} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg leading-tight">
                          {client.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center space-x-6 mt-12">
          <button
            onClick={scrollPrev}
            className="w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl border border-gray-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex space-x-2">
            {clients.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-orange-500 scale-110'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={scrollNext}
            className="w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl border border-gray-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-6">
          <button
            onClick={toggleAutoplay}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"
          >
            {isAutoPlaying ? 'Playing' : 'Paused'} • Click to {isAutoPlaying ? 'pause' : 'resume'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClientsAndProjects;