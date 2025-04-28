
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getProductById } from '@/services/productService';
import { Product } from '@/types/Product';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCartContext } from '@/contexts/CartContext';
import { ShoppingCart, Truck, ArrowLeft, Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { addToCart } = useCartContext();

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        setLoading(true);
        try {
          const productData = await getProductById(id);
          setProduct(productData);
        } catch (error) {
          console.error('Error loading product:', error);
          toast({
            title: "Error",
            description: "No se pudo cargar el producto",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    loadProduct();
  }, [id, toast]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      toast({
        title: "Producto añadido",
        description: `${quantity} ${quantity > 1 ? 'unidades' : 'unidad'} de ${product.name} ${quantity > 1 ? 'añadidas' : 'añadida'} al carrito`,
      });
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="animate-pulse max-w-6xl mx-auto py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded-lg"></div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-24 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              <div className="h-12 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
          <p className="mb-6">El producto que buscas no existe o ha sido eliminado.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const discountPercentage = product.discount 
    ? Math.round(((product.price - product.discount) / product.price) * 100) 
    : 0;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-ecommerce-blue mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a productos
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Imagen del producto */}
          <div className="w-full md:w-1/2">
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white p-4">
              <div className="relative aspect-square">
                {product.discount > 0 && (
                  <span className="absolute top-4 left-4 bg-ecommerce-orange text-white text-sm font-bold px-2 py-1 rounded-md z-10">
                    {discountPercentage}% OFF
                  </span>
                )}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Detalles del producto */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-ecommerce-dark mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i}
                  className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-gray-600 ml-2">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Precio */}
            <div className="mb-6">
              {product.discount > 0 ? (
                <div className="flex items-center">
                  <span className="text-gray-500 text-lg line-through mr-2">${product.price.toFixed(2)}</span>
                  <span className="text-3xl font-bold text-ecommerce-blue">${product.discount.toFixed(2)}</span>
                  <span className="ml-2 bg-ecommerce-orange text-white text-xs font-bold px-2 py-1 rounded-md">
                    {discountPercentage}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-ecommerce-blue">${product.price.toFixed(2)}</span>
              )}
            </div>

            {/* Disponibilidad */}
            <div className="mb-6">
              <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 
                  ? `✓ En stock (${product.stock} disponibles)` 
                  : '✗ Agotado temporalmente'}
              </p>
            </div>

            {/* Cantidad y botón */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <span className="mr-4">Cantidad:</span>
                <div className="flex border border-gray-300 rounded-md">
                  <button 
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-white">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-ecommerce-blue hover:bg-blue-700"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.stock > 0 ? 'Añadir al carrito' : 'Producto agotado'}
              </Button>
            </div>

            <Separator className="my-6" />

            {/* Información adicional */}
            <div className="space-y-4">
              <div className="flex items-start">
                <Truck className="h-5 w-5 mr-2 text-ecommerce-blue flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Envío gratuito</p>
                  <p className="text-sm text-gray-600">En pedidos superiores a $50</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield className="h-5 w-5 mr-2 text-ecommerce-blue flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Garantía de 12 meses</p>
                  <p className="text-sm text-gray-600">Satisfacción garantizada o devolución del dinero</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
