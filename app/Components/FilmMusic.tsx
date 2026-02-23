// components/FilmMusic.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Type definition for film music projects
interface FilmProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  year: string;
  client?: string;
  description?: string;
  featured: boolean;
  videoUrl?: string; // Added video URL field
}

const FilmMusic = () => {
  const [projects, setProjects] = useState<FilmProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://6991a5b96279728b0154fe77.mockapi.io/theSong/Projects');
        
        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const data = await response.json();
        const filmProjects = data.filter((project: FilmProject) => project.category === 'film-music');
        
        // Add video URLs to projects (you'll need to replace these with actual video URLs)
        const projectsWithVideos = filmProjects.map((project: FilmProject, index: number) => ({
          ...project,
          videoUrl: `/videos/film-project-${index + 1}.mp4` // Replace with actual video paths
        }));
        
        setProjects(projectsWithVideos);
        setError(null);
      } catch (err) {
        setError('Failed to load film music projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle video play/pause when project changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload video when project changes
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Autoplay was prevented
          setIsPlaying(false);
        });
      }
    }
  }, [currentProjectIndex]);

  // Auto-rotate projects every 5 seconds (pause if video is playing)
  useEffect(() => {
    if (projects.length <= 1 || isPlaying) return;

    const interval = setInterval(() => {
      handleNextProject();
    }, 5000);

    return () => clearInterval(interval);
  }, [projects.length, currentProjectIndex, isPlaying]);

  const handlePreviousProject = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentProjectIndex((prev) => 
      prev === 0 ? projects.length - 1 : prev - 1
    );
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNextProject = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentProjectIndex((prev) => 
      prev === projects.length - 1 ? 0 : prev + 1
    );
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          // Autoplay was prevented
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Default descriptions for projects (since API has no description)
  const getProjectDescription = (project: FilmProject) => {
    const descriptions: { [key: string]: string } = {
      '1': 'A dark cinematic orchestral demo based on "Carol of the Bells", perfect for a superhero Christmas movie trailer.',
      '2': 'A full MIDI recreation of the original score from The Omen (2006) by Marco Beltrami.',
      '3': 'All original music composed, orchestrated, conducted, and recorded in studio session with real musicians.',
    };

    return descriptions[project.id] || 'Description for this film music project. This track is made for demonstration purposes.';
  };

  if (loading) {
    return (
      <section 
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ backgroundColor: 'var(--bg-body)' }}
      >
        <div 
          className="absolute top-0 left-0 right-0 h-px opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
        />
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <h2 
            className="font-light text-3xl md:text-4xl tracking-[0.2em] uppercase text-center mb-16"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Film Music
          </h2>
          <div className="flex justify-center items-center h-64">
            <div 
              className="animate-spin rounded-full h-10 w-10 border-2 border-transparent"
              style={{ borderTopColor: 'var(--accent)', borderRightColor: 'var(--accent)' }}
            />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section 
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ backgroundColor: 'var(--bg-body)' }}
      >
        <div 
          className="absolute top-0 left-0 right-0 h-px opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
        />
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <h2 
            className="font-light text-3xl md:text-4xl tracking-[0.2em] uppercase text-center mb-12"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Film Music
          </h2>
          <div 
            className="text-center py-12 text-sm tracking-wide"
            style={{ color: 'var(--text-muted)' }}
          >
            {error}
          </div>
        </div>
      </section>
    );
  }

  const currentProject = projects[currentProjectIndex];

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-body)' }}
    >
      {/* Accent line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Section title */}
        <h2 
          className={`
            font-light text-3xl md:text-4xl tracking-[0.2em] uppercase text-center mb-10
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
          Film Music
        </h2>

        {/* Divider */}
        <div 
          className={`
            w-24 h-px mx-auto mb-14
            opacity-0
            ${mounted ? 'animate-fade-in' : ''}
          `}
          style={{ 
            backgroundColor: 'var(--border-subtle)',
            animationDelay: '200ms',
            animationFillMode: 'forwards'
          }}
        />

        {/* No projects message */}
        {projects.length === 0 && (
          <p 
            className="text-center py-16 text-sm tracking-wide"
            style={{ color: 'var(--text-muted)' }}
          >
            No film music projects found.
          </p>
        )}

        {/* Single project display with navigation */}
        {projects.length > 0 && (
          <div className="relative">
            {/* Navigation arrows */}
            {projects.length > 1 && (
              <>
                <button
                  onClick={handlePreviousProject}
                  className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-20
                             w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
                             rounded-full border border-[var(--border-subtle)]
                             bg-[var(--bg-body)]/90 backdrop-blur-sm
                             text-[var(--text-muted)] hover:text-[var(--accent)]
                             hover:border-[var(--accent)] hover:scale-110
                             transition-all duration-300
                             opacity-0 animate-fade-in"
                  style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
                  aria-label="Previous project"
                >
                  <svg 
                    className="w-5 h-5 md:w-6 md:h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={handleNextProject}
                  className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-20
                             w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
                             rounded-full border border-[var(--border-subtle)]
                             bg-[var(--bg-body)]/90 backdrop-blur-sm
                             text-[var(--text-muted)] hover:text-[var(--accent)]
                             hover:border-[var(--accent)] hover:scale-110
                             transition-all duration-300
                             opacity-0 animate-fade-in"
                  style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
                  aria-label="Next project"
                >
                  <svg 
                    className="w-5 h-5 md:w-6 md:h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Project counter */}
            {projects.length > 1 && (
              <div 
                className="absolute top-4 right-4 z-10 text-xs tracking-[0.15em] uppercase
                           px-3 py-1.5 bg-[var(--bg-body)]/80 backdrop-blur-sm
                           border border-[var(--border-subtle)] rounded
                           opacity-0 animate-fade-in"
                style={{ 
                  color: 'var(--text-muted)',
                  animationDelay: '450ms',
                  animationFillMode: 'forwards'
                }}
              >
                {currentProjectIndex + 1} / {projects.length}
              </div>
            )}

            {/* Project display with animation */}
            <div
              className={`
                transition-all duration-500 ease-out
                ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
              `}
            >
              {/* Video player container */}
              <div 
                className="relative w-full aspect-video overflow-hidden
                           transition-all duration-500 ease-out
                           group hover:shadow-[0_0_60px_rgba(201,169,98,0.15)]
                           animate-image-reveal
                           opacity-0"
                style={{ 
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  animationDelay: '300ms',
                  animationFillMode: 'forwards'
                }}
              >
                {/* Video element */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster={currentProject.coverImage}
                  loop
                  playsInline
                  muted
                  controls={false}
                >
                  <source src={currentProject.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Fallback image if video doesn't load */}
                <div className="absolute inset-0 -z-10">
                  <Image
                    src={currentProject.coverImage}
                    alt={currentProject.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>

                {/* Custom video controls overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Play/Pause button */}
                  <button
                    onClick={togglePlayPause}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                               w-16 h-16 md:w-20 md:h-20 rounded-full
                               bg-[var(--bg-body)]/80 backdrop-blur-sm
                               border border-[var(--border-subtle)]
                               text-[var(--text-primary)] hover:text-[var(--accent)]
                               hover:border-[var(--accent)] hover:scale-110
                               transition-all duration-300
                               flex items-center justify-center"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>

                  {/* Volume indicator (muted by default) */}
                  <div className="absolute bottom-4 right-4 text-xs text-[var(--text-muted)] bg-[var(--bg-body)]/60 backdrop-blur-sm px-2 py-1 rounded border border-[var(--border-subtle)]">
                    🔇 Muted
                  </div>
                </div>

                {/* Year badge */}
                {currentProject.year && (
                  <div 
                    className="absolute top-4 left-4 text-xs tracking-[0.15em] uppercase px-3 py-1.5
                               transform transition-all duration-300 group-hover:translate-y-[-2px]
                               group-hover:shadow-[0_4px_12px_rgba(201,169,98,0.2)]
                               animate-badge-slide-in"
                    style={{ 
                      backgroundColor: 'rgba(20,18,18,0.8)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border-subtle)',
                      backdropFilter: 'blur(4px)',
                      animationDelay: '350ms'
                    }}
                  >
                    {currentProject.year}
                  </div>
                )}
              </div>

              {/* Project info */}
              <div className="mt-6 text-center">
                <h3 
                  className="text-xl md:text-2xl font-light tracking-[0.1em] mb-3
                             transition-all duration-300 group-hover:text-[var(--accent)]
                             group-hover:tracking-[0.15em]
                             opacity-0 animate-text-reveal"
                  style={{ 
                    color: 'var(--text-primary)',
                    animationDelay: '400ms',
                    animationFillMode: 'forwards'
                  }}
                >
                  {currentProject.title}
                </h3>
                
                {/* Project description */}
                <div className="overflow-hidden">
                  <p 
                    className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto
                               transform transition-all duration-500 delay-100
                               group-hover:translate-y-0 group-hover:opacity-100
                               opacity-0 animate-text-reveal"
                    style={{ 
                      color: 'var(--text-muted)',
                      animationDelay: '450ms',
                      animationFillMode: 'forwards'
                    }}
                  >
                    {getProjectDescription(currentProject)}
                  </p>
                </div>
                
                {/* Demo disclaimer */}
                <p 
                  className="text-xs mt-6 italic tracking-wide
                             opacity-0 animate-text-reveal
                             transition-opacity duration-300 group-hover:opacity-80"
                  style={{ 
                    color: 'var(--text-dim)',
                    animationDelay: '500ms',
                    animationFillMode: 'forwards'
                  }}
                >
                  These clips do not contain original music from the TV/films. Re-scored for demonstration purposes.
                </p>
              </div>
            </div>

            {/* Progress indicators */}
            {projects.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        setCurrentProjectIndex(index);
                        setTimeout(() => setIsAnimating(false), 500);
                      }
                    }}
                    className={`
                      h-1.5 rounded-full transition-all duration-300
                      ${index === currentProjectIndex 
                        ? 'w-10 bg-[var(--accent)]' 
                        : 'w-4 bg-[var(--border-subtle)] hover:bg-[var(--text-muted)]'
                      }
                    `}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FilmMusic;