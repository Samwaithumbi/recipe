import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSearch } from "./SearchContext"; 
import RandomMeal from "./randomMeal";

const Header = () => {
  const { searchedMeal, setSearchedMeal, meals, setMeals } = useSearch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchedMeal) return;
    setLoading(true);
    setError(false);

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`
      );
      if (response.data.meals) {
        setMeals(response.data.meals);
      } else {
        setMeals([]);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <img src="/chef.jpg" alt="Chef Hat" className="w-14 h-14 object-cover rounded-full" />
          <h1 className="text-4xl font-bold text-gray-800">Recipe</h1>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <input
            type="text"
            className="border border-gray-300 h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-60"
            placeholder="Type your meal"
            value={searchedMeal} // Keep input value persistent
            onChange={(e) => setSearchedMeal(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 h-10 rounded-md hover:bg-blue-600 transition mt-2 sm:mt-0 w-full sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Something went wrong. Please try again later.</div>}

      {meals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {meals.map((meal) => (
            <Link to={`/meal/${meal.idMeal}`} key={meal.idMeal}>
              <div className="border p-4 rounded-lg cursor-pointer hover:shadow-lg transition">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="text-lg font-semibold mt-2">{meal.strMeal}</h2>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        !loading && <div className="mt-4"><RandomMeal/></div>
      )}
    </div>
  );
};

export default Header;
