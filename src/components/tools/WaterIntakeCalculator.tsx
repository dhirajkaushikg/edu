import React, { useState } from 'react';
import { Droplets, Activity, Thermometer, User } from 'lucide-react';
// Removed Helmet import since SEO is handled by ToolDetail component

const WaterIntakeCalculator = () => {
  const seo = {
    title: 'Free Water Intake Calculator Online | Health Tool | Edurance Hub',
    description: 'Free online Water Intake Calculator. Calculate your daily water needs based on weight, age, activity, and climate. Quick, accurate, and easy to use. No signup required. Part of Edurance Hub health tools.',
    keywords: 'water intake calculator, free water calculator, health tool, hydration calculator, daily water needs, edurance hub',
    url: 'https://edurancehub.netlify.app/tools/water-intake',
    image: 'https://edurancehub.netlify.app/logo.png'
  };
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [climate, setClimate] = useState('normal');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [result, setResult] = useState<{ml: number, bgColor: string} | null>(null);

  const calculateWaterIntake = () => {
    if (!weight || !age) return;

    let baseIntake = parseFloat(weight) * 35; // Base: 35ml per kg

    // Activity level adjustments
    const activityMultipliers = {
      sedentary: 0.9,
      moderate: 1.0,
      active: 1.2,
      veryActive: 1.4
    };

    // Climate adjustments
    const climateMultipliers = {
      cold: 0.9,
      normal: 1.0,
      hot: 1.2,
      veryHot: 1.3
    };

    // Age adjustments
    const ageNum = parseInt(age);
    let ageMultiplier = 1.0;
    if (ageNum > 65) ageMultiplier = 0.9;
    if (ageNum < 18) ageMultiplier = 1.1;

    // Gender adjustment
    const genderMultiplier = gender === 'female' ? 0.95 : 1.0;

    const totalIntake = baseIntake * 
      activityMultipliers[activityLevel as keyof typeof activityMultipliers] *
      climateMultipliers[climate as keyof typeof climateMultipliers] *
      ageMultiplier *
      genderMultiplier;

    const ml = Math.round(totalIntake);
    
    // Determine background color based on water intake
    let bgColor = "from-gray-600/20 to-gray-800/20 border-gray-500/30"; // Default gray
    if (ml >= 3000) {
      bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30"; // Blue for high intake
    } else if (ml >= 2500) {
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30"; // Green for good intake
    } else if (ml >= 2000) {
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow for moderate intake
    } else {
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30"; // Orange for low intake
    }

    setResult({ml, bgColor});
  };

  return (
    <>
      {/* SEO Helmet Block and JSON-LD Structured Data can be handled by parent or ToolDetail component if needed */}
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <Droplets size={48} className="mx-auto text-blue-400 mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Water Intake Calculator</h2>
          <p className="text-purple-200">Calculate your daily water intake needs based on your lifestyle</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
                <User size={16} />
                Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="70"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
                <User size={16} />
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="25"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              >
                <option value="male" className="bg-gray-800">Male</option>
                <option value="female" className="bg-gray-800">Female</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
                <Activity size={16} />
                Activity Level
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              >
                <option value="sedentary" className="bg-gray-800">Sedentary</option>
                <option value="moderate" className="bg-gray-800">Moderate</option>
                <option value="active" className="bg-gray-800">Active</option>
                <option value="veryActive" className="bg-gray-800">Very Active</option>
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Thermometer size={16} />
              Climate
            </label>
            <select
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="cold" className="bg-gray-800">Cold</option>
              <option value="normal" className="bg-gray-800">Normal</option>
              <option value="hot" className="bg-gray-800">Hot</option>
              <option value="veryHot" className="bg-gray-800">Very Hot</option>
            </select>
          </div>

          <button
            onClick={calculateWaterIntake}
            disabled={!weight || !age}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Calculate Water Intake
          </button>

          {result && (
            <div className={`bg-gradient-to-r ${result.bgColor} rounded-2xl p-6 border text-center`}>
              <h3 className="text-2xl font-bold text-white mb-2">Daily Water Intake</h3>
              <div className="text-4xl font-bold text-blue-400 mb-2">{result.ml} ml</div>
              <div className="text-2xl font-bold text-white">{(result.ml / 1000).toFixed(1)} liters</div>
              <p className="text-purple-200 text-sm mt-2">≈ {Math.round(result.ml / 250)} glasses (250ml each)</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WaterIntakeCalculator;