import axios from "axios";
import { useEffect, useState } from "react";

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
            <h2>Today's Popular Meals</h2>
            {meals.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                    {meals.map((meal) => (
                        <div 
                            key={meal.idMeal} 
                            style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "10px", cursor: "pointer" }}
                            onClick={() => setSelectedMeal(meal)}
                        >
                            <h3>{meal.strMeal}</h3>
                            <img src={meal.strMealThumb} alt={meal.strMeal} width="200" />
                            <p>{meal.strInstructions.substring(0, 100)}...</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}

            {/* Modal for Meal Details */}
            {selectedMeal && (
                <div 
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.7)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onClick={() => setSelectedMeal(null)} // Close modal when clicked outside
                >
                    <div 
                        style={{
                            background: "#fff",
                            padding: "20px",
                            borderRadius: "10px",
                            maxWidth: "500px",
                            textAlign: "center"
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
                    >
                        <h2>{selectedMeal.strMeal}</h2>
                        <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} width="300" />
                        <p><strong>Category:</strong> {selectedMeal.strCategory}</p>
                        <p><strong>Area:</strong> {selectedMeal.strArea}</p>
                        <p><strong>Instructions:</strong> {selectedMeal.strInstructions}</p>
                        <button 
                            onClick={() => setSelectedMeal(null)}
                            style={{ marginTop: "10px", padding: "5px 10px", cursor: "pointer" }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RandomMeals;
