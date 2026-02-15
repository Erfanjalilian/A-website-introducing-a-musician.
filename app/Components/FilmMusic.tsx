// components/FilmMusic.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// تعریف نوع داده برای پروژه‌های موسیقی فیلم
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

  // دریافت داده‌ها از API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // فیلتر کردن پروژه‌های با دسته‌بندی film-music
        const response = await fetch('https://6991a5b96279728b0154fe77.mockapi.io/theSong/Projects');
        
        if (!response.ok) {
          throw new Error('خطا در دریافت داده‌ها');
        }
        
        const data = await response.json();
        // فیلتر برای موسیقی فیلم
        const filmProjects = data.filter((project: FilmProject) => project.category === 'film-music');
        setProjects(filmProjects);
        setError(null);
      } catch (err) {
        setError('مشکلی در بارگذاری پروژه‌ها پیش آمده است');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // توضیحات پیش‌فرض برای هر پروژه (چون API ما description ندارد)
  const getProjectDescription = (project: FilmProject) => {
    const descriptions: { [key: string]: string } = {
      '1': 'این یک دموی ارکسترال سینماتیک و تاریک است که با تم "Carol of the Bells" ساخته شده و برای تریلر فیلم کریسمسی ابرقهرمانی مناسب است.',
      '2': 'این یک بازسازی MIDI از موسیقی تیتراژ اصلی فیلم The Omen (2006) ساخته Marco Beltrami با نمره کامل است.',
      '3': 'تمام موسیقی‌های اصلی ساخته، ارکستراسیون، رهبری و ضبط شده در جلسات استودیویی با نوازندگان حرفه‌ای.',
    };
    
    return descriptions[project.id] || 'توضیحات مربوط به این پروژه موسیقی فیلم. این قطعه برای اهداف نمایشی ساخته شده است.';
  };

  if (loading) {
    return (
      <section className="bg-[#1d1919] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="w-[60%] mx-auto">
            <h2 className="text-3xl font-light tracking-wide text-white mb-10 text-center">
              موسیقی فیلم
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
              موسیقی فیلم
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
          
          {/* عنوان بخش */}
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-white mb-12 text-center">
            موسیقی فیلم
          </h2>
          <hr />
          <br /><br />

          {/* اگر پروژه‌ای وجود نداشت */}
          {projects.length === 0 && (
            <p className="text-center text-gray-400 py-12">
              هیچ پروژه موسیقی فیلمی یافت نشد.
            </p>
          )}

          {/* شبکه پروژه‌ها - ۲ ستونه */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col">
                
                {/* کارت پروژه */}
                <Link href={`/projects/${project.slug}`} className="group">
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-800">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* سال پروژه (اختیاری) */}
                    {project.year && (
                      <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        {project.year}
                      </div>
                    )}
                  </div>
                </Link>

                {/* توضیحات زیر فیلم */}
                <div className="mt-4 text-right">
                  <h3 className="text-lg font-medium text-white mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                    {getProjectDescription(project)}
                  </p>
                  
                  {/* اخطار برای دمو بودن (مطابق با طراحی مرجع) */}
                  <p className="text-xs text-gray-500 mt-3 italic">
                    این کلیپ‌ها حاوی موسیقی اصلی فیلم‌ها نیستند. این صحنه‌ها برای اهداف نمایشی بازسازی شده‌اند.
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