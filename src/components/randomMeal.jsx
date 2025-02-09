import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RandomMeals() {
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);

    const fetchRandomMeals = async () => {
        try {
            const mealPromises = Array.from({ length: 5 }, () =>
                axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
            );

            const responses = await Promise.all(mealPromises);
            const mealData = responses.map(response => response.data.meals[0]);

            setMeals(mealData);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    };

    useEffect(() => {
        fetchRandomMeals();
    }, []);

    return (
        <div>
            <h2 className="font-bold text-gray-700 text-xl">Today's Popular Meals</h2>
            {meals.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {meals.map((meal) => (
                          <Link to={`/meal/${meal.idMeal}`} key={meal.idMeal}>
                        <div 
                            key={meal.idMeal} 
                            style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "10px", cursor: "pointer" }}
                            onClick={() => setSelectedMeal(meal)}
                        >
                            <h3 className="text-lg font-bold">{meal.strMeal}</h3>
                            <img src={meal.strMealThumb} alt={meal.strMeal}   className="w-full h-48 object-cover rounded-md" />
                            <p className="text-gray-900 text-lg">{meal.strInstructions.substring(0, 100)}...</p>
                        </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default RandomMeals;
