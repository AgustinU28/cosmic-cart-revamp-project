
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCartContext } from '@/contexts/CartContext';
import { Product } from '@/types/Product';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartContext();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Producto añadido",
      description: `${product.name} ha sido añadido al carrito`,
    });
  };

  const discountPercentage = product.discount 
    ? Math.round(((product.price - product.discount) / product.price) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-shadow hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block relative">
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-ecommerce-orange text-white text-xs font-bold px-2 py-1 rounded-md">
            {discountPercentage}% OFF
          </span>
        )}
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transform transition-transform hover:scale-105" 
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-gray-800 font-medium text-lg mb-2 hover:text-ecommerce-blue transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg 
              key={i}
              className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviewCount} reviews)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {product.discount > 0 ? (
              <div>
                <span className="text-gray-500 text-sm line-through">${product.price.toFixed(2)}</span>
                <span className="text-xl font-bold text-ecommerce-blue ml-2">${product.discount.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-xl font-bold text-ecommerce-blue">${product.price.toFixed(2)}</span>
            )}
          </div>
          <Button 
            onClick={handleAddToCart}
            size="sm" 
            className="bg-ecommerce-blue hover:bg-blue-700"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Añadir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
