import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Play, Check, Square, Grid3x3 } from 'lucide-react';

type CellType = 'letter' | 'block' | 'empty';
type Direction = 'across' | 'down';
type Cell = {
  type: CellType;
  letter?: string;
  number?: number;
  isHighlighted?: boolean;
  isError?: boolean;
};

type Clue = {
  number: number;
  direction: Direction;
  clue: string;
  answer: string;
  row: number;
  col: number;
  length: number;
};

const CrosswordPuzzle = () => {
  // Puzzle data - 15x15 grid
  const gridSize = 15;
  
  // Corrected crossword puzzle data
  const puzzleData = [
    // Row 0
    ['block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block'],
    // Row 1
    ['block', 'empty', 'empty', 'empty', 'empty', 'block', 'empty', 'empty', 'empty', 'empty', 'empty', 'block', 'empty', 'empty', 'block'],
    // Row 2
    ['block', 'empty', 'block', 'block', 'empty', 'block', 'empty', 'block', 'block', 'block', 'empty', 'block', 'empty', 'block', 'block'],
    // Row 3
    ['block', 'empty', 'block', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'block', 'empty', 'empty', 'empty', 'empty', 'block'],
    // Row 4
    ['block', 'empty', 'empty', 'empty', 'block', 'block', 'empty', 'block', 'empty', 'block', 'block', 'block', 'empty', 'block', 'block'],
    // Row 5
    ['block', 'block', 'block', 'empty', 'block', 'empty', 'empty', 'block', 'empty', 'empty', 'empty', 'block', 'empty', 'empty', 'block'],
    // Row 6
    ['block', 'empty', 'empty', 'empty', 'empty', 'empty', 'block', 'empty', 'empty', 'block', 'empty', 'empty', 'block', 'empty', 'block'],
    // Row 7
    ['block', 'empty', 'block', 'block', 'block', 'empty', 'block', 'empty', 'block', 'block', 'block', 'empty', 'block', 'empty', 'block'],
    // Row 8
    ['block', 'empty', 'block', 'empty', 'empty', 'empty', 'block', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'block'],
    // Row 9
    ['block', 'empty', 'empty', 'empty', 'block', 'empty', 'empty', 'empty', 'block', 'block', 'block', 'empty', 'block', 'block', 'block'],
    // Row 10
    ['block', 'empty', 'block', 'empty', 'block', 'block', 'block', 'empty', 'block', 'empty', 'empty', 'empty', 'empty', 'empty', 'block'],
    // Row 11
    ['block', 'block', 'block', 'empty', 'empty', 'empty', 'empty', 'empty', 'block', 'empty', 'block', 'block', 'empty', 'block', 'block'],
    // Row 12
    ['block', 'empty', 'empty', 'empty', 'block', 'block', 'block', 'empty', 'empty', 'empty', 'empty', 'block', 'empty', 'empty', 'block'],
    // Row 13
    ['block', 'empty', 'block', 'empty', 'empty', 'empty', 'empty', 'empty', 'block', 'block', 'empty', 'block', 'block', 'empty', 'block'],
    // Row 14
    ['block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block', 'block'],
  ];

  // Corrected clues for the crossword
  const cluesData: Clue[] = [
    // Across clues
    { number: 1, direction: 'across', clue: 'Capital of France', answer: 'PARIS', row: 1, col: 1, length: 5 },
    { number: 6, direction: 'across', clue: 'Largest planet in our solar system', answer: 'JUPITER', row: 1, col: 7, length: 7 },
    { number: 7, direction: 'across', clue: 'Chemical symbol for gold', answer: 'AU', row: 2, col: 1, length: 2 },
    { number: 8, direction: 'across', clue: 'Author of "1984"', answer: 'ORWELL', row: 2, col: 4, length: 6 },
    { number: 9, direction: 'across', clue: 'Largest mammal', answer: 'WHALE', row: 3, col: 1, length: 5 },
    { number: 10, direction: 'across', clue: 'Currency of Japan', answer: 'YEN', row: 3, col: 7, length: 3 },
    { number: 11, direction: 'across', clue: 'Smallest country in the world', answer: 'VATICAN', row: 4, col: 1, length: 7 },
    { number: 13, direction: 'across', clue: 'Longest river in the world', answer: 'NILE', row: 4, col: 9, length: 4 },
    { number: 15, direction: 'across', clue: 'Hardest natural substance', answer: 'DIAMOND', row: 5, col: 3, length: 7 },
    { number: 17, direction: 'across', clue: 'Largest ocean', answer: 'PACIFIC', row: 5, col: 10, length: 7 },
    { number: 18, direction: 'across', clue: 'Author of "Pride and Prejudice"', answer: 'AUSTEN', row: 6, col: 1, length: 6 },
    { number: 20, direction: 'across', clue: 'Chemical symbol for silver', answer: 'AG', row: 6, col: 8, length: 2 },
    { number: 22, direction: 'across', clue: 'Tallest mammal', answer: 'GIRAFFE', row: 8, col: 1, length: 7 },
    { number: 23, direction: 'across', clue: 'Largest desert in the world', answer: 'SAHARA', row: 8, col: 9, length: 6 },
    { number: 24, direction: 'across', clue: 'Author of "To Kill a Mockingbird"', answer: 'LEE', row: 9, col: 1, length: 3 },
    { number: 25, direction: 'across', clue: 'Smallest prime number', answer: 'TWO', row: 9, col: 5, length: 3 },
    { number: 26, direction: 'across', clue: 'Largest bone in the human body', answer: 'FEMUR', row: 10, col: 1, length: 5 },
    { number: 28, direction: 'across', clue: 'Author of "The Great Gatsby"', answer: 'FITZGERALD', row: 10, col: 7, length: 10 },
    { number: 29, direction: 'across', clue: 'Chemical symbol for iron', answer: 'FE', row: 11, col: 3, length: 2 },
    { number: 30, direction: 'across', clue: 'Largest island in the world', answer: 'GREENLAND', row: 12, col: 1, length: 9 },
    { number: 31, direction: 'across', clue: 'Author of "Harry Potter" series', answer: 'ROWLING', row: 12, col: 10, length: 7 },
    { number: 32, direction: 'across', clue: 'Smallest planet in our solar system', answer: 'MERCURY', row: 13, col: 1, length: 7 },
    { number: 33, direction: 'across', clue: 'Largest country in the world', answer: 'RUSSIA', row: 13, col: 8, length: 6 },

    // Down clues
    { number: 1, direction: 'down', clue: 'Capital of Italy', answer: 'ROME', row: 1, col: 1, length: 4 },
    { number: 2, direction: 'down', clue: 'Author of "Romeo and Juliet"', answer: 'SHAKESPEARE', row: 1, col: 2, length: 11 },
    { number: 3, direction: 'down', clue: 'Largest continent', answer: 'ASIA', row: 1, col: 3, length: 4 },
    { number: 4, direction: 'down', clue: 'Chemical symbol for oxygen', answer: 'O', row: 1, col: 4, length: 1 },
    { number: 5, direction: 'down', clue: 'Author of "The Catcher in the Rye"', answer: 'SALINGER', row: 1, col: 5, length: 8 },
    { number: 12, direction: 'down', clue: 'Largest waterfall in the world', answer: 'NIAGARA', row: 4, col: 7, length: 7 },
    { number: 14, direction: 'down', clue: 'Author of "The Lord of the Rings"', answer: 'TOLKIEN', row: 4, col: 10, length: 7 },
    { number: 16, direction: 'down', clue: 'Smallest state in the USA', answer: 'RHODE', row: 5, col: 5, length: 5 },
    { number: 19, direction: 'down', clue: 'Largest lake in the world', answer: 'CASPIAN', row: 6, col: 3, length: 7 },
    { number: 21, direction: 'down', clue: 'Author of "Frankenstein"', answer: 'SHELLEY', row: 6, col: 9, length: 7 },
    { number: 27, direction: 'down', clue: 'Largest coral reef system', answer: 'BARRIER', row: 10, col: 5, length: 7 },
  ];

  // Game state
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [clues, setClues] = useState<Clue[]>(cluesData);
  const [currentCell, setCurrentCell] = useState<{ row: number; col: number } | null>(null);
  const [currentDirection, setCurrentDirection] = useState<Direction>('across');
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'completed'>('idle');
  const [errors, setErrors] = useState<number>(0);
  const [timer, setTimer] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize grid
  useEffect(() => {
    const newGrid: Cell[][] = [];
    
    for (let row = 0; row < gridSize; row++) {
      const gridRow: Cell[] = [];
      for (let col = 0; col < gridSize; col++) {
        const cellType = puzzleData[row][col] as CellType;
        
        if (cellType === 'block') {
          gridRow.push({ type: 'block' });
        } else if (cellType === 'empty') {
          // Check if this cell should have a number
          let number: number | undefined;
          const clue = cluesData.find(c => c.row === row && c.col === col);
          if (clue) {
            number = clue.number;
          }
          
          gridRow.push({ 
            type: 'empty', 
            letter: '', 
            number,
            isHighlighted: false,
            isError: false
          });
        } else {
          gridRow.push({ type: cellType });
        }
      }
      newGrid.push(gridRow);
    }
    
    setGrid(newGrid);
  }, []);

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

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    if (gameStatus !== 'playing') return;
    
    const cell = grid[row][col];
    if (cell.type !== 'empty') return;
    
    setCurrentCell({ row, col });
    
    // Check if this cell is part of a clue in the current direction
    const clueInCurrentDirection = clues.find(clue => 
      clue.direction === currentDirection &&
      ((currentDirection === 'across' && clue.row === row && col >= clue.col && col < clue.col + clue.length) ||
       (currentDirection === 'down' && clue.col === col && row >= clue.row && row < clue.row + clue.length))
    );
    
    // If not, switch direction
    if (!clueInCurrentDirection) {
      setCurrentDirection(prev => prev === 'across' ? 'down' : 'across');
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!currentCell || gameStatus !== 'playing') return;
    
    const { row, col } = currentCell;
    const cell = grid[row][col];
    
    if (cell.type !== 'empty') return;
    
    // Handle letter input
    if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
      const newGrid = [...grid];
      newGrid[row][col] = { ...cell, letter: e.key.toUpperCase() };
      setGrid(newGrid);
      
      // Move to next cell
      moveToNextCell();
    }
    
    // Handle backspace
    if (e.key === 'Backspace') {
      const newGrid = [...grid];
      newGrid[row][col] = { ...cell, letter: '' };
      setGrid(newGrid);
      
      // Move to previous cell
      moveToPreviousCell();
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      moveWithArrowKeys(e.key);
    }
    
    // Handle space to switch direction
    if (e.key === ' ') {
      e.preventDefault();
      setCurrentDirection(prev => prev === 'across' ? 'down' : 'across');
    }
  };

  // Move to next cell
  const moveToNextCell = () => {
    if (!currentCell) return;
    
    const { row, col } = currentCell;
    
    if (currentDirection === 'across') {
      // Find the next empty cell in the same row
      for (let c = col + 1; c < gridSize; c++) {
        if (grid[row][c].type === 'empty') {
          setCurrentCell({ row, col: c });
          return;
        }
      }
    } else {
      // Find the next empty cell in the same column
      for (let r = row + 1; r < gridSize; r++) {
        if (grid[r][col].type === 'empty') {
          setCurrentCell({ row: r, col });
          return;
        }
      }
    }
  };

  // Move to previous cell
  const moveToPreviousCell = () => {
    if (!currentCell) return;
    
    const { row, col } = currentCell;
    
    if (currentDirection === 'across') {
      // Find the previous empty cell in the same row
      for (let c = col - 1; c >= 0; c--) {
        if (grid[row][c].type === 'empty') {
          setCurrentCell({ row, col: c });
          return;
        }
      }
    } else {
      // Find the previous empty cell in the same column
      for (let r = row - 1; r >= 0; r--) {
        if (grid[r][col].type === 'empty') {
          setCurrentCell({ row: r, col });
          return;
        }
      }
    }
  };

  // Move with arrow keys
  const moveWithArrowKeys = (key: string) => {
    if (!currentCell) return;
    
    const { row, col } = currentCell;
    let newRow = row;
    let newCol = col;
    
    switch (key) {
      case 'ArrowRight':
        newCol = col + 1;
        break;
      case 'ArrowLeft':
        newCol = col - 1;
        break;
      case 'ArrowUp':
        newRow = row - 1;
        break;
      case 'ArrowDown':
        newRow = row + 1;
        break;
    }
    
    // Check if the new position is valid
    if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
      if (grid[newRow][newCol].type === 'empty') {
        setCurrentCell({ row: newRow, col: newCol });
      }
    }
  };

  // Check answers
  const checkAnswers = () => {
    if (gameStatus !== 'playing') return;
    
    let newErrors = 0;
    const newGrid = [...grid];
    
    // Check each clue
    clues.forEach(clue => {
      let isCorrect = true;
      
      // Check each cell in the clue
      for (let i = 0; i < clue.length; i++) {
        const row = clue.direction === 'across' ? clue.row : clue.row + i;
        const col = clue.direction === 'across' ? clue.col + i : clue.col;
        
        const cell = newGrid[row][col];
        const expectedLetter = clue.answer[i];
        
        if (cell.letter !== expectedLetter) {
          isCorrect = false;
          newGrid[row][col] = { ...cell, isError: true };
          newErrors++;
        } else {
          newGrid[row][col] = { ...cell, isError: false };
        }
      }
    });
    
    setGrid(newGrid);
    setErrors(prev => prev + newErrors);
    
    // Check if puzzle is completed
    const isCompleted = newGrid.every(row => 
      row.every(cell => 
        cell.type !== 'empty' || (cell.letter && !cell.isError)
      )
    );
    
    if (isCompleted) {
      setGameStatus('completed');
    }
  };

  // Reset puzzle
  const resetPuzzle = () => {
    const newGrid = grid.map(row => 
      row.map(cell => 
        cell.type === 'empty' 
          ? { ...cell, letter: '', isError: false } 
          : cell
      )
    );
    
    setGrid(newGrid);
    setCurrentCell(null);
    setGameStatus('playing');
    setErrors(0);
    setTimer(0);
  };

  // Start game
  const startGame = () => {
    setGameStatus('playing');
    setTimer(0);
  };

  // Render cell
  const renderCell = (cell: Cell, row: number, col: number) => {
    const isSelected = currentCell?.row === row && currentCell?.col === col;
    
    if (cell.type === 'block') {
      return (
        <div 
          key={`${row}-${col}`} 
          className="w-8 h-8 bg-gray-900 border border-gray-700"
        />
      );
    }
    
    if (cell.type === 'empty') {
      return (
        <div
          key={`${row}-${col}`}
          onClick={() => handleCellClick(row, col)}
          className={`
            w-8 h-8 border border-gray-600 flex items-center justify-center relative
            ${isSelected ? 'bg-blue-500/30 ring-2 ring-blue-500' : 'bg-white/10 hover:bg-white/20'}
            ${cell.isError ? 'bg-red-500/30' : ''}
            cursor-pointer transition-colors
          `}
        >
          {cell.number && (
            <span className="absolute top-0 left-0 text-xs text-purple-300 font-bold ml-0.5 mt-0.5">
              {cell.number}
            </span>
          )}
          {cell.letter && (
            <span className={`font-bold ${cell.isError ? 'text-red-400' : 'text-white'}`}>
              {cell.letter}
            </span>
          )}
        </div>
      );
    }
    
    return (
      <div 
        key={`${row}-${col}`} 
        className="w-8 h-8 bg-transparent border border-transparent"
      />
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 w-full">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Crossword Puzzle</h2>
        <p className="text-purple-200">Fill in the words based on the clues</p>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500/20 rounded-lg p-4 text-center border border-blue-500/30">
          <div className="text-blue-400 text-sm">Time</div>
          <div className="text-2xl font-bold text-white">{formatTime(timer)}</div>
        </div>
        
        <div className="bg-purple-500/20 rounded-lg p-4 text-center border border-purple-500/30">
          <div className="text-purple-400 text-sm">Errors</div>
          <div className="text-2xl font-bold text-white">{errors}</div>
        </div>
        
        <div className="bg-green-500/20 rounded-lg p-4 text-center border border-green-500/30">
          <div className="text-green-400 text-sm">Status</div>
          <div className="text-2xl font-bold text-white">
            {gameStatus === 'completed' ? 'Completed!' : gameStatus === 'playing' ? 'Playing' : 'Ready'}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Crossword Grid */}
        <div className="flex-1">
          <div 
            className="inline-block p-4 bg-white/5 rounded-2xl border border-purple-500/30"
            onKeyDown={handleKeyPress}
            tabIndex={0}
            ref={inputRef}
          >
            <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
              {grid.map((row, rowIndex) => 
                row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))
              )}
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            {gameStatus === 'idle' ? (
              <button
                onClick={startGame}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Play size={16} />
                <span>Start Puzzle</span>
              </button>
            ) : (
              <>
                <button
                  onClick={checkAnswers}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Check size={16} />
                  <span>Check Answers</span>
                </button>
                
                <button
                  onClick={resetPuzzle}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  <RotateCcw size={16} />
                  <span>Reset</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Clues Section */}
        <div className="lg:w-1/3 space-y-6">
          <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Grid3x3 size={20} className="text-purple-400" />
              Across
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {clues
                .filter(clue => clue.direction === 'across')
                .sort((a, b) => a.number - b.number)
                .map(clue => (
                  <div key={`${clue.number}-${clue.direction}`} className="text-sm">
                    <span className="text-purple-400 font-bold">{clue.number}.</span>
                    <span className="text-purple-200 ml-2">{clue.clue}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Square size={20} className="text-purple-400" />
              Down
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {clues
                .filter(clue => clue.direction === 'down')
                .sort((a, b) => a.number - b.number)
                .map(clue => (
                  <div key={`${clue.number}-${clue.direction}`} className="text-sm">
                    <span className="text-purple-400 font-bold">{clue.number}.</span>
                    <span className="text-purple-200 ml-2">{clue.clue}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Game Instructions */}
      <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-bold text-white mb-3">How to Play</h3>
        <ul className="text-purple-200 space-y-2 text-sm">
          <li>• Click on a cell to select it and start typing</li>
          <li>• Use arrow keys to navigate between cells</li>
          <li>• Press SPACE to switch between Across and Down directions</li>
          <li>• Press BACKSPACE to delete letters</li>
          <li>• Check your answers when you think you've completed the puzzle</li>
          <li>• Black squares are blocked and cannot be filled</li>
        </ul>
        
        <div className="mt-4 pt-4 border-t border-purple-500/20">
          <h4 className="text-white font-medium mb-2">Tips</h4>
          <ul className="text-purple-200 space-y-1 text-sm">
            <li>• Start with the clues you're most confident about</li>
            <li>• Use crossing words to help solve difficult clues</li>
            <li>• Look for common letter patterns like "ING", "TION", "ER"</li>
            <li>• Short words (2-3 letters) are often easier to solve</li>
          </ul>
        </div>
      </div>

      {/* Completion Message */}
      {gameStatus === 'completed' && (
        <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-2xl p-6 border border-green-500/30 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">🎉 Puzzle Completed! 🎉</h3>
          <p className="text-purple-200 mb-4">
            Congratulations! You solved the crossword in {formatTime(timer)} with {errors} errors.
          </p>
          <button
            onClick={resetPuzzle}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mx-auto"
          >
            <RotateCcw size={16} />
            <span>Play Again</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CrosswordPuzzle;