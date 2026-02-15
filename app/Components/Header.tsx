'use client';



import { useState } from 'react';
import Link from 'next/link';
import { FaLinkedinIn, FaSoundcloud, FaInstagram, FaVimeoV } from 'react-icons/fa';
import { SiSpotify, SiApplemusic } from 'react-icons/si';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const pageLinks = [
    { id: 1, title: 'پروژه‌ها', href: '/projects' },
    { id: 2, title: 'موسیقی فیلم', href: '/film-music' },
    { id: 3, title: 'موسیقی لایبرری', href: '/library-music' },
    { id: 4, title: 'موسیقی تجاری', href: '/commercial-music' }
  ];

  const socialIcons = [
    { id: 1, icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'لینکدین' },
    { id: 2, icon: FaSoundcloud, href: 'https://soundcloud.com', label: 'ساوندکلاود' },
    { id: 3, icon: SiSpotify, href: 'https://spotify.com', label: 'اسپاتیفای' },
    { id: 4, icon: FaInstagram, href: 'https://instagram.com', label: 'اینستاگرام' },
    { id: 5, icon: SiApplemusic, href: 'https://music.apple.com', label: 'اپل موزیک' },
    { id: 6, icon: FaVimeoV, href: 'https://vimeo.com', label: 'ویمئو' },
  ];

  return (
    <header className="bg-[#1d1919] text-white">
      {/* دسکتاپ */}
      <div className="hidden md:block h-[250px]">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 h-full">
          <div className="grid grid-cols-12 gap-4 h-full items-center">
            
            {/* سمت راست - لیست عمودی صفحات */}
            <div className="col-span-3 flex flex-col justify-center space-y-4">
              {pageLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="text-sm tracking-wider text-gray-300 hover:text-white transition-colors duration-200 border-b border-transparent hover:border-gray-500 pb-1 w-fit"
                >
                  {link.title}
                </Link>
              ))}
            </div>

            {/* مرکز - نام و عنوان */}
            <div className="col-span-6 flex flex-col items-center justify-center text-center">
              <h1 className="text-[85px] font-thin tracking-[2px] leading-[1.2em] font-lato uppercase text-white/90 mt-1 mb-0 inline-block">
                آرش کاظمی
              </h1>
              <h2 className="text-lg font-light text-gray-400">
                موسیقی و صدا
              </h2>
            </div>

            {/* سمت چپ - آیکن‌های اجتماعی */}
            <div className="col-span-3 flex items-start justify-end space-x-4">
              {socialIcons.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
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

      {/* موبایل */}
      <div className="md:hidden h-[200px] flex flex-col items-center justify-start px-4 relative pt-4">
        {/* دکمه منو */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-lg font-bold mb-2"
        >
          منو
        </button>

        {/* همیشه نمایش نام و عنوان زیر منو */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-thin tracking-[2px] text-white/90 mb-1">
            آرش کاظمی
          </h1>
          <h2 className="text-base font-light text-gray-400">
            موسیقی و صدا
          </h2>
        </div>

        {/* منوی کشویی فقط صفحات */}
        {menuOpen && (
          <div className="bg-[#1d1919] w-full flex flex-col items-center py-4 space-y-2 border-t border-gray-700 z-10">
            {pageLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-white text-base hover:text-gray-300 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
