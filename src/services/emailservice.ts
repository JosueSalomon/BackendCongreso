import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendVerificationEmail = async (to: string, code: string): Promise<void> => {
    try {
        const info = await transporter.sendMail({
            from: `"Congreso" <${process.env.EMAIL_USER}>`,
            to,
            subject: 'Código de Verificación',
            text: `Tu código de verificación es: ${code}`,
            html: `<p>Tu código de verificación es: <b>${code}</b></p>`, // Cuerpo en HTML
        });
        console.log('Correo enviado: %s', info.messageId);
    } catch (error) {
        console.error('Error enviando correo:', error);
        if (error instanceof Error) {
            console.error('Error específico:', error.message);
        }
        throw new Error('No se pudo enviar el correo electrónico.');
    }
};

