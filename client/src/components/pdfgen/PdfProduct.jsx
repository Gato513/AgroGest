'use client'

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const productReportGenerator = (data) => {
    const doc = new jsPDF();

    // Establecer encabezado
    const headers = ['Producto', 'Tipo de Cultivo', 'Cantidad', 'Método de Cultivo', 'Fecha de Siembra', 'Fecha de Cosecha'];
    const rows = [];

    // Convertir datos en formato tabular
    data.forEach(product => {
        const rowData = [
            product.product,
            product.category,
            product.available,
            product.cultivationMethod,
            product.sowingDate,
            product.harvestDate
        ];

        rows.push(rowData);
    });

    // Configurar estilo de la tabla
    doc.autoTable({
        head: [headers],
        body: rows,
        startY: 40,
        theme: 'grid',
        headStyles: {
            fillColor: [204, 229, 255], // Azul claro para el fondo del encabezado
            textColor: [0, 0, 0], // Color de texto para el encabezado
            lineWidth: 0.2,
            lineColor: [192, 192, 192], // Gris claro para las líneas del encabezado
        },
        styles: {
            lineColor: [192, 192, 192], // Gris claro para las líneas de la tabla
            lineWidth: 0.2,
        },
        margin: { top: 5 }
    });

    // Establecer encabezado y pie de página
    doc.setFontSize(18);
    doc.setTextColor(52, 152, 219); // Azul claro
    
    doc.text('Agro Administrador', 105, 15, 'center'); // Encabezado centrado
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Restablecer color de texto

    // Obtener fecha actual
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const formattedDate = `${dd}/${mm}/${yyyy}`;

    // Agregar información del distrito y fecha
    doc.text(`Distrito: Fram`, 10, 30);
    doc.text(`Fecha: ${formattedDate}`, 10, 35);

    doc.save('productos.pdf');
};

export default productReportGenerator;
