import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import type { InvoiceItem } from './InvoiceLastPart';

// Register a font if needed, but Helvetica is standard
Font.register({
    family: 'Helvetica',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf' }, // Standard
        { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf', fontWeight: 'bold' } // Bold (simulated)
    ]
});

interface InvoicePDFProps {
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

export default function InvoicePDF({
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
}: InvoicePDFProps) {

    const styles = StyleSheet.create({
        page: {
            padding: 40,
            fontFamily: 'Helvetica',
            fontSize: 10,
            color: '#333',
            lineHeight: 1.5,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
        },
        logoContainer: {
            width: 150,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
        },
        logo: {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
        },
        headerRight: {
            alignItems: 'flex-end',
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: secondaryColor, // Use secondary color for title
            marginBottom: 5,
        },
        extraInfo: {
            fontSize: 10,
            color: '#6B7280', // Gray-500
        },
        companyInfo: {
            marginBottom: 30,
        },
        companyName: {
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: 2,
            color: primaryColor, // Use primary color for company name
        },
        sectionTwo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
        },
        clientInfo: {
            width: '50%',
        },
        sectionTitle: {
            fontSize: 11,
            fontWeight: 'bold',
            marginBottom: 5,
            color: secondaryColor, // Use secondary color for section titles
        },
        invoiceMeta: {
            width: '40%',
        },
        metaRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
        },
        metaLabel: {
            fontWeight: 'bold',
            color: secondaryColor,
        },
        table: {
            width: '100%',
            marginBottom: 30,
        },
        tableHeader: {
            flexDirection: 'row',
            backgroundColor: secondaryColor, // Use secondary color for table header
            color: 'white',
            padding: 8,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: 9,
        },
        tableRow: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#E5E7EB', // Gray-200
            padding: 8,
            alignItems: 'center',
        },
        colItem: { width: '45%' },
        colQty: { width: '15%', textAlign: 'center' },
        colPrice: { width: '20%', textAlign: 'right' },
        colAmount: { width: '20%', textAlign: 'right' },

        summarySection: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        notes: {
            width: '50%',
            paddingRight: 20,
        },
        totals: {
            width: '40%',
        },
        totalRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
        },
        grandTotal: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#F3F4F6', // Gray-100
            padding: 10,
            marginTop: 10,
            borderRadius: 4,
            borderLeftWidth: 4,
            borderLeftColor: primaryColor, // Accent with primary color
        },
        grandTotalText: {
            fontSize: 12,
            fontWeight: 'bold',
            color: primaryColor,
        },
    });

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

    const subTotal = calculateSubTotal();
    const total = calculateTotal();
    const discountVal = safeNumber(discount);
    const taxVal = safeNumber(tax);
    const discountAmount = subTotal * (discountVal / 100);
    const taxAmount = (subTotal - discountAmount) * (taxVal / 100);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        {logo && <Image src={logo} style={styles.logo} />}
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={styles.title}>{title || 'INVOICE'}</Text>
                        <Text style={styles.extraInfo}>{extraInfo}</Text>
                    </View>
                </View>

                {/* Company Info */}
                <View style={styles.companyInfo}>
                    <Text style={styles.companyName}>{companyInfo.companyName}</Text>
                    <Text>{companyInfo.yourName}</Text>
                    <Text>{companyInfo.companyAddress}</Text>
                    <Text>{companyInfo.cityStateZip}</Text>
                    <Text>{companyInfo.country}</Text>
                </View>

                {/* Client & Meta */}
                <View style={styles.sectionTwo}>
                    <View style={styles.clientInfo}>
                        <Text style={styles.sectionTitle}>{labels.billTo}</Text>
                        <Text>{clientInfo.clientName}</Text>
                        <Text>{clientInfo.clientAddress}</Text>
                        <Text>{clientInfo.clientCityStateZip}</Text>
                        <Text>{clientInfo.clientCountry}</Text>
                        <Text>{clientInfo.clientAdditionalInfo}</Text>
                    </View>
                    <View style={styles.invoiceMeta}>
                        <View style={styles.metaRow}>
                            <Text style={styles.metaLabel}>{labels.invoiceNumber}</Text>
                            <Text>{clientInfo.invoiceNumber}</Text>
                        </View>
                        <View style={styles.metaRow}>
                            <Text style={styles.metaLabel}>{labels.date}</Text>
                            <Text>{clientInfo.date}</Text>
                        </View>
                        <View style={styles.metaRow}>
                            <Text style={styles.metaLabel}>{labels.dueDate}</Text>
                            <Text>{clientInfo.dueDate}</Text>
                        </View>
                    </View>
                </View>

                {/* Items Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.colItem}>{labels.itemDescription}</Text>
                        <Text style={styles.colQty}>{labels.quantity}</Text>
                        <Text style={styles.colPrice}>{labels.price}</Text>
                        <Text style={styles.colAmount}>{labels.amount}</Text>
                    </View>
                    {items.map((item) => (
                        <View key={item.id} style={styles.tableRow}>
                            <Text style={styles.colItem}>{item.description}</Text>
                            <Text style={styles.colQty}>{item.quantity}</Text>
                            <Text style={styles.colPrice}>{safeNumber(item.price).toFixed(2)}</Text>
                            <Text style={styles.colAmount}>{(safeNumber(item.quantity) * safeNumber(item.price)).toFixed(2)}</Text>
                        </View>
                    ))}
                </View>

                {/* Summary */}
                <View style={styles.summarySection}>
                    <View style={styles.notes}>
                        <Text style={styles.sectionTitle}>{labels.notes}:</Text>
                        <Text>{notes}</Text>
                    </View>
                    <View style={styles.totals}>
                        <View style={styles.totalRow}>
                            <Text>{labels.subTotal}</Text>
                            <Text>{subTotal.toFixed(2)}</Text>
                        </View>
                        {discountVal > 0 && (
                            <View style={styles.totalRow}>
                                <Text>{discountLabel} ({discountVal}%)</Text>
                                <Text style={{ color: 'red' }}>-{discountAmount.toFixed(2)}</Text>
                            </View>
                        )}
                        {taxVal > 0 && (
                            <View style={styles.totalRow}>
                                <Text>{taxLabel} ({taxVal}%)</Text>
                                <Text>+{taxAmount.toFixed(2)}</Text>
                            </View>
                        )}
                        <View style={styles.grandTotal}>
                            <Text style={styles.grandTotalText}>{labels.total}</Text>
                            <Text style={styles.grandTotalText}>{currency} {total.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
