import React, { useState } from "react";
import FoodInput from "./FoodInput";

const InputForm = ({ onSubmit }) => {
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [foods, setFoods] = useState([]);

    const handleAddFood = () => {
        setFoods([...foods, { name: "", calories: 0, protein: 0, fat: 0, carbohydrate: 0 }]);
    };

    const handleFoodChange = (index, updatedFood) => {
        const newFoods = [...foods];
        newFoods[index] = updatedFood;
        setFoods(newFoods);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform TDEE, food summary, and difference calculations here
        onSubmit({ age, height, weight, foods });
    };

    return (<form onSubmit={handleSubmit}>
            <label>
                Age:
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
            </label>
            <label>
                Height (cm):
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />
            </label>
            <label>
                Weight (kg):
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
            </label>

            {foods.map((food, index) => (
                <FoodInput key={index} food={food} onChange={(updatedFood) => handleFoodChange(index, updatedFood)} />
            ))}

            <button type="button" onClick={handleAddFood}>
                Add Food
            </button>

            <button type="submit">Submit</button>
        </form>
    );
};

export default InputForm;
