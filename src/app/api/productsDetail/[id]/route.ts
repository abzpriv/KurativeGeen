//app/productDetail/[id]/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Product from '../../../../models/ProductDetail';

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', (error as Error).message); 
      throw new Error('Could not connect to MongoDB');
    }
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  const { id } = params; 
  console.log('Fetching product with ID:', id);

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error('Invalid product ID:', id);
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
  }

  try {
    const product = await Product.findById(id); 

    if (!product) {
      console.log('No product found with the given ID');
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product); 
  } catch (error: unknown) { 
    console.error('Failed to fetch product:', (error as Error).message); 
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
