import React, { useState } from 'react';
import { Shield, MessageCircle, Dumbbell, Watch, Zap, Heart, Users, MapPin, Volume2, Phone } from 'lucide-react';

const CheatingSuspicion = () => {
  const [formData, setFormData] = useState({
    replySpeed: '',
    phoneLock: 'pin',
    excuses: '',
    gymVisits: 'no',
    moodSwings: 'no',
    hidingSocialMedia: 'no',
    perfumeUpgrade: 'no',
    partyFrequency: 'never',
    maleFriends: 'no',
    topicBoundaries: 'open',
    secretiveCalls: 'no',
    unexplainedAbsences: 'no',
    changedRoutine: 'no'
  });

  const [result, setResult] = useState<{
    score: number;
    message: string;
    description: string;
    color: string;
    bgColor: string;
  } | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateSuspicion = () => {
    // Start with base score
    let score = 30;

    // Reply Speed factor
    const replySpeed = parseFloat(formData.replySpeed) || 0;
    if (replySpeed <= 1) score -= 10; // Instant replies
    else if (replySpeed > 1 && replySpeed <= 30) score += 0; // Minutes
    else if (replySpeed > 30 && replySpeed <= 120) score += 5; // Hours
    else if (replySpeed > 120) score += 15; // Very slow replies

    // Phone Lock Level factor
    switch (formData.phoneLock) {
      case 'none':
        score -= 10;
        break;
      case 'pin':
        score += 0;
        break;
      case 'face':
        score += 10;
        break;
      case 'multiple':
        score += 20;
        break;
    }

    // Excuses factor
    const excuseText = formData.excuses.toLowerCase();
    if (excuseText.includes('busy') || excuseText.includes('work')) score += 5;
    if (excuseText.includes('battery')) score += 7;
    if (excuseText.includes('friend')) score += 10;
    
    // Count unique excuses
    const excuseArray = excuseText.split(/[.,!?]+/).filter(excuse => excuse.trim().length > 0);
    if (excuseArray.length > 3) score += 15;

    // Gym Visits factor (reduced impact)
    if (formData.gymVisits === 'yes') {
      score += 3; // Reduced from 5 to 3
    }

    // Mood Swings factor
    if (formData.moodSwings === 'yes') score += 5;

    // Hiding Social Media factor
    if (formData.hidingSocialMedia === 'yes') score += 10;

    // Perfume Upgrade factor
    if (formData.perfumeUpgrade === 'yes') score += 5;

    // Party Frequency factor
    switch (formData.partyFrequency) {
      case 'never':
        score -= 5;
        break;
      case 'rarely':
        score += 0;
        break;
      case 'sometimes':
        score += 5;
        break;
      case 'often':
        score += 10;
        break;
      case 'regularly':
        score += 15;
        break;
    }

    // Male Friends factor
    if (formData.maleFriends === 'yes') score += 7;

    // Topic Boundaries factor
    switch (formData.topicBoundaries) {
      case 'open':
        score -= 5;
        break;
      case 'limited':
        score += 5;
        break;
      case 'secretive':
        score += 15;
        break;
    }

    // Secretive Calls factor
    if (formData.secretiveCalls === 'yes') score += 12;

    // Unexplained Absences factor
    if (formData.unexplainedAbsences === 'yes') score += 10;

    // Changed Routine factor
    if (formData.changedRoutine === 'yes') score += 8;

    // Cap score between 0 and 100
    score = Math.max(0, Math.min(100, Math.round(score)));

    // Determine message based on score
    let message: string;
    let description: string;
    let color: string;
    let bgColor: string;

    if (score <= 20) {
      message = "🕊️ Pure angel vibes — you're just paranoid.";
      description = "Relax! Your partner is as innocent as a choir boy. Maybe it's time to work on your trust issues?";
      color = "text-green-400";
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30"; // Green background for low scores
    } else if (score <= 40) {
      message = "😇 Mostly innocent, but keep an eye on late-night texting.";
      description = "Everything looks good on the surface, but that midnight phone usage is a bit suspicious. Maybe they're just a night owl?";
      color = "text-blue-400";
      bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30"; // Blue background for low-medium scores
    } else if (score <= 60) {
      message = "😏 Suspicion rising… maybe snoop the Netflix watch history.";
      description = "Things are getting a bit fishy. You might want to casually check what they've been watching when you're not around!";
      color = "text-yellow-400";
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow background for medium scores
    } else if (score <= 80) {
      message = "😬 Red flags detected — maybe you should hire Sherlock.";
      description = "Houston, we have a problem! Time to put on your detective hat and start investigating those mysterious activities!";
      color = "text-orange-400";
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30"; // Orange background for medium-high scores
    } else {
      message = "💔 Certified Cheater Vibes — start practicing your breakup speech (just kidding… maybe).";
      description = "Yikes! The evidence is stacking up. Either your partner is extremely shady or you're in the wrong relationship!";
      color = "text-red-500";
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30"; // Red background for high scores
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
    setFormData({
      replySpeed: '',
      phoneLock: 'pin',
      excuses: '',
      gymVisits: 'no',
      moodSwings: 'no',
      hidingSocialMedia: 'no',
      perfumeUpgrade: 'no',
      partyFrequency: 'never',
      maleFriends: 'no',
      topicBoundaries: 'open',
      secretiveCalls: 'no',
      unexplainedAbsences: 'no',
      changedRoutine: 'no'
    });
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Zap size={48} className="mx-auto text-yellow-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Cheating Suspicion Score</h2>
        <p className="text-purple-200">Find out if your partner is secretly plotting against you!</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <MessageCircle size={16} />
              Avg. Reply Speed
            </label>
            <input
              type="text"
              value={formData.replySpeed}
              onChange={(e) => handleChange('replySpeed', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 30 (minutes) or 2 (hours)"
            />
            <p className="text-purple-400 text-xs mt-1">Enter time in minutes or hours</p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Shield size={16} />
              Phone Lock Level
            </label>
            <select
              value={formData.phoneLock}
              onChange={(e) => handleChange('phoneLock', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="none" className="bg-gray-800">No Lock</option>
              <option value="pin" className="bg-gray-800">Simple PIN</option>
              <option value="face" className="bg-gray-800">Face ID / Pattern</option>
              <option value="multiple" className="bg-gray-800">Multiple Locks / Vault Apps</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <MessageCircle size={16} />
              Recent Excuses Used
            </label>
            <textarea
              value={formData.excuses}
              onChange={(e) => handleChange('excuses', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 'Working late', 'Phone battery died', 'With friends' (separate with commas)"
              rows={3}
            />
            <p className="text-purple-400 text-xs mt-1">Separate multiple excuses with commas</p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Dumbbell size={16} />
              Sudden Gym Visits?
            </label>
            <select
              value={formData.gymVisits}
              onChange={(e) => handleChange('gymVisits', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="no" className="bg-gray-800">No</option>
              <option value="yes" className="bg-gray-800">Yes</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Watch size={16} />
              Mood Swings?
            </label>
            <select
              value={formData.moodSwings}
              onChange={(e) => handleChange('moodSwings', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="no" className="bg-gray-800">No</option>
              <option value="yes" className="bg-gray-800">Yes</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Shield size={16} />
              Hiding Social Media?
            </label>
            <select
              value={formData.hidingSocialMedia}
              onChange={(e) => handleChange('hidingSocialMedia', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="no" className="bg-gray-800">No</option>
              <option value="yes" className="bg-gray-800">Yes</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Heart size={16} />
              Sudden Perfume/Cologne Upgrade?
            </label>
            <select
              value={formData.perfumeUpgrade}
              onChange={(e) => handleChange('perfumeUpgrade', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="no" className="bg-gray-800">No</option>
              <option value="yes" className="bg-gray-800">Yes</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Volume2 size={16} />
              Party Frequency
            </label>
            <select
              value={formData.partyFrequency}
              onChange={(e) => handleChange('partyFrequency', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="never" className="bg-gray-800">Never</option>
              <option value="rarely" className="bg-gray-800">Rarely</option>
              <option value="sometimes" className="bg-gray-800">Sometimes</option>
              <option value="often" className="bg-gray-800">Often</option>
              <option value="regularly" className="bg-gray-800">Regularly</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Users size={16} />
              New Male Friends?
            </label>
            <select
              value={formData.maleFriends}
              onChange={(e) => handleChange('maleFriends', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="no" className="bg-gray-800">No</option>
              <option value="yes" className="bg-gray-800">Yes</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <MessageCircle size={16} />
              Topic Boundaries
            </label>
            <select
              value={formData.topicBoundaries}
              onChange={(e) => handleChange('topicBoundaries', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="open" className="bg-gray-800">Open & Transparent</option>
              <option value="limited" className="bg-gray-800">Somewhat Private</option>
              <option value="secretive" className="bg-gray-800">Very Secretive</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Phone size={16} />
              Secretive Calls?
            </label>
            <select
              value={formData.secretiveCalls}
              onChange={(e) => handleChange('secretiveCalls', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="no" className="bg-gray-800">No</option>
              <option value="yes" className="bg-gray-800">Yes</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <MapPin size={16} />
              Unexplained Absences?
            </label>
            <select
              value={formData.unexplainedAbsences}
              onChange={(e) => handleChange('unexplainedAbsences', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="no" className="bg-gray-800">No</option>
              <option value="yes" className="bg-gray-800">Yes</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Watch size={16} />
              Changed Daily Routine?
            </label>
            <select
              value={formData.changedRoutine}
              onChange={(e) => handleChange('changedRoutine', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="no" className="bg-gray-800">No</option>
              <option value="yes" className="bg-gray-800">Yes</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateSuspicion}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-xl hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
          >
            Calculate Suspicion Score 🔍
          </button>
          
          {(result || Object.values(formData).some(value => value !== '' && value !== 'no' && value !== 'never' && value !== 'pin' && value !== 'open')) && (
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
              <Watch className="mx-auto text-yellow-400 mb-4" size={48} />
              
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
              
              <h4 className={`text-2xl font-bold mb-3 ${result.color}`}>
                {result.message}
              </h4>
              
              <p className="text-purple-200 leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-4">Suspicion Level Guide</h4>
              <div className="space-y-2">
                {[
                  { range: '0-20%', label: 'Pure Angel', color: 'bg-green-500' },
                  { range: '21-40%', label: 'Mostly Innocent', color: 'bg-blue-500' },
                  { range: '41-60%', label: 'Suspicion Rising', color: 'bg-yellow-500' },
                  { range: '61-80%', label: 'Red Flags', color: 'bg-orange-500' },
                  { range: '81-100%', label: 'Certified Cheater', color: 'bg-red-500' }
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
            🔍 <strong>Disclaimer:</strong> This is just for fun! Don't take relationship advice from a calculator. 
            Real trust issues should be addressed through honest communication, not suspicious algorithms! 🔍
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheatingSuspicion;