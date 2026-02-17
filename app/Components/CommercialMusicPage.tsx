'use client';

import { useState, useEffect } from 'react';
import { PlayIcon, FilmIcon } from '@heroicons/react/24/solid';

interface PortfolioMedia {
  type: 'video' | 'audio';
  url: string;
}

interface PortfolioProject {
  id: string;
  projectTitle: string;
  shortDescription: string;
  media: PortfolioMedia;
}

interface PortfolioSection {
  id: string;
  title: string;
  description: string;
  projects: PortfolioProject[];
}

interface PortfolioData {
  id: string;
  pageTitle: string;
  description: string;
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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <div className="min-h-screen py-20 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#1a1616' }}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" style={{ backgroundColor: 'rgba(201, 169, 98, 0.05)' }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl translate-y-1/2 pointer-events-none" style={{ backgroundColor: 'rgba(201, 169, 98, 0.05)' }} />
      
      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header Section */}
        <div className="mb-16 md:mb-24">
          <div className="inline-block mb-6 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)', borderColor: 'rgba(201, 169, 98, 0.3)', borderWidth: '1px' }}>
            <p className="text-xs tracking-widest uppercase font-medium" style={{ color: 'rgba(201, 169, 98, 0.8)' }}>Portfolio</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 leading-tight" style={{ color: '#f5f2ed' }}>
            {data.pageTitle}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl leading-relaxed font-light" style={{ color: '#9a9590' }}>{data.description}</p>
        </div>

        <div className="space-y-24">
          {data.sections.map((section, sIdx) => (
            <section key={section.id} className="relative">
              {/* Section Header */}
              <div className="mb-14 relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-1 w-12 rounded" style={{ backgroundColor: '#c9a962' }} />
                  <h2 className="text-xl md:text-2xl tracking-wide uppercase font-light" style={{ color: '#c9a962' }}>{section.title}</h2>
                </div>
                <p className="text-base md:text-lg max-w-2xl leading-relaxed ml-16" style={{ color: '#6b6662' }}>{section.description}</p>
              </div>

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                {section.projects.map(project => (
                  <article key={project.id} className="group relative h-full">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
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
                          <div className="relative z-10 flex flex-col items-center gap-4">
                            {project.media.type === 'video' ? (
                              <FilmIcon className="w-14 h-14 opacity-60 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110" style={{ color: '#c9a962' }} />
                            ) : (
                              <PlayIcon className="w-14 h-14 opacity-60 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110" style={{ color: '#c9a962' }} />
                            )}
                            <span className="text-xs uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-all duration-500" style={{ color: '#c9a962' }}>Play {project.media.type}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Project Info */}
                    <div className="mt-6 relative">
                      <h3 className="text-xl md:text-2xl font-light mb-2 group-hover:opacity-80 transition-all duration-300" style={{ color: '#f5f2ed' }}>{project.projectTitle}</h3>
                      <p className="text-sm md:text-base leading-relaxed" style={{ color: '#9a9590' }}>{project.shortDescription}</p>
                      <div className="absolute -left-4 top-0 w-1 h-0 group-hover:h-12 transition-all duration-500" style={{ backgroundColor: '#c9a962' }} />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-24 pt-12" style={{ borderTopColor: 'rgba(201, 169, 98, 0.15)', borderTopWidth: '1px' }}>
          <p className="text-xs uppercase tracking-widest" style={{ color: '#6b6662' }}>
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
