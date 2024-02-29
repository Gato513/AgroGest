'use client'
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generateCattlePDF = (cattleData) => {
    const doc = new jsPDF();

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

    // Establecer encabezado de la tabla
    const headers = ['Código', 'Categoría', 'Raza', 'Producción', 'Estado de Salud'];

    // Convertir datos en formato tabular
    const rows = []; // Inicializamos el array de filas vacío

    // Creamos una fila para cada conjunto de datos de ganado
    cattleData.forEach(cattle => {
        const rowData = [
            cattle.identificationCode,
            cattle.category,
            cattle.race,
            cattle.productionType,
            cattle.healthStatus
        ];
        rows.push(rowData); // Agregamos la fila al array de filas
    });

    // Configurar estilo de la tabla
    doc.autoTable({
        head: [headers],
        body: rows,
        startY: 40,
        theme: 'grid',
        headStyles: {
            fillColor: [204, 229, 255], // Azul claro para el fondo del encabezado de la tabla
            textColor: [0, 0, 0], // Color de texto para el encabezado de la tabla
            lineWidth: 0.2,
            lineColor: [192, 192, 192], // Gris claro para las líneas del encabezado de la tabla
        },
        styles: {
            lineColor: [192, 192, 192], // Gris claro para las líneas de la tabla
            lineWidth: 0.2,
        },
        margin: { top: 5 }
    });

    doc.save('detalles_ganado.pdf');
};

export default generateCattlePDF;
