import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface CartItem {
  name: string;
  quantity: number;
  image: string;
}

interface RequestBody {
  fullName: string;
  email: string;
  orderID: string;
  trackingID: string; 
  subtotal: number;
  total: number;
  shippingCharges: number;
  estimatedDelivery: string;
  cartItems: CartItem[];
}

export async function POST(req: NextRequest) {
  console.log('Incoming request to sendOrderConfirmation');

  const { fullName, email, orderID, trackingID, subtotal, total, shippingCharges, cartItems }: RequestBody = await req.json();

  console.log('Request Body:', {
    fullName,
    email,
    orderID,
    trackingID,
    subtotal,
    total,
    shippingCharges,
    cartItems
  });

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      debug: true,
      logger: true,
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Order Confirmation - ${orderID}`,
      html: `
        <div style="font-family: 'Arial', sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; width: 100%; box-sizing: border-box;">
          <style>
            @media (max-width: 600px) {
              h1 { font-size: 24px; }
              h2 { font-size: 22px; }
              h3 { font-size: 20px; }
              p, th, td { font-size: 14px; }
              table { width: 100%; }
              img { width: 50px; }
            }
          </style>
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #4CAF50; padding: 20px; border-bottom: 5px solid #388E3C;">
            <tr>
              <td style="text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 1px;">Kurative Green</h1>
                <p style="color: #f2f2f2; margin: 5px; font-size: 18px;">Your Order Confirmation</p>
              </td>
            </tr>
          </table>

          <div style="padding: 30px; background-color: white; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); max-width: 600px; margin: 20px auto;">
            <h2 style="color: #4CAF50; font-size: 26px; font-weight: 600;">Hello ${fullName},</h2>
<p style="font-size: 16px; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Thank you for your order! Here are the details:</p>

            <hr style="border: 1px solid #ddd; margin: 20px 0;" />

            <h3 style="color: #4CAF50; font-size: 22px; font-weight: 600;">Order Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <th style="text-align: left; border-bottom: 2px solid #ddd; padding: 10px; background-color: #e7f4e4; font-size: 16px;">Item</th>
                <th style="text-align: left; border-bottom: 2px solid #ddd; padding: 10px; background-color: #e7f4e4; font-size: 16px;">Quantity</th>
                <th style="text-align: left; border-bottom: 2px solid #ddd; padding: 10px; background-color: #e7f4e4; font-size: 16px;">Image</th>
              </tr>
              ${cartItems.map((item: CartItem) => `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #fff; font-size: 14px;">${item.name}</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #fff; font-size: 14px;">${item.quantity}</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #fff;">
                    <img src="${item.image}" alt="${item.name}" style="width: 60px; height: auto; border-radius: 5px;" />
                  </td>
                </tr>
              `).join('')}
            </table>

            <h3 style="color: #4CAF50; margin-top: 30px; font-size: 22px; font-weight: 600;">Order Summary</h3>
            <p style="font-size: 16px;"><strong>Order ID:</strong> ${orderID}</p>
            <p style="font-size: 16px;"><strong>Tracking ID:</strong> ${trackingID}</p>
            <p style="font-size: 16px;"><strong>Subtotal:</strong> <span style="color: #388E3C;">${subtotal} PKR</span></p>
            <p style="font-size: 16px;"><strong>Shipping Charges:</strong> <span style="color: #388E3C;">${shippingCharges} PKR</span></p>
            <p style="font-size: 16px;"><strong>Total:</strong> <span style="color: #D32F2F;">${total} PKR</span></p>
            <p style="font-size: 14px;">Your order is being processed, and you will receive further updates soon!</p>
            <p style="font-size: 14px;">Thank you for shopping with us!</p>
            <p style="font-size: 14px;">Best regards,<br>Kurative Green Team</p>
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

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', email); 

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);

    return NextResponse.json({ error: 'Error sending email: ' + (error instanceof Error ? error.message : 'Unknown error') }, { status: 500 });
  }
}
