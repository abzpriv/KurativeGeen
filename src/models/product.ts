import { Schema, model, models } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  tablets: { type: Number, required: true },
}, { timestamps: true });

export default models.Product || model('Product', productSchema);
