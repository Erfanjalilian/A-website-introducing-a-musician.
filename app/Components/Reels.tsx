// components/DemoVideos.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlayIcon } from '@heroicons/react/24/solid';

// تعریف نوع داده برای ویدئوهای دمو
interface DemoVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
}

const DemoVideos = () => {
  const [videos, setVideos] = useState<DemoVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // دریافت داده‌ها از API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://6991a6e96279728b01550164.mockapi.io/songs/DemoVideos');
        
        if (!response.ok) {
          throw new Error('خطا در دریافت داده‌ها');
        }
        
        const data = await response.json();
        setVideos(data);
        setError(null);
      } catch (err) {
        setError('مشکلی در بارگذاری ویدئوها پیش آمده است');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#1d1919] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="w-full md:w-[60%] mx-auto">
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
          <div className="w-full md:w-[60%] mx-auto">
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
            <hr /><br />
        <p className='text-center'>تمام موسیقی‌های اصلی ساخته، تنظیم، رهبری و در جلسات استودیویی با نوازندگان واقعی ضبط شده‌اند.</p>
        <br /><br />
          
          {/* اگر ویدئویی وجود نداشت */}
          {videos.length === 0 && (
            <p className="text-center text-gray-400 py-12">
              هیچ ویدئوی دمویی یافت نشد.
            </p>
          )}

          {/* شبکه ویدئوها - ۲ ستونه */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="flex flex-col">
                
                {/* کارت ویدئو با دکمه پخش */}
                <div className="group relative w-full aspect-video overflow-hidden bg-gray-800 cursor-pointer">
                  {/* تصویر بندانگشتی */}
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* لایه تیره روی تصویر */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
                  
                  {/* دکمه پخش */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <PlayIcon className="w-8 h-8 text-[#1d1919] ml-1" />
                    </div>
                  </div>

                  {/* دسته‌بندی (اختیاری) */}
                  {video.category && (
                    <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      {video.category === 'game-audio' && 'بازی'}
                      {video.category === 'film-audio' && 'فیلم'}
                      {video.category === 'vr-audio' && 'واقعیت مجازی'}
                    </div>
                  )}
                </div>

                {/* توضیحات زیر ویدئو */}
                <div className="mt-4 text-right">
                  <h3 className="text-lg font-medium text-white mb-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">
                    {video.description}
                  </p>
                  
                  {/* متن اصلی ساخته شده با نوازندگان واقعی */}
                  <p className="text-sm text-gray-400 mt-4 italic border-r-2 border-gray-600 pr-4">
                    تمام موسیقی‌های اصلی ساخته، ارکستراسیون، رهبری و ضبط شده در جلسات استودیویی با نوازندگان حرفه‌ای.
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

export default DemoVideos;