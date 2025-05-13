import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation and 20-hour battery life.',
    price: 199.99,
    image: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'electronics'
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor, GPS, and 7-day battery life.',
    price: 149.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'electronics'
  },
  {
    id: '3',
    name: 'Leather Wallet',
    description: 'Handcrafted genuine leather wallet with RFID protection.',
    price: 59.99,
    image: 'https://images.pexels.com/photos/6214478/pexels-photo-6214478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'accessories'
  },
  {
    id: '4',
    name: 'Cotton T-Shirt',
    description: 'Premium organic cotton t-shirt, comfortable and durable.',
    price: 29.99,
    image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'clothing'
  },
  {
    id: '5',
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with touch controls and charging case.',
    price: 129.99,
    image: 'https://images.pexels.com/photos/7254163/pexels-photo-7254163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'electronics'
  },
  {
    id: '6',
    name: 'Desk Lamp',
    description: 'Adjustable LED desk lamp with multiple brightness levels.',
    price: 49.99,
    image: 'https://images.pexels.com/photos/6492402/pexels-photo-6492402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'home'
  },
  {
    id: '7',
    name: 'Coffee Mug',
    description: 'Ceramic coffee mug with minimalist design, 12oz capacity.',
    price: 19.99,
    image: 'https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'home'
  },
  {
    id: '8',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning.',
    price: 89.99,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'clothing'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
};