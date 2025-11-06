import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

function Bot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput("");
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: userMessage, sender: "user" },
      { id: Date.now() + 1, text: "VORTEX is processing...", sender: "bot", temp: true },
    ]);

    try {
      const res = await axios.post("http://localhost:4002/bot/v1/message", {
        text: userMessage,
      });

      if (res.status === 200) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.temp ? { id: msg.id, text: res.data.botMessage, sender: "bot" } : msg
          )
        );
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: "⚠️ Unable to connect to VORTEX. Try again later.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#010a17] via-[#021f2b] to-[#001622] text-white font-inter relative overflow-hidden">

      {/* 🔮 Dynamic Background Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/25 rounded-full blur-[140px] animate-float-delay" />

      {/* 🌟 Header */}
      <header className="fixed top-0 left-0 w-full border-b border-white/10 backdrop-blur-xl bg-black/30 z-20 shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-4">
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-300 via-blue-400 to-pink-400 text-transparent bg-clip-text drop-shadow-lg"
          >
            VORTEX ⚡
          </motion.h1>
          <FaUserCircle
            size={36}
            className="text-gray-300 hover:text-cyan-400 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </header>

      {/* 💬 Chat Section */}
      <main className="flex-1 overflow-y-auto pt-24 pb-28 px-4 sm:px-8 flex justify-center">
        <div className="w-full max-w-3xl space-y-5">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 text-lg mt-48"
            >
              👋 Welcome! I’m{" "}
              <span className="font-semibold text-gradient">VORTEX</span> — your
              futuristic AI companion.
              <br />
              Ask me anything and watch the magic happen.
            </motion.div>
          ) : (
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[80%] px-5 py-3 rounded-2xl text-[15px] leading-relaxed backdrop-blur-md border ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-cyan-500/90 to-blue-600/90 border-cyan-300/40 text-white self-end rounded-br-none shadow-lg shadow-cyan-500/30 ml-auto"
                      : msg.temp
                      ? "bg-gray-700/60 text-gray-300 italic self-start rounded-bl-none border-gray-500/40"
                      : "bg-gray-900/70 border-pink-300/20 text-gray-100 rounded-bl-none shadow-lg shadow-pink-500/20"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          )}
        </div>
      </main>

      {/* 🧠 Input Bar */}
      <footer className="fixed bottom-0 left-0 w-full border-t border-white/10 bg-black/30 backdrop-blur-xl z-20">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Ask VORTEX anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-4 py-2.5 rounded-full bg-gray-900/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={loading}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-blue-500 hover:to-pink-400 text-white font-semibold shadow-lg shadow-cyan-500/30 transition-all disabled:opacity-50"
          >
            {loading ? "..." : "Send"}
          </motion.button>
        </div>
      </footer>
    </div>
  );
}

export default Bot;
