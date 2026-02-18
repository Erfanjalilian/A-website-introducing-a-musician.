'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type PageData = {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
};

export default function PageDisplay() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchPageData = async () => {
      if (!slug) return;
      
      setLoading(true);
      setError('');
      
      try {
        const res = await fetch('/api/pages');
        const data: PageData[] = await res.json();
        const foundPage = data.find(page => page.slug === slug);
        
        if (foundPage) {
          setPageData(foundPage);
        } else {
          setError('Page not found');
        }
      } catch (error) {
        setError('Error fetching page data');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [slug]);

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
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <h1 
            className="font-light text-3xl md:text-4xl tracking-[0.2em] uppercase mb-16"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            {slug}
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

  if (error || !pageData) {
    return (
      <div 
        className="min-h-screen py-20 md:py-28 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-body)' }}
      >
        <div 
          className="absolute top-0 left-0 right-0 h-px opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
        />
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <h1 
            className="font-light text-3xl md:text-4xl tracking-[0.2em] uppercase mb-12"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Error
          </h1>
          <div 
            className="text-center py-12 text-sm tracking-wide"
            style={{ color: 'var(--text-muted)' }}
          >
            {error || 'Page not found'}
          </div>
          <div className="flex justify-center">
            <Link 
              href="/" 
              className="px-6 py-2 text-sm tracking-[0.2em] uppercase transition-opacity hover:opacity-60"
              style={{ color: 'var(--accent)', border: '1px solid var(--border-subtle)' }}
            >
              Return Home
            </Link>
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

      <div className="max-w-4xl mx-auto px-6 md:px-10">
        
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
          {pageData.title}
        </h1>
        
        {/* Created date */}
        <div 
          className={`
            flex items-center gap-2 mb-14
            opacity-0
            ${mounted ? 'animate-fade-in-up' : ''}
          `}
          style={{ 
            color: 'var(--text-muted)',
            animationDelay: '180ms',
            animationFillMode: 'forwards'
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm tracking-wide">
            {new Date(pageData.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        {/* Divider */}
        <div 
          className={`
            w-24 h-px mb-14
            opacity-0
            ${mounted ? 'animate-fade-in' : ''}
          `}
          style={{ 
            backgroundColor: 'var(--border-subtle)',
            animationDelay: '220ms',
            animationFillMode: 'forwards'
          }}
        />

        {/* Content */}
        <div className="space-y-12">
          <section
            className={`
              opacity-0
              ${mounted ? 'animate-fade-in-up' : ''}
            `}
            style={{ 
              animationDelay: '260ms',
              animationFillMode: 'forwards'
            }}
          >
            <h2 
              className="text-sm tracking-[0.3em] uppercase mb-6"
              style={{ color: 'var(--accent)' }}
            >
              Content
            </h2>
            <div className="prose prose-lg max-w-none">
              {pageData.content.split('\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  className="text-base leading-relaxed mb-6"
                  style={{ color: 'var(--text-dim)' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        </div>

        {/* Back link */}
        <div 
          className={`
            mt-16 pt-8
            opacity-0
            ${mounted ? 'animate-fade-in-up' : ''}
          `}
          style={{ 
            borderTop: '1px solid var(--border-subtle)',
            animationDelay: '300ms',
            animationFillMode: 'forwards'
          }}
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase transition-opacity hover:opacity-60"
            style={{ color: 'var(--accent)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return Home
          </Link>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}