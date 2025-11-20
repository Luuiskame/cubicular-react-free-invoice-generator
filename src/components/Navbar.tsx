import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';


export default function Navbar() {

    const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('Welcome to cubicular');
  }, [t]);
    return(
        <nav className='flex'>
      <p className="text-3xl font-bold text-center">Cubicular</p>
      <div className='flex'>
        <button>{t('pickUpColor')}</button>
        <div className="flex gap-2 mb-4">
        <button onClick={() => i18n.changeLanguage('en')}>English</button>
        <button onClick={() => i18n.changeLanguage('es')}>Español</button>
      </div>
        
      </div>
        
        </nav>
    )
}