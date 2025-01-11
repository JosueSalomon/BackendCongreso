import puppeteer from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';

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

    // Usar Puppeteer con chrome-aws-lambda
    const browser = await puppeteer.launch({
        args: chrome.args, // Usar los argumentos de chrome-aws-lambda
        executablePath: await chrome.executablePath, // Obtener la ruta correcta del ejecutable de Chrome
        headless: true, // Modo sin cabeza (sin UI)
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Generar el PDF
    const pdfBuffer = await page.pdf({
        format: 'a4',
        landscape: true, // Orientación horizontal
        printBackground: true,
    });

    await browser.close();

    return Buffer.from(pdfBuffer);
};
