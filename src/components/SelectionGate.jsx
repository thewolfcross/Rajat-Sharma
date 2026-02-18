import InteractiveLandingBackground from './InteractiveLandingBackground';
import { motion } from 'framer-motion';

const SelectionGate = ({ onPlayGame, onGoToProfile }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#020205] overflow-hidden p-6"
        >
            <InteractiveLandingBackground />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative z-10 text-center mb-12"
            >
                <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4 gradient-text">
                    Welcome, Traveler
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                    Before we proceed to the profile, how would you like to begin your journey?
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl relative z-10">
                {/* Play Game Card */}
                <motion.button
                    whileHover={{ scale: 1.02, translateY: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onPlayGame}
                    className="glass-card p-10 flex flex-col items-center text-center group cursor-pointer border-[1px] border-white/10 hover:border-cyan-500/50 transition-all duration-500"
                >
                    <div className="w-20 h-20 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-white">Play Micro-Game</h2>
                    <p className="text-gray-400">Unlock your focus with a quick challenge before exploring the profile.</p>
                    <div className="mt-8 px-6 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-semibold border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                        Let's Play
                    </div>
                </motion.button>

                {/* Profile Card */}
                <motion.button
                    whileHover={{ scale: 1.02, translateY: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onGoToProfile}
                    className="glass-card p-10 flex flex-col items-center text-center group cursor-pointer border-[1px] border-white/10 hover:border-purple-500/50 transition-all duration-500"
                >
                    <div className="w-20 h-20 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-white">View Profile</h2>
                    <p className="text-gray-400">Skip the fun and jump straight into my professional experience and skills.</p>
                    <div className="mt-8 px-6 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-semibold border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white transition-all">
                        Go directly
                    </div>
                </motion.button>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-16 text-gray-500 text-sm font-mono tracking-widest uppercase"
            >
                Select an option to proceed
            </motion.div>
        </motion.div>
    );
};

export default SelectionGate;
