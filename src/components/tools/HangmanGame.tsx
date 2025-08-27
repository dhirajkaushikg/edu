import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Volume2, Lightbulb, Trophy } from 'lucide-react';

type Difficulty = 'easy' | 'medium' | 'hard';
type GameStatus = 'playing' | 'won' | 'lost';
type WordData = {
  word: string;
  clue: string;
};

const HangmanGame = () => {
  // Word banks with clues for different difficulties
  const wordBanks: Record<Difficulty, WordData[]> = {
    easy: [
      { word: 'APPLE', clue: 'A popular red fruit that grows on trees' },
      { word: 'BANANA', clue: 'A yellow fruit that monkeys love' },
      { word: 'ORANGE', clue: 'A citrus fruit that is also a color' },
      { word: 'GRAPE', clue: 'Small round fruit that grows in bunches' },
      { word: 'WATER', clue: 'Essential liquid for life, H2O' },
      { word: 'HOUSE', clue: 'A building where people live' },
      { word: 'CHAIR', clue: 'A piece of furniture you sit on' },
      { word: 'TABLE', clue: 'A piece of furniture with a flat top' },
      { word: 'PHONE', clue: 'A device used for communication' },
      { word: 'MUSIC', clue: 'Art form with sounds and rhythms' },
      { word: 'DANCE', clue: 'Moving your body to rhythm' },
      { word: 'SMILE', clue: 'Facial expression showing happiness' },
      { word: 'HAPPY', clue: 'Feeling of joy and contentment' },
      { word: 'SUNNY', clue: 'Weather condition with bright sunlight' },
      { word: 'CLOUD', clue: 'White fluffy thing in the sky' },
      { word: 'GRASS', clue: 'Green plants covering the ground' },
      { word: 'FROG', clue: 'Amphibian that jumps and croaks' },
      { word: 'BIRD', clue: 'Animal with feathers and wings' },
      { word: 'FISH', clue: 'Aquatic animal that swims' },
      { word: 'BOOK', clue: 'Collection of written pages' },
      { word: 'PEN', clue: 'Writing instrument' },
      { word: 'CUP', clue: 'Container for drinking liquids' },
      { word: 'DOG', clue: 'Man\'s best friend, barks' },
      { word: 'CAT', clue: 'Feline pet that purrs' }
    ],
    medium: [
      { word: 'COMPUTER', clue: 'Electronic device for processing data' },
      { word: 'KEYBOARD', clue: 'Input device with keys for typing' },
      { word: 'MONITOR', clue: 'Screen that displays computer output' },
      { word: 'INTERNET', clue: 'Global network connecting computers' },
      { word: 'BROWSER', clue: 'Software for accessing websites' },
      { word: 'WEBSITE', clue: 'Collection of web pages' },
      { word: 'GUITAR', clue: 'Stringed musical instrument' },
      { word: 'VIOLIN', clue: 'Classical string instrument with a bow' },
      { word: 'PIANO', clue: 'Keyboard musical instrument' },
      { word: 'GARDEN', clue: 'Outdoor space for growing plants' },
      { word: 'FLOWER', clue: 'Colorful part of a plant' },
      { word: 'SUMMER', clue: 'Hottest season of the year' },
      { word: 'WINTER', clue: 'Coldest season with snow' },
      { word: 'SPRING', clue: 'Season when flowers bloom' },
      { word: 'AUTUMN', clue: 'Season with falling leaves' },
      { word: 'PUZZLE', clue: 'Game requiring problem-solving' },
      { word: 'CASTLE', clue: 'Large fortified building' },
      { word: 'BRIDGE', clue: 'Structure spanning a gap' },
      { word: 'RABBIT', clue: 'Small mammal with long ears' },
      { word: 'TIGER', clue: 'Large wild cat with stripes' },
      { word: 'EAGLE', clue: 'Large bird of prey' },
      { word: 'OCEAN', clue: 'Large body of salt water' },
      { word: 'MOUNTAIN', clue: 'Large landform rising above surroundings' }
    ],
    hard: [
      { word: 'PROGRAMMING', clue: 'Writing instructions for computers' },
      { word: 'ALGORITHM', clue: 'Step-by-step problem-solving procedure' },
      { word: 'JAVASCRIPT', clue: 'Popular programming language for web development' },
      { word: 'REACTJS', clue: 'JavaScript library for building user interfaces' },
      { word: 'DATABASE', clue: 'Organized collection of structured data' },
      { word: 'NETWORK', clue: 'Interconnected system of computers' },
      { word: 'ELECTRICITY', clue: 'Flow of electrons through a conductor' },
      { word: 'TELESCOPE', clue: 'Instrument for viewing distant objects' },
      { word: 'MICROPHONE', clue: 'Device that converts sound to electrical signal' },
      { word: 'TELEVISION', clue: 'Device for receiving broadcast signals' },
      { word: 'REFRIGERATOR', clue: 'Appliance for keeping food cold' },
      { word: 'BICYCLE', clue: 'Two-wheeled human-powered vehicle' },
      { word: 'ELEPHANT', clue: 'Largest land animal with a trunk' },
      { word: 'KANGAROO', clue: 'Australian animal that jumps and has a pouch' },
      { word: 'CHAMPAGNE', clue: 'Sparkling wine from a French region' },
      { word: 'RESTAURANT', clue: 'Establishment serving prepared food' },
      { word: 'UNIVERSITY', clue: 'Higher education institution' },
      { word: 'ADVENTURE', clue: 'Exciting or unusual experience' },
      { word: 'MYSTERY', clue: 'Something difficult to understand' },
      { word: 'HISTORICAL', clue: 'Relating to past events' },
      { word: 'MATHEMATICS', clue: 'Science of numbers and quantities' },
      { word: 'SCIENTIFIC', clue: 'Relating to systematic study of nature' }
    ]
  };

  // Hangman drawing stages (7 stages)
  const hangmanStages = [
    `_______
|     |
|     
|     
|     
|     
|_____`,
    `_______
|     |
|     O
|     
|     
|     
|_____`,
    `_______
|     |
|     O
|     |
|     
|     
|_____`,
    `_______
|     |
|     O
|    /|
|     
|     
|_____`,
    `_______
|     |
|     O
|    /|\\
|     
|     
|_____`,
    `_______
|     |
|     O
|    /|\\
|    /
|     
|_____`,
    `_______
|     |
|     O
|    /|\\
|    / \\
|     
|_____`
  ];

  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [wordData, setWordData] = useState<WordData>({ word: '', clue: '' });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [hint, setHint] = useState<string>('');
  const [hintUsed, setHintUsed] = useState<boolean>(false);
  const [gamesPlayed, setGamesPlayed] = useState<number>(0);
  const [gamesWon, setGamesWon] = useState<number>(0);
  const [winStreak, setWinStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);

  // Initialize game
  const initGame = () => {
    const wordList = wordBanks[difficulty];
    const randomWordData = wordList[Math.floor(Math.random() * wordList.length)];
    setWordData(randomWordData);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus('playing');
    setHint('');
    setHintUsed(false);
  };

  // Get hint for the current word
  const getHint = () => {
    if (hintUsed || gameStatus !== 'playing') return;
    
    setHint(wordData.clue);
    setHintUsed(true);
  };

  // Handle letter guess
  const handleGuess = (letter: string) => {
    if (gameStatus !== 'playing' || guessedLetters.includes(letter)) return;
    
    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);
    
    if (!wordData.word.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      
      if (newWrongGuesses >= 6) {
        setGameStatus('lost');
        setGamesPlayed(prev => prev + 1);
        setWinStreak(0);
      }
    } else {
      // Check if player has won
      const hasWon = wordData.word.split('').every(char => newGuessedLetters.includes(char));
      if (hasWon) {
        setGameStatus('won');
        setGamesPlayed(prev => prev + 1);
        setGamesWon(prev => prev + 1);
        const newStreak = winStreak + 1;
        setWinStreak(newStreak);
        if (newStreak > maxStreak) {
          setMaxStreak(newStreak);
        }
      }
    }
  };

  // Handle physical keyboard input
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameStatus !== 'playing') return;
    
    const key = event.key.toUpperCase();
    // Only process letter keys A-Z
    if (key.length === 1 && key >= 'A' && key <= 'Z') {
      handleGuess(key);
    }
  }, [gameStatus, guessedLetters, wordData]);

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // Get win percentage
  const getWinPercentage = () => {
    return gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0;
  };

  // Get word display with guessed letters
  const getWordDisplay = () => {
    return wordData.word
      .split('')
      .map((letter, index) => (
        <span 
          key={index} 
          className="inline-block w-8 h-10 mx-1 text-2xl font-bold text-center border-b-2 border-purple-500"
        >
          {guessedLetters.includes(letter) ? letter : '_'}
        </span>
      ));
  };

  // Get keyboard letters
  const getKeyboardLetters = () => {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
      <button
        key={letter}
        onClick={() => handleGuess(letter)}
        disabled={guessedLetters.includes(letter) || gameStatus !== 'playing'}
        className={`
          w-10 h-10 flex items-center justify-center font-bold rounded-lg transition-all
          ${guessedLetters.includes(letter)
            ? wordData.word.includes(letter)
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
            : gameStatus === 'playing'
              ? 'bg-white/10 text-white hover:bg-white/20 border border-purple-500/30'
              : 'bg-white/5 text-white/50 cursor-not-allowed'
          }
        `}
      >
        {letter}
      </button>
    ));
  };

  // Initialize game on component mount and difficulty change
  useEffect(() => {
    initGame();
  }, [difficulty]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Hangman Game</h2>
        <p className="text-purple-200">Guess the word before the hangman is complete!</p>
      </div>

      {/* Game Controls */}
      <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex gap-3">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all
                  ${difficulty === level
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                  }
                `}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
          
          <button
            onClick={initGame}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <RotateCcw size={16} />
            New Game
          </button>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-500/20 rounded-lg p-3 text-center border border-blue-500/30">
            <div className="text-blue-400 text-sm">Played</div>
            <div className="text-xl font-bold text-white">{gamesPlayed}</div>
          </div>
          
          <div className="bg-green-500/20 rounded-lg p-3 text-center border border-green-500/30">
            <div className="text-green-400 text-sm">Won</div>
            <div className="text-xl font-bold text-white">{gamesWon}</div>
          </div>
          
          <div className="bg-yellow-500/20 rounded-lg p-3 text-center border border-yellow-500/30">
            <div className="text-yellow-400 text-sm">Win %</div>
            <div className="text-xl font-bold text-white">{getWinPercentage()}%</div>
          </div>
          
          <div className="bg-purple-500/20 rounded-lg p-3 text-center border border-purple-500/30">
            <div className="text-purple-400 text-sm">Streak</div>
            <div className="text-xl font-bold text-white">{winStreak}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hangman Drawing */}
        <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-2">Hangman</h3>
            <div className="text-purple-300 text-sm">
              Wrong guesses: {wrongGuesses}/6
            </div>
          </div>
          
          <pre className="text-center text-2xl font-mono text-red-400 bg-black/20 p-4 rounded-lg mb-4">
            {hangmanStages[wrongGuesses]}
          </pre>
          
          {gameStatus === 'lost' && (
            <div className="text-center text-red-400 font-bold text-xl mt-4">
              Game Over! The word was: {wordData.word}
            </div>
          )}
          
          {gameStatus === 'won' && (
            <div className="text-center text-green-400 font-bold text-xl mt-4">
              Congratulations! You won!
            </div>
          )}
        </div>

        {/* Word and Controls */}
        <div className="space-y-6">
          {/* Word Display and Clue */}
          <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Word</h3>
              <div className="text-purple-300 text-sm">
                Difficulty: <span className="capitalize">{difficulty}</span>
              </div>
            </div>
            
            {/* Clue Display */}
            <div className="bg-blue-500/20 rounded-lg p-4 mb-6 border border-blue-500/30">
              <div className="text-blue-300 text-center font-medium">
                Clue: {wordData.clue}
              </div>
            </div>
            
            <div className="flex justify-center flex-wrap my-8">
              {getWordDisplay()}
            </div>
            
            {hint && (
              <div className="mt-6 p-3 bg-blue-500/20 rounded-lg border border-blue-500/30 text-center">
                <div className="text-blue-300 flex items-center justify-center gap-2">
                  <Lightbulb size={16} />
                  <span>{hint}</span>
                </div>
              </div>
            )}
          </div>

          {/* Keyboard */}
          <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Keyboard</h3>
              <button
                onClick={getHint}
                disabled={hintUsed || gameStatus !== 'playing'}
                className={`
                  flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-all
                  ${hintUsed || gameStatus !== 'playing'
                    ? 'bg-white/5 text-white/30 cursor-not-allowed'
                    : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/30'
                  }
                `}
              >
                <Lightbulb size={14} />
                Hint
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {getKeyboardLetters()}
            </div>
            
            <div className="mt-4 text-center text-purple-300 text-sm">
              Tip: You can also use your physical keyboard to guess letters
            </div>
          </div>
        </div>
      </div>

      {/* Game Instructions */}
      <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-lg font-bold text-white mb-3">How to Play</h3>
        <ul className="text-purple-200 space-y-2 text-sm">
          <li>• Read the clue and guess letters to reveal the hidden word</li>
          <li>• Each wrong guess adds a part to the hangman drawing</li>
          <li>• You can use one hint per game to get a clue about the word</li>
          <li>• Guess the word before the hangman is completely drawn to win</li>
          <li>• Game has three difficulty levels with different word lengths</li>
          <li>• Use your physical keyboard or on-screen keyboard to guess letters</li>
        </ul>
        
        <div className="mt-4 pt-4 border-t border-purple-500/20">
          <h4 className="text-white font-medium mb-2">Difficulty Levels</h4>
          <ul className="text-purple-200 space-y-1 text-sm">
            <li>• <span className="text-green-400">Easy</span>: Short words (4-6 letters) - Perfect for beginners</li>
            <li>• <span className="text-yellow-400">Medium</span>: Medium words (7-9 letters) - For experienced players</li>
            <li>• <span className="text-red-400">Hard</span>: Long words (10+ letters) - Ultimate hangman challenge</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HangmanGame;