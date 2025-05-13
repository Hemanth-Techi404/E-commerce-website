import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import Button from '../ui/Button';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addItem(product.id, quantity);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-auto object-cover"
        />
      </div>
      
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <p className="text-2xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
        
        <div className="border-t border-b border-gray-200 py-4 my-4">
          <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
          <p className="text-sm text-gray-500">Category: <span className="capitalize">{product.category}</span></p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center">
            <button 
              onClick={decreaseQuantity}
              className="flex items-center justify-center w-10 h-10 rounded-l-md border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <input 
              type="number" 
              id="quantity"
              value={quantity} 
              onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="w-16 h-10 text-center border-y border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
            />
            <button 
              onClick={increaseQuantity}
              className="flex items-center justify-center w-10 h-10 rounded-r-md border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        
        <Button 
          onClick={handleAddToCart}
          variant="primary" 
          size="lg"
          fullWidth
          className="mb-4"
        >
          <ShoppingCart className="mr-2" size={20} />
          Add to Cart
        </Button>
        
        <div className="text-sm text-gray-500">
          <p>Free shipping for orders over $50</p>
          <p>30-day money-back guarantee</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;