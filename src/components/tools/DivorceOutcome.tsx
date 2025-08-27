import React, { useState } from 'react';
import { Heart, Users, Home, Scale, Zap, Dog, Cat } from 'lucide-react';

const DivorceOutcome = () => {
  const [formData, setFormData] = useState({
    yearsMarried: '',
    kids: '0',
    assets: 'low',
    lawyer: 'weak',
    cheated: 'no',
    pets: 'no',
    passcode: 'no'
  });

  const [result, setResult] = useState<{
    score: number;
    outcome: string;
    description: string;
    emoji: string;
    bgColor: string;
  } | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateOutcome = () => {
    // Base score
    let score = 50;

    // Years Married factor
    const years = parseInt(formData.yearsMarried) || 0;
    if (years < 1) score -= 10; // Annulment vibes
    else if (years >= 1 && years <= 5) score += 0;
    else if (years >= 6 && years <= 15) score += 10; // More baggage
    else if (years > 15) score += 20; // Alimony jackpot risk

    // Kids factor
    switch (formData.kids) {
      case '0':
        score -= 10;
        break;
      case '1':
      case '2':
        score += 10;
        break;
      case '3':
        score += 20; // "Kid army advantage"
        break;
    }

    // Assets factor
    switch (formData.assets) {
      case 'low':
        score -= 10;
        break;
      case 'medium':
        score += 0;
        break;
      case 'high':
        score += 15;
        break;
      case 'ultra':
        score += 30; // "Welcome to Netflix documentary"
        break;
    }

    // Lawyer Strength factor
    switch (formData.lawyer) {
      case 'weak':
        score -= 20;
        break;
      case 'average':
        score += 0;
        break;
      case 'shark':
        score += 30; // "They'll eat the judge alive"
        break;
    }

    // Optional fun factors
    if (formData.cheated === 'yes') score += 5;
    if (formData.pets === 'yes') score += 7; // Pet advantage
    if (formData.passcode === 'yes') score -= 5; // Too trusting

    // Clamp score between 0 and 100
    score = Math.max(0, Math.min(100, Math.round(score)));

    // Determine outcome
    let outcome: string;
    let description: string;
    let emoji: string;
    let bgColor: string;

    if (score >= 81) {
      outcome = "Congrats, you're taking the house, the dog, AND their PS5";
      description = "You're the undisputed champion of this divorce battle! They'll be eating ramen while you're gaming on their PS5.";
      emoji = "💸";
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30"; // Green background for favorable outcomes
    } else if (score >= 61) {
      outcome = "You keep half the assets and the better couch";
      description = "A fair split! You get to keep your dignity and the good recliner. That's a win in our books.";
      emoji = "🏡";
      bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30"; // Blue background for good outcomes
    } else if (score >= 41) {
      outcome = "Mediocre split – you get the blender, they get Netflix password";
      description = "It's like ordering pizza and ending up with just the crust. You're both losers in this situation.";
      emoji = "😬";
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow background for mediocre outcomes
    } else if (score >= 21) {
      outcome = "You walk away with custody of the cat… and that's it";
      description = "Congratulations on your new feline overlord! At least someone still loves you (meow).";
      emoji = "🧳";
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30"; // Orange background for poor outcomes
    } else {
      outcome = "They took everything, even your Spotify playlist";
      description = "Even your favorite songs are gone! Time to start over with a new identity and a new music library.";
      emoji = "☠️";
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30"; // Red background for terrible outcomes
    }

    setResult({
      score,
      outcome,
      description,
      emoji,
      bgColor
    });
  };

  const resetCalculator = () => {
    setFormData({
      yearsMarried: '',
      kids: '0',
      assets: 'low',
      lawyer: 'weak',
      cheated: 'no',
      pets: 'no',
      passcode: 'no'
    });
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Scale size={48} className="mx-auto text-red-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Divorce Outcome Calculator</h2>
        <p className="text-purple-200">Find out who gets what in your hypothetical divorce (spoiler: probably not what you want)</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Heart size={16} />
              Years Married
            </label>
            <input
              type="number"
              value={formData.yearsMarried}
              onChange={(e) => handleChange('yearsMarried', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 5"
              min="0"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Users size={16} />
              Number of Kids
            </label>
            <select
              value={formData.kids}
              onChange={(e) => handleChange('kids', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="0" className="bg-gray-800">0 Kids</option>
              <option value="1" className="bg-gray-800">1 Kid</option>
              <option value="2" className="bg-gray-800">2 Kids</option>
              <option value="3" className="bg-gray-800">3+ Kids</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Home size={16} />
              Shared Assets Value
            </label>
            <select
              value={formData.assets}
              onChange={(e) => handleChange('assets', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="low" className="bg-gray-800">Low</option>
              <option value="medium" className="bg-gray-800">Medium</option>
              <option value="high" className="bg-gray-800">High</option>
              <option value="ultra" className="bg-gray-800">Ultra Rich</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Scale size={16} />
              Lawyer Strength
            </label>
            <select
              value={formData.lawyer}
              onChange={(e) => handleChange('lawyer', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="weak" className="bg-gray-800">Weak</option>
              <option value="average" className="bg-gray-800">Average</option>
              <option value="shark" className="bg-gray-800">Shark Mode</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Heart size={16} />
              Who Cheated First?
            </label>
            <select
              value={formData.cheated}
              onChange={(e) => handleChange('cheated', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="no" className="bg-gray-800">No One / Not Sure</option>
              <option value="yes" className="bg-gray-800">Me / Them</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Dog size={16} />
              Do They Love Pets More Than You?
            </label>
            <select
              value={formData.pets}
              onChange={(e) => handleChange('pets', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="no" className="bg-gray-800">No</option>
              <option value="yes" className="bg-gray-800">Yes</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Zap size={16} />
              Do They Know Your Phone Passcode?
            </label>
            <select
              value={formData.passcode}
              onChange={(e) => handleChange('passcode', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="no" className="bg-gray-800">No</option>
              <option value="yes" className="bg-gray-800">Yes</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateOutcome}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
          >
            Calculate Divorce Outcome 💔
          </button>
          
          {(result || formData.yearsMarried) && (
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
              <Scale className="mx-auto text-red-400 mb-4" size={48} />
              
              <div className="relative mb-6">
                <div className="text-6xl font-bold text-red-400 mb-2">
                  {result.score}%
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                  <div
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>
              
              <h4 className="text-2xl font-bold mb-3 text-white">
                {result.emoji} {result.outcome}
              </h4>
              
              <p className="text-purple-200 leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-4">Divorce Outcome Guide</h4>
              <div className="space-y-2">
                {[
                  { range: '81-100%', label: 'Major Victory', color: 'bg-green-500' },
                  { range: '61-80%', label: 'Fair Split', color: 'bg-blue-500' },
                  { range: '41-60%', label: 'Mediocre Result', color: 'bg-yellow-500' },
                  { range: '21-40%', label: 'Minimal Gains', color: 'bg-orange-500' },
                  { range: '0-20%', label: 'Total Loss', color: 'bg-red-500' }
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
            💔 <strong>Disclaimer:</strong> This is purely for entertainment! Real divorce proceedings involve 
            complex legal and financial matters that require professional advice, not satirical calculators! 💔
          </p>
        </div>
      </div>
    </div>
  );
};

export default DivorceOutcome;