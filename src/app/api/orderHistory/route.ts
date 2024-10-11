import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Order from '../../../models/Order'; 

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || '';

async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function GET() { 
  await connectToDatabase();

  try {
    const orders = await Order.find({}); 

    if (orders.length === 0) {
      return NextResponse.json({ message: 'No orders found' }, { status: 404 });
    }
    
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ message: 'Failed to fetch orders' }, { status: 500 });
  }
}
