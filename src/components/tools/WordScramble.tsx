import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Play, Check, Shuffle, Trophy } from 'lucide-react';

type Word = {
  original: string;
  scrambled: string;
};

const WordScramble = () => {
  // Word bank with various difficulty levels
  const wordBank = [
    // Easy words (3-5 letters)
    { original: 'CAT', scrambled: 'TCA' },
    { original: 'DOG', scrambled: 'GDO' },
    { original: 'SUN', scrambled: 'NSU' },
    { original: 'BOOK', scrambled: 'KOBO' },
    { original: 'FISH', scrambled: 'HSIF' },
    { original: 'TREE', scrambled: 'REET' },
    { original: 'BIRD', scrambled: 'RDBI' },
    { original: 'MOON', scrambled: 'ONOM' },
    { original: 'STAR', scrambled: 'RATS' },
    { original: 'RAIN', scrambled: 'NRIA' },
    
    // Medium words (6-8 letters)
    { original: 'SCHOOL', scrambled: 'LCOHOS' },
    { original: 'FLOWER', scrambled: 'WORFLE' },
    { original: 'BANANA', scrambled: 'NAABAN' },
    { original: 'ORANGE', scrambled: 'GAENRO' },
    { original: 'COMPUTER', scrambled: 'PUCOMETR' },
    { original: 'TELEPHONE', scrambled: 'ELEPHONET' },
    { original: 'HOLIDAY', scrambled: 'OLIDAYH' },
    { original: 'FRIEND', scrambled: 'RFEIND' },
    { original: 'WELCOME', scrambled: 'LECOMEW' },
    { original: 'JOURNEY', scrambled: 'RUYJONE' },
    
    // Hard words (9+ letters)
    { original: 'CHOCOLATE', scrambled: 'OCLATECHO' },
    { original: 'ADVENTURE', scrambled: 'VENTUREAD' },
    { original: 'BEAUTIFUL', scrambled: 'AUTIFULEB' },
    { original: 'DIFFICULT', scrambled: 'FICULTDIF' },
    { original: 'KNOWLEDGE', scrambled: 'OWLEDGEKN' },
    { original: 'CHAMPION', scrambled: 'PIONCHAM' },
    { original: 'EXCELLENT', scrambled: 'LLENTCEXE' },
    { original: 'FANTASTIC', scrambled: 'TASTICFAN' },
    { original: 'GENERATOR', scrambled: 'ERATORGEN' },
    { original: 'HELICOPTER', scrambled: 'COPTERHELI' },
  ];

  // Game state
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [userInput, setUserInput] = useState('');
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'correct' | 'incorrect'>('idle');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [timer, setTimer] = useState(0);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter words by difficulty
  const getWordsByDifficulty = () => {
    switch (difficulty) {
      case 'easy':
        return wordBank.filter(word => word.original.length <= 5);
      case 'medium':
        return wordBank.filter(word => word.original.length > 5 && word.original.length <= 8);
      case 'hard':
        return wordBank.filter(word => word.original.length > 8);
      default:
        return wordBank;
    }
  };

  // Get a random word
  const getRandomWord = () => {
    const availableWords = getWordsByDifficulty().filter(
      word => !usedWords.includes(word.original)
    );
    
    if (availableWords.length === 0) {
      // Reset used words if all have been used
      setUsedWords([]);
      return getWordsByDifficulty()[Math.floor(Math.random() * getWordsByDifficulty().length)];
    }
    
    return availableWords[Math.floor(Math.random() * availableWords.length)];
  };

  // Start a new round
  const startRound = () => {
    const newWord = getRandomWord();
    setCurrentWord(newWord);
    setUserInput('');
    setGameStatus('playing');
    setUsedWords(prev => [...prev, newWord.original]);
    
    // Focus input field
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
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

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle user submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentWord || !userInput.trim()) return;
    
    setAttempts(prev => prev + 1);
    
    if (userInput.trim().toUpperCase() === currentWord.original) {
      // Correct answer
      setGameStatus('correct');
      setScore(prev => prev + 10 * (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3));
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > maxStreak) {
          setMaxStreak(newStreak);
        }
        return newStreak;
      });
    } else {
      // Incorrect answer
      setGameStatus('incorrect');
      setStreak(0);
    }
  };

  // Skip current word
  const skipWord = () => {
    setStreak(0);
    startRound();
  };

  // Reset game
  const resetGame = () => {
    setScore(0);
    setAttempts(0);
    setStreak(0);
    setMaxStreak(0);
    setTimer(0);
    setUsedWords([]);
    setGameStatus('idle');
    setUserInput('');
    setCurrentWord(null);
  };

  // Start game
  const startGame = () => {
    setGameStatus('playing');
    setTimer(0);
    startRound();
  };

  // Shuffle letters of current word
  const shuffleLetters = () => {
    if (!currentWord) return;
    
    const letters = currentWord.scrambled.split('');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    
    setCurrentWord({
      original: currentWord.original,
      scrambled: letters.join('')
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 w-full">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Word Scramble</h2>
        <p className="text-purple-200">Unscramble the letters to form the correct word</p>
      </div>

      {/* Difficulty Selector */}
      <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-bold text-white mb-4 text-center">Select Difficulty</h3>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setDifficulty('easy')}
            className={`
              flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300
              ${difficulty === 'easy'
                ? 'bg-blue-600/30 border-2 border-blue-500 shadow-lg'
                : 'bg-white/10 border border-purple-500/30 hover:bg-white/20'}
            `}
          >
            <span className="text-blue-400 font-medium">Easy</span>
            <span className="text-purple-200 text-sm">3-5 letters</span>
          </button>
          
          <button
            onClick={() => setDifficulty('medium')}
            className={`
              flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300
              ${difficulty === 'medium'
                ? 'bg-yellow-600/30 border-2 border-yellow-500 shadow-lg'
                : 'bg-white/10 border border-purple-500/30 hover:bg-white/20'}
            `}
          >
            <span className="text-yellow-400 font-medium">Medium</span>
            <span className="text-purple-200 text-sm">6-8 letters</span>
          </button>
          
          <button
            onClick={() => setDifficulty('hard')}
            className={`
              flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300
              ${difficulty === 'hard'
                ? 'bg-red-600/30 border-2 border-red-500 shadow-lg'
                : 'bg-white/10 border border-purple-500/30 hover:bg-white/20'}
            `}
          >
            <span className="text-red-400 font-medium">Hard</span>
            <span className="text-purple-200 text-sm">9+ letters</span>
          </button>
        </div>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-500/20 rounded-lg p-4 text-center border border-blue-500/30">
          <div className="text-blue-400 text-sm">Score</div>
          <div className="text-2xl font-bold text-white">{score}</div>
        </div>
        
        <div className="bg-purple-500/20 rounded-lg p-4 text-center border border-purple-500/30">
          <div className="text-purple-400 text-sm">Time</div>
          <div className="text-2xl font-bold text-white">{formatTime(timer)}</div>
        </div>
        
        <div className="bg-green-500/20 rounded-lg p-4 text-center border border-green-500/30">
          <div className="text-green-400 text-sm">Streak</div>
          <div className="text-2xl font-bold text-white">{streak}</div>
        </div>
        
        <div className="bg-yellow-500/20 rounded-lg p-4 text-center border border-yellow-500/30">
          <div className="text-yellow-400 text-sm">Max Streak</div>
          <div className="text-2xl font-bold text-white">{maxStreak}</div>
        </div>
      </div>

      {/* Game Area */}
      {gameStatus !== 'idle' && currentWord && (
        <div className="bg-white/5 rounded-2xl p-8 border border-purple-500/30 text-center">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Unscramble this word:</h3>
            <div className="flex justify-center gap-2 mb-6">
              {currentWord.scrambled.split('').map((letter, index) => (
                <div 
                  key={index} 
                  className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg text-white text-xl font-bold shadow-lg"
                >
                  {letter}
                </div>
              ))}
            </div>
            
            <button
              onClick={shuffleLetters}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600/30 text-purple-300 rounded-lg hover:bg-purple-600/50 transition-colors mx-auto"
            >
              <Shuffle size={16} />
              <span>Shuffle Letters</span>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300"
                placeholder="Enter the unscrambled word"
                disabled={gameStatus !== 'playing'}
                autoComplete="off"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                disabled={gameStatus !== 'playing' || !userInput.trim()}
              >
                <Check size={20} />
              </button>
            </div>
          </form>
          
          {/* Game Status Feedback */}
          {gameStatus === 'correct' && (
            <div className="mt-6 p-4 bg-green-500/20 rounded-lg border border-green-500/30">
              <div className="text-green-400 font-bold text-xl">Correct! 🎉</div>
              <div className="text-white mt-2">The word was: <span className="font-bold">{currentWord.original}</span></div>
              <button
                onClick={startRound}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Next Word
              </button>
            </div>
          )}
          
          {gameStatus === 'incorrect' && (
            <div className="mt-6 p-4 bg-red-500/20 rounded-lg border border-red-500/30">
              <div className="text-red-400 font-bold text-xl">Incorrect! 😕</div>
              <div className="text-white mt-2">The correct word was: <span className="font-bold">{currentWord.original}</span></div>
              <button
                onClick={startRound}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Try Another
              </button>
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center">
        {gameStatus === 'idle' ? (
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Play size={20} />
            <span>Start Game</span>
          </button>
        ) : (
          <>
            <button
              onClick={skipWord}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <Shuffle size={16} />
              <span>Skip Word</span>
            </button>
            
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <RotateCcw size={16} />
              <span>Reset Game</span>
            </button>
          </>
        )}
      </div>

      {/* Game Instructions */}
      <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-bold text-white mb-3">How to Play</h3>
        <ul className="text-purple-200 space-y-2 text-sm">
          <li>• You'll see a scrambled word - rearrange the letters to form the correct word</li>
          <li>• Type your answer in the input field and press Enter or click Submit</li>
          <li>• Each correct answer earns points based on difficulty level</li>
          <li>• Build streaks by getting consecutive answers correct</li>
          <li>• Use the Shuffle button to rearrange the letters if you're stuck</li>
          <li>• Skip words if you're having trouble with them</li>
        </ul>
        
        <div className="mt-4 pt-4 border-t border-purple-500/20">
          <h4 className="text-white font-medium mb-2">Scoring</h4>
          <ul className="text-purple-200 space-y-1 text-sm">
            <li>• <span className="text-blue-400">Easy words</span>: 10 points each</li>
            <li>• <span className="text-yellow-400">Medium words</span>: 20 points each</li>
            <li>• <span className="text-red-400">Hard words</span>: 30 points each</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WordScramble;