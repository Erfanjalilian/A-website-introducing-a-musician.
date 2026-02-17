'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaLinkedinIn, FaSoundcloud, FaInstagram, FaVimeoV } from 'react-icons/fa';
import { SiSpotify, SiApplemusic } from 'react-icons/si';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const pageLinks = [
    { id: 2, title: 'Home', href: '/' },
    { id: 1, title: 'Projects', href: '/Projects' },
    { id: 3, title: 'Biography', href: '/LibraryMusic' },
    { id: 4, title: 'Portfolio Page', href: '/CommercialMusic' }
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
               Musician & Sound Designer
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
        <div className="flex flex-col items-center justify-start px-5 pt-6 pb-4 relative">
          
          {/* Menu Button - Left side */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute top-5 left-5 z-20 p-2 transition-all duration-300"
            style={{ color: 'var(--text-muted)' }}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <XMarkIcon className="w-8 h-8" strokeWidth={1.5} />
            ) : (
              <Bars3Icon className="w-8 h-8" strokeWidth={1.5} />
            )}
          </button>

          {/* Name & Title - hidden when menu is open */}
          {!menuOpen && (
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
          )}
        </div>

        {/* Full-screen overlay menu */}
        <div
          className={`
            fixed inset-0 z-40 w-full h-screen
            flex flex-col items-center justify-center
            transition-all duration-300 ease-out
            md:hidden
            ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
          `}
          style={{ backgroundColor: 'var(--bg-header)' }}
        >
          {/* Accent line */}
          <div 
            className="absolute top-0 left-0 right-0 h-px opacity-50"
            style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
          />
          {/* Close button - top left */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 left-5 z-50 p-2 transition-colors duration-200"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Close menu"
          >
            <XMarkIcon className="w-8 h-8" strokeWidth={1.5} />
          </button>

          {/* Name + Page links - vertically centered */}
          <div className="flex flex-col items-center justify-center gap-10">
            <h1 
              className="font-light text-2xl tracking-[0.15em] uppercase"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Arash Kazemi
            </h1>
            <nav className="flex flex-col items-center gap-8">
              {pageLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-lg tracking-[0.25em] uppercase transition-colors duration-200 hover:opacity-80"
                style={{ color: 'var(--text-primary)' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
