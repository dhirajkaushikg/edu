import React, { useState } from 'react';
import { Tv, Smartphone, Dumbbell, Sofa } from 'lucide-react';

const LazinessCalculator = () => {
  const [lazinessData, setLazinessData] = useState({
    screenTime: '',
    naps: '',
    netflix: '',
    gymVisits: ''
  });

  const [result, setResult] = useState<{
    score: number;
    label: string;
    description: string;
    color: string;
    bgColor: string;
    icon: any;
  } | null>(null);

  const handleChange = (field: string, value: string) => {
    setLazinessData(prev => ({ ...prev, [field]: value }));
  };

  const calculateLaziness = () => {
    // Parse inputs
    const screenTime = parseFloat(lazinessData.screenTime) || 0;
    const naps = parseInt(lazinessData.naps) || 0;
    const netflix = parseFloat(lazinessData.netflix) || 0;
    const gymVisits = parseInt(lazinessData.gymVisits) || 0;

    // Calculate laziness score using the provided formula
    let lazinessScore = (screenTime * 2) + (naps * 5) + (netflix * 3) - (gymVisits * 10);

    // Normalize to 0-100 (assuming reasonable input ranges)
    // The formula can produce negative values, so we'll normalize to 0-100 range
    // With reasonable inputs, scores typically range from -50 to 100
    lazinessScore = Math.max(0, Math.min(100, Math.round((lazinessScore + 50) * (100 / 150))));

    // Determine label and description based on laziness score
    let label: string;
    let description: string;
    let color: string;
    let bgColor: string;
    let icon: any;

    if (lazinessScore >= 80) {
      label = "🛋️ Couch Potato Supreme – Movement detected: 0.";
      description = "You've mastered the art of doing absolutely nothing! Your couch has become a second skin, and your remote control is like an extension of your hand.";
      color = "text-orange-400";
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30";
      icon = Sofa;
    } else if (lazinessScore >= 50) {
      label = "📱 Scrolling Zombie – Your thumb has six-pack abs.";
      description = "You're addicted to your screen and spend more time scrolling than sleeping. At least your thumb is getting a workout!";
      color = "text-yellow-400";
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30";
      icon = Smartphone;
    } else {
      label = "💪 Rare Motivated Human – Do you even exist?";
      description = "You're actually productive! Shocking! You probably get things done and might even leave the house regularly. How unusual!";
      color = "text-green-400";
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30";
      icon = Dumbbell;
    }

    setResult({
      score: lazinessScore,
      label,
      description,
      color,
      bgColor,
      icon
    });
  };

  const resetCalculator = () => {
    setLazinessData({
      screenTime: '',
      naps: '',
      netflix: '',
      gymVisits: ''
    });
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Sofa size={48} className="mx-auto text-purple-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Laziness Calculator</h2>
        <p className="text-purple-200">Find out just how lazy you really are (spoiler: probably a lot)</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Tv size={16} />
              Daily Screen Time (hours)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={lazinessData.screenTime}
              onChange={(e) => handleChange('screenTime', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 4.5"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Sofa size={16} />
              Naps per Day
            </label>
            <input
              type="number"
              min="0"
              value={lazinessData.naps}
              onChange={(e) => handleChange('naps', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 2"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Tv size={16} />
              Netflix Hours
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={lazinessData.netflix}
              onChange={(e) => handleChange('netflix', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 3.0"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Dumbbell size={16} />
              Gym Visits per Week
            </label>
            <input
              type="number"
              min="0"
              value={lazinessData.gymVisits}
              onChange={(e) => handleChange('gymVisits', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 1"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateLaziness}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            Calculate Laziness 😴
          </button>
          
          {(result || lazinessData.screenTime) && (
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
                  {result.score}%
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${result.score}%` }}
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
              <h4 className="text-lg font-semibold text-white mb-4">Laziness Breakdown</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-purple-200">Screen Time Contribution</span>
                  <span className="text-white font-medium">{(parseFloat(lazinessData.screenTime) || 0) * 2} pts</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-purple-200">Naps Contribution</span>
                  <span className="text-white font-medium">{(parseInt(lazinessData.naps) || 0) * 5} pts</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-purple-200">Netflix Contribution</span>
                  <span className="text-white font-medium">{Math.round((parseFloat(lazinessData.netflix) || 0) * 3)} pts</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-purple-200">Gym Visits Reduction</span>
                  <span className="text-white font-medium">-{(parseInt(lazinessData.gymVisits) || 0) * 10} pts</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg mt-3">
                  <span className="text-purple-200 font-semibold">Total Laziness Score</span>
                  <span className="text-white font-bold">{result.score}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-purple-500/10 rounded-2xl p-4 border border-purple-500/20">
          <p className="text-purple-300 text-sm text-center">
            😴 <strong>Disclaimer:</strong> This calculator is purely for entertainment purposes! 
            Being "lazy" isn't inherently bad - everyone needs rest and relaxation. 
            Don't take this too seriously, and remember that balance is key to a healthy lifestyle!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LazinessCalculator;