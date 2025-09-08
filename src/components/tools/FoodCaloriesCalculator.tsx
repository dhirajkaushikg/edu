import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Apple, Search, Plus, Trash2 } from 'lucide-react';

interface FoodItem {
  name: string;
  calories: number;
  quantity: number;
}

const FoodCaloriesCalculator = () => {
  const seo = {
    title: 'Free Food Calories Calculator Online | Health Tool | Edurance Hub',
    description: 'Free online Food Calories Calculator. Track your daily calorie intake by adding foods. Quick, accurate, and easy to use. No signup required. Part of Edurance Hub health tools.',
    keywords: 'food calories calculator, free calorie calculator, health tool, nutrition calculator, daily calories, edurance hub',
    url: 'https://edurancehub.netlify.app/tools/food-calories',
    image: 'https://edurancehub.netlify.app/logo.png'
  };
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState('');
  const [quantity, setQuantity] = useState('1');

  const foodDatabase = [
    { name: 'Apple (1 medium)', calories: 95 },
    { name: 'Banana (1 medium)', calories: 105 },
    { name: 'Rice (1 cup cooked)', calories: 205 },
    { name: 'Chicken Breast (100g)', calories: 165 },
    { name: 'Bread (1 slice)', calories: 80 },
    { name: 'Egg (1 large)', calories: 70 },
    { name: 'Milk (1 cup)', calories: 150 },
    { name: 'Potato (1 medium)', calories: 160 },
    { name: 'Pasta (1 cup cooked)', calories: 220 },
    { name: 'Salmon (100g)', calories: 208 },
    { name: 'Yogurt (1 cup)', calories: 150 },
    { name: 'Oats (1 cup cooked)', calories: 150 },
    { name: 'Almonds (28g)', calories: 160 },
    { name: 'Avocado (1 medium)', calories: 320 },
    { name: 'Orange (1 medium)', calories: 60 },
  ];

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addFoodItem = () => {
    if (!selectedFood || !quantity) return;

    const food = foodDatabase.find(f => f.name === selectedFood);
    if (!food) return;

    const newItem: FoodItem = {
      name: food.name,
      calories: food.calories * parseFloat(quantity),
      quantity: parseFloat(quantity)
    };

    setFoodItems([...foodItems, newItem]);
    setSelectedFood('');
    setQuantity('1');
    setSearchTerm('');
  };

  const removeFoodItem = (index: number) => {
    setFoodItems(foodItems.filter((_, i) => i !== index));
  };

  const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0);
  
  // Determine background color based on total calories
  const getCaloriesBgColor = (calories: number) => {
    if (calories >= 2500) {
      return "from-red-600/20 to-red-800/20 border-red-500/30"; // Red for high calories
    } else if (calories >= 2000) {
      return "from-orange-600/20 to-orange-800/20 border-orange-500/30"; // Orange for elevated calories
    } else if (calories >= 1500) {
      return "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow for moderate calories
    } else {
      return "from-green-600/20 to-green-800/20 border-green-500/30"; // Green for low calories
    }
  };

  return (
  <>
    {/* SEO Helmet Block */}
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content="Edurance Hub" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content="Edurance Hub" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <link rel="canonical" href={seo.url} />
    </Helmet>
    {/* JSON-LD Structured Data */}
    <script type="application/ld+json">{JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Food Calories Calculator",
      "description": seo.description,
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "url": seo.url,
      "image": seo.image,
      "author": {"@type": "Organization", "name": "Edurance Hub"}
    })}</script>
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Apple size={48} className="mx-auto text-green-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Food Calories Calculator</h2>
        <p className="text-purple-200">Track your daily calorie intake by adding foods</p>
      </div>

      <div className="space-y-6">
        {/* Food Search and Add */}
        <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20 space-y-4">
          <h3 className="text-xl font-semibold text-white">Add Food Item</h3>
          
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Search size={16} />
              Search Food
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="Search for food items..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Select Food</label>
              <select
                value={selectedFood}
                onChange={(e) => setSelectedFood(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              >
                <option value="" className="bg-gray-800">Choose a food item</option>
                {filteredFoods.map((food, index) => (
                  <option key={index} value={food.name} className="bg-gray-800">
                    {food.name} - {food.calories} cal
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="1"
                min="0.1"
                step="0.1"
              />
            </div>
          </div>

          <button
            onClick={addFoodItem}
            disabled={!selectedFood || !quantity}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-purple-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
            Add Food Item
          </button>
        </div>

        {/* Food List */}
        {foodItems.length > 0 && (
          <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Your Food Items</h3>
            <div className="space-y-3">
              {foodItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <span className="text-white font-medium">{item.name}</span>
                    <span className="text-purple-300 text-sm ml-2">x{item.quantity}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 font-semibold">{Math.round(item.calories)} cal</span>
                    <button
                      onClick={() => removeFoodItem(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total Calories */}
        {foodItems.length > 0 && (
          <div className={`bg-gradient-to-r ${getCaloriesBgColor(totalCalories)} rounded-2xl p-6 border text-center`}>
            <h3 className="text-2xl font-bold text-white mb-2">Total Calories</h3>
            <div className="text-4xl font-bold text-green-400">{Math.round(totalCalories)} cal</div>
            <p className="text-purple-200 text-sm mt-2">
              {foodItems.length} food item{foodItems.length !== 1 ? 's' : ''} added
            </p>
          </div>
        )}
      </div>
    </div>
  </>
  );
};

export default FoodCaloriesCalculator;