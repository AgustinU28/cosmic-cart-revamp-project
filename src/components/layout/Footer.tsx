
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-ecommerce-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CosmicShop</h3>
            <p className="text-gray-300">
              Tu tienda online de confianza para encontrar los mejores productos con precios increíbles.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">Productos</Link></li>
              <li><Link to="/offers" className="text-gray-300 hover:text-white transition-colors">Ofertas</Link></li>
              <li><Link to="/account" className="text-gray-300 hover:text-white transition-colors">Mi cuenta</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Ayuda</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contacto</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">Envíos</Link></li>
              <li><Link to="/returns" className="text-gray-300 hover:text-white transition-colors">Devoluciones</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">Preguntas frecuentes</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@cosmicshop.com</li>
              <li>Teléfono: (123) 456-7890</li>
              <li>Dirección: Calle Ejemplo 123, Ciudad</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} CosmicShop. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
