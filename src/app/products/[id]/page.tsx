// src/app/products/[id]/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import ProductDetail from '../../../component/ProductDetail';
import familyImage from '../../../assets/ImageFamily.png'; 
import dailyPinkImage from '../../../assets/ImageDailyPink.png';
import { StaticImageData } from 'next/image';
import Special from '../../../assets/Special.png';
import B6 from '../../../assets/B6.png';
import ImageB12 from '../../../assets/ImageB12.png';
import ImageFE from '../../../assets/FE.png';
import ImageZN from '../../../assets/ZN.png';
type Product = {
  id: number;
  name: string;
  price: string;
  image: StaticImageData;
  quantity: number; 
  description?: string; 
  tablets?: number; 
};

const moreProducts = [
 {
    id: 6,
    image: dailyPinkImage,
    name: 'Daily Pink',
    price: '1500 PKR',
    quantity: 1,
    tablets: 30,
    description: 'Daily Pink is a specially formulated supplement designed to support mothers and their babies throughout the journey of pregnancy. ' + 
      'Packed with essential vitamins and minerals, it nurtures the health and wellness of both mother and child. ' +
      'Before pregnancy, it prepares your body with vital nutrients to enhance fertility. ' +
      'During pregnancy, it ensures optimal development for your baby while maintaining your energy levels. ' + 
      'After pregnancy, Daily Pink aids in recovery and supports breastfeeding, promoting a healthy bond. ' +
      '“Supports moms and babies before, during, and after pregnancy. Nourish your journey to motherhood.”',
    urduDescription: 'ڈےلی پنک ایک خاص طور پر تیار کردہ سپلیمنٹ ہے جو ماؤں اور ان کے بچوں کی حمل کے سفر کے دوران مدد کرنے کے لئے ڈیزائن کیا گیا ہے۔ ' +
      'یہ ضروری وٹامنز اور معدنیات سے بھرپور ہے، جو ماں اور بچے کی صحت اور تندرستی کو نازک بناتا ہے۔ ' +
      'حمل سے پہلے، یہ آپ کے جسم کو ضروری غذائی اجزاء کے ساتھ تیار کرتا ہے تاکہ زرخیزی کو بڑھایا جا سکے۔ ' +
      'حمل کے دوران، یہ آپ کے بچے کی بہترین ترقی کو یقینی بناتا ہے جبکہ آپ کی توانائی کی سطح کو برقرار رکھتا ہے۔ ' +
      'حمل کے بعد، ڈےلی پنک صحت یابی میں مدد کرتا ہے اور دودھ پلانے کی حمایت کرتا ہے، صحت مند رشتہ کو فروغ دیتا ہے۔ ' +
      '“حمل سے پہلے، دوران اور بعد میں ماؤں اور بچوں کی حمایت کرتا ہے۔ ماں بننے کے سفر کو نازک بنائیں۔',
      specialistNutrients: [
      {
        name: "Specialist Nutrients",
        description: "Evening Primrose & Starflower Oil",
        image: Special, 
      },
      {
        name: "VITAMIN B6",
        description: "Contributes to the regulation of hormonal activity.",
        image: B6, 
      },
      {
        name: "B6, B12 & IRON",
        description: "Contribute to normal energy release.",
        image: ImageB12, 
      },
      {
        name: "IRON",
        description: "Contributes to normal formation of red blood cells and haemoglobin.",
        image: ImageFE, 
      },
      {
        name: "SELENIUM & ZINC",
        description: "Contribute to normal function of the immune system.",
        image: ImageZN, 
      },
    ],
    nutrientCount: 26,
  },
  { id: 7, image: familyImage, name: 'Xtreme', price: '1500 PKR', quantity: 1, tablets: 10, description: 'An advanced formula for energy and vitality.' },
  { id: 8, image: dailyPinkImage, name: 'Daily Pink', price: '1500 PKR', quantity: 1, tablets: 30, description: 'A supplement for daily health and wellness.' },
  { id: 9, image: familyImage, name: 'Xtreme', price: '1500 PKR', quantity: 1, tablets: 10, description: 'An advanced formula for energy and vitality.' },
  { id: 10, image: dailyPinkImage, name: 'Daily Pink', price: '1500 PKR', quantity: 1, tablets: 30, description: 'A supplement for daily health and wellness.' },
  { id: 11, image: familyImage, name: 'Xtreme', price: '1500 PKR', quantity: 1, tablets: 10, description: 'An advanced formula for energy and vitality.' },
  { id: 12, image: dailyPinkImage, name: 'Daily Pink', price: '1500 PKR', quantity: 1, tablets: 30, description: 'A supplement for daily health and wellness.' },
  { id: 13, image: familyImage, name: 'Xtreme', price: '1500 PKR', quantity: 1, tablets: 10, description: 'An advanced formula for energy and vitality.' },
  { id: 14, image: dailyPinkImage, name: 'Daily Pink', price: '1500 PKR', quantity: 1, tablets: 30, description: 'A supplement for daily health and wellness.' },
  { id: 15, image: familyImage, name: 'Xtreme', price: '1500 PKR', quantity: 1, tablets: 10, description: 'An advanced formula for energy and vitality.' },
];


const ProductPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (params.id) {
      const product = moreProducts.find((product) => product.id === Number(params.id));
      setSelectedProduct(product || null);
    }
  }, [params.id]);

  if (!selectedProduct) {
    return ; 
  }

  return <ProductDetail selectedProduct={selectedProduct} />;
};

export default ProductPage;
