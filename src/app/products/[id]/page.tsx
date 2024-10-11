'use client';
import React, { useEffect, useState } from 'react';
import ProductDetail from '../../../component/ProductDetail';
import { StaticImageData } from 'next/image';

type Product = {
  _id: string;
  name: string;
  price: string;
  image: StaticImageData; 
  quantity: number; 
  description?: string; 
  tablets: number; 
  urduDescription?: string;
  specialistNutrients?: {
    name: string;
    description: string;
    image: StaticImageData  
  }[];
  nutrientCount?: number;
 
};

const ProductPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/productsDetail/${params.id}`);

      if (!response.ok) {
        setError('Product not found'); 
        setSelectedProduct(null);
        return;
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const product: Product = await response.json();
        setSelectedProduct(product);
      } else {
        throw new Error('Invalid response type');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [params.id]);

  if (loading) {
    return
  }

  if (error) {
    return <p>{error}</p>; 
  }

  return (
    <>
      {selectedProduct ? (
        <ProductDetail product={selectedProduct} />
      ) : (
        <p>Product not found.</p> 
      )}
    </>
  );
};

export default ProductPage;
