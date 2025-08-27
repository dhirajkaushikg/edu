import React, { useState } from 'react';
import { Users, MessageCircle, Cake, Heart, Zap } from 'lucide-react';

const BestFriendLoyalty = () => {
  const [formData, setFormData] = useState({
    gossipLevel: 'never',
    planCancel: 'never',
    birthdayMemory: 'always',
    stealsFood: 'no',
    stealsCrush: 'no',
    ignoresMessages: 'no'
  });

  const [result, setResult] = useState<{
    score: number;
    label: string;
    description: string;
    emoji: string;
    bgColor: string;
  } | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateLoyalty = () => {
    // Base score
    let score = 100;

    // Gossip Level Penalty
    switch (formData.gossipLevel) {
      case 'never':
        score += 0;
        break;
      case 'rarely':
        score -= 10;
        break;
      case 'sometimes':
        score -= 20;
        break;
      case 'often':
        score -= 30;
        break;
      case 'always':
        score -= 40;
        break;
    }

    // Plan Cancel Penalty
    switch (formData.planCancel) {
      case 'never':
        score += 0;
        break;
      case 'rarely':
        score -= 10;
        break;
      case 'sometimes':
        score -= 20;
        break;
      case 'often':
        score -= 30;
        break;
      case 'always':
        score -= 40;
        break;
    }

    // Birthday Memory Penalty
    switch (formData.birthdayMemory) {
      case 'always':
        score += 0;
        break;
      case 'sometimes':
        score -= 20;
        break;
      case 'never':
        score -= 40;
        break;
    }

    // Optional spice penalties
    if (formData.stealsFood === 'yes') score -= 15;
    if (formData.stealsCrush === 'yes') score -= 25;
    if (formData.ignoresMessages === 'yes') score -= 10;

    // Clamp score between 0 and 100
    score = Math.max(0, Math.min(100, Math.round(score)));

    // Determine loyalty label
    let label: string;
    let description: string;
    let emoji: string;
    let bgColor: string;

    if (score >= 81) {
      label = "Ride or Die Bestie";
      description = "Certified golden retriever energy – this friend would take a bullet for you (or at least share their fries).";
      emoji = "🐕";
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30"; // Green background for high loyalty
    } else if (score >= 61) {
      label = "Good friend, but sometimes acts like a clown";
      description = "They're loyal but have the memory of a goldfish and the punctuality of a sloth.";
      emoji = "🐒";
      bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30"; // Blue background for medium-high loyalty
    } else if (score >= 41) {
      label = "Suspicious fox – trust them at your own risk";
      description = "They seem nice but you've caught them looking at your phone when you're not looking.";
      emoji = "🦊";
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow background for medium loyalty
    } else if (score >= 21) {
      label = "Snake Alert – already telling your secrets";
      description = "This friend is currently plotting your downfall while nodding along to your stories.";
      emoji = "🐍";
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30"; // Orange background for low-medium loyalty
    } else {
      label = "Ultimate Betrayer – Judas would be proud";
      description = "They've already texted your ex and are probably selling your secrets on the dark web.";
      emoji = "☠️";
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30"; // Red background for low loyalty
    }

    setResult({
      score,
      label,
      description,
      emoji,
      bgColor
    });
  };

  const resetCalculator = () => {
    setFormData({
      gossipLevel: 'never',
      planCancel: 'never',
      birthdayMemory: 'always',
      stealsFood: 'no',
      stealsCrush: 'no',
      ignoresMessages: 'no'
    });
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Heart size={48} className="mx-auto text-pink-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Best Friend Loyalty Rating</h2>
        <p className="text-purple-200">Find out how loyal your bestie really is (spoiler: probably not that loyal)</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <MessageCircle size={16} />
              Gossip Level
            </label>
            <select
              value={formData.gossipLevel}
              onChange={(e) => handleChange('gossipLevel', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="never" className="bg-gray-800">Never</option>
              <option value="rarely" className="bg-gray-800">Rarely</option>
              <option value="sometimes" className="bg-gray-800">Sometimes</option>
              <option value="often" className="bg-gray-800">Often</option>
              <option value="always" className="bg-gray-800">Always</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Zap size={16} />
              Plan Cancel Frequency
            </label>
            <select
              value={formData.planCancel}
              onChange={(e) => handleChange('planCancel', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="never" className="bg-gray-800">Never</option>
              <option value="rarely" className="bg-gray-800">Rarely</option>
              <option value="sometimes" className="bg-gray-800">Sometimes</option>
              <option value="often" className="bg-gray-800">Often</option>
              <option value="always" className="bg-gray-800">Always</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Cake size={16} />
              Birthday Memory
            </label>
            <select
              value={formData.birthdayMemory}
              onChange={(e) => handleChange('birthdayMemory', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="always" className="bg-gray-800">Always remembers</option>
              <option value="sometimes" className="bg-gray-800">Sometimes forgets</option>
              <option value="never" className="bg-gray-800">Always forgets</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Heart size={16} />
              Steals Your Food?
            </label>
            <select
              value={formData.stealsFood}
              onChange={(e) => handleChange('stealsFood', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="no" className="bg-gray-800">No</option>
              <option value="yes" className="bg-gray-800">Yes</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Users size={16} />
              Steals Your Crush?
            </label>
            <select
              value={formData.stealsCrush}
              onChange={(e) => handleChange('stealsCrush', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="no" className="bg-gray-800">No</option>
              <option value="yes" className="bg-gray-800">Yes</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <MessageCircle size={16} />
              Ignores Your Messages?
            </label>
            <select
              value={formData.ignoresMessages}
              onChange={(e) => handleChange('ignoresMessages', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="no" className="bg-gray-800">No</option>
              <option value="yes" className="bg-gray-800">Yes</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateLoyalty}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-pink-500/25"
          >
            Calculate Loyalty Rating ❤️
          </button>
          
          {(result || formData.gossipLevel !== 'never' || formData.planCancel !== 'never') && (
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
              <Heart className="mx-auto text-pink-400 mb-4" size={48} />
              
              <div className="relative mb-6">
                <div className="text-6xl font-bold text-pink-400 mb-2">
                  {result.score}%
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>
              
              <h4 className="text-2xl font-bold mb-3 text-white">
                {result.emoji} {result.label}
              </h4>
              
              <p className="text-purple-200 leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-4">Loyalty Rating Guide</h4>
              <div className="space-y-2">
                {[
                  { range: '81-100%', label: 'Ride or Die Bestie', color: 'bg-green-500' },
                  { range: '61-80%', label: 'Good friend, but clown energy', color: 'bg-blue-500' },
                  { range: '41-60%', label: 'Suspicious fox', color: 'bg-yellow-500' },
                  { range: '21-40%', label: 'Snake Alert', color: 'bg-orange-500' },
                  { range: '0-20%', label: 'Ultimate Betrayer', color: 'bg-red-500' }
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

        <div className="bg-pink-500/10 rounded-2xl p-4 border border-pink-500/20">
          <p className="text-pink-300 text-sm text-center">
            ❤️ <strong>Disclaimer:</strong> This is just for fun! Real friendships are built on trust, 
            communication, and genuine care, not gossip levels and food stealing habits! ❤️
          </p>
        </div>
      </div>
    </div>
  );
};

export default BestFriendLoyalty;