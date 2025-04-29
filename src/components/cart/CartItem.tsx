
import React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '@/contexts/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/CartItem';

interface CartItemProps {
  item: CartItemType;
  onRemove: (productId: string, productName: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const { updateQuantity } = useCartContext();
  const price = item.product.discount > 0 
    ? item.product.discount 
    : item.product.price;
  const itemTotal = price * item.quantity;
  
  return (
    <div className="border-t border-gray-200">
      <div className="md:grid md:grid-cols-5 gap-4 p-4 items-center">
        {/* Producto (imagen y nombre) */}
        <div className="md:col-span-2 flex items-center mb-4 md:mb-0">
          <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 bg-gray-100">
            <img 
              src={item.product.image} 
              alt={item.product.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="ml-4">
            <Link 
              to={`/product/${item.product.id}`} 
              className="font-medium text-gray-800 hover:text-ecommerce-blue"
            >
              {item.product.name}
            </Link>
            <p className="text-sm text-gray-500">{item.product.category}</p>
          </div>
        </div>
        
        {/* Precio */}
        <div className="text-gray-700 md:text-center mb-2 md:mb-0">
          <span className="md:hidden">Precio: </span>
          {item.product.discount > 0 ? (
            <div className="md:flex md:flex-col md:items-center">
              <span className="text-gray-400 line-through text-sm">${item.product.price.toFixed(2)}</span>
              <span>${item.product.discount.toFixed(2)}</span>
            </div>
          ) : (
            <span>${item.product.price.toFixed(2)}</span>
          )}
        </div>
        
        {/* Cantidad */}
        <div className="md:text-center mb-2 md:mb-0">
          <span className="md:hidden">Cantidad: </span>
          <div className="flex items-center md:justify-center">
            <button 
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="p-1 hover:bg-gray-100 rounded-full disabled:opacity-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-3 font-medium">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              disabled={item.quantity >= item.product.stock}
              className="p-1 hover:bg-gray-100 rounded-full disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Subtotal y botón eliminar */}
        <div className="flex items-center justify-between md:justify-end">
          <span className="font-medium md:hidden">Subtotal:</span>
          <div className="flex items-center">
            <span className="font-medium">${itemTotal.toFixed(2)}</span>
            <button 
              onClick={() => onRemove(item.product.id, item.product.name)}
              className="ml-3 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
              aria-label="Remove item"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
