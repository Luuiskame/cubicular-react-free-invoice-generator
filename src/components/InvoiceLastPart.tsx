import { useTranslation } from 'react-i18next';
import { Trash2, Plus, X } from 'lucide-react';

export interface InvoiceItem {
    id: number;
    description: string;
    quantity: number | string;
    price: number | string;
}

interface InvoiceLastPartProps {
    items: InvoiceItem[];
    onItemsChange: (items: InvoiceItem[]) => void;
    discount: string | number;
    onDiscountChange: (value: string | number) => void;
    tax: string | number;
    onTaxChange: (value: string | number) => void;
    discountLabel: string;
    onDiscountLabelChange: (value: string) => void;
    taxLabel: string;
    onTaxLabelChange: (value: string) => void;
    notes: string;
    onNotesChange: (value: string) => void;
    showDiscount: boolean;
    onShowDiscountChange: (value: boolean) => void;
    showTax: boolean;
    onShowTaxChange: (value: boolean) => void;
    currency: string;
}

const safeNumber = (value: string | number): number => {
    const num = Number(value);
    return Number.isFinite(num) ? num : 0;
};

export default function InvoiceLastPart({
    items,
    onItemsChange,
    discount,
    onDiscountChange,
    tax,
    onTaxChange,
    discountLabel,
    onDiscountLabelChange,
    taxLabel,
    onTaxLabelChange,
    notes,
    onNotesChange,
    showDiscount,
    onShowDiscountChange,
    showTax,
    onShowTaxChange,
    currency
}: InvoiceLastPartProps) {
    const { t } = useTranslation();

    const handleAddItem = () => {
        const newItem: InvoiceItem = {
            id: Date.now(),
            description: '',
            quantity: 1,
            price: 0
        };
        onItemsChange([...items, newItem]);
    };

    const handleRemoveItem = (id: number) => {
        onItemsChange(items.filter(item => item.id !== id));
    };

    const handleItemChange = (id: number, field: keyof InvoiceItem, value: string | number) => {
        onItemsChange(items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleRemoveDiscount = () => {
        onDiscountChange('');
        onShowDiscountChange(false);
    };

    const handleRemoveTax = () => {
        onTaxChange('');
        onShowTaxChange(false);
    };

    const calculateSubTotal = () => {
        return items.reduce((sum, item) => sum + (safeNumber(item.quantity) * safeNumber(item.price)), 0);
    };

    const calculateTotal = () => {
        const subTotal = calculateSubTotal();
        const discountValue = safeNumber(discount);
        const taxValue = safeNumber(tax);

        const discountAmount = subTotal * (discountValue / 100);
        const taxAmount = (subTotal - discountAmount) * (taxValue / 100);
        return subTotal - discountAmount + taxAmount;
    };

    return (
        <div className="mt-10">
            {/* Items Section */}
            <div className="mb-8">
                {/* Desktop View (Table) */}
                <div className="hidden md:block">
                    <div className="grid grid-cols-12 gap-4 bg-secondary text-white p-3 rounded-t-lg font-medium text-sm uppercase">
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
                                        onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                                        className="w-full bg-transparent focus:outline-none text-center text-gray-700 no-spinner"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                                        className="w-full bg-transparent focus:outline-none text-right text-gray-700 no-spinner"
                                    />
                                </div>
                                <div className="col-span-2 text-right pr-2 text-gray-700 font-medium">
                                    {(safeNumber(item.quantity) * safeNumber(item.price)).toFixed(2)}
                                </div>
                                <div className="col-span-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
                                        title="Remove item"
                                    >
                                        <Trash2 className="w-5 h-5" />
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
                                <Trash2 className="w-5 h-5" />
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
                                        onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded p-2 focus:outline-none focus:border-blue-500 text-center no-spinner"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t('price')}</label>
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded p-2 focus:outline-none focus:border-blue-500 text-right no-spinner"
                                    />
                                </div>
                            </div>
                            <div className="mt-3 flex justify-between items-center pt-3 border-t border-gray-100">
                                <span className="text-sm font-bold text-gray-500 uppercase">{t('amount')}</span>
                                <span className="font-bold text-gray-800">{(safeNumber(item.quantity) * safeNumber(item.price)).toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleAddItem}
                    className="mt-4 text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
                >
                    <Plus className="w-4 h-4" /> {t('addItem')}
                </button>
            </div>

            {/* Summary Section */}
            <div className="flex flex-col md:flex-row justify-between gap-8">
                {/* Notes */}
                <div className="w-full md:w-1/2">
                    <h4 className="font-bold text-gray-700 mb-2">{t('notes')}:</h4>
                    <textarea
                        value={notes}
                        onChange={(e) => onNotesChange(e.target.value)}
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
                                <input
                                    type="text"
                                    value={discountLabel}
                                    onChange={(e) => onDiscountLabelChange(e.target.value)}
                                    className="w-20 border-b border-transparent hover:border-gray-300 focus:border-gray-300 focus:outline-none text-right text-gray-600"
                                />
                                <input
                                    type="number"
                                    value={discount}
                                    onChange={(e) => onDiscountChange(e.target.value)}
                                    className="w-12 border-b border-gray-300 text-center focus:outline-none text-sm no-spinner"
                                    placeholder="0"
                                />%
                                <button
                                    onClick={handleRemoveDiscount}
                                    className="text-red-400 hover:text-red-600 ml-2"
                                    title="Remove discount"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </span>
                            <span className="font-bold text-red-500">
                                -{(calculateSubTotal() * (safeNumber(discount) / 100)).toFixed(2)}
                            </span>
                        </div>
                    )}

                    {showTax && (
                        <div className="flex justify-between text-gray-600 items-center">
                            <span className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={taxLabel}
                                    onChange={(e) => onTaxLabelChange(e.target.value)}
                                    className="w-20 border-b border-transparent hover:border-gray-300 focus:border-gray-300 focus:outline-none text-right text-gray-600"
                                />
                                <input
                                    type="number"
                                    value={tax}
                                    onChange={(e) => onTaxChange(e.target.value)}
                                    className="w-12 border-b border-gray-300 text-center focus:outline-none text-sm no-spinner"
                                    placeholder="0"
                                />%
                                <button
                                    onClick={handleRemoveTax}
                                    className="text-red-400 hover:text-red-600 ml-2"
                                    title="Remove tax"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </span>
                            <span className="font-bold">
                                +{((calculateSubTotal() - (calculateSubTotal() * (safeNumber(discount) / 100))) * (safeNumber(tax) / 100)).toFixed(2)}
                            </span>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 text-sm text-primary font-medium">
                        {!showDiscount && (
                            <button onClick={() => onShowDiscountChange(true)} className="hover:underline flex items-center gap-1">
                                <Plus className="w-3 h-3" /> {t('addDiscount')}
                            </button>
                        )}
                        {!showTax && (
                            <button onClick={() => onShowTaxChange(true)} className="hover:underline flex items-center gap-1">
                                <Plus className="w-3 h-3" /> {t('addTax')}
                            </button>
                        )}
                    </div>

                    {/* Grand Total */}
                    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mt-4">
                        <span className="font-bold text-gray-700 text-lg">{t('total')}</span>
                        <span className="font-bold text-gray-900 text-xl">
                            {currency} {calculateTotal().toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
