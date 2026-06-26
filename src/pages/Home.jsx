import MovieList from "../components/MovieList";

function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-8 text-center">
          🎬 Movie Engine
        </h1>
        <MovieList />
      </div>
    </div>
  );
}

export default Home;