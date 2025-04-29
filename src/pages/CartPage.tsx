
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, ArrowLeft, Plus, Minus, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { supabase } from "@/integrations/supabase/client";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getSubtotal } = useCartContext();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  
  const subtotal = getSubtotal();
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

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

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos a tu carrito antes de proceder al pago",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { origin } = window.location;
      const successUrl = `${origin}/payment-success`;
      const cancelUrl = `${origin}/cart`;

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          cartItems,
          successUrl,
          cancelUrl
        }
      });

      if (error) {
        throw new Error(error.message || 'Error al crear la sesión de pago');
      }

      if (data && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No se obtuvo una URL válida para el checkout');
      }

    } catch (error: any) {
      console.error('Error en el proceso de checkout:', error);
      toast({
        title: "Error en el proceso de pago",
        description: error.message || "Ocurrió un error inesperado",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Tu carrito</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="mb-6">
            <svg 
              className="w-16 h-16 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">¿No sabes qué comprar? ¡Miles de productos te esperan!</p>
          <Link to="/">
            <Button className="bg-ecommerce-blue hover:bg-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continuar comprando
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Lista de productos en carrito */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Encabezado */}
              <div className="hidden md:grid md:grid-cols-5 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-500">
                <div className="md:col-span-2">Producto</div>
                <div className="text-center">Precio</div>
                <div className="text-center">Cantidad</div>
                <div className="text-end">Subtotal</div>
              </div>
              
              {/* Productos */}
              {cartItems.map((item) => {
                const price = item.product.discount > 0 
                  ? item.product.discount 
                  : item.product.price;
                const itemTotal = price * item.quantity;
                
                return (
                  <div key={item.product.id} className="border-t border-gray-200">
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
                            onClick={() => handleRemove(item.product.id, item.product.name)}
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
              })}
              
              {/* Acciones del carrito */}
              <div className="p-4 bg-gray-50 flex justify-between items-center">
                <Link to="/">
                  <Button variant="outline" size="sm" className="text-sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continuar comprando
                  </Button>
                </Link>
                
                <Button 
                  onClick={handleClearCart}
                  variant="outline" 
                  size="sm"
                  className="text-sm text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Vaciar carrito
                </Button>
              </div>
            </div>
          </div>
          
          {/* Resumen del pedido */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Resumen del pedido</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Gratis</span>
                  ) : (
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  )}
                </div>
                
                {shipping > 0 && (
                  <div className="text-sm text-gray-500">
                    Envío gratis en compras superiores a $50
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-ecommerce-blue hover:bg-blue-700 text-lg py-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  'Proceder al pago'
                )}
              </Button>
              
              <div className="mt-6 text-sm text-gray-500">
                <p className="mb-2">Aceptamos:</p>
                <div className="flex space-x-2">
                  <div className="p-1 border border-gray-200 rounded">
                    <span className="text-xs font-medium">VISA</span>
                  </div>
                  <div className="p-1 border border-gray-200 rounded">
                    <span className="text-xs font-medium">MASTERCARD</span>
                  </div>
                  <div className="p-1 border border-gray-200 rounded">
                    <span className="text-xs font-medium">PAYPAL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;
