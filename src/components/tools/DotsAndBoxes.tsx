import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Play, User, Bot, Undo, Redo, HelpCircle } from 'lucide-react';

type Player = 'player1' | 'player2';
type LineType = 'horizontal' | 'vertical';
type GameMode = 'pvp' | 'pvc';
type AIDifficulty = 'easy' | 'medium' | 'hard';
type BoxOwner = Player | null;

interface Line {
  row: number;
  col: number;
  type: LineType;
}

interface Box {
  owner: BoxOwner;
}

const DotsAndBoxes = () => {
  // Game configuration
  const [gridSize, setGridSize] = useState(3);
  const [gameMode, setGameMode] = useState<GameMode>('pvp');
  const [aiDifficulty, setAiDifficulty] = useState<AIDifficulty>('medium');
  const [showHints, setShowHints] = useState(false);
  
  // Game state
  const [currentPlayer, setCurrentPlayer] = useState<Player>('player1');
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'gameOver'>('idle');
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);
  
  // Game data
  const [horizontalLines, setHorizontalLines] = useState<boolean[][]>([]);
  const [verticalLines, setVerticalLines] = useState<boolean[][]>([]);
  const [boxes, setBoxes] = useState<Box[][]>([]);
  const [lastMove, setLastMove] = useState<Line | null>(null);
  const [moveHistory, setMoveHistory] = useState<Line[]>([]);
  const [availableMoves, setAvailableMoves] = useState<Line[]>([]);
  
  // Refs
  const gameBoardRef = useRef<HTMLDivElement>(null);
  
  // Initialize game board
  const initializeBoard = () => {
    const newHorizontalLines: boolean[][] = [];
    const newVerticalLines: boolean[][] = [];
    const newBoxes: Box[][] = [];
    
    // Initialize horizontal lines (gridSize x (gridSize+1))
    for (let i = 0; i < gridSize; i++) {
      newHorizontalLines[i] = Array(gridSize + 1).fill(false);
    }
    
    // Initialize vertical lines ((gridSize+1) x gridSize)
    for (let i = 0; i < gridSize + 1; i++) {
      newVerticalLines[i] = Array(gridSize).fill(false);
    }
    
    // Initialize boxes (gridSize x gridSize)
    for (let i = 0; i < gridSize; i++) {
      newBoxes[i] = Array(gridSize).fill(null).map(() => ({ owner: null }));
    }
    
    setHorizontalLines(newHorizontalLines);
    setVerticalLines(newVerticalLines);
    setBoxes(newBoxes);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentPlayer('player1');
    setWinner(null);
    setLastMove(null);
    setMoveHistory([]);
    calculateAvailableMoves(newHorizontalLines, newVerticalLines);
  };
  
  // Calculate available moves
  const calculateAvailableMoves = (hLines: boolean[][], vLines: boolean[][]) => {
    const moves: Line[] = [];
    
    // Horizontal lines
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize + 1; col++) {
        if (!hLines[row]?.[col]) {
          moves.push({ row, col, type: 'horizontal' });
        }
      }
    }
    
    // Vertical lines
    for (let row = 0; row < gridSize + 1; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (!vLines[row]?.[col]) {
          moves.push({ row, col, type: 'vertical' });
        }
      }
    }
    
    setAvailableMoves(moves);
  };
  
  // Check if a move completes boxes
  const getCompletedBoxes = (move: Line, hLines: boolean[][], vLines: boolean[][]) => {
    const completedBoxes: { row: number; col: number }[] = [];
    
    if (move.type === 'horizontal') {
      // Check box above the line
      if (move.row > 0) {
        const boxRow = move.row - 1;
        const boxCol = move.col;
        if (boxCol < gridSize && 
            hLines[boxRow][boxCol] && 
            vLines[boxRow][boxCol] && 
            boxCol + 1 < gridSize + 1 && vLines[boxRow][boxCol + 1]) {
          completedBoxes.push({ row: boxRow, col: boxCol });
        }
      }
      
      // Check box below the line
      if (move.row < gridSize) {
        const boxRow = move.row;
        const boxCol = move.col;
        if (boxCol < gridSize && 
            hLines[boxRow][boxCol] && 
            vLines[boxRow][boxCol] && 
            boxCol + 1 < gridSize + 1 && vLines[boxRow][boxCol + 1]) {
          completedBoxes.push({ row: boxRow, col: boxCol });
        }
      }
    } else {
      // Check box to the left of the line
      if (move.col > 0) {
        const boxRow = move.row;
        const boxCol = move.col - 1;
        if (boxRow < gridSize && 
            vLines[boxRow][boxCol] && 
            hLines[boxRow][boxCol] && 
            boxRow + 1 < gridSize + 1 && hLines[boxRow + 1][boxCol]) {
          completedBoxes.push({ row: boxRow, col: boxCol });
        }
      }
      
      // Check box to the right of the line
      if (move.col < gridSize) {
        const boxRow = move.row;
        const boxCol = move.col;
        if (boxRow < gridSize && 
            vLines[boxRow][boxCol] && 
            hLines[boxRow][boxCol] && 
            boxRow + 1 < gridSize + 1 && hLines[boxRow + 1][boxCol]) {
          completedBoxes.push({ row: boxRow, col: boxCol });
        }
      }
    }
    
    return completedBoxes;
  };
  
  // Make a move
  const makeMove = (move: Line) => {
    if (gameStatus !== 'playing') return;
    
    // Check if line already exists
    if (move.type === 'horizontal' && horizontalLines[move.row]?.[move.col]) return;
    if (move.type === 'vertical' && verticalLines[move.row]?.[move.col]) return;
    
    // Create new state
    const newHorizontalLines = [...horizontalLines.map(row => [...row])];
    const newVerticalLines = [...verticalLines.map(row => [...row])];
    const newBoxes = [...boxes.map(row => [...row])];
    
    // Set the line
    if (move.type === 'horizontal') {
      newHorizontalLines[move.row][move.col] = true;
    } else {
      newVerticalLines[move.row][move.col] = true;
    }
    
    // Check for completed boxes
    const completedBoxes = getCompletedBoxes(move, newHorizontalLines, newVerticalLines);
    let boxesCompleted = false;
    
    // Update boxes and scores
    let newPlayer1Score = player1Score;
    let newPlayer2Score = player2Score;
    
    if (completedBoxes.length > 0) {
      boxesCompleted = true;
      
      completedBoxes.forEach(box => {
        if (!newBoxes[box.row][box.col].owner) { // Only claim if not already claimed
          newBoxes[box.row][box.col] = { owner: currentPlayer };
          if (currentPlayer === 'player1') {
            newPlayer1Score++;
          } else {
            newPlayer2Score++;
          }
        }
      });
      
      setPlayer1Score(newPlayer1Score);
      setPlayer2Score(newPlayer2Score);
      setBoxes(newBoxes);
    }
    
    // Update lines
    setHorizontalLines(newHorizontalLines);
    setVerticalLines(newVerticalLines);
    
    // Update move history
    const newMoveHistory = [...moveHistory, move];
    setMoveHistory(newMoveHistory);
    setLastMove(move);
    
    // Check if game is over
    const totalBoxes = gridSize * gridSize;
    if (newPlayer1Score + newPlayer2Score === totalBoxes) {
      setGameStatus('gameOver');
      if (newPlayer1Score > newPlayer2Score) {
        setWinner('player1');
      } else if (newPlayer2Score > newPlayer1Score) {
        setWinner('player2');
      } else {
        setWinner('draw');
      }
      return;
    }
    
    // If no boxes were completed, switch player
    if (!boxesCompleted) {
      setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
    }
    
    // Update available moves
    calculateAvailableMoves(newHorizontalLines, newVerticalLines);
    
    // If playing against AI and it's AI's turn, make AI move
    if (gameMode === 'pvc' && (boxesCompleted ? currentPlayer : (currentPlayer === 'player1' ? 'player2' : 'player1')) === 'player2') {
      setTimeout(() => makeAIMove(newHorizontalLines, newVerticalLines, newBoxes), 500);
    }
  };
  
  // AI move logic
  const makeAIMove = (hLines: boolean[][], vLines: boolean[][], currentBoxes: Box[][]) => {
    if (availableMoves.length === 0) return;
    
    let move: Line;
    
    if (aiDifficulty === 'easy') {
      // Easy: Random valid move, prefer moves that complete boxes
      const movesThatCompleteBoxes: Line[] = [];
      
      availableMoves.forEach(availableMove => {
        const completedBoxes = getCompletedBoxes(availableMove, hLines, vLines);
        if (completedBoxes.length > 0) {
          movesThatCompleteBoxes.push(availableMove);
        }
      });
      
      if (movesThatCompleteBoxes.length > 0) {
        move = movesThatCompleteBoxes[Math.floor(Math.random() * movesThatCompleteBoxes.length)];
      } else {
        move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      }
    } else if (aiDifficulty === 'medium') {
      // Medium: Avoid giving opponent free boxes, look 1-2 moves ahead
      let bestMove: Line | null = null;
      let bestScore = -Infinity;
      
      // Evaluate each available move
      for (const availableMove of availableMoves) {
        const completedBoxes = getCompletedBoxes(availableMove, hLines, vLines);
        
        // If this move completes boxes, it's good
        if (completedBoxes.length > 0) {
          if (completedBoxes.length > bestScore) {
            bestMove = availableMove;
            bestScore = completedBoxes.length;
          }
        } else {
          // Simulate the move and see if it creates a dangerous situation
          const tempHLines = [...hLines.map(row => [...row])];
          const tempVLines = [...vLines.map(row => [...row])];
          
          if (availableMove.type === 'horizontal') {
            tempHLines[availableMove.row][availableMove.col] = true;
          } else {
            tempVLines[availableMove.row][availableMove.col] = true;
          }
          
          // Check if this move creates a situation where opponent can complete boxes
          let givesOpponentBoxes = false;
          const newAvailableMoves: Line[] = [];
          
          // Calculate new available moves after this move
          for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize + 1; col++) {
              if (!tempHLines[row][col]) {
                newAvailableMoves.push({ row, col, type: 'horizontal' });
              }
            }
          }
          
          for (let row = 0; row < gridSize + 1; row++) {
            for (let col = 0; col < gridSize; col++) {
              if (!tempVLines[row][col]) {
                newAvailableMoves.push({ row, col, type: 'vertical' });
              }
            }
          }
          
          // Check if any of the new moves would complete boxes for opponent
          for (const newMove of newAvailableMoves) {
            const opponentCompletedBoxes = getCompletedBoxes(newMove, tempHLines, tempVLines);
            if (opponentCompletedBoxes.length > 0) {
              givesOpponentBoxes = true;
              break;
            }
          }
          
          // If this move doesn't give opponent boxes, it's better
          if (!givesOpponentBoxes && (!bestMove || bestScore <= 0)) {
            bestMove = availableMove;
            bestScore = 0;
          }
        }
      }
      
      // If no good move found, pick randomly
      if (!bestMove) {
        move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      } else {
        move = bestMove;
      }
    } else {
      // Hard: More sophisticated strategy
      // Try to find moves that complete boxes first
      const movesThatCompleteBoxes: Line[] = [];
      
      availableMoves.forEach(availableMove => {
        const completedBoxes = getCompletedBoxes(availableMove, hLines, vLines);
        if (completedBoxes.length > 0) {
          movesThatCompleteBoxes.push(availableMove);
        }
      });
      
      if (movesThatCompleteBoxes.length > 0) {
        move = movesThatCompleteBoxes[Math.floor(Math.random() * movesThatCompleteBoxes.length)];
      } else {
        // Avoid moves that would give the opponent boxes
        const safeMoves: Line[] = [];
        
        for (const availableMove of availableMoves) {
          // Simulate the move
          const tempHLines = [...hLines.map(row => [...row])];
          const tempVLines = [...vLines.map(row => [...row])];
          
          if (availableMove.type === 'horizontal') {
            tempHLines[availableMove.row][availableMove.col] = true;
          } else {
            tempVLines[availableMove.row][availableMove.col] = true;
          }
          
          // Check if this move creates a situation where opponent can complete boxes
          let givesOpponentBoxes = false;
          const newAvailableMoves: Line[] = [];
          
          // Calculate new available moves after this move
          for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize + 1; col++) {
              if (!tempHLines[row][col]) {
                newAvailableMoves.push({ row, col, type: 'horizontal' });
              }
            }
          }
          
          for (let row = 0; row < gridSize + 1; row++) {
            for (let col = 0; col < gridSize; col++) {
              if (!tempVLines[row][col]) {
                newAvailableMoves.push({ row, col, type: 'vertical' });
              }
            }
          }
          
          // Check if any of the new moves would complete boxes for opponent
          for (const newMove of newAvailableMoves) {
            const opponentCompletedBoxes = getCompletedBoxes(newMove, tempHLines, tempVLines);
            if (opponentCompletedBoxes.length > 0) {
              givesOpponentBoxes = true;
              break;
            }
          }
          
          if (!givesOpponentBoxes) {
            safeMoves.push(availableMove);
          }
        }
        
        // Pick a safe move if available, otherwise pick randomly
        if (safeMoves.length > 0) {
          move = safeMoves[Math.floor(Math.random() * safeMoves.length)];
        } else {
          move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        }
      }
    }
    
    makeMove(move);
  };
  
  // Undo last move
  const undoMove = () => {
    if (moveHistory.length === 0 || gameStatus !== 'playing') return;
    
    // Reset to previous state
    const newMoveHistory = [...moveHistory];
    const lastMove = newMoveHistory.pop()!;
    
    // Reset the line
    const newHorizontalLines = [...horizontalLines.map(row => [...row])];
    const newVerticalLines = [...verticalLines.map(row => [...row])];
    const newBoxes = [...boxes.map(row => [...row])];
    
    if (lastMove.type === 'horizontal') {
      newHorizontalLines[lastMove.row][lastMove.col] = false;
    } else {
      newVerticalLines[lastMove.row][lastMove.col] = false;
    }
    
    // Recalculate all box ownership
    let newPlayer1Score = 0;
    let newPlayer2Score = 0;
    
    // Reset all boxes
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        newBoxes[row][col] = { owner: null };
      }
    }
    
    // Re-check all completed boxes from move history
    let currentPlayerForReplay: Player = 'player1';
    
    for (const move of newMoveHistory) {
      // Set the line
      if (move.type === 'horizontal') {
        newHorizontalLines[move.row][move.col] = true;
      } else {
        newVerticalLines[move.row][move.col] = true;
      }
      
      // Check for completed boxes with this move
      const completedBoxes = getCompletedBoxes(move, newHorizontalLines, newVerticalLines);
      
      // Update boxes and scores
      if (completedBoxes.length > 0) {
        completedBoxes.forEach(box => {
          if (!newBoxes[box.row][box.col].owner) { // Only claim if not already claimed
            newBoxes[box.row][box.col] = { owner: currentPlayerForReplay };
            if (currentPlayerForReplay === 'player1') {
              newPlayer1Score++;
            } else {
              newPlayer2Score++;
            }
          }
        });
      } else {
        // Switch player if no boxes were completed
        currentPlayerForReplay = currentPlayerForReplay === 'player1' ? 'player2' : 'player1';
      }
    }
    
    // Set the current player to the player who made the last move
    // If the last move completed boxes, the same player goes again
    // Otherwise, it's the other player's turn
    const lastCompletedBoxes = getCompletedBoxes(lastMove, newHorizontalLines, newVerticalLines);
    const nextPlayer = lastCompletedBoxes.length > 0 ? currentPlayerForReplay : (currentPlayerForReplay === 'player1' ? 'player2' : 'player1');
    
    setHorizontalLines(newHorizontalLines);
    setVerticalLines(newVerticalLines);
    setBoxes(newBoxes);
    setMoveHistory(newMoveHistory);
    setLastMove(newMoveHistory.length > 0 ? newMoveHistory[newMoveHistory.length - 1] : null);
    setPlayer1Score(newPlayer1Score);
    setPlayer2Score(newPlayer2Score);
    setCurrentPlayer(nextPlayer);
    
    // Update available moves
    calculateAvailableMoves(newHorizontalLines, newVerticalLines);
  };
  
  // Start game
  const startGame = () => {
    initializeBoard();
    setGameStatus('playing');
  };
  
  // Reset game
  const resetGame = () => {
    setGameStatus('idle');
    initializeBoard();
  };
  
  // Switch game mode
  const switchMode = () => {
    setGameMode(gameMode === 'pvp' ? 'pvc' : 'pvp');
    if (gameStatus === 'gameOver') {
      resetGame();
    }
  };
  
  // Handle grid size change
  const handleGridSizeChange = (size: number) => {
    if (gameStatus === 'playing') return;
    setGridSize(size);
  };
  
  // Render dot
  const renderDot = (row: number, col: number) => {
    return (
      <div 
        key={`dot-${row}-${col}`}
        className="absolute w-3 h-3 bg-purple-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          left: `${(col / gridSize) * 100}%`,
          top: `${(row / gridSize) * 100}%`
        }}
      />
    );
  };
  
  // Render horizontal line
  const renderHorizontalLine = (row: number, col: number) => {
    const isSet = horizontalLines[row]?.[col] || false;
    const isLastMove = lastMove?.type === 'horizontal' && lastMove.row === row && lastMove.col === col;
    
    return (
      <div
        key={`h-${row}-${col}`}
        className={`absolute h-1 cursor-pointer transform -translate-y-1/2 ${
          isSet 
            ? (boxes[row - 1]?.[col]?.owner === 'player1' || boxes[row]?.[col]?.owner === 'player1' 
                ? 'bg-blue-500' 
                : boxes[row - 1]?.[col]?.owner === 'player2' || boxes[row]?.[col]?.owner === 'player2' 
                  ? 'bg-green-500' 
                  : 'bg-purple-400')
            : showHints && !isSet
              ? 'bg-purple-300/50 hover:bg-purple-300'
              : 'bg-purple-900/30 hover:bg-purple-700'
        } ${isLastMove ? 'ring-2 ring-yellow-400' : ''}`}
        style={{
          left: `${(col / gridSize) * 100}%`,
          top: `${(row / gridSize) * 100}%`,
          width: `${(1 / gridSize) * 100}%`
        }}
        onClick={() => makeMove({ row, col, type: 'horizontal' })}
      />
    );
  };
  
  // Render vertical line
  const renderVerticalLine = (row: number, col: number) => {
    const isSet = verticalLines[row]?.[col] || false;
    const isLastMove = lastMove?.type === 'vertical' && lastMove.row === row && lastMove.col === col;
    
    return (
      <div
        key={`v-${row}-${col}`}
        className={`absolute w-1 cursor-pointer transform -translate-x-1/2 ${
          isSet 
            ? (boxes[row]?.[col - 1]?.owner === 'player1' || boxes[row]?.[col]?.owner === 'player1' 
                ? 'bg-blue-500' 
                : boxes[row]?.[col - 1]?.owner === 'player2' || boxes[row]?.[col]?.owner === 'player2' 
                  ? 'bg-green-500' 
                  : 'bg-purple-400')
            : showHints && !isSet
              ? 'bg-purple-300/50 hover:bg-purple-300'
              : 'bg-purple-900/30 hover:bg-purple-700'
        } ${isLastMove ? 'ring-2 ring-yellow-400' : ''}`}
        style={{
          left: `${(col / gridSize) * 100}%`,
          top: `${(row / gridSize) * 100}%`,
          height: `${(1 / gridSize) * 100}%`
        }}
        onClick={() => makeMove({ row, col, type: 'vertical' })}
      />
    );
  };
  
  // Render box
  const renderBox = (row: number, col: number) => {
    const box = boxes[row]?.[col];
    const owner = box?.owner;
    
    if (!owner) return null;
    
    return (
      <div
        key={`box-${row}-${col}`}
        className={`absolute flex items-center justify-center ${
          owner === 'player1' ? 'bg-blue-500/30' : 'bg-green-500/30'
        }`}
        style={{
          left: `${(col / gridSize) * 100}%`,
          top: `${(row / gridSize) * 100}%`,
          width: `${(1 / gridSize) * 100}%`,
          height: `${(1 / gridSize) * 100}%`
        }}
      >
        <span className={`text-lg font-bold ${owner === 'player1' ? 'text-blue-300' : 'text-green-300'}`}>
          {owner === 'player1' ? 'P1' : 'P2'}
        </span>
      </div>
    );
  };
  
  // Render game board
  const renderGameBoard = () => {
    const dots = [];
    const horizontalLines = [];
    const verticalLines = [];
    const boxElements = [];
    
    // Generate dots
    for (let row = 0; row <= gridSize; row++) {
      for (let col = 0; col <= gridSize; col++) {
        dots.push(renderDot(row, col));
      }
    }
    
    // Generate horizontal lines
    for (let row = 0; row <= gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        horizontalLines.push(renderHorizontalLine(row, col));
      }
    }
    
    // Generate vertical lines
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col <= gridSize; col++) {
        verticalLines.push(renderVerticalLine(row, col));
      }
    }
    
    // Generate boxes
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        boxElements.push(renderBox(row, col));
      }
    }
    
    return (
      <div 
        ref={gameBoardRef}
        className="relative w-full max-w-2xl aspect-square bg-white/5 rounded-2xl border border-purple-500/30 p-4"
      >
        {dots}
        {horizontalLines}
        {verticalLines}
        {boxElements}
      </div>
    );
  };
  
  // Get funny messages
  const getFunnyMessage = () => {
    const messages = [
      "Nice! +1 box — take another turn!",
      "Box claimed! You're on fire! 🔥",
      "Another one! Keep going! 🎯",
      "That's a keeper! 💯",
      "Box secured! Well played! 🏆"
    ];
    
    const chainMessages = [
      "Uh-oh… you fed them a candy chain 🍬",
      "Oops! They got a chain reaction!",
      "Watch out! They're on a roll! 🎲",
      "Chain alert! They're unstoppable! ⚡",
      "They got the sweet spot! 🍭"
    ];
    
    // For now, we'll just return a random message
    // In a real implementation, we'd track when chains are created
    return Math.random() > 0.7 ? chainMessages[Math.floor(Math.random() * chainMessages.length)] : 
                                messages[Math.floor(Math.random() * messages.length)];
  };
  
  // Get end game message
  const getEndGameMessage = () => {
    if (winner === 'draw') {
      return "Draw — equally matched geniuses!";
    }
    
    if (gameMode === 'pvc') {
      return winner === 'player1' 
        ? "You win — Box boss! 🏆" 
        : "Computer wins — Try again! 🤖";
    }
    
    return winner === 'player1' 
      ? "Player 1 wins — Box boss! 🏆" 
      : "Player 2 wins — Box boss! 🏆";
  };
  
  return (
    <div className="max-w-4xl mx-auto space-y-8 w-full">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Dots & Boxes</h2>
        <p className="text-purple-200">Classic paper game - Draw lines to complete boxes</p>
      </div>
      
      {/* Game Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Grid Size Selector */}
        <div className="bg-white/5 rounded-2xl p-4 border border-purple-500/30">
          <h3 className="text-white font-medium mb-2">Grid Size</h3>
          <div className="flex flex-wrap gap-2">
            {[3, 4, 5, 6, 7, 8].map(size => (
              <button
                key={size}
                onClick={() => handleGridSizeChange(size)}
                disabled={gameStatus === 'playing'}
                className={`px-3 py-1 rounded-lg text-sm ${
                  gridSize === size
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                } ${gameStatus === 'playing' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {size}×{size}
              </button>
            ))}
          </div>
        </div>
        
        {/* Game Mode */}
        <div className="bg-white/5 rounded-2xl p-4 border border-purple-500/30">
          <h3 className="text-white font-medium mb-2">Game Mode</h3>
          <div className="flex gap-2">
            <button
              onClick={switchMode}
              className="flex items-center gap-2 px-3 py-1 bg-purple-600/30 text-purple-300 rounded-lg hover:bg-purple-600/50 transition-colors"
            >
              {gameMode === 'pvp' ? (
                <>
                  <Bot size={16} />
                  <span>vs Computer</span>
                </>
              ) : (
                <>
                  <User size={16} />
                  <span>2 Players</span>
                </>
              )}
            </button>
            
            {gameMode === 'pvc' && (
              <select
                value={aiDifficulty}
                onChange={(e) => setAiDifficulty(e.target.value as AIDifficulty)}
                className="bg-white/10 border border-purple-500/30 rounded-lg text-purple-200 px-2 py-1 text-sm"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            )}
          </div>
        </div>
        
        {/* Game Actions */}
        <div className="bg-white/5 rounded-2xl p-4 border border-purple-500/30">
          <h3 className="text-white font-medium mb-2">Actions</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-1 px-2 py-1 bg-purple-600/30 text-purple-300 rounded-lg hover:bg-purple-600/50 transition-colors text-sm"
            >
              <HelpCircle size={14} />
              <span>{showHints ? 'Hide' : 'Show'} Hints</span>
            </button>
            
            <button
              onClick={undoMove}
              disabled={moveHistory.length === 0 || gameStatus !== 'playing'}
              className="flex items-center gap-1 px-2 py-1 bg-purple-600/30 text-purple-300 rounded-lg hover:bg-purple-600/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <Undo size={14} />
              <span>Undo</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Score Board */}
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        <div className="bg-blue-500/20 rounded-lg p-4 text-center border border-blue-500/30">
          <div className="text-blue-400 font-semibold">
            {gameMode === 'pvc' ? 'You' : 'Player 1'}
          </div>
          <div className="text-2xl font-bold text-white">{player1Score}</div>
        </div>
        
        <div className="bg-purple-500/20 rounded-lg p-4 text-center border border-purple-500/30">
          <div className="text-purple-400 font-semibold">Boxes</div>
          <div className="text-2xl font-bold text-white">{gridSize * gridSize}</div>
        </div>
        
        <div className="bg-green-500/20 rounded-lg p-4 text-center border border-green-500/30">
          <div className="text-green-400 font-semibold">
            {gameMode === 'pvc' ? 'Computer' : 'Player 2'}
          </div>
          <div className="text-2xl font-bold text-white">{player2Score}</div>
        </div>
      </div>
      
      {/* Current Player Indicator */}
      {gameStatus === 'playing' && (
        <div className="text-center">
          <div className="inline-block px-4 py-2 bg-purple-600/30 rounded-lg">
            <span className="text-purple-200">
              Current turn: 
              <span className={`font-bold ml-2 ${
                currentPlayer === 'player1' 
                  ? (gameMode === 'pvc' ? 'text-blue-400' : 'text-blue-400') 
                  : (gameMode === 'pvc' ? 'text-green-400' : 'text-green-400')
              }`}>
                {currentPlayer === 'player1' 
                  ? (gameMode === 'pvc' ? 'You' : 'Player 1') 
                  : (gameMode === 'pvc' ? 'Computer' : 'Player 2')}
              </span>
            </span>
          </div>
        </div>
      )}
      
      {/* Game Board */}
      <div className="flex justify-center">
        {renderGameBoard()}
      </div>
      
      {/* Game Status Messages */}
      {gameStatus === 'idle' && (
        <div className="text-center text-purple-300">
          Select grid size and game mode, then press Start Game!
        </div>
      )}
      
      {gameStatus === 'gameOver' && (
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-6 border border-purple-500/30 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{getEndGameMessage()}</h3>
          <p className="text-purple-200">
            Final Score: {player1Score} - {player2Score}
          </p>
        </div>
      )}
      
      {/* Game Controls */}
      <div className="flex flex-wrap gap-4 justify-center">
        {gameStatus === 'idle' ? (
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Play size={20} />
            <span>Start Game</span>
          </button>
        ) : gameStatus === 'gameOver' ? (
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <RotateCcw size={20} />
            <span>Play Again</span>
          </button>
        ) : (
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <RotateCcw size={16} />
            <span>Reset Game</span>
          </button>
        )}
      </div>
      
      {/* Game Instructions */}
      <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-bold text-white mb-3">How to Play</h3>
        <ul className="text-purple-200 space-y-2 text-sm">
          <li>• Players take turns drawing lines between adjacent dots</li>
          <li>• Complete a box by drawing the fourth side to claim it</li>
          <li>• When you complete a box, you get another turn</li>
          <li>• The player with the most boxes at the end wins</li>
          <li>• In vs Computer mode, try to avoid creating chains that give the computer multiple boxes</li>
        </ul>
        
        <div className="mt-4 pt-4 border-t border-purple-500/20">
          <h4 className="text-white font-medium mb-2">Controls</h4>
          <ul className="text-purple-200 space-y-1 text-sm">
            <li>• Click on the space between two dots to draw a line</li>
            <li>• Use the Show Hints button to highlight available moves</li>
            <li>• Use Undo to take back your last move</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DotsAndBoxes;