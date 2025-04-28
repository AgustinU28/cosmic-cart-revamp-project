
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@/types/Product';
import { getProductsByCategory } from '@/services/productService';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      if (categoryId) {
        try {
          const data = await getProductsByCategory(categoryId);
          setProducts(data);
        } catch (error) {
          console.error('Error fetching category products:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [categoryId]);

  // Map category IDs to display names
  const getCategoryName = (id: string): string => {
    const categories: Record<string, string> = {
      'electronics': 'Electrónica',
      'clothing': 'Ropa',
      'home': 'Hogar',
    };
    return categories[id as keyof typeof categories] || 'Categoría';
  };

  return (
    <Layout>
      {loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <div className="animate-pulse space-y-8 w-full">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
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
          <h1 className="text-3xl font-bold mb-8">{getCategoryName(categoryId || '')}</h1>
          
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl text-gray-600 mb-4">No hay productos en esta categoría</h3>
              <p>Intenta con otra categoría o vuelve más tarde.</p>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default CategoryPage;
