import { useState, useEffect } from "react";
import MovieList from "../components/MovieList";

function Home() {
  const [searchTerm, setSearchTerm] = useState("batman");
  const [query, setQuery] = useState("batman"); // The debounced word

  // The Debounce Magic: Only update the 'query' after 500ms of no typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-8 text-center">
          🎬 Movie Engine
        </h1>
        
        <input
          type="text"
          placeholder="Search movies (e.g., Avengers, Inception)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-8 px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500 text-lg transition-colors shadow-lg text-white"
        />

        {/* Notice we pass 'query' down now, NOT 'searchTerm' */}
        <MovieList searchTerm={query} />
      </div>
    </div>
  );
}

export default Home;