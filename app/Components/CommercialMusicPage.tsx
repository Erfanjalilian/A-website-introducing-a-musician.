'use client';

import { useState, useEffect } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

interface MusicTrack {
  id: string;
  title: string;
  album: string;
  category: string;
  audioUrl: string;
  coverImage: string;
  duration: string;
  license?: string;
  description: string;
  disclaimer?: string;
  featured: boolean;
}

// Default placeholder for tracks (audio only or image fails to load)
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';

const CommercialMusicPage = () => {
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://6991a6e96279728b01550164.mockapi.io/songs/MusicTracks');
        
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        
        const data = await response.json();
        const commercialTracks = data.filter((track: MusicTrack) => track.category === 'commercial-music');
        setTracks(commercialTracks);
        setError(null);
      } catch (err) {
        setError('There was a problem loading the commercial music tracks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  const togglePlay = (trackId: string, audioUrl: string) => {
    if (currentlyPlaying === trackId) {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      setCurrentlyPlaying(null);
      setAudioElement(null);
    } else {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      
      const audio = new Audio(audioUrl);
      audio.play();
      audio.onended = () => {
        setCurrentlyPlaying(null);
        setAudioElement(null);
      };
      setAudioElement(audio);
      setCurrentlyPlaying(trackId);
    }
  };

  const getTrackImage = (track: MusicTrack) => {
    if (!track.coverImage || failedImages.has(track.id)) {
      return PLACEHOLDER_IMAGE;
    }
    return track.coverImage;
  };

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
            Commercial Music
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
            Commercial Music
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
          Commercial Music
        </h1>
        
        {/* Note disclaimer */}
        <p 
          className={`
            text-sm max-w-3xl mb-10
            opacity-0
            ${mounted ? 'animate-fade-in-up' : ''}
          `}
          style={{ 
            color: 'var(--text-muted)',
            animationDelay: '180ms',
            animationFillMode: 'forwards'
          }}
        >
          Note: these are not the original scores to these commercials, but instead re-scores created for academic and demo purposes.
        </p>

        {/* Divider */}
        <div 
          className={`
            w-24 h-px mb-14
            opacity-0
            ${mounted ? 'animate-fade-in' : ''}
          `}
          style={{ 
            backgroundColor: 'var(--border-subtle)',
            animationDelay: '260ms',
            animationFillMode: 'forwards'
          }}
        />

        {tracks.length === 0 && (
          <p 
            className="text-center py-16 text-sm tracking-wide"
            style={{ color: 'var(--text-muted)' }}
          >
            No commercial music tracks found.
          </p>
        )}

        {/* Track grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {tracks.map((track, index) => (
            <article
              key={track.id}
              className={`
                overflow-hidden
                transition-all duration-500 ease-out
                hover:shadow-[0_0_50px_rgba(201,169,98,0.1)]
                opacity-0
                ${mounted ? 'animate-fade-in-up' : ''}
              `}
              style={{ 
                animationDelay: `${320 + index * 80}ms`,
                animationFillMode: 'forwards',
                border: '1px solid var(--border-subtle)',
                borderRadius: '2px'
              }}
            >
              <div className="flex flex-col">
                
                {/* Image + Play button */}
                <div 
                  className="relative w-full aspect-square group overflow-hidden"
                  style={{ backgroundColor: 'var(--bg-header)' }}
                >
                  <img
                    src={getTrackImage(track)}
                    alt={track.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={() => setFailedImages((prev) => new Set(prev).add(track.id))}
                  />
                  
                  {/* Play/Pause overlay */}
                  <button
                    onClick={() => togglePlay(track.id, track.audioUrl)}
                    className="absolute inset-0 flex items-center justify-center
                               bg-black/40 opacity-0 group-hover:opacity-100 
                               transition-opacity duration-300"
                  >
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center
                                 transition-all duration-300 ease-out
                                 group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(201,169,98,0.4)]"
                      style={{ backgroundColor: 'rgba(201, 169, 98, 0.95)' }}
                    >
                      {currentlyPlaying === track.id ? (
                        <PauseIcon className="w-8 h-8" style={{ color: 'var(--bg-body)' }} />
                      ) : (
                        <PlayIcon className="w-8 h-8 ml-1" style={{ color: 'var(--bg-body)' }} />
                      )}
                    </div>
                  </button>

                  {/* Duration badge */}
                  {track.duration && (
                    <div 
                      className="absolute bottom-3 left-3 text-xs tracking-[0.1em] uppercase px-3 py-1.5"
                      style={{ 
                        backgroundColor: 'rgba(20,18,18,0.75)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      {track.duration}
                    </div>
                  )}
                </div>

                {/* Track info */}
                <div className="p-5 text-left">
                  <h2 
                    className="text-lg font-light tracking-[0.08em] mb-2 line-clamp-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {track.title}
                  </h2>
                  
                  <p 
                    className="text-sm mb-2"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    {track.album}
                  </p>
                  
                  <p 
                    className="text-sm leading-relaxed line-clamp-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {track.description}
                  </p>
                  
                  {track.license && (
                    <p 
                      className="text-xs italic tracking-wide mt-3"
                      style={{ color: 'var(--text-dim)' }}
                    >
                      {track.license}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer disclaimer */}
        <div 
          className="mt-14 pt-8 border-t"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <p 
            className="text-sm tracking-wide max-w-3xl"
            style={{ color: 'var(--text-dim)' }}
          >
            Note: these are not the original scores to these commercials, but instead re-scores created for academic and demo purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommercialMusicPage;
