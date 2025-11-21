import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface InvoiceItem {
    id: number;
    description: string;
    quantity: number;
    price: number;
}

export default function InvoiceLastPart() {
    const { t } = useTranslation();
    const [items, setItems] = useState<InvoiceItem[]>([
        { id: 1, description: 'Edecan', quantity: 3, price: 4460 }
    ]);
    const [discount, setDiscount] = useState<number>(0); // Percentage
    const [tax, setTax] = useState<number>(0); // Percentage
    const [showDiscount, setShowDiscount] = useState(false);
    const [showTax, setShowTax] = useState(false);

    const handleAddItem = () => {
        const newItem: InvoiceItem = {
            id: Date.now(),
            description: '',
            quantity: 1,
            price: 0
        };
        setItems([...items, newItem]);
    };

    const handleRemoveItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleItemChange = (id: number, field: keyof InvoiceItem, value: string | number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const calculateSubTotal = () => {
        return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    };

    const calculateTotal = () => {
        const subTotal = calculateSubTotal();
        const discountAmount = subTotal * (discount / 100);
        const taxAmount = (subTotal - discountAmount) * (tax / 100);
        return subTotal - discountAmount + taxAmount;
    };

    return (
        <div className="mt-10">
            {/* Items Section */}
            <div className="mb-8">
                {/* Desktop View (Table) */}
                <div className="hidden md:block">
                    <div className="grid grid-cols-12 gap-4 bg-gray-600 text-white p-3 rounded-t-lg font-medium text-sm uppercase">
                        <div className="col-span-5 pl-2">{t('item')}</div>
                        <div className="col-span-2 text-center">{t('quantity')}</div>
                        <div className="col-span-2 text-right">{t('price')}</div>
                        <div className="col-span-2 text-right pr-2">{t('amount')}</div>
                        <div className="col-span-1"></div>
                    </div>

                    <div className="divide-y divide-gray-200 border-x border-b border-gray-200 rounded-b-lg">
                        {items.map((item) => (
                            <div key={item.id} className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-gray-50 transition-colors group">
                                <div className="col-span-5">
                                    <input
                                        type="text"
                                        value={item.description}
                                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                        className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
                                        placeholder="Item description"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))}
                                        className="w-full bg-transparent focus:outline-none text-center text-gray-700"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) => handleItemChange(item.id, 'price', Number(e.target.value))}
                                        className="w-full bg-transparent focus:outline-none text-right text-gray-700"
                                    />
                                </div>
                                <div className="col-span-2 text-right pr-2 text-gray-700 font-medium">
                                    {(item.quantity * item.price).toFixed(2)}
                                </div>
                                <div className="col-span-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
                                        title="Remove item"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile View (Cards) */}
                <div className="md:hidden space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm relative">
                            <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="absolute top-2 right-2 text-red-400 hover:text-red-600 p-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="mb-3 pr-6">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t('item')}</label>
                                <input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded p-2 focus:outline-none focus:border-blue-500"
                                    placeholder="Item description"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t('quantity')}</label>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))}
                                        className="w-full bg-gray-50 border border-gray-200 rounded p-2 focus:outline-none focus:border-blue-500 text-center"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t('price')}</label>
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) => handleItemChange(item.id, 'price', Number(e.target.value))}
                                        className="w-full bg-gray-50 border border-gray-200 rounded p-2 focus:outline-none focus:border-blue-500 text-right"
                                    />
                                </div>
                            </div>
                            <div className="mt-3 flex justify-between items-center pt-3 border-t border-gray-100">
                                <span className="text-sm font-bold text-gray-500 uppercase">{t('amount')}</span>
                                <span className="font-bold text-gray-800">{(item.quantity * item.price).toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleAddItem}
                    className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
                >
                    <span>+</span> {t('addItem')}
                </button>
            </div>

            {/* Summary Section */}
            <div className="flex flex-col md:flex-row justify-between gap-8">
                {/* Notes */}
                <div className="w-full md:w-1/2">
                    <h4 className="font-bold text-gray-700 mb-2">{t('notes')}:</h4>
                    <textarea
                        className="w-full h-24 p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 resize-none text-gray-600 text-sm"
                        placeholder={t('notesPlaceholder')}
                    ></textarea>
                </div>

                {/* Totals */}
                <div className="w-full md:w-1/2 flex flex-col space-y-3">
                    <div className="flex justify-between text-gray-600">
                        <span>{t('subTotal')}</span>
                        <span className="font-bold">{calculateSubTotal().toFixed(2)}</span>
                    </div>

                    {showDiscount && (
                        <div className="flex justify-between text-gray-600 items-center">
                            <span className="flex items-center gap-2">
                                {t('discount')}
                                <input
                                    type="number"
                                    value={discount}
                                    onChange={(e) => setDiscount(Number(e.target.value))}
                                    className="w-12 border-b border-gray-300 text-center focus:outline-none text-sm"
                                />%
                            </span>
                            <span className="font-bold text-red-500">
                                -{(calculateSubTotal() * (discount / 100)).toFixed(2)}
                            </span>
                        </div>
                    )}

                    {showTax && (
                        <div className="flex justify-between text-gray-600 items-center">
                            <span className="flex items-center gap-2">
                                {t('tax')}
                                <input
                                    type="number"
                                    value={tax}
                                    onChange={(e) => setTax(Number(e.target.value))}
                                    className="w-12 border-b border-gray-300 text-center focus:outline-none text-sm"
                                />%
                            </span>
                            <span className="font-bold">
                                +{((calculateSubTotal() - (calculateSubTotal() * (discount / 100))) * (tax / 100)).toFixed(2)}
                            </span>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 text-sm text-blue-600 font-medium">
                        {!showDiscount && (
                            <button onClick={() => setShowDiscount(true)} className="hover:underline">
                                + {t('addDiscount')}
                            </button>
                        )}
                        {!showTax && (
                            <button onClick={() => setShowTax(true)} className="hover:underline">
                                + {t('addTax')}
                            </button>
                        )}
                    </div>

                    {/* Grand Total */}
                    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mt-4">
                        <span className="font-bold text-gray-700 text-lg">{t('total')}</span>
                        <span className="font-bold text-gray-900 text-xl">
                            lps {calculateTotal().toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
