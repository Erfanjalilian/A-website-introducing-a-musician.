'use client';

import { useState, useEffect } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';

interface DemoVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
}

// Fallback thumbnail when API returns empty or image fails to load
const FALLBACK_THUMBNAIL = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

const DemoVideos = () => {
  const [videos, setVideos] = useState<DemoVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [failedThumbnails, setFailedThumbnails] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://6991a6e96279728b01550164.mockapi.io/songs/DemoVideos');
        if (!response.ok) throw new Error('Error fetching data');
        const data = await response.json();
        setVideos(data);
        setError(null);
      } catch (err) {
        setError('Failed to load demo videos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

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
            Reels
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
            Reels
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
          Reels
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

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {videos.map((video, index) => (
            <article 
              key={video.id} 
              className={`
                flex flex-col opacity-0
                ${mounted ? 'animate-fade-in-up' : ''}
              `}
              style={{ 
                animationDelay: `${250 + index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <div 
                className="group relative w-full aspect-video overflow-hidden cursor-pointer bg-[#1a1616]
                           transition-all duration-500 ease-out
                           hover:shadow-[0_0_50px_rgba(201,169,98,0.12)]"
                style={{ 
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px'
                }}
              >
                {playingId === video.id ? (
                  <video
                    src={video.videoUrl}
                    controls
                    autoPlay
                    poster={video.thumbnail}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <img
                      src={failedThumbnails.has(video.id) || !video.thumbnail ? FALLBACK_THUMBNAIL : video.thumbnail}
                      alt={video.title}
                      loading="eager"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={() => setFailedThumbnails((prev) => new Set(prev).add(video.id))}
                    />
                    {/* Hover overlay with play button */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center pointer-events-none
                                 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center
                                   transition-transform duration-300 ease-out group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(201,169,98,0.4)]"
                        style={{ backgroundColor: 'rgba(201, 169, 98, 0.95)' }}
                      >
                        <PlayIcon className="w-8 h-8 md:w-10 md:h-10 ml-1" style={{ color: 'var(--bg-body)' }} />
                      </div>
                    </div>
                    <button
                      onClick={() => setPlayingId(video.id)}
                      className="absolute inset-0 w-full h-full"
                      aria-label={`Play ${video.title}`}
                    />
                  </>
                )}
              </div>

              <div className="mt-5 text-center md:text-right">
                <h3 
                  className="text-base md:text-lg font-light tracking-[0.1em] mb-2 line-clamp-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {video.title}
                </h3>
                <p 
                  className="text-sm leading-relaxed line-clamp-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {video.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoVideos;
