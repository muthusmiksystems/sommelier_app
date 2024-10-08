const ItemMock = [
    {
      "id": 1,
      "dishName": "Butter Chicken",
      "price": 15.50,
      "currency": "USD",
      "description": "Tender chicken cooked in a rich and creamy tomato-based curry.",
      "isVegetarian": false
    },
    {
      "id": 2,
      "dishName": "Paneer Tikka",
      "price": 12.75,
      "currency": "USD",
      "description": "Marinated and grilled chunks of paneer (cottage cheese) served with mint chutney.",
      "isVegetarian": true
    },
    {
      "id": 3,
      "dishName": "Dal Makhani",
      "price": 10.90,
      "currency": "USD",
      "description": "Creamy black lentils slow-cooked with tomatoes, ginger, and garlic.",
      "isVegetarian": true
    },
    {
      "id": 4,
      "dishName": "Aloo Gobi",
      "price": 11.20,
      "currency": "USD",
      "description": "A classic vegetarian dish with potatoes and cauliflower cooked with Indian spices.",
      "isVegetarian": true
    },
    {
      "id": 5,
      "dishName": "Rogan Josh",
      "price": 14.25,
      "currency": "USD",
      "description": "Flavorful lamb curry cooked with aromatic spices and herbs.",
      "isVegetarian": false
    },
    {
      "id": 6,
      "dishName": "Chole Bhature",
      "price": 13.80,
      "currency": "USD",
      "description": "Chickpea curry served with deep-fried bread (bhature), a popular street food.",
      "isVegetarian": true
    },
    {
      "id": 7,
      "dishName": "Tandoori Chicken",
      "price": 16.50,
      "currency": "USD",
      "description": "Chicken marinated in yogurt and spices, then grilled in a tandoor (clay oven).",
      "isVegetarian": false
    },
    {
      "id": 8,
      "dishName": "Vegetable Biryani",
      "price": 12.90,
      "currency": "USD",
      "description": "A fragrant rice dish with mixed vegetables and aromatic spices.",
      "isVegetarian": true
    },
    {
      "id": 9,
      "dishName": "Palak Paneer",
      "price": 13.40,
      "currency": "USD",
      "description": "Cottage cheese (paneer) cubes cooked in a creamy spinach (palak) gravy.",
      "isVegetarian": true
    },
    {
      "id": 10,
      "dishName": "Gulab Jamun",
      "price": 8.95,
      "currency": "USD",
      "description": "Sweet milk-solid dumplings soaked in sugar syrup, a popular dessert.",
      "isVegetarian": true
    }
  ];
  const ItemMockCategories=
   {
    Chinese: [
      {
        id: 1,
        dishName: 'Kung Pao Chicken',
        price: 12.50,
        currency: 'USD',
        description: 'Spicy chicken stir-fried with peanuts and vegetables.',
        isVegetarian: false,
        isRecommended:0,
        isPopular:1,
        isNew:1
      },
      {
        id: 2,
        dishName: 'Spring Rolls',
        price: 9.75,
        currency: 'USD',
        description: 'Crispy rolls filled with vegetables and sometimes meat.',
        isVegetarian: true,
        isRecommended:1,
        isPopular:1,
        isNew:0
      },
    ],
    Italian: [
      {
        id: 3,
        dishName: 'Margherita Pizza',
        price: 14.99,
        currency: 'USD',
        description: 'Classic pizza with tomato, mozzarella, and basil.',
        isVegetarian: true,
        isRecommended:0,
        isPopular:0,
        isNew:1
      },
      {
        id: 4,
        dishName: 'Spaghetti Bolognese',
        price: 11.25,
        currency: 'USD',
        description: 'Pasta with a rich meat and tomato sauce.',
        isVegetarian: false,
        isRecommended:1,
        isPopular:0,
        isNew:0
      },
    ],
    Indian: [
      {
        id: 5,
        dishName: 'Chicken Tikka Masala',
        price: 15.50,
        currency: 'USD',
        description: 'Grilled chicken in a creamy tomato-based curry.',
        isVegetarian: false,
        isRecommended:1,
        isPopular:0,
        isNew:0
      },
      {
        id: 6,
        dishName: 'Paneer Butter Masala',
        price: 13.75,
        currency: 'USD',
        description: 'Paneer cubes in a rich and creamy tomato-based curry.',
        isVegetarian: true,
        isRecommended:1,
        isPopular:0,
        isNew:0
      },
    ],
    Japanese: [
      {
        id: 7,
        dishName: 'Sushi Combo',
        price: 18.99,
        currency: 'USD',
        description: 'Assorted sushi rolls with soy sauce and wasabi.',
        isVegetarian: false,
        isRecommended:1,
        isPopular:0,
        isNew:0
      },
      {
        id: 8,
        dishName: 'Miso Soup',
        price: 7.50,
        currency: 'USD',
        description: 'Traditional Japanese soup with tofu and seaweed.',
        isVegetarian: true,
        isRecommended:0,
        isPopular:1,
        isNew:0
      },
    ],
    Mexican: [
      {
        id: 9,
        dishName: 'Tacos al Pastor',
        price: 10.80,
        currency: 'USD',
        description: 'Marinated and grilled pork tacos with pineapple.',
        isVegetarian: false,
        isRecommended:1,
        isPopular:0,
        isNew:0
      },
      {
        id: 10,
        dishName: 'Guacamole',
        price: 8.50,
        currency: 'USD',
        description: 'Avocado-based dip with tomatoes, onions, and lime.',
        isVegetarian: true,
        isRecommended:0,
        isPopular:0,
        isNew:0
      },
    ],
  };
  
  export{ ItemMock,ItemMockCategories};
  