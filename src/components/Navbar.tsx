import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Globe, Palette, Menu, X } from 'lucide-react';
import ColorPicker from './ColorPicker';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'zh', label: '中文' }
];

interface NavbarProps {
  primaryColor: string;
  secondaryColor: string;
  onColorChange: (primary: string, secondary: string) => void;
}

export default function Navbar({ primaryColor, secondaryColor, onColorChange }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  useEffect(() => {
    document.title = t('Welcome to cubicular');
  }, [t]);

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    setShowLanguageOptions(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer hover:opacity-80">
            <img src="/logo.svg" alt="Logo" className="h-12 w-auto" />
          </div>


          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Color Picker Button */}
            <button
              onClick={() => setIsColorPickerOpen(true)}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors text-primary hover:text-primary/80"
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
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 max-h-64 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => toggleLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${i18n.language === lang.code ? 'text-primary font-bold' : 'text-black'
                        }`}
                    >
                      {lang.label}
                    </button>
                  ))}
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
              onClick={() => {
                setIsColorPickerOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Palette className="mr-2" size={20} />
              {t('pickUpColor')}
            </button>

            <div className="border-t border-gray-700 my-2 pt-2">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Language
              </p>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => toggleLanguage(lang.code)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${i18n.language === lang.code ? 'bg-primary text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <ColorPicker
        isOpen={isColorPickerOpen}
        onClose={() => setIsColorPickerOpen(false)}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        onColorChange={onColorChange}
      />
    </nav>
  );
}