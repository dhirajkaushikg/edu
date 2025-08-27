import React, { useState } from 'react';
import { Heart, Brain, Zap, Smile, Shield, Users, Star, RefreshCw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: { text: string; traits: string[] }[];
}

interface TraitResult {
  name: string;
  score: number;
  icon: any;
  color: string;
  description: string;
}

const CharacterChecker = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [traitScores, setTraitScores] = useState<{ [key: string]: number }>({});

  const questions: Question[] = [
    {
      id: 1,
      question: "When faced with a difficult decision, you:",
      options: [
        { text: "Think it through logically and analyze all options", traits: ["Logical", "Analytical"] },
        { text: "Follow your heart and intuition", traits: ["Emotional", "Intuitive"] },
        { text: "Ask friends and family for advice", traits: ["Social", "Caring"] },
        { text: "Take immediate action without overthinking", traits: ["Brave", "Impulsive"] }
      ]
    },
    {
      id: 2,
      question: "At a party, you're most likely to:",
      options: [
        { text: "Be the center of attention, making everyone laugh", traits: ["Playful", "Social"] },
        { text: "Have deep conversations with a few people", traits: ["Thoughtful", "Emotional"] },
        { text: "Help organize games or activities", traits: ["Leader", "Caring"] },
        { text: "Observe and analyze people's behavior", traits: ["Analytical", "Observant"] }
      ]
    },
    {
      id: 3,
      question: "When someone disagrees with you, you:",
      options: [
        { text: "Listen carefully and try to understand their perspective", traits: ["Empathetic", "Caring"] },
        { text: "Present logical arguments to prove your point", traits: ["Logical", "Determined"] },
        { text: "Get emotionally invested in defending your view", traits: ["Passionate", "Emotional"] },
        { text: "Enjoy the intellectual challenge of the debate", traits: ["Competitive", "Analytical"] }
      ]
    },
    {
      id: 4,
      question: "Your ideal weekend activity is:",
      options: [
        { text: "Reading a good book or learning something new", traits: ["Intellectual", "Thoughtful"] },
        { text: "Going on an adventure or trying something new", traits: ["Adventurous", "Brave"] },
        { text: "Spending quality time with loved ones", traits: ["Caring", "Social"] },
        { text: "Playing games or engaging in fun activities", traits: ["Playful", "Competitive"] }
      ]
    },
    {
      id: 5,
      question: "When you see someone struggling, you:",
      options: [
        { text: "Immediately offer help and support", traits: ["Caring", "Empathetic"] },
        { text: "Give them space to figure it out themselves", traits: ["Respectful", "Independent"] },
        { text: "Analyze the situation to offer the best solution", traits: ["Logical", "Helpful"] },
        { text: "Share your own similar experiences", traits: ["Emotional", "Social"] }
      ]
    },
    {
      id: 6,
      question: "In a crisis situation, you:",
      options: [
        { text: "Stay calm and take charge", traits: ["Leader", "Brave"] },
        { text: "Support others emotionally", traits: ["Caring", "Empathetic"] },
        { text: "Find creative solutions to problems", traits: ["Creative", "Resourceful"] },
        { text: "Follow instructions from someone more experienced", traits: ["Wise", "Humble"] }
      ]
    },
    {
      id: 7,
      question: "Your friends would describe you as:",
      options: [
        { text: "The reliable one who's always there", traits: ["Loyal", "Caring"] },
        { text: "The fun one who brings energy to everything", traits: ["Playful", "Energetic"] },
        { text: "The wise one who gives great advice", traits: ["Wise", "Thoughtful"] },
        { text: "The brave one who takes on challenges", traits: ["Brave", "Determined"] }
      ]
    },
    {
      id: 8,
      question: "When you make mistakes, you:",
      options: [
        { text: "Learn from them and move forward quickly", traits: ["Resilient", "Wise"] },
        { text: "Feel deeply about them but use the emotion to grow", traits: ["Emotional", "Growth-minded"] },
        { text: "Analyze what went wrong to prevent it next time", traits: ["Logical", "Analytical"] },
        { text: "Share the experience to help others avoid similar mistakes", traits: ["Caring", "Social"] }
      ]
    },
    {
      id: 9,
      question: "Your approach to new experiences is:",
      options: [
        { text: "Embrace them with excitement and curiosity", traits: ["Adventurous", "Curious"] },
        { text: "Carefully evaluate risks and benefits first", traits: ["Cautious", "Logical"] },
        { text: "Enjoy them more when shared with others", traits: ["Social", "Caring"] },
        { text: "See them as opportunities for personal growth", traits: ["Growth-minded", "Thoughtful"] }
      ]
    },
    {
      id: 10,
      question: "What motivates you most?",
      options: [
        { text: "Making a positive impact on others' lives", traits: ["Caring", "Purpose-driven"] },
        { text: "Achieving personal goals and success", traits: ["Ambitious", "Determined"] },
        { text: "Understanding how things work and why", traits: ["Curious", "Logical"] },
        { text: "Creating joy and happiness in everyday moments", traits: ["Playful", "Positive"] }
      ]
    }
  ];

  const traits = {
    Logical: { icon: Brain, color: 'text-blue-400', description: 'You approach life with reason and analysis' },
    Emotional: { icon: Heart, color: 'text-pink-400', description: 'You feel deeply and connect with others emotionally' },
    Brave: { icon: Shield, color: 'text-red-400', description: 'You face challenges head-on with courage' },
    Playful: { icon: Smile, color: 'text-yellow-400', description: 'You bring joy and fun to every situation' },
    Caring: { icon: Heart, color: 'text-green-400', description: 'You genuinely care about others\' wellbeing' },
    Social: { icon: Users, color: 'text-purple-400', description: 'You thrive in social connections and relationships' },
    Determined: { icon: Zap, color: 'text-orange-400', description: 'You persist through challenges with unwavering focus' },
    Thoughtful: { icon: Brain, color: 'text-indigo-400', description: 'You consider things deeply and meaningfully' }
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = { ...answers, [currentQuestion]: optionIndex };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (allAnswers: { [key: number]: number }) => {
    const scores: { [key: string]: number } = {};

    questions.forEach((question, questionIndex) => {
      const answerIndex = allAnswers[questionIndex];
      if (answerIndex !== undefined) {
        const selectedOption = question.options[answerIndex];
        selectedOption.traits.forEach(trait => {
          scores[trait] = (scores[trait] || 0) + 1;
        });
      }
    });

    setTraitScores(scores);
    setShowResults(true);
  };

  const getTopTraits = (): TraitResult[] => {
    const traitResults = Object.entries(traitScores)
      .map(([name, score]) => ({
        name,
        score,
        icon: traits[name as keyof typeof traits]?.icon || Star,
        color: traits[name as keyof typeof traits]?.color || 'text-gray-400',
        description: traits[name as keyof typeof traits]?.description || 'A unique personality trait'
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    return traitResults;
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTraitScores({});
  };

  if (showResults) {
    const topTraits = getTopTraits();
    const dominantTrait = topTraits[0];
    const secondaryTrait = topTraits[1];

    // Determine background color based on dominant trait
    let bgColor = "from-gray-600/20 to-gray-800/20 border-gray-500/30"; // Default gray
    if (dominantTrait.name === "Logical" || dominantTrait.name === "Thoughtful") {
      bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30"; // Blue for logical/thoughtful
    } else if (dominantTrait.name === "Emotional" || dominantTrait.name === "Caring") {
      bgColor = "from-pink-600/20 to-pink-800/20 border-pink-500/30"; // Pink for emotional/caring
    } else if (dominantTrait.name === "Brave" || dominantTrait.name === "Determined") {
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30"; // Red for brave/determined
    } else if (dominantTrait.name === "Playful") {
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow for playful
    } else if (dominantTrait.name === "Social") {
      bgColor = "from-purple-600/20 to-purple-800/20 border-purple-500/30"; // Purple for social
    }

    return (
      <div className="text-center space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Your Character Analysis</h2>
          <p className="text-purple-200">Based on your responses, here's what we discovered about you:</p>
        </div>

        <div className={`bg-gradient-to-r ${bgColor} rounded-2xl p-8 border`}>
          <div className="flex items-center justify-center mb-6">
            <dominantTrait.icon size={64} className={`${dominantTrait.color} mr-4`} />
            {secondaryTrait && <secondaryTrait.icon size={48} className={`${secondaryTrait.color}`} />}
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3">
            {dominantTrait.name}
            {secondaryTrait && ` + ${secondaryTrait.name}`}
          </h3>
          
          <p className="text-purple-200 mb-4">{dominantTrait.description}</p>
          
          {secondaryTrait && (
            <p className="text-purple-300 text-sm">
              Combined with your {secondaryTrait.name.toLowerCase()} nature: {secondaryTrait.description.toLowerCase()}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topTraits.map((trait, index) => (
            <div key={trait.name} className="bg-white/5 rounded-xl p-4 border border-purple-500/20">
              <trait.icon size={32} className={`${trait.color} mx-auto mb-2`} />
              <h4 className="text-white font-semibold mb-1">{trait.name}</h4>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(trait.score / questions.length) * 100}%` }}
                />
              </div>
              <p className="text-purple-300 text-xs">{trait.score}/{questions.length}</p>
            </div>
          ))}
        </div>

        <button
          onClick={restartTest}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
        >
          <RefreshCw size={20} />
          Take Test Again
        </button>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Character Checker Tool</h2>
        <p className="text-purple-200 mb-6">
          Discover your personality traits through this fun psychological assessment
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-purple-400 text-sm">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <div className="bg-white/5 rounded-2xl p-8 border border-purple-500/20">
        <h3 className="text-xl font-semibold text-white mb-6 leading-relaxed">
          {questions[currentQuestion].question}
        </h3>
        
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full text-left p-4 bg-white/5 hover:bg-white/10 border border-purple-500/20 hover:border-purple-500/40 rounded-xl transition-all duration-300 hover:scale-105 text-white hover:shadow-lg hover:shadow-purple-500/10"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterChecker;