import React, { useState, useEffect } from 'react';
import request from './Utils/request';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request({
          method: 'get',
          url: 'WeatherForecast',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setData(response);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
