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
      <section className="bg-[#1d1919] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="w-[60%] mx-auto">
            <h2 className="text-3xl font-light tracking-wide text-white mb-10 text-center">
              Film Music
            </h2>
            
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#1d1919] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="w-[60%] mx-auto">
            <h2 className="text-3xl font-light tracking-wide text-white mb-10 text-center">
              Film Music
            </h2>
            
            <div className="text-center text-red-400 py-12">
              {error}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#1d1919] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="w-full md:w-[60%] mx-auto">
          
          {/* Section title */}
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-white mb-12 text-center">
            Film Music
          </h2>
          <hr />
          <br /><br />

          {/* No projects message */}
          {projects.length === 0 && (
            <p className="text-center text-gray-400 py-12">
              No film music projects found.
            </p>
          )}

          {/* Project grid - 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col">
                
                {/* Project card */}
                <Link href={`/projects/${project.slug}`} className="group">
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-800">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Project year */}
                    {project.year && (
                      <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        {project.year}
                      </div>
                    )}
                  </div>
                </Link>

                {/* Project description */}
                <div className="mt-4 text-right">
                  <h3 className="text-lg font-medium text-white mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                    {getProjectDescription(project)}
                  </p>
                  
                  {/* Demo disclaimer */}
                  <p className="text-xs text-gray-500 mt-3 italic">
                    These clips do not contain original music from the TV/films. These are re-scored for demonstration purposes.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilmMusic;
