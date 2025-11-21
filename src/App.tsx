import { useEffect, useState } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import InvoiceForm from './components/invoiceForm'

// Demo App component
function App() {
  const [primaryColor, setPrimaryColor] = useState('#1e3a8a');
  const [secondaryColor, setSecondaryColor] = useState('#64748b');

  useEffect(() => {
    const storedPrimary = localStorage.getItem('theme-primary');
    const storedSecondary = localStorage.getItem('theme-secondary');

    if (storedPrimary) {
      setPrimaryColor(storedPrimary);
      document.documentElement.style.setProperty('--color-primary', storedPrimary);
    }
    if (storedSecondary) {
      setSecondaryColor(storedSecondary);
      document.documentElement.style.setProperty('--color-secondary', storedSecondary);
    }
  }, []);

  const handleColorChange = (primary: string, secondary: string) => {
    setPrimaryColor(primary);
    setSecondaryColor(secondary);
    localStorage.setItem('theme-primary', primary);
    localStorage.setItem('theme-secondary', secondary);
    document.documentElement.style.setProperty('--color-primary', primary);
    document.documentElement.style.setProperty('--color-secondary', secondary);
  };

  return (
    <main className='w-full min-h-screen flex flex-col gap-4 bg-gray-50 pb-20'>
      <Navbar
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        onColorChange={handleColorChange}
      />
      <InvoiceForm
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </main>
  );
}

export default App;