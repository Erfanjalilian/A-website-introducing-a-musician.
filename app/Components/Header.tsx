'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaLinkedinIn, FaSoundcloud, FaInstagram, FaVimeoV } from 'react-icons/fa';
import { SiSpotify, SiApplemusic } from 'react-icons/si';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

type Page = {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [latestTitle, setLatestTitle] = useState<string>('Musician & Sound Designer');
  const [apiPages, setApiPages] = useState<Page[]>([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await fetch('/api/pages');
        const data: Page[] = await res.json();
        console.log(data);
        setApiPages(data);
        
        // You might want to set the latest title from one of the pages?
        // If you want to use the most recent page's title:
        if (data.length > 0) {
          // Sort by createdAt and get the most recent
          const sorted = [...data].sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setLatestTitle(sorted[0].title);
        }
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };
    
    fetchPages();
  }, []);

  const pageLinks = [
    { id: 2, title: 'Home', href: '/' },
    { id: 1, title: 'Projects', href: '/Projects' },
    { id: 3, title: 'Biography', href: '/LibraryMusic' },
    { id: 4, title: 'Portfolio Page', href: '/CommercialMusic' },
  ];

  const socialIcons = [
    { id: 1, icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
    { id: 2, icon: FaSoundcloud, href: 'https://soundcloud.com', label: 'SoundCloud' },
    { id: 3, icon: SiSpotify, href: 'https://spotify.com', label: 'Spotify' },
    { id: 4, icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { id: 5, icon: SiApplemusic, href: 'https://music.apple.com', label: 'Apple Music' },
    { id: 6, icon: FaVimeoV, href: 'https://vimeo.com', label: 'Vimeo' },
  ];

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Combine static and API pages for display
  const allNavLinks = [
    ...pageLinks,
    ...apiPages.map(page => ({
      id: page.id,
      title: page.title,
      href: `/${page.slug}` // Adjust this based on your routing structure
    }))
  ];

  return (
    <header className="relative" style={{ backgroundColor: 'var(--bg-header)' }}>
      <div className="absolute top-0 left-0 right-0 h-px opacity-50 animate-border-glow" style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />

      {/* Desktop */}
      <div className="hidden md:block py-12">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6 items-center">
            <div className="col-span-3 flex flex-col justify-center space-y-5">
              {allNavLinks.map((link, idx) => (
                <Link 
                  key={link.id} 
                  href={link.href} 
                  className="text-sm tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300 animate-link-slide-in"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  {link.title}
                </Link>
              ))}
            </div>

            <div className="col-span-6 flex flex-col items-center justify-center text-center px-4">
              <h1 className="font-light tracking-[0.15em] uppercase text-[4.5rem] lg:text-[5.25rem] leading-[1.1] mb-2 animate-title-scale" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                Kazemi
              </h1>
              <h2 className="text-base lg:text-lg font-light tracking-[0.35em] uppercase animate-fade-in-up" style={{ color: 'var(--text-dim)', animationDelay: '200ms' }}>
                {latestTitle}
              </h2>
            </div>

            <div className="col-span-3 flex items-center justify-end gap-5">
              {socialIcons.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a key={social.id} href={social.href} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:scale-110 hover:bg-white/5 transition-all duration-300 animate-fade-in-up animate-icon-hover" style={{ animationDelay: `${300 + idx * 50}ms` }} aria-label={social.label}>
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
          <button onClick={() => setMenuOpen(!menuOpen)} className="absolute top-5 left-5 z-20 p-2" style={{ color: 'var(--text-muted)' }} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <XMarkIcon className="w-8 h-8" strokeWidth={1.5} /> : <Bars3Icon className="w-8 h-8" strokeWidth={1.5} />}
          </button>

          {!menuOpen && (
            <div className="text-center mb-4">
              <h1 className="font-light text-3xl tracking-[0.12em] uppercase mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                Arash Kazemi
              </h1>
              <h2 className="text-sm font-light tracking-[0.3em] uppercase" style={{ color: 'var(--text-dim)' }}>
                {latestTitle}
              </h2>
            </div>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="fixed inset-0 z-10 bg-black/95 pt-20 px-5 animate-menu-slide-in">
            <div className="flex flex-col space-y-4">
              {allNavLinks.map((link, idx) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-xl tracking-[0.15em] uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300 py-2 animate-link-slide-in"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;