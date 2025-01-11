import pdf from 'html-pdf';

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
        </html>`;

    console.log('Generando el certificado para:', name);

    return new Promise<Buffer>((resolve, reject) => {
        pdf.create(htmlContent, { format: 'A4', orientation: 'landscape', border: '10mm' })
            .toBuffer((err, buffer) => {
                if (err) {
                    console.error('Error al generar el certificado:', err);
                    reject(new Error('Error al generar el certificado: ' + err.message));
                } else {
                    console.log('Certificado generado exitosamente');
                    resolve(buffer);
                }
            });
    });
};
