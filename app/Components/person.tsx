'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PersonProps {
  name?: string;
  role?: string;
  description?: string;
  imageUrl?: string;
}

const Person = ({
  name = "Arash Kazemi",
  role = "Musician & Sound Designer",
  description = "Crafting sonic experiences through innovative sound design, music production, and audio engineering. Pushing the boundaries of what's possible in sound.",
  imageUrl = "https://bandzoogle.com/files/2929/bz-blog-new-stock-images.jpg"
}: PersonProps) => {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Parallax effect for the image
  const imageTranslateY = scrollY * 0.5;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Full-screen image with parallax */}
      <div 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ 
          transform: `translateY(${imageTranslateY}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Semi-transparent black overlay - this keeps the image visible underneath */}
      <div className="absolute inset-0 bg-black/50" />
      {/* The /50 means 50% opacity, so the image is still 50% visible through the overlay */}

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-6 md:px-10 text-center">
          {/* Name with animation */}
          <h1 
            className={`
              font-light tracking-[0.15em] uppercase mb-4
              text-3xl md:text-5xl lg:text-6xl xl:text-7xl
              opacity-0 translate-y-8
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : ''}
            `}
            style={{ 
              fontFamily: 'var(--font-display)',
              color: 'white',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            {name}
          </h1>

          {/* Role with animation (delayed) */}
          <h2 
            className={`
              font-light tracking-[0.3em] uppercase mb-6
              text-sm md:text-base lg:text-lg
              opacity-0 translate-y-8
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : ''}
            `}
            style={{ 
              color: 'rgba(255,255,255,0.9)',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transitionDelay: '200ms'
            }}
          >
            {role}
          </h2>

          {/* Description with animation (further delayed) */}
          <p 
            className={`
              max-w-2xl mx-auto
              font-light leading-relaxed
              text-sm md:text-base lg:text-lg
              opacity-0 translate-y-8
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : ''}
            `}
            style={{ 
              color: 'rgba(255,255,255,0.8)',
              textShadow: '0 2px 6px rgba(0,0,0,0.3)',
              transitionDelay: '400ms'
            }}
          >
            {description}
          </p>

          {/* Decorative line with animation */}
          <div 
            className={`
              w-16 h-px mx-auto mt-8
              opacity-0 scale-x-0
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 scale-x-100' : ''}
            `}
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.4)',
              transitionDelay: '600ms'
            }}
          />

          {/* Scroll indicator with animation */}
          <div 
            className={`
              absolute bottom-8 left-1/2 transform -translate-x-1/2
              flex flex-col items-center gap-2
              opacity-0
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100' : ''}
            `}
            style={{ 
              transitionDelay: '800ms'
            }}
          >
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Scroll
            </span>
            <div className="w-5 h-9 rounded-full border border-white/30 flex justify-center">
              <div 
                className="w-1 h-2 rounded-full mt-2 animate-bounce"
                style={{ backgroundColor: 'white' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Person;