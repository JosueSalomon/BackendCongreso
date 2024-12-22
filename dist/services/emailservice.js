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
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendVerificationEmail = (to, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield transporter.sendMail({
            from: `"Congreso" <${process.env.EMAIL_USER}>`,
            to,
            subject: 'Código de Verificación',
            text: `Tu código de verificación es: ${code}`,
            html: `<p>Tu código de verificación es: <b>${code}</b></p>`, // Cuerpo en HTML
        });
        console.log('Correo enviado: %s', info.messageId);
    }
    catch (error) {
        console.error('Error enviando correo:', error);
        if (error instanceof Error) {
            console.error('Error específico:', error.message);
        }
        throw new Error('No se pudo enviar el correo electrónico.');
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
