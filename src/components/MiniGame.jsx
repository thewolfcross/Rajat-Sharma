import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MiniGame = ({ onComplete }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
            [0, 4, 8], [2, 4, 6]             // diags
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (i) => {
        if (winner || board[i]) return;
        const newBoard = [...board];
        newBoard[i] = 'X'; // User is always X
        setBoard(newBoard);
        setIsXNext(false);
    };

    useEffect(() => {
        const w = calculateWinner(board);
        if (w) {
            setWinner(w);
        } else if (!board.includes(null)) {
            setIsDraw(true);
        } else if (!isXNext) {
            // AI Move (Simple)
            setTimeout(() => {
                const emptyIndices = board.map((val, idx) => (val === null ? idx : null)).filter((v) => v !== null);
                if (emptyIndices.length > 0) {
                    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
                    const newBoard = [...board];
                    newBoard[randomIndex] = 'O';
                    setBoard(newBoard);
                    setIsXNext(true);
                }
            }, 500);
        }
    }, [board, isXNext]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-[10001] flex flex-col items-center justify-center bg-[#050505]/95 backdrop-blur-2xl p-6"
        >
            <div className="glass-card p-12 max-w-md w-full text-center relative border-white/10">
                <h2 className="text-3xl font-bold mb-8 gradient-text font-heading uppercase tracking-widest">Tic-Tac-Toe</h2>

                <div className="grid grid-cols-3 gap-3 mb-10 mx-auto w-fit">
                    {board.map((value, i) => (
                        <motion.button
                            key={i}
                            whileHover={!value && !winner && !isDraw ? { scale: 1.05, backgroundColor: 'rgba(0, 212, 255, 0.1)' } : {}}
                            whileTap={!value && !winner && !isDraw ? { scale: 0.95 } : {}}
                            onClick={() => handleClick(i)}
                            className={`w-20 h-20 md:w-24 md:h-24 rounded-xl border-[1px] flex items-center justify-center text-3xl font-bold transition-all
                ${value === 'X' ? 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5' : ''}
                ${value === 'O' ? 'text-[#ff9f43] border-[#ff9f43]/30 bg-[#ff9f43]/5' : ''}
                ${!value ? 'border-white/10 bg-white/5' : ''}
              `}
                        >
                            {value}
                        </motion.button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {winner ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <h3 className={`text-2xl font-bold ${winner === 'X' ? 'text-cyan-400' : 'text-[#ff9f43]'}`}>
                                {winner === 'X' ? '🎉 You Won!' : '💀 AI Won!'}
                            </h3>
                        </motion.div>
                    ) : isDraw ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <h3 className="text-2xl font-bold text-gray-400">It's a Draw!</h3>
                        </motion.div>
                    ) : (
                        <div className="mb-8 h-8 flex items-center justify-center">
                            <span className={`text-lg font-medium ${isXNext ? 'text-cyan-400' : 'text-[#ff9f43]'}`}>
                                {isXNext ? "Your Turn (X)" : "AI is thinking (O)..."}
                            </span>
                        </div>
                    )}
                </AnimatePresence>

                <button
                    onClick={onComplete}
                    className="w-full py-4 px-8 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all duration-300"
                >
                    {winner || isDraw ? 'Continue to Profile' : 'Exit to Profile'}
                </button>
            </div>
        </motion.div>
    );
};

export default MiniGame;
