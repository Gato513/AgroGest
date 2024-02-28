'use client'
import jsPDF from 'jspdf';

const generatePDF = (data) => {
    const doc = new jsPDF();
    doc.text('Lista de Productos', 10, 10);

    data.forEach((product, index) => {
        const yPos = 20 + (index * 10);
        const productInfo = `Producto: ${product.product}, Categoría: ${product.category}, Disponible: ${product.available}`;
        doc.text(productInfo, 10, yPos);
    });

    doc.save('productos.pdf');
};

export default generatePDF;

