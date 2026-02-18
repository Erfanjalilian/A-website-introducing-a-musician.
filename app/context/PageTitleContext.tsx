'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Page = {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
};

type PageTitleContextType = {
  pages: Page[];
  setPages: (pages: Page[]) => void;
};

const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined);

export function PageTitleProvider({ children }: { children: ReactNode }) {
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await fetch('/api/pages'); // مسیر API شما
        if (!res.ok) throw new Error('Failed to fetch pages');
        const data: Page[] = await res.json();
        setPages(data); // آرایه صفحات را داخل state میریزیم
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };

    fetchPages();
  }, []);

  return (
    <PageTitleContext.Provider value={{ pages, setPages }}>
      {children}
    </PageTitleContext.Provider>
  );
}

export function usePageTitle() {
  const context = useContext(PageTitleContext);
  if (!context) {
    throw new Error('usePageTitle must be used inside PageTitleProvider');
  }
  return context;
}
