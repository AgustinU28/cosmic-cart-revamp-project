
import { Product } from '@/types/Product';

// Datos mock para simular una API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone Galaxy X20',
    description: 'El último smartphone con pantalla AMOLED de 6.5 pulgadas, 8GB RAM y 128GB de almacenamiento.',
    price: 899.99,
    discount: 799.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&h=600',
    category: 'electronics',
    rating: 4.5,
    reviewCount: 127,
    stock: 25
  },
  {
    id: '2',
    name: 'Laptop ProBook Air',
    description: 'Laptop ultradelgada con procesador i7 de 11ª generación, 16GB RAM y SSD de 512GB.',
    price: 1299.99,
    discount: 0,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&h=600',
    category: 'electronics',
    rating: 5,
    reviewCount: 94,
    stock: 12
  },
  {
    id: '3',
    name: 'Auriculares Noise Cancel',
    description: 'Auriculares con cancelación de ruido, conexión Bluetooth 5.0 y 30 horas de autonomía.',
    price: 249.99,
    discount: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600',
    category: 'electronics',
    rating: 4,
    reviewCount: 76,
    stock: 32
  },
  {
    id: '4',
    name: 'Zapatillas Running Pro',
    description: 'Zapatillas deportivas con amortiguación premium y suela antideslizante.',
    price: 129.99,
    discount: 0,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&h=600',
    category: 'clothing',
    rating: 4.5,
    reviewCount: 53,
    stock: 45
  },
  {
    id: '5',
    name: 'Chaqueta Impermeable',
    description: 'Chaqueta ligera e impermeable con capucha para actividades al aire libre.',
    price: 89.99,
    discount: 69.99,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&h=600',
    category: 'clothing',
    rating: 4,
    reviewCount: 28,
    stock: 20
  },
  {
    id: '6',
    name: 'Reloj Inteligente FitTrack',
    description: 'Smartwatch con monitor de ritmo cardíaco, seguimiento de actividad y notificaciones.',
    price: 199.99,
    discount: 149.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&h=600',
    category: 'electronics',
    rating: 4,
    reviewCount: 64,
    stock: 18
  },
  {
    id: '7',
    name: 'Lámpara de Escritorio LED',
    description: 'Lámpara de escritorio con luz LED ajustable y puerto USB para carga.',
    price: 49.99,
    discount: 0,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&h=600',
    category: 'home',
    rating: 4.5,
    reviewCount: 37,
    stock: 40
  },
  {
    id: '8',
    name: 'Mochila Resistente al Agua',
    description: 'Mochila con compartimento para portátil, resistente al agua y múltiples bolsillos.',
    price: 79.99,
    discount: 0,
    image: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=600&h=600',
    category: 'clothing',
    rating: 5,
    reviewCount: 19,
    stock: 22
  }
];

// Servicio para obtener productos con delay para simular la llamada a una API
export const getAllProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500);
  });
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id === id) || null;
      resolve(product);
    }, 300);
  });
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = mockProducts.filter(p => p.category === category);
      resolve(products);
    }, 500);
  });
};

export const getDiscountedProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = mockProducts.filter(p => p.discount > 0);
      resolve(products);
    }, 500);
  });
};
