import puppeteer from 'puppeteer-core';
import chromium from 'chrome-aws-lambda';

export const generateCertificatePDF = async (name: string, date: string): Promise<Buffer> => {
    const htmlContent = `<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Certificado de Participación</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Georgia', serif;
                    background-color: #f4f4f9;
                }
                .certificate-container {
                    width: 1123px; /* A4 width in horizontal */
                    height: 794px; /* A4 height in horizontal */
                    margin: 0 auto;
                    padding: 40px;
                    background: white;
                    border: 15px solid #2c3e50;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
                .certificate-header {
                    border-bottom: 2px solid #2c3e50;
                    padding-bottom: 10px;
                    margin-bottom: 30px;
                }
                .certificate-header h1 {
                    font-size: 48px;
                    color: #2c3e50;
                    margin: 0;
                }
                .certificate-header p {
                    font-size: 24px;
                    color: #34495e;
                    margin: 5px 0;
                }
                .certificate-body {
                    margin: 30px 0;
                }
                .certificate-body h2 {
                    font-size: 40px;
                    color: #2c3e50;
                    margin-bottom: 20px;
                }
                .certificate-body p {
                    font-size: 24px;
                    color: #34495e;
                    margin: 10px 0;
                }
                .certificate-footer {
                    margin-top: 20px;
                    text-align: center;
                }
                .certificate-footer .signature {
                    display: inline-block;
                    width: 300px;
                    height: 50px;
                    border-bottom: 2px solid #2c3e50;
                }
                .certificate-footer p {
                    font-size: 20px;
                    color: #34495e;
                    margin-top: 10px;
                }
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
`

    try {
        console.log('Generando el certificado para:', name);

        const executablePath = await chromium.executablePath;

        const browser = await puppeteer.launch({
            executablePath,
            args: chromium.args,
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        console.log('Creando el PDF...');
        const pdfBuffer = await page.pdf({
            format: 'a4',
            landscape: true,
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
