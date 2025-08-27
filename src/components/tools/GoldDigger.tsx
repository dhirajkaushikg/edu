import React, { useState } from 'react';
import { Wallet, Heart, Gift, Zap, DollarSign, MapPin, Phone, Car } from 'lucide-react';

const GoldDigger = () => {
  const [formData, setFormData] = useState({
    wealth: 'low',
    ageGap: 'same',
    gifts: 'rare',
    moneyReaction: 'not',
    datesPaid: 'always',
    will: 'no',
    // New questions
    lifestyleMismatch: 'no',
    emergencySupport: 'no',
    futurePlanning: 'no',
    sacrificeWillingness: 'no'
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

  const calculateGoldDiggerScore = () => {
    // Base score
    let score = 50;

    // Wealth Level factor (revised)
    switch (formData.wealth) {
      case 'low':
        score -= 10;
        break;
      case 'medium':
        score += 0;
        break;
      case 'high':
        score += 15;
        break;
      case 'billionaire':
        score += 30;
        break;
    }

    // Age Gap factor (revised)
    switch (formData.ageGap) {
      case 'same':
        score -= 5;
        break;
      case '5-10':
        score += 5;
        break;
      case '10+':
        score += 15;
        break;
    }

    // Gifts factor (revised)
    switch (formData.gifts) {
      case 'rare':
        score -= 10;
        break;
      case 'sometimes':
        score += 0;
        break;
      case 'week':
        score += 15;
        break;
      case 'day':
        score += 25;
        break;
    }

    // Money Reaction factor (revised)
    switch (formData.moneyReaction) {
      case 'not':
        score -= 20;
        break;
      case 'slightly':
        score -= 5;
        break;
      case 'sparkle':
        score += 15;
        break;
      case 'net':
        score += 30;
        break;
    }

    // Dates Paid By factor (revised)
    switch (formData.datesPaid) {
      case 'always':
        score += 20;
        break;
      case '50-50':
        score -= 10;
        break;
      case 'mostly':
        score -= 15;
        break;
      case 'random':
        score += 0;
        break;
    }

    // Optional will factor (revised)
    if (formData.will === 'yes') score += 20;

    // New questions
    // Lifestyle Mismatch
    if (formData.lifestyleMismatch === 'yes') score += 15;
    
    // Emergency Support
    if (formData.emergencySupport === 'no') score += 10;
    
    // Future Planning
    if (formData.futurePlanning === 'money') score += 15;
    
    // Sacrifice Willingness
    if (formData.sacrificeWillingness === 'no') score += 12;

    // Clamp score between 0 and 100
    score = Math.max(0, Math.min(100, Math.round(score)));

    // Determine label and background color
    let label: string;
    let description: string;
    let emoji: string;
    let bgColor: string;

    if (score >= 81) {
      label = "Certified Gold Digger – Hide your credit card";
      description = "They're after your wallet, not your heart! Time to change your password and hide your credit cards.";
      emoji = "🤑";
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30"; // Red background for high scores
    } else if (score >= 61) {
      label = "Potential Miner – Keep an eye on your wallet";
      description = "They might genuinely care about you, but they're definitely interested in your financial portfolio too.";
      emoji = "💎";
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30"; // Orange background for medium-high scores
    } else if (score >= 41) {
      label = "50/50 – Could be love, could be your Rolex";
      description = "It's a coin toss! They might love you for you, or they might love you for your luxury watch collection.";
      emoji = "🤔";
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow background for middle scores
    } else if (score >= 21) {
      label = "Mostly Genuine – They like you more than your money";
      description = "They appreciate your financial stability, but they're genuinely interested in you as a person too.";
      emoji = "❤️";
      bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30"; // Blue background for medium-low scores
    } else {
      label = "Pure Love – They'd date you even if you lived in a tent";
      description = "True love! They'd be with you even if you were broke. That's the kind of person you want in your life.";
      emoji = "🕊️";
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30"; // Green background for low scores
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
      wealth: 'low',
      ageGap: 'same',
      gifts: 'rare',
      moneyReaction: 'not',
      datesPaid: 'always',
      will: 'no',
      lifestyleMismatch: 'no',
      emergencySupport: 'no',
      futurePlanning: 'no',
      sacrificeWillingness: 'no'
    });
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <DollarSign size={48} className="mx-auto text-yellow-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Gold Digger Calculator</h2>
        <p className="text-purple-200">Find out if someone is with you for love or your wallet (spoiler: probably both)</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Wallet size={16} />
              Monthly Salary / Wealth Level
            </label>
            <select
              value={formData.wealth}
              onChange={(e) => handleChange('wealth', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="low" className="bg-gray-800">Low</option>
              <option value="medium" className="bg-gray-800">Medium</option>
              <option value="high" className="bg-gray-800">High</option>
              <option value="billionaire" className="bg-gray-800">Billionaire vibes</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Heart size={16} />
              Age Gap
            </label>
            <select
              value={formData.ageGap}
              onChange={(e) => handleChange('ageGap', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="same" className="bg-gray-800">Same age</option>
              <option value="5-10" className="bg-gray-800">5–10 yrs difference</option>
              <option value="10+" className="bg-gray-800">10+ yrs difference</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Gift size={16} />
              Gifts You Give
            </label>
            <select
              value={formData.gifts}
              onChange={(e) => handleChange('gifts', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="rare" className="bg-gray-800">Rare</option>
              <option value="sometimes" className="bg-gray-800">Sometimes</option>
              <option value="week" className="bg-gray-800">Every Week</option>
              <option value="day" className="bg-gray-800">Every Day Gucci</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <DollarSign size={16} />
              Their Reactions to Money Talk
            </label>
            <select
              value={formData.moneyReaction}
              onChange={(e) => handleChange('moneyReaction', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="not" className="bg-gray-800">Not Interested</option>
              <option value="slightly" className="bg-gray-800">Slightly Curious</option>
              <option value="sparkle" className="bg-gray-800">Eyes Sparkle ✨</option>
              <option value="net" className="bg-gray-800">"What's your net worth?"</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Zap size={16} />
              Dates Paid By
            </label>
            <select
              value={formData.datesPaid}
              onChange={(e) => handleChange('datesPaid', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="always" className="bg-gray-800">Always You</option>
              <option value="50-50" className="bg-gray-800">50-50</option>
              <option value="mostly" className="bg-gray-800">Mostly Them</option>
              <option value="random" className="bg-gray-800">Random</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Heart size={16} />
              Do they ask about your will? 😅
            </label>
            <select
              value={formData.will}
              onChange={(e) => handleChange('will', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="no" className="bg-gray-800">No</option>
              <option value="yes" className="bg-gray-800">Yes</option>
            </select>
          </div>

          {/* New Questions */}
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <MapPin size={16} />
              Would they date you if you moved to a remote area?
            </label>
            <select
              value={formData.lifestyleMismatch}
              onChange={(e) => handleChange('lifestyleMismatch', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="no" className="bg-gray-800">Yes, they love me</option>
              <option value="yes" className="bg-gray-800">No, too rustic for them</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Phone size={16} />
              Will they help financially in emergencies?
            </label>
            <select
              value={formData.emergencySupport}
              onChange={(e) => handleChange('emergencySupport', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="yes" className="bg-gray-800">Yes, they care</option>
              <option value="no" className="bg-gray-800">No, it's all about them</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Heart size={16} />
              When planning future, do they focus on money or love?
            </label>
            <select
              value={formData.futurePlanning}
              onChange={(e) => handleChange('futurePlanning', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="love" className="bg-gray-800">Love and happiness</option>
              <option value="money" className="bg-gray-800">Financial security</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Car size={16} />
              Would they sacrifice their luxury for your dreams?
            </label>
            <select
              value={formData.sacrificeWillingness}
              onChange={(e) => handleChange('sacrificeWillingness', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="yes" className="bg-gray-800">Yes, they care about me</option>
              <option value="no" className="bg-gray-800">No, their comfort first</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateGoldDiggerScore}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-xl hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
          >
            Calculate Gold Digger Score 💰
          </button>
          
          {(result || formData.wealth !== 'low' || formData.ageGap !== 'same' || formData.gifts !== 'rare' || formData.moneyReaction !== 'not' || formData.datesPaid !== 'always' || formData.will !== 'no' || formData.lifestyleMismatch !== 'no' || formData.emergencySupport !== 'no' || formData.futurePlanning !== 'no' || formData.sacrificeWillingness !== 'no') && (
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
              <DollarSign className="mx-auto text-yellow-400 mb-4" size={48} />
              
              <div className="relative mb-6">
                <div className="text-6xl font-bold text-yellow-400 mb-2">
                  {result.score}%
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full transition-all duration-1000"
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
              <h4 className="text-lg font-semibold text-white mb-4">Gold Digger Rating Guide</h4>
              <div className="space-y-2">
                {[
                  { range: '81-100%', label: 'Certified Gold Digger', color: 'bg-red-500' },
                  { range: '61-80%', label: 'Potential Miner', color: 'bg-orange-500' },
                  { range: '41-60%', label: '50/50', color: 'bg-yellow-500' },
                  { range: '21-40%', label: 'Mostly Genuine', color: 'bg-blue-500' },
                  { range: '0-20%', label: 'Pure Love', color: 'bg-green-500' }
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

        <div className="bg-yellow-500/10 rounded-2xl p-4 border border-yellow-500/20">
          <p className="text-yellow-300 text-sm text-center">
            💰 <strong>Disclaimer:</strong> This is purely for entertainment! Real relationships are built on 
            genuine connection, trust, and mutual respect, not financial status or gift-giving habits! 💰
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoldDigger;