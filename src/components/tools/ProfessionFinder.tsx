import React, { useState } from 'react';
import { User, Brain, Users, Coffee, Heart, TrendingUp, Camera, Code, Music, Target, GraduationCap } from 'lucide-react';

// Define question types
type Question = {
  id: string;
  text: string;
  options: { value: number; label: string }[];
};

// Define profession types with categories
type Profession = {
  name: string;
  category: string;
  traits: {
    creative: number;
    logical: number;
    social: number;
    introvert: number;
    leader: number;
    follower: number;
    stable: number;
    riskTaker: number;
    handsOn: number;
    theoretical: number;
  };
  description: string;
};

const ProfessionFinder = () => {
  // More serious, career-focused questions
  const questions: Question[] = [
    {
      id: 'workEnvironment',
      text: 'What type of work environment do you prefer?',
      options: [
        { value: -2, label: 'Independent, solitary work' },
        { value: -1, label: 'Mostly independent' },
        { value: 0, label: 'Mixed environment' },
        { value: 1, label: 'Collaborative team setting' },
        { value: 2, label: 'Highly social, people-focused' }
      ]
    },
    {
      id: 'problemSolving',
      text: 'How do you approach problem-solving?',
      options: [
        { value: -2, label: 'Logical, analytical methods' },
        { value: -1, label: 'Mostly logical with some creativity' },
        { value: 0, label: 'Balanced approach' },
        { value: 1, label: 'Creative, innovative solutions' },
        { value: 2, label: 'Intuitive, gut-feeling based' }
      ]
    },
    {
      id: 'stressManagement',
      text: 'How do you handle work pressure and deadlines?',
      options: [
        { value: -2, label: 'Become anxious, struggle to focus' },
        { value: -1, label: 'Feel stressed but manage' },
        { value: 0, label: 'Handle pressure reasonably well' },
        { value: 1, label: 'Perform well under pressure' },
        { value: 2, label: 'Thrive in high-pressure environments' }
      ]
    },
    {
      id: 'communication',
      text: 'How comfortable are you with public speaking or presentations?',
      options: [
        { value: -2, label: 'Very uncomfortable, avoid when possible' },
        { value: -1, label: 'Somewhat uncomfortable' },
        { value: 0, label: 'Neutral, depends on the situation' },
        { value: 1, label: 'Comfortable in most situations' },
        { value: 2, label: 'Very comfortable, even enjoy it' }
      ]
    },
    {
      id: 'leadership',
      text: 'What is your preferred leadership style?',
      options: [
        { value: -2, label: 'Prefer to work under direction' },
        { value: -1, label: 'Support team leaders' },
        { value: 0, label: 'Flexible, can lead or follow' },
        { value: 1, label: 'Take initiative when needed' },
        { value: 2, label: 'Naturally take charge of situations' }
      ]
    },
    {
      id: 'workSetting',
      text: 'Where would you prefer to work?',
      options: [
        { value: -2, label: 'Indoor office environment' },
        { value: -1, label: 'Mostly indoors with occasional outdoor' },
        { value: 0, label: 'Mix of indoor and outdoor' },
        { value: 1, label: 'Outdoor field work occasionally' },
        { value: 2, label: 'Primarily outdoor or field-based' }
      ]
    },
    {
      id: 'careerMotivation',
      text: 'What is most important to you in a career?',
      options: [
        { value: -2, label: 'Job security and stability' },
        { value: -1, label: 'Work-life balance' },
        { value: 0, label: 'Balance of factors' },
        { value: 1, label: 'Growth opportunities' },
        { value: 2, label: 'High earning potential' }
      ]
    },
    {
      id: 'workStructure',
      text: 'How do you prefer to structure your workday?',
      options: [
        { value: -2, label: 'Highly structured, predictable routine' },
        { value: -1, label: 'Mostly structured with some flexibility' },
        { value: 0, label: 'Balanced structure and flexibility' },
        { value: 1, label: 'Flexible schedule with varied tasks' },
        { value: 2, label: 'Highly dynamic, unpredictable' }
      ]
    },
    {
      id: 'skillLevel',
      text: 'How would you rate your current skill level in your field of interest?',
      options: [
        { value: 1, label: 'Beginner' },
        { value: 2, label: 'Basic understanding' },
        { value: 3, label: 'Moderate proficiency' },
        { value: 4, label: 'Advanced skills' },
        { value: 5, label: 'Expert level' }
      ]
    },
    {
      id: 'careerGoals',
      text: 'What drives your career decisions most?',
      options: [
        { value: -2, label: 'Personal fulfillment' },
        { value: -1, label: 'Helping others/society' },
        { value: 0, label: 'Professional development' },
        { value: 1, label: 'Innovation/creativity' },
        { value: 2, label: 'Financial success' }
      ]
    }
  ];

  // Profession database
  const professions: Profession[] = [
    // Technical & Engineering
    { name: 'Software Engineer', category: 'Technology', traits: { creative: 5, logical: 9, social: 4, introvert: 7, leader: 5, follower: 5, stable: 7, riskTaker: 3, handsOn: 8, theoretical: 8 }, description: 'Design, develop, and maintain software systems and applications.' },
    { name: 'Data Scientist', category: 'Technology', traits: { creative: 4, logical: 10, social: 3, introvert: 8, leader: 6, follower: 4, stable: 8, riskTaker: 2, handsOn: 6, theoretical: 9 }, description: 'Analyze complex data to extract insights and inform business decisions.' },
    { name: 'Cybersecurity Analyst', category: 'Technology', traits: { creative: 6, logical: 9, social: 3, introvert: 7, leader: 5, follower: 5, stable: 8, riskTaker: 3, handsOn: 7, theoretical: 8 }, description: 'Protect organizations from cyber threats and security breaches.' },
    { name: 'Mechanical Engineer', category: 'Engineering', traits: { creative: 6, logical: 9, social: 5, introvert: 6, leader: 6, follower: 4, stable: 7, riskTaker: 4, handsOn: 8, theoretical: 8 }, description: 'Design and develop mechanical systems and machinery.' },
    { name: 'Civil Engineer', category: 'Engineering', traits: { creative: 5, logical: 8, social: 6, introvert: 5, leader: 7, follower: 3, stable: 8, riskTaker: 3, handsOn: 7, theoretical: 7 }, description: 'Plan, design, and oversee construction and maintenance of infrastructure.' },
    
    // Healthcare
    { name: 'Physician', category: 'Healthcare', traits: { creative: 5, logical: 9, social: 8, introvert: 4, leader: 8, follower: 2, stable: 7, riskTaker: 6, handsOn: 9, theoretical: 9 }, description: 'Diagnose and treat illnesses, provide medical care to patients.' },
    { name: 'Nurse', category: 'Healthcare', traits: { creative: 5, logical: 7, social: 9, introvert: 3, leader: 6, follower: 6, stable: 8, riskTaker: 4, handsOn: 9, theoretical: 6 }, description: 'Provide patient care, administer treatments, and educate patients.' },
    { name: 'Psychologist', category: 'Healthcare', traits: { creative: 6, logical: 8, social: 8, introvert: 5, leader: 5, follower: 5, stable: 7, riskTaker: 2, handsOn: 4, theoretical: 9 }, description: 'Study human behavior and mental processes, provide therapy.' },
    
    // Business & Finance
    { name: 'Financial Analyst', category: 'Business', traits: { creative: 3, logical: 9, social: 6, introvert: 6, leader: 6, follower: 4, stable: 8, riskTaker: 5, handsOn: 5, theoretical: 8 }, description: 'Analyze financial data to guide investment decisions.' },
    { name: 'Marketing Manager', category: 'Business', traits: { creative: 7, logical: 6, social: 9, introvert: 2, leader: 8, follower: 2, stable: 5, riskTaker: 7, handsOn: 7, theoretical: 6 }, description: 'Develop strategies to promote products and services.' },
    { name: 'Project Manager', category: 'Business', traits: { creative: 6, logical: 7, social: 8, introvert: 3, leader: 9, follower: 1, stable: 7, riskTaker: 6, handsOn: 7, theoretical: 7 }, description: 'Plan, execute, and oversee projects to completion.' },
    
    // Education
    { name: 'High School Teacher', category: 'Education', traits: { creative: 6, logical: 6, social: 8, introvert: 3, leader: 6, follower: 4, stable: 8, riskTaker: 2, handsOn: 7, theoretical: 7 }, description: 'Educate students in specific subject areas, develop curriculum.' },
    { name: 'University Professor', category: 'Education', traits: { creative: 6, logical: 8, social: 5, introvert: 6, leader: 5, follower: 5, stable: 8, riskTaker: 3, handsOn: 4, theoretical: 9 }, description: 'Teach at university level, conduct research, publish findings.' },
    
    // Creative & Media
    { name: 'Graphic Designer', category: 'Creative', traits: { creative: 9, logical: 5, social: 5, introvert: 6, leader: 4, follower: 6, stable: 5, riskTaker: 6, handsOn: 8, theoretical: 4 }, description: 'Create visual concepts to communicate ideas and information.' },
    { name: 'Journalist', category: 'Media', traits: { creative: 7, logical: 6, social: 8, introvert: 3, leader: 6, follower: 4, stable: 4, riskTaker: 7, handsOn: 8, theoretical: 6 }, description: 'Research and report news stories for various media outlets.' },
    
    // Skilled Trades
    { name: 'Electrician', category: 'Trades', traits: { creative: 4, logical: 8, social: 5, introvert: 6, leader: 6, follower: 4, stable: 8, riskTaker: 5, handsOn: 10, theoretical: 6 }, description: 'Install and maintain electrical systems in buildings.' },
    { name: 'Chef', category: 'Hospitality', traits: { creative: 8, logical: 6, social: 7, introvert: 4, leader: 7, follower: 3, stable: 5, riskTaker: 7, handsOn: 10, theoretical: 5 }, description: 'Plan menus, prepare meals, manage kitchen operations.' },
    
    // Public Service
    { name: 'Lawyer', category: 'Legal', traits: { creative: 5, logical: 9, social: 8, introvert: 3, leader: 8, follower: 2, stable: 7, riskTaker: 6, handsOn: 6, theoretical: 9 }, description: 'Advise clients on legal matters, represent in court.' },
    { name: 'Police Officer', category: 'Public Service', traits: { creative: 4, logical: 7, social: 7, introvert: 4, leader: 7, follower: 3, stable: 7, riskTaker: 8, handsOn: 9, theoretical: 5 }, description: 'Protect and serve the community, enforce laws.' }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  const [results, setResults] = useState<{profession: Profession, score: number, match: number, bgColor: string}[] | null>(null);
  const [name, setName] = useState('');

  const handleAnswer = (value: number) => {
    const questionId = questions[currentQuestionIndex].id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    // Calculate trait scores based on answers
    let creative = 0;
    let logical = 0;
    let social = 0;
    let introvert = 0;
    let leader = 0;
    let follower = 0;
    let stable = 0;
    let riskTaker = 0;
    let handsOn = 0;
    let theoretical = 0;

    // Process answers to calculate trait scores
    Object.entries(answers).forEach(([questionId, value]) => {
      switch(questionId) {
        case 'workEnvironment':
          social += value;
          introvert -= value;
          break;
        case 'problemSolving':
          logical += value > 0 ? value : -value;
          creative += value > 0 ? value : -value;
          break;
        case 'stressManagement':
          stable += value > 0 ? value : -value;
          riskTaker += value;
          break;
        case 'communication':
          social += value;
          introvert -= value;
          break;
        case 'leadership':
          leader += value;
          follower -= value;
          break;
        case 'workSetting':
          handsOn += value;
          break;
        case 'careerMotivation':
          stable += value < 0 ? -value : value;
          riskTaker += value;
          break;
        case 'workStructure':
          stable += value < 0 ? -value : value;
          break;
        case 'skillLevel':
          handsOn += value;
          theoretical += value;
          break;
        case 'careerGoals':
          stable += value < 0 ? -value : value;
          riskTaker += value;
          break;
      }
    });

    // Normalize scores to 1-10 scale
    const normalize = (value: number) => Math.max(1, Math.min(10, Math.round((value + 20) / 4)));

    creative = normalize(creative);
    logical = normalize(logical);
    social = normalize(social);
    introvert = normalize(introvert);
    leader = normalize(leader);
    follower = normalize(follower);
    stable = normalize(stable);
    riskTaker = normalize(riskTaker);
    handsOn = normalize(handsOn);
    theoretical = normalize(theoretical);

    // Calculate profession matches
    const professionScores = professions.map(profession => {
      const score = 
        Math.abs(profession.traits.creative - creative) +
        Math.abs(profession.traits.logical - logical) +
        Math.abs(profession.traits.social - social) +
        Math.abs(profession.traits.introvert - introvert) +
        Math.abs(profession.traits.leader - leader) +
        Math.abs(profession.traits.follower - follower) +
        Math.abs(profession.traits.stable - stable) +
        Math.abs(profession.traits.riskTaker - riskTaker) +
        Math.abs(profession.traits.handsOn - handsOn) +
        Math.abs(profession.traits.theoretical - theoretical);
      
      // Convert to match percentage (lower score = better match)
      const maxScore = 90; // Maximum possible difference (9 traits * 10 max difference)
      const match = Math.round(100 - (score / maxScore * 100));
      
      // Determine background color based on match percentage
      let bgColor = "from-gray-600/20 to-gray-800/20 border-gray-500/30"; // Default gray
      if (match >= 90) {
        bgColor = "from-green-600/20 to-green-800/20 border-green-500/30"; // Excellent match
      } else if (match >= 80) {
        bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30"; // Great match
      } else if (match >= 70) {
        bgColor = "from-purple-600/20 to-purple-800/20 border-purple-500/30"; // Good match
      } else if (match >= 60) {
        bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Fair match
      } else if (match >= 50) {
        bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30"; // Moderate match
      } else {
        bgColor = "from-red-600/20 to-red-800/20 border-red-500/30"; // Low match
      }
      
      return { profession, score, match, bgColor };
    });

    // Sort by score and take top 3
    professionScores.sort((a, b) => b.score - a.score);
    setResults(professionScores.slice(0, 3));
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResults(null);
    setName('');
  };

  const getProfessionalCommentary = (profession: string) => {
    const commentaries: {[key: string]: string} = {
      'Software Engineer': `With your analytical mind and problem-solving skills, you're well-suited for a career in software engineering. Your attention to detail and logical thinking will serve you well in this field.`,
      'Data Scientist': `Your strong analytical abilities and comfort with complex information make you an excellent candidate for data science. You have the skills to turn raw data into meaningful insights.`,
      'Physician': `Your combination of empathy, analytical thinking, and leadership qualities suggests a career in medicine would be fulfilling for you. You have what it takes to make a real difference in people's lives.`,
      'Teacher': `Your communication skills and ability to work with others point to a rewarding career in education. You have the patience and knowledge-sharing ability that makes great teachers.`,
      'Project Manager': `Your leadership qualities and organizational skills make project management an ideal career path. You have the ability to coordinate teams and drive projects to successful completion.`,
      'Chef': `Your creativity and hands-on approach suggest a career in culinary arts would be fulfilling. You have the passion and skill to create memorable dining experiences for others.`,
      'Financial Analyst': `Your analytical mind and interest in stability point to a strong fit in finance. You have the skills to analyze markets and guide important financial decisions.`,
      'Graphic Designer': `Your creative vision and attention to detail make graphic design an excellent career choice. You have the artistic ability to communicate ideas through visual media.`,
      'Lawyer': `Your analytical thinking and communication skills suggest a legal career would suit you well. You have the argumentative skills and attention to detail needed in the legal profession.`,
      'Engineer': `Your problem-solving abilities and logical approach make engineering a natural fit. You have the technical mindset needed to design and build innovative solutions.`
    };
    
    return commentaries[profession] || `Based on your profile, ${profession} aligns well with your skills and personality traits. This career path would allow you to leverage your strengths effectively.`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technology': return <Code className="text-blue-400" size={20} />;
      case 'Engineering': return <Target className="text-gray-400" size={20} />;
      case 'Healthcare': return <Heart className="text-red-400" size={20} />;
      case 'Business': return <TrendingUp className="text-green-400" size={20} />;
      case 'Education': return <GraduationCap className="text-purple-400" size={20} />;
      case 'Creative': return <Music className="text-pink-400" size={20} />;
      case 'Media': return <Coffee className="text-orange-400" size={20} />;
      case 'Trades': return <Tool className="text-yellow-400" size={20} />;
      case 'Hospitality': return <Users className="text-teal-400" size={20} />;
      case 'Legal': return <Scale className="text-indigo-400" size={20} />;
      case 'Public Service': return <Shield className="text-cyan-400" size={20} />;
      default: return <Target className="text-gray-400" size={20} />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <GraduationCap size={48} className="mx-auto text-purple-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Career Path Finder</h2>
        <p className="text-purple-200">Discover which career aligns with your skills and personality</p>
      </div>

      <div className="space-y-6">
        {!results ? (
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/30">
            {currentQuestionIndex === 0 ? (
              <div className="text-center space-y-6">
                <div>
                  <label className="block text-purple-300 text-sm font-medium mb-2">
                    Your Name (optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full max-w-md mx-auto px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
                
                <p className="text-purple-200">
                  Answer 10 career-focused questions to discover your ideal profession based on your skills and personality traits.
                </p>
                
                <button
                  onClick={() => setCurrentQuestionIndex(1)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  Start Career Assessment
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">
                    Question {currentQuestionIndex} of {questions.length}
                  </h3>
                  <div className="text-purple-300 text-sm">
                    {Math.round((currentQuestionIndex / questions.length) * 100)}% Complete
                  </div>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
                  />
                </div>
                
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-white">
                    {questions[currentQuestionIndex - 1].text}
                  </h4>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {questions[currentQuestionIndex - 1].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option.value)}
                        className="px-4 py-3 text-left bg-white/5 border border-purple-500/30 rounded-xl text-white hover:bg-white/10 hover:border-purple-400 transition-all duration-300"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                {name ? `${name}, ` : ''}Your Career Recommendations
              </h3>
              <p className="text-purple-200">Based on your skills and personality traits, here are your best career matches:</p>
            </div>
            
            <div className="space-y-6">
              {results.map((result, index) => (
                <div 
                  key={index} 
                  className={`bg-gradient-to-r ${result.bgColor} rounded-2xl p-6 border`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-xl">
                      {getCategoryIcon(result.profession.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xl font-bold text-white">{result.profession.name}</h4>
                          <p className="text-purple-300 text-sm mt-1">{result.profession.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-400">{result.match}%</div>
                          <div className="text-purple-300 text-xs">Match</div>
                        </div>
                      </div>
                      
                      <p className="text-purple-200 mt-3">{result.profession.description}</p>
                      
                      <div className="mt-4 p-4 bg-white/5 rounded-xl border border-purple-500/20">
                        <p className="text-white">
                          {getProfessionalCommentary(result.profession.name)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={resetQuiz}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                Retake Assessment
              </button>
              
              <button
                onClick={() => {
                  // Simple share functionality
                  const text = `I took the Career Path Finder assessment and my best match is ${results[0].profession.name}! What's yours?`;
                  navigator.clipboard.writeText(text);
                  alert('Share text copied to clipboard!');
                }}
                className="px-6 py-3 bg-white/10 text-purple-300 border border-purple-500/30 rounded-xl hover:bg-white/20 hover:text-white transition-all duration-300"
              >
                Share Results
              </button>
            </div>
          </div>
        )}
        
        <div className="bg-purple-500/10 rounded-2xl p-4 border border-purple-500/20">
          <p className="text-purple-300 text-sm text-center">
            🎓 <strong>Important:</strong> This assessment provides guidance only. Real career decisions should consider education, 
            skills, market demand, and personal goals. Consult with career counselors for personalized advice. 🎓
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionFinder;