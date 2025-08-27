import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, Timer, Target, TrendingUp } from 'lucide-react';

const TypingSpeedTest = () => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [testDuration, setTestDuration] = useState(60);
  const [results, setResults] = useState<{
    wpm: number;
    accuracy: number;
    correctChars: number;
    totalChars: number;
    errors: number;
  } | null>(null);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is commonly used for typing practice. It helps improve finger dexterity and keyboard familiarity.",
    "Technology has revolutionized the way we communicate, work, and live. From smartphones to artificial intelligence, innovation continues to shape our future in unprecedented ways.",
    "Learning to type efficiently is a valuable skill in today's digital world. Practice makes perfect, and consistent effort will lead to improved speed and accuracy over time.",
    "The art of programming requires patience, logic, and creativity. Developers solve complex problems by breaking them down into smaller, manageable components.",
    "Climate change is one of the most pressing challenges of our time. Sustainable practices and renewable energy sources are essential for protecting our planet's future."
  ];

  useEffect(() => {
    resetTest();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      finishTest();
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const resetTest = () => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(randomText);
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIsActive(false);
    setTimeLeft(testDuration);
    setResults(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const startTest = () => {
    if (!isActive) {
      setStartTime(Date.now());
      setIsActive(true);
    }
  };

  const finishTest = () => {
    if (isActive) {
      setEndTime(Date.now());
      setIsActive(false);
      calculateResults();
    }
  };

  const calculateResults = () => {
    const timeElapsed = (testDuration - timeLeft) / 60; // in minutes
    const wordsTyped = userInput.trim().split(' ').length;
    const wpm = Math.round(wordsTyped / timeElapsed);
    
    let correctChars = 0;
    let errors = 0;
    
    for (let i = 0; i < userInput.length; i++) {
      if (i < text.length && userInput[i] === text[i]) {
        correctChars++;
      } else {
        errors++;
      }
    }
    
    const accuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 0;
    
    setResults({
      wpm: isNaN(wpm) ? 0 : wpm,
      accuracy,
      correctChars,
      totalChars: userInput.length,
      errors
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    if (!isActive && value.length > 0) {
      startTest();
    }
    
    if (value.length <= text.length) {
      setUserInput(value);
    }
    
    if (value.length === text.length) {
      finishTest();
    }
  };

  const getCharacterClass = (index: number) => {
    if (index >= userInput.length) {
      return 'text-gray-400';
    }
    
    if (userInput[index] === text[index]) {
      return 'text-green-400 bg-green-400/20';
    } else {
      return 'text-red-400 bg-red-400/20';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <Keyboard size={48} className="mx-auto text-purple-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Typing Speed Test</h2>
        <p className="text-purple-200">Test your typing speed and accuracy</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white/5 rounded-2xl p-4 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Timer className="text-blue-400" size={20} />
              <span className="text-purple-300 text-sm">Time Left</span>
            </div>
            <div className="text-2xl font-bold text-white">{formatTime(timeLeft)}</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-green-400" size={20} />
              <span className="text-purple-300 text-sm">WPM</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {results ? results.wpm : isActive ? Math.round((userInput.trim().split(' ').length / ((testDuration - timeLeft) / 60)) || 0) : 0}
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="text-yellow-400" size={20} />
              <span className="text-purple-300 text-sm">Accuracy</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {results ? results.accuracy : userInput.length > 0 ? Math.round((userInput.split('').filter((char, i) => char === text[i]).length / userInput.length) * 100) : 100}%
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-purple-300 text-sm font-medium">Test Duration</label>
            <select
              value={testDuration}
              onChange={(e) => {
                setTestDuration(parseInt(e.target.value));
                setTimeLeft(parseInt(e.target.value));
              }}
              disabled={isActive}
              className="w-full px-3 py-2 bg-white/5 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400 disabled:opacity-50"
            >
              <option value={30} className="bg-gray-800">30 seconds</option>
              <option value={60} className="bg-gray-800">1 minute</option>
              <option value={120} className="bg-gray-800">2 minutes</option>
              <option value={300} className="bg-gray-800">5 minutes</option>
            </select>
          </div>
        </div>

        {/* Test Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">Type the following text:</h3>
            
            <div className="bg-black/20 rounded-xl p-4 mb-4 font-mono text-lg leading-relaxed max-h-40 overflow-y-auto">
              {text.split('').map((char, index) => (
                <span key={index} className={getCharacterClass(index)}>
                  {char}
                </span>
              ))}
            </div>

            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              disabled={timeLeft === 0}
              className="w-full h-32 px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 font-mono resize-none"
              placeholder={isActive ? "Keep typing..." : "Start typing to begin the test..."}
            />

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-purple-300">
                Progress: {userInput.length}/{text.length} characters
              </div>
              <button
                onClick={resetTest}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
              >
                Reset Test
              </button>
            </div>
          </div>

          {results && (
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Test Results</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{results.wpm}</div>
                  <div className="text-purple-300 text-sm">WPM</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{results.accuracy}%</div>
                  <div className="text-purple-300 text-sm">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{results.correctChars}</div>
                  <div className="text-purple-300 text-sm">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{results.errors}</div>
                  <div className="text-purple-300 text-sm">Errors</div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <div className="text-purple-200 text-sm">
                  {results.wpm >= 40 ? 'Excellent!' : results.wpm >= 30 ? 'Good job!' : results.wpm >= 20 ? 'Keep practicing!' : 'Practice makes perfect!'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypingSpeedTest;