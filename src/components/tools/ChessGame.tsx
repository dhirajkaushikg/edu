import React, { useState, useEffect } from 'react';
import { RotateCcw, User, Bot } from 'lucide-react';

type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
type PieceColor = 'white' | 'black';
type Position = { row: number; col: number };

interface ChessPiece {
  type: PieceType;
  color: PieceColor;
  symbol: string;
  hasMoved?: boolean;
}

type BoardState = (ChessPiece | null)[][];
type GameStatus = 'playing' | 'check' | 'checkmate' | 'stalemate' | 'draw';
type GameMode = 'pvp' | 'pvc';

const ChessGame = () => {
  const [board, setBoard] = useState<BoardState>([]);
  const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [gameMode, setGameMode] = useState<GameMode>('pvp');
  const [capturedPieces, setCapturedPieces] = useState<{white: ChessPiece[], black: ChessPiece[]}>({
    white: [],
    black: []
  });
  const [moveHistory, setMoveHistory] = useState<string[]>([]);

  // Initialize the chess board
  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const newBoard: BoardState = Array(8).fill(null).map(() => Array(8).fill(null));
    
    // Set up pawns
    for (let col = 0; col < 8; col++) {
      newBoard[1][col] = { type: 'pawn', color: 'black', symbol: '♟' };
      newBoard[6][col] = { type: 'pawn', color: 'white', symbol: '♙' };
    }
    
    // Set up other pieces
    const backRow: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    const symbols: Record<PieceColor, Record<PieceType, string>> = {
      white: {
        rook: '♖', knight: '♘', bishop: '♗', queen: '♕', king: '♔', pawn: '♙'
      },
      black: {
        rook: '♜', knight: '♞', bishop: '♝', queen: '♛', king: '♚', pawn: '♟'
      }
    };
    
    // Black back row
    for (let col = 0; col < 8; col++) {
      newBoard[0][col] = { 
        type: backRow[col], 
        color: 'black', 
        symbol: symbols.black[backRow[col]] 
      };
    }
    
    // White back row
    for (let col = 0; col < 8; col++) {
      newBoard[7][col] = { 
        type: backRow[col], 
        color: 'white', 
        symbol: symbols.white[backRow[col]] 
      };
    }
    
    setBoard(newBoard);
    setCurrentPlayer('white');
    setGameStatus('playing');
    setSelectedPiece(null);
    setValidMoves([]);
    setCapturedPieces({ white: [], black: [] });
    setMoveHistory([]);
  };

  // Get valid moves for a piece
  const getValidMoves = (position: Position): Position[] => {
    const { row, col } = position;
    const piece = board[row][col];
    if (!piece) return [];
    
    const moves: Position[] = [];
    
    // Simplified movement logic for each piece type
    switch (piece.type) {
      case 'pawn':
        const direction = piece.color === 'white' ? -1 : 1;
        // Move forward
        if (row + direction >= 0 && row + direction < 8 && !board[row + direction][col]) {
          moves.push({ row: row + direction, col });
          // Initial double move
          if ((piece.color === 'white' && row === 6) || (piece.color === 'black' && row === 1)) {
            if (!board[row + 2 * direction][col]) {
              moves.push({ row: row + 2 * direction, col });
            }
          }
        }
        // Capture diagonally
        for (const offset of [-1, 1]) {
          if (col + offset >= 0 && col + offset < 8 && row + direction >= 0 && row + direction < 8) {
            const target = board[row + direction][col + offset];
            if (target && target.color !== piece.color) {
              moves.push({ row: row + direction, col: col + offset });
            }
          }
        }
        break;
        
      case 'rook':
        // Horizontal and vertical movement
        const rookDirections = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dRow, dCol] of rookDirections) {
          for (let i = 1; i < 8; i++) {
            const newRow = row + i * dRow;
            const newCol = col + i * dCol;
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
            const target = board[newRow][newCol];
            if (!target) {
              moves.push({ row: newRow, col: newCol });
            } else {
              if (target.color !== piece.color) {
                moves.push({ row: newRow, col: newCol });
              }
              break;
            }
          }
        }
        break;
        
      case 'knight':
        // L-shaped movement
        const knightMoves = [
          [-2, -1], [-2, 1], [-1, -2], [-1, 2],
          [1, -2], [1, 2], [2, -1], [2, 1]
        ];
        for (const [dRow, dCol] of knightMoves) {
          const newRow = row + dRow;
          const newCol = col + dCol;
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const target = board[newRow][newCol];
            if (!target || target.color !== piece.color) {
              moves.push({ row: newRow, col: newCol });
            }
          }
        }
        break;
        
      case 'bishop':
        // Diagonal movement
        const bishopDirections = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        for (const [dRow, dCol] of bishopDirections) {
          for (let i = 1; i < 8; i++) {
            const newRow = row + i * dRow;
            const newCol = col + i * dCol;
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
            const target = board[newRow][newCol];
            if (!target) {
              moves.push({ row: newRow, col: newCol });
            } else {
              if (target.color !== piece.color) {
                moves.push({ row: newRow, col: newCol });
              }
              break;
            }
          }
        }
        break;
        
      case 'queen':
        // Combination of rook and bishop
        const queenDirections = [
          [-1, 0], [1, 0], [0, -1], [0, 1],
          [-1, -1], [-1, 1], [1, -1], [1, 1]
        ];
        for (const [dRow, dCol] of queenDirections) {
          for (let i = 1; i < 8; i++) {
            const newRow = row + i * dRow;
            const newCol = col + i * dCol;
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
            const target = board[newRow][newCol];
            if (!target) {
              moves.push({ row: newRow, col: newCol });
            } else {
              if (target.color !== piece.color) {
                moves.push({ row: newRow, col: newCol });
              }
              break;
            }
          }
        }
        break;
        
      case 'king':
        // One square in any direction
        const kingMoves = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1],           [0, 1],
          [1, -1],  [1, 0],  [1, 1]
        ];
        for (const [dRow, dCol] of kingMoves) {
          const newRow = row + dRow;
          const newCol = col + dCol;
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const target = board[newRow][newCol];
            if (!target || target.color !== piece.color) {
              moves.push({ row: newRow, col: newCol });
            }
          }
        }
        break;
    }
    
    return moves;
  };

  // Handle piece selection
  const handlePieceSelect = (position: Position) => {
    const { row, col } = position;
    const piece = board[row][col];
    
    // If clicking on a piece of the current player
    if (piece && piece.color === currentPlayer) {
      setSelectedPiece(position);
      setValidMoves(getValidMoves(position));
      return;
    }
    
    // If a piece is already selected and clicking on a valid move
    if (selectedPiece && validMoves.some(move => move.row === row && move.col === col)) {
      movePiece(selectedPiece, position);
      return;
    }
    
    // Otherwise, deselect
    setSelectedPiece(null);
    setValidMoves([]);
  };

  // Move a piece
  const movePiece = (from: Position, to: Position) => {
    const newBoard = [...board.map(row => [...row])];
    const piece = newBoard[from.row][from.col];
    const target = newBoard[to.row][to.col];
    
    if (!piece) return;
    
    // Capture piece if exists
    if (target) {
      setCapturedPieces(prev => ({
        ...prev,
        [currentPlayer]: [...prev[currentPlayer], target]
      }));
    }
    
    // Move the piece
    newBoard[to.row][to.col] = { ...piece, hasMoved: true };
    newBoard[from.row][from.col] = null;
    
    // Add to move history
    const pieceSymbol = piece.type === 'knight' ? 'N' : piece.type.charAt(0).toUpperCase();
    const fromPos = String.fromCharCode(97 + from.col) + (8 - from.row);
    const toPos = String.fromCharCode(97 + to.col) + (8 - to.row);
    const captureSymbol = target ? 'x' : '';
    setMoveHistory(prev => [...prev, `${pieceSymbol}${fromPos}${captureSymbol}${toPos}`]);
    
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    setSelectedPiece(null);
    setValidMoves([]);
  };

  // Reset the game
  const resetGame = () => {
    initializeBoard();
  };

  // Switch game mode
  const switchMode = () => {
    setGameMode(gameMode === 'pvp' ? 'pvc' : 'pvp');
    resetGame();
  };

  // Get status message
  const getStatusMessage = () => {
    if (gameStatus === 'checkmate') {
      return `Checkmate! ${currentPlayer === 'white' ? 'Black' : 'White'} wins!`;
    }
    if (gameStatus === 'check') {
      return `Check! ${currentPlayer === 'white' ? 'White' : 'Black'} is in check.`;
    }
    if (gameStatus === 'stalemate') {
      return 'Stalemate! The game is a draw.';
    }
    return `${currentPlayer === 'white' ? 'White' : 'Black'}'s turn`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Chess Game</h2>
        <p className="text-purple-200">Classic strategy game</p>
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

      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        {/* Captured pieces - Black */}
        <div className="bg-white/10 rounded-lg p-4 border border-purple-500/30 min-w-[120px]">
          <h3 className="text-white font-semibold mb-2 text-center">Captured by White</h3>
          <div className="flex flex-wrap gap-1 justify-center">
            {capturedPieces.white.map((piece, index) => (
              <span key={index} className="text-2xl">{piece.symbol}</span>
            ))}
          </div>
        </div>

        {/* Chess Board */}
        <div className="bg-amber-900/50 p-4 rounded-xl border-4 border-amber-800 shadow-2xl">
          <div className="grid grid-cols-8 gap-0 border-2 border-amber-800">
            {board.map((row, rowIndex) => (
              row.map((piece, colIndex) => {
                const isLight = (rowIndex + colIndex) % 2 === 0;
                const isSelected = selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex;
                const isValidMove = validMoves.some(move => move.row === rowIndex && move.col === colIndex);
                
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handlePieceSelect({ row: rowIndex, col: colIndex })}
                    className={`
                      w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-3xl sm:text-4xl cursor-pointer relative
                      ${isLight ? 'bg-amber-200' : 'bg-amber-800'}
                      ${isSelected ? 'ring-4 ring-blue-500' : ''}
                      ${isValidMove ? 'ring-4 ring-green-500 ring-opacity-50' : ''}
                      hover:brightness-110 transition-all
                    `}
                  >
                    {piece && (
                      <span className={`
                        ${piece.color === 'white' ? 'text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]' : 'text-black'}
                      `}>
                        {piece.symbol}
                      </span>
                    )}
                    {isValidMove && !piece && (
                      <div className="w-4 h-4 rounded-full bg-green-500 opacity-70"></div>
                    )}
                  </div>
                );
              })
            ))}
          </div>
          
          {/* Board coordinates */}
          <div className="flex justify-between mt-2 px-2">
            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(letter => (
              <span key={letter} className="text-amber-200 text-sm font-semibold">{letter}</span>
            ))}
          </div>
        </div>

        {/* Captured pieces - White */}
        <div className="bg-white/10 rounded-lg p-4 border border-purple-500/30 min-w-[120px]">
          <h3 className="text-white font-semibold mb-2 text-center">Captured by Black</h3>
          <div className="flex flex-wrap gap-1 justify-center">
            {capturedPieces.black.map((piece, index) => (
              <span key={index} className="text-2xl">{piece.symbol}</span>
            ))}
          </div>
        </div>
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
      </div>

      {/* Move History */}
      <div className="bg-white/10 rounded-lg p-4 border border-purple-500/30">
        <h3 className="text-white font-semibold mb-2">Move History</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-40 overflow-y-auto">
          {moveHistory.map((move, index) => (
            <div key={index} className="text-purple-200 text-sm">
              {index + 1}. {move}
            </div>
          ))}
        </div>
      </div>

      {/* Game Instructions */}
      <div className="bg-white/5 rounded-lg p-4 border border-purple-500/30">
        <h3 className="text-white font-semibold mb-2">How to Play</h3>
        <ul className="text-purple-200 text-sm list-disc pl-5 space-y-1">
          <li>Click on a piece to select it (highlighted in blue)</li>
          <li>Green dots show valid moves for the selected piece</li>
          <li>Click on a green dot to move the piece</li>
          <li>White moves first, then players alternate turns</li>
          <li>Capture opponent pieces by moving to their square</li>
        </ul>
      </div>
    </div>
  );
};

export default ChessGame;