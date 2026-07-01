import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MovieDetails() {
  const navigate = useNavigate();
  
  // useParams grabs the ':id' from the URL (e.g., /movie/tt123456)
  const { id } = useParams();

  // Fixes the issue where navigating to a new page keeps you scrolled down
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        <button 
          onClick={() => navigate(-1)} 
          className="mb-8 flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Search
        </button>

        <div className="text-center mt-20 p-10 bg-slate-800 rounded-2xl border border-slate-700">
          <h1 className="text-3xl font-bold mb-4">Movie Details Page</h1>
          <p className="text-slate-400">Coming Soon!</p>
          <p className="mt-4 text-indigo-400 font-mono">You clicked on Movie ID: {id}</p>
        </div>

      </div>
    </div>
  );
}

export default MovieDetails;