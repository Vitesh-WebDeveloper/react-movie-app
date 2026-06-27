// ==========================================
  // 4. EXPLICIT UI STATES (Startup Level UX)
  // ==========================================

  if (searchTerm.length < 3) {
    return (
      <div className="text-center text-slate-400 mt-10">
        <p className="text-4xl mb-2">⌨️</p>
        <p className="text-xl">Type at least 3 letters to search...</p>
      </div>
    );
  }

  // TASK 1: Skeleton Loading UI
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-slate-800 rounded-xl h-[400px]" />
        ))}
      </div>
    );
  }

  // TASK 3: Upgraded Error State with Retry Button
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

  // TASK 2: Upgraded Empty State
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