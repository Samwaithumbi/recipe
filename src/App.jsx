import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import MealDetails from "./components/mealDetails.jsx"
import { SearchProvider } from "./components/SearchContext";

function App() {
  return (
    <SearchProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/meal/:id" element={<MealDetails />} />
      </Routes>
    </Router>
    </SearchProvider>
  );
}

export default App;
