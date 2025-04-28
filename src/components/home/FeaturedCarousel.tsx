
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface FeaturedItem {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  link: string;
}

const featuredItems: FeaturedItem[] = [
  {
    id: '1',
    title: 'Nueva colección de verano',
    description: 'Descubre las últimas tendencias para esta temporada con hasta 30% de descuento',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=1200&h=600',
    buttonText: 'Ver ofertas',
    link: '/offers'
  },
  {
    id: '2',
    title: 'Tecnología de última generación',
    description: 'Los mejores dispositivos electrónicos con descuentos exclusivos',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=1200&h=600',
    buttonText: 'Explorar',
    link: '/category/electronics'
  },
  {
    id: '3',
    title: 'Muebles para el hogar',
    description: 'Transforma tu espacio con nuestra colección de muebles modernos',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=1200&h=600',
    buttonText: 'Ver colección',
    link: '/category/home'
  }
];

const FeaturedCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = featuredItems.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-md mb-8">
      <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {featuredItems.map((item) => (
          <div key={item.id} className="min-w-full h-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-start px-8 md:px-16">
              <div className="max-w-md text-white animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">{item.title}</h2>
                <p className="text-lg mb-6">{item.description}</p>
                <Link to={item.link}>
                  <Button className="bg-ecommerce-orange hover:bg-orange-600 text-white">
                    {item.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button 
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm"
        onClick={goToPrevSlide}
      >
        <ArrowLeft className="h-6 w-6 text-white" />
      </button>
      <button 
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm"
        onClick={goToNextSlide}
      >
        <ArrowRight className="h-6 w-6 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
