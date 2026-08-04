import { transporter } from "./transporter";

export async function sendPasswordResetEmail(
    email: string,
    firstName: string,
    resetLink: string
) {
    const sender = process.env.SMTP_USER;
    
    if (!sender) {
        console.warn("Cannot send email: SMTP_USER is missing.");
        return;
    }

    const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #ffffff; margin: 0 auto; padding: 20px 0 48px; width: 560px;">
            <h1 style="color: #18181b; font-size: 24px; font-weight: 600; margin: 0 0 20px;">FinanceFlow</h1>
            <p style="color: #3f3f46; font-size: 16px; line-height: 26px;">Hello ${firstName},</p>
            <p style="color: #3f3f46; font-size: 16px; line-height: 26px;">
                We received a request to reset your password for your FinanceFlow account.
                If this was you, you can set a new password here:
            </p>
            <div style="padding: 20px 0;">
                <a href="${resetLink}" style="background-color: #18181b; border-radius: 6px; color: #fff; font-size: 16px; text-decoration: none; text-align: center; display: block; padding: 12px;">
                    Reset Password
                </a>
            </div>
            <p style="color: #3f3f46; font-size: 16px; line-height: 26px;">
                This link will expire in 30 minutes.
            </p>
            <p style="color: #3f3f46; font-size: 16px; line-height: 26px;">
                If you didn't request this, just ignore and delete this message.
            </p>
            <hr style="border-color: #e4e4e7; border-style: solid; margin: 20px 0;" />
            <p style="color: #71717a; font-size: 14px; line-height: 24px;">
                FinanceFlow App — Secure Financial Management
            </p>
        </div>
    `;

    const textContent = `
FinanceFlow Password Reset

Hello ${firstName},

We received a request to reset your password for your FinanceFlow account.
If this was you, you can set a new password here:

${resetLink}

This link will expire in 30 minutes.

If you didn't request this, just ignore and delete this message.

--
FinanceFlow App
    `;

    try {
        await transporter.sendMail({
            from: `"FinanceFlow" <${sender}>`,
            to: email,
            subject: "Reset your FinanceFlow password",
            text: textContent,
            html: htmlContent,
        });
    } catch (error) {
        console.error("SMTP Error during sendPasswordResetEmail:", error);
        throw error;
    }
}
