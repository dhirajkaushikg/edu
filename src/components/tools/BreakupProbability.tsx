import React, { useState } from 'react';
import { Heart, Users, Clock, MessageCircle, Flower2, AlertTriangle, MapPin, Laugh } from 'lucide-react';

const BreakupProbability = () => {
  const [coupleData, setCoupleData] = useState({
    timeTogether: '',
    fightFrequency: '',
    replySpeed: '',
    romanticGestures: '',
    jealousyLevel: '5',
    goodMorningNight: 'yes',
    outings: '',
    jokes: '5' // New attribute for jokes
  });

  const [result, setResult] = useState<{
    probability: number;
    message: string;
    description: string;
    color: string;
    bgColor: string;
  } | null>(null);

  const handleChange = (field: string, value: string) => {
    setCoupleData(prev => ({ ...prev, [field]: value }));
  };

  const calculateProbability = () => {
    // Start with base score (higher base for more realistic probabilities)
    let probability = 30;

    // Time Together factor (longer relationships are more stable)
    const timeTogether = parseFloat(coupleData.timeTogether) || 0;
    if (timeTogether < 3) probability += 15; // Very new relationship - higher risk
    else if (timeTogether < 6) probability += 10;
    else if (timeTogether < 12) probability += 5;
    else if (timeTogether < 24) probability -= 5; // Stable relationship
    else if (timeTogether >= 24) probability -= 10; // Long-term relationship - lower risk

    // Fight Frequency factor (more fights = higher breakup risk)
    const fightFrequency = parseInt(coupleData.fightFrequency) || 0;
    if (fightFrequency === 0) probability -= 8; // No fights - very stable
    else if (fightFrequency === 1) probability -= 3; // Rare fights
    else if (fightFrequency === 2) probability += 2; // Occasional fights
    else if (fightFrequency === 3) probability += 8; // Frequent fights
    else if (fightFrequency > 3) probability += 15; // Constant fighting

    // Reply Speed factor (slower replies may indicate disinterest)
    const replySpeed = parseFloat(coupleData.replySpeed) || 0;
    if (replySpeed <= 5) probability -= 5; // Very responsive
    else if (replySpeed <= 30) probability -= 2; // Responsive
    else if (replySpeed <= 60) probability += 2; // Average response
    else if (replySpeed <= 120) probability += 6; // Slow response
    else if (replySpeed > 120) probability += 12; // Very slow response

    // Romantic Gestures factor (more gestures = lower breakup risk)
    const romanticGestures = parseInt(coupleData.romanticGestures) || 0;
    if (romanticGestures === 0) probability += 10; // No gestures - higher risk
    else if (romanticGestures <= 2) probability += 5; // Few gestures
    else if (romanticGestures <= 5) probability -= 2; // Moderate gestures
    else if (romanticGestures > 5) probability -= 8; // Many gestures - lower risk

    // Jealousy Level factor (moderate jealousy is healthy, extremes are problematic)
    const jealousyLevel = parseInt(coupleData.jealousyLevel) || 0;
    if (jealousyLevel === 0) probability += 8; // No jealousy - may indicate lack of care
    else if (jealousyLevel <= 2) probability += 5; // Very low jealousy
    else if (jealousyLevel <= 4) probability -= 3; // Low-moderate (healthy)
    else if (jealousyLevel <= 6) probability -= 5; // Moderate (normal and healthy)
    else if (jealousyLevel <= 8) probability += 3; // High (concerning)
    else if (jealousyLevel > 8) probability += 15; // Extreme (very problematic)

    // Good Morning/Good Night factor (shows care and routine)
    if (coupleData.goodMorningNight === 'yes') probability -= 6; // Shows care
    else if (coupleData.goodMorningNight === 'no') probability += 6; // May indicate disinterest

    // Outings factor (more outings = lower breakup risk)
    const outings = parseInt(coupleData.outings) || 0;
    if (outings === 0) probability += 12; // No outings - higher risk
    else if (outings <= 2) probability += 6; // Rare outings
    else if (outings <= 5) probability -= 3; // Occasional outings
    else if (outings <= 10) probability -= 8; // Regular outings
    else if (outings > 10) probability -= 12; // Frequent outings - lower risk

    // Jokes factor (shared humor strengthens relationships)
    const jokes = parseInt(coupleData.jokes) || 0;
    if (jokes === 0) probability += 10; // No jokes - higher risk
    else if (jokes <= 3) probability += 5; // Rare jokes
    else if (jokes <= 7) probability -= 3; // Occasional jokes
    else if (jokes <= 10) probability -= 8; // Regular jokes - lower risk

    // Cap probability between 0 and 100
    probability = Math.max(0, Math.min(100, Math.round(probability)));

    // Determine message based on probability
    let message: string;
    let description: string;
    let color: string;
    let bgColor: string;

    if (probability <= 15) {
      message = "💕 Unbreakable Bond — Couple Goals!";
      description = "You two are rock solid! Your relationship is built to last. Keep up the great work!";
      color = "text-pink-400";
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30"; // Green background for low probabilities
    } else if (probability <= 35) {
      message = "😍 Pretty Solid — Minor Drama Only.";
      description = "Your relationship is strong with just a few minor issues. A little attention and you'll be perfect!";
      color = "text-red-400";
      bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30"; // Blue background for low-medium probabilities
    } else if (probability <= 55) {
      message = "😏 Shaky Ground — Better Watch Out.";
      description = "There are some warning signs here. It's time to put in some effort to strengthen your bond!";
      color = "text-orange-400";
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow background for medium probabilities
    } else if (probability <= 75) {
      message = "😬 Red Flags Everywhere — Drama Loading...";
      description = "Things are getting rocky. You need to address these issues before they spiral out of control!";
      color = "text-yellow-400";
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30"; // Orange background for medium-high probabilities
    } else {
      message = "💔 Breakup Imminent — Start Writing That Single Life Caption.";
      description = "Danger zone! If you don't make significant changes soon, this relationship might be heading for a breakup!";
      color = "text-red-500";
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30"; // Red background for high probabilities
    }

    setResult({
      probability,
      message,
      description,
      color,
      bgColor
    });
  };

  const resetCalculator = () => {
    setCoupleData({
      timeTogether: '',
      fightFrequency: '',
      replySpeed: '',
      romanticGestures: '',
      jealousyLevel: '5',
      goodMorningNight: 'yes',
      outings: '',
      jokes: '5'
    });
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Heart size={48} className="mx-auto text-pink-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Breakup Probability Calculator</h2>
        <p className="text-purple-200">Find out how likely you and your partner are to break up!</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Clock size={16} />
              Time Together (months)
            </label>
            <input
              type="number"
              value={coupleData.timeTogether}
              onChange={(e) => handleChange('timeTogether', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 12"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <AlertTriangle size={16} />
              Fight Frequency (per week)
            </label>
            <input
              type="number"
              value={coupleData.fightFrequency}
              onChange={(e) => handleChange('fightFrequency', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 2"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <MessageCircle size={16} />
              Avg. Reply Speed (minutes)
            </label>
            <input
              type="number"
              value={coupleData.replySpeed}
              onChange={(e) => handleChange('replySpeed', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 30"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Flower2 size={16} />
              Romantic Gestures (per month)
            </label>
            <input
              type="number"
              value={coupleData.romanticGestures}
              onChange={(e) => handleChange('romanticGestures', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 3"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Heart size={16} />
              Jealousy Level (1-10)
            </label>
            <select
              value={coupleData.jealousyLevel}
              onChange={(e) => handleChange('jealousyLevel', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num} className="bg-gray-800">{num}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <MessageCircle size={16} />
              Good Morning/Good Night?
            </label>
            <select
              value={coupleData.goodMorningNight}
              onChange={(e) => handleChange('goodMorningNight', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="yes" className="bg-gray-800">Yes</option>
              <option value="no" className="bg-gray-800">No</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <MapPin size={16} />
              Outings per Month
            </label>
            <input
              type="number"
              value={coupleData.outings}
              onChange={(e) => handleChange('outings', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 4"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Laugh size={16} />
              Jokes Shared (per day)
            </label>
            <select
              value={coupleData.jokes}
              onChange={(e) => handleChange('jokes', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num} className="bg-gray-800">{num}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateProbability}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-600 to-red-600 text-white font-semibold rounded-xl hover:from-pink-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-pink-500/25"
          >
            Calculate Breakup Risk 💔
          </button>
          
          {(result || coupleData.timeTogether) && (
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
                  {result.probability}%
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${result.probability}%` }}
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
              <h4 className="text-lg font-semibold text-white mb-4">Risk Level Interpretation</h4>
              <div className="space-y-2">
                {[
                  { range: '0-15%', label: 'Unbreakable Bond', color: 'bg-pink-500' },
                  { range: '16-35%', label: 'Pretty Solid', color: 'bg-red-500' },
                  { range: '36-55%', label: 'Shaky Ground', color: 'bg-orange-500' },
                  { range: '56-75%', label: 'Red Flags', color: 'bg-yellow-500' },
                  { range: '76-100%', label: 'Breakup Imminent', color: 'bg-red-600' }
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
            💕 <strong>Remember:</strong> This is just for fun! Real relationships require communication, 
            understanding, and effort from both partners. Don't take the results too seriously! 💕
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreakupProbability;