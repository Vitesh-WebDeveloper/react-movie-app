import { useState, useEffect } from "react";

// 1. PROP: Receive the 'searchTerm' from Home.jsx
function MovieList({ searchTerm }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // New Error State

  useEffect(() => {
    // Basic UX: Don't search if the user hasn't typed at least 3 letters
    if (searchTerm.length < 3) {
      setMovies([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null); // Clear old errors when a new search starts

    // 2. DYNAMIC FETCH: Notice ${searchTerm} inside the URL!
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
  }, [searchTerm]); // 3. 🔥 THE TRIGGER: Run this fetch every time 'searchTerm' changes

  // ==========================================
  // 4. EXPLICIT UI STATES (Startup Level UX)
  // ==========================================

  if (searchTerm.length < 3) {
    return <div className="text-center text-slate-400 text-xl mt-10">Type at least 3 letters to search...</div>;
  }

  if (isLoading) {
    return <div className="text-center text-indigo-400 text-xl mt-10 animate-pulse">Searching OMDB Database...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400 text-xl mt-10 bg-red-900/20 py-4 rounded-lg">{error}</div>;
  }

  if (movies.length === 0) {
    return <div className="text-center text-slate-400 text-xl mt-10">No movies found matching "{searchTerm}".</div>;
  }

  // If no errors, no loading, and we have movies, render the grid!
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