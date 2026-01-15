// Menu Routes - serve drink menu

const express = require('express');
const router = express.Router();

// Menu data - all prices are $0.00
const menu = {
  categories: {
    coffee: {
      name: 'Premium Coffee',
      emoji: '☕',
      drinks: [
        {
          id: 'espresso',
          name: 'Espresso',
          description: 'Bold and intense single shot',
          price: 0.00,
          image: '☕'
        },
        {
          id: 'americano',
          name: 'Americano',
          description: 'Espresso with hot water',
          price: 0.00,
          image: '☕'
        },
        {
          id: 'cappuccino',
          name: 'Cappuccino',
          description: 'Espresso with steamed milk and foam',
          price: 0.00,
          image: '☕'
        },
        {
          id: 'latte',
          name: 'Latte',
          description: 'Smooth espresso with silky milk',
          price: 0.00,
          image: '☕'
        },
        {
          id: 'macchiato',
          name: 'Macchiato',
          description: 'Espresso marked with foam',
          price: 0.00,
          image: '☕'
        },
        {
          id: 'cortado',
          name: 'Cortado',
          description: 'Equal parts espresso and milk',
          price: 0.00,
          image: '☕'
        },
        {
          id: 'mocha',
          name: 'Mocha',
          description: 'Espresso with chocolate and milk',
          price: 0.00,
          image: '☕'
        },
        {
          id: 'flatwhite',
          name: 'Flat White',
          description: 'Creamy espresso with microfoam',
          price: 0.00,
          image: '☕'
        }
      ]
    },
    tea: {
      name: 'Premium Tea',
      emoji: '🍵',
      drinks: [
        {
          id: 'black_tea',
          name: 'Black Tea',
          description: 'Classic English black tea blend',
          price: 0.00,
          image: '🍵'
        },
        {
          id: 'green_tea',
          name: 'Green Tea',
          description: 'Fresh and light green tea',
          price: 0.00,
          image: '🍵'
        },
        {
          id: 'chamomile',
          name: 'Chamomile',
          description: 'Calming herbal chamomile tea',
          price: 0.00,
          image: '🍵'
        },
        {
          id: 'peppermint',
          name: 'Peppermint Tea',
          description: 'Refreshing peppermint blend',
          price: 0.00,
          image: '🍵'
        },
        {
          id: 'oolong',
          name: 'Oolong Tea',
          description: 'Traditional Chinese oolong',
          price: 0.00,
          image: '🍵'
        },
        {
          id: 'matcha',
          name: 'Matcha Latte',
          description: 'Vibrant ceremonial matcha',
          price: 0.00,
          image: '🍵'
        }
      ]
    },
    softdrinks: {
      name: 'Soft Drinks',
      emoji: '🥤',
      drinks: [
        {
          id: 'espresso_tonic',
          name: 'Espresso Tonic',
          description: 'Chilled espresso with tonic water',
          price: 0.00,
          image: '🥤'
        },
        {
          id: 'cold_brew',
          name: 'Cold Brew Coffee',
          description: 'Smooth cold brew concentrate',
          price: 0.00,
          image: '🥤'
        },
        {
          id: 'iced_latte',
          name: 'Iced Latte',
          description: 'Chilled latte with ice',
          price: 0.00,
          image: '🥤'
        },
        {
          id: 'iced_matcha',
          name: 'Iced Matcha Latte',
          description: 'Chilled matcha with milk',
          price: 0.00,
          image: '🥤'
        },
        {
          id: 'sparkling_water',
          name: 'Sparkling Water',
          description: 'Premium sparkling mineral water',
          price: 0.00,
          image: '🥤'
        },
        {
          id: 'fresh_juice',
          name: 'Fresh Juice',
          description: 'Freshly squeezed orange juice',
          price: 0.00,
          image: '🥤'
        }
      ]
    }
  }
};

/**
 * GET /menu
 * Get full menu with all categories
 */
router.get('/', (req, res) => {
  try {
    res.json({
      message: 'OfficeBar Menu',
      menu: menu.categories
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

/**
 * GET /menu/category/:category
 * Get drinks by category
 */
router.get('/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const categoryData = menu.categories[category];

    if (!categoryData) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({
      category: category,
      categoryName: categoryData.name,
      drinks: categoryData.drinks
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

/**
 * GET /menu/drink/:drinkId
 * Get specific drink details
 */
router.get('/drink/:drinkId', (req, res) => {
  try {
    const { drinkId } = req.params;

    for (const category in menu.categories) {
      const drinks = menu.categories[category].drinks;
      const drink = drinks.find(d => d.id === drinkId);

      if (drink) {
        return res.json({
          drink: drink,
          category: category
        });
      }
    }

    res.status(404).json({ error: 'Drink not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch drink' });
  }
});

module.exports = router;
