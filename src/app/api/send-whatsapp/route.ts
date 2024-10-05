// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//     try {
//         // Parse the incoming request body
//         const { message } = await request.json();

//         // Ensure you have a valid message
//         if (!message) {
//             return NextResponse.json({ error: 'Message is required' }, { status: 400 });
//         }

//         // OpenAI API key and endpoint
//         const apiKey = process.env.NEXT_PUBLIC_API_KEY; 
//         const apiUrl = 'https://api.openai.com/v1/chat/completions'; 

//         // Make the request to the external API
//         const apiResponse = await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 model: 'gpt-3.5-turbo', // Specify the model you want to use
//                 messages: [{ role: 'user', content: message }] // Correctly format the message
//             }),
//         });

//         // Handle the response from the API
//         if (!apiResponse.ok) {
//             const errorData = await apiResponse.json();
//             return NextResponse.json({ error: errorData.error.message || 'Failed to process the request' }, { status: apiResponse.status });
//         }

//         const responseData = await apiResponse.json();
//         return NextResponse.json(responseData);

//     } catch (error) {
//         console.error('Error in chatbot API:', error);
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// }


// pages/api/send-whatsapp.ts

import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const fromWhatsAppNumber = 'whatsapp:+14155238886';

export async function POST(request: Request) {
    try {
        const { message, to } = await request.json(); 

        if (!message || !to) {
            return NextResponse.json({ error: 'Message and recipient number are required' }, { status: 400 });
        }

        await client.messages.create({
            body: message,
            from: fromWhatsAppNumber, 
            to: `whatsapp:${to}` 
        });

        return NextResponse.json({ success: true, message: 'Message sent to WhatsApp' });
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        
        const errorMessage = error instanceof Error ? error.message : 'Failed to send WhatsApp message';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
