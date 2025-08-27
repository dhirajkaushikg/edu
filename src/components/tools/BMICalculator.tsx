import React, { useState } from 'react';
import { Calculator, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric'); // metric or imperial
  const [bmi, setBMI] = useState<{value: number, bgColor: string} | null>(null);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500', icon: TrendingDown };
    if (bmi < 25) return { category: 'Normal weight', color: 'text-green-600', icon: Minus };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-500', icon: TrendingUp };
    return { category: 'Obese', color: 'text-red-500', icon: TrendingUp };
  };

  const calculateBMI = () => {
    if (!height || !weight) return;

    let heightInMeters: number;
    let weightInKg: number;

    if (unit === 'metric') {
      heightInMeters = parseFloat(height) / 100; // cm to m
      weightInKg = parseFloat(weight);
    } else {
      heightInMeters = parseFloat(height) * 0.3048; // feet to m
      weightInKg = parseFloat(weight) * 0.453592; // lbs to kg
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmiValue * 10) / 10;
    
    // Determine background color based on BMI category
    let bgColor = "from-gray-600/20 to-gray-800/20 border-gray-500/30"; // Default gray
    if (roundedBMI < 18.5) {
      bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30"; // Blue for underweight
    } else if (roundedBMI < 25) {
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30"; // Green for normal weight
    } else if (roundedBMI < 30) {
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow for overweight
    } else {
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30"; // Red for obese
    }

    setBMI({value: roundedBMI, bgColor});
  };

  const bmiRanges = [
    { range: '< 18.5', category: 'Underweight', color: 'bg-blue-500' },
    { range: '18.5 - 24.9', category: 'Normal', color: 'bg-green-600' },
    { range: '25.0 - 29.9', category: 'Overweight', color: 'bg-yellow-500' },
    { range: '≥ 30.0', category: 'Obese', color: 'bg-red-500' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Calculator size={48} className="mx-auto text-blue-500 mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">BMI Calculator</h2>
        <p className="text-gray-700">
          Calculate your Body Mass Index to assess if you're at a healthy weight
        </p>
      </div>

      <div className="space-y-6">
        {/* Unit Selection */}
        <div className="flex justify-center">
          <div className="flex bg-white/85 rounded-xl p-1 border border-purple-900/20 shadow-lg shadow-purple-900/10">
            <button
              onClick={() => setUnit('metric')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                unit === 'metric'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-purple-700 hover:text-purple-900'
              }`}
            >
              Metric
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                unit === 'imperial'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-purple-700 hover:text-purple-900'
              }`}
            >
              Imperial
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Height ({unit === 'metric' ? 'cm' : 'feet'})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 bg-white/85 border border-purple-900/30 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-700 focus:bg-white/95 transition-all duration-300 shadow-lg shadow-purple-900/5"
              placeholder={unit === 'metric' ? '170' : '5.7'}
              step={unit === 'metric' ? '1' : '0.1'}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-3 bg-white/85 border border-purple-900/30 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-700 focus:bg-white/95 transition-all duration-300 shadow-lg shadow-purple-900/5"
              placeholder={unit === 'metric' ? '70' : '154'}
              step={unit === 'metric' ? '0.1' : '0.1'}
            />
          </div>
        </div>

        <button
          onClick={calculateBMI}
          disabled={!height || !weight}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate BMI
        </button>

        {/* Results */}
        {bmi && (
          <div className={`bg-gradient-to-r ${bmi.bgColor} rounded-2xl p-6 border shadow-lg`}>
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your BMI Result</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">{bmi.value}</div>
              <div className="flex items-center justify-center gap-2">
                {(() => {
                  const category = getBMICategory(bmi.value);
                  const CategoryIcon = category.icon;
                  return (
                    <>
                      <CategoryIcon size={20} className={category.color} />
                      <span className={`font-semibold ${category.color}`}>
                        {category.category}
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* BMI Scale */}
        <div className="bg-white/85 rounded-2xl p-6 border border-purple-900/20 shadow-lg shadow-purple-900/10">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">BMI Categories</h3>
          <div className="space-y-3">
            {bmiRanges.map((range, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-purple-900/10">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${range.color}`} />
                  <span className="text-gray-900 font-medium">{range.category}</span>
                </div>
                <span className="text-gray-700">{range.range}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <p className="text-yellow-700 text-sm">
              <strong>Note:</strong> BMI is a screening tool and doesn't directly measure body fat. 
              Consult with a healthcare provider for a complete health assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;