import React, { useState } from 'react';
import { User, Ruler, Calculator } from 'lucide-react';

const BodyFatCalculator = () => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [result, setResult] = useState<{ bodyFat: number; category: string; color: string; bgColor: string } | null>(null);

  const calculateBodyFat = () => {
    if (!age || !weight || !height || !neck || !waist || (gender === 'female' && !hip)) return;

    const heightCm = parseFloat(height);
    const neckCm = parseFloat(neck);
    const waistCm = parseFloat(waist);
    const hipCm = gender === 'female' ? parseFloat(hip) : 0;

    let bodyFatPercentage: number;

    if (gender === 'male') {
      // US Navy formula for men
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    } else {
      // US Navy formula for women
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
    }

    const category = getBodyFatCategory(bodyFatPercentage, gender);
    
    setResult({
      bodyFat: Math.round(bodyFatPercentage * 10) / 10,
      category: category.category,
      color: category.color,
      bgColor: category.bgColor
    });
  };

  const getBodyFatCategory = (bodyFat: number, gender: string) => {
    if (gender === 'male') {
      if (bodyFat < 6) return { category: 'Essential Fat', color: 'text-blue-400', bgColor: 'from-blue-600/20 to-blue-800/20 border-blue-500/30' };
      if (bodyFat < 14) return { category: 'Athletes', color: 'text-green-400', bgColor: 'from-green-600/20 to-green-800/20 border-green-500/30' };
      if (bodyFat < 18) return { category: 'Fitness', color: 'text-green-400', bgColor: 'from-green-600/20 to-green-800/20 border-green-500/30' };
      if (bodyFat < 25) return { category: 'Average', color: 'text-yellow-400', bgColor: 'from-yellow-600/20 to-yellow-800/20 border-yellow-500/30' };
      return { category: 'Obese', color: 'text-red-400', bgColor: 'from-red-600/20 to-red-800/20 border-red-500/30' };
    } else {
      if (bodyFat < 14) return { category: 'Essential Fat', color: 'text-blue-400', bgColor: 'from-blue-600/20 to-blue-800/20 border-blue-500/30' };
      if (bodyFat < 21) return { category: 'Athletes', color: 'text-green-400', bgColor: 'from-green-600/20 to-green-800/20 border-green-500/30' };
      if (bodyFat < 25) return { category: 'Fitness', color: 'text-green-400', bgColor: 'from-green-600/20 to-green-800/20 border-green-500/30' };
      if (bodyFat < 32) return { category: 'Average', color: 'text-yellow-400', bgColor: 'from-yellow-600/20 to-yellow-800/20 border-yellow-500/30' };
      return { category: 'Obese', color: 'text-red-400', bgColor: 'from-red-600/20 to-red-800/20 border-red-500/30' };
    }
  };

  const bodyFatRanges = {
    male: [
      { range: '2-5%', category: 'Essential Fat', color: 'bg-blue-500' },
      { range: '6-13%', category: 'Athletes', color: 'bg-green-500' },
      { range: '14-17%', category: 'Fitness', color: 'bg-green-400' },
      { range: '18-24%', category: 'Average', color: 'bg-yellow-500' },
      { range: '25%+', category: 'Obese', color: 'bg-red-500' },
    ],
    female: [
      { range: '10-13%', category: 'Essential Fat', color: 'bg-blue-500' },
      { range: '14-20%', category: 'Athletes', color: 'bg-green-500' },
      { range: '21-24%', category: 'Fitness', color: 'bg-green-400' },
      { range: '25-31%', category: 'Average', color: 'bg-yellow-500' },
      { range: '32%+', category: 'Obese', color: 'bg-red-500' },
    ]
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Calculator size={48} className="mx-auto text-purple-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Body Fat Calculator</h2>
        <p className="text-purple-200">Calculate your body fat percentage using the US Navy method</p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="flex bg-white/5 rounded-xl p-1 border border-purple-500/20">
            <button
              onClick={() => setGender('male')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                gender === 'male'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                gender === 'female'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Ruler size={16} />
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="175"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Ruler size={16} />
              Neck (cm)
            </label>
            <input
              type="number"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="38"
            />
          </div>
        </div>

        <div className={`grid ${gender === 'female' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Ruler size={16} />
              Waist (cm)
            </label>
            <input
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="85"
            />
          </div>

          {gender === 'female' && (
            <div>
              <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
                <Ruler size={16} />
                Hip (cm)
              </label>
              <input
                type="number"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="95"
              />
            </div>
          )}
        </div>

        <button
          onClick={calculateBodyFat}
          disabled={!age || !weight || !height || !neck || !waist || (gender === 'female' && !hip)}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate Body Fat
        </button>

        {result && (
          <div className={`bg-gradient-to-r ${result.bgColor} rounded-2xl p-6 border text-center`}>
            <h3 className="text-2xl font-bold text-white mb-2">Your Body Fat</h3>
            <div className="text-4xl font-bold text-white mb-2">{result.bodyFat}%</div>
            <div className={`text-xl font-semibold ${result.color}`}>{result.category}</div>
          </div>
        )}

        <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            Body Fat Categories ({gender === 'male' ? 'Men' : 'Women'})
          </h3>
          <div className="space-y-3">
            {bodyFatRanges[gender as keyof typeof bodyFatRanges].map((range, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${range.color}`} />
                  <span className="text-white font-medium">{range.category}</span>
                </div>
                <span className="text-purple-300">{range.range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyFatCalculator;