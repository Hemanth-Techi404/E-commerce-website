import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, getProductsByCategory, products } from '../data/products';
import ProductDetail from '../components/product/ProductDetail';
import ProductGrid from '../components/product/ProductGrid';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(id ? getProductById(id) : null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);

      if (foundProduct) {
        // Get related products (same category, excluding current product)
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== foundProduct.id)
          .slice(0, 4); // Limit to 4 related products
        setRelatedProducts(related);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-2">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <a href="/products" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
          Browse All Products
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6">
        <ol className="flex text-sm text-gray-500">
          <li>
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
          </li>
          <li className="mx-2">/</li>
          <li>
            <a href="/products" className="hover:text-blue-600 transition-colors">Products</a>
          </li>
          <li className="mx-2">/</li>
          <li>
            <a href={`/products?category=${product.category}`} className="hover:text-blue-600 transition-colors capitalize">
              {product.category}
            </a>
          </li>
          <li className="mx-2">/</li>
          <li className="text-gray-700 font-medium truncate">{product.name}</li>
        </ol>
      </nav>
      
      {/* Product Details */}
      <ProductDetail product={product} />
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;