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
    console.log('GMAIL_USER:', process.env.GMAIL_USER); 

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
        <div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="background-color: #4CAF50; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">Kurative Green </h1>
                <p style="color: #f2f2f2; margin: 5px;">Order Confirmation</p>
              </td>
            </tr>
          </table>
          <div style="padding: 20px;">
            <h2 style="color: #4CAF50;">Hello ${fullName},</h2>
            <p>Thank you for your order! Here are the details:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <th style="text-align: left; border-bottom: 2px solid #ddd; padding: 8px; background-color: #e7f4e4;">Item</th>
                <th style="text-align: left; border-bottom: 2px solid #ddd; padding: 8px; background-color: #e7f4e4;">Quantity</th>
                <th style="text-align: left; border-bottom: 2px solid #ddd; padding: 8px; background-color: #e7f4e4;">Image</th>
              </tr>
              ${cartItems.map((item: CartItem) => `
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd; background-color: #fff;">${item.name}</td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd; background-color: #fff;">${item.quantity}</td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd; background-color: #fff;">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;" />
                  </td>
                </tr>
              `).join('')}
            </table>
            <h3 style="color: #4CAF50; margin-top: 20px;">Order Summary</h3>
            <p><strong>Order ID:</strong> ${orderID}</p>
            <p><strong>Tracking ID:</strong> ${trackingID}</p>
            <p><strong>Subtotal:</strong> ${subtotal} PKR</p>
            <p><strong>Shipping Charges:</strong> ${shippingCharges} PKR</p>
            <p><strong>Total:</strong> ${total} PKR</p>
            <p>Your order is being processed, and you will receive further updates soon!</p>
            <p>Thank you for shopping with us!</p>
            <p>Best regards,<br>Kurative Green Team</p>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
              <td style="text-align: center; font-size: 12px; color: #777;">
                <p>Follow us on:</p>
                <p>
                  <a href="#" style="color: #4CAF50; text-decoration: none;">Facebook</a> |
                  <a href="#" style="color: #4CAF50; text-decoration: none;">Instagram</a> |
                  <a href="#" style="color: #4CAF50; text-decoration: none;">Twitter</a>
                </p>
                <p>© ${new Date().getFullYear()} Kurative Green. All rights reserved.</p>
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
