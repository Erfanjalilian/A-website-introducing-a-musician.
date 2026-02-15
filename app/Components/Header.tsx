// components/layout/Header.tsx
import Link from 'next/link';
import { FaLinkedinIn, FaSoundcloud, FaInstagram, FaVimeoV } from 'react-icons/fa';
import { SiSpotify, SiApplemusic } from 'react-icons/si';

const Header = () => {
  // لیست صفحات برای نمایش عمودی - به فارسی
  const pageLinks = [
    { id: 1, title: 'پروژه‌ها', href: '/projects' },
    { id: 2, title: 'موسیقی فیلم', href: '/film-music' },
    { id: 3, title: 'موسیقی لایبرری', href: '/library-music' },
    { id: 4, title: 'موسیقی تجاری', href: '/commercial-music' },
    { id: 5, title: 'طراحی صدا', href: '/sound-design' },
    { id: 6, title: 'تماس', href: '/contact' },
  ];

  // آیکن‌های شبکه‌های اجتماعی
  const socialIcons = [
    { id: 1, icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'لینکدین' },
    { id: 2, icon: FaSoundcloud, href: 'https://soundcloud.com', label: 'ساوندکلاود' },
    { id: 3, icon: SiSpotify, href: 'https://spotify.com', label: 'اسپاتیفای' },
    { id: 4, icon: FaInstagram, href: 'https://instagram.com', label: 'اینستاگرام' },
    { id: 5, icon: SiApplemusic, href: 'https://music.apple.com', label: 'اپل موزیک' },
    { id: 6, icon: FaVimeoV, href: 'https://vimeo.com', label: 'ویمئو' },
  ];

  return (
    <header className="bg-[#1d1919] text-white h-[200px] md:h-[250px]">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 h-full">
        <div className="grid grid-cols-12 gap-2 md:gap-4 h-full items-center">
          
          {/* سمت راست - لیست عمودی صفحات */}
          <div className="col-span-4 md:col-span-3 flex flex-col justify-center space-y-1 md:space-y-4">
            {pageLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-[10px] md:text-sm tracking-wider text-gray-300 hover:text-white transition-colors duration-200 border-b border-transparent hover:border-gray-500 pb-0.5 md:pb-1 w-fit"
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* مرکز - نام و عنوان به فارسی */}
          <div className="col-span-4 md:col-span-6 flex flex-col items-center justify-center text-center">
            <h1 className="text-lg md:text-5xl lg:text-7xl font-light tracking-wide text-white mb-0.5 md:mb-4">
              آرش کاظمی
            </h1>
            <h2 className="text-[8px] md:text-lg lg:text-xl font-light text-gray-400">
              موسیقی و صدا
            </h2>
          </div>

          {/* سمت چپ - آیکن‌های اجتماعی */}
          <div className="col-span-4 md:col-span-3 flex items-start justify-end">
            <div className="flex space-x-5 md:space-x-4">
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
                    <Icon className="w-2.5 h-2.5 md:w-5 md:h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;