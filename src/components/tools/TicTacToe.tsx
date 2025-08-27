import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { RotateCcw, User, Bot } from 'lucide-react';

type Player = 'X' | 'O';
type BoardState = (Player | null)[];
type GameMode = 'pvp' | 'pvc';
type GameStatus = 'playing' | 'won' | 'draw';

const TicTacToe = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [gameMode, setGameMode] = useState<GameMode>('pvp');
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  // Winning combinations
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  // Check for winner or draw
  useEffect(() => {
    // Check for winner
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setGameStatus('won');
        setWinningLine(pattern);
        setScores(prev => ({
          ...prev,
          [board[a]!]: prev[board[a] as Player] + 1
        }));
        return;
      }
    }

    // Check for draw
    if (!board.includes(null)) {
      setGameStatus('draw');
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      return;
    }
  }, [board]);

  // Computer move logic
  useEffect(() => {
    if (gameMode === 'pvc' && currentPlayer === 'O' && gameStatus === 'playing') {
      setIsComputerThinking(true);
      const timer = setTimeout(() => {
        makeComputerMove();
        setIsComputerThinking(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameStatus, gameMode, board]);

  const makeComputerMove = () => {
    // Try to win
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] === 'O' && board[b] === 'O' && board[c] === null) {
        handleCellClick(c);
        return;
      }
      if (board[a] === 'O' && board[c] === 'O' && board[b] === null) {
        handleCellClick(b);
        return;
      }
      if (board[b] === 'O' && board[c] === 'O' && board[a] === null) {
        handleCellClick(a);
        return;
      }
    }

    // Try to block player
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] === 'X' && board[b] === 'X' && board[c] === null) {
        handleCellClick(c);
        return;
      }
      if (board[a] === 'X' && board[c] === 'X' && board[b] === null) {
        handleCellClick(b);
        return;
      }
      if (board[b] === 'X' && board[c] === 'X' && board[a] === null) {
        handleCellClick(a);
        return;
      }
    }

    // Take center if available
    if (board[4] === null) {
      handleCellClick(4);
      return;
    }

    // Take a corner if available
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(index => board[index] === null);
    if (availableCorners.length > 0) {
      const randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)];
      handleCellClick(randomCorner);
      return;
    }

    // Take any available spot
    const availableSpots = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null) as number[];
    if (availableSpots.length > 0) {
      const randomSpot = availableSpots[Math.floor(Math.random() * availableSpots.length)];
      handleCellClick(randomSpot);
    }
  };

  const handleCellClick = (index: number) => {
    if (board[index] || gameStatus !== 'playing') return;
    
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameStatus('playing');
    setWinner(null);
    setWinningLine([]);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 });
    resetGame();
  };

  const switchMode = () => {
    setGameMode(gameMode === 'pvp' ? 'pvc' : 'pvp');
    resetGame();
  };

  const getStatusMessage = () => {
    if (gameStatus === 'won') {
      return gameMode === 'pvc' && winner === 'O' 
        ? 'Computer wins!' 
        : `Player ${winner} wins!`;
    }
    if (gameStatus === 'draw') {
      return "It's a draw!";
    }
    if (gameMode === 'pvc' && currentPlayer === 'O') {
      return isComputerThinking ? "Computer is thinking..." : "Computer's turn";
    }
    return `Player ${currentPlayer}'s turn`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Helmet>
        <title>Play Tic Tac Toe Online | Classic X and O Game</title>
        <meta name="description" content="Play classic Tic Tac Toe (X and O) online for free. Challenge friends or play against computer AI. Enjoy this timeless strategy game with modern design." />
        <meta name="keywords" content="tic tac toe online, play x and o game, free tic tac toe, online strategy game, classic board game" />
        <meta name="author" content="Edurance Hub" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Play Tic Tac Toe Online | Classic X and O Game" />
        <meta property="og:description" content="Play classic Tic Tac Toe (X and O) online for free. Challenge friends or play against computer AI. Enjoy this timeless strategy game with modern design." />
        <meta property="og:type" content="game" />
        <meta property="og:url" content="https://edurancehub.com/games/tic-tac-toe" />
        <meta property="og:image" content="https://edurancehub.com/images/tic-tac-toe-preview.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Play Tic Tac Toe Online | Classic X and O Game" />
        <meta name="twitter:description" content="Play classic Tic Tac Toe (X and O) online for free. Challenge friends or play against computer AI. Enjoy this timeless strategy game with modern design." />
        <meta name="twitter:image" content="https://edurancehub.com/images/tic-tac-toe-preview.jpg" />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Game",
            "name": "Tic Tac Toe",
            "description": "Classic game of X's and O's with player vs player and player vs computer modes",
            "gameLocation": "Web browser",
            "genre": ["Strategy", "Puzzle"],
            "playMode": ["SinglePlayer", "MultiPlayer"],
            "applicationCategory": "GameApplication",
            "url": "https://edurancehub.com/games/tic-tac-toe"
          })}
        </script>
      </Helmet>
      
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Tic Tac Toe</h2>
        <p className="text-purple-200">Classic game of X's and O's</p>
      </div>

      {/* Game Mode Toggle */}
      <div className="flex justify-center">
        <button
          onClick={switchMode}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600/30 text-purple-300 rounded-lg hover:bg-purple-600/50 transition-colors"
        >
          {gameMode === 'pvp' ? (
            <>
              <User size={16} />
              <span>Switch to vs Computer</span>
            </>
          ) : (
            <>
              <Bot size={16} />
              <span>Switch to Player vs Player</span>
            </>
          )}
        </button>
      </div>

      {/* Game Status */}
      <div className="text-center">
        <div className="text-xl font-semibold text-white mb-2">
          {getStatusMessage()}
        </div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            disabled={cell !== null || gameStatus !== 'playing' || (gameMode === 'pvc' && currentPlayer === 'O')}
            className={`
              aspect-square flex items-center justify-center text-4xl font-bold rounded-xl transition-all duration-300
              ${winningLine.includes(index) 
                ? 'bg-green-500/30 border-2 border-green-500' 
                : 'bg-white/10 border border-purple-500/30 hover:bg-white/20'}
              ${cell === 'X' ? 'text-blue-400' : cell === 'O' ? 'text-orange-400' : 'text-white'}
              ${cell === null && gameStatus === 'playing' ? 'cursor-pointer' : 'cursor-default'}
            `}
          >
            {cell}
          </button>
        ))}
      </div>

      {/* Game Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <RotateCcw size={16} />
          <span>New Game</span>
        </button>
        
        <button
          onClick={resetScores}
          className="px-4 py-2 bg-white/10 text-purple-300 border border-purple-500/30 rounded-lg hover:bg-white/20 transition-colors"
        >
          Reset Scores
        </button>
      </div>

      {/* Score Board */}
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        <div className="bg-blue-500/20 rounded-lg p-4 text-center border border-blue-500/30">
          <div className="text-blue-400 font-semibold">Player X</div>
          <div className="text-2xl font-bold text-white">{scores.X}</div>
        </div>
        
        <div className="bg-purple-500/20 rounded-lg p-4 text-center border border-purple-500/30">
          <div className="text-purple-400 font-semibold">Draws</div>
          <div className="text-2xl font-bold text-white">{scores.draws}</div>
        </div>
        
        <div className="bg-orange-500/20 rounded-lg p-4 text-center border border-orange-500/30">
          <div className="text-orange-400 font-semibold">
            {gameMode === 'pvp' ? 'Player O' : 'Computer'}
          </div>
          <div className="text-2xl font-bold text-white">{scores.O}</div>
        </div>
      </div>

      {/* Game Mode Info */}
      <div className="text-center text-sm text-purple-300">
        {gameMode === 'pvp' 
          ? 'Player vs Player: Take turns placing X and O' 
          : 'Player vs Computer: You are X, computer is O'}
      </div>
    </div>
  );
};

export default TicTacToe;