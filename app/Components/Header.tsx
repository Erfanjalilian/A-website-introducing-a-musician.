'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
        
        if (data.length > 0) {
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

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const allNavLinks = [
    ...pageLinks,
    ...apiPages.map(page => ({
      id: page.id,
      title: page.title,
      href: `/${page.slug}`
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

            <div className="col-span-3">
              {/* Empty div to maintain grid layout */}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex flex-col items-center justify-start px-5 pt-6 pb-4 relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="absolute top-5 left-5 z-50 p-2 rounded-lg hover:bg-white/5 transition-colors duration-200" 
            style={{ color: 'var(--text-muted)' }} 
            aria-expanded={menuOpen} 
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
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
          <div 
            className="fixed inset-0 z-40 pt-20 px-5 overflow-y-auto"
            style={{ 
              backgroundColor: 'var(--bg-header, #1a1616)',
              backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(26,22,22,0.98))',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
          >
            {/* Decorative accent line at the top */}
            <div className="absolute top-0 left-0 right-0 h-px opacity-30" style={{ background: 'linear-gradient(90deg, transparent, var(--accent, #c9a962), transparent)' }} />
            
            {/* Menu items container */}
            <div className="flex flex-col space-y-6 max-w-sm mx-auto">
              {allNavLinks.map((link, idx) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group relative text-xl tracking-[0.15em] uppercase transition-all duration-300 py-3 px-4 rounded-lg hover:pl-6"
                  style={{ 
                    color: 'var(--text-muted, #9a9590)',
                    animationDelay: `${idx * 60}ms`,
                  }}
                >
                  {/* Hover background effect */}
                  <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }} />
                  
                  {/* Decorative left border on hover */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 group-hover:w-1 group-hover:h-6 transition-all duration-300" style={{ backgroundColor: 'var(--accent, #c9a962)' }} />
                  
                  {/* Menu item text */}
                  <span className="relative z-10 block text-center md:text-left">
                    {link.title}
                  </span>
                </Link>
              ))}
              
              {/* Close button at bottom */}
              <button
                onClick={() => setMenuOpen(false)}
                className="mt-8 py-3 px-6 rounded-lg text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: 'rgba(201, 169, 98, 0.1)',
                  color: 'var(--accent, #c9a962)',
                  border: '1px solid rgba(201, 169, 98, 0.3)'
                }}
              >
                Close Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;