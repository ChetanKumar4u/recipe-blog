const recipes = [
  {
    id: 1,
    title: "Molecular Tomato Spheres with Basil Foam",
    description: "Experience tomato like never before with these molecular gastronomy-inspired spheres that burst with concentrated flavor, topped with a light basil foam.",
    image: "https://images.unsplash.com/photo-1560717845-968823efbee1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    prepTime: 45,
    cookTime: 15,
    servings: 4,
    difficulty: "Advanced",
    featured: true,
    tags: ["molecular", "appetizer", "vegetarian", "gourmet"],
    author: {
      name: "Chef Nova",
      avatar: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    ingredients: [
      { name: "Ripe tomatoes", amount: "6", unit: "large" },
      { name: "Agar-agar", amount: "2", unit: "g" },
      { name: "Fresh basil", amount: "1", unit: "bunch" },
      { name: "Soy lecithin", amount: "4", unit: "g" },
      { name: "Extra virgin olive oil", amount: "2", unit: "tbsp" },
      { name: "Sea salt", amount: "1", unit: "tsp" },
      { name: "Black pepper", amount: "1/2", unit: "tsp" }
    ],
    instructions: [
      "Blanch tomatoes in boiling water for 30 seconds, then transfer to ice water. Peel and deseed.",
      "Blend tomatoes until smooth, then strain through a fine sieve.",
      "Heat 200ml of tomato juice to 80°C and dissolve agar-agar. Allow to cool slightly.",
      "Fill a bowl with cold vegetable oil. Drop small amounts of the tomato mixture into the oil to form spheres.",
      "Blend fresh basil with water and soy lecithin until foamy.",
      "Plate the tomato spheres and top with basil foam. Drizzle with olive oil and season with salt and pepper."
    ],
    nutrition: {
      calories: 120,
      protein: 2,
      carbs: 10,
      fat: 8
    },
    reviews: [
      {
        id: 101,
        user: {
          name: "Emma Parker",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 5,
        date: "2023-09-15",
        comment: "Absolutely mind-blowing! The burst of tomato flavor was so intense and pure. Takes some practice to get the spherification right, but well worth the effort."
      },
      {
        id: 102,
        user: {
          name: "Michael Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 4,
        date: "2023-08-22",
        comment: "Impressive technique and flavors. I found that using slightly underripe tomatoes gave a better consistency for the spheres. The basil foam was divine!"
      },
      {
        id: 103,
        user: {
          name: "Sophia Rodriguez",
          avatar: "https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 5,
        date: "2023-10-05",
        comment: "This recipe transformed how I think about molecular gastronomy at home. The contrast between the spheres and the light foam creates such an elegant appetizer."
      }
    ]
  },
  {
    id: 2,
    title: "Levitating Matcha Soufflé",
    description: "A gravity-defying matcha soufflé that rises to perfection with a light, airy texture and intense green tea flavor profile.",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    prepTime: 20,
    cookTime: 12,
    servings: 2,
    difficulty: "Intermediate",
    featured: true,
    tags: ["dessert", "japanese", "matcha", "baking"],
    author: {
      name: "Aria Wong",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    ingredients: [
      { name: "Ceremonial grade matcha powder", amount: "2", unit: "tbsp" },
      { name: "Egg whites", amount: "4", unit: "large" },
      { name: "Granulated sugar", amount: "1/4", unit: "cup" },
      { name: "Cream of tartar", amount: "1/4", unit: "tsp" },
      { name: "Unsalted butter", amount: "1", unit: "tbsp" },
      { name: "Powdered sugar", amount: "2", unit: "tbsp" }
    ],
    instructions: [
      "Preheat oven to 375°F (190°C). Butter and sugar two ramekins.",
      "Sift matcha powder into a small bowl and set aside.",
      "Beat egg whites until foamy, then add cream of tartar.",
      "Gradually add sugar while beating until stiff peaks form.",
      "Gently fold in matcha powder, being careful not to deflate the whites.",
      "Fill ramekins to the top and level with a spatula.",
      "Bake for 12 minutes until risen but still slightly jiggly in the center.",
      "Dust with powdered sugar and serve immediately."
    ],
    nutrition: {
      calories: 190,
      protein: 7,
      carbs: 22,
      fat: 9
    },
    reviews: [
      {
        id: 201,
        user: {
          name: "Olivia Kim",
          avatar: "https://images.unsplash.com/photo-1535324492437-d8dea70a38a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 5,
        date: "2023-09-28",
        comment: "The most beautiful soufflé I've ever made! The matcha flavor is prominent but not overwhelming. Mine rose perfectly on the first try!"
      },
      {
        id: 202,
        user: {
          name: "Daniel Weber",
          avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 3,
        date: "2023-10-12",
        comment: "Great flavor but my soufflé collapsed almost immediately. I think the oven temperature might need to be higher for more stability."
      },
      {
        id: 203,
        user: {
          name: "Aiko Tanaka",
          avatar: "https://images.unsplash.com/photo-1551292831-023188e78222?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 5,
        date: "2023-08-05",
        comment: "As someone from Japan, I appreciate how authentic the matcha flavor is in this recipe. A perfect balance of sweetness and the distinctive matcha bitterness."
      },
      {
        id: 204,
        user: {
          name: "Thomas Greene",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 4,
        date: "2023-11-01",
        comment: "Beautiful presentation and taste. I added a bit of vanilla to enhance the flavor profile. Will definitely make again!"
      }
    ]
  },
  {
    id: 3,
    title: "Nebula Glazed Salmon with Activated Charcoal Rice",
    description: "A visually stunning dish featuring salmon glazed with a cosmic purple-blue sauce over jet-black activated charcoal rice, garnished with edible flowers.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    prepTime: 30,
    cookTime: 20,
    servings: 4,
    difficulty: "Intermediate",
    featured: true,
    tags: ["seafood", "dinner", "asian fusion", "gourmet"],
    author: {
      name: "Leo Zhang",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    ingredients: [
      { name: "Salmon fillets", amount: "4", unit: "6 oz each" },
      { name: "Butterfly pea flower tea", amount: "2", unit: "tbsp" },
      { name: "Honey", amount: "3", unit: "tbsp" },
      { name: "Soy sauce", amount: "1/4", unit: "cup" },
      { name: "Ginger", amount: "1", unit: "inch" },
      { name: "Garlic", amount: "3", unit: "cloves" },
      { name: "Jasmine rice", amount: "2", unit: "cups" },
      { name: "Activated charcoal powder", amount: "1", unit: "tsp" },
      { name: "Edible flowers", amount: "1", unit: "small pack" }
    ],
    instructions: [
      "Brew butterfly pea flower tea in 1/2 cup hot water for 5 minutes, then strain.",
      "Mix tea with honey, soy sauce, grated ginger, and minced garlic to create the glaze.",
      "Marinate salmon in half the glaze for 30 minutes.",
      "Cook jasmine rice according to package instructions, adding activated charcoal powder to the water.",
      "Sear salmon skin-side down for 4 minutes, flip, and brush with remaining glaze.",
      "Cook for additional 3-4 minutes until salmon is cooked through but still moist.",
      "Serve salmon over black rice, drizzle with extra glaze, and garnish with edible flowers."
    ],
    nutrition: {
      calories: 420,
      protein: 32,
      carbs: 38,
      fat: 18
    },
    reviews: [
      {
        id: 301,
        user: {
          name: "Samantha Lee",
          avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 5,
        date: "2023-10-18",
        comment: "This dish is a showstopper! The purple-blue glaze against the black rice created the most Instagram-worthy dinner I've ever made. The flavors were incredible too."
      },
      {
        id: 302,
        user: {
          name: "Ryan Thompson",
          avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 4,
        date: "2023-09-05",
        comment: "Tasted as good as it looked. Had trouble finding butterfly pea flower tea but ordered online. Worth the wait!"
      },
      {
        id: 303,
        user: {
          name: "Jessica Martinez",
          avatar: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 5,
        date: "2023-11-15",
        comment: "Made this for a dinner party and my guests were blown away. The charcoal rice has a subtle earthiness that pairs beautifully with the glazed salmon."
      }
    ]
  },
  {
    id: 4,
    title: "Holographic Crystal Dessert",
    description: "A transparent dessert that captures light like a prism, made with agar-agar and natural fruit essences for a mind-bending culinary experience.",
    image: "https://images.unsplash.com/photo-1493925410384-84f842e616fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    prepTime: 40,
    cookTime: 5,
    servings: 6,
    difficulty: "Advanced",
    featured: false,
    tags: ["dessert", "molecular", "vegan", "showstopper"],
    author: {
      name: "Mira Patel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    ingredients: [
      { name: "Filtered water", amount: "4", unit: "cups" },
      { name: "Agar-agar powder", amount: "4", unit: "tbsp" },
      { name: "Sugar", amount: "1/3", unit: "cup" },
      { name: "Lychee extract", amount: "1", unit: "tsp" },
      { name: "Rosewater", amount: "1", unit: "tsp" },
      { name: "Elderflower cordial", amount: "2", unit: "tbsp" },
      { name: "Edible silver dust", amount: "1/4", unit: "tsp" }
    ],
    instructions: [
      "In a saucepan, combine water, agar-agar, and sugar. Bring to a boil while stirring.",
      "Simmer for 2 minutes until completely dissolved, then remove from heat.",
      "Divide mixture into three parts and flavor each differently: lychee, rosewater, and elderflower.",
      "Pour thin layers into a clear glass dish, allowing each layer to set slightly before adding the next.",
      "Refrigerate for at least 4 hours or overnight until completely set.",
      "Cut into geometric shapes using a hot knife.",
      "Just before serving, dust lightly with edible silver for a holographic effect."
    ],
    nutrition: {
      calories: 65,
      protein: 0,
      carbs: 16,
      fat: 0
    },
    reviews: [
      {
        id: 401,
        user: {
          name: "Harper Wilson",
          avatar: "https://images.unsplash.com/photo-1485290334039-a3c69043e517?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 5,
        date: "2023-08-30",
        comment: "This dessert is truly magical! The geometric shapes catch the light in such a beautiful way. The elderflower layer was my favorite - subtle and sophisticated."
      },
      {
        id: 402,
        user: {
          name: "Liam Jackson",
          avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 3,
        date: "2023-10-07",
        comment: "Gorgeous presentation but I found the texture a bit too firm. Maybe less agar-agar next time? The flavors were interesting though."
      },
      {
        id: 403,
        user: {
          name: "Zoe Clark",
          avatar: "https://images.unsplash.com/photo-1541787457429-b1766a4766b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 5,
        date: "2023-09-11",
        comment: "Made this for my daughter's science-themed birthday party. The kids were amazed and called it 'magic jello'. It was the star of the show!"
      },
      {
        id: 404,
        user: {
          name: "Benjamin Taylor",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 4,
        date: "2023-11-20",
        comment: "I experimented by adding a touch of butterfly pea flower tea to one layer for a blue color that changed to purple with a drop of lemon juice. Truly interactive dessert!"
      }
    ]
  },
  {
    id: 5,
    title: "Sous Vide Wagyu with Truffle Foam",
    description: "Perfectly cooked Wagyu beef using the sous vide method, paired with an airy truffle foam and geometric vegetable garnishes.",
    image: "https://images.unsplash.com/photo-1448043552756-e747b7a2b2b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    prepTime: 15,
    cookTime: 120,
    servings: 2,
    difficulty: "Intermediate",
    featured: false,
    tags: ["beef", "sous vide", "gourmet", "dinner"],
    author: {
      name: "Julian Clarke",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    ingredients: [
      { name: "Wagyu beef ribeye", amount: "1", unit: "lb" },
      { name: "Heavy cream", amount: "1", unit: "cup" },
      { name: "Truffle oil", amount: "1", unit: "tbsp" },
      { name: "Black truffle, fresh", amount: "1", unit: "small" },
      { name: "Soy lecithin", amount: "2", unit: "g" },
      { name: "Salt", amount: "1", unit: "tsp" },
      { name: "Black pepper", amount: "1", unit: "tsp" },
      { name: "Carrots", amount: "2", unit: "medium" },
      { name: "Asparagus", amount: "6", unit: "spears" }
    ],
    instructions: [
      "Season Wagyu with salt and pepper, then vacuum seal.",
      "Sous vide at 129°F (54°C) for 2 hours.",
      "Warm cream with truffle oil and shaved truffle. Add soy lecithin.",
      "Use an immersion blender to create foam from the truffle cream mixture.",
      "Cut vegetables into precise geometric shapes and blanch until tender-crisp.",
      "Remove beef from bag and sear quickly on all sides in a very hot cast iron pan.",
      "Rest meat for 5 minutes, then slice thinly.",
      "Plate with vegetable geometrics and spoon truffle foam alongside."
    ],
    nutrition: {
      calories: 680,
      protein: 42,
      carbs: 8,
      fat: 54
    },
    reviews: [
      {
        id: 501,
        user: {
          name: "Alexander Hughes",
          avatar: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 5,
        date: "2023-11-05",
        comment: "This recipe completely changed how I cook Wagyu. The sous vide method ensures perfect temperature control, and that truffle foam is to die for!"
      },
      {
        id: 502,
        user: {
          name: "Isabella Moreno",
          avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 5,
        date: "2023-09-19",
        comment: "Worth every penny spent on the Wagyu and truffle. A restaurant-quality dish that impressed my partner on our anniversary. The geometric vegetables add such an artistic touch."
      },
      {
        id: 503,
        user: {
          name: "Nathan Kim",
          avatar: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 4,
        date: "2023-10-22",
        comment: "Excellent recipe though I substituted fresh truffle with truffle paste and it was still incredible. The searing technique is spot on for a perfect crust."
      },
      {
        id: 504,
        user: {
          name: "Charlotte Davies",
          avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        rating: 5,
        date: "2023-08-14",
        comment: "I've never experienced such buttery, tender beef. The truffle foam seems complicated but is actually quite straightforward to make. A special occasion dish that's well worth the effort."
      }
    ]
  }
];

export default recipes;