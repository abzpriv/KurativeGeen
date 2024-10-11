import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  nearestLocation: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  orderID: { type: String, required: true },
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true },
  shippingCharges: { type: Number, required: true },
  cartItems: { type: Array, required: true },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema, 'orders');

export default Order;
