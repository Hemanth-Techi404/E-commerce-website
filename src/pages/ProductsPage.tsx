import React, { useState, useEffect } from 'react';
import { products, getAllCategories } from '../data/products';
import ProductGrid from '../components/product/ProductGrid';
import { Search } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  const categories = getAllCategories();
  
  useEffect(() => {
    // Apply filters
    let result = [...products];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(term) || 
          product.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, sortBy]);
  
  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      
      {/* Filters */}
      <div className="mb-8 bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Category filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          {/* Sort options */}
          <div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
        
        {/* Active filters */}
        {(searchTerm || selectedCategory || sortBy) && (
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-500 mr-2">Active filters:</span>
            {searchTerm && (
              <span className="bg-gray-100 rounded-full px-3 py-1 text-sm mr-2">
                "{searchTerm}"
              </span>
            )}
            {selectedCategory && (
              <span className="bg-gray-100 rounded-full px-3 py-1 text-sm mr-2 capitalize">
                {selectedCategory}
              </span>
            )}
            {sortBy && (
              <span className="bg-gray-100 rounded-full px-3 py-1 text-sm mr-2">
                {sortBy === 'price-low' && 'Price: Low to High'}
                {sortBy === 'price-high' && 'Price: High to Low'}
                {sortBy === 'name' && 'Name: A to Z'}
              </span>
            )}
            <button 
              onClick={handleReset}
              className="text-sm text-blue-600 hover:text-blue-800 ml-auto"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
      
      {/* Results count */}
      <p className="text-gray-600 mb-6">
        Showing {filteredProducts.length} of {products.length} products
      </p>
      
      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2">No products found</h2>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or search term.
          </p>
          <button 
            onClick={handleReset}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
};

export default ProductsPage;