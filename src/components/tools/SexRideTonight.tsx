import React, { useState } from 'react';
import { Users, Flame, Heart, Zap } from 'lucide-react';

const SexRideTonight = () => {
  const [partner1, setPartner1] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    hornyLevel: '5',
    beautyLevel: '5',
    bodyCount: '',
    tabsIntake: 'no'
  });

  const [partner2, setPartner2] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    hornyLevel: '5',
    handsomeLevel: '5',
    bodyCount: '',
    tabsIntake: 'no'
  });

  const [result, setResult] = useState<{
    score: number;
    message: string;
    description: string;
    color: string;
    bgColor: string;
  } | null>(null);

  const handlePartner1Change = (field: string, value: string) => {
    setPartner1(prev => ({ ...prev, [field]: value }));
  };

  const handlePartner2Change = (field: string, value: string) => {
    setPartner2(prev => ({ ...prev, [field]: value }));
  };

  const calculateScore = () => {
    // Validate inputs
    if (!partner1.name.trim() || !partner2.name.trim()) {
      alert('Please enter names for both partners');
      return;
    }

    // Start with base score
    let score = 40;

    // Add horny level (×3)
    score += (parseInt(partner1.hornyLevel) || 0) * 3;
    score += (parseInt(partner2.hornyLevel) || 0) * 3;

    // Add beauty/handsome level (×2)
    score += (parseInt(partner1.beautyLevel) || 0) * 2;
    score += (parseInt(partner2.handsomeLevel) || 0) * 2;

    // Tabs intake bonus
    if (partner1.tabsIntake === 'yes') score += 7;
    if (partner2.tabsIntake === 'yes') score += 7;

    // Age factor
    const age1 = parseInt(partner1.age) || 0;
    const age2 = parseInt(partner2.age) || 0;
    
    // Age factor for partner 1
    if (age1 >= 20 && age1 <= 35) score += 10;
    else if (age1 >= 36 && age1 <= 45) score += 5;
    else if (age1 > 0) score -= 5;
    
    // Age factor for partner 2
    if (age2 >= 20 && age2 <= 35) score += 10;
    else if (age2 >= 36 && age2 <= 45) score += 5;
    else if (age2 > 0) score -= 5;

    // Age difference factor
    const ageDifference = Math.abs(age1 - age2);
    if (ageDifference <= 7) score += 5;
    else if (ageDifference >= 15) score -= 10;
    // 8-14 years: no change (0)

    // BMI factor
    const getBMI = (height: string, weight: string) => {
      const h = parseFloat(height) || 0;
      const w = parseFloat(weight) || 0;
      if (h <= 0 || w <= 0) return 0;
      return w / ((h / 100) * (h / 100));
    };

    const bmi1 = getBMI(partner1.height, partner1.weight);
    const bmi2 = getBMI(partner2.height, partner2.weight);

    // BMI factor for partner 1
    if (bmi1 >= 18 && bmi1 < 25) score += 8;
    else if (bmi1 >= 25 && bmi1 < 30) score += 3;
    else if (bmi1 > 0) score -= 5;

    // BMI factor for partner 2
    if (bmi2 >= 18 && bmi2 < 25) score += 8;
    else if (bmi2 >= 25 && bmi2 < 30) score += 3;
    else if (bmi2 > 0) score -= 5;

    // Body count factor
    const bodyCount1 = parseInt(partner1.bodyCount) || 0;
    const bodyCount2 = parseInt(partner2.bodyCount) || 0;
    
    // Body count factor for partner 1
    if (bodyCount1 >= 1 && bodyCount1 <= 10) score += 5;
    else if (bodyCount1 >= 11 && bodyCount1 <= 30) score += 8;
    else if (bodyCount1 > 30) score += 3;
    
    // Body count factor for partner 2
    if (bodyCount2 >= 1 && bodyCount2 <= 10) score += 5;
    else if (bodyCount2 >= 11 && bodyCount2 <= 30) score += 8;
    else if (bodyCount2 > 30) score += 3;

    // Cap score between 0 and 100
    score = Math.max(0, Math.min(100, Math.round(score)));

    // Determine message based on score
    let message: string;
    let description: string;
    let color: string;
    let bgColor: string;

    if (score >= 90) {
      message = "🔥 Wild Ride Incoming — Brace Yourselves!";
      description = "The sparks will fly and the night will be unforgettable! Get ready for an adventure of a lifetime!";
      color = "text-red-400";
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30"; // Red background for highest scores
    } else if (score >= 70) {
      message = "😉 Steamy Night Ahead — Sparks Will Fly!";
      description = "Expect some serious chemistry and passion! You two are going to have a great time together!";
      color = "text-orange-400";
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30"; // Orange background for high scores
    } else if (score >= 50) {
      message = "😏 Average Vibes — Cuddles Might Save the Night.";
      description = "It might not be the wildest night, but there's definitely potential for some sweet moments together!";
      color = "text-yellow-400";
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow background for medium scores
    } else if (score >= 30) {
      message = "😴 Not Too Exciting — Maybe Just Netflix & Chill.";
      description = "A cozy night in might be more your style. Save the wild stuff for another day!";
      color = "text-blue-400";
      bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30"; // Blue background for low-medium scores
    } else {
      message = "😂 Cancel the Plan — Go Straight to Sleep.";
      description = "It's not you, it's just not the right night for romance. Better luck next time!";
      color = "text-purple-400";
      bgColor = "from-purple-600/20 to-purple-800/20 border-purple-500/30"; // Purple background for lowest scores
    }

    setResult({
      score,
      message,
      description,
      color,
      bgColor
    });
  };

  const resetCalculator = () => {
    setPartner1({
      name: '',
      age: '',
      height: '',
      weight: '',
      hornyLevel: '5',
      beautyLevel: '5',
      bodyCount: '',
      tabsIntake: 'no'
    });
    setPartner2({
      name: '',
      age: '',
      height: '',
      weight: '',
      hornyLevel: '5',
      handsomeLevel: '5',
      bodyCount: '',
      tabsIntake: 'no'
    });
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <Flame size={48} className="mx-auto text-red-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Sex Ride Tonight Score</h2>
        <p className="text-purple-200">Find out how hot tonight will be for you and your partner!</p>
      </div>

      <div className="space-y-8">
        {/* Partner 1 Inputs */}
        <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-2xl p-6 border border-pink-500/30">
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-pink-400" />
            <h3 className="text-xl font-bold text-white">Partner 1</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                value={partner1.name}
                onChange={(e) => handlePartner1Change('name', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="Enter name"
              />
            </div>
            
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Age
              </label>
              <input
                type="number"
                value={partner1.age}
                onChange={(e) => handlePartner1Change('age', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="Enter age"
              />
            </div>
            
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                value={partner1.height}
                onChange={(e) => handlePartner1Change('height', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="Enter height in cm"
              />
            </div>
            
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                value={partner1.weight}
                onChange={(e) => handlePartner1Change('weight', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="Enter weight in kg"
              />
            </div>
            
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Horny Level (1-10)
              </label>
              <select
                value={partner1.hornyLevel}
                onChange={(e) => handlePartner1Change('hornyLevel', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num} className="bg-gray-800">{num}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Beauty Level (1-10)
              </label>
              <select
                value={partner1.beautyLevel}
                onChange={(e) => handlePartner1Change('beautyLevel', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num} className="bg-gray-800">{num}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Body Count
              </label>
              <input
                type="number"
                value={partner1.bodyCount}
                onChange={(e) => handlePartner1Change('bodyCount', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="Number of past partners"
              />
            </div>
            
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Tabs Intake?
              </label>
              <select
                value={partner1.tabsIntake}
                onChange={(e) => handlePartner1Change('tabsIntake', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              >
                <option value="no" className="bg-gray-800">No</option>
                <option value="yes" className="bg-gray-800">Yes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Partner 2 Inputs */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-blue-400" />
            <h3 className="text-xl font-bold text-white">Partner 2</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                value={partner2.name}
                onChange={(e) => handlePartner2Change('name', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="Enter name"
              />
            </div>
            
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Age
              </label>
              <input
                type="number"
                value={partner2.age}
                onChange={(e) => handlePartner2Change('age', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="Enter age"
              />
            </div>
            
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                value={partner2.height}
                onChange={(e) => handlePartner2Change('height', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="Enter height in cm"
              />
            </div>
            
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                value={partner2.weight}
                onChange={(e) => handlePartner2Change('weight', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="Enter weight in kg"
              />
            </div>
            
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Horny Level (1-10)
              </label>
              <select
                value={partner2.hornyLevel}
                onChange={(e) => handlePartner2Change('hornyLevel', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num} className="bg-gray-800">{num}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Handsome Level (1-10)
              </label>
              <select
                value={partner2.handsomeLevel}
                onChange={(e) => handlePartner2Change('handsomeLevel', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num} className="bg-gray-800">{num}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Body Count
              </label>
              <input
                type="number"
                value={partner2.bodyCount}
                onChange={(e) => handlePartner2Change('bodyCount', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="Number of past partners"
              />
            </div>
            
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Tabs Intake?
              </label>
              <select
                value={partner2.tabsIntake}
                onChange={(e) => handlePartner2Change('tabsIntake', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              >
                <option value="no" className="bg-gray-800">No</option>
                <option value="yes" className="bg-gray-800">Yes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateScore}
            disabled={!partner1.name.trim() || !partner2.name.trim()}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Calculate Score 🔥
          </button>
          
          {(result || partner1.name || partner2.name) && (
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
              <Flame className="mx-auto text-red-400 mb-4" size={48} />
              
              <div className="relative mb-6">
                <div className="text-6xl font-bold text-red-400 mb-2">
                  {result.score}%
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                  <div
                    className="bg-gradient-to-r from-red-500 to-purple-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>
              
              <h4 className={`text-2xl font-bold mb-3 ${result.color}`}>
                {result.message}
              </h4>
              
              <p className="text-purple-200 leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-4">Score Interpretation</h4>
              <div className="space-y-2">
                {[
                  { range: '90-100', label: 'Wild Ride Incoming', color: 'bg-red-500' },
                  { range: '70-89', label: 'Steamy Night Ahead', color: 'bg-orange-500' },
                  { range: '50-69', label: 'Average Vibes', color: 'bg-yellow-500' },
                  { range: '30-49', label: 'Netflix & Chill', color: 'bg-blue-500' },
                  { range: '0-29', label: 'Cancel the Plan', color: 'bg-purple-500' }
                ].map((scale, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${scale.color}`} />
                      <span className="text-white text-sm">{scale.label}</span>
                    </div>
                    <span className="text-purple-300 text-sm">{scale.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-red-500/10 rounded-2xl p-4 border border-red-500/20">
          <p className="text-red-300 text-sm text-center">
            🔞 <strong>Disclaimer:</strong> This calculator is for entertainment purposes only! 
            The results are completely fictional and should not be taken seriously. 
            Always practice safe and consensual activities! 🔞
          </p>
        </div>
      </div>
    </div>
  );
};

export default SexRideTonight;