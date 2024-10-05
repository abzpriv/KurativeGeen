import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    const mailOptions = {
  from: process.env.GMAIL_USER,
  to: process.env.GMAIL_USER,
  subject: `Contact Us  Form Submission: ${subject}`,
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          padding: 20px;
          border: 1px solid #e0e0e0;
        }
        h2 {
          color: #4CAF50;
          font-size: 28px;
          margin-bottom: 15px;
          border-bottom: 2px solid #4CAF50; 
          padding-bottom: 10px;
        }
        p {
          color: #333;
          line-height: 1.6;
          margin-bottom: 10px;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #888;
          text-align: center;
          border-top: 1px solid #e0e0e0;
          padding-top: 10px;
        }
        .highlight {
          background-color: #e8f5e9; 
          padding: 10px;
          border-left: 4px solid #4CAF50; 
          margin-bottom: 10px;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Contact Form Submission</h2>
        <div class="highlight">
          <strong>Name:</strong> ${name}
        </div>
        <div class="highlight">
          <strong>Email:</strong> ${email}
        </div>
        <div class="highlight">
          <strong>Subject:</strong> ${subject}
        </div>
        <div class="highlight">
          <strong>Message:</strong>
          <p>${message}</p>
        </div>
        <div class="footer">This email was sent from the Contact Us form on your Kurative Green website.</div>
      </div>
    </body>
    </html>
  `,
};



    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
