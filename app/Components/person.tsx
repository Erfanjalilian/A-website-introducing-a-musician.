'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PersonProps {
  name?: string;
  skills?: string[];
  imageUrl?: string;
}

const Person = ({
  name = "Arash Kazemi",
  skills = [
     'Design ',
     'Mixing',
     'Editing',
     'Music Production',
     'Recording',
     'SFX',
     'VO'
  ],
  imageUrl = "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
}: PersonProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section 
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-body)' }}
    >
      {/* Subtle accent line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px opacity-30 animate-border-glow"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
      />

      <div className="w-full max-w-5xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          
          {/* Left - Profile Image */}
          <div 
            className={`
              flex-shrink-0
              opacity-0
              ${mounted ? 'animate-fade-in-up' : ''}
            `}
            style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
          >
            <div 
              className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] overflow-hidden
                         transition-all duration-500 ease-out profile-image-glow"
              style={{ 
                borderRadius: '2px',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <Image
                src={imageUrl}
                alt={name}
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Right - Name & Skills */}
          <div className="flex-1 text-center md:text-right">
            <h2 
              className={`
                font-light tracking-[0.15em] uppercase mb-6 md:mb-8
                text-2xl md:text-3xl lg:text-[2rem]
                opacity-0
                ${mounted ? 'animate-fade-in-up' : ''}
              `}
              style={{ 
                fontFamily: 'var(--font-display)',
                color: 'var(--text-primary)',
                animationDelay: '200ms',
                animationFillMode: 'forwards'
              }}
            >
              {name}
            </h2>
            
            <div className="space-y-4 md:space-y-5">
              {skills.map((skill, index) => (
                <p
                  key={index}
                  className={`
                    text-sm md:text-base font-light leading-relaxed
                    opacity-0 relative
                    ${mounted ? 'animate-fade-in-up skill-hover' : ''}
                  `}
                  style={{ 
                    color: 'var(--text-muted)',
                    animationDelay: `${300 + index * 80}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
              {skill}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Person;
