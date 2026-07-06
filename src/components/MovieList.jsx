// MovieList
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

// DAY 19 REFACTOR: We extracted the HTML for a single movie into its own clean Component!
function MovieCard({ movie }) {
  return (
    <Link 
      to={`/movie/${movie.imdbID}`} 
      className="bg-slate-800 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-indigo-500/20 flex flex-col h-full border border-slate-700 group"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-700">
        {movie.Poster !== "N/A" ? (
          <img 
            src={movie.Poster} 
            alt={movie.Title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            loading="lazy" 
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-slate-500 font-medium">No Poster</div>
        )}
        <div className="absolute top-2 right-2 bg-indigo-600/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-md">
          {movie.Year}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow justify-between">
        <h3 className="font-bold text-lg text-slate-100 line-clamp-2 mb-2 group-hover:text-indigo-400 transition-colors">
          {movie.Title}
        </h3>
        <span className="inline-block px-2 py-1 bg-slate-700 text-slate-300 text-xs font-medium rounded-md w-fit mt-auto">
          {movie.Type.toUpperCase()}
        </span>
      </div>
    </Link>
  );
}

// This is your main List component. Notice how much cleaner it is now!
function MovieList({ searchTerm }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
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
        setMovies([]); 
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

  // UI STATES
  if (searchTerm.trim() === "") {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-12 md:mt-20 px-4">
        <p className="text-5xl md:text-6xl mb-4 md:mb-6">🍿</p>
        <p className="text-slate-300 text-xl md:text-2xl font-bold">What are you in the mood for?</p>
        <p className="text-slate-500 text-base md:text-lg mt-2">Type a movie name above to get started.</p>
      </div>
    );
  }

  if (searchTerm.length < 3) {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-12 md:mt-20 px-4">
        <p className="text-4xl md:text-5xl mb-3 md:mb-4">⌨️</p>
        <p className="text-slate-400 text-lg md:text-xl">Type at least 3 letters to search...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full">
        <p className="text-indigo-400 text-center mb-6 animate-pulse font-semibold">Fetching movies...</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 animate-pulse">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-slate-800 rounded-2xl h-[350px] md:h-[400px]" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-12 md:mt-20 bg-red-900/10 p-6 md:p-10 rounded-2xl border border-red-900/30 max-w-2xl mx-auto mx-4">
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

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-12 md:mt-20 px-4">
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {movies.map((movie) => (
        // DAY 19 REFACTOR: Calling the mini-component here!
        <MovieCard key={movie.imdbID} movie={movie}/>
      ))}
    </div>
  );
}

export default MovieList;