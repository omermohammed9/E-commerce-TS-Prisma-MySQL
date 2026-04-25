export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  image: string;
  category?: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product?: {
    name: string;
    image: string;
  };
}

export interface Order {
  id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  items?: OrderItem[];
}
