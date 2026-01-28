export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'main' | 'starter' | 'dessert' | 'drink';
  tags: string[];
  calories: number;
  prepTime: number; // in minutes
}

export interface CartItem extends Dish {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface PlateBundle {
  id: string;
  title: string;
  subtitle: string;
  iconCount: number;
  type: 'plate' | 'family';
  price: number;
  calories: number;
}