import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Trophy, Zap, Gamepad2, Hand, Apple, Brain, Shuffle, Table, Skull } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';

const Games = () => {
  const { isDark } = useTheme();
  
  const games = [
    {
      name: 'Math Roast Game',
      id: 'math-roast',
      description: 'Solve math problems fast and get roasted!',
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/20'
    },
    {
      name: 'Typing Speed Test',
      id: 'typing-speed',
      description: 'Test your typing speed and accuracy',
      icon: Zap,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20'
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
      name: 'Rock Paper Scissors',
      id: 'rock-paper-scissors',
      description: 'Classic hand game of strategy and luck',
      icon: Hand,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/20'
    },
    {
      name: 'Snake Game',
      id: 'snake',
      description: 'Classic snake game with a modern twist',
      icon: Apple,
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
      name: 'Word Scramble',
      id: 'word-scramble',
      description: 'Unscramble letters to form the correct words',
      icon: Shuffle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/20'
    },
    {
      name: 'Pong 2D',
      id: 'pong-2d',
      description: 'Retro table tennis arcade game',
      icon: Table,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/20'
    },
    {
      name: 'Hangman Game',
      id: 'hangman',
      description: 'Classic word guessing game with a twist',
      icon: Skull,
      color: 'text-red-500',
      bgColor: 'bg-red-500/20'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Free Online Games | Edurance Hub</title>
        <meta name="description" content="Play free online games including Math Roast, Typing Speed Test, Tic Tac Toe, Snake, Memory Flip, and more. Fun and challenging games to test your skills." />
        <meta name="keywords" content="games, online games, free games, math games, typing games, puzzle games, brain games, arcade games" />
        <meta name="author" content="Edurance Hub" />
        <meta property="og:title" content="Free Online Games | Edurance Hub" />
        <meta property="og:description" content="Play free online games including Math Roast, Typing Speed Test, Tic Tac Toe, Snake, Memory Flip, and more. Fun and challenging games to test your skills." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edurancehub.com/games" />
        <meta property="og:site_name" content="Edurance Hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Online Games | Edurance Hub" />
        <meta name="twitter:description" content="Play free online games including Math Roast, Typing Speed Test, Tic Tac Toe, Snake, Memory Flip, and more. Fun and challenging games to test your skills." />
        <link rel="canonical" href="https://edurancehub.com/games" />
      </Helmet>
      
      <div className="space-y-12 animate-fadeIn">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>Games</h1>
          <p className={`text-lg ${
            isDark ? 'text-purple-200' : 'text-gray-700'
          }`}>Fun and challenging games to test your skills</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-equal-height auto-rows-fr">
          {games.map((game) => (
            <Link 
              key={game.id} 
              to={`/games/${game.id}`} 
              className="flex h-full"
            >
              <GlassCard className="group flex flex-col w-full h-full p-6">
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${game.bgColor}`}>
                      <game.icon size={20} className={game.color} />
                    </div>
                    <h3 className={`font-semibold transition-colors flex-1 leading-tight ${
                      isDark 
                        ? 'text-white group-hover:text-purple-300'
                        : 'text-gray-900 group-hover:text-purple-800'
                    }`}>
                      {game.name}
                    </h3>
                  </div>
                  <p className={`text-sm leading-relaxed flex-1 ${
                    isDark ? 'text-purple-200' : 'text-gray-700'
                  }`}>{game.description}</p>
                </div>
                <div className={`mt-4 pt-3 border-t flex-shrink-0 ${
                  isDark ? 'border-purple-500/20' : 'border-purple-900/20'
                }`}>
                  <div className={`text-sm transition-colors flex items-center justify-between ${
                    isDark 
                      ? 'text-purple-400 group-hover:text-purple-300'
                      : 'text-purple-700 group-hover:text-purple-900'
                  }`}>
                    <span className="font-medium">Play now</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Games;