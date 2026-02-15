'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaLinkedinIn, FaSoundcloud, FaInstagram, FaVimeoV } from 'react-icons/fa';
import { SiSpotify, SiApplemusic } from 'react-icons/si';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pageLinks = [
    { id: 1, title: 'Projects', href: '/projects' },
    { id: 2, title: 'Film Music', href: '/film-music' },
    { id: 3, title: 'Library Music', href: '/library-music' },
    { id: 4, title: 'Commercial Music', href: '/commercial-music' }
  ];

  const socialIcons = [
    { id: 1, icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
    { id: 2, icon: FaSoundcloud, href: 'https://soundcloud.com', label: 'SoundCloud' },
    { id: 3, icon: SiSpotify, href: 'https://spotify.com', label: 'Spotify' },
    { id: 4, icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { id: 5, icon: SiApplemusic, href: 'https://music.apple.com', label: 'Apple Music' },
    { id: 6, icon: FaVimeoV, href: 'https://vimeo.com', label: 'Vimeo' },
  ];

  return (
    <header 
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-header)' }}
    >
      {/* Subtle top accent line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px opacity-50"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
      />

      {/* Desktop */}
      <div className="hidden md:block min-h-[280px] py-12">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 h-full">
          <div className="grid grid-cols-12 gap-6 h-full items-center">
            
            {/* Left - Page links */}
            <div className="col-span-3 flex flex-col justify-center space-y-5">
              {pageLinks.map((link, i) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`
                    group relative text-sm tracking-[0.2em] uppercase
                    transition-colors duration-300 ease-out
                    opacity-0
                    ${mounted ? 'animate-fade-in-up' : ''}
                  `}
                  style={{ 
                    color: 'var(--text-muted)',
                    animationDelay: `${i * 80}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <span className="relative z-10 group-hover:text-[var(--text-primary)] transition-colors duration-300">
                    {link.title}
                  </span>
                  <span 
                    className="absolute bottom-0 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-300 ease-out group-hover:w-full"
                    style={{ bottom: '-2px' }}
                  />
                </Link>
              ))}
            </div>

            {/* Center - Name & Title */}
            <div className="col-span-6 flex flex-col items-center justify-center text-center px-4">
              <h1 
                className={`
                  font-light tracking-[0.15em] uppercase
                  text-[4.5rem] lg:text-[5.25rem] leading-[1.1] mb-2
                  opacity-0
                  ${mounted ? 'animate-fade-in-up' : ''}
                `}
                style={{ 
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text-primary)',
                  animationDelay: '250ms',
                  animationFillMode: 'forwards'
                }}
              >
                Kazemi
              </h1>
              <h2 
                className={`
                  text-base lg:text-lg font-light tracking-[0.35em] uppercase
                  opacity-0
                  ${mounted ? 'animate-fade-in' : ''}
                `}
                style={{ 
                  color: 'var(--text-dim)',
                  animationDelay: '400ms',
                  animationFillMode: 'forwards'
                }}
              >
                Music & Sound
              </h2>
            </div>

            {/* Right - Social Icons */}
            <div className="col-span-3 flex items-center justify-end gap-5">
              {socialIcons.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      p-2 rounded-full
                      transition-all duration-300 ease-out
                      hover:scale-110 hover:bg-white/5
                      opacity-0
                      ${mounted ? 'animate-fade-in-up' : ''}
                    `}
                    style={{ 
                      color: 'var(--text-dim)',
                      animationDelay: `${350 + i * 50}ms`,
                      animationFillMode: 'forwards'
                    }}
                    aria-label={social.label}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-dim)';
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex flex-col items-center justify-start px-5 pt-6 pb-4">
          
          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute top-5 right-5 z-20 px-3 py-2 text-xs tracking-[0.25em] uppercase transition-all duration-300"
            style={{ color: 'var(--text-muted)' }}
            aria-expanded={menuOpen}
          >
            <span className="inline-block transition-transform duration-300">
              {menuOpen ? 'Close' : 'Menu'}
            </span>
          </button>

          {/* Name & Title */}
          <div 
            className={`
              text-center mb-4
              opacity-0
              ${mounted ? 'animate-fade-in-up' : ''}
            `}
            style={{ animationFillMode: 'forwards' }}
          >
            <h1 
              className="font-light text-3xl tracking-[0.12em] uppercase mb-1"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Arash Kazemi
            </h1>
            <h2 
              className="text-sm font-light tracking-[0.3em] uppercase"
              style={{ color: 'var(--text-dim)' }}
            >
              Music & Sound
            </h2>
          </div>

          {/* Dropdown menu */}
          <div
            className={`
              w-full overflow-hidden
              transition-all duration-400 ease-out
              ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div 
              className="py-5 border-t flex flex-col items-center gap-4"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              {pageLinks.map((link, i) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="text-sm tracking-[0.2em] uppercase transition-colors duration-200 hover:opacity-80"
                  style={{ color: 'var(--text-muted)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
              {/* Social icons on mobile */}
              <div className="flex gap-4 pt-2">
                {socialIcons.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full transition-colors duration-200 hover:opacity-80"
                      style={{ color: 'var(--text-dim)' }}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
