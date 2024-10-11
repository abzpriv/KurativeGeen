// app/api/sendEmail/route.ts
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  const { email, orderID } = await req.json();

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: `Order ${orderID} Delivered - Thank You for Your Order!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #d9d9d9; border-radius: 8px; background-color: #f0f0f0;">
        <div style="background-color: #4CAF50; color: white; padding: 10px; border-radius: 8px;">
          <h2 style="margin: 0;">Thank You for Your Order!</h2>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 16px; color: #333;">
            Dear Customer,<br/><br/>
            Thank you for placing your order with <strong>Kurative Green</strong>! We are pleased to inform you that your order <strong>${orderID}</strong> has been marked as delivered.
          </p>
          <p style="font-size: 16px; color: #333;">
            If you have any questions or concerns regarding your order, feel free to reach out to our support team.
          </p>
          <p style="font-size: 16px; color: #333;">
            Best Regards,<br/>
            The Kurative Green Team
          </p>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #e9f5e9; padding: 15px; margin-top: 20px; border-top: 5px solid #4CAF50;">
          <tr>
            <td style="text-align: center; font-size: 12px; color: #777;">
              <p style="margin: 5px; font-size: 14px;">Follow us on:</p>
              <p>
                <a href="#" style="color: #4CAF50; text-decoration: none; font-weight: bold;">Facebook</a> |
                <a href="#" style="color: #4CAF50; text-decoration: none; font-weight: bold;">Instagram</a> |
                <a href="#" style="color: #4CAF50; text-decoration: none; font-weight: bold;">Twitter</a>
              </p>
              <p style="font-size: 12px;">© ${new Date().getFullYear()} Kurative Green. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}
