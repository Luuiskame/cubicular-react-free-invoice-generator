import './App.css'
import Navbar from './components/Navbar'
import InvoiceForm from './components/invoiceForm'

// Demo App component
function App() {
  return (
    <main className='w-full min-h-screen flex flex-col gap-4 bg-gray-50 pb-20'>
      <Navbar />
      <InvoiceForm />
    </main>
  );
}

export default App;