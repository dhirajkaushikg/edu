import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Heart, DollarSign, GraduationCap, Activity, Droplets, Apple, Flame, User, Calculator, Zap, Percent, Clock, Ruler, Scale, Globe, Users, Shield, Timer, BookOpen, TrendingUp, Wallet, Dog, Sofa, UserPlus, Gamepad2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';

const Tools = () => {
  const { isDark } = useTheme();
  const toolCategories = [
    {
      name: 'Health & Fitness',
      icon: Activity,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      category: 'health',
      tools: [
        { name: 'Water Intake Calculator', id: 'water-intake', description: 'Calculate daily water needs', icon: Droplets },
        { name: 'Food Calories Calculator', id: 'food-calories', description: 'Track your food calories', icon: Apple },
        { name: 'Calories Burn Calculator', id: 'calories-burn', description: 'Calculate calories burned', icon: Flame },
        { name: 'Body Fat Calculator', id: 'body-fat', description: 'Calculate body fat percentage', icon: User },
        { name: 'BMI Calculator', id: 'bmi-calculator', description: 'Check body mass index', icon: Scale },
      ]
    },
    {
      name: 'Finance & Business',
      icon: DollarSign,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      category: 'finance',
      tools: [
        { name: 'GST Calculator', id: 'gst-calculator', description: 'Calculate GST amounts', icon: Calculator },
        { name: 'Electricity Bill Estimator', id: 'electricity-bill', description: 'Estimate your bill', icon: Zap },
        { name: 'Simple Interest', id: 'simple-interest', description: 'Calculate simple interest', icon: Percent },
        { name: 'Compound Interest', id: 'compound-interest', description: 'Calculate compound interest', icon: TrendingUp },
        { name: 'Percentage Calculator', id: 'percentage-calculator', description: 'Calculate percentages', icon: Percent },
        { name: 'Loan EMI Calculator', id: 'loan-emi', description: 'Calculate EMI payments', icon: DollarSign },
        { name: 'Currency Converter', id: 'currency-converter', description: 'Convert currencies', icon: Globe },
        { name: 'Salary Satisfaction Calculator', id: 'salary-satisfaction', description: 'Check your financial happiness', icon: Wallet },
      ]
    },
    {
      name: 'Student Oriented',
      icon: GraduationCap,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      category: 'student',
      tools: [
        { name: 'Unit Converter', id: 'unit-converter', description: 'Convert units easily', icon: Ruler },
        { name: 'Percentage to CGPA', id: 'percentage-cgpa', description: 'Convert percentage to CGPA', icon: GraduationCap },
        { name: 'Time Zone Converter', id: 'timezone-converter', description: 'Convert time zones', icon: Clock },
        { name: 'Career Path Finder', id: 'profession-finder', description: 'Discover your ideal career', icon: GraduationCap },
        { name: 'Exam Survival Probability', id: 'exam-survival', description: 'Predict your exam survival chances', icon: BookOpen },
      ]
    },
    {
      name: 'Relationship & Social',
      icon: UserPlus,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/20',
      category: 'relationship',
      tools: [
        { name: 'Love Percentage', id: 'love-percentage', description: 'Calculate love compatibility', icon: Heart },
        { name: 'Friendship Calculator', id: 'friendship-calculator', description: 'Test friendship strength', icon: Users },
        { name: 'Breakup Probability', id: 'breakup-probability', description: 'Calculate breakup risk', icon: Heart },
        { name: 'Cheating Suspicion Score', id: 'cheating-suspicion', description: 'Detect cheating suspicion level', icon: Zap },
        { name: 'Best Friend Loyalty Rating', id: 'best-friend-loyalty', description: 'Rate your bestie\'s loyalty', icon: Users },
        { name: 'Divorce Outcome Calculator', id: 'divorce-outcome', description: 'Predict divorce settlement results', icon: Scale },
        { name: 'Gold Digger Calculator', id: 'gold-digger', description: 'Check if someone is with you for love or money', icon: DollarSign },
      ]
    },
    {
      name: 'Lifestyle & Entertainment',
      icon: Gamepad2,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      category: 'entertainment',
      tools: [
        { name: 'Password Strength Checker', id: 'password-strength', description: 'Check password security', icon: Shield },
        { name: 'Character Checker Tool', id: 'character-checker', description: 'Personality quiz tool', icon: BookOpen },
        { name: 'Sex Ride Tonight', id: 'sex-ride-tonight', description: 'Predict tonight\'s passion level', icon: Flame },
        { name: 'Dowry Calculator', id: 'dowry-calculator', description: 'Calculate groom\'s "market value"', icon: Wallet },
        { name: 'Pet Affection Calculator', id: 'pet-affection', description: 'Measure your pet\'s love for you', icon: Dog },
        { name: 'Laziness Calculator', id: 'laziness-calculator', description: 'Discover your laziness level', icon: Sofa },
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>All Tools | Edurance Hub</title>
        <meta name="description" content="Explore our comprehensive collection of utility tools for health, finance, education, relationships, and more. Free calculators and converters to help with your daily needs." />
        <meta name="keywords" content="tools, calculators, converters, health tools, finance tools, education tools, relationship tools, utility tools" />
        <meta name="author" content="Edurance Hub" />
        <meta property="og:title" content="All Tools | Edurance Hub" />
        <meta property="og:description" content="Explore our comprehensive collection of utility tools for health, finance, education, relationships, and more. Free calculators and converters to help with your daily needs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edurancehub.com/tools" />
        <meta property="og:site_name" content="Edurance Hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="All Tools | Edurance Hub" />
        <meta name="twitter:description" content="Explore our comprehensive collection of utility tools for health, finance, education, relationships, and more. Free calculators and converters to help with your daily needs." />
        <link rel="canonical" href="https://edurancehub.com/tools" />
      </Helmet>
      
      <div className="space-y-12 animate-fadeIn">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>All Tools</h1>
          <p className={`text-lg ${
            isDark ? 'text-purple-200' : 'text-gray-700'
          }`}>Explore our comprehensive collection of utility tools</p>
        </div>

        {toolCategories.map((category) => (
          <section key={category.category}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-xl ${category.bgColor}`}>
                <category.icon size={24} className={category.color} />
              </div>
              <h2 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>{category.name}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-equal-height auto-rows-fr">
              {category.tools.map((tool) => (
                <Link 
                  key={tool.id} 
                  to={`/tools/${category.category}/${tool.id}`} 
                  className="flex h-full"
                >
                  <GlassCard className="group flex flex-col w-full h-full p-6">
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start gap-3 mb-4">
                        <div className={`p-2 rounded-lg flex-shrink-0 ${category.bgColor}`}>
                          <tool.icon size={20} className={category.color} />
                        </div>
                        <h3 className={`font-semibold transition-colors flex-1 leading-tight ${
                          isDark 
                            ? 'text-white group-hover:text-purple-300'
                            : 'text-gray-900 group-hover:text-purple-700'
                        }`}>
                          {tool.name}
                        </h3>
                      </div>
                      <p className={`text-sm leading-relaxed flex-1 ${
                        isDark ? 'text-purple-200' : 'text-gray-600'
                      }`}>{tool.description}</p>
                    </div>
                    <div className={`mt-4 pt-3 border-t flex-shrink-0 ${
                      isDark ? 'border-purple-500/20' : 'border-purple-300/30'
                    }`}>
                      <div className={`text-sm transition-colors flex items-center justify-between ${
                        isDark 
                          ? 'text-purple-400 group-hover:text-purple-300'
                          : 'text-purple-600 group-hover:text-purple-800'
                      }`}>
                        <span className="font-medium">Try it now</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default Tools;