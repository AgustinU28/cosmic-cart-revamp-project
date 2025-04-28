
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCartContext } from '@/contexts/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const { cartItems } = useCartContext();

  const categories = [
    { name: 'Electrónica', path: '/category/electronics' },
    { name: 'Ropa', path: '/category/clothing' },
    { name: 'Hogar', path: '/category/home' },
    { name: 'Ofertas', path: '/offers' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Búsqueda",
      description: "Funcionalidad de búsqueda en desarrollo",
    });
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-ecommerce-blue">
              CosmicShop
            </Link>
          </div>

          {/* Search - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-6">
            <form onSubmit={handleSearch} className="w-full max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecommerce-blue"
                />
                <button type="submit" className="absolute right-2 top-2">
                  <Search className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/account" className="hover:text-ecommerce-blue transition-colors">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/cart" className="relative hover:text-ecommerce-blue transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-ecommerce-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative mr-4 hover:text-ecommerce-blue transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-ecommerce-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="text-gray-500 focus:outline-none">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="hidden md:flex py-3 border-t border-gray-200">
          <ul className="flex space-x-8">
            {categories.map((category) => (
              <li key={category.name}>
                <Link 
                  to={category.path}
                  className="text-gray-600 hover:text-ecommerce-blue transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 animate-fade-in">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecommerce-blue"
              />
              <button type="submit" className="absolute right-2 top-2">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </form>
          <ul className="space-y-3">
            {categories.map((category) => (
              <li key={category.name}>
                <Link 
                  to={category.path}
                  className="block text-gray-600 hover:text-ecommerce-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                to="/account" 
                className="block text-gray-600 hover:text-ecommerce-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Mi cuenta
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
