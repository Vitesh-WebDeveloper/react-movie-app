import { useState, useEffect } from "react";
import MovieList from "../components/MovieList";

function Home() {
  // 1. Start empty instead of "batman"
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 2. Allow users to press 'Enter' for instant search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setQuery(searchTerm);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white py-8 md:py-12 px-4 sm:px-6 lg:px-8 font-sans flex flex-col">
      <div className="max-w-7xl mx-auto flex-grow w-full">
        
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text pb-2">
            🎬 Movie Engine
          </h1>
          <p className="text-slate-400 mt-3 md:mt-4 text-base md:text-lg">
            Search and explore your favorite movies instantly
          </p>
        </div>
        
        {/* PREMIUM SEARCH BAR WITH ICON */}
        <div className="relative mb-10 md:mb-12 max-w-3xl mx-auto group">
          {/* Magnifying Glass Icon */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-6 w-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <input
            type="text"
            placeholder="Search movies (e.g., Avengers, Inception)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-12 pr-6 py-3 md:py-4 rounded-2xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base md:text-lg shadow-lg transition-all duration-300 text-white placeholder-slate-500"
          />
        </div>

        <MovieList searchTerm={query} />
      </div>

      <footer className="text-center text-slate-500 text-sm mt-12 md:mt-16 pb-4">
        Built by Vitesh • React + Tailwind
      </footer>
    </div>
  );
}

export default Home;