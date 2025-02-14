import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

function App() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [loveMessage, setLoveMessage] = useState("");
  const [playConfetti, setPlayConfetti] = useState(false);

  const loveMessages = [
    { min: 50, max: 60, message: "You might be great friends! 😊" },
    { min: 61, max: 70, message: "There’s a spark! Keep it going! 🔥" },
    { min: 71, max: 80, message: "A beautiful connection! 💞" },
    { min: 81, max: 90, message: "Love is truly in the air! 💖" },
    { min: 91, max: 100, message: "Soulmates forever! ❤️🔥" },
  ];

  useEffect(() => {
    const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
    audio.loop = true;
    audio.volume = 0.2;
    audio.play();

    return () => {
      audio.pause();
    };
  }, []);

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) {
      alert("Please enter both names! 💡");
      return;
    }

    const randomPercentage = Math.floor(Math.random() * 51) + 50;
    setPercentage(randomPercentage);
    setPlayConfetti(true);

    const foundMessage = loveMessages.find(
      (msg) => randomPercentage >= msg.min && randomPercentage <= msg.max
    );
    setLoveMessage(foundMessage ? foundMessage.message : "Love is a mystery! 💕");

    setTimeout(() => setPlayConfetti(false), 3000);
  };

  const resetCalculator = () => {
    setName1("");
    setName2("");
    setPercentage(null);
    setLoveMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-pink-50 to-white text-gray-900 relative overflow-hidden">
      
      {/* Heart-Themed Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300 opacity-30"
            initial={{ y: -50, x: Math.random() * 100 + "%" }}
            animate={{ y: "110vh", x: Math.random() * 100 + "%" }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Confetti Animation */}
      {playConfetti && (
        <Confetti numberOfPieces={200} colors={["#ffb6c1", "#ff69b4", "#dda0dd"]} />
      )}

      {/* Header */}
      <header className="bg-white shadow-md text-center py-5 z-10">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
          💕 Love Percentage Calculator 💕
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 z-10">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Find Your Love Compatibility 💌
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="text"
              placeholder="Your Crush's Name"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <button
              onClick={calculateLove}
              className="w-full bg-pink-400 text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-500 transition duration-300"
            >
              💖 Calculate Love
            </button>
          </div>

          {percentage !== null && (
            <div className="mt-6">
              <p className="text-lg font-medium text-gray-600">{loveMessage}</p>
              <p className="text-6xl font-bold text-pink-600 mt-2 animate-bounce transition-all duration-500">
                {percentage}%
              </p>

              {/* Love Compatibility Meter */}
              <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                <motion.div
                  className="h-4 rounded-full bg-pink-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1 }}
                ></motion.div>
              </div>

              {/* Try Again Button */}
              <button
                onClick={resetCalculator}
                className="mt-4 bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                🔄 Try Again
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md text-center py-4 z-10">
        <p className="text-gray-600 text-lg">
          &copy; Love Calculator 2025  ❤️ Made by Rohan
        </p>
      </footer>
    </div>
  );
}

export default App;
