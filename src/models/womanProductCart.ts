import mongoose from 'mongoose';

const womanProductCartSchema = new mongoose.Schema({
  _id: { type: String, required: true }, 
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    urduDescription: { type: String },
    tablets: { type: Number, required: true },
    image: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.UniqueWomanProductCart || mongoose.model('UniqueWomanProductCart', womanProductCartSchema, 'unique_woman_product_cart');
