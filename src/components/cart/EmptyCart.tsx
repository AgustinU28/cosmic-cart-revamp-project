
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const EmptyCart: React.FC = () => {
  return (
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
  );
};

export default EmptyCart;
