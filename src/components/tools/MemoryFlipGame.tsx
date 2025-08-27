import React, { useState, useEffect } from 'react';
import { RotateCcw, Play, Trophy, Zap, Brain, Star, Heart, Moon, Sun, Cloud, Flower2, TreePine, Mountain, Waves, Zap as Lightning, Crown, Shield, Sword, Anchor, Feather, Gem, Music, Camera, Key, Book, Gift, Clock, Flag, MapPin, Award, Target } from 'lucide-react';

type Difficulty = 'noob' | 'intermediate' | 'expert';
type Card = {
  id: number;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
};

const MemoryFlipGame = () => {
  // Game configuration
  const difficultyConfig = {
    noob: { pairs: 6, name: 'Noob', icon: Brain, color: 'text-blue-400' },
    intermediate: { pairs: 10, name: 'Intermediate', icon: Zap, color: 'text-yellow-400' },
    expert: { pairs: 15, name: 'Expert', icon: Trophy, color: 'text-red-400' }
  };

  // Extended icon mapping for unique pairs - 25 unique icons
  const iconMap = [
    Star, Heart, Moon, Sun, Cloud, 
    Flower2, TreePine, Mountain, Waves, Lightning,
    Crown, Shield, Sword, Anchor, Feather,
    Gem, Music, Camera, Key, Book,
    Gift, Clock, Flag, MapPin, Award
  ];

  // Game state
  const [difficulty, setDifficulty] = useState<Difficulty>('noob');
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'completed'>('idle');
  const [timer, setTimer] = useState(0);
  const [bestScores, setBestScores] = useState({
    noob: { moves: Infinity, time: Infinity },
    intermediate: { moves: Infinity, time: Infinity },
    expert: { moves: Infinity, time: Infinity }
  });

  // Get current difficulty config
  const currentConfig = difficultyConfig[difficulty];

  // Initialize game
  const initGame = () => {
    const pairs = currentConfig.pairs;
    
    // Ensure we have enough unique icons for the selected difficulty
    const maxPairs = Math.min(pairs, iconMap.length);
    const values = Array.from({ length: maxPairs }, (_, i) => i + 1);
    const cardValues = [...values, ...values]; // Duplicate for pairs
    
    // Shuffle cards
    const shuffled = [...cardValues]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false
      }));
    
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameStatus('playing');
    setTimer(0);
  };

  // Handle card click
  const handleCardClick = (id: number) => {
    if (gameStatus !== 'playing') return;
    if (flippedCards.length >= 2) return;
    
    const clickedCard = cards.find(card => card.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;
    
    // Flip the card
    const updatedCards = cards.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    );
    
    setCards(updatedCards);
    
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);
      
      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        // Match found
        setTimeout(() => {
          const matchedCards = cards.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isMatched: true } 
              : card
          );
          
          setCards(matchedCards);
          setFlippedCards([]);
          setMatches(matches + 1);
          
          // Check if game is completed
          if (matches + 1 === currentConfig.pairs) {
            setGameStatus('completed');
            updateBestScore();
          }
        }, 500);
      } else {
        // No match, flip cards back after showing them briefly
        setTimeout(() => {
          const resetCards = cards.map(card => 
            newFlippedCards.includes(card.id) && !card.isMatched
              ? { ...card, isFlipped: false }
              : card
          );
          
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Update best score
  const updateBestScore = () => {
    const currentBest = bestScores[difficulty];
    const isNewRecord = moves < currentBest.moves || timer < currentBest.time;
    
    if (isNewRecord) {
      setBestScores(prev => ({
        ...prev,
        [difficulty]: {
          moves: Math.min(moves, currentBest.moves),
          time: Math.min(timer, currentBest.time)
        }
      }));
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setTimeout> | null = null;
    
    if (gameStatus === 'playing') {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStatus]);

  // Initialize game on difficulty change
  useEffect(() => {
    if (gameStatus === 'idle' || gameStatus === 'completed') {
      initGame();
    }
  }, [difficulty]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get grid columns based on difficulty
  const getGridColumns = () => {
    switch (difficulty) {
      case 'noob': return 4;
      case 'intermediate': return 5;
      case 'expert': return 6;
      default: return 4;
    }
  };

  // Render card
  const renderCard = (card: Card) => {
    // Ensure we don't go out of bounds for the iconMap
    const iconIndex = Math.min(card.value - 1, iconMap.length - 1);
    const IconComponent = iconMap[iconIndex] || Star;
    
    return (
      <div
        key={card.id}
        onClick={() => handleCardClick(card.id)}
        className={`
          aspect-square rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105
          ${card.isFlipped || card.isMatched 
            ? 'bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg' 
            : 'bg-gradient-to-br from-purple-800/50 to-blue-800/50 shadow-md'}
          ${card.isMatched ? 'ring-4 ring-green-400 ring-opacity-70' : ''}
          flex items-center justify-center relative overflow-hidden
        `}
      >
        {card.isFlipped || card.isMatched ? (
          <IconComponent size={40} className="text-white drop-shadow-lg" />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white/50 text-2xl">?</span>
          </div>
        )}
        
        {/* Card shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl pointer-events-none"></div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 w-full">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Memory Flip Game</h2>
        <p className="text-purple-200">Test your memory skills with this classic card matching game</p>
      </div>

      {/* Difficulty Selector */}
      <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-bold text-white mb-4 text-center">Select Difficulty</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(difficultyConfig).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={key}
                onClick={() => setDifficulty(key as Difficulty)}
                className={`
                  flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300
                  ${difficulty === key
                    ? 'bg-purple-600/30 border-2 border-purple-500 shadow-lg'
                    : 'bg-white/10 border border-purple-500/30 hover:bg-white/20'}
                `}
              >
                <Icon size={24} className={config.color} />
                <span className={`font-medium ${config.color}`}>{config.name}</span>
                <span className="text-purple-200 text-sm">
                  {config.pairs} pairs
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500/20 rounded-lg p-4 text-center border border-blue-500/30">
          <div className="text-blue-400 text-sm">Moves</div>
          <div className="text-2xl font-bold text-white">{moves}</div>
        </div>
        
        <div className="bg-purple-500/20 rounded-lg p-4 text-center border border-purple-500/30">
          <div className="text-purple-400 text-sm">Time</div>
          <div className="text-2xl font-bold text-white">{formatTime(timer)}</div>
        </div>
        
        <div className="bg-green-500/20 rounded-lg p-4 text-center border border-green-500/30">
          <div className="text-green-400 text-sm">Matches</div>
          <div className="text-2xl font-bold text-white">{matches}/{currentConfig.pairs}</div>
        </div>
      </div>

      {/* Best Scores */}
      <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-bold text-white mb-4 text-center">Best Scores</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(difficultyConfig).map(([key, config]) => {
            const best = bestScores[key as Difficulty];
            const Icon = config.icon;
            return (
              <div 
                key={key} 
                className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5"
              >
                <Icon size={20} className={config.color} />
                <span className={`text-sm font-medium ${config.color}`}>{config.name}</span>
                <div className="text-center">
                  <div className="text-purple-200 text-xs">Moves</div>
                  <div className="text-white font-medium">
                    {best.moves === Infinity ? '--' : best.moves}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-purple-200 text-xs">Time</div>
                  <div className="text-white font-medium">
                    {best.time === Infinity ? '--' : formatTime(best.time)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Game Board - Larger Playground */}
      <div className="flex justify-center w-full">
        <div 
          className="grid gap-4 p-6 bg-white/5 rounded-3xl border border-purple-500/30 w-full max-w-5xl"
          style={{ 
            gridTemplateColumns: `repeat(${getGridColumns()}, minmax(0, 1fr))`,
          }}
        >
          {cards.map(renderCard)}
        </div>
      </div>

      {/* Game Status */}
      {gameStatus === 'completed' && (
        <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-2xl p-6 border border-green-500/30 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">🎉 Congratulations! 🎉</h3>
          <p className="text-purple-200 mb-4">
            You completed the {currentConfig.name} level in {moves} moves and {formatTime(timer)}!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={initGame}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Play size={16} />
              <span>Play Again</span>
            </button>
            
            <button
              onClick={() => setGameStatus('idle')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <RotateCcw size={16} />
              <span>Change Difficulty</span>
            </button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={initGame}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Play size={16} />
          <span>{gameStatus === 'completed' ? 'Restart' : 'Start Game'}</span>
        </button>
      </div>

      {/* Game Instructions */}
      <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-bold text-white mb-3">How to Play</h3>
        <ul className="text-purple-200 space-y-2 text-sm">
          <li>• Flip two cards at a time to find matching pairs</li>
          <li>• If the cards match, they stay face up</li>
          <li>• If they don't match, they flip back over</li>
          <li>• Complete the game by finding all pairs</li>
          <li>• Try to complete the game in as few moves and as little time as possible</li>
        </ul>
        
        <div className="mt-4 pt-4 border-t border-purple-500/20">
          <h4 className="text-white font-medium mb-2">Difficulty Levels</h4>
          <ul className="text-purple-200 space-y-1 text-sm">
            <li>• <span className="text-blue-400">Noob</span>: 6 pairs (12 cards) - Perfect for beginners</li>
            <li>• <span className="text-yellow-400">Intermediate</span>: 10 pairs (20 cards) - For experienced players</li>
            <li>• <span className="text-red-400">Expert</span>: 15 pairs (30 cards) - Ultimate memory challenge</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MemoryFlipGame;