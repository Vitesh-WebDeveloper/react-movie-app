import { useState, useEffect } from "react";

function MovieList({ searchTerm }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Basic UX: Don't search if the user hasn't typed at least 3 letters
    if (searchTerm.length < 3) {
      setMovies([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null); // Clear old errors

    // DYNAMIC FETCH
    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=acd3541e`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]); // OMDB found no movies
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError("Failed to fetch movies. Please check your internet connection.");
        setIsLoading(false);
      });
  }, [searchTerm]);

  // ==========================================
  // EXPLICIT UI STATES (Startup Level UX)
  // ==========================================
  if (searchTerm.length < 3) {
    return (
      <div className="text-center text-slate-400 mt-10">
        <p className="text-4xl mb-2">⌨️</p>
        <p className="text-xl">Type at least 3 letters to search...</p>
      </div>
    );
  }

  // SKELETON LOADING
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-slate-800 rounded-xl h-[400px]" />
        ))}
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="text-center mt-10 bg-red-900/20 p-8 rounded-xl border border-red-900/50">
        <p className="text-4xl mb-4">⚠️</p>
        <p className="text-red-400 text-xl">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  // EMPTY STATE
  if (movies.length === 0) {
    return (
      <div className="text-center mt-16">
        <p className="text-5xl mb-4">🎬❌</p>
        <p className="text-slate-300 text-2xl font-semibold">
          No movies found for "{searchTerm}"
        </p>
        <p className="text-slate-500 text-lg mt-2">
          Check for typos or try searching a broader term like "Batman".
        </p>
      </div>
    );
  }

  // THE GRID
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="bg-slate-800 rounded-xl overflow-hidden shadow-xl border border-slate-700 transition hover:border-indigo-500 hover:-translate-y-1">
          <img 
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"} 
            alt={movie.Title} 
            className="w-full h-80 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold truncate text-slate-100">{movie.Title}</h3>
            <p className="text-indigo-400 text-sm mt-1">{movie.Year}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieList;