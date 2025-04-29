
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useCartContext } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import EmptyCart from '@/components/cart/EmptyCart';
import CartItemsTable from '@/components/cart/CartItemsTable';
import OrderSummary from '@/components/cart/OrderSummary';
import { useCheckout } from '@/hooks/useCheckout';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, getSubtotal } = useCartContext();
  const { toast } = useToast();
  
  const subtotal = getSubtotal();
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  const { isLoading, handleCheckout } = useCheckout({ 
    cartItems, 
    clearCart 
  });

  const handleRemove = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast({
      title: "Producto eliminado",
      description: `${productName} ha sido eliminado del carrito`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Carrito vaciado",
      description: "Todos los productos han sido eliminados del carrito",
    });
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Tu carrito</h1>
      
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Lista de productos en carrito */}
          <div className="w-full lg:w-2/3">
            <CartItemsTable 
              cartItems={cartItems}
              onRemove={handleRemove}
              onClearCart={handleClearCart}
            />
          </div>
          
          {/* Resumen del pedido */}
          <div className="w-full lg:w-1/3">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              isLoading={isLoading}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;
