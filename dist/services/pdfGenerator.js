"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCertificatePDF = void 0;
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const generateCertificatePDF = (name, date) => __awaiter(void 0, void 0, void 0, function* () {
    const htmlContent = `
        <!DOCTYPE html>
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
    `;
    try {
        console.log('Generando el certificado para:', name);
        // Ruta al ejecutable de Chromium o Chrome
        const executablePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe'; // Cambiar si es necesario
        // Usar Puppeteer para generar el PDF
        const browser = yield puppeteer_core_1.default.launch({
            executablePath, // Especificamos la ruta al ejecutable
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Configuración para entornos seguros
            headless: true, // Ejecutar sin interfaz gráfica
        });
        const page = yield browser.newPage();
        yield page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        // Generar el PDF en orientación horizontal
        console.log('Creando el PDF...');
        const pdfBuffer = yield page.pdf({
            format: 'a4',
            landscape: true, // Cambiado a horizontal
            printBackground: true,
        });
        yield browser.close();
        if (!pdfBuffer || pdfBuffer.length === 0) {
            throw new Error('El PDF generado está vacío');
        }
        console.log('Certificado generado exitosamente');
        return Buffer.from(pdfBuffer);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error al generar el certificado:', error.message);
            console.error('Stack trace:', error.stack);
            throw new Error('Error al generar el certificado: ' + error.message);
        }
        else {
            console.error('Error desconocido:', error);
            throw new Error('Error desconocido al generar el certificado');
        }
    }
});
exports.generateCertificatePDF = generateCertificatePDF;
