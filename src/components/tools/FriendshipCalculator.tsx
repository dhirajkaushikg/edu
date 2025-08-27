import React, { useState } from 'react';
import { Users, Star, Heart, Smile } from 'lucide-react';

const FriendshipCalculator = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<{
    percentage: number;
    level: string;
    description: string;
    traits: string[];
    color: string;
    icon: any;
    bgColor: string;
  } | null>(null);

  const calculateFriendship = () => {
    if (!name1.trim() || !name2.trim()) return;

    // Algorithm based on name compatibility and character analysis
    const combinedNames = (name1 + name2).toLowerCase().replace(/\s/g, '');
    let sum = 0;
    
    for (let i = 0; i < combinedNames.length; i++) {
      sum += combinedNames.charCodeAt(i);
    }
    
    // Add factors based on name characteristics
    const nameLength = name1.length + name2.length;
    const vowelCount = (name1 + name2).toLowerCase().match(/[aeiou]/g)?.length || 0;
    const consonantCount = (name1 + name2).length - vowelCount;
    
    const modifier = (nameLength % 15) + (vowelCount % 8) + (consonantCount % 12);
    let percentage = (sum + modifier) % 101;
    
    // Ensure it's between 1-100
    if (percentage === 0) percentage = 1;

    let level: string;
    let description: string;
    let traits: string[];
    let color: string;
    let icon: any;
    let bgColor: string;

    if (percentage >= 95) {
      level = "Soul Friends";
      description = "You two are destined to be best friends forever! An unbreakable bond.";
      traits = ["Telepathic connection", "Shared dreams", "Infinite trust", "Perfect understanding"];
      color = "text-pink-400";
      icon = Heart;
      bgColor = "from-pink-600/20 to-pink-800/20 border-pink-500/30"; // Pink background for highest friendship
    } else if (percentage >= 85) {
      level = "Best Friends Forever";
      description = "Amazing friendship! You understand each other perfectly and share incredible memories.";
      traits = ["Deep trust", "Shared interests", "Great communication", "Loyal support"];
      color = "text-purple-400";
      icon = Star;
      bgColor = "from-purple-600/20 to-purple-800/20 border-purple-500/30"; // Purple background for excellent friendship
    } else if (percentage >= 75) {
      level = "Great Friends";
      description = "Wonderful friendship with strong connection and mutual respect.";
      traits = ["Good communication", "Fun together", "Mutual respect", "Shared laughs"];
      color = "text-blue-400";
      icon = Smile;
      bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30"; // Blue background for great friendship
    } else if (percentage >= 65) {
      level = "Good Friends";
      description = "Solid friendship with good compatibility and enjoyable times together.";
      traits = ["Common interests", "Reliable support", "Good times", "Understanding"];
      color = "text-green-400";
      icon = Users;
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30"; // Green background for good friendship
    } else if (percentage >= 55) {
      level = "Casual Friends";
      description = "Nice friendship that's comfortable and easy-going.";
      traits = ["Easy-going", "Occasional hangouts", "Pleasant company", "Light conversations"];
      color = "text-yellow-400";
      icon = Users;
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow background for casual friendship
    } else if (percentage >= 45) {
      level = "Acquaintances";
      description = "You get along well but might need more time to develop a deeper friendship.";
      traits = ["Polite interactions", "Occasional chats", "Respectful", "Potential growth"];
      color = "text-orange-400";
      icon = Users;
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30"; // Orange background for acquaintances
    } else if (percentage >= 35) {
      level = "Distant Friends";
      description = "You're friendly but don't have much in common. Different interests and personalities.";
      traits = ["Different interests", "Occasional contact", "Polite", "Separate circles"];
      color = "text-gray-400";
      icon = Users;
      bgColor = "from-gray-600/20 to-gray-800/20 border-gray-500/30"; // Gray background for distant friends
    } else {
      level = "Different Wavelengths";
      description = "You're both great people, just on different wavelengths. That's perfectly okay!";
      traits = ["Different perspectives", "Unique personalities", "Separate paths", "Individual strengths"];
      color = "text-red-400";
      icon = Users;
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30"; // Red background for different wavelengths
    }

    setResult({
      percentage,
      level,
      description,
      traits,
      color,
      icon,
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
        <Users size={48} className="mx-auto text-blue-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Friendship Calculator</h2>
        <p className="text-purple-200">Discover the strength of friendship between two people</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Users size={16} />
              First Friend's Name
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
              Second Friend's Name
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
            onClick={calculateFriendship}
            disabled={!name1.trim() || !name2.trim()}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Calculate Friendship 🤝
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
              <result.icon className="mx-auto text-blue-400 mb-4" size={48} />
              
              <h3 className="text-2xl font-bold text-white mb-2">
                {name1} 🤝 {name2}
              </h3>
              
              <div className="relative mb-6">
                <div className="text-6xl font-bold text-blue-400 mb-2">
                  {result.percentage}%
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${result.percentage}%` }}
                  />
                </div>
              </div>
              
              <h4 className={`text-2xl font-bold mb-3 ${result.color}`}>
                {result.level}
              </h4>
              
              <p className="text-purple-200 leading-relaxed mb-4">
                {result.description}
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-4">Friendship Traits</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.traits.map((trait, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                    <Star size={16} className="text-yellow-400" />
                    <span className="text-purple-200 text-sm">{trait}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-4">Friendship Levels</h4>
              <div className="space-y-2">
                {[
                  { range: '95-100%', label: 'Soul Friends', color: 'bg-pink-500' },
                  { range: '85-94%', label: 'Best Friends Forever', color: 'bg-purple-500' },
                  { range: '75-84%', label: 'Great Friends', color: 'bg-blue-500' },
                  { range: '65-74%', label: 'Good Friends', color: 'bg-green-500' },
                  { range: '55-64%', label: 'Casual Friends', color: 'bg-yellow-500' },
                  { range: '45-54%', label: 'Acquaintances', color: 'bg-orange-500' },
                  { range: '35-44%', label: 'Distant Friends', color: 'bg-gray-500' },
                  { range: '0-34%', label: 'Different Wavelengths', color: 'bg-red-500' }
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

        <div className="bg-blue-500/10 rounded-2xl p-4 border border-blue-500/20">
          <p className="text-blue-300 text-sm text-center">
            🤝 <strong>Remember:</strong> True friendship is built on trust, understanding, and shared experiences. 
            This is just a fun way to celebrate your friendships! 🤝
          </p>
        </div>
      </div>
    </div>
  );
};

export default FriendshipCalculator;