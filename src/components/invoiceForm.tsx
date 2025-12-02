import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import InvoiceSecondPart from './InvoiceSecondPart';
import InvoiceLastPart, { type InvoiceItem } from './InvoiceLastPart';
import PrintableInvoice from './PrintableInvoice';

interface InvoiceFormProps {
    primaryColor: string;
    secondaryColor: string;
}

interface CompanyInfo {
    companyName: string;
    yourName: string;
    companyAddress: string;
    cityStateZip: string;
    country: string;
}

interface ClientInfo {
    clientName: string;
    clientAddress: string;
    clientCityStateZip: string;
    clientCountry: string;
    clientAdditionalInfo: string;
    invoiceNumber: string;
    date: string;
    dueDate: string;
}

export default function InvoiceForm({ primaryColor, secondaryColor }: InvoiceFormProps) {
    const { t } = useTranslation();
    const [logo, setLogo] = useState<string | null>(() => {
        return localStorage.getItem('invoice-logo');
    });
    const [isClient] = useState(() => typeof window !== 'undefined');

    useEffect(() => {
        if (logo) {
            localStorage.setItem('invoice-logo', logo);
        } else {
            localStorage.removeItem('invoice-logo');
        }
    }, [logo]);

    // Company Info State
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
        const saved = localStorage.getItem('invoice-company-info');
        return saved ? JSON.parse(saved) : {
            companyName: '',
            yourName: '',
            companyAddress: '',
            cityStateZip: '',
            country: ''
        };
    });

    useEffect(() => {
        localStorage.setItem('invoice-company-info', JSON.stringify(companyInfo));
    }, [companyInfo]);

    // Client & Invoice Meta State
    const [clientInfo, setClientInfo] = useState<ClientInfo>(() => {
        const saved = localStorage.getItem('invoice-client-info');
        const defaultState = {
            clientName: '',
            clientAddress: '',
            clientCityStateZip: '',
            clientCountry: '',
            clientAdditionalInfo: '',
            invoiceNumber: 'INV-12',
            date: '',
            dueDate: ''
        };
        if (saved) {
            const parsed = JSON.parse(saved);
            // Exclude date and dueDate from persistence as requested
            return { ...parsed, date: '', dueDate: '' };
        }
        return defaultState;
    });

    useEffect(() => {
        // Save everything except date and dueDate
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { date, dueDate, ...infoToSave } = clientInfo;
        localStorage.setItem('invoice-client-info', JSON.stringify(infoToSave));
    }, [clientInfo]);

    // Items & Totals State
    const [items, setItems] = useState<InvoiceItem[]>(() => {
        const saved = localStorage.getItem('invoice-items');
        return saved ? JSON.parse(saved) : [{ id: 1, description: '', quantity: 0, price: 0 }];
    });

    useEffect(() => {
        localStorage.setItem('invoice-items', JSON.stringify(items));
    }, [items]);

    const [discount, setDiscount] = useState<string | number>(() => localStorage.getItem('invoice-discount') || '');
    const [tax, setTax] = useState<string | number>(() => localStorage.getItem('invoice-tax') || '');
    const [discountLabel, setDiscountLabel] = useState(() => localStorage.getItem('invoice-discount-label') || 'Discount');
    const [taxLabel, setTaxLabel] = useState(() => localStorage.getItem('invoice-tax-label') || 'Tax');
    const [notes, setNotes] = useState(() => localStorage.getItem('invoice-notes') || '');
    const [showDiscount, setShowDiscount] = useState(() => localStorage.getItem('invoice-show-discount') === 'true');
    const [showTax, setShowTax] = useState(() => localStorage.getItem('invoice-show-tax') === 'true');
    const [title, setTitle] = useState(() => localStorage.getItem('invoice-title') || '');
    const [extraInfo, setExtraInfo] = useState(() => localStorage.getItem('invoice-extra-info') || '');
    const [currency, setCurrency] = useState(() => localStorage.getItem('invoice-currency') || '$');

    useEffect(() => {
        localStorage.setItem('invoice-discount', String(discount));
        localStorage.setItem('invoice-tax', String(tax));
        localStorage.setItem('invoice-discount-label', discountLabel);
        localStorage.setItem('invoice-tax-label', taxLabel);
        localStorage.setItem('invoice-notes', notes);
        localStorage.setItem('invoice-show-discount', String(showDiscount));
        localStorage.setItem('invoice-show-tax', String(showTax));
        localStorage.setItem('invoice-title', title);
        localStorage.setItem('invoice-extra-info', extraInfo);
        localStorage.setItem('invoice-currency', currency);
    }, [discount, tax, discountLabel, taxLabel, notes, showDiscount, showTax, title, extraInfo, currency]);

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

    const handlePrintPDF = () => {
        if (!isClient) return;

        const element = document.querySelector('.print-invoice-content') as HTMLElement | null;
        if (!element) return;

        const filename = `invoice-${clientInfo.invoiceNumber || 'document'}.pdf`;

        html2pdf()
            .set({
                margin: [0.5, 0.5, 0.5, 0.5],
                filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            })
            .from(element)
            .save();
    };

    return (
        <div className="w-full lg:w-[60%] mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 relative">
            {/* Top Section: Logo and Invoice Title */}
            <div className="flex flex-col items-center gap-4 justify-center lg:flex-row lg:items-start lg:justify-between  mb-8 mt-8">
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
                <div className="flex flex-col items-center justify-center">
                    <input
                        type="text"
                        defaultValue={t('invoiceTitle')}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-4xl font-bold text-gray-400 text-center uppercase tracking-wide focus:outline-none focus:text-gray-600 placeholder-gray-300 w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 transition-all"
                    />
                    <div className="mt-2 w-full">
                        <input
                            type="text"
                            placeholder={t('invoiceExtraInfo')}
                            value={extraInfo}
                            onChange={(e) => setExtraInfo(e.target.value)}
                            className="text-center text-gray-500 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                        />
                    </div>
                    <div className="mt-1 w-full flex justify-center items-center gap-2">
                        <label className="text-xs text-gray-400 font-medium uppercase">
                            {t('currency')}:
                        </label>
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
                discountLabel={discountLabel}
                onDiscountLabelChange={setDiscountLabel}
                taxLabel={taxLabel}
                onTaxLabelChange={setTaxLabel}
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
                    <button
                        onClick={handlePrintPDF}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors shadow-md font-medium text-base"
                    >
                        <Download className="w-5 h-5" /> {t('downloadPDF')}
                    </button>
                </div>
            )}

            {/* Printable Invoice (Hidden) */}
            <PrintableInvoice
                logo={logo}
                companyInfo={companyInfo}
                clientInfo={clientInfo}
                items={items.filter(item => item && typeof item.id === 'number')}
                discount={discount}
                tax={tax}
                discountLabel={discountLabel}
                taxLabel={taxLabel}
                notes={notes}
                title={title}
                extraInfo={extraInfo}
                currency={currency}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                labels={{
                    billTo: t('to'),
                    invoiceNumber: t('invoiceNumber'),
                    date: t('date'),
                    dueDate: t('dueDate'),
                    itemDescription: t('item'),
                    quantity: t('quantity'),
                    price: t('price'),
                    amount: t('amount'),
                    subTotal: t('subTotal'),
                    total: t('total'),
                    notes: t('notes')
                }}
            />
        </div>
    );
}