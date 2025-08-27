import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Zap, Clock, RotateCcw, Play, Pause } from 'lucide-react';

const MathRoastGame = () => {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [timeLimit, setTimeLimit] = useState<number>(60);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [question, setQuestion] = useState<{ 
    num1: number; 
    num2: number; 
    operator: string; 
    answer: number;
    options: number[];
  } | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; type: 'roast' | 'praise' } | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Generate a random math question based on difficulty
  const generateQuestion = () => {
    let num1: number, num2: number, operator: string;
    
    switch (difficulty) {
      case 'easy':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operator = Math.random() > 0.5 ? '+' : '-';
        break;
      case 'medium':
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        const operators = ['+', '-', '*'];
        operator = operators[Math.floor(Math.random() * operators.length)];
        break;
      case 'hard':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        const hardOperators = ['+', '-', '*', '/'];
        operator = hardOperators[Math.floor(Math.random() * hardOperators.length)];
        
        // Ensure division results in whole numbers
        if (operator === '/') {
          num1 = num2 * (Math.floor(Math.random() * 10) + 1);
        }
        break;
      default:
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operator = '+';
    }
    
    let answer: number;
    switch (operator) {
      case '+': answer = num1 + num2; break;
      case '-': answer = num1 - num2; break;
      case '*': answer = num1 * num2; break;
      case '/': answer = num1 / num2; break;
      default: answer = num1 + num2;
    }
    
    // Generate wrong options
    const wrongOptions = [];
    const offset = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 20;
    
    // Generate two wrong options
    wrongOptions.push(answer + Math.floor(Math.random() * offset) + 1);
    wrongOptions.push(answer - Math.floor(Math.random() * offset) - 1);
    
    // Make sure wrong options are not negative (for subtraction problems)
    if (wrongOptions[0] < 0) wrongOptions[0] = Math.abs(wrongOptions[0]);
    if (wrongOptions[1] < 0) wrongOptions[1] = Math.abs(wrongOptions[1]);
    
    // Make sure wrong options are not the same as the correct answer
    if (wrongOptions[0] === answer) wrongOptions[0] += 1;
    if (wrongOptions[1] === answer) wrongOptions[1] -= 1;
    
    // Make sure wrong options are not the same as each other
    if (wrongOptions[0] === wrongOptions[1]) wrongOptions[1] += 1;
    
    // Create options array and shuffle it
    const options = [answer, ...wrongOptions];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    
    return { num1, num2, operator, answer, options };
  };

  // Start the game
  const startGame = () => {
    setGameState('playing');
    setTimeLeft(timeLimit);
    setScore(0);
    setStreak(0);
    setFeedback(null);
    setSelectedOption(null);
    const newQuestion = generateQuestion();
    setQuestion(newQuestion);
    
    // Start the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          setGameState('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000) as unknown as ReturnType<typeof setTimeout>;
  };

  // Reset the game
  const resetGame = () => {
    setGameState('setup');
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setFeedback(null);
    setSelectedOption(null);
  };

  // Handle answer selection
  const selectAnswer = (option: number) => {
    if (!question || selectedOption !== null) return;
    
    setSelectedOption(option);
    const isCorrect = option === question.answer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
        }
        return newStreak;
      });
      
      // Positive feedback
      const praises = [
        "🔥 Nailed it! You're basically a calculator with a PhD!",
        "🧠 Einstein who? You're clearly the next big brain!",
        "🚀 Math wizard level: Expert!",
        "💯 Perfect! Your brain is basically a supercomputer!",
        "🌟 You're making numbers look easy!",
        "🎯 Bullseye! Even Archimedes would be impressed!",
        "⚡ Lightning fast calculations! Are you part robot?",
        "🏆 Math genius detected!",
        "🧮 You're crunching numbers like it's nobody's business!",
        "✨ That's some next-level math magic!"
      ];
      
      const randomPraise = praises[Math.floor(Math.random() * praises.length)];
      setFeedback({ message: randomPraise, type: 'praise' });
    } else {
      setStreak(0);
      
      // Roast feedback
      const roasts = [
        "🤡 Bro… are you allergic to numbers? Back to kindergarten, champ!",
        "😭 Even my dog knows that one!",
        "🤪 Did you use your toes to count? Still wrong!",
        "🤦‍♂️ Yikes! My calculator is crying!",
        "💀 Math is clearly your kryptonite!",
        "🙈 Oops! Did you forget how math works?",
        "😴 Wake me up when you get one right!",
        "🧱 That's as wrong as a square circle!",
        "🙃 Try again, or just give up!",
        "🤪 Numbers must be your nemesis!"
      ];
      
      const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
      setFeedback({ message: randomRoast, type: 'roast' });
    }
    
    // Move to next question after delay
    setTimeout(() => {
      const newQuestion = generateQuestion();
      setQuestion(newQuestion);
      setSelectedOption(null);
      setFeedback(null);
    }, 1500);
  };

  // Get final rank based on score
  const getRank = () => {
    if (score >= 26) return { title: "Human Calculator", emoji: "🚀🔥", color: "text-yellow-400" };
    if (score >= 16) return { title: "Brainiac", emoji: "🧠", color: "text-blue-400" };
    if (score >= 6) return { title: "Math Zombie", emoji: "🧟", color: "text-green-400" };
    return { title: "Number Noob", emoji: "🤡", color: "text-red-400" };
  };

  const rank = getRank();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Trophy size={48} className="mx-auto text-yellow-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">Math Roast Game</h2>
        <p className="text-purple-200">Solve math problems fast! Get roasted for wrong answers, praised for right ones!</p>
      </div>

      {gameState === 'setup' && (
        <div className="bg-white/5 rounded-2xl p-8 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Game Setup</h3>
          
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-3">
                <Zap size={16} />
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['easy', 'medium', 'hard'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`py-3 px-4 rounded-xl border transition-all duration-300 ${
                      difficulty === level
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-white/5 border-purple-500/30 text-purple-300 hover:bg-white/10 hover:border-purple-400'
                    }`}
                  >
                    <span className="capitalize font-medium">{level}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-3">
                <Clock size={16} />
                Time Limit (seconds)
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[30, 60, 90, 120].map((seconds) => (
                  <button
                    key={seconds}
                    onClick={() => setTimeLimit(seconds)}
                    className={`py-3 px-4 rounded-xl border transition-all duration-300 ${
                      timeLimit === seconds
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-white/5 border-purple-500/30 text-purple-300 hover:bg-white/10 hover:border-purple-400'
                    }`}
                  >
                    <span className="font-medium">{seconds}s</span>
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
            >
              <Play size={20} />
              Start Game
            </button>
          </div>
        </div>
      )}

      {gameState === 'playing' && question && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="bg-white/5 rounded-xl p-4 border border-purple-500/20">
              <div className="text-purple-300 text-sm">Time Left</div>
              <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-yellow-400'}`}>
                {timeLeft}s
              </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 border border-purple-500/20">
              <div className="text-purple-300 text-sm">Score</div>
              <div className="text-2xl font-bold text-green-400">{score}</div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 border border-purple-500/20">
              <div className="text-purple-300 text-sm">Streak</div>
              <div className="text-2xl font-bold text-blue-400">{streak}</div>
            </div>
          </div>
          
          {feedback && (
            <div className={`rounded-2xl p-4 border text-center animate-bounce ${
              feedback.type === 'praise' 
                ? 'bg-green-500/20 border-green-500/30 text-green-300' 
                : 'bg-red-500/20 border-red-500/30 text-red-300'
            }`}>
              {feedback.message}
            </div>
          )}
          
          <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl p-8 border border-purple-500/30 text-center">
            <div className="text-5xl font-bold text-white mb-6">
              {question.num1} {question.operator} {question.num2} = ?
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(option)}
                  disabled={selectedOption !== null}
                  className={`py-4 px-6 rounded-xl border-2 text-xl font-bold transition-all duration-300 ${
                    selectedOption === null
                      ? 'bg-white/10 border-purple-500/30 text-white hover:bg-white/20 hover:border-purple-400'
                      : selectedOption === option
                        ? option === question.answer
                          ? 'bg-green-500/30 border-green-500 text-white'
                          : 'bg-red-500/30 border-red-500 text-white'
                        : option === question.answer
                          ? 'bg-green-500/30 border-green-500 text-white'
                          : 'bg-white/5 border-purple-500/30 text-white'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {selectedOption !== null && (
              <div className="mt-6 text-lg">
                {selectedOption === question.answer ? (
                  <span className="text-green-400 font-bold">Correct! Well done!</span>
                ) : (
                  <span className="text-red-400 font-bold">
                    Wrong! The correct answer was {question.answer}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {gameState === 'finished' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl p-8 border border-purple-500/30 text-center">
            <Trophy size={64} className="mx-auto text-yellow-400 mb-4" />
            
            <h3 className="text-2xl font-bold text-white mb-2">Game Over!</h3>
            
            <div className="text-6xl font-bold text-yellow-400 mb-2">{score}</div>
            <div className="text-purple-300 mb-6">Correct Answers</div>
            
            <div className={`text-2xl font-bold mb-2 ${rank.color}`}>
              {rank.emoji} {rank.title}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/5 rounded-xl p-4 border border-purple-500/20">
                <div className="text-purple-300 text-sm">Best Streak</div>
                <div className="text-xl font-bold text-blue-400">{bestStreak}</div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 border border-purple-500/20">
                <div className="text-purple-300 text-sm">Difficulty</div>
                <div className="text-xl font-bold text-purple-400 capitalize">{difficulty}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Performance Analysis</h4>
            
            <div className="space-y-3">
              {score <= 5 ? (
                <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                  <p className="text-red-300 text-center">"Bro… are you allergic to numbers? Back to kindergarten, champ 🤡"</p>
                </div>
              ) : score <= 15 ? (
                <div className="p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
                  <p className="text-orange-300 text-center">"Okay, calculator's little cousin… not bad."</p>
                </div>
              ) : score <= 25 ? (
                <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                  <p className="text-green-300 text-center">"You eat numbers for breakfast, don't you?"</p>
                </div>
              ) : (
                <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                  <p className="text-yellow-300 text-center">"Einstein 2.0 unlocked 🚀🔥"</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={startGame}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              Play Again
            </button>
            
            <button
              onClick={resetGame}
              className="flex-1 py-3 bg-white/10 text-purple-300 border border-purple-500/30 rounded-xl hover:bg-white/20 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Trophy size={20} />
              New Game
            </button>
          </div>
        </div>
      )}
      
      <div className="bg-purple-500/10 rounded-2xl p-4 border border-purple-500/20">
        <p className="text-purple-300 text-sm text-center">
          🎮 <strong>How to Play:</strong> Solve as many math problems as you can before time runs out! 
          Select the correct answer from the three options. Get roasted for wrong answers and praised for correct ones. Try to beat your high score!
        </p>
      </div>
    </div>
  );
};

export default MathRoastGame;