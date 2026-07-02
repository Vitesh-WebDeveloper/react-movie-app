import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* The '/' path means the main home page */}
        <Route path="/" element={<Home />} />
        
        {/* Dynamic Route: The ':id' acts as a variable we can grab later */}
        <Route path="/movie/:id" element={<MovieDetails />} />

        {}
        {/* The '*' acts as a catch-all for any URL that doesn't match the above */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;