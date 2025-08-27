import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Play, User, Bot } from 'lucide-react';

const Pong2D = () => {
  // Game constants
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 400;
  const PADDLE_WIDTH = 10;
  const PADDLE_HEIGHT = 80;
  const BALL_SIZE = 10;
  const PADDLE_SPEED = 6;
  const INITIAL_BALL_SPEED = 4;
  const WINNING_SCORE = 5;

  // Game state
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'paused' | 'gameOver'>('idle');
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [gameMode, setGameMode] = useState<'pvp' | 'pvc'>('pvp');
  const [winner, setWinner] = useState<'player1' | 'player2' | null>(null);
  
  // Refs for game objects
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const player1PaddleRef = useRef({ y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 });
  const player2PaddleRef = useRef({ y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 });
  const ballRef = useRef({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    dx: INITIAL_BALL_SPEED,
    dy: INITIAL_BALL_SPEED
  });
  const keysRef = useRef({ w: false, s: false, arrowup: false, arrowdown: false });
  
  // Funny messages
  const victoryMessages = [
    "Pong Master! 🏆",
    "Table Tennis Legend! 🏓",
    "Bounce Champion!  bounce",
    "Pixel Paddle Pro! 🎮",
    "Retro Ruler! 🕹️"
  ];
  
  const defeatMessages = [
    "Go touch grass 🌱",
    "Practice makes perfect! 💪",
    "Better luck next time! 🍀",
    "Nice try! 👏",
    "Git gud! 😄"
  ];

  // Get random message
  const getRandomMessage = (messages: string[]) => {
    return messages[Math.floor(Math.random() * messages.length)];
  };

  // Reset ball position
  const resetBall = () => {
    ballRef.current.x = CANVAS_WIDTH / 2;
    ballRef.current.y = CANVAS_HEIGHT / 2;
    
    // Random direction
    const angle = (Math.random() * Math.PI / 2) - Math.PI / 4;
    const direction = Math.random() > 0.5 ? 1 : -1;
    
    ballRef.current.dx = INITIAL_BALL_SPEED * Math.cos(angle) * direction;
    ballRef.current.dy = INITIAL_BALL_SPEED * Math.sin(angle);
  };

  // Reset game
  const resetGame = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setWinner(null);
    player1PaddleRef.current.y = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2;
    player2PaddleRef.current.y = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2;
    resetBall();
  };

  // Start game
  const startGame = () => {
    resetGame();
    setGameState('playing');
  };

  // Pause/resume game
  const togglePause = () => {
    setGameState(prev => prev === 'playing' ? 'paused' : 'playing');
  };

  // Handle key events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for arrow keys and WASD to stop page scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'W', 's', 'S'].includes(e.key)) {
        e.preventDefault();
      }
      
      if (e.key === 'w' || e.key === 'W') keysRef.current.w = true;
      if (e.key === 's' || e.key === 'S') keysRef.current.s = true;
      if (e.key === 'ArrowUp') keysRef.current.arrowup = true;
      if (e.key === 'ArrowDown') keysRef.current.arrowdown = true;
      if (e.key === ' ') togglePause();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Prevent default behavior for arrow keys and WASD to stop page scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'W', 's', 'S'].includes(e.key)) {
        e.preventDefault();
      }
      
      if (e.key === 'w' || e.key === 'W') keysRef.current.w = false;
      if (e.key === 's' || e.key === 'S') keysRef.current.s = false;
      if (e.key === 'ArrowUp') keysRef.current.arrowup = false;
      if (e.key === 'ArrowDown') keysRef.current.arrowdown = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = '#0f0f23';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw center line
      ctx.setLineDash([5, 15]);
      ctx.beginPath();
      ctx.moveTo(CANVAS_WIDTH / 2, 0);
      ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
      ctx.strokeStyle = '#a78bfa';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);

      // Move paddles
      if (keysRef.current.w && player1PaddleRef.current.y > 0) {
        player1PaddleRef.current.y -= PADDLE_SPEED;
      }
      if (keysRef.current.s && player1PaddleRef.current.y < CANVAS_HEIGHT - PADDLE_HEIGHT) {
        player1PaddleRef.current.y += PADDLE_SPEED;
      }

      // Player 2 movement (PvP or PvC)
      if (gameMode === 'pvp') {
        if (keysRef.current.arrowup && player2PaddleRef.current.y > 0) {
          player2PaddleRef.current.y -= PADDLE_SPEED;
        }
        if (keysRef.current.arrowdown && player2PaddleRef.current.y < CANVAS_HEIGHT - PADDLE_HEIGHT) {
          player2PaddleRef.current.y += PADDLE_SPEED;
        }
      } else {
        // AI movement
        const paddleCenter = player2PaddleRef.current.y + PADDLE_HEIGHT / 2;
        const ballY = ballRef.current.y;
        
        if (paddleCenter < ballY - 35 && player2PaddleRef.current.y < CANVAS_HEIGHT - PADDLE_HEIGHT) {
          player2PaddleRef.current.y += PADDLE_SPEED * 0.9; // Slightly slower AI
        } else if (paddleCenter > ballY + 35 && player2PaddleRef.current.y > 0) {
          player2PaddleRef.current.y -= PADDLE_SPEED * 0.9;
        }
      }

      // Move ball
      ballRef.current.x += ballRef.current.dx;
      ballRef.current.y += ballRef.current.dy;

      // Ball collision with top and bottom walls
      if (ballRef.current.y <= 0 || ballRef.current.y >= CANVAS_HEIGHT - BALL_SIZE) {
        ballRef.current.dy = -ballRef.current.dy;
      }

      // Ball collision with paddles
      // Player 1 paddle
      if (
        ballRef.current.x <= PADDLE_WIDTH &&
        ballRef.current.y + BALL_SIZE >= player1PaddleRef.current.y &&
        ballRef.current.y <= player1PaddleRef.current.y + PADDLE_HEIGHT
      ) {
        // Calculate bounce angle based on where ball hits paddle
        const hitPosition = (ballRef.current.y - player1PaddleRef.current.y) / PADDLE_HEIGHT;
        const bounceAngle = (hitPosition - 0.5) * Math.PI / 1.5; // -75 to 75 degrees
        
        const speed = Math.sqrt(ballRef.current.dx * ballRef.current.dx + ballRef.current.dy * ballRef.current.dy) * 1.05;
        ballRef.current.dx = Math.abs(Math.cos(bounceAngle) * speed);
        ballRef.current.dy = Math.sin(bounceAngle) * speed;
      }

      // Player 2 paddle
      if (
        ballRef.current.x >= CANVAS_WIDTH - PADDLE_WIDTH - BALL_SIZE &&
        ballRef.current.y + BALL_SIZE >= player2PaddleRef.current.y &&
        ballRef.current.y <= player2PaddleRef.current.y + PADDLE_HEIGHT
      ) {
        // Calculate bounce angle based on where ball hits paddle
        const hitPosition = (ballRef.current.y - player2PaddleRef.current.y) / PADDLE_HEIGHT;
        const bounceAngle = (hitPosition - 0.5) * Math.PI / 1.5; // -75 to 75 degrees
        
        const speed = Math.sqrt(ballRef.current.dx * ballRef.current.dx + ballRef.current.dy * ballRef.current.dy) * 1.05;
        ballRef.current.dx = -Math.abs(Math.cos(bounceAngle) * speed);
        ballRef.current.dy = Math.sin(bounceAngle) * speed;
      }

      // Scoring
      if (ballRef.current.x < 0) {
        // Player 2 scores
        setPlayer2Score(prev => {
          const newScore = prev + 1;
          if (newScore >= WINNING_SCORE) {
            setWinner('player2');
            setGameState('gameOver');
          }
          return newScore;
        });
        resetBall();
      } else if (ballRef.current.x > CANVAS_WIDTH) {
        // Player 1 scores
        setPlayer1Score(prev => {
          const newScore = prev + 1;
          if (newScore >= WINNING_SCORE) {
            setWinner('player1');
            setGameState('gameOver');
          }
          return newScore;
        });
        resetBall();
      }

      // Draw paddles
      ctx.fillStyle = '#8b5cf6';
      ctx.fillRect(0, player1PaddleRef.current.y, PADDLE_WIDTH, PADDLE_HEIGHT);
      ctx.fillRect(CANVAS_WIDTH - PADDLE_WIDTH, player2PaddleRef.current.y, PADDLE_WIDTH, PADDLE_HEIGHT);

      // Draw ball
      ctx.fillStyle = '#ec4899';
      ctx.fillRect(ballRef.current.x, ballRef.current.y, BALL_SIZE, BALL_SIZE);

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState, gameMode]);

  // Switch game mode
  const switchMode = () => {
    setGameMode(prev => prev === 'pvp' ? 'pvc' : 'pvp');
    if (gameState === 'gameOver') {
      resetGame();
      setGameState('idle');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 w-full">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Pong 2D – Retro Table Tennis</h2>
        <p className="text-purple-200">Classic arcade-style Pong game</p>
      </div>

      {/* Game Mode Toggle */}
      <div className="flex justify-center">
        <button
          onClick={switchMode}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600/30 text-purple-300 rounded-lg hover:bg-purple-600/50 transition-colors"
        >
          {gameMode === 'pvp' ? (
            <>
              <Bot size={16} />
              <span>Switch to vs Computer</span>
            </>
          ) : (
            <>
              <User size={16} />
              <span>Switch to Player vs Player</span>
            </>
          )}
        </button>
      </div>

      {/* Score Board */}
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        <div className="bg-blue-500/20 rounded-lg p-4 text-center border border-blue-500/30">
          <div className="text-blue-400 font-semibold">Player 1</div>
          <div className="text-2xl font-bold text-white">{player1Score}</div>
        </div>
        
        <div className="bg-purple-500/20 rounded-lg p-4 text-center border border-purple-500/30">
          <div className="text-purple-400 font-semibold">First to {WINNING_SCORE}</div>
          <div className="text-2xl font-bold text-white">Wins</div>
        </div>
        
        <div className="bg-orange-500/20 rounded-lg p-4 text-center border border-orange-500/30">
          <div className="text-orange-400 font-semibold">
            {gameMode === 'pvc' ? 'Computer' : 'Player 2'}
          </div>
          <div className="text-2xl font-bold text-white">{player2Score}</div>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="flex justify-center">
        <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-4 border border-purple-500/30">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="bg-gray-900 rounded-lg"
          />
        </div>
      </div>

      {/* Game Controls Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/30">
          <h3 className="text-lg font-bold text-white mb-3">Player 1 Controls</h3>
          <ul className="text-purple-200 space-y-2">
            <li className="flex items-center gap-2">
              <span className="bg-purple-600/30 px-2 py-1 rounded">W</span>
              <span>Move Up</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-purple-600/30 px-2 py-1 rounded">S</span>
              <span>Move Down</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/30">
          <h3 className="text-lg font-bold text-white mb-3">
            {gameMode === 'pvc' ? 'Computer' : 'Player 2'} Controls
          </h3>
          {gameMode === 'pvc' ? (
            <p className="text-purple-200">Computer controls the right paddle automatically</p>
          ) : (
            <ul className="text-purple-200 space-y-2">
              <li className="flex items-center gap-2">
                <span className="bg-purple-600/30 px-2 py-1 rounded">↑</span>
                <span>Move Up</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-purple-600/30 px-2 py-1 rounded">↓</span>
                <span>Move Down</span>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Game Status Messages */}
      {gameState === 'idle' && (
        <div className="text-center text-purple-300">
          Press Start Game to begin!
        </div>
      )}
      
      {gameState === 'paused' && (
        <div className="text-center text-yellow-400 font-bold text-xl">
          Game Paused - Press Space to Resume
        </div>
      )}
      
      {gameState === 'gameOver' && winner && (
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-6 border border-purple-500/30 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            {winner === 'player1' ? 'Player 1 Wins!' : 
             gameMode === 'pvc' ? 'Computer Wins!' : 'Player 2 Wins!'}
          </h3>
          <p className="text-xl text-purple-200 mb-4">
            {winner === 'player1' 
              ? getRandomMessage(victoryMessages) 
              : getRandomMessage(defeatMessages)}
          </p>
        </div>
      )}

      {/* Game Controls */}
      <div className="flex flex-wrap gap-4 justify-center">
        {gameState === 'idle' ? (
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Play size={20} />
            <span>Start Game</span>
          </button>
        ) : gameState === 'gameOver' ? (
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <RotateCcw size={20} />
            <span>Play Again</span>
          </button>
        ) : (
          <>
            <button
              onClick={togglePause}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {gameState === 'paused' ? 'Resume' : 'Pause'}
            </button>
            
            <button
              onClick={() => {
                setGameState('idle');
                resetGame();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
          </>
        )}
      </div>

      {/* Game Instructions */}
      <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-bold text-white mb-3">How to Play</h3>
        <ul className="text-purple-200 space-y-2 text-sm">
          <li>• Prevent the ball from passing your paddle</li>
          <li>• First player to reach {WINNING_SCORE} points wins</li>
          <li>• Press Space to pause/resume the game</li>
          <li>• The ball speeds up slightly after each paddle hit</li>
        </ul>
      </div>
    </div>
  );
};

export default Pong2D;