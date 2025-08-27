import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Calculator, Heart, DollarSign, GraduationCap, TrendingUp, BookOpen, ArrowRight, Droplets, Apple, Flame, User, Percent, Zap, Clock, Globe, Users, Shield, Ruler, Scale, Trophy, Gamepad2, Brain } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isDark } = useTheme();
  const featuredTools = [
    {
      name: 'Loan EMI Calculator',
      category: 'finance',
      id: 'loan-emi',
      icon: DollarSign,
      description: 'Calculate your monthly EMI payments',
      color: 'text-green-400'
    },
    {
      name: 'Character Checker',
      category: 'fun',
      id: 'character-checker',
      icon: Heart,
      description: 'Discover your personality traits',
      color: 'text-pink-400'
    },
    {
      name: 'BMI Calculator',
      category: 'health',
      id: 'bmi-calculator',
      icon: Scale,
      description: 'Check your body mass index',
      color: 'text-blue-400'
    },
    {
      name: 'Currency Converter',
      category: 'finance',
      id: 'currency-converter',
      icon: Globe,
      description: 'Convert between currencies',
      color: 'text-yellow-400'
    }
  ];

  const featuredGames = [
    {
      name: 'Math Roast Game',
      id: 'math-roast',
      description: 'Solve math problems fast and get roasted!',
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/20'
    },
    {
      name: 'Tic Tac Toe',
      id: 'tic-tac-toe',
      description: 'Classic X and O game with a modern twist',
      icon: Gamepad2,
      color: 'text-green-600',
      bgColor: 'bg-green-500/20'
    },
    {
      name: 'Memory Flip Game',
      id: 'memory-flip',
      description: 'Test your memory with card matching challenges',
      icon: Brain,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/20'
    },
    {
      name: 'Typing Speed Test',
      id: 'typing-speed',
      description: 'Test your typing speed and accuracy',
      icon: Zap,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Edurance Hub - Free Tools, Games & Calculators</title>
        <meta name="description" content="Edurance Hub offers free tools, games, and calculators for health, finance, education, and entertainment. Explore our collection to enhance your daily life." />
        <meta name="keywords" content="tools, calculators, games, health tools, finance tools, education tools, entertainment, utilities" />
        <meta name="author" content="Edurance Hub" />
        <meta property="og:title" content="Edurance Hub - Free Tools, Games & Calculators" />
        <meta property="og:description" content="Edurance Hub offers free tools, games, and calculators for health, finance, education, and entertainment. Explore our collection to enhance your daily life." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edurancehub.com" />
        <meta property="og:site_name" content="Edurance Hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Edurance Hub - Free Tools, Games & Calculators" />
        <meta name="twitter:description" content="Edurance Hub offers free tools, games, and calculators for health, finance, education, and entertainment. Explore our collection to enhance your daily life." />
        <link rel="canonical" href="https://edurancehub.com" />
      </Helmet>
      
      <div className="space-y-12 animate-fadeIn">
        {/* Hero Section */}
        <section className="text-center py-20 relative overflow-hidden">
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-20">
            {/* Horizontal lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse shadow-sm shadow-purple-400/50"></div>
            <div className="absolute top-16 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse delay-1000 shadow-sm shadow-pink-400/50"></div>
            <div className="absolute top-32 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse delay-2000 shadow-sm shadow-blue-400/50"></div>
            <div className="absolute top-48 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse delay-3000 shadow-sm shadow-purple-400/50"></div>
            <div className="absolute bottom-48 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse delay-4000 shadow-sm shadow-pink-400/50"></div>
            <div className="absolute bottom-32 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse delay-5000 shadow-sm shadow-blue-400/50"></div>
            <div className="absolute bottom-16 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse delay-6000 shadow-sm shadow-purple-400/50"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse delay-7000 shadow-sm shadow-pink-400/50"></div>
            
            {/* Vertical lines */}
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse delay-500 shadow-sm shadow-purple-400/50"></div>
            <div className="absolute top-0 left-20 w-px h-full bg-gradient-to-b from-transparent via-pink-400 to-transparent animate-pulse delay-1500 shadow-sm shadow-pink-400/50"></div>
            <div className="absolute top-0 left-40 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse delay-2500 shadow-sm shadow-blue-400/50"></div>
            <div className="absolute top-0 left-60 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse delay-3500 shadow-sm shadow-purple-400/50"></div>
            <div className="absolute top-0 right-60 w-px h-full bg-gradient-to-b from-transparent via-pink-400 to-transparent animate-pulse delay-4500 shadow-sm shadow-pink-400/50"></div>
            <div className="absolute top-0 right-40 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse delay-5500 shadow-sm shadow-blue-400/50"></div>
            <div className="absolute top-0 right-20 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse delay-6500 shadow-sm shadow-purple-400/50"></div>
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-pink-400 to-transparent animate-pulse delay-7500 shadow-sm shadow-pink-400/50"></div>
            
            {/* Center vertical lines for better grid effect */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse delay-8000 shadow-sm shadow-blue-400/50"></div>
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse delay-8500 shadow-sm shadow-purple-400/50"></div>
            <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-pink-400 to-transparent animate-pulse delay-9000 shadow-sm shadow-pink-400/50"></div>
            
            {/* Additional moving elements */}
            <div className="absolute top-1/4 left-0 w-20 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-move-horizontal" style={{ animationDuration: '12s' }}></div>
            <div className="absolute top-1/2 left-0 w-24 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-move-horizontal" style={{ animationDuration: '15s', animationDelay: '2s' }}></div>
            <div className="absolute top-3/4 left-0 w-16 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-move-horizontal" style={{ animationDuration: '10s', animationDelay: '4s' }}></div>
            
            <div className="absolute top-0 left-1/4 w-px h-20 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-move-vertical" style={{ animationDuration: '14s' }}></div>
            <div className="absolute top-0 left-1/2 w-px h-24 bg-gradient-to-b from-transparent via-pink-400 to-transparent animate-move-vertical" style={{ animationDuration: '16s', animationDelay: '3s' }}></div>
            <div className="absolute top-0 left-3/4 w-px h-16 bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-move-vertical" style={{ animationDuration: '11s', animationDelay: '5s' }}></div>
            
            {/* Reverse direction lines */}
            <div className="absolute top-1/3 right-0 w-28 h-px bg-gradient-to-l from-transparent via-violet-400 to-transparent animate-move-horizontal-reverse" style={{ animationDuration: '13s', animationDelay: '1s' }}></div>
            <div className="absolute bottom-0 left-1/3 w-px h-20 bg-gradient-to-t from-transparent via-indigo-400 to-transparent animate-move-vertical-reverse" style={{ animationDuration: '17s', animationDelay: '6s' }}></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Edurance Hub
            </h1>
            <p className={`text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-purple-200' : 'text-gray-700'
            }`}>
              Your modern utility platform featuring calculators, converters, and fun tools with beautiful glassmorphism design
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/tools"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 justify-center"
              >
                Explore Tools
                <ArrowRight size={20} />
              </Link>
              <Link 
                to="/games"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 justify-center"
              >
                Play Games
                <Gamepad2 size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Why Choose Edurance Hub?</h2>
            <p className={`text-lg mb-8 ${
              isDark ? 'text-purple-200' : 'text-gray-700'
            }`}>
              Edurance Hub is your all-in-one platform for productivity, entertainment, and learning. 
              We provide a wide range of tools and games designed to make your daily life easier and more enjoyable.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <GlassCard className="text-center p-6">
                <div className="flex justify-center mb-4">
                  <Calculator size={40} className="text-purple-500" />
                </div>
                <h3 className={`font-semibold text-lg mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Productivity Tools</h3>
                <p className={`${
                  isDark ? 'text-purple-200' : 'text-gray-600'
                }`}>
                  Calculate, convert, and organize with our comprehensive suite of productivity tools.
                </p>
              </GlassCard>
              <GlassCard className="text-center p-6">
                <div className="flex justify-center mb-4">
                  <Gamepad2 size={40} className="text-blue-500" />
                </div>
                <h3 className={`font-semibold text-lg mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Entertainment Games</h3>
                <p className={`${
                  isDark ? 'text-purple-200' : 'text-gray-600'
                }`}>
                  Challenge yourself with our collection of fun and engaging games for all ages.
                </p>
              </GlassCard>
              <GlassCard className="text-center p-6">
                <div className="flex justify-center mb-4">
                  <GraduationCap size={40} className="text-green-500" />
                </div>
                <h3 className={`font-semibold text-lg mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Learning Resources</h3>
                <p className={`${
                  isDark ? 'text-purple-200' : 'text-gray-600'
                }`}>
                  Enhance your knowledge with our educational tools and resources designed for students and professionals.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Featured Tools Section */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-3xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Featured Tools
            </h2>
            <Link 
              to="/tools"
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              View All Tools
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool, index) => (
              <Link 
                key={index}
                to={`/tools/${tool.category}/${tool.id}`}
                className="block"
              >
                <GlassCard className="p-6 h-full hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${tool.color.replace('text', 'bg')}/20`}>
                      <tool.icon size={24} className={tool.color} />
                    </div>
                    <h3 className={`font-semibold text-lg ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {tool.name}
                    </h3>
                  </div>
                  <p className={`text-sm ${
                    isDark ? 'text-purple-200' : 'text-gray-600'
                  }`}>
                    {tool.description}
                  </p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Games Section */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-3xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Featured Games
            </h2>
            <Link 
              to="/games"
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              View All Games
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGames.map((game, index) => (
              <Link 
                key={index}
                to={`/games/${game.id}`}
                className="block"
              >
                <GlassCard className="p-6 text-center hover:scale-105 transition-transform duration-300">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${game.bgColor}`}>
                    <game.icon size={32} className={game.color} />
                  </div>
                  <h3 className={`font-semibold text-lg mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {game.name}
                  </h3>
                  <p className={`text-sm ${
                    isDark ? 'text-purple-200' : 'text-gray-600'
                  }`}>
                    {game.description}
                  </p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <GlassCard className="p-8 md:p-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Get Started?
            </h2>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${
              isDark ? 'text-purple-200' : 'text-gray-700'
            }`}>
              Join thousands of users who trust Edurance Hub for their daily needs. 
              Explore our tools and games today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/tools"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 justify-center"
              >
                Explore Tools
                <ArrowRight size={20} />
              </Link>
              <Link 
                to="/games"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 justify-center"
              >
                Play Games
                <Gamepad2 size={20} />
              </Link>
            </div>
          </GlassCard>
        </section>
      </div>
    </>
  );
};

export default Home;