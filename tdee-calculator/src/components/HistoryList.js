import React from "react";

const HistoryList = ({ results }) => {
    return (
        <div>
            <h2>History</h2>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        Age: {result.age}, Height: {result.height} cm, Weight: {result.weight} kg
                        {/* Display other fields as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistoryList;
