import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7096/WeatherForecast');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Weather Forecast</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>Date: </strong>{item.date}, <strong>Temperature: </strong>{item.temperatureC}°C, <strong>Summary: </strong>{item.summary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
