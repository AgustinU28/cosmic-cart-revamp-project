
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { useCartContext } from '@/contexts/CartContext';

const PaymentSuccess = () => {
  const { clearCart } = useCartContext();

  useEffect(() => {
    // Limpiar el carrito después de una compra exitosa
    clearCart();
  }, [clearCart]);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Pago completado con éxito!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Gracias por tu compra. Hemos recibido tu pedido y lo procesaremos a la brevedad.
          </p>

          <p className="text-gray-500 mb-4">
            Recibirás un correo electrónico con los detalles de tu compra y el número de seguimiento cuando tu pedido sea enviado.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/">
              <Button className="w-full sm:w-auto bg-ecommerce-blue hover:bg-blue-700">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Continuar comprando
              </Button>
            </Link>
            
            <Link to="/account">
              <Button variant="outline" className="w-full sm:w-auto">
                Ver mis pedidos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
