import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react"; // Import back icon

const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        if (response.data.meals) {
          setMeal(response.data.meals[0]);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading meal details...</div>;
  if (error || !meal) return <div className="text-center text-red-500 mt-10">Meal not found!</div>;

  const getIngredients = () => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
      }
    }
    return ingredients;
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <h1 className="text-3xl font-bold mt-4">{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-64 object-cover rounded-md mt-4" />

      <h2 className="text-xl font-semibold mt-4">Ingredients</h2>
      <ul className="list-disc pl-5 mt-2">
        {getIngredients().map((ingredient, index) => (
          <li key={index} className="text-gray-700">{ingredient}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4">Instructions</h2>
{meal.strInstructions ? (
  <ol className="list-decimal pl-5 mt-2 text-left">
    {meal.strInstructions
      .split(". ")
      .filter((step) => step.trim() !== "")
      .map((step, index) => (
        <li key={index} className="text-gray-700 mb-2">
          {step}.
        </li>
      ))}
  </ol>
) : (
  <p className="text-gray-500">No instructions available.</p>
)}


      {meal.strYoutube && (
        <div className="mt-4">
          <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            Watch Recipe Video
          </a>
        </div>
      )}
    </div>
  );
};

export default MealDetails;
