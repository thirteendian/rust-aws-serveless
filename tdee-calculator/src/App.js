import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputForm from './components/InputForm';
import HistoryList from './components/HistoryList';

function App() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    // Replace with your API Gateway URL
    const response = await axios.get('https://gfidvgzqod.execute-api.us-east-1.amazonaws.com/dev/results');
    setResults(response.data);
  };

  const handleSubmit = async (formData) => {
    // Calculate TDEE, food summary, and differences here or in the serverless backend.
    // Save the results using the API Gateway URL.
    await axios.post('https://gfidvgzqod.execute-api.us-east-1.amazonaws.com/dev/results', formData);
    await fetchResults();
  };

  return (
      <div className="App">
        <InputForm onSubmit={handleSubmit} />
        <HistoryList results={results} />
      </div>
  );
}

export default App;
