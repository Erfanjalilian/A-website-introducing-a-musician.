'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface BiographyData {
  id: string;
  fullName: string;
  stageName: string;
  title: string;
  location: string;
  shortBio: string;
  profileImage?: {
    url: string;
    alt: string;
    caption?: string;
    sideText: string;
    subText: string;
  };
  biography: {
    introduction: string;
    careerJourney: string;
    artisticApproach: string;
    areasOfActivity: string[];
    philosophy: string;
  };
  skills: string[];
  yearsOfExperience: number;
  availableFor: string[];
  contact: {
    email: string;
    management: string;
    booking: string;
  };
  socialMedia: {
    instagram: string;
    youtube: string;
    spotify: string;
  };
  lastUpdated: string;
}

const Biography = () => {
  const [data, setData] = useState<BiographyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchBiography = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://6988e062780e8375a6895989.mockapi.io/Cv/Biography');
        
        if (!response.ok) {
          throw new Error('Failed to fetch biography data');
        }
        
        const result = await response.json();
        setData(result[0]);
        setError(null);
      } catch (err) {
        setError('There was a problem loading the biography');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBiography();
  }, []);

  if (loading) {
    return (
      <div 
        className="min-h-screen py-20 md:py-28 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-body)' }}
      >
        <div 
          className="absolute top-0 left-0 right-0 h-px opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
        />
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <h1 
            className="font-light text-3xl md:text-4xl tracking-[0.2em] uppercase mb-16"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Biography
          </h1>
          <div className="flex justify-center items-center h-64">
            <div 
              className="animate-spin rounded-full h-10 w-10 border-2 border-transparent animate-pulse-scale"
              style={{ borderTopColor: 'var(--accent)', borderRightColor: 'var(--accent)' }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="min-h-screen py-20 md:py-28 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-body)' }}
      >
        <div 
          className="absolute top-0 left-0 right-0 h-px opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
        />
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <h1 
            className="font-light text-3xl md:text-4xl tracking-[0.2em] uppercase mb-12"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Biography
          </h1>
          <div 
            className="text-center py-12 text-sm tracking-wide"
            style={{ color: 'var(--text-muted)' }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div 
      className="min-h-screen py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-body)' }}
    >
      {/* Accent line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px opacity-30 animate-border-glow"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-10">
        
        {/* Page title */}
        <h1 
          className={`
            font-light text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] uppercase mb-8
            opacity-0
            ${mounted ? 'animate-fade-in-up' : ''}
          `}
          style={{ 
            fontFamily: 'var(--font-display)', 
            color: 'var(--text-primary)',
            animationDelay: '100ms',
            animationFillMode: 'forwards'
          }}
        >
          Biography
        </h1>

        {/* Profile Section with Image and Text */}
        <div 
          className={`
            flex flex-col md:flex-row gap-8 md:gap-12 mb-12
            opacity-0
            ${mounted ? 'animate-fade-in-up' : ''}
          `}
          style={{ 
            animationDelay: '140ms',
            animationFillMode: 'forwards'
          }}
        >
          {/* Profile Image */}
          {data.profileImage && (
            <div className="md:w-1/3">
              <div className="relative aspect-square w-full max-w-[280px] mx-auto md:mx-0 rounded-sm overflow-hidden group">
                <Image
                  src={data.profileImage.url}
                  alt={data.profileImage.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 280px, 33vw"
                />
                {data.profileImage.caption && (
                  <div 
                    className="absolute bottom-0 left-0 right-0 py-2 px-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ 
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {data.profileImage.caption}
                  </div>
                )}
              </div>
              
              {/* Sub text below image */}
              <p 
                className="text-xs tracking-wide mt-3 text-center md:text-left"
                style={{ color: 'var(--text-muted)' }}
              >
                {data.profileImage.subText}
              </p>
            </div>
          )}

          {/* Text next to image */}
          <div className="md:w-2/3 flex flex-col justify-center">
            {data.profileImage?.sideText && (
              <p 
                className="text-lg md:text-xl lg:text-2xl font-light italic leading-relaxed mb-4"
                style={{ color: 'var(--text-dim)', borderLeft: '2px solid var(--accent)', paddingLeft: '1.5rem' }}
              >
                "{data.profileImage.sideText}"
              </p>
            )}

            {/* Stage name and title - moved here for better flow */}
            <div className="mt-2">
              <p className="text-xl md:text-2xl" style={{ color: 'var(--text-dim)' }}>
                {data.stageName}
              </p>
              <p className="text-sm tracking-[0.2em] uppercase mt-1" style={{ color: 'var(--text-muted)' }}>
                {data.title}
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mt-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-muted)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm tracking-wide" style={{ color: 'var(--text-muted)' }}>{data.location}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div 
          className={`
            w-24 h-px mb-14
            opacity-0
            ${mounted ? 'animate-fade-in' : ''}
          `}
          style={{ 
            backgroundColor: 'var(--border-subtle)',
            animationDelay: '180ms',
            animationFillMode: 'forwards'
          }}
        />

        {/* Short Bio - Featured quote */}
        <div 
          className={`
            mb-16 p-8 transition-all duration-500 ease-out
            hover:shadow-[0_0_30px_rgba(201,169,98,0.1)] hover:border-[var(--accent)]
            opacity-0
            ${mounted ? 'animate-fade-in-up' : ''}
          `}
          style={{ 
            border: '1px solid var(--border-subtle)',
            borderRadius: '2px',
            backgroundColor: 'var(--bg-header)',
            animationDelay: '220ms',
            animationFillMode: 'forwards'
          }}
        >
          <p className="text-lg md:text-xl italic leading-relaxed" style={{ color: 'var(--text-primary)' }}>
            "{data.shortBio}"
          </p>
        </div>

        {/* Biography sections */}
        <div className="space-y-12">
          {/* Introduction */}
          <section
            className={`
              opacity-0
              ${mounted ? 'animate-fade-in-up' : ''}
            `}
            style={{ 
              animationDelay: '260ms',
              animationFillMode: 'forwards'
            }}
          >
            <h2 
              className="text-sm tracking-[0.3em] uppercase mb-6"
              style={{ color: 'var(--accent)' }}
            >
              Introduction
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-dim)' }}>
              {data.biography.introduction}
            </p>
          </section>

          {/* Career Journey */}
          <section
            className={`
              opacity-0
              ${mounted ? 'animate-fade-in-up' : ''}
            `}
            style={{ 
              animationDelay: '300ms',
              animationFillMode: 'forwards'
            }}
          >
            <h2 
              className="text-sm tracking-[0.3em] uppercase mb-6"
              style={{ color: 'var(--accent)' }}
            >
              Career Journey
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-dim)' }}>
              {data.biography.careerJourney}
            </p>
          </section>

          {/* Artistic Approach */}
          <section
            className={`
              opacity-0
              ${mounted ? 'animate-fade-in-up' : ''}
            `}
            style={{ 
              animationDelay: '340ms',
              animationFillMode: 'forwards'
            }}
          >
            <h2 
              className="text-sm tracking-[0.3em] uppercase mb-6"
              style={{ color: 'var(--accent)' }}
            >
              Artistic Approach
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-dim)' }}>
              {data.biography.artisticApproach}
            </p>
          </section>

          {/* Philosophy */}
          <section
            className={`
              opacity-0
              ${mounted ? 'animate-fade-in-up' : ''}
            `}
            style={{ 
              animationDelay: '380ms',
              animationFillMode: 'forwards'
            }}
          >
            <h2 
              className="text-sm tracking-[0.3em] uppercase mb-6"
              style={{ color: 'var(--accent)' }}
            >
              Philosophy
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-dim)' }}>
              {data.biography.philosophy}
            </p>
          </section>

          {/* Areas of Activity */}
          <section
            className={`
              opacity-0
              ${mounted ? 'animate-fade-in-up' : ''}
            `}
            style={{ 
              animationDelay: '420ms',
              animationFillMode: 'forwards'
            }}
          >
            <h2 
              className="text-sm tracking-[0.3em] uppercase mb-6"
              style={{ color: 'var(--accent)' }}
            >
              Areas of Activity
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {data.biography.areasOfActivity.map((activity, index) => (
                <div 
                  key={index}
                  className="px-4 py-2 text-sm transition-all duration-300 ease-out hover:bg-white/5 hover:border-[var(--accent)] cursor-default"
                  style={{ 
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)'
                  }}
                >
                  {activity}
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section
            className={`
              opacity-0
              ${mounted ? 'animate-fade-in-up' : ''}
            `}
            style={{ 
              animationDelay: '460ms',
              animationFillMode: 'forwards'
            }}
          >
            <h2 
              className="text-sm tracking-[0.3em] uppercase mb-6"
              style={{ color: 'var(--accent)' }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-4 py-1.5 text-sm transition-all duration-300 ease-out hover:bg-white/5 hover:border-[var(--accent)] cursor-default"
                  style={{ 
                    backgroundColor: 'var(--bg-header)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-dim)'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Available For */}
          <section
            className={`
              opacity-0
              ${mounted ? 'animate-fade-in-up' : ''}
            `}
            style={{ 
              animationDelay: '500ms',
              animationFillMode: 'forwards'
            }}
          >
            <h2 
              className="text-sm tracking-[0.3em] uppercase mb-6"
              style={{ color: 'var(--accent)' }}
            >
              Available For
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.availableFor.map((item, index) => (
                <span 
                  key={index}
                  className="px-4 py-1.5 text-sm transition-all duration-300 ease-out hover:bg-white/5 hover:border-[var(--accent)] cursor-default"
                  style={{ 
                    backgroundColor: 'var(--bg-header)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-dim)'
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section
            className={`
              opacity-0
              ${mounted ? 'animate-fade-in-up' : ''}
            `}
            style={{ 
              animationDelay: '540ms',
              animationFillMode: 'forwards'
            }}
          >
            <div 
              className="p-6 transition-all duration-300 ease-out hover:shadow-[0_0_25px_rgba(201,169,98,0.1)] hover:border-[var(--accent)]"
              style={{ 
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-header)'
              }}
            >
              <p className="text-sm tracking-wide" style={{ color: 'var(--text-muted)' }}>
                Years of Experience
              </p>
              <p className="text-2xl mt-1" style={{ color: 'var(--accent)' }}>
                {data.yearsOfExperience} years
              </p>
            </div>
          </section>
        </div>

        {/* Contact Information */}
        <div 
          className={`
            mt-16 pt-8
            opacity-0
            ${mounted ? 'animate-fade-in-up' : ''}
          `}
          style={{ 
            borderTop: '1px solid var(--border-subtle)',
            animationDelay: '580ms',
            animationFillMode: 'forwards'
          }}
        >
          <h2 
            className="text-sm tracking-[0.3em] uppercase mb-6"
            style={{ color: 'var(--accent)' }}
          >
            Contact
          </h2>
          
          <div className="space-y-3 text-sm">
            <p style={{ color: 'var(--text-dim)' }}>
              <span className="inline-block w-24 tracking-wide" style={{ color: 'var(--text-muted)' }}>Email:</span>
              {data.contact.email}
            </p>
            <p style={{ color: 'var(--text-dim)' }}>
              <span className="inline-block w-24 tracking-wide" style={{ color: 'var(--text-muted)' }}>Management:</span>
              {data.contact.management}
            </p>
            <p style={{ color: 'var(--text-dim)' }}>
              <span className="inline-block w-24 tracking-wide" style={{ color: 'var(--text-muted)' }}>Booking:</span>
              {data.contact.booking}
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div 
          className={`
            mt-8 flex gap-6
            opacity-0
            ${mounted ? 'animate-fade-in-up' : ''}
          `}
          style={{ 
            animationDelay: '620ms',
            animationFillMode: 'forwards'
          }}
        >
          {Object.entries(data.socialMedia).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm capitalize transition-all duration-300 ease-out hover:opacity-80 hover:text-[var(--accent)] skill-hover relative"
              style={{ color: 'var(--text-muted)' }}
            >
              {platform}
            </a>
          ))}
        </div>

        {/* Last Updated */}
        <div 
          className={`
            mt-12 text-xs
            opacity-0
            ${mounted ? 'animate-fade-in' : ''}
          `}
          style={{ 
            color: 'var(--text-dim)',
            animationDelay: '660ms',
            animationFillMode: 'forwards'
          }}
        >
          Last updated: {new Date(data.lastUpdated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Animation keyframes - add to your global CSS or use Tailwind's @layer */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Biography;