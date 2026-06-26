import { useState } from "react";
import MovieList from "../components/MovieList";

function Home() {
  // 1. STATE: We hold the user's typed search word here.
  const [searchTerm, setSearchTerm] = useState("batman");

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-8 text-center">
          🎬 Movie Engine
        </h1>
        
        {/* 2. THE INPUT: Updates 'searchTerm' every time a key is pressed */}
        <input
          type="text"
          placeholder="Search movies (e.g., Avengers, Inception)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-8 px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500 text-lg transition-colors shadow-lg text-white"
        />

        {/* 3. THE PROP: We pass the search word down to the brain */}
        <MovieList searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default Home;