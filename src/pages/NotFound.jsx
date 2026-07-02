import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-4 text-center">
      <h1 className="text-6xl md:text-8xl font-extrabold text-indigo-500 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-200">Page Not Found</h2>
      <p className="text-slate-400 mb-8 max-w-md text-lg">
        Oops! It looks like you took a wrong turn. The movie or page you are looking for doesn't exist.
      </p>
      
      {}
      <Link 
        to="/" 
        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-semibold transition-all hover:scale-105 shadow-lg flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Return Home
      </Link>
    </div>
  );
}

export default NotFound;