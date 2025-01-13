import puppeteer from 'puppeteer-core';
import chromium from 'chrome-aws-lambda';

export const generateCertificatePDF = async (name: string, date: string): Promise<Buffer> => {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Certificado de Participación</title>
            <style>
                /* Tu estilo aquí */
            </style>
        </head>
        <body>
            <div class="certificate-container">
                <div class="certificate-header">
                    <h1>Certificado de Participación</h1>
                    <p>Otorgado a</p>
                </div>
                <div class="certificate-body">
                    <h2>${name}</h2>
                    <p>Por su destacada participación en el evento</p>
                    <p><strong>Evento XYZ</strong></p>
                    <p>Realizado el día <strong>${date}</strong></p>
                </div>
                <div class="certificate-footer">
                    <div class="signature"></div>
                    <p>Firma del Organizador</p>
                </div>
            </div>
        </body>
        </html>
    `;

    try {
        console.log('Generando el certificado para:', name);

        // Lanzar Chromium desde chrome-aws-lambda
        const browser = await puppeteer.launch({
            executablePath: await chromium.executablePath,
            args: chromium.args,
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        // Generar el PDF en orientación horizontal
        console.log('Creando el PDF...');
        const pdfBuffer = await page.pdf({
            format: 'a4',
            landscape: true, // Cambiado a horizontal
            printBackground: true,
        });

        await browser.close();

        if (!pdfBuffer || pdfBuffer.length === 0) {
            throw new Error('El PDF generado está vacío');
        }

        console.log('Certificado generado exitosamente');
        return Buffer.from(pdfBuffer);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error al generar el certificado:', error.message);
            console.error('Stack trace:', error.stack);
            throw new Error('Error al generar el certificado: ' + error.message);
        } else {
            console.error('Error desconocido:', error);
            throw new Error('Error desconocido al generar el certificado');
        }
    }
};
