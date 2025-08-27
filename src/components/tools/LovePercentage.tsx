import React, { useState } from 'react';
import { Heart, Sparkles, Users } from 'lucide-react';

const LovePercentage = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<{
    percentage: number;
    message: string;
    description: string;
    color: string;
    bgColor: string;
  } | null>(null);

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) return;

    // Simple algorithm based on name compatibility
    const combinedNames = (name1 + name2).toLowerCase().replace(/\s/g, '');
    let sum = 0;
    
    for (let i = 0; i < combinedNames.length; i++) {
      sum += combinedNames.charCodeAt(i);
    }
    
    // Add some randomness based on name lengths and characters
    const nameLength = name1.length + name2.length;
    const modifier = (nameLength % 10) + (sum % 20);
    
    let percentage = (sum + modifier) % 101;
    
    // Ensure it's between 1-100
    if (percentage === 0) percentage = 1;

    let message: string;
    let description: string;
    let color: string;
    let bgColor: string;

    if (percentage >= 90) {
      message = "Perfect Match! 💕";
      description = "You two are absolutely meant for each other! This is true love at its finest.";
      color = "text-pink-400";
      bgColor = "from-pink-600/20 to-pink-800/20 border-pink-500/30"; // Pink background for highest compatibility
    } else if (percentage >= 80) {
      message = "Excellent Compatibility! 💖";
      description = "Amazing connection! You complement each other beautifully.";
      color = "text-pink-400";
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30"; // Red background for excellent compatibility
    } else if (percentage >= 70) {
      message = "Great Love! ❤️";
      description = "Strong romantic potential! You have wonderful chemistry together.";
      color = "text-red-400";
      bgColor = "from-purple-600/20 to-purple-800/20 border-purple-500/30"; // Purple background for great love
    } else if (percentage >= 60) {
      message = "Good Match! 💗";
      description = "Nice compatibility! With effort, this could blossom into something beautiful.";
      color = "text-purple-400";
      bgColor = "from-indigo-600/20 to-indigo-800/20 border-indigo-500/30"; // Indigo background for good match
    } else if (percentage >= 50) {
      message = "Decent Compatibility 💜";
      description = "There's potential here! Focus on building your connection.";
      color = "text-purple-400";
      bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30"; // Blue background for decent compatibility
    } else if (percentage >= 40) {
      message = "Moderate Connection 💙";
      description = "Some challenges ahead, but love can overcome obstacles with patience.";
      color = "text-blue-400";
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30"; // Green background for moderate connection
    } else if (percentage >= 30) {
      message = "Friendship First 💚";
      description = "Better as friends for now. Sometimes the best relationships start as friendships!";
      color = "text-green-400";
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow background for friendship first
    } else {
      message = "Different Paths 💛";
      description = "You're both wonderful people, just maybe not romantically compatible.";
      color = "text-yellow-400";
      bgColor = "from-gray-600/20 to-gray-800/20 border-gray-500/30"; // Gray background for different paths
    }

    setResult({
      percentage,
      message,
      description,
      color,
      bgColor
    });
  };

  const resetCalculator = () => {
    setName1('');
    setName2('');
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Heart size={48} className="mx-auto text-pink-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Love Percentage Calculator</h2>
        <p className="text-purple-200">Discover the love compatibility between two people</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Users size={16} />
              First Person's Name
            </label>
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Users size={16} />
              Second Person's Name
            </label>
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="Enter second name"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateLove}
            disabled={!name1.trim() || !name2.trim()}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Calculate Love ❤️
          </button>
          
          {result && (
            <button
              onClick={resetCalculator}
              className="px-6 py-3 bg-white/10 text-purple-300 border border-purple-500/30 rounded-xl hover:bg-white/20 hover:text-white transition-all duration-300"
            >
              Try Again
            </button>
          )}
        </div>

        {result && (
          <div className="space-y-6">
            <div className={`bg-gradient-to-r ${result.bgColor} rounded-2xl p-8 border text-center`}>
              <Sparkles className="mx-auto text-pink-400 mb-4" size={48} />
              
              <h3 className="text-2xl font-bold text-white mb-2">
                {name1} ❤️ {name2}
              </h3>
              
              <div className="relative mb-6">
                <div className="text-6xl font-bold text-pink-400 mb-2">
                  {result.percentage}%
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${result.percentage}%` }}
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
              <h4 className="text-lg font-semibold text-white mb-4">Love Compatibility Scale</h4>
              <div className="space-y-2">
                {[
                  { range: '90-100%', label: 'Perfect Match', color: 'bg-pink-500' },
                  { range: '80-89%', label: 'Excellent', color: 'bg-red-500' },
                  { range: '70-79%', label: 'Great Love', color: 'bg-purple-500' },
                  { range: '60-69%', label: 'Good Match', color: 'bg-indigo-500' },
                  { range: '50-59%', label: 'Decent', color: 'bg-blue-500' },
                  { range: '40-49%', label: 'Moderate', color: 'bg-green-500' },
                  { range: '30-39%', label: 'Friendship', color: 'bg-yellow-500' },
                  { range: '0-29%', label: 'Different Paths', color: 'bg-gray-500' }
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
            💕 <strong>Remember:</strong> This is just for fun! True love is built on understanding, 
            respect, and genuine connection, not algorithms! 💕
          </p>
        </div>
      </div>
    </div>
  );
};

export default LovePercentage;