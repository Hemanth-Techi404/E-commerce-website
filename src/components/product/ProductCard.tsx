import React from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product.id);
  };

  return (
    <Card className="h-full flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <a href={`/product/${product.id}`} className="block overflow-hidden">
        <div className="relative pb-[100%] overflow-hidden bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </a>
      <div className="p-4 flex-grow flex flex-col">
        <a href={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-semibold mb-1 text-gray-800 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </a>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <Button 
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            className="flex items-center"
          >
            <ShoppingCart size={16} className="mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;