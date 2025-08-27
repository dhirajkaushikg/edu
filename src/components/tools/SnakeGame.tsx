import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Play, Pause, Square } from 'lucide-react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };
type GameStatus = 'waiting' | 'playing' | 'paused' | 'game-over';

const SnakeGame = () => {
  // Game constants
  const GRID_SIZE = 20;
  const CELL_SIZE = 20;
  const INITIAL_SPEED = 150;
  const MIN_SPEED = 50;
  
  // Game state
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameStatus, setGameStatus] = useState<GameStatus>('waiting');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  
  // Refs
  const directionRef = useRef<Direction>(direction);
  const gameStatusRef = useRef<GameStatus>(gameStatus);
  const snakeRef = useRef<Position[]>(snake);
  const foodRef = useRef<Position>(food);
  
  // Update refs when state changes
  useEffect(() => {
    directionRef.current = direction;
    gameStatusRef.current = gameStatus;
    snakeRef.current = snake;
    foodRef.current = food;
  }, [direction, gameStatus, snake, food]);
  
  // Generate random food position
  const generateFood = useCallback((): Position => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    
    // Make sure food doesn't appear on snake
    const isOnSnake = snakeRef.current.some(
      segment => segment.x === newFood.x && segment.y === newFood.y
    );
    
    if (isOnSnake) {
      return generateFood();
    }
    
    return newFood;
  }, []);
  
  // Initialize game
  const initGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    const initialFood = generateFood();
    
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection('RIGHT');
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameStatus('playing');
  }, [generateFood]);
  
  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for arrow keys to stop page scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      
      if (gameStatusRef.current === 'game-over' && e.key === ' ') {
        initGame();
        return;
      }
      
      if (gameStatusRef.current !== 'playing') return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current !== 'DOWN') {
            setDirection('UP');
          }
          break;
        case 'ArrowDown':
          if (directionRef.current !== 'UP') {
            setDirection('DOWN');
          }
          break;
        case 'ArrowLeft':
          if (directionRef.current !== 'RIGHT') {
            setDirection('LEFT');
          }
          break;
        case 'ArrowRight':
          if (directionRef.current !== 'LEFT') {
            setDirection('RIGHT');
          }
          break;
        case ' ':
          setGameStatus(prev => prev === 'playing' ? 'paused' : 'playing');
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [initGame]);
  
  // Game loop
  useEffect(() => {
    if (gameStatus !== 'playing') return;
    
    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };
        
        // Move head based on direction
        switch (directionRef.current) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }
        
        // Check wall collision
        if (
          head.x < 0 || 
          head.x >= GRID_SIZE || 
          head.y < 0 || 
          head.y >= GRID_SIZE
        ) {
          setGameStatus('game-over');
          if (score > highScore) {
            setHighScore(score);
          }
          return prevSnake;
        }
        
        // Check self collision
        if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameStatus('game-over');
          if (score > highScore) {
            setHighScore(score);
          }
          return prevSnake;
        }
        
        const newSnake = [head, ...prevSnake];
        
        // Check food collision
        if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
          // Increase score
          const newScore = score + 10;
          setScore(newScore);
          
          // Increase speed (up to a limit)
          if (speed > MIN_SPEED && newScore % 50 === 0) {
            setSpeed(prev => Math.max(MIN_SPEED, prev - 10));
          }
          
          // Generate new food
          setFood(generateFood());
        } else {
          // Remove tail if no food eaten
          newSnake.pop();
        }
        
        return newSnake;
      });
    };
    
    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [gameStatus, speed, score, highScore, generateFood]);
  
  // Render game cell
  const renderCell = (x: number, y: number) => {
    // Check if this cell is part of the snake
    const isSnakeHead = snake[0].x === x && snake[0].y === y;
    const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
    
    // Check if this cell is food
    const isFood = food.x === x && food.y === y;
    
    let cellClass = 'border border-gray-800';
    
    if (isSnakeHead) {
      cellClass += ' bg-green-500';
    } else if (isSnakeBody) {
      cellClass += ' bg-green-400';
    } else if (isFood) {
      cellClass += ' bg-red-500 rounded-full';
    } else {
      cellClass += ' bg-gray-800';
    }
    
    return (
      <div
        key={`${x}-${y}`}
        className={cellClass}
        style={{ width: CELL_SIZE, height: CELL_SIZE }}
      />
    );
  };
  
  // Create game grid
  const renderGrid = () => {
    const grid = [];
    
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        grid.push(renderCell(x, y));
      }
    }
    
    return grid;
  };
  
  // Control buttons
  const renderControls = () => (
    <div className="flex justify-center gap-4 mt-4">
      {gameStatus === 'waiting' || gameStatus === 'game-over' ? (
        <button
          onClick={initGame}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Play size={16} />
          <span>{gameStatus === 'game-over' ? 'Play Again' : 'Start Game'}</span>
        </button>
      ) : (
        <>
          <button
            onClick={() => setGameStatus(gameStatus === 'playing' ? 'paused' : 'playing')}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            {gameStatus === 'playing' ? <Pause size={16} /> : <Play size={16} />}
            <span>{gameStatus === 'playing' ? 'Pause' : 'Resume'}</span>
          </button>
          
          <button
            onClick={() => {
              setGameStatus('waiting');
              initGame();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Square size={16} />
            <span>Reset</span>
          </button>
        </>
      )}
    </div>
  );
  
  // Direction buttons for mobile
  const renderDirectionButtons = () => (
    <div className="mt-6 md:hidden">
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => direction !== 'DOWN' && setDirection('UP')}
          className="w-12 h-12 bg-purple-600/30 text-white rounded-lg flex items-center justify-center hover:bg-purple-600/50 transition-colors"
          aria-label="Move up"
        >
          ↑
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
            className="w-12 h-12 bg-purple-600/30 text-white rounded-lg flex items-center justify-center hover:bg-purple-600/50 transition-colors"
            aria-label="Move left"
          >
            ←
          </button>
          
          <button
            onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
            className="w-12 h-12 bg-purple-600/30 text-white rounded-lg flex items-center justify-center hover:bg-purple-600/50 transition-colors"
            aria-label="Move right"
          >
            →
          </button>
        </div>
        
        <button
          onClick={() => direction !== 'UP' && setDirection('DOWN')}
          className="w-12 h-12 bg-purple-600/30 text-white rounded-lg flex items-center justify-center hover:bg-purple-600/50 transition-colors"
          aria-label="Move down"
        >
          ↓
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Snake Game</h2>
        <p className="text-purple-200">Classic snake game with a modern twist</p>
      </div>
      
      {/* Score Board */}
      <div className="flex justify-between items-center bg-white/5 rounded-xl p-4 border border-purple-500/30">
        <div className="text-center">
          <div className="text-purple-300 text-sm">Score</div>
          <div className="text-2xl font-bold text-white">{score}</div>
        </div>
        
        <div className="text-center">
          <div className="text-purple-300 text-sm">High Score</div>
          <div className="text-2xl font-bold text-white">{highScore}</div>
        </div>
        
        <div className="text-center">
          <div className="text-purple-300 text-sm">Speed</div>
          <div className="text-2xl font-bold text-white">{Math.round((INITIAL_SPEED - speed + MIN_SPEED) / 10) + 1}</div>
        </div>
      </div>
      
      {/* Game Status */}
      {gameStatus !== 'playing' && (
        <div className="text-center py-4">
          <div className="text-xl font-semibold text-white">
            {gameStatus === 'waiting' && 'Press Start to Play'}
            {gameStatus === 'paused' && 'Game Paused'}
            {gameStatus === 'game-over' && `Game Over! Score: ${score}`}
          </div>
          {gameStatus === 'game-over' && score > 0 && (
            <div className="text-purple-300 mt-2">
              {score === highScore ? '🎉 New High Score! 🎉' : `High Score: ${highScore}`}
            </div>
          )}
        </div>
      )}
      
      {/* Game Grid */}
      <div 
        className="grid mx-auto bg-black/50 border-2 border-gray-700 rounded-lg overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          width: GRID_SIZE * CELL_SIZE
        }}
      >
        {renderGrid()}
      </div>
      
      {/* Controls */}
      {renderControls()}
      
      {/* Mobile Direction Buttons */}
      {renderDirectionButtons()}
      
      {/* Instructions */}
      <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-bold text-white mb-3">How to Play</h3>
        <ul className="text-purple-200 space-y-2 text-sm">
          <li>• Use arrow keys to control the snake direction</li>
          <li>• Eat the red food to grow and earn points</li>
          <li>• Avoid hitting walls or yourself</li>
          <li>• Press SPACE to pause/resume the game</li>
          <li>• Game speeds up as your score increases</li>
        </ul>
        
        <div className="mt-4 pt-4 border-t border-purple-500/20">
          <h4 className="text-white font-medium mb-2">Mobile Controls</h4>
          <p className="text-purple-200 text-sm">
            Use the directional buttons below the game grid on mobile devices
          </p>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;