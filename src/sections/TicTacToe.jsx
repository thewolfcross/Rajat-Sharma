import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import batmanIcon from '../assets/16277159-08f2-44c0-b3b7-39162de53f71.png';
import jokerIcon from '../assets/202408241250_mhthje3k54O3TxBr.png';

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

export default function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Player is Batman (X)
    const [winner, setWinner] = useState(null); // 'batman', 'joker', 'draw'
    const [jokerTaunt, setJokerTaunt] = useState('');

    // Auto-Restart on Game Over
    useEffect(() => {
        if (winner) {
            const timer = setTimeout(() => {
                resetGame();
            }, 3000); // 3 seconds delay before new game
            return () => clearTimeout(timer);
        }
    }, [winner]);

    // Joker AI
    useEffect(() => {
        if (!isPlayerTurn && !winner) {
            const timer = setTimeout(() => {
                makeJokerMove();
            }, 800); // Delay for realism
            return () => clearTimeout(timer);
        }
    }, [isPlayerTurn, winner]);

    const handleClick = (index) => {
        if (board[index] || !isPlayerTurn || winner) return;

        const newBoard = [...board];
        newBoard[index] = 'batman';
        setBoard(newBoard);
        checkWinner(newBoard, 'batman');
        setIsPlayerTurn(false);
        setJokerTaunt('');
    };

    const makeJokerMove = () => {
        // Simple AI: 1. Win, 2. Block, 3. Center, 4. Random
        const available = board.map((v, i) => v === null ? i : null).filter(v => v !== null);

        if (available.length === 0) return;

        let move = -1;

        // Helper to check for winning move for a player
        const findWinningMove = (player) => {
            for (let combo of WINNING_COMBINATIONS) {
                const [a, b, c] = combo;
                if (board[a] === player && board[b] === player && board[c] === null) return c;
                if (board[a] === player && board[c] === player && board[b] === null) return b;
                if (board[b] === player && board[c] === player && board[a] === null) return a;
            }
            return -1;
        };

        // 1. Try to win
        move = findWinningMove('joker');

        // 2. Block Batman
        if (move === -1) {
            move = findWinningMove('batman');
            if (move !== -1) setJokerTaunt("Why so serious? 🤡");
        }

        // 3. Take center
        if (move === -1 && board[4] === null) move = 4;

        // 4. Random
        if (move === -1) {
            move = available[Math.floor(Math.random() * available.length)];
        }

        const newBoard = [...board];
        newBoard[move] = 'joker';
        setBoard(newBoard);
        checkWinner(newBoard, 'joker');
        setIsPlayerTurn(true);
    };

    const checkWinner = (currentBoard, lastPlayer) => {
        for (let combo of WINNING_COMBINATIONS) {
            const [a, b, c] = currentBoard;
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                setWinner(currentBoard[a]);
                return;
            }
        }
        if (!currentBoard.includes(null)) {
            setWinner('draw');
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setIsPlayerTurn(true);
        setJokerTaunt('');
    };

    return (
        <SectionWrapper id="game" className="py-20">
            <div className="section-container flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="section-label">GOTHAM ARENA</div>
                    <h2 className="section-title">
                        <span className="gradient-text">Batman vs Joker</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        Can you outsmart the Clown Prince of Crime?
                    </p>
                </motion.div>

                {/* Game Board */}
                <div className="relative">
                    {/* Joker Taunt Bubble */}
                    <AnimatePresence>
                        {jokerTaunt && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 100 }}
                                exit={{ opacity: 0 }}
                                className="absolute -top-12 -right-24 bg-[#7209b7] text-white px-4 py-2 rounded-xl rounded-bl-none font-bold z-10 whitespace-nowrap hidden md:block"
                                style={{ boxShadow: '0 4px 15px rgba(114, 9, 183, 0.5)' }}
                            >
                                {jokerTaunt}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="grid grid-cols-3 gap-3 p-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 relative overflow-hidden">
                        {/* Grid Lines - Neon Style */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute left-1/3 top-4 bottom-4 w-1 bg-gray-700/50 rounded"></div>
                            <div className="absolute right-1/3 top-4 bottom-4 w-1 bg-gray-700/50 rounded"></div>
                            <div className="absolute top-1/3 left-4 right-4 h-1 bg-gray-700/50 rounded"></div>
                            <div className="absolute bottom-1/3 left-4 right-4 h-1 bg-gray-700/50 rounded"></div>
                        </div>

                        {board.map((cell, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 0.95, backgroundColor: 'rgba(255,255,255,0.03)' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleClick(i)}
                                className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center text-4xl rounded-xl relative z-10"
                            >
                                <AnimatePresence mode="wait">
                                    {cell === 'batman' && (
                                        <motion.img
                                            src={batmanIcon}
                                            alt="Batman"
                                            initial={{ scale: 0, rotate: -45 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(255,195,0,0.5)]"
                                        />
                                    )}
                                    {cell === 'joker' && (
                                        <motion.img
                                            src={jokerIcon}
                                            alt="Joker"
                                            initial={{ scale: 0, rotate: 45 }}
                                            animate={{ scale: 1, rotate: 0, y: [0, -5, 0] }}
                                            className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(45,198,83,0.5)]"
                                        />
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Status / Reset */}
                <div className="mt-8 h-16 flex flex-col items-center justify-center">
                    <AnimatePresence mode="wait">
                        {winner ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-center"
                            >
                                <div className="text-2xl font-bold mb-2">
                                    {winner === 'batman' && <span className="text-[#ffc300]">GOTHAM IS SAFE! 🦇</span>}
                                    {winner === 'joker' && <span className="text-[#7209b7]">HAHAHA! CHAOS REIGNS! 🤡</span>}
                                    {winner === 'draw' && <span className="text-gray-400">STALEMATE... FOR NOW.</span>}
                                </div>
                                <div className="text-sm text-gray-500">New game starting soon...</div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="status"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-gray-400 font-mono"
                            >
                                {isPlayerTurn ? "YOUR TURN (BATMAN)" : "JOKER IS THINKING..."}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </SectionWrapper>
    );
}
