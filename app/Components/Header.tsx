'use client';

import { useState, useEffect, JSX } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, HomeIcon, FolderIcon, UserIcon, BriefcaseIcon, DocumentIcon } from '@heroicons/react/24/outline';

type Page = {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
};

// Map of icons for different link types
const getIconForLink = (title: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    'Home': <HomeIcon className="w-5 h-5" />,
    'Projects': <FolderIcon className="w-5 h-5" />,
    'Biography': <UserIcon className="w-5 h-5" />,
    'Portfolio Page': <BriefcaseIcon className="w-5 h-5" />,
  };
  
  // Default icon for dynamic pages
  return iconMap[title] || <DocumentIcon className="w-5 h-5" />;
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
    <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'var(--bg-header)' }}>
      <div className="absolute top-0 left-0 right-0 h-px opacity-50 animate-border-glow" style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />

      {/* Desktop */}
      <div className="hidden md:block py-4">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between">
            {/* Left side - Navigation Links with Icons */}
            <div className="flex items-center space-x-8">
              {allNavLinks.map((link, idx) => (
                <Link 
                  key={link.id} 
                  href={link.href} 
                  className="group flex items-center space-x-2 text-sm tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-300 animate-link-slide-in"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <span className="transform group-hover:scale-110 transition-transform duration-300">
                    {getIconForLink(link.title)}
                  </span>
                  <span>{link.title}</span>
                </Link>
              ))}
            </div>

            {/* Right side - Name */}
            <div className="flex items-center">
              <span 
                className="font-light tracking-[0.15em] uppercase text-lg animate-fade-in-up"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text-primary)',
                  animationDelay: '300ms'
                }}
              >
                Arash Kazemi
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-5 py-4 relative">
          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="z-50 p-2 rounded-lg hover:bg-white/5 transition-colors duration-200" 
            style={{ color: 'var(--text-muted)' }} 
            aria-expanded={menuOpen} 
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <XMarkIcon className="w-6 h-6" strokeWidth={1.5} /> : <Bars3Icon className="w-6 h-6" strokeWidth={1.5} />}
          </button>

          {/* Name in mobile (only visible when menu is closed) */}
          {!menuOpen && (
            <span 
              className="font-light tracking-[0.12em] uppercase text-base"
              style={{ 
                fontFamily: 'var(--font-display)',
                color: 'var(--text-primary)'
              }}
            >
              Arash Kazemi
            </span>
          )}

          {/* Empty div for spacing on the right when menu is closed */}
          {!menuOpen && <div className="w-10"></div>}
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
            <div className="flex flex-col space-y-4 max-w-sm mx-auto">
              {allNavLinks.map((link, idx) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group relative flex items-center space-x-4 text-lg tracking-[0.15em] uppercase transition-all duration-300 py-3 px-4 rounded-lg hover:pl-6"
                  style={{ 
                    color: 'var(--text-muted, #9a9590)',
                    animationDelay: `${idx * 60}ms`,
                  }}
                >
                  {/* Hover background effect */}
                  <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }} />
                  
                  {/* Decorative left border on hover */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 group-hover:w-1 group-hover:h-6 transition-all duration-300" style={{ backgroundColor: 'var(--accent, #c9a962)' }} />
                  
                  {/* Icon */}
                  <span className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                    {getIconForLink(link.title)}
                  </span>
                  
                  {/* Menu item text */}
                  <span className="relative z-10">
                    {link.title}
                  </span>
                </Link>
              ))}
              
              {/* Close button at bottom */}
              <button
                onClick={() => setMenuOpen(false)}
                className="mt-6 py-3 px-6 rounded-lg text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                style={{ 
                  backgroundColor: 'rgba(201, 169, 98, 0.1)',
                  color: 'var(--accent, #c9a962)',
                  border: '1px solid rgba(201, 169, 98, 0.3)'
                }}
              >
                <XMarkIcon className="w-4 h-4" />
                <span>Close Menu</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;