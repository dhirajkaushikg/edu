import React, { useState } from 'react';
import { RotateCcw, User, Bot, Hand, Scissors, Mountain } from 'lucide-react';

type Choice = 'rock' | 'paper' | 'scissors' | null;
type GameMode = 'pvp' | 'pvc';
type GameStatus = 'waiting' | 'playing' | 'result';
type Player = 'player1' | 'player2';

const RockPaperScissors = () => {
  const [gameMode, setGameMode] = useState<GameMode>('pvp');
  const [player1Choice, setPlayer1Choice] = useState<Choice>(null);
  const [player2Choice, setPlayer2Choice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>('waiting');
  const [scores, setScores] = useState({ player1: 0, player2: 0, draws: 0 });
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  const choices = [
    { id: 'rock', name: 'Rock', icon: Mountain, color: 'text-gray-400' },
    { id: 'paper', name: 'Paper', icon: Hand, color: 'text-blue-400' },
    { id: 'scissors', name: 'Scissors', icon: Scissors, color: 'text-yellow-400' }
  ];

  const getChoiceIcon = (choice: Choice) => {
    if (!choice) return null;
    const choiceObj = choices.find(c => c.id === choice);
    return choiceObj ? <choiceObj.icon size={40} className={choiceObj.color} /> : null;
  };

  const determineWinner = (choice1: Choice, choice2: Choice): Player | 'draw' => {
    if (!choice1 || !choice2) return 'draw';
    
    if (choice1 === choice2) return 'draw';
    
    if (
      (choice1 === 'rock' && choice2 === 'scissors') ||
      (choice1 === 'paper' && choice2 === 'rock') ||
      (choice1 === 'scissors' && choice2 === 'paper')
    ) {
      return 'player1';
    }
    
    return 'player2';
  };

  const handlePlayerChoice = (player: Player, choice: Choice) => {
    if (gameStatus === 'result') return;
    
    if (player === 'player1') {
      setPlayer1Choice(choice);
      
      if (gameMode === 'pvc') {
        setGameStatus('playing');
        setIsComputerThinking(true);
        
        // Computer makes choice after a delay
        setTimeout(() => {
          const randomIndex = Math.floor(Math.random() * 3);
          const compChoice = choices[randomIndex].id as Choice;
          setComputerChoice(compChoice);
          
          const result = determineWinner(choice, compChoice);
          setWinner(result);
          
          if (result === 'player1') {
            setScores(prev => ({ ...prev, player1: prev.player1 + 1 }));
          } else if (result === 'draw') {
            setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
          } else {
            setScores(prev => ({ ...prev, player2: prev.player2 + 1 }));
          }
          
          setGameStatus('result');
          setIsComputerThinking(false);
        }, 1000);
      } else {
        // Player vs Player mode
        if (player2Choice) {
          setGameStatus('playing');
          const result = determineWinner(choice, player2Choice);
          setWinner(result);
          
          if (result === 'player1') {
            setScores(prev => ({ ...prev, player1: prev.player1 + 1 }));
          } else if (result === 'draw') {
            setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
          } else {
            setScores(prev => ({ ...prev, player2: prev.player2 + 1 }));
          }
          
          setGameStatus('result');
        }
      }
    } else if (player === 'player2' && gameMode === 'pvp') {
      setPlayer2Choice(choice);
      
      if (player1Choice) {
        setGameStatus('playing');
        const result = determineWinner(player1Choice, choice);
        setWinner(result);
        
        if (result === 'player1') {
          setScores(prev => ({ ...prev, player1: prev.player1 + 1 }));
        } else if (result === 'draw') {
          setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
        } else {
          setScores(prev => ({ ...prev, player2: prev.player2 + 1 }));
        }
        
        setGameStatus('result');
      }
    }
  };

  const resetGame = () => {
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setComputerChoice(null);
    setGameStatus('waiting');
    setWinner(null);
  };

  const resetScores = () => {
    setScores({ player1: 0, player2: 0, draws: 0 });
    resetGame();
  };

  const switchMode = () => {
    setGameMode(gameMode === 'pvp' ? 'pvc' : 'pvp');
    resetGame();
  };

  const getResultMessage = () => {
    if (gameStatus !== 'result') return '';
    
    if (winner === 'draw') {
      return "It's a draw!";
    }
    
    if (gameMode === 'pvc') {
      return winner === 'player1' 
        ? 'You win! 🎉' 
        : 'Computer wins! 🤖';
    }
    
    return winner === 'player1' 
      ? 'Player 1 wins! 🎉' 
      : 'Player 2 wins! 🎉';
  };

  const getGameStatusMessage = () => {
    if (gameStatus === 'result') {
      return getResultMessage();
    }
    
    if (gameMode === 'pvc') {
      if (player1Choice && isComputerThinking) {
        return "Computer is choosing...";
      }
      return player1Choice ? "Computer has chosen!" : "Choose your move!";
    }
    
    if (gameMode === 'pvp') {
      if (player1Choice && player2Choice) {
        return "Both players have chosen!";
      }
      if (!player1Choice && !player2Choice) {
        return "Both players choose your moves!";
      }
      if (player1Choice) {
        return "Player 2, choose your move!";
      }
      return "Player 1, choose your move!";
    }
    
    return "Choose your move!";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Rock Paper Scissors</h2>
        <p className="text-purple-200">Classic hand game of strategy and luck</p>
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
          {getGameStatusMessage()}
        </div>
      </div>

      {/* Game Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Player 1 */}
        <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/30">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-2">
              {gameMode === 'pvc' ? 'You' : 'Player 1'}
            </h3>
            <div className="flex justify-center mb-4">
              {player1Choice ? (
                getChoiceIcon(player1Choice)
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-purple-300">?</span>
                </div>
              )}
            </div>
            {gameMode === 'pvc' && player1Choice && (
              <div className="text-purple-300">Your choice</div>
            )}
          </div>

          {gameStatus === 'waiting' && (
            <div className="grid grid-cols-3 gap-3">
              {choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handlePlayerChoice('player1', choice.id as Choice)}
                  className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <choice.icon size={24} className={choice.color} />
                  <span className="text-white text-sm">{choice.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Player 2 or Computer */}
        <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/30">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-2">
              {gameMode === 'pvc' ? 'Computer' : 'Player 2'}
            </h3>
            <div className="flex justify-center mb-4">
              {gameMode === 'pvc' ? (
                computerChoice ? (
                  getChoiceIcon(computerChoice)
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-purple-300">?</span>
                  </div>
                )
              ) : player2Choice ? (
                getChoiceIcon(player2Choice)
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-purple-300">?</span>
                </div>
              )}
            </div>
            {gameMode === 'pvc' && computerChoice && (
              <div className="text-purple-300">Computer's choice</div>
            )}
          </div>

          {gameMode === 'pvp' && gameStatus === 'waiting' && (
            <div className="grid grid-cols-3 gap-3">
              {choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handlePlayerChoice('player2', choice.id as Choice)}
                  className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <choice.icon size={24} className={choice.color} />
                  <span className="text-white text-sm">{choice.name}</span>
                </button>
              ))}
            </div>
          )}

          {gameMode === 'pvc' && isComputerThinking && (
            <div className="text-center text-purple-300">
              Computer is thinking...
            </div>
          )}
        </div>
      </div>

      {/* Result Display */}
      {gameStatus === 'result' && (
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-6 border border-purple-500/30 text-center">
          <div className="text-2xl font-bold text-white mb-2">
            {getResultMessage()}
          </div>
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex flex-col items-center">
              <div className="text-purple-300 text-sm">Player 1</div>
              <div className="text-white text-xl font-bold">
                {player1Choice ? choices.find(c => c.id === player1Choice)?.name : 'No choice'}
              </div>
            </div>
            <div className="text-purple-300 text-xl">VS</div>
            <div className="flex flex-col items-center">
              <div className="text-purple-300 text-sm">
                {gameMode === 'pvc' ? 'Computer' : 'Player 2'}
              </div>
              <div className="text-white text-xl font-bold">
                {(gameMode === 'pvc' ? computerChoice : player2Choice) 
                  ? choices.find(c => c.id === (gameMode === 'pvc' ? computerChoice : player2Choice))?.name 
                  : 'No choice'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <RotateCcw size={16} />
          <span>New Round</span>
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
          <div className="text-blue-400 font-semibold">
            {gameMode === 'pvc' ? 'You' : 'Player 1'}
          </div>
          <div className="text-2xl font-bold text-white">{scores.player1}</div>
        </div>
        
        <div className="bg-purple-500/20 rounded-lg p-4 text-center border border-purple-500/30">
          <div className="text-purple-400 font-semibold">Draws</div>
          <div className="text-2xl font-bold text-white">{scores.draws}</div>
        </div>
        
        <div className="bg-orange-500/20 rounded-lg p-4 text-center border border-orange-500/30">
          <div className="text-orange-400 font-semibold">
            {gameMode === 'pvc' ? 'Computer' : 'Player 2'}
          </div>
          <div className="text-2xl font-bold text-white">{scores.player2}</div>
        </div>
      </div>

      {/* Game Rules */}
      <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-bold text-white mb-3">Game Rules</h3>
        <ul className="text-purple-200 space-y-2 text-sm">
          <li>• Rock beats Scissors</li>
          <li>• Scissors beats Paper</li>
          <li>• Paper beats Rock</li>
          <li>• Same choices result in a draw</li>
        </ul>
      </div>
    </div>
  );
};

export default RockPaperScissors;