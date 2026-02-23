'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  year: string;
  client?: string;
  featured: boolean;
  videoUrl?: string;
}

const getCategoryName = (category: string): string => {
  const categories: { [key: string]: string } = {
    'film-music': 'Film Music',
    'library-music': 'Library Music',
    'commercial-music': 'Commercial Music',
  };
  return categories[category] || category;
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mounted, setMounted] = useState(false);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://6991a5b96279728b0154fe77.mockapi.io/theSong/Projects');
        
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        
        const data = await response.json();
        
        // Add video URLs to projects (you'll need to replace these with actual video paths)
        const projectsWithVideos = data.map((project: Project, index: number) => ({
          ...project,
          videoUrl: project.videoUrl || `/videos/project-${index + 1}.mp4` // Fallback video path
        }));
        
        setProjects(projectsWithVideos);
        setError(null);
      } catch (err) {
        setError('There was a problem loading the projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Cleanup video playback when component unmounts or video changes
  useEffect(() => {
    if (playingVideoId) {
      // Pause all other videos
      Object.keys(videoRefs.current).forEach(key => {
        if (key !== playingVideoId && videoRefs.current[key]) {
          videoRefs.current[key]?.pause();
        }
      });
    }
  }, [playingVideoId]);

  const handlePlayVideo = (projectId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (playingVideoId === projectId) {
      // If clicking on the same video, toggle play/pause
      const video = videoRefs.current[projectId];
      if (video) {
        if (isVideoPlaying) {
          video.pause();
        } else {
          video.play().catch(() => {
            // Autoplay was prevented
          });
        }
        setIsVideoPlaying(!isVideoPlaying);
      }
    } else {
      // Switch to new video
      setPlayingVideoId(projectId);
      setIsVideoPlaying(true);
    }
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleCloseVideo = (projectId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (videoRefs.current[projectId]) {
      videoRefs.current[projectId]?.pause();
    }
    setPlayingVideoId(null);
    setIsVideoPlaying(false);
  };

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const categories = ['all', ...new Set(projects.map(p => p.category))];

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
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <h1 
            className="font-light text-3xl md:text-4xl tracking-[0.2em] uppercase mb-16"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Projects
          </h1>
          <div className="flex justify-center items-center h-64">
            <div 
              className="animate-spin rounded-full h-10 w-10 border-2 border-transparent"
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
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <h1 
            className="font-light text-3xl md:text-4xl tracking-[0.2em] uppercase mb-12"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Projects
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

  return (
    <div 
      className="min-h-screen py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-body)' }}
    >
      {/* Accent line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
      />

      <div className="max-w-5xl mx-auto px-6 md:px-10">
        
        {/* Page title */}
        <h1 
          className={`
            font-light text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] uppercase mb-4
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
          Projects
        </h1>
        
        {/* Static Header Image with Side Text */}
        <div className="mb-8 md:mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10">
            {/* Image Container - 2/3 width on desktop */}
            <div className="w-full md:w-2/3">
              <div className="relative w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[320px] rounded-lg md:rounded-xl overflow-hidden shadow-xl md:shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80"
                  alt="Studio workspace with mixing console and monitors"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 66vw, 800px"
                />
              </div>
              {/* SubText - Below image on all screens */}
              <div className="mt-3 md:mt-4">
                <p className="text-xs sm:text-sm md:text-base" style={{ color: 'var(--text-muted)' }}>
                  A curated collection of sound design and music composition projects
                </p>
              </div>
            </div>
            
            {/* Side Text Container - 1/3 width on desktop */}
            <div className="w-full md:w-1/3 flex flex-col justify-center">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-relaxed" style={{ color: 'var(--accent)' }}>
                Crafting sonic identities for visual stories
              </p>
              <p className="text-[10px] sm:text-xs mt-2 md:mt-3 tracking-wider uppercase" style={{ color: 'var(--text-dim)' }}>
                Featured works from 2023-2024
              </p>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div 
          className={`
            flex flex-wrap gap-3 mb-12
            opacity-0
            ${mounted ? 'animate-fade-in-up' : ''}
          `}
          style={{ 
            animationDelay: '220ms',
            animationFillMode: 'forwards'
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2 text-sm tracking-[0.1em] uppercase
                transition-all duration-300 ease-out
                rounded-sm
              `}
              style={selectedCategory === category
                ? { 
                    backgroundColor: 'var(--accent)', 
                    color: 'var(--bg-body)' 
                  }
                : { 
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-subtle)'
                  }
              }
            >
              {category === 'all' ? 'All' : getCategoryName(category)}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div 
          className={`
            w-24 h-px mb-12
            opacity-0
            ${mounted ? 'animate-fade-in' : ''}
          `}
          style={{ 
            backgroundColor: 'var(--border-subtle)',
            animationDelay: '280ms',
            animationFillMode: 'forwards'
          }}
        />

        {filteredProjects.length === 0 && (
          <p 
            className="text-center py-16 text-sm tracking-wide"
            style={{ color: 'var(--text-muted)' }}
          >
            No projects found in this category.
          </p>
        )}

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`group block opacity-0 ${mounted ? 'animate-fade-in-up' : ''}`}
              style={{ 
                animationDelay: `${340 + index * 80}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <article
                className="overflow-hidden transition-all duration-500 ease-out
                           hover:shadow-[0_0_50px_rgba(201,169,98,0.12)]"
                style={{ 
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px'
                }}
              >
                {/* Image / Video */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-black">
                  {playingVideoId === project.id ? (
                    // Video Player
                    <div className="relative w-full h-full">
                      <video
                        ref={el => {
                          videoRefs.current[project.id] = el;
                        }}
                        src={project.videoUrl}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        playsInline
                        onClick={handleVideoClick}
                        onPlay={() => setIsVideoPlaying(true)}
                        onPause={() => setIsVideoPlaying(false)}
                      />
                      
                      {/* Video Controls Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={(e) => handlePlayVideo(project.id, e)}
                          className="flex items-center justify-center w-14 h-14 rounded-full transition-transform duration-300 hover:scale-110"
                          style={{ backgroundColor: 'rgba(201, 169, 98, 0.95)' }}
                          aria-label={isVideoPlaying ? 'Pause' : 'Play'}
                        >
                          {isVideoPlaying ? (
                            <PauseIcon className="w-7 h-7" style={{ color: 'var(--bg-body)' }} />
                          ) : (
                            <PlayIcon className="w-7 h-7 ml-1" style={{ color: 'var(--bg-body)' }} />
                          )}
                        </button>
                      </div>

                      {/* Close button */}
                      <button
                        onClick={(e) => handleCloseVideo(project.id, e)}
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center
                                   transition-all duration-300 hover:scale-110 hover:rotate-90"
                        style={{ 
                          backgroundColor: 'rgba(20,18,18,0.8)',
                          border: '1px solid var(--border-subtle)'
                        }}
                        aria-label="Close video"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-muted)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    // Image Preview
                    <>
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      
                      {/* Hover overlay */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 
                                   transition-opacity duration-400"
                        style={{ 
                          background: 'linear-gradient(to top, rgba(20,18,18,0.6) 0%, transparent 50%)'
                        }}
                      />
                      
                      {/* Play button overlay - only show if video exists */}
                      {project.videoUrl && (
                        <button
                          onClick={(e) => handlePlayVideo(project.id, e)}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full h-full"
                          aria-label={`Play video for ${project.title}`}
                        >
                          <div className="flex items-center justify-center w-16 h-16 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse-scale" style={{ backgroundColor: 'rgba(201, 169, 98, 0.95)' }}>
                            <PlayIcon className="w-8 h-8 ml-1" style={{ color: 'var(--bg-body)' }} />
                          </div>
                        </button>
                      )}
                    </>
                  )}
                  
                  {/* Badges - Always visible */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                    <span 
                      className="text-xs tracking-[0.1em] uppercase px-3 py-1.5"
                      style={{ 
                        backgroundColor: 'rgba(20,18,18,0.75)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-subtle)',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      {getCategoryName(project.category)}
                    </span>
                    {project.year && (
                      <span 
                        className="text-xs tracking-[0.1em] uppercase px-3 py-1.5"
                        style={{ 
                          backgroundColor: 'rgba(20,18,18,0.75)',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border-subtle)',
                          backdropFilter: 'blur(4px)'
                        }}
                      >
                        {project.year}
                      </span>
                    )}
                  </div>

                  {project.featured && (
                    <div className="absolute top-3 right-3 z-10">
                      <span 
                        className="text-xs tracking-[0.1em] uppercase px-3 py-1.5"
                        style={{ 
                          backgroundColor: 'rgba(201, 169, 98, 0.9)',
                          color: 'var(--bg-body)'
                        }}
                      >
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Project info - Clickable area removed */}
                <div className="p-5 text-left">
                  <h2 
                    className="text-lg font-light tracking-[0.08em] mb-2 line-clamp-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {project.title}
                  </h2>
                  
                  {project.client && (
                    <p 
                      className="text-sm mb-3"
                      style={{ color: 'var(--text-dim)' }}
                    >
                      Client: {project.client}
                    </p>
                  )}
                  
                  {/* Video status indicator */}
                  {playingVideoId === project.id && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
                      <span className="text-xs tracking-wide" style={{ color: 'var(--accent)' }}>
                        Now Playing
                      </span>
                    </div>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div 
          className="mt-16 pt-8 border-t"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <p 
            className="text-sm tracking-wide max-w-3xl"
            style={{ color: 'var(--text-muted)' }}
          >
            These projects showcase my work in sound design and music composition across various media. 
            Each project includes details about my role and creative process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;