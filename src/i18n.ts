import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            "Welcome to cubicular": "Welcome to cubicular: a free invoice generator for everyone",
            "pickUpColor": "change color",
            "to": "To:",
            "invoiceNumber": "Invoice No.",
            "date": "Date",
            "dueDate": "Due Date",
            "clientName": "Client's Name",
            "clientAddress": "Client's Address",
            "cityStateZip": "City, State Zip",
            "country": "Country",
            "aditionalInfo": "Aditional Info",
            "addLogo": "+ Add Logo",
            "invoiceTitle": "INVOICE",
            "invoiceExtraInfo": "Add extra info (e.g. #INV-001)",
            "companyName": "Company Name",
            "yourName": "Your Name",
            "companyAddress": "Company's Address",
            "item": "Item",
            "quantity": "Quantity",
            "price": "Price",
            "amount": "Amount",
            "subTotal": "Sub Total",
            "discount": "Discount",
            "tax": "Tax",
            "total": "TOTAL",
            "addDiscount": "Add Discount",
            "addTax": "Add Tax",
            "addItem": "Add Item",
            "notes": "Notes",
            "notesPlaceholder": "Any relevant information..."
        }
    },
    es: {
        translation: {
            "Welcome to cubicular": "Bienvenido a cubicular: un sistema de recivos gratis para todos",
            "pickUpColor": "cambiar color",
            "to": "Para:",
            "invoiceNumber": "Cotización N.",
            "date": "Fecha",
            "dueDate": "Vencimiento",
            "clientName": "Nombre del Cliente",
            "clientAddress": "Dirección del Cliente",
            "cityStateZip": "Ciudad, Estado Zip",
            "country": "País",
            "aditionalInfo": "Información Adicional",
            "addLogo": "+ Agregar Logo",
            "invoiceTitle": "FACTURA",
            "invoiceExtraInfo": "Información extra (ej. #INV-001)",
            "companyName": "Nombre de la Empresa",
            "yourName": "Tu Nombre",
            "companyAddress": "Dirección de la Empresa",
            "item": "Item",
            "quantity": "Cantidad",
            "price": "Precio",
            "amount": "A pagar",
            "subTotal": "Sub Total",
            "discount": "Descuento",
            "tax": "Impuesto",
            "total": "TOTAL",
            "addDiscount": "Agregar Descuento",
            "addTax": "Agregar Impuesto",
            "addItem": "Agregar Item",
            "notes": "Notas",
            "notesPlaceholder": "Cualquier información relevante..."
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;