import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import InvoiceSecondPart from './InvoiceSecondPart';
import InvoiceLastPart, { type InvoiceItem } from './InvoiceLastPart';
import InvoicePDF from './invoicePDF';

export default function InvoiceForm() {
    const { t } = useTranslation();
    const [logo, setLogo] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Company Info State
    const [companyInfo, setCompanyInfo] = useState({
        companyName: '',
        yourName: '',
        companyAddress: '',
        cityStateZip: '',
        country: ''
    });

    // Client & Invoice Meta State
    const [clientInfo, setClientInfo] = useState({
        clientName: '',
        clientAddress: '',
        clientCityStateZip: '',
        clientCountry: '',
        clientAdditionalInfo: '',
        invoiceNumber: 'INV-12',
        date: '',
        dueDate: ''
    });

    // Items & Totals State
    const [items, setItems] = useState<InvoiceItem[]>([
        { id: 1, description: '', quantity: 0, price: 0 }
    ]);
    const [discount, setDiscount] = useState<string | number>('');
    const [tax, setTax] = useState<string | number>('');
    const [notes, setNotes] = useState('');
    const [showDiscount, setShowDiscount] = useState(false);
    const [showTax, setShowTax] = useState(false);
    const [title, setTitle] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [currency, setCurrency] = useState('$');

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setLogo(ev.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleCompanyChange = (field: string, value: string) => {
        setCompanyInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleClientChange = (field: string, value: string) => {
        setClientInfo(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="w-full lg:w-[60%] mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 relative">
            {/* Top Section: Logo and Invoice Title */}
            <div className="flex justify-between items-start mb-8 mt-8">
                {/* Logo Placeholder */}
                <div className="w-48 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden group hover:border-gray-400 transition-colors">
                    {logo ? (
                        <img src={logo} alt="Company Logo" className="w-full h-full object-contain" />
                    ) : (
                        <div className="text-center p-4">
                            <p className="text-gray-400 text-sm font-medium">{t('addLogo')}</p>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>

                {/* Invoice Title / Extra Info */}
                <div className="flex flex-col items-end w-1/2">
                    <input
                        type="text"
                        defaultValue={t('invoiceTitle')}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-4xl font-bold text-gray-400 text-right uppercase tracking-wide focus:outline-none focus:text-gray-600 placeholder-gray-300 w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 transition-all"
                    />
                    <div className="mt-2 w-full">
                        <input
                            type="text"
                            placeholder={t('invoiceExtraInfo')}
                            value={extraInfo}
                            onChange={(e) => setExtraInfo(e.target.value)}
                            className="text-right text-gray-500 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                        />
                    </div>
                    <div className="mt-1 w-full flex justify-end items-center gap-2">
                        <label className="text-xs text-gray-400 font-medium uppercase">Currency:</label>
                        <input
                            type="text"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="text-right text-gray-500 focus:outline-none w-16 border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Company Details Section */}
            <div className="flex flex-col space-y-2 mb-10">
                <input
                    type="text"
                    placeholder={t('companyName')}
                    value={companyInfo.companyName}
                    onChange={(e) => handleCompanyChange('companyName', e.target.value)}
                    className="text-xl font-bold text-gray-800 placeholder-gray-400 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                />
                <input
                    type="text"
                    placeholder={t('yourName')}
                    value={companyInfo.yourName}
                    onChange={(e) => handleCompanyChange('yourName', e.target.value)}
                    className="text-gray-600 placeholder-gray-400 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                />
                <input
                    type="text"
                    placeholder={t('companyAddress')}
                    value={companyInfo.companyAddress}
                    onChange={(e) => handleCompanyChange('companyAddress', e.target.value)}
                    className="text-gray-600 placeholder-gray-400 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                />
                <input
                    type="text"
                    placeholder={t('cityStateZip')}
                    value={companyInfo.cityStateZip}
                    onChange={(e) => handleCompanyChange('cityStateZip', e.target.value)}
                    className="text-gray-600 placeholder-gray-400 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                />
                <input
                    type="text"
                    placeholder={t('country')}
                    value={companyInfo.country}
                    onChange={(e) => handleCompanyChange('country', e.target.value)}
                    className="text-gray-600 placeholder-gray-400 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                />
            </div>

            <InvoiceSecondPart
                data={clientInfo}
                onChange={handleClientChange}
            />

            <InvoiceLastPart
                items={items}
                onItemsChange={setItems}
                discount={discount}
                onDiscountChange={setDiscount}
                tax={tax}
                onTaxChange={setTax}
                notes={notes}
                onNotesChange={setNotes}
                showDiscount={showDiscount}
                onShowDiscountChange={setShowDiscount}
                showTax={showTax}
                onShowTaxChange={setShowTax}
                currency={currency}
            />

            {/* Download Button */}
            {isClient && (
                <div className="mt-8 flex justify-end">
                    <PDFDownloadLink
                        document={
                            <InvoicePDF
                                logo={logo}
                                companyInfo={companyInfo}
                                clientInfo={clientInfo}
                                items={items}
                                discount={discount}
                                tax={tax}
                                notes={notes}
                                title={title}
                                extraInfo={extraInfo}
                                currency={currency}
                            />
                        }
                        fileName="invoice.pdf"
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium text-base"
                    >
                        {({ loading }) => (loading ? 'Generating...' : <><Download className="w-5 h-5" /> {t('downloadPDF')}</>)}
                    </PDFDownloadLink>
                </div>
            )}
        </div>
    );
}