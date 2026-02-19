'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlayIcon } from '@heroicons/react/24/solid';

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
        setProjects(data);
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
        className="absolute top-0 left-0 right-0 h-px opacity-30 animate-border-glow"
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
        
        {/* Subtitle */}
        <p 
          className={`
            text-left mb-8 max-w-2xl
            opacity-0
            ${mounted ? 'animate-fade-in-up' : ''}
          `}
          style={{ 
            color: 'var(--text-muted)',
            animationDelay: '180ms',
            animationFillMode: 'forwards'
          }}
        >
          A collection of my work in film, library, and commercial music
        </p>

        {/* Category filter */}
        <div 
          className={`
            flex flex-wrap gap-3 mb-12
            opacity-0
            ${mounted ? 'animate-fade-in-up' : ''}
          `}
          style={{ 
            animationDelay: '260ms',
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
            animationDelay: '340ms',
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
            <Link 
              key={project.id} 
              href={`/projects/${project.slug}`}
              className={`group block opacity-0 ${mounted ? 'animate-fade-in-up' : ''}`}
              style={{ 
                animationDelay: `${400 + index * 80}ms`,
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
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  {playingVideoId === project.id && project.videoUrl ? (
                    <video
                      src={project.videoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  ) : (
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
                          onClick={(e) => {
                            e.preventDefault();
                            setPlayingVideoId(project.id);
                          }}
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
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span 
                      className="text-xs tracking-[0.1em] uppercase px-3 py-1.5"
                      style={{ 
                        backgroundColor: 'rgba(20,18,18,0.75)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-subtle)'
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
                          border: '1px solid var(--border-subtle)'
                        }}
                      >
                        {project.year}
                      </span>
                    )}
                  </div>

                  {project.featured && (
                    <div className="absolute top-3 right-3">
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

                {/* Project info */}
                <div className="p-5 text-left">
                  <h2 
                    className="text-lg font-light tracking-[0.08em] mb-2 line-clamp-1
                               transition-colors duration-300 group-hover:text-[var(--accent)]"
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
                  
                  <span 
                    className="inline-block text-xs tracking-[0.15em] uppercase border-b 
                               transition-colors duration-300 
                               group-hover:text-[var(--accent)] group-hover:border-[var(--accent)]"
                    style={{ 
                      color: 'var(--text-dim)',
                      borderColor: 'var(--border-subtle)'
                    }}
                  >
                    View Project →
                  </span>
                </div>
              </article>
            </Link>
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
