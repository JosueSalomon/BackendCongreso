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
const puppeteer_1 = __importDefault(require("puppeteer"));
const generateCertificatePDF = (name, date) => __awaiter(void 0, void 0, void 0, function* () {
    // Definir el HTML directamente como string
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
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
                width: 850px;
                height: 600px;
                margin: 50px auto;
                padding: 40px;
                background: white;
                border: 15px solid #2c3e50;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                position: relative;
            }
            .certificate-header {
                text-align: center;
                border-bottom: 2px solid #2c3e50;
                padding-bottom: 10px;
                margin-bottom: 30px;
            }
            .certificate-header h1 {
                font-size: 36px;
                color: #2c3e50;
                margin: 0;
            }
            .certificate-header p {
                font-size: 18px;
                color: #34495e;
                margin: 5px 0;
            }
            .certificate-body {
                text-align: center;
                margin: 30px 0;
            }
            .certificate-body h2 {
                font-size: 28px;
                color: #2c3e50;
                margin-bottom: 20px;
            }
            .certificate-body p {
                font-size: 18px;
                color: #34495e;
                margin: 10px 0;
            }
            .certificate-footer {
                text-align: center;
                position: absolute;
                bottom: 30px;
                left: 0;
                width: 100%;
            }
            .certificate-footer .signature {
                display: inline-block;
                width: 200px;
                height: 50px;
                border-bottom: 2px solid #2c3e50;
                margin: 0 auto;
            }
            .certificate-footer p {
                font-size: 16px;
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
    // Usar Puppeteer para generar el PDF
    const browser = yield puppeteer_1.default.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Configuración para entornos como Vercel
    });
    const page = yield browser.newPage();
    yield page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = yield page.pdf({
        format: 'A4',
        printBackground: true,
    });
    yield browser.close();
    return Buffer.from(pdfBuffer);
});
exports.generateCertificatePDF = generateCertificatePDF;
