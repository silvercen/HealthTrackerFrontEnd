import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Fitness from "./components/Fitness";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fitness" element={<Fitness />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
