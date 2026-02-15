// components/FilmMusic.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
}

const FilmMusic = () => {
  const [projects, setProjects] = useState<FilmProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

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
        setProjects(filmProjects);
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

      <div className="max-w-5xl mx-auto px-6 md:px-10">
        
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

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {projects.map((project, index) => (
            <article 
              key={project.id} 
              className={`
                flex flex-col opacity-0
                ${mounted ? 'animate-fade-in-up' : ''}
              `}
              style={{ 
                animationDelay: `${250 + index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                {/* Project image */}
                <div 
                  className="relative w-full aspect-[4/3] overflow-hidden
                             transition-all duration-500 ease-out
                             group-hover:shadow-[0_0_50px_rgba(201,169,98,0.12)]"
                  style={{ 
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '2px'
                  }}
                >
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Overlay on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 
                               transition-opacity duration-400"
                    style={{ 
                      background: 'linear-gradient(to top, rgba(20,18,18,0.6) 0%, transparent 50%)'
                    }}
                  />
                  
                  {/* Year badge */}
                  {project.year && (
                    <div 
                      className="absolute top-4 right-4 text-xs tracking-[0.15em] uppercase px-3 py-1.5"
                      style={{ 
                        backgroundColor: 'rgba(20,18,18,0.7)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      {project.year}
                    </div>
                  )}
                </div>

                {/* Project info */}
                <div className="mt-5 text-center md:text-right">
                  <h3 
                    className="text-base md:text-lg font-light tracking-[0.1em] mb-2 line-clamp-1
                               transition-colors duration-300 group-hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {project.title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed line-clamp-3"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {getProjectDescription(project)}
                  </p>
                  
                  {/* Demo disclaimer */}
                  <p 
                    className="text-xs mt-4 italic tracking-wide"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    These clips do not contain original music from the TV/films. Re-scored for demonstration purposes.
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilmMusic;
