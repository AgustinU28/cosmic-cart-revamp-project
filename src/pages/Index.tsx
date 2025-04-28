
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import FeaturedCarousel from '@/components/home/FeaturedCarousel';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@/types/Product';
import { getAllProducts, getDiscountedProducts } from '@/services/productService';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [allProducts, discounted] = await Promise.all([
          getAllProducts(),
          getDiscountedProducts(),
        ]);
        
        // Mostrar productos con mejor rating como destacados
        const featured = [...allProducts]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4);
        
        setFeaturedProducts(featured);
        setDiscountedProducts(discounted);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <FeaturedCarousel />
      
      {isLoading ? (
        <div className="w-full flex justify-center items-center py-20">
          <div className="animate-pulse space-y-8 w-full">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 h-80">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <ProductGrid products={featuredProducts} title="Productos destacados" />
          
          <Separator className="my-12" />
          
          <div className="my-8">
            <h2 className="text-2xl font-bold mb-6 text-ecommerce-dark">Ofertas especiales</h2>
            <ProductGrid products={discountedProducts} />
          </div>
          
          <div className="bg-ecommerce-gray rounded-lg p-8 my-12 text-center">
            <h2 className="text-2xl font-bold mb-4">¿Quieres recibir las mejores ofertas?</h2>
            <p className="text-gray-600 mb-6">Suscríbete a nuestro newsletter y recibe ofertas exclusivas.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecommerce-blue" 
              />
              <button className="bg-ecommerce-blue hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                Suscribirme
              </button>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Index;
