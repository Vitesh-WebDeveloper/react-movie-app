import { useState, useEffect } from "react";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect triggers the fetch AFTER the component loads onto the screen
  useEffect(() => {
    // Fetching "batman" movies from the database using YOUR exact API key
    fetch("https://www.omdbapi.com/?s=batman&apikey=acd3541e")
      .then((response) => response.json())
      .then((data) => {
        // The OMDB API puts the array of movies inside an object called "Search"
        if (data.Search) {
          setMovies(data.Search);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []); // <-- The empty array means "Only run this ONE TIME when the app loads"

  if (isLoading) {
    return <div className="text-center text-slate-400 text-xl mt-10">Loading movies from database...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="bg-slate-800 rounded-xl overflow-hidden shadow-xl border border-slate-700 transition hover:border-indigo-500">
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