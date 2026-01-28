import { Dish, Testimonial, PlateBundle } from './types';

export const MENU_ITEMS: Dish[] = [
  {
    id: '1',
    name: 'Herb-Crusted Salmon',
    description: 'Fresh Atlantic salmon fillet with a crispy herb crust, served with roasted asparagus and quinoa.',
    price: 24.50,
    image: 'https://picsum.photos/id/1080/600/400',
    category: 'main',
    tags: ['Healthy', 'Gluten-Free', 'High Protein'],
    calories: 450,
    prepTime: 25
  },
  {
    id: '2',
    name: 'Truffle Mushroom Risotto',
    description: 'Creamy arborio rice slow-cooked with wild mushrooms, parmesan cheese, and a drizzle of truffle oil.',
    price: 21.00,
    image: 'https://picsum.photos/id/1060/600/400',
    category: 'main',
    tags: ['Vegetarian', 'Rich', 'Comfort'],
    calories: 620,
    prepTime: 35
  },
  {
    id: '3',
    name: 'Classic Beef Bourguignon',
    description: 'Tender beef chunks braised in red wine with pearl onions, mushrooms, and carrots.',
    price: 28.00,
    image: 'https://picsum.photos/id/1070/600/400',
    category: 'main',
    tags: ['Hearty', 'Classic', 'Slow-Cooked'],
    calories: 750,
    prepTime: 40
  },
  {
    id: '4',
    name: 'Caprese Salad Stack',
    description: 'Layers of vine-ripened tomatoes, fresh mozzarella, and basil, drizzled with balsamic glaze.',
    price: 14.00,
    image: 'https://picsum.photos/id/102/600/400',
    category: 'starter',
    tags: ['Vegetarian', 'Fresh', 'Light'],
    calories: 280,
    prepTime: 10
  },
  {
    id: '5',
    name: 'Artisan Sourdough Board',
    description: 'Warm, house-baked sourdough served with whipped salted butter and olive tapenade.',
    price: 9.50,
    image: 'https://picsum.photos/id/1062/600/400',
    category: 'starter',
    tags: ['Vegan Option', 'Sharable'],
    calories: 350,
    prepTime: 5
  },
  {
    id: '6',
    name: 'Lemon Basil Tart',
    description: 'Zesty lemon curd in a buttery pastry shell, topped with fresh basil and meringue drops.',
    price: 11.00,
    image: 'https://picsum.photos/id/106/600/400',
    category: 'dessert',
    tags: ['Sweet', 'Tangy'],
    calories: 320,
    prepTime: 0
  },
  {
    id: '7',
    name: 'Dark Chocolate Mousse',
    description: 'Decadent 70% dark chocolate mousse topped with raspberry coulis and mint.',
    price: 12.50,
    image: 'https://picsum.photos/id/1069/600/400',
    category: 'dessert',
    tags: ['Gluten-Free', 'Indulgent'],
    calories: 410,
    prepTime: 0
  },
  {
    id: '8',
    name: 'Spiced Pear Sparkler',
    description: 'Sparkling water infused with homemade pear syrup, cinnamon, and star anise.',
    price: 6.50,
    image: 'https://picsum.photos/id/113/600/400',
    category: 'drink',
    tags: ['Non-Alcoholic', 'Refreshing'],
    calories: 90,
    prepTime: 5
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Food Blogger',
    text: 'The freshness of the ingredients is undeniable. It tastes exactly like a home-cooked meal but elevated to restaurant quality.',
    avatar: 'https://picsum.photos/id/64/100/100'
  },
  {
    id: 't2',
    name: 'Marcus Chen',
    role: 'Busy Professional',
    text: 'JP Plates has saved my weeknights. The delivery is prompt, and the food arrives hot and ready to eat. The Risotto is a must-try.',
    avatar: 'https://picsum.photos/id/91/100/100'
  },
  {
    id: 't3',
    name: 'Elena Rodriguez',
    role: 'Nutritionist',
    text: 'I appreciate the transparency in ingredients and calories. It’s rare to find comfort food that fits so well into a balanced diet.',
    avatar: 'https://picsum.photos/id/65/100/100'
  }
];

export const PLATE_BUNDLES: PlateBundle[] = [
  {
    id: 'bundle-1',
    title: '1 Plate',
    subtitle: 'Perfect solo meal. Comfort food, just for you.',
    iconCount: 1,
    type: 'plate',
    price: 15,
    calories: 500
  },
  {
    id: 'bundle-2',
    title: '2 Plates',
    subtitle: 'Date night or double down. Either way, you win.',
    iconCount: 2,
    type: 'plate',
    price: 28,
    calories: 1000
  },
  {
    id: 'bundle-3',
    title: '3 Plates',
    subtitle: 'Squad goals. Three homemade plates coming hot.',
    iconCount: 3,
    type: 'plate',
    price: 40,
    calories: 1500
  },
  {
    id: 'bundle-family',
    title: 'Family Pack',
    subtitle: 'Feed the whole crew. Because sharing is caring.',
    iconCount: 1,
    type: 'family',
    price: 55,
    calories: 2500
  }
];