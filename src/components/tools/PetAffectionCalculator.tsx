import React, { useState } from 'react';
import { Dog, Cat, Heart, Bone, Footprints, Users } from 'lucide-react';

const PetAffectionCalculator = () => {
  const [petData, setPetData] = useState({
    petType: 'dog',
    snacks: '',
    walkTime: '',
    cuddles: ''
  });

  const [result, setResult] = useState<{
    affection: number;
    label: string;
    description: string;
    color: string;
    bgColor: string;
    icon: any;
  } | null>(null);

  const handleChange = (field: string, value: string) => {
    setPetData(prev => ({ ...prev, [field]: value }));
  };

  const calculateAffection = () => {
    // Parse inputs
    const snacks = parseInt(petData.snacks) || 0;
    const walkTime = parseInt(petData.walkTime) || 0;
    const cuddles = parseInt(petData.cuddles) || 0;

    // Calculate base affection score
    let affection = (snacks * 2) + (walkTime * 1.5) + (cuddles * 3);

    // Apply pet type modifiers
    if (petData.petType === 'dog') {
      affection = affection * 1.2; // +20% for dogs (extra loyal)
    } else if (petData.petType === 'cat') {
      affection = affection * 0.8; // -20% for cats (built-in sass mode)
    }

    // Cap affection between 0 and 100
    affection = Math.max(0, Math.min(100, Math.round(affection)));

    // Determine label and description based on affection score
    let label: string;
    let description: string;
    let color: string;
    let bgColor: string;
    let icon: any;

    if (affection >= 80) {
      label = "❤️ Ride or Die – They'd save you in a fire.";
      description = "Your pet loves you unconditionally! They're your most loyal companion and would do anything for you.";
      color = "text-red-400";
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30";
      icon = Heart;
    } else if (affection >= 50) {
      label = "🐾 Snack Dispenser – Love is conditional.";
      description = "Your pet appreciates you, especially when you have treats! Their love might be somewhat transactional, but that's normal.";
      color = "text-yellow-400";
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30";
      icon = Bone;
    } else {
      label = "😼 Barely Tolerated – They're plotting your murder.";
      description = "Your pet tolerates your presence but might be secretly planning your demise. Time to step up your pet parenting game!";
      color = "text-gray-400";
      bgColor = "from-gray-600/20 to-gray-800/20 border-gray-500/30";
      icon = Cat;
    }

    setResult({
      affection,
      label,
      description,
      color,
      bgColor,
      icon
    });
  };

  const resetCalculator = () => {
    setPetData({
      petType: 'dog',
      snacks: '',
      walkTime: '',
      cuddles: ''
    });
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        {petData.petType === 'dog' ? (
          <Dog size={48} className="mx-auto text-blue-400 mb-4" />
        ) : petData.petType === 'cat' ? (
          <Cat size={48} className="mx-auto text-orange-400 mb-4" />
        ) : (
          <Users size={48} className="mx-auto text-purple-400 mb-4" />
        )}
        <h2 className="text-3xl font-bold text-white mb-4">Pet Affection Calculator</h2>
        <p className="text-purple-200">Find out how much your pet actually loves you (spoiler: it's complicated)</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Users size={16} />
              Pet Type
            </label>
            <select
              value={petData.petType}
              onChange={(e) => handleChange('petType', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="dog" className="bg-gray-800">Dog</option>
              <option value="cat" className="bg-gray-800">Cat</option>
              <option value="other" className="bg-gray-800">Other</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Bone size={16} />
              Daily Snacks Given
            </label>
            <input
              type="number"
              min="0"
              value={petData.snacks}
              onChange={(e) => handleChange('snacks', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 3"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Footprints size={16} />
              Walk Time (minutes)
            </label>
            <input
              type="number"
              min="0"
              value={petData.walkTime}
              onChange={(e) => handleChange('walkTime', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 30"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Heart size={16} />
              Number of Cuddles
            </label>
            <input
              type="number"
              min="0"
              value={petData.cuddles}
              onChange={(e) => handleChange('cuddles', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 5"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateAffection}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            Calculate Pet Affection 🐾
          </button>
          
          {(result || petData.snacks) && (
            <button
              onClick={resetCalculator}
              className="px-6 py-3 bg-white/10 text-purple-300 border border-purple-500/30 rounded-xl hover:bg-white/20 hover:text-white transition-all duration-300"
            >
              Reset
            </button>
          )}
        </div>

        {result && (
          <div className="space-y-6">
            <div className={`bg-gradient-to-r ${result.bgColor} rounded-2xl p-8 border text-center`}>
              <result.icon className="mx-auto mb-4" size={48} />
              
              <div className="relative mb-6">
                <div className="text-6xl font-bold text-purple-400 mb-2">
                  {result.affection}%
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${result.affection}%` }}
                  />
                </div>
              </div>
              
              <h4 className={`text-2xl font-bold mb-3 ${result.color}`}>
                {result.label}
              </h4>
              
              <p className="text-purple-200 leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-4">Affection Breakdown</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-purple-200">Snacks Contribution</span>
                  <span className="text-white font-medium">{(parseInt(petData.snacks) || 0) * 2} pts</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-purple-200">Walk Time Contribution</span>
                  <span className="text-white font-medium">{Math.round((parseInt(petData.walkTime) || 0) * 1.5)} pts</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-purple-200">Cuddles Contribution</span>
                  <span className="text-white font-medium">{(parseInt(petData.cuddles) || 0) * 3} pts</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-purple-200">Pet Type Modifier</span>
                  <span className="text-white font-medium">
                    {petData.petType === 'dog' ? '+20%' : petData.petType === 'cat' ? '-20%' : 'None'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg mt-3">
                  <span className="text-purple-200 font-semibold">Total Affection Score</span>
                  <span className="text-white font-bold">{result.affection}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-purple-500/10 rounded-2xl p-4 border border-purple-500/20">
          <p className="text-purple-300 text-sm text-center">
            🐾 <strong>Note:</strong> This calculator is purely for entertainment purposes! 
            Real pet affection is complex and can't be quantified. Every pet shows love in their own unique way. 
            Treat your pets with love and care regardless of their "score"! 🐶🐱
          </p>
        </div>
      </div>
    </div>
  );
};

export default PetAffectionCalculator;