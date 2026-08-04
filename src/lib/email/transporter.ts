import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST || "smtp.gmail.com";
const port = parseInt(process.env.SMTP_PORT || "465", 10);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

if (!user || !pass) {
    console.warn(
        "⚠️ SMTP_USER or SMTP_PASS is missing in environment variables. Email sending will fail."
    );
}

export const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
        user,
        pass,
    },
});

// Optionally verify connection on startup (during development or if desired)
if (process.env.NODE_ENV !== "production") {
    transporter.verify().then(() => {
        console.log("✅ SMTP connection verified successfully.");
    }).catch((err) => {
        console.warn("⚠️ SMTP connection verification failed:", err.message);
    });
}
