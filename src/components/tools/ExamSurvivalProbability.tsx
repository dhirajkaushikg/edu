import React, { useState } from 'react';
import { BookOpen, Coffee, CheckCircle, XCircle, Clock } from 'lucide-react';

const ExamSurvivalProbability = () => {
  const [examData, setExamData] = useState({
    studyHours: '',
    coffeeCups: '',
    syllabusPercent: '',
    panicLevel: '5'
  });

  const [result, setResult] = useState<{
    score: number;
    label: string;
    description: string;
    color: string;
    bgColor: string;
  } | null>(null);

  const handleChange = (field: string, value: string) => {
    setExamData(prev => ({ ...prev, [field]: value }));
  };

  const calculateSurvivalProbability = () => {
    let survivalScore = 0;

    // Parse inputs
    const studyHours = parseFloat(examData.studyHours) || 0;
    const coffeeCups = parseFloat(examData.coffeeCups) || 0;
    const syllabusPercent = parseFloat(examData.syllabusPercent) || 0;
    const panicLevel = parseInt(examData.panicLevel) || 0;

    // Apply formula
    survivalScore += Math.min(studyHours, 15) * 4;         // max 60 points
    survivalScore += Math.min(coffeeCups, 20) * 2;         // max 40 points
    survivalScore += Math.min(syllabusPercent, 100) * 0.6; // max 60 points
    survivalScore -= panicLevel * 5;                       // reduces up to 50

    // Normalize to 0-100
    survivalScore = Math.max(0, Math.min(100, Math.round(survivalScore)));

    // Determine label and description based on score
    let label: string;
    let description: string;
    let color: string;
    let bgColor: string;

    if (survivalScore >= 81) {
      label = "🎓 Topper Energy – You're about to destroy this exam!";
      description = "You're so prepared, the exam should be worried about you! Walk in there with confidence and show them what you've got!";
      color = "text-green-400";
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30";
    } else if (survivalScore >= 61) {
      label = "📘 Confident Scholar – Chill, you'll pass with style.";
      description = "You've got this in the bag! Your preparation is solid, just stay calm and trust your knowledge.";
      color = "text-blue-400";
      bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30";
    } else if (survivalScore >= 41) {
      label = "🤔 Pray to God – Might scrape through, holy water recommended.";
      description = "It's going to be close! Make sure to get some rest before the exam and double-check your materials.";
      color = "text-yellow-400";
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30";
    } else if (survivalScore >= 21) {
      label = "😭 RIP Bro – Better start writing emotional excuses.";
      description = "This is going to be tough! Focus on the topics you know best and try to stay positive. You might surprise yourself!";
      color = "text-orange-400";
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30";
    } else {
      label = "☠️ Dropout Starter Pack – Exam hall will be your funeral.";
      description = "Brace yourself! You might want to consider some last-minute cramming or at least prepare your 'I tried' speech!";
      color = "text-red-500";
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30";
    }

    setResult({
      score: survivalScore,
      label,
      description,
      color,
      bgColor
    });
  };

  const resetCalculator = () => {
    setExamData({
      studyHours: '',
      coffeeCups: '',
      syllabusPercent: '',
      panicLevel: '5'
    });
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <BookOpen size={48} className="mx-auto text-blue-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Exam Survival Probability Calculator</h2>
        <p className="text-purple-200">Find out your chances of surviving that upcoming exam!</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Clock size={16} />
              Study Hours (per day)
            </label>
            <input
              type="number"
              min="0"
              max="15"
              value={examData.studyHours}
              onChange={(e) => handleChange('studyHours', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 2"
            />
            <p className="text-xs text-purple-400 mt-1">Range: 0-15 hours</p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Coffee size={16} />
              Coffee Cups Consumed
            </label>
            <input
              type="number"
              min="0"
              max="20"
              value={examData.coffeeCups}
              onChange={(e) => handleChange('coffeeCups', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 5"
            />
            <p className="text-xs text-purple-400 mt-1">Range: 0-20 cups</p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <BookOpen size={16} />
              Syllabus Completed (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={examData.syllabusPercent}
              onChange={(e) => handleChange('syllabusPercent', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 40"
            />
            <p className="text-xs text-purple-400 mt-1">Range: 0-100%</p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <XCircle size={16} />
              Last-Minute Panic Level (1-10)
            </label>
            <select
              value={examData.panicLevel}
              onChange={(e) => handleChange('panicLevel', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num} className="bg-gray-800">{num}</option>
              ))}
            </select>
            <p className="text-xs text-purple-400 mt-1">10 = total meltdown</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateSurvivalProbability}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          >
            Calculate Survival Chances 🧠
          </button>
          
          {(result || examData.studyHours) && (
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
              <BookOpen className="mx-auto text-blue-400 mb-4" size={48} />
              
              <div className="relative mb-6">
                <div className="text-6xl font-bold text-blue-400 mb-2">
                  {result.score}%
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-1000"
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
              <h4 className="text-lg font-semibold text-white mb-4">Survival Level Interpretation</h4>
              <div className="space-y-2">
                {[
                  { range: '81-100%', label: 'Topper Energy', color: 'bg-green-500' },
                  { range: '61-80%', label: 'Confident Scholar', color: 'bg-blue-500' },
                  { range: '41-60%', label: 'Pray to God', color: 'bg-yellow-500' },
                  { range: '21-40%', label: 'RIP Bro', color: 'bg-orange-500' },
                  { range: '0-20%', label: 'Dropout Starter Pack', color: 'bg-red-600' }
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
            🎓 <strong>Disclaimer:</strong> This calculator is purely for entertainment purposes! 
            Real exam success comes from consistent study habits and understanding the material. 
            Don't take the results too seriously! 📚
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExamSurvivalProbability;