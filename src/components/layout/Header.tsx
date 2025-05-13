import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-blue-600">ShopHub</a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
            <a href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">Products</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                  <User size={24} />
                  <span className="hidden md:inline">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Profile</a>
                    <a href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Orders</a>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <a href="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                <span className="hidden md:inline">Login</span>
                <User size={24} className="md:hidden" />
              </a>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">Products</a>
              <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;