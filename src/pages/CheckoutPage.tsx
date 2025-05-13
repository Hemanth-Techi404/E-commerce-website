import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user, status } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      clearCart();
    }, 1500);
  };
  
  if (items.length === 0 && !isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some products to your cart before proceeding to checkout.</p>
        <a href="/products" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
          Browse Products
        </a>
      </div>
    );
  }
  
  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">Thank you for your purchase. We've sent a confirmation email with all the details.</p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
            <a 
              href="/" 
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </a>
            <a 
              href="/products" 
              className="inline-block bg-white border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <div className="md:col-span-2">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <Input
                label="State/Province"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
              <Input
                label="ZIP/Postal Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
              <Input
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            
            <h2 className="text-xl font-semibold mb-4 mt-8">Payment Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Name on Card"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  label="Card Number"
                  name="cardNumber"
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration Month
                  </label>
                  <select
                    name="expMonth"
                    value={formData.expMonth}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Month</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                      <option key={month} value={month}>
                        {month.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration Year
                  </label>
                  <select
                    name="expYear"
                    value={formData.expYear}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Year</option>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Input
                  label="CVV"
                  name="cvv"
                  type="password"
                  placeholder="XXX"
                  maxLength={4}
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="mt-8">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
              >
                Place Order
              </Button>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.productId} className="flex justify-between">
                  <div className="flex">
                    <span className="font-medium text-gray-800">{item.quantity}x</span>
                    <span className="ml-2 text-gray-700">{item.product.name}</span>
                  </div>
                  <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{totalPrice > 50 ? 'Free' : '$4.99'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 text-lg font-bold">
                <span>Total</span>
                <span>
                  ${(
                    totalPrice + 
                    (totalPrice > 50 ? 0 : 4.99) + 
                    (totalPrice * 0.08)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>
                By placing your order, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Terms and Conditions
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;