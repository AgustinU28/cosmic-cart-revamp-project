
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { CartItem } from '@/types/CartItem';

interface UseCheckoutProps {
  cartItems: CartItem[];
  clearCart: () => void;
}

export const useCheckout = ({ cartItems, clearCart }: UseCheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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

      if (!data) {
        throw new Error('No se recibió respuesta del servidor');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (data && data.url) {
        // Open Stripe Checkout in a new tab instead of redirecting
        window.open(data.url, '_blank');
        toast({
          title: "Procesando pago",
          description: "Se ha abierto una nueva ventana para completar tu pago",
        });
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

  return {
    isLoading,
    handleCheckout
  };
};
