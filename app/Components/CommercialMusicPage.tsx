'use client';

import { useState, useEffect } from 'react';
import { PlayIcon, FilmIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface PortfolioMedia {
  type: 'video' | 'audio';
  url: string;
}

interface PortfolioProject {
  id: string;
  projectTitle: string;
  shortDescription: string;
  media: PortfolioMedia;
  projectImage?: {
    url: string;
    alt: string;
    caption: string;
    sideText: string;
    subText: string;
  };
}

interface PortfolioSection {
  id: string;
  title: string;
  description: string;
  projects: PortfolioProject[];
  sectionImage?: {
    url: string;
    alt: string;
    caption: string;
    sideText: string;
    subText: string;
  };
}

interface HeaderImage {
  url: string;
  alt: string;
  caption: string;
  sideText: string;
  subText: string;
}

interface PortfolioData {
  id: string;
  pageTitle: string;
  description: string;
  headerImage: HeaderImage;
  sections: PortfolioSection[];
  lastUpdated: string;
}

// Extract video ID helper
const extractVideoId = (url: string): string | null => {
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  if (youtubeMatch) return youtubeMatch[1];
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return vimeoMatch[1];
  return null;
};

// Embed URL helper
const getEmbedUrl = (url: string, type: 'video' | 'audio'): string => {
  if (type === 'audio') {
    if (url.includes('soundcloud.com')) {
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23c9a962&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`;
    }
    if (url.includes('open.spotify.com')) {
      const trackId = url.split('/track/')[1]?.split('?')[0];
      if (trackId) return `https://open.spotify.com/embed/track/${trackId}`;
    }
    return url;
  } else {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const id = extractVideoId(url);
      if (id) return `https://www.youtube.com/embed/${id}?rel=0&showinfo=0&color=white`;
    }
    if (url.includes('vimeo.com')) {
      const id = extractVideoId(url);
      if (id) return `https://player.vimeo.com/video/${id}?color=c9a962&title=0&byline=0&portrait=0`;
    }
    return url;
  }
};

const PortfolioPage = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeMedia, setActiveMedia] = useState<{ [key: string]: boolean }>({});

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://6988e062780e8375a6895989.mockapi.io/Cv/data');
        const text = await response.text();

        let jsonData;
        try {
          jsonData = JSON.parse(text);
        } catch {
          throw new Error('Response is not valid JSON');
        }

        if (Array.isArray(jsonData)) {
          setData(jsonData[0]);
        } else if (typeof jsonData === 'object' && jsonData !== null) {
          setData(jsonData as PortfolioData);
        } else {
          throw new Error('Unexpected JSON structure');
        }

      } catch (err: any) {
        console.error(err);
        setError(err.message || 'There was a problem loading the portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const toggleMedia = (projectId: string) =>
    setActiveMedia(prev => ({ ...prev, [projectId]: !prev[projectId] }));

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1a1616' }}>
      <div className="animate-pulse-scale rounded-full h-12 w-12 border-2 border-transparent" style={{ borderTopColor: '#c9a962', borderRightColor: '#c9a962' }} />
    </div>
  );
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <div className="min-h-screen py-16 md:py-20 lg:py-32 relative overflow-hidden" style={{ backgroundColor: '#1a1616' }}>
      {/* Decorative elements - adjusted for mobile */}
      <div className="absolute top-0 left-1/4 w-48 md:w-96 h-48 md:h-96 rounded-full blur-3xl -translate-y-1/2 pointer-events-none animate-fade-in" style={{ backgroundColor: 'rgba(201, 169, 98, 0.05)', animationDelay: '200ms', animationFillMode: 'forwards' }} />
      <div className="absolute bottom-0 right-1/4 w-48 md:w-96 h-48 md:h-96 rounded-full blur-3xl translate-y-1/2 pointer-events-none animate-fade-in" style={{ backgroundColor: 'rgba(201, 169, 98, 0.05)', animationDelay: '300ms', animationFillMode: 'forwards' }} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Header Section */}
        <div className="mb-12 md:mb-16 lg:mb-24">
          <div className="inline-block mb-4 md:mb-6 px-3 md:px-4 py-1.5 md:py-2 rounded-full opacity-0 animate-fade-in-up" style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)', borderColor: 'rgba(201, 169, 98, 0.3)', borderWidth: '1px', animationDelay: '100ms', animationFillMode: 'forwards' }}>
            <p className="text-[10px] md:text-xs tracking-widest uppercase font-medium" style={{ color: 'rgba(201, 169, 98, 0.8)' }}>Portfolio</p>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-tight mb-8 md:mb-10 leading-tight opacity-0 animate-fade-in-up" style={{ color: '#f5f2ed', animationDelay: '150ms', animationFillMode: 'forwards' }}>
            {data.pageTitle}
          </h1>
          
          {/* Header Image with Side Text */}
          {data.headerImage && (
            <div className="mb-8 md:mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '175ms', animationFillMode: 'forwards' }}>
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10">
                {/* Image Container - 2/3 width on desktop */}
                <div className="w-full md:w-2/3">
                  <div className="relative w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[320px] rounded-lg md:rounded-xl overflow-hidden shadow-xl md:shadow-2xl">
                    <Image
                      src={data.headerImage.url}
                      alt={data.headerImage.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 66vw, 800px"
                    />
                  </div>
                  {/* SubText - Below image on all screens */}
                  <div className="mt-3 md:mt-4">
                    <p className="text-xs sm:text-sm md:text-base" style={{ color: '#9a9590' }}>
                      {data.headerImage.subText}
                    </p>
                  </div>
                </div>
                
                {/* Side Text Container - 1/3 width on desktop */}
                <div className="w-full md:w-1/3 flex flex-col justify-center">
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-relaxed" style={{ color: '#c9a962' }}>
                    {data.headerImage.sideText}
                  </p>
                  <p className="text-[10px] sm:text-xs mt-2 md:mt-3 tracking-wider uppercase" style={{ color: '#6b6662' }}>
                    {data.headerImage.caption}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed font-light opacity-0 animate-fade-in-up" style={{ color: '#9a9590', animationDelay: '200ms', animationFillMode: 'forwards' }}>
            {data.description}
          </p>
        </div>

        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          {data.sections.map((section, sIdx) => (
            <section key={section.id} className="relative opacity-0 animate-fade-in-up" style={{ animationDelay: `${250 + sIdx * 100}ms`, animationFillMode: 'forwards' }}>
              {/* Section Header */}
              <div className="mb-8 md:mb-10 lg:mb-14 relative">
                <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4">
                  <div className="h-0.5 md:h-1 w-8 md:w-12 rounded bg-gradient-to-r from-[#c9a962] to-[#c9a962]/50 transform origin-left" style={{ background: '#c9a962', animation: `scale-x 0.6s ease-out ${'300 + sIdx * 100'}ms forwards`, transformOrigin: 'left' }} />
                  <h2 className="text-base md:text-lg lg:text-2xl tracking-wide uppercase font-light" style={{ color: '#c9a962' }}>{section.title}</h2>
                </div>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed ml-8 md:ml-16" style={{ color: '#6b6662' }}>{section.description}</p>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
                {section.projects.map((project, pIdx) => (
                  <article key={project.id} className="group relative h-full opacity-0 animate-fade-in-up" style={{ animationDelay: `${300 + sIdx * 100 + pIdx * 80}ms`, animationFillMode: 'forwards' }}>
                    <div className="relative w-full aspect-video rounded-lg md:rounded-xl overflow-hidden shadow-xl md:shadow-2xl transition-all duration-500 ease-out group-hover:shadow-[0_0_50px_rgba(201,169,98,0.2)]">
                      {activeMedia[project.id] ? (
                        <iframe
                          src={getEmbedUrl(project.media.url, project.media.type)}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center cursor-pointer group-hover:opacity-90 transition-all duration-500"
                             style={{ backgroundColor: '#0f0d0b' }}
                             onClick={() => toggleMedia(project.id)}>
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
                          <div className="relative z-10 flex flex-col items-center gap-2 md:gap-4">
                            {project.media.type === 'video' ? (
                              <FilmIcon className="w-10 h-10 md:w-14 md:h-14 opacity-60 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 group-hover:animate-pulse-scale" style={{ color: '#c9a962' }} />
                            ) : (
                              <PlayIcon className="w-10 h-10 md:w-14 md:h-14 opacity-60 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 group-hover:animate-pulse-scale" style={{ color: '#c9a962' }} />
                            )}
                            <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-all duration-500" style={{ color: '#c9a962' }}>Play {project.media.type}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Project Info */}
                    <div className="mt-4 md:mt-6 relative">
                      <h3 className="text-lg md:text-xl lg:text-2xl font-light mb-1 md:mb-2 group-hover:opacity-80 transition-all duration-300" style={{ color: '#f5f2ed' }}>{project.projectTitle}</h3>
                      <p className="text-xs sm:text-sm md:text-base leading-relaxed" style={{ color: '#9a9590' }}>{project.shortDescription}</p>
                      <div className="absolute -left-3 md:-left-4 top-0 w-0.5 md:w-1 h-0 group-hover:h-8 md:group-hover:h-12 transition-all duration-500" style={{ backgroundColor: '#c9a962' }} />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 md:mt-20 lg:mt-24 pt-8 md:pt-12 opacity-0 animate-fade-in" style={{ borderTopColor: 'rgba(201, 169, 98, 0.15)', borderTopWidth: '1px', animationDelay: '500ms', animationFillMode: 'forwards' }}>
          <p className="text-[10px] md:text-xs uppercase tracking-widest" style={{ color: '#6b6662' }}>
            Last updated: {new Date(data.lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;