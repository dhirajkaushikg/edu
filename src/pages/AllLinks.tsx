import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';

const allToolLinks = [
  // Health & Fitness
  { name: 'Water Intake Calculator', url: '/tools/health/water-intake' },
  { name: 'Food Calories Calculator', url: '/tools/health/food-calories' },
  { name: 'Calories Burn Calculator', url: '/tools/health/calories-burn' },
  { name: 'Body Fat Calculator', url: '/tools/health/body-fat' },
  { name: 'BMI Calculator', url: '/tools/health/bmi-calculator' },
  // Finance & Business
  { name: 'GST Calculator', url: '/tools/finance/gst-calculator' },
  { name: 'Electricity Bill Estimator', url: '/tools/finance/electricity-bill' },
  { name: 'Simple Interest', url: '/tools/finance/simple-interest' },
  { name: 'Compound Interest', url: '/tools/finance/compound-interest' },
  { name: 'Percentage Calculator', url: '/tools/finance/percentage-calculator' },
  { name: 'Loan EMI Calculator', url: '/tools/finance/loan-emi' },
  { name: 'Currency Converter', url: '/tools/finance/currency-converter' },
  { name: 'Salary Satisfaction Calculator', url: '/tools/finance/salary-satisfaction' },
  // Student Oriented
  { name: 'Unit Converter', url: '/tools/student/unit-converter' },
  { name: 'Percentage to CGPA', url: '/tools/student/percentage-cgpa' },
  { name: 'Time Zone Converter', url: '/tools/student/timezone-converter' },
  { name: 'Career Path Finder', url: '/tools/student/profession-finder' },
  { name: 'Exam Survival Probability', url: '/tools/student/exam-survival' },
  // Relationship & Social
  { name: 'Love Percentage', url: '/tools/relationship/love-percentage' },
  { name: 'Friendship Calculator', url: '/tools/relationship/friendship-calculator' },
  { name: 'Breakup Probability', url: '/tools/relationship/breakup-probability' },
  { name: 'Cheating Suspicion Score', url: '/tools/relationship/cheating-suspicion' },
  { name: 'Best Friend Loyalty Rating', url: '/tools/relationship/best-friend-loyalty' },
  { name: 'Divorce Outcome Calculator', url: '/tools/relationship/divorce-outcome' },
  { name: 'Gold Digger Calculator', url: '/tools/relationship/gold-digger' },
  // Lifestyle & Entertainment
  { name: 'Password Strength Checker', url: '/tools/entertainment/password-strength' },
  { name: 'Character Checker Tool', url: '/tools/entertainment/character-checker' },
  { name: 'Sex Ride Tonight', url: '/tools/entertainment/sex-ride-tonight' },
  { name: 'Dowry Calculator', url: '/tools/entertainment/dowry-calculator' },
  { name: 'Pet Affection Calculator', url: '/tools/entertainment/pet-affection' },
  { name: 'Laziness Calculator', url: '/tools/entertainment/laziness-calculator' },
];

const allGameLinks = [
  { name: 'Math Roast Game', url: '/games/math-roast' },
  { name: 'Typing Speed Test', url: '/games/typing-speed' },
  { name: 'Tic Tac Toe', url: '/games/tic-tac-toe' },
  { name: 'Rock Paper Scissors', url: '/games/rock-paper-scissors' },
  { name: 'Snake Game', url: '/games/snake' },
  { name: 'Memory Flip Game', url: '/games/memory-flip' },
  { name: 'Word Scramble', url: '/games/word-scramble' },
  { name: 'Pong 2D', url: '/games/pong-2d' },
  { name: 'Hangman Game', url: '/games/hangman' },
];

const AllLinks = () => (
  <div className="max-w-3xl mx-auto py-12 space-y-12">
    <GlassCard className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-purple-400">All Tools</h2>
      <ul className="space-y-2">
        {allToolLinks.map((tool) => (
          <li key={tool.url}>
            <Link to={tool.url} className="text-blue-500 hover:underline">
              {tool.name}
            </Link>
          </li>
        ))}
      </ul>
    </GlassCard>
    <GlassCard className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-purple-400">All Games</h2>
      <ul className="space-y-2">
        {allGameLinks.map((game) => (
          <li key={game.url}>
            <Link to={game.url} className="text-blue-500 hover:underline">
              {game.name}
            </Link>
          </li>
        ))}
      </ul>
    </GlassCard>
  </div>
);

export default AllLinks;
