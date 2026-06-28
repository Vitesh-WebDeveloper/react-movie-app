import { useState, useEffect } from "react";
import MovieList from "../components/MovieList";

function Home() {
  const [searchTerm, setSearchTerm] = useState("batman");
  const [query, setQuery] = useState("batman");

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 font-sans flex flex-col">
      <div className="max-w-7xl mx-auto flex-grow w-full">
        
        {/* PREMIUM HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
            🎬 Movie Engine
          </h1>
          <p className="text-slate-400 mt-4 text-lg">
            Search and explore your favorite movies instantly
          </p>
        </div>
        
        {/* PREMIUM SEARCH BAR */}
        <div className="relative mb-12 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Search movies (e.g., Avengers, Inception)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg shadow-lg transition-all text-white placeholder-slate-500"
          />
        </div>

        <MovieList searchTerm={query} />
      </div>

      {/* NEW FOOTER */}
      <footer className="text-center text-slate-500 text-sm mt-16 pb-4">
        Built by Vitesh • React + Tailwind
      </footer>
    </div>
  );
}

export default Home;