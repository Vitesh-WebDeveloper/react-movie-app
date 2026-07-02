import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MovieDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll to top

    const fetchMovieDetails = async () => {
      if (!navigator.onLine) {
        setError("No internet connection.");
        setIsLoading(false);
        return;
      }

      try {
        const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
        // Notice we use '?i=' instead of '?s=' to search by ID!
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Failed to find movie details.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8 flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-indigo-400 font-semibold">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8 flex flex-col justify-center items-center">
        <p className="text-red-400 text-xl mb-4">⚠️ {error}</p>
        <button onClick={() => navigate(-1)} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 md:mb-10 flex items-center text-indigo-400 hover:text-indigo-300 transition-colors font-medium group"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Search
        </button>

        {/* Main Content Grid */}
        <div className="bg-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl border border-slate-700 flex flex-col md:flex-row gap-8 md:gap-12">
          
          {/* Left Column: Poster */}
          <div className="w-full md:w-1/3 shrink-0">
            <img 
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=No+Poster"} 
              alt={movie.Title}
              className="w-full rounded-2xl shadow-lg border border-slate-700 object-cover"
            />
          </div>

          {/* Right Column: Details */}
          <div className="w-full md:w-2/3 flex flex-col justify-center">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2 text-white leading-tight">
              {movie.Title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-slate-400 mb-6 font-medium">
              <span className="px-3 py-1 bg-slate-700 rounded-full">{movie.Year}</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full">{movie.Rated}</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full">{movie.Runtime}</span>
              <span className="flex items-center text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">
                ⭐ {movie.imdbRating}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-200 mb-2">Plot</h3>
            <p className="text-slate-400 leading-relaxed mb-8 text-lg">
              {movie.Plot}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-indigo-400 font-bold mb-1 uppercase tracking-wider text-sm">Director</h4>
                <p className="text-slate-300">{movie.Director}</p>
              </div>
              <div>
                <h4 className="text-indigo-400 font-bold mb-1 uppercase tracking-wider text-sm">Cast</h4>
                <p className="text-slate-300">{movie.Actors}</p>
              </div>
              <div>
                <h4 className="text-indigo-400 font-bold mb-1 uppercase tracking-wider text-sm">Genre</h4>
                <p className="text-slate-300">{movie.Genre}</p>
              </div>
              <div>
                <h4 className="text-indigo-400 font-bold mb-1 uppercase tracking-wider text-sm">Box Office</h4>
                <p className="text-slate-300">{movie.BoxOffice || "N/A"}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default MovieDetails;