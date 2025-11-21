import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InvoiceSecondPart from './InvoiceSecondPart';


export default function InvoiceForm() {
    const { t } = useTranslation();
    const [logo, setLogo] = useState<string | null>(null);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setLogo(ev.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="w-full lg:w-[60%] mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
            {/* Top Section: Logo and Invoice Title */}
            <div className="flex justify-between items-start mb-8">
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
                        className="text-4xl font-bold text-gray-400 text-right uppercase tracking-wide focus:outline-none focus:text-gray-600 placeholder-gray-300 w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 transition-all"
                    />
                    <div className="mt-2 w-full">
                        <input
                            type="text"
                            placeholder={t('invoiceExtraInfo')}
                            className="text-right text-gray-500 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Company Details Section */}
            <div className="flex flex-col space-y-2 mb-10">
                <input
                    type="text"
                    placeholder={t('companyName')}
                    className="text-xl font-bold text-gray-800 placeholder-gray-400 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                />
                <input
                    type="text"
                    placeholder={t('yourName')}
                    className="text-gray-600 placeholder-gray-400 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                />
                <input
                    type="text"
                    placeholder={t('companyAddress')}
                    className="text-gray-600 placeholder-gray-400 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                />
                <input
                    type="text"
                    placeholder={t('cityStateZip')}
                    className="text-gray-600 placeholder-gray-400 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                />
                <input
                    type="text"
                    placeholder={t('country')}
                    className="text-gray-600 placeholder-gray-400 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                />
            </div>

            <InvoiceSecondPart />
        </div>
    );
}