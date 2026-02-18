import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { FiGrid, FiScissors, FiBox } from 'react-icons/fi';
import batmanIcon from '../assets/16277159-08f2-44c0-b3b7-39162de53f71.png'; // Using provided Jetha as Player 1 for RPS/Yahtzee? User said "WITH [Jetha] [Joker]"
// Actually, let's stick to the Portfolio theme. 
// TicTacToe was Batman vs Joker.
// User wants Jetha & Joker in these games.
// Let's make a "Multiverse Arena".
// Game 1: Tic-Tac-Toe (Batman vs Joker) - Keeping original logic
// Game 2: RPS (Jetha vs Joker)
// Game 3: Yahtzee (Jetha vs Joker)

import robotIcon from '../assets/robot-icon.png'; // Placeholder for professional AI icon
import userIcon from '../assets/user-icon.png';   // Placeholder for user icon

// --- TIC TAC TOE (Strategic Arena) ---
const TicTacToeGame = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [winner, setWinner] = useState(null);
    const WINNING_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    useEffect(() => {
        if (winner) {
            const timer = setTimeout(() => { setBoard(Array(9).fill(null)); setWinner(null); setIsPlayerTurn(true); }, 3000);
            return () => clearTimeout(timer);
        }
    }, [winner]);

    useEffect(() => {
        if (!isPlayerTurn && !winner) {
            const timer = setTimeout(() => {
                const available = board.map((v, i) => v === null ? i : null).filter(v => v !== null);
                if (available.length > 0) {
                    const move = available[Math.floor(Math.random() * available.length)];
                    const newBoard = [...board];
                    newBoard[move] = 'ai';
                    setBoard(newBoard);
                    checkWinner(newBoard);
                    setIsPlayerTurn(true);
                }
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isPlayerTurn, winner]);

    const checkWinner = (b) => {
        for (let [x, y, z] of WINNING_COMBINATIONS) {
            if (b[x] && b[x] === b[y] && b[x] === b[z]) return setWinner(b[x]);
        }
        if (!b.includes(null)) setWinner('draw');
    };

    const handleClick = (i) => {
        if (board[i] || !isPlayerTurn || winner) return;
        const newBoard = [...board];
        newBoard[i] = 'player';
        setBoard(newBoard);
        checkWinner(newBoard);
        setIsPlayerTurn(false);
    };

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 text-[#00d4ff]">Strategic Arena (You vs AI)</h3>
            <div className="grid grid-cols-3 gap-2 p-3 bg-white/5 rounded-xl">
                {board.map((c, i) => (
                    <button key={i} onClick={() => handleClick(i)} className="w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-lg text-2xl flex items-center justify-center overflow-hidden relative">
                        {c === 'player' && (
                            <motion.div
                                className="w-12 h-12 flex items-center justify-center text-[#00d4ff] font-bold border-2 border-[#00d4ff] rounded-lg"
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                            >
                                X
                            </motion.div>
                        )}
                        {c === 'ai' && (
                            <motion.div
                                className="w-12 h-12 flex items-center justify-center text-[#ffd700] font-bold border-2 border-[#ffd700] rounded-full"
                                initial={{ scale: 0, rotate: 45 }}
                                animate={{ scale: 1, rotate: 0 }}
                            >
                                O
                            </motion.div>
                        )}
                    </button>
                ))}
            </div>
            <div className="mt-6 h-8 text-lg font-bold tracking-wider">
                {winner ? (
                    <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={winner === 'player' ? 'text-[#00d4ff]' : winner === 'ai' ? 'text-[#ffd700]' : 'text-gray-400'}>
                        {winner === 'draw' ? 'STALEMATE' : `${winner === 'player' ? 'PLAYER' : 'AI'} WINS!`}
                    </motion.span>
                ) : (
                    <span className="text-gray-500 text-sm font-mono">{isPlayerTurn ? 'YOUR TURN' : 'AI IS ANALYZING...'}</span>
                )}
            </div>
        </div>
    );
};

// --- ROCK PAPER SCISSORS ---
const RPSGame = () => {
    const [choice, setChoice] = useState(null);
    const [compChoice, setCompChoice] = useState(null);
    const [result, setResult] = useState(null);
    const [score, setScore] = useState({ player: 0, comp: 0 });

    const play = (c) => {
        const options = ['rock', 'paper', 'scissors'];
        const comp = options[Math.floor(Math.random() * 3)];
        setChoice(c);
        setCompChoice(comp);

        if (c === comp) setResult('Draw');
        else if (
            (c === 'rock' && comp === 'scissors') ||
            (c === 'paper' && comp === 'rock') ||
            (c === 'scissors' && comp === 'paper')
        ) {
            setResult('Win');
            setScore(s => ({ ...s, player: s.player + 1 }));
        } else {
            setResult('Lose');
            setScore(s => ({ ...s, comp: s.comp + 1 }));
        }
    };

    const reset = () => { setChoice(null); setCompChoice(null); setResult(null); };

    return (
        <div className="flex flex-col items-center w-full max-w-md">
            <h3 className="text-xl font-bold mb-6 text-[#ff9f43]">Jetha Lal vs Joker</h3>
            <div className="flex justify-between w-full px-4 mb-8">
                <div className="flex flex-col items-center gap-2">
                    <img src={jethaIcon} className="w-16 h-16 rounded-full border-2 border-[#ff9f43]" alt="Jetha" />
                    <span className="text-sm font-bold">{score.player}</span>
                </div>
                <div className="flex items-center text-2xl font-bold text-gray-500">VS</div>
                <div className="flex flex-col items-center gap-2">
                    <img src={jokerIcon} className="w-16 h-16 rounded-full border-2 border-[#7209b7]" alt="Joker" />
                    <span className="text-sm font-bold">{score.comp}</span>
                </div>
            </div>

            <div className="h-32 flex items-center justify-center gap-8 mb-6">
                {choice ? (
                    <>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-5xl">
                            {choice === 'rock' ? '✊' : choice === 'paper' ? '✋' : '✌️'}
                        </motion.div>
                        <div className="text-sm font-mono text-gray-400">{result?.toUpperCase()}</div>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-5xl">
                            {compChoice === 'rock' ? '✊' : compChoice === 'paper' ? '✋' : '✌️'}
                        </motion.div>
                    </>
                ) : (
                    <div className="text-gray-500 text-sm">Choose your move!</div>
                )}
            </div>

            <div className="flex gap-4">
                {['rock', 'paper', 'scissors'].map(opt => (
                    <button key={opt} onClick={() => play(opt)} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-3xl">
                        {opt === 'rock' ? '✊' : opt === 'paper' ? '✋' : '✌️'}
                    </button>
                ))}
            </div>
            {result && <button onClick={reset} className="mt-6 text-xs text-gray-400 underline">Play Again</button>}
        </div>
    );
};

// --- YAHTZEE LITE ---
const YahtzeeGame = () => {
    const [dice, setDice] = useState([1, 1, 1, 1, 1]);
    const [rollsLeft, setRollsLeft] = useState(3);
    const [held, setHeld] = useState([false, false, false, false, false]);
    const [score, setScore] = useState(0);

    const roll = () => {
        if (rollsLeft > 0) {
            setDice(d => d.map((val, i) => held[i] ? val : Math.ceil(Math.random() * 6)));
            setRollsLeft(r => r - 1);
        }
    };

    const toggleHold = (i) => setHeld(h => {
        const newH = [...h];
        newH[i] = !newH[i];
        return newH;
    });

    const reset = () => {
        setDice([1, 1, 1, 1, 1]);
        setRollsLeft(3);
        setHeld([false, false, false, false, false]);
    };

    // Simple scoring for "Yahtzee Lite" - Sum of visual dice
    // Just a fun roller
    const total = dice.reduce((a, b) => a + b, 0);

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 text-[#ff9f43]">Jetha's Lucky Dice</h3>
            <div className="flex gap-3 mb-6">
                {dice.map((val, i) => (
                    <motion.button
                        key={i}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleHold(i)}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl border-2 transition-all ${held[i] ? 'border-[#ff9f43] bg-[#ff9f43]/20' : 'border-gray-700 bg-black/40'}`}
                    >
                        {val}
                    </motion.button>
                ))}
            </div>
            <div className="flex gap-4 items-center">
                <button
                    onClick={roll}
                    disabled={rollsLeft === 0}
                    className="px-6 py-2 bg-[#ff9f43] text-black font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Roll ({rollsLeft})
                </button>
                <button onClick={reset} className="text-sm text-gray-400">Reset</button>
            </div>
            <div className="mt-4 font-mono text-gray-300">Total: <span className="text-[#ff9f43] font-bold">{total}</span></div>
            {dice.every(v => v === dice[0]) && <div className="mt-2 text-[#ff9f43] font-bold animate-bounce">YAHTZEE! +50 Bonus</div>}
        </div>
    );
};

export default function GamingZone() {
    const [activeGame, setActiveGame] = useState('rps'); // Default to new Request

    return (
        <SectionWrapper id="gaming-zone" className="py-20">
            <div className="section-container flex flex-col items-center">
                <div className="text-center mb-8">
                    <div className="section-label">THE ARCADE</div>
                    <h2 className="section-title"><span className="gradient-text">Gaming Zone</span></h2>
                </div>

                {/* Tabs */}
                <div className="flex bg-black/40 p-1 rounded-xl mb-12 border border-white/10 overflow-x-auto">
                    {[
                        { id: 'rps', label: 'RPS', icon: <FiScissors /> },
                        { id: 'yahtzee', label: 'Yahtzee', icon: <FiBox /> },
                        { id: 'tictactoe', label: 'Tic-Tac-Toe', icon: <FiGrid /> },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveGame(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeGame === tab.id ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Game Container */}
                <div className="w-full max-w-2xl min-h-[400px] glass-card p-6 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff9f43] to-transparent opacity-50"></div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeGame}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="w-full flex justify-center"
                        >
                            {activeGame === 'tictactoe' && <TicTacToeGame />}
                            {activeGame === 'rps' && <RPSGame />}
                            {activeGame === 'yahtzee' && <YahtzeeGame />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </SectionWrapper>
    );
}
