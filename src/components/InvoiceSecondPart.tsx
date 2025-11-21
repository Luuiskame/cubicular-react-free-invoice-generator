import { useTranslation } from 'react-i18next';

interface InvoiceSecondPartProps {
    data: {
        clientName: string;
        clientAddress: string;
        clientCityStateZip: string;
        clientCountry: string;
        clientAdditionalInfo: string;
        invoiceNumber: string;
        date: string;
        dueDate: string;
    };
    onChange: (field: string, value: string) => void;
}

export default function InvoiceSecondPart({ data, onChange }: InvoiceSecondPartProps) {
    const { t } = useTranslation();

    return (
        <div className="">
            <div className="flex flex-col md:flex-row justify-between gap-8">
                {/* Left Side: Client Details */}
                <div className="w-full md:w-1/2 flex flex-col space-y-4">
                    <h3 className="font-bold text-gray-800">{t('to')}</h3>
                    <input
                        type="text"
                        placeholder={t('clientName')}
                        value={data.clientName}
                        onChange={(e) => onChange('clientName', e.target.value)}
                        className="text-gray-700 placeholder-gray-400 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                    />
                    <input
                        type="text"
                        placeholder={t('clientAddress')}
                        value={data.clientAddress}
                        onChange={(e) => onChange('clientAddress', e.target.value)}
                        className="text-gray-600 placeholder-gray-400 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                    />
                    <input
                        type="text"
                        placeholder={t('cityStateZip')}
                        value={data.clientCityStateZip}
                        onChange={(e) => onChange('clientCityStateZip', e.target.value)}
                        className="text-gray-600 placeholder-gray-400 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                    />
                    <input
                        type="text"
                        placeholder={t('country')}
                        value={data.clientCountry}
                        onChange={(e) => onChange('clientCountry', e.target.value)}
                        className="text-gray-600 placeholder-gray-400 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                    />
                    <input
                        type="text"
                        placeholder={t('aditionalInfo')}
                        value={data.clientAdditionalInfo}
                        onChange={(e) => onChange('clientAdditionalInfo', e.target.value)}
                        className="text-gray-600 placeholder-gray-400 focus:outline-none w-full border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                    />
                </div>

                {/* Right Side: Invoice Meta */}
                <div className="w-full md:w-1/2 flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-bold text-gray-800">{t('invoiceNumber')}</label>
                        <input
                            type="text"
                            value={data.invoiceNumber}
                            onChange={(e) => onChange('invoiceNumber', e.target.value)}
                            className="text-right text-gray-600 focus:outline-none w-1/2 border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label className="font-bold text-gray-800">{t('date')}</label>
                        <input
                            type="date"
                            value={data.date}
                            onChange={(e) => onChange('date', e.target.value)}
                            className="text-right text-gray-600 focus:outline-none w-1/2 border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label className="font-bold text-gray-800">{t('dueDate')}</label>
                        <input
                            type="date"
                            value={data.dueDate}
                            onChange={(e) => onChange('dueDate', e.target.value)}
                            className="text-right text-gray-600 focus:outline-none w-1/2 border border-transparent hover:border-gray-200 focus:border-gray-300 rounded px-2 py-1 transition-all"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

