import type { InvoiceItem } from './InvoiceLastPart';

interface PrintableInvoiceProps {
    logo: string | null;
    companyInfo: {
        companyName: string;
        yourName: string;
        companyAddress: string;
        cityStateZip: string;
        country: string;
    };
    clientInfo: {
        clientName: string;
        clientAddress: string;
        clientCityStateZip: string;
        clientCountry: string;
        clientAdditionalInfo: string;
        invoiceNumber: string;
        date: string;
        dueDate: string;
    };
    items: InvoiceItem[];
    discount: string | number;
    tax: string | number;
    discountLabel?: string;
    taxLabel?: string;
    notes: string;
    title: string;
    extraInfo: string;
    currency: string;
    primaryColor?: string;
    secondaryColor?: string;
    labels: {
        billTo: string;
        invoiceNumber: string;
        date: string;
        dueDate: string;
        itemDescription: string;
        quantity: string;
        price: string;
        amount: string;
        subTotal: string;
        total: string;
        notes: string;
    };
}

const safeNumber = (value: string | number): number => {
    const num = Number(value);
    return Number.isFinite(num) ? num : 0;
};

export default function PrintableInvoice({
    logo,
    companyInfo,
    clientInfo,
    items,
    discount,
    tax,
    discountLabel = 'Discount',
    taxLabel = 'Tax',
    notes,
    title,
    extraInfo,
    currency,
    primaryColor = '#1e3a8a',
    secondaryColor = '#64748b',
    labels
}: PrintableInvoiceProps) {
    // Ensure items is always a valid array
    const validItems = Array.isArray(items) && items.length > 0
        ? items.filter(item => item && typeof item.id === 'number')
        : [{ id: 0, description: '', quantity: 0, price: 0 }];

    const calculateSubTotal = () => {
        return validItems.reduce((sum, item) => sum + (safeNumber(item.quantity) * safeNumber(item.price)), 0);
    };

    const calculateTotal = () => {
        const subTotal = calculateSubTotal();
        const discountValue = safeNumber(discount);
        const taxValue = safeNumber(tax);

        const discountAmount = subTotal * (discountValue / 100);
        const taxAmount = (subTotal - discountAmount) * (taxValue / 100);
        return subTotal - discountAmount + taxAmount;
    };

    const subTotal = calculateSubTotal();
    const total = calculateTotal();
    const discountVal = safeNumber(discount);
    const taxVal = safeNumber(tax);
    const discountAmount = subTotal * (discountVal / 100);
    const taxAmount = (subTotal - discountAmount) * (taxVal / 100);

    return (
        <div className="print-invoice" id="printable-invoice-root">
            <style>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 0.5in;
                    }
                    
                    body * {
                        visibility: hidden;
                    }
                    
                    .print-invoice,
                    .print-invoice * {
                        visibility: visible;
                    }
                    
                    .print-invoice {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        padding: 0;
                        margin: 0;
                        background: white;
                        display: block !important;
                    }
                    
                    .no-print {
                        display: none !important;
                    }
                }
                
                @media screen {
                    .print-invoice {
                        position: absolute;
                        left: -9999px;
                        top: -9999px;
                        visibility: hidden;
                    }
                }
                
                .print-invoice-content {
                    font-family: 'Helvetica', Arial, sans-serif;
                    font-size: 10pt;
                    line-height: 1.5;
                    color: #333;
                    max-width: 8.5in;
                    margin: 0 auto;
                    padding: 40px;
                }
                
                .print-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 30px;
                }
                
                .print-logo {
                    width: 140px;   
                    height: 128px; 
                    object-fit: contain;
                    display: block;
                }
                
                .print-title {
                    font-size: 24pt;
                    font-weight: bold;
                    text-transform: uppercase;
                    margin-bottom: 5px;
                }
                
                .print-extra-info {
                    font-size: 10pt;
                    color: #6B7280;
                }
                
                .print-company-info {
                    margin-bottom: 30px;
                }
                
                .print-company-name {
                    font-size: 14pt;
                    font-weight: bold;
                    margin-bottom: 2px;
                }
                
                .print-section-two {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 30px;
                }
                
                .print-client-info {
                    width: 50%;
                }
                
                .print-section-title {
                    font-size: 11pt;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .print-invoice-meta {
                    width: 40%;
                }
                
                .print-meta-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px;
                }
                
                .print-meta-label {
                    font-weight: bold;
                }
                
                /* Items section – visually aligned with on-screen form table */
                .print-items {
                    margin-bottom: 30px;
                }
                
                .print-items-header {
                    display: grid;
                    grid-template-columns: 5fr 2fr 2fr 2fr 1fr;
                    gap: 16px;
                    background-color: ${secondaryColor};
                    color: #fff;
                    padding: 12px 16px;
                    border-radius: 8px 8px 0 0;
                    font-weight: 600;
                    font-size: 9pt;
                    text-transform: uppercase;
                }
                
                .print-items-header div:nth-child(1) {
                    padding-left: 8px;
                    text-align: left;
                }
                
                .print-items-header div:nth-child(2) {
                    text-align: center;
                }
                
                .print-items-header div:nth-child(3),
                .print-items-header div:nth-child(4) {
                    text-align: right;
                    padding-right: 8px;
                }
                
                .print-items-header div:nth-child(5) {
                    text-align: center;
                }
                
                .print-items-body {
                    border-left: 1px solid #E5E7EB;
                    border-right: 1px solid #E5E7EB;
                    border-bottom: 1px solid #E5E7EB;
                    border-radius: 0 0 8px 8px;
                    overflow: hidden;
                }
                
                .print-items-row {
                    display: grid;
                    grid-template-columns: 5fr 2fr 2fr 2fr 1fr;
                    gap: 16px;
                    padding: 12px 16px;
                    border-top: 1px solid #E5E7EB;
                    font-size: 10pt;
                    color: #374151;
                }
                
                .print-items-row div:nth-child(1) {
                    text-align: left;
                }
                
                .print-items-row div:nth-child(2) {
                    text-align: center;
                }
                
                .print-items-row div:nth-child(3) {
                    text-align: right;
                }
                
                .print-items-row div:nth-child(4) {
                    text-align: right;
                    font-weight: 600;
                }
                
                .print-items-row div:nth-child(5) {
                    text-align: center;
                }
                
                .print-summary {
                    display: flex;
                    justify-content: space-between;
                }
                
                .print-notes {
                    width: 50%;
                    padding-right: 20px;
                }
                
                .print-totals {
                    width: 40%;
                }
                
                .print-total-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px;
                }
                
                .print-grand-total {
                    display: flex;
                    justify-content: space-between;
                    background-color: #F3F4F6;
                    padding: 10px;
                    margin-top: 10px;
                    border-left: 4px solid ${primaryColor};
                }
                
                .print-grand-total-text {
                    font-size: 12pt;
                    font-weight: bold;
                }
            `}</style>
            <div className="print-invoice-content">
                {/* Header */}
                <div className="print-header">
                    <div>
                        {logo && <img src={logo} alt="Logo" className="print-logo" />}
                    </div>
                    <div>
                        <div className="print-title" style={{ color: secondaryColor }}>
                            {title || 'INVOICE'}
                        </div>
                        <div className="print-extra-info">{extraInfo}</div>
                    </div>
                </div>

                {/* Company Info */}
                <div className="print-company-info">
                    <div className="print-company-name" style={{ color: primaryColor }}>
                        {companyInfo.companyName}
                    </div>
                    <div>{companyInfo.yourName}</div>
                    <div>{companyInfo.companyAddress}</div>
                    <div>{companyInfo.cityStateZip}</div>
                    <div>{companyInfo.country}</div>
                </div>

                {/* Client & Meta */}
                <div className="print-section-two">
                    <div className="print-client-info">
                        <div className="print-section-title" style={{ color: secondaryColor }}>
                            {labels.billTo}
                        </div>
                        <div>{clientInfo.clientName}</div>
                        <div>{clientInfo.clientAddress}</div>
                        <div>{clientInfo.clientCityStateZip}</div>
                        <div>{clientInfo.clientCountry}</div>
                        <div>{clientInfo.clientAdditionalInfo}</div>
                    </div>
                    <div className="print-invoice-meta">
                        <div className="print-meta-row">
                            <span className="print-meta-label" style={{ color: secondaryColor }}>
                                {labels.invoiceNumber}
                            </span>
                            <span>{clientInfo.invoiceNumber}</span>
                        </div>
                        <div className="print-meta-row">
                            <span className="print-meta-label" style={{ color: secondaryColor }}>
                                {labels.date}
                            </span>
                            <span>{clientInfo.date}</span>
                        </div>
                        <div className="print-meta-row">
                            <span className="print-meta-label" style={{ color: secondaryColor }}>
                                {labels.dueDate}
                            </span>
                            <span>{clientInfo.dueDate}</span>
                        </div>
                    </div>
                </div>

                {/* Items Section – aligned with InvoiceLastPart desktop table */}
                <div className="print-items">
                    <div className="print-items-header">
                        <div>{labels.itemDescription}</div>
                        <div>{labels.quantity}</div>
                        <div>{labels.price}</div>
                        <div>{labels.amount}</div>
                        <div>{/* empty column to mirror remove icon col */}</div>
                    </div>
                    <div className="print-items-body">
                        {validItems.map((item) => (
                            <div key={item.id} className="print-items-row">
                                <div>{item.description || ''}</div>
                                <div>{item.quantity ?? 0}</div>
                                <div>{safeNumber(item.price).toFixed(2)}</div>
                                <div>{(safeNumber(item.quantity) * safeNumber(item.price)).toFixed(2)}</div>
                                <div>{/* no delete button on print */}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="print-summary">
                    <div className="print-notes">
                        <div className="print-section-title" style={{ color: secondaryColor }}>
                            {labels.notes}:
                        </div>
                        <div>{notes}</div>
                    </div>
                    <div className="print-totals">
                        <div className="print-total-row">
                            <span>{labels.subTotal}</span>
                            <span>{subTotal.toFixed(2)}</span>
                        </div>
                        {discountVal > 0 && (
                            <div className="print-total-row">
                                <span>{discountLabel} ({discountVal}%)</span>
                                <span style={{ color: 'red' }}>-{discountAmount.toFixed(2)}</span>
                            </div>
                        )}
                        {taxVal > 0 && (
                            <div className="print-total-row">
                                <span>{taxLabel} ({taxVal}%)</span>
                                <span>+{taxAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="print-grand-total">
                            <span className="print-grand-total-text" style={{ color: primaryColor }}>
                                {labels.total}
                            </span>
                            <span className="print-grand-total-text" style={{ color: primaryColor }}>
                                {currency} {total.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

