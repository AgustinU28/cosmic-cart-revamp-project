
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/Product';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  return (
    <div className="my-8 animate-slide-in">
      {title && <h2 className="text-2xl font-bold mb-6 text-ecommerce-dark">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
