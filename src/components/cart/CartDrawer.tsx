import React from 'react';
import { useCart } from '../../context/CartContext';
import { X, ShoppingCart, Trash } from 'lucide-react';
import Button from '../ui/Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  
  if (!isOpen) return null;
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold flex items-center">
              <ShoppingCart className="mr-2" size={20} />
              Shopping Cart ({totalItems})
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close cart"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-grow overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-500">Your cart is empty</p>
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="mt-4"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.productId} className="flex border-b pb-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.product.name}</h3>
                        <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-end justify-between text-sm mt-2">
                        <div className="flex items-center border rounded">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-2 py-1">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.productId)}
                          className="text-red-500 hover:text-red-700 transition-colors flex items-center"
                        >
                          <Trash size={16} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Shipping and taxes calculated at checkout
              </p>
              <Button 
                variant="primary" 
                size="lg"
                fullWidth
                onClick={() => {
                  onClose();
                  window.location.href = '/checkout';
                }}
              >
                Checkout
              </Button>
              <div className="mt-2">
                <Button 
                  variant="outline" 
                  size="lg"
                  fullWidth
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;