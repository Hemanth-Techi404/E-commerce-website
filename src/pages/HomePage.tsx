import React from 'react';
import { products } from '../data/products';
import ProductGrid from '../components/product/ProductGrid';
import { ChevronRight, TrendingUp, Truck, ShieldCheck, Smartphone } from 'lucide-react';

const HomePage: React.FC = () => {
  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] bg-gradient-to-r from-blue-900 to-blue-600 text-white">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Discover Quality Products for Every Need
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Shop the latest trends and essentials with our curated collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/products" 
                className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </a>
              <a 
                href="#featured" 
                className="inline-block bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Featured Products
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start">
              <div className="flex items-center justify-center bg-blue-100 rounded-full p-3 mr-4">
                <Truck className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-gray-600 text-sm">On orders over $50</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center justify-center bg-blue-100 rounded-full p-3 mr-4">
                <ShieldCheck className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Secure Payment</h3>
                <p className="text-gray-600 text-sm">100% secure checkout</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center justify-center bg-blue-100 rounded-full p-3 mr-4">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Quality Products</h3>
                <p className="text-gray-600 text-sm">Curated from top brands</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center justify-center bg-blue-100 rounded-full p-3 mr-4">
                <Smartphone className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600 text-sm">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section id="featured" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <a 
              href="/products" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              View All <ChevronRight size={20} />
            </a>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get the Latest Updates</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter to receive updates on new products, special offers, and more.
          </p>
          
          <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;