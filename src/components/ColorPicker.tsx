import { useState, useEffect } from 'react';
import { X, Check, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ColorPickerProps {
    isOpen: boolean;
    onClose: () => void;
    primaryColor: string;
    secondaryColor: string;
    onColorChange: (primary: string, secondary: string) => void;
}

export default function ColorPicker({ isOpen, onClose, primaryColor, secondaryColor, onColorChange }: ColorPickerProps) {
    const { t } = useTranslation();
    const [localPrimary, setLocalPrimary] = useState(primaryColor);
    const [localSecondary, setLocalSecondary] = useState(secondaryColor);

    useEffect(() => {
        setLocalPrimary(primaryColor);
        setLocalSecondary(secondaryColor);
    }, [primaryColor, secondaryColor, isOpen]);

    const handleSave = () => {
        onColorChange(localPrimary, localSecondary);
        onClose();
    };

    const handleReset = () => {
        const defaultPrimary = '#1e3a8a';
        const defaultSecondary = '#64748b';
        setLocalPrimary(defaultPrimary);
        setLocalSecondary(defaultSecondary);
        onColorChange(defaultPrimary, defaultSecondary);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">{t('customizeColors') || 'Customize Colors'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">{t('primaryColor') || 'Primary Color'}</label>
                        <div className="flex items-center space-x-4">
                            <div className="relative overflow-hidden rounded-lg shadow-sm border border-gray-200">
                                <input
                                    type="color"
                                    value={localPrimary}
                                    onChange={(e) => setLocalPrimary(e.target.value)}
                                    className="h-12 w-24 cursor-pointer border-0 p-0 transform scale-150 origin-center"
                                />
                            </div>
                            <div className="flex-1 h-12 rounded-lg border border-gray-200 flex items-center px-4 font-mono text-sm text-gray-600 bg-gray-50">
                                {localPrimary}
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">Used for buttons, highlights, and main actions.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">{t('secondaryColor') || 'Secondary Color'}</label>
                        <div className="flex items-center space-x-4">
                            <div className="relative overflow-hidden rounded-lg shadow-sm border border-gray-200">
                                <input
                                    type="color"
                                    value={localSecondary}
                                    onChange={(e) => setLocalSecondary(e.target.value)}
                                    className="h-12 w-24 cursor-pointer border-0 p-0 transform scale-150 origin-center"
                                />
                            </div>
                            <div className="flex-1 h-12 rounded-lg border border-gray-200 flex items-center px-4 font-mono text-sm text-gray-600 bg-gray-50">
                                {localSecondary}
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">Used for accents, borders, and secondary elements.</p>
                    </div>
                </div>

                <div className="mt-8 flex space-x-3">
                    <button
                        onClick={handleReset}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                        <RotateCcw size={18} />
                        {t('reset') || 'Reset'}
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg font-medium"
                        style={{ backgroundColor: localPrimary }}
                    >
                        <Check size={18} />
                        {t('saveChanges') || 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}
