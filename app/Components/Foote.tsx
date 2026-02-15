// components/layout/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1d1919] text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="w-full md:w-[60%] mx-auto">
          
          {/* جمله هشدار */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-400 leading-relaxed max-w-2xl mx-auto">
              این کلیپ‌ها حاوی موسیقی اصلی فیلم‌ها یا برنامه‌های تلویزیونی نیستند. 
              این صحنه‌ها برای اهداف نمایشی بازسازی شده‌اند.
            </p>
          </div>

          {/* خط جداکننده */}
          <div className="w-16 h-px bg-gray-700 mx-auto mb-8"></div>

          {/* اطلاعات کپی‌رایت */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              © {currentYear} طراحی شده توسط سید محمود زرگری
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;