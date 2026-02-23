'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaInstagram, FaLinkedin, FaTwitter, FaSoundcloud, FaSpotify } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAdminClick = () => {
    setShowPasswordModal(true);
    setPassword('');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === '1383') {
      router.push('/admin');
      setShowPasswordModal(false);
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleClose = () => {
    setShowPasswordModal(false);
    setPassword('');
    setError('');
  };

  const socialLinks = [
    { 
      icon: <FaInstagram className="w-5 h-5" />, 
      href: 'https://instagram.com/arashkazemi', 
      label: 'Instagram',
      delay: 100
    },
    { 
      icon: <FaLinkedin className="w-5 h-5" />, 
      href: 'https://linkedin.com/in/arashkazemi', 
      label: 'LinkedIn',
      delay: 200
    },
    { 
      icon: <FaTwitter className="w-5 h-5" />, 
      href: 'https://twitter.com/arashkazemi', 
      label: 'Twitter',
      delay: 300
    },
    { 
      icon: <FaSoundcloud className="w-5 h-5" />, 
      href: 'https://soundcloud.com/arashkazemi', 
      label: 'SoundCloud',
      delay: 400
    },
    { 
      icon: <FaSpotify className="w-5 h-5" />, 
      href: 'https://spotify.com/artist/arashkazemi', 
      label: 'Spotify',
      delay: 500
    },
    { 
      icon: <MdEmail className="w-5 h-5" />, 
      href: 'mailto:info@arashkazemi.com', 
      label: 'Email',
      delay: 600
    },
  ];

  return (
    <>
      <footer className="bg-[#1d1919] text-white py-12 border-t border-gray-800 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800 to-transparent animate-shimmer" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <div className="w-full md:w-[80%] mx-auto text-center relative space-y-6">
            
            {/* Social Media Icons */}
            <div className="flex justify-center items-center space-x-4 md:space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`
                    text-gray-400 hover:text-white transform hover:scale-110 
                    transition-all duration-300 opacity-0 translate-y-4
                    ${mounted ? 'animate-social-appear' : ''}
                  `}
                  style={{ 
                    animationDelay: `${social.delay}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Decorative line */}
            <div 
              className={`
                w-16 h-px mx-auto bg-gray-700
                opacity-0 scale-x-0
                transition-all duration-1000 ease-out
                ${mounted ? 'opacity-100 scale-x-100' : ''}
              `}
              style={{ transitionDelay: '700ms' }}
            />

            {/* Designer credit */}
            <p 
              className={`
                text-sm text-gray-400
                opacity-0 translate-y-4
                transition-all duration-1000 ease-out
                ${mounted ? 'opacity-100 translate-y-0' : ''}
              `}
              style={{ transitionDelay: '800ms' }}
            >
              Designed by Engineer Mahmood Zargari
            </p>

            {/* Admin Login Link */}
            <button
              onClick={handleAdminClick}
              className={`
                text-sm font-medium text-gray-400 hover:text-white 
                transition-colors duration-300 opacity-0 translate-y-4
                ${mounted ? 'opacity-100 translate-y-0' : ''}
              `}
              style={{ transitionDelay: '900ms' }}
            >
              Admin Panel Login
            </button>
          </div>
        </div>
      </footer>

      {/* Password Modal */}
      {showPasswordModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div 
            className="bg-[#1d1919] border border-gray-800 rounded-lg w-full max-w-md relative animate-modal-appear"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h3 className="text-lg font-medium text-white">Admin Login</h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                  Enter Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500 transition-colors"
                  placeholder="••••"
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-red-500">{error}</p>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes social-appear {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
        
        .animate-modal-appear {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .animate-social-appear {
          animation: social-appear 0.6s ease-out forwards;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </>
  );
};

export default Footer;