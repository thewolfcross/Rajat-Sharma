import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { FiGrid } from 'react-icons/fi';

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

export default function GamingZone() {
    return (
        <SectionWrapper id="gaming-zone" className="py-20">
            <div className="section-container flex flex-col items-center">
                <div className="text-center mb-12">
                    <div className="section-label">THE ARCADE</div>
                    <h2 className="section-title"><span className="gradient-text">Gaming Zone</span></h2>
                </div>

                {/* Game Container */}
                <div className="w-full max-w-2xl min-h-[400px] glass-card p-6 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-50"></div>
                    <TicTacToeGame />
                </div>
            </div>
        </SectionWrapper>
    );
}
