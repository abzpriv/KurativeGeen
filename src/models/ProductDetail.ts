import mongoose from 'mongoose';

const SpecialistNutrientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, 
}, { _id: false }); 

const ProductDetailSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  urduDescription: { type: String },
  tablets: { type: Number, required: true },
  image: { type: String, required: true },
  specialistNutrients: [SpecialistNutrientSchema], 
  nutrientCount: { type: Number }, 
}, { timestamps: true });

export default mongoose.models.NewUniqueProduct || mongoose.model('NewUniqueProduct', ProductDetailSchema, 'products123');
