import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});

async function sendUserMail({ from, to, subject, html }) {
    try {
        const info = await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            html: html,
        });

        return info.messageId;
    } catch (error) {
        throw error;
    }
}

export default sendUserMail;
