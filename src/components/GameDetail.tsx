import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import GlassCard from './GlassCard';
import MathRoastGame from './tools/MathRoastGame';
import TypingSpeedTest from './tools/TypingSpeedTest';
import TicTacToe from './tools/TicTacToe';
import RockPaperScissors from './tools/RockPaperScissors';
import SnakeGame from './tools/SnakeGame';
import MemoryFlipGame from './tools/MemoryFlipGame';
import WordScramble from './tools/WordScramble';
import Pong2D from './tools/Pong2D';
import HangmanGame from './tools/HangmanGame';

const GameDetail = () => {
  const { gameId } = useParams();

  const getGameComponent = () => {
    switch (gameId) {
      case 'math-roast':
        return <MathRoastGame />;
      case 'typing-speed':
        return <TypingSpeedTest />;
      case 'tic-tac-toe':
        return <TicTacToe />;
      case 'rock-paper-scissors':
        return <RockPaperScissors />;
      case 'snake':
        return <SnakeGame />;
      case 'memory-flip':
        return <MemoryFlipGame />;
      case 'word-scramble':
        return <WordScramble />;
      case 'pong-2d':
        return <Pong2D />;
      case 'hangman':
        return <HangmanGame />;
      default:
        return <div className="text-center text-white">Game not found</div>;
    }
  };

  const getGameName = () => {
    switch (gameId) {
      case 'math-roast':
        return 'Math Roast Game';
      case 'typing-speed':
        return 'Typing Speed Test';
      case 'tic-tac-toe':
        return 'Tic Tac Toe';
      case 'rock-paper-scissors':
        return 'Rock Paper Scissors';
      case 'snake':
        return 'Snake Game';
      case 'memory-flip':
        return 'Memory Flip Game';
      case 'word-scramble':
        return 'Word Scramble';
      case 'pong-2d':
        return 'Pong 2D';
      case 'hangman':
        return 'Hangman Game';
      default:
        return 'Game';
    }
  };

  const getGameDescription = () => {
    switch (gameId) {
      case 'math-roast':
        return 'Solve math problems fast and get roasted! Test your math skills with our fun and challenging game.';
      case 'typing-speed':
        return 'Test your typing speed and accuracy with our typing speed test game. Improve your typing skills.';
      case 'tic-tac-toe':
        return 'Classic X and O game with a modern twist. Play against a friend or challenge our AI.';
      case 'rock-paper-scissors':
        return 'Classic hand game of strategy and luck. Play against our AI in this timeless game.';
      case 'snake':
        return 'Classic snake game with a modern twist. Guide the snake to eat food and grow longer.';
      case 'memory-flip':
        return 'Test your memory with card matching challenges. Flip cards to find matching pairs.';
      case 'word-scramble':
        return 'Unscramble letters to form the correct words. Challenge your vocabulary and word skills.';
      case 'pong-2d':
        return 'Retro table tennis arcade game. Play against a friend or challenge our AI in this classic game.';
      case 'hangman':
        return 'Classic word guessing game with a twist. Guess the word before the hangman is complete.';
      default:
        return 'Play this fun game from Edurance Hub.';
    }
  };

  return (
    <>
      <Helmet>
        <title>{getGameName()} | Edurance Hub</title>
        <meta name="description" content={getGameDescription()} />
        <meta name="keywords" content={`game, ${getGameName()}, online game, free game, edurance hub`} />
        <meta name="author" content="Edurance Hub" />
        <meta property="og:title" content={`${getGameName()} | Edurance Hub`} />
        <meta property="og:description" content={getGameDescription()} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://edurancehub.com/games/${gameId}`} />
        <meta property="og:site_name" content="Edurance Hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${getGameName()} | Edurance Hub`} />
        <meta name="twitter:description" content={getGameDescription()} />
        <link rel="canonical" href={`https://edurancehub.com/games/${gameId}`} />
      </Helmet>
      
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center gap-4">
          <Link
            to="/games"
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Games
          </Link>
          <div className="h-px bg-purple-500/30 flex-1" />
          <h1 className="text-2xl font-bold text-white">{getGameName()}</h1>
        </div>

        <GlassCard hover={false} className="max-w-4xl mx-auto">
          {getGameComponent()}
        </GlassCard>
      </div>
    </>
  );
};

export default GameDetail;