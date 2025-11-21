import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Globe, Palette, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  useEffect(() => {
    document.title = t('Welcome to cubicular');
  }, [t]);

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setShowLanguageOptions(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <p className="text-2xl font-bold tracking-wider">Cubicular</p>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Color Picker Button */}
            <button
              className="p-2 rounded-full hover:bg-gray-700 transition-colors text-indigo-400 hover:text-indigo-300"
              title={t('pickUpColor')}
            >
              <Palette size={24} />
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageOptions(!showLanguageOptions)}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                title="Change Language"
              >
                <Globe size={24} />
              </button>

              {showLanguageOptions && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                  <button
                    onClick={() => toggleLanguage('en')}
                    className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
                  >
                    English
                  </button>
                  <button
                    onClick={() => toggleLanguage('es')}
                    className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
                  >
                    Español
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Palette className="mr-2" size={20} />
              {t('pickUpColor')}
            </button>

            <div className="border-t border-gray-700 my-2 pt-2">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Language
              </p>
              <button
                onClick={() => toggleLanguage('en')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${i18n.language === 'en' ? 'bg-red-500 text-black' : 'text-black hover:text-white hover:bg-gray-700'
                  }`}
              >
                English
              </button>
              <button
                onClick={() => toggleLanguage('es')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${i18n.language === 'es' ? 'bg-red-500 text-black' : 'text-black hover:text-white hover:bg-gray-700'
                  }`}
              >
                Español
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}