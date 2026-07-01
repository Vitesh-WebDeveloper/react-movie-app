import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

function MovieList({ searchTerm }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    // 1. INITIAL STATE: If empty, do nothing.
    if (searchTerm.trim() === "") {
      setMovies([]);
      setError(null);
      return;
    }

    if (searchTerm.length < 3) {
      setMovies([]);
      setError(null);
      return;
    }

    // 2. OFFLINE DETECTION
    if (!navigator.onLine) {
      setError("No internet connection. Please check your WiFi or network.");
      setMovies([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
      const data = await response.json();
      
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]); // OMDB found no movies
      }
    } catch (err) {
      console.error("Error fetching data: ", err);
      setError("Failed to fetch movies from the OMDB database.");
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // ==========================================
  // RESPONSIVE UI STATES
  // ==========================================
  
  // WELCOME / INITIAL STATE
  if (searchTerm.trim() === "") {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-12 md:mt-20 px-4 transition-opacity duration-500">
        <p className="text-5xl md:text-6xl mb-4 md:mb-6">🍿</p>
        <p className="text-slate-300 text-xl md:text-2xl font-bold">What are you in the mood for?</p>
        <p className="text-slate-500 text-base md:text-lg mt-2">Type a movie name above to get started.</p>
      </div>
    );
  }

  // MINIMUM CHARACTERS GUARD
  if (searchTerm.length < 3) {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-12 md:mt-20 px-4 transition-opacity duration-500">
        <p className="text-4xl md:text-5xl mb-3 md:mb-4">⌨️</p>
        <p className="text-slate-400 text-lg md:text-xl">Type at least 3 letters to search...</p>
      </div>
    );
  }

  // LOADING STATE WITH TEXT
  if (isLoading) {
    return (
      <div className="w-full transition-opacity duration-500">
        <p className="text-indigo-400 text-center mb-6 animate-pulse font-semibold">Fetching movies...</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 animate-pulse">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-slate-800 rounded-2xl h-[350px] md:h-[400px]" />
          ))}
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-12 md:mt-20 bg-red-900/10 p-6 md:p-10 rounded-2xl border border-red-900/30 max-w-2xl mx-auto mx-4 transition-opacity duration-500">
        <p className="text-4xl md:text-5xl mb-3 md:mb-4">{!navigator.onLine ? "🌐" : "⚠️"}</p>
        <p className="text-red-400 text-lg md:text-xl">{error}</p>
        <button
          onClick={fetchMovies}
          className="mt-5 md:mt-6 px-6 py-2 md:px-8 md:py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-semibold transition-all hover:scale-105 shadow-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  // EMPTY RESULTS STATE
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-12 md:mt-20 px-4 transition-opacity duration-500">
        <p className="text-5xl md:text-6xl mb-4 md:mb-6">🎬❌</p>
        <p className="text-slate-300 text-xl md:text-2xl font-bold">
          No movies found for "{searchTerm}"
        </p>
        <p className="text-slate-500 text-base md:text-lg mt-2 md:mt-3">
          Check for typos or try searching a broader term like "Batman".
        </p>
      </div>
    );
  }

  // ==========================================
  // RESPONSIVE GRID (Mobile First)
  // ==========================================
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {movies.map((movie) => (
        <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
          <div className="group bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-700 hover:shadow-indigo-500/30 hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
            <div className="overflow-hidden h-96 sm:h-80 shrink-0">
              <img 
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"} 
                alt={movie.Title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-4 md:p-5 flex-grow">
              <h3 className="text-base md:text-lg font-bold text-white truncate">{movie.Title}</h3>
              <p className="text-indigo-400 text-xs md:text-sm mt-1">{movie.Year}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MovieList;