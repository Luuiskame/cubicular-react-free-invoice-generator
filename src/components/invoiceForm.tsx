import { useState } from 'react';
import InvoiceSecondPart from './InvoiceSecondPart';


export default function InvoiceForm() {
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
        <div className="w-[60%] mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
            {/* Top Section: Logo and Invoice Title */}
            <div className="flex justify-between items-start mb-8">
                {/* Logo Placeholder */}
                <div className="w-48 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden group">
                    {logo ? (
                        <img src={logo} alt="Company Logo" className="w-full h-full object-contain" />
                    ) : (
                        <div className="text-center p-4">
                            <p className="text-gray-400 text-sm font-medium">+ Add Logo</p>
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
                <div className="flex flex-col items-end">
                    <input
                        type="text"
                        defaultValue="Invoice"
                        className="text-4xl font-bold text-gray-400 text-right uppercase tracking-wide focus:outline-none focus:text-gray-600 placeholder-gray-300 w-full"
                    />
                    <div className="mt-2">
                        <input
                            type="text"
                            placeholder="Add extra info (e.g. #INV-001)"
                            className="text-right text-gray-500 focus:outline-none w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Company Details Section */}
            <div className="flex flex-col space-y-2 mb-10">
                <input
                    type="text"
                    placeholder="Company Name"
                    className="text-xl font-bold text-gray-800 placeholder-gray-400 focus:outline-none w-full"
                />
                <input
                    type="text"
                    placeholder="Your Name"
                    className="text-gray-600 placeholder-gray-400 focus:outline-none w-full"
                />
                <input
                    type="text"
                    placeholder="Company's Address"
                    className="text-gray-600 placeholder-gray-400 focus:outline-none w-full"
                />
                <input
                    type="text"
                    placeholder="City, State Zip"
                    className="text-gray-600 placeholder-gray-400 focus:outline-none w-full"
                />
                <input
                    type="text"
                    placeholder="Country"
                    className="text-gray-600 placeholder-gray-400 focus:outline-none w-full"
                />
            </div>

            <InvoiceSecondPart />
        </div>
    );
}