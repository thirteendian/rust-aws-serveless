import React from "react";

const FoodInput = ({ food, onChange }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...food, [name]: value });
    };

    return (
        <div>
            <label>
                Food Name:
                <input type="text" name="name" value={food.name} onChange={handleInputChange} />
            </label>
            <label>
                Calories:
                <input type="number" name="calories" value={food.calories} onChange={handleInputChange} />
            </label>
            <label>
                Protein (g):
                <input type="number" name="protein" value={food.protein} onChange={handleInputChange} />
            </label>
            <label>
                Fat (g):
                <input type="number" name="fat" value={food.fat} onChange={handleInputChange} />
            </label>
            <label>
                Carbohydrate (g):
                <input type="number" name="carbohydrate" value={food.carbohydrate} onChange={handleInputChange} />
            </label>
        </div>
    );
};

export default FoodInput;
