
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowLeft } from 'lucide-react';
import CartItem from './CartItem';
import { CartItem as CartItemType } from '@/types/CartItem';

interface CartItemsTableProps {
  cartItems: CartItemType[];
  onRemove: (productId: string, productName: string) => void;
  onClearCart: () => void;
}

const CartItemsTable: React.FC<CartItemsTableProps> = ({ 
  cartItems, 
  onRemove, 
  onClearCart 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Encabezado */}
      <div className="hidden md:grid md:grid-cols-5 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-500">
        <div className="md:col-span-2">Producto</div>
        <div className="text-center">Precio</div>
        <div className="text-center">Cantidad</div>
        <div className="text-end">Subtotal</div>
      </div>
      
      {/* Productos */}
      {cartItems.map((item) => (
        <CartItem 
          key={item.product.id} 
          item={item} 
          onRemove={onRemove}
        />
      ))}
      
      {/* Acciones del carrito */}
      <div className="p-4 bg-gray-50 flex justify-between items-center">
        <Link to="/">
          <Button variant="outline" size="sm" className="text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continuar comprando
          </Button>
        </Link>
        
        <Button 
          onClick={onClearCart}
          variant="outline" 
          size="sm"
          className="text-sm text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Vaciar carrito
        </Button>
      </div>
    </div>
  );
};

export default CartItemsTable;
