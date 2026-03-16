const products = [
  // Fruits
  { id: '1', name: 'Fresh Apples', price: 2.99, category: 'Fruits', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?auto=format&fit=crop&w=600&q=80', description: 'Crisp and sweet organic apples.' },
  { id: '2', name: 'Bananas', price: 1.49, category: 'Fruits', image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80', description: 'Ripe yellow bananas full of potassium.' },
  { id: '3', name: 'Organic Strawberries', price: 4.99, category: 'Fruits', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80', description: 'Freshly picked red strawberries.' },
  { id: '4', name: 'Watermelon', price: 6.99, category: 'Fruits', image: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&w=600&q=80', description: 'Whole seedless watermelon, sweet and juicy.' },
  
  // Vegetables
  { id: '5', name: 'Avocado', price: 1.99, category: 'Vegetables', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80', description: 'Perfectly ripe Haas avocado.' },
  { id: '6', name: 'Tomato', price: 0.99, category: 'Vegetables', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80', description: 'Fresh, juicy vine-ripened tomatoes.' },
  { id: '7', name: 'Organic Carrots', price: 2.49, category: 'Vegetables', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80', description: 'Crunchy sweet carrots straight from the earth.' },
  { id: '8', name: 'Broccoli', price: 1.89, category: 'Vegetables', image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80', description: 'Fresh green broccoli crowns.' },
  { id: '9', name: 'Spinach', price: 3.49, category: 'Vegetables', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80', description: 'Bag of fresh, washed baby spinach.' },

  // Dairy & Eggs
  { id: '10', name: 'Whole Milk', price: 3.49, category: 'Dairy', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80', description: 'Fresh whole milk, locally sourced.' },
  { id: '11', name: 'Eggs (1 Dozen)', price: 4.29, category: 'Dairy', image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80', description: 'Farm fresh brown eggs.' },
  { id: '12', name: 'Cheddar Cheese', price: 5.49, category: 'Dairy', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80', description: 'Aged sharp cheddar cheese block.' },
  { id: '13', name: 'Greek Yogurt', price: 1.29, category: 'Dairy', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80', description: 'Plain, thick Greek yogurt cup.' },

  // Bakery
  { id: '14', name: 'Sourdough Bread', price: 4.99, category: 'Bakery', image: 'https://images.unsplash.com/photo-1589367920969-ab8e050eb046?auto=format&fit=crop&w=600&q=80', description: 'Artisan sourdough bread baked fresh daily.' },
  { id: '15', name: 'Croissants', price: 3.99, category: 'Bakery', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', description: 'Flaky, buttery French croissants (Pack of 2).' },
  { id: '16', name: 'Blueberry Muffins', price: 5.99, category: 'Bakery', image: 'https://images.unsplash.com/photo-1525124568695-c4c6cd3a8842?auto=format&fit=crop&w=600&q=80', description: 'Four large fluffy blueberry muffins.' },

  // Meat & Seafood
  { id: '17', name: 'Chicken Breast', price: 7.99, category: 'Meat', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80', description: 'Boneless, skinless chicken breasts (1 lb).' },
  { id: '18', name: 'Ground Beef', price: 6.49, category: 'Meat', image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=600&q=80', description: '80% lean ground beef (1 lb).' },
  { id: '19', name: 'Salmon Fillet', price: 12.99, category: 'Seafood', image: 'https://images.unsplash.com/photo-1599084942896-675e73122f87?auto=format&fit=crop&w=600&q=80', description: 'Fresh wild-caught salmon fillet (8 oz).' },

  // Pantry
  { id: '20', name: 'Olive Oil', price: 9.99, category: 'Pantry', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80', description: 'Extra virgin olive oil (500ml).' },
  { id: '21', name: 'Pasta', price: 1.99, category: 'Pantry', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80', description: 'Italian spaghetti pasta (16 oz).' },
  { id: '22', name: 'Tomato Sauce', price: 2.49, category: 'Pantry', image: 'https://images.unsplash.com/photo-1505253716362-af10098df241?auto=format&fit=crop&w=600&q=80', description: 'Classic marinara tomato sauce jar.' },
  { id: '23', name: 'Coffee Beans', price: 14.99, category: 'Pantry', image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=600&q=80', description: 'Premium whole bean arabica coffee.' },
  
  // Beverages
  { id: '24', name: 'Orange Juice', price: 4.49, category: 'Beverages', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80', description: '100% freshly squeezed orange juice.' },
  { id: '25', name: 'Sparkling Water', price: 5.99, category: 'Beverages', image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80', description: 'Pack of 8 sparkling water cans.' }
];

module.exports = products;
