import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const generateCertificatePDF = async (name: string, date: string): Promise<Buffer> => {
    // Crear el documento PDF
    const pdfDoc = await PDFDocument.create();
    
    const page = pdfDoc.addPage([595, 842]); // Tamaño A4 en píxeles
    const { width, height } = page.getSize();

    // Incrustar las fuentes estándar (Helvetica)
    const fontTitle = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontText = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawRectangle({
        x: 0,
        y: 0,
        width,
        height,
        color: rgb(0.95, 0.95, 0.95), // Color de fondo 
    });

    const borderWidth = 20; 
    page.drawRectangle({
        x: borderWidth,
        y: borderWidth,
        width: width - 2 * borderWidth,
        height: height - 2 * borderWidth,
        color: rgb(1, 0.8, 0), // Color dorado
        borderWidth: 5,
    });

    page.drawText('Certificado de Participación', {
        x: width / 2 - 180,
        y: height - 100,
        size: 36, // 
        font: fontTitle,
        color: rgb(0.15, 0.23, 0.41), // Azul oscuro
    });

    page.drawText(`Nombre: ${name}`, {
        x: width / 2 - 150,
        y: height - 200,
        size: 24, 
        font: fontText,
        color: rgb(0.2, 0.45, 0.7), // Azul suave
    });

    page.drawText(`Fecha: ${date}`, {
        x: width / 2 - 150,
        y: height - 250,
        size: 24,
        font: fontText,
        color: rgb(0.2, 0.45, 0.7), // Azul suave
    });

    page.drawText('Firma del organizador:', {
        x: 50,
        y: 100,
        size: 18,
        font: fontText,
        color: rgb(0.2, 0.2, 0.2),
    });

    page.drawLine({
        start: { x: 50, y: 90 },
        end: { x: width - 50, y: 90 },
        thickness: 2,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Emitido el ${new Date().toLocaleDateString()}`, {
        x: width / 2 - 150,
        y: 50,
        size: 16,
        font: fontText,
        color: rgb(0.5, 0.5, 0.5),
    });

    // Guardar el PDF como Uint8Array
    const pdfBytes = await pdfDoc.save();

    // Convertir el Uint8Array a Buffer
    const pdfBuffer: Buffer = Buffer.from(pdfBytes);
    
    return pdfBuffer;
};
