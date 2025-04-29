
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  isLoading: boolean;
  onCheckout: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  subtotal, 
  shipping, 
  total,
  isLoading, 
  onCheckout 
}) => {
  return (
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
        onClick={onCheckout}
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
  );
};

export default OrderSummary;
