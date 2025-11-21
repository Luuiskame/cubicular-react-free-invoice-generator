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
      {/* Hero Section */}
      <div className="w-full max-w-4xl mx-auto text-center px-4 mt-8 mb-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Invoice<span className="text-primary">Hood</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
          A free, professional invoice generator for freelancers and businesses.
          Create and download PDF invoices in seconds without dealing with logins, watermarks, or abusive ads.
        </p>
      </div>

      <InvoiceForm
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />

      {/* SEO Content & Features Section */}
      <div className="w-full max-w-4xl mx-auto px-6 py-12 space-y-12 text-gray-700">
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            The Easiest Way to Create Invoices Online
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">100% Free & No Login</h3>
              <p className="text-gray-600">
                Generate unlimited invoices without creating an account or paying a subscription fee.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Professional PDF Templates</h3>
              <p className="text-gray-600">
                Download clean, professionally designed PDF invoices that look great on any device.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                Your data stays in your browser. We don't store your client or invoice details on our servers.
              </p>
            </div>
          </div>
        </section>

        <section className="prose prose-lg max-w-none text-gray-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose InvoiceHood?</h2>
          <p>
            InvoiceHood is designed for freelancers, contractors, and small business owners who need a simple, reliable tool to bill clients.
            Unlike other platforms that hide features behind paywalls or force you to sign up, we believe in keeping things simple and accessible.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Instant PDF generation</li>
                <li>Customizable colors and branding</li>
                <li>Automatic tax and discount calculations</li>
                <li>Support for all major currencies</li>
                <li>Multi-language support (English, Spanish, French, etc.)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Perfect For</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Freelance Designers & Developers</li>
                <li>Consultants & Contractors</li>
                <li>Small Business Owners</li>
                <li>Service Providers</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;