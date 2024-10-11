import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Order from '../../../models/Order'; 

const MONGODB_URI = process.env.MONGODB_URI || '';

async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function PUT(req: Request) {
  await connectToDatabase();

  const { orderID, status } = await req.json();

  console.log('Received orderID:', orderID, 'with status:', status);

  if (!orderID || !status) {
    return NextResponse.json({ message: 'orderID and status are required' }, { status: 400 });
  }

  try {
    const updatedOrder = await Order.updateOne(
      { orderID }, 
      { $set: { status } }, 
    );

    console.log('Update operation result:', updatedOrder);

    if (updatedOrder.matchedCount === 0) {
      console.log('Order not found for orderID:', orderID);
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    console.log('Updated order:', updatedOrder);
    return NextResponse.json({ message: 'Order status updated successfully', updatedOrder }, { status: 200 });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json({ message: 'Failed to update order status' }, { status: 500 });
  }
}
