import { useState, useEffect, useCallback } from "react";

function MovieList({ searchTerm }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. PROPER RETRY ARCHITECTURE: We wrap the fetch in a standalone function
  const fetchMovies = useCallback(() => {
    if (searchTerm.length < 3) {
      setMovies([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    // 2. SECURITY: Using the hidden .env variable!
    const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError("Failed to fetch movies. Please check your internet connection.");
        setIsLoading(false);
      });
  }, [searchTerm]);

  // Trigger fetch when searchTerm changes
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // ==========================================
  // CENTERED UI STATES
  // ==========================================
  if (searchTerm.length < 3) {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-20">
        <p className="text-5xl mb-4">⌨️</p>
        <p className="text-slate-400 text-xl">Type at least 3 letters to search...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-pulse">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-slate-800 rounded-2xl h-[400px]" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-20 bg-red-900/10 p-10 rounded-2xl border border-red-900/30 max-w-2xl mx-auto">
        <p className="text-5xl mb-4">⚠️</p>
        <p className="text-red-400 text-xl">{error}</p>
        {/* PROPER RETRY BUTTON: Calls the function instead of reloading page */}
        <button
          onClick={fetchMovies}
          className="mt-6 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-semibold transition-all hover:scale-105 shadow-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-20">
        <p className="text-6xl mb-6">🎬❌</p>
        <p className="text-slate-300 text-2xl font-bold">
          No movies found for "{searchTerm}"
        </p>
        <p className="text-slate-500 text-lg mt-3">
          Check for typos or try searching a broader term like "Batman".
        </p>
      </div>
    );
  }

  // ==========================================
  // THE GRID (Premium Tailwind Hover Effects)
  // ==========================================
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="group bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-700 hover:shadow-indigo-500/20 hover:-translate-y-2 transition-all duration-300">
          <div className="overflow-hidden h-80">
            <img 
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"} 
              alt={movie.Title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="p-5">
            <h3 className="text-lg font-bold text-white truncate">{movie.Title}</h3>
            <p className="text-indigo-400 text-sm mt-1">{movie.Year}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieList;