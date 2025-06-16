// src/config.js
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// .env (this should be in your project root, not in src folder)
// VITE_WEATHER_API_KEY=6b4a53cc39e635e5503cbadf6e1ec0cc

// src/components/Weather.jsx
import React, { useRef, useState, useEffect } from 'react';
import './Weather.css';
import { IoSearch } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import weather_icon from '../assets/weathericon.png';
// import { WEATHER_API_KEY } from '../config';

const allIcons = {
  "01d": weather_icon,
  "01n": weather_icon,
  "02d": weather_icon,
  "02n": weather_icon,
  "03d": weather_icon,
  "03n": weather_icon,
  "04d": weather_icon,
  "04n": weather_icon,
  "09d": weather_icon,
  "09n": weather_icon,
  "10d": weather_icon,
  "10n": weather_icon,
  "11d": weather_icon,
  "11n": weather_icon,
  "13d": weather_icon,
  "13n": weather_icon,
  "50d": weather_icon,
  "50n": weather_icon,
};

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async (city) => {
    if (!city) return;
    setLoading(true);
    setError('');

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.status !== 200 || !data.weather) {
        setError("City not found!");
        setWeatherData(null);
        return;
      }

      const iconCode = data.weather[0].icon;
      const icon = allIcons[iconCode] || weather_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.round(data.main.temp),
        location: data.name,
        icon: icon
      });
    } catch (err) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search("Lahore");
  }, []);

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input
          ref={inputRef}
          type="text"
          placeholder='Search City...'
          onKeyDown={(e) => {
            if (e.key === 'Enter') search(inputRef.current.value);
          }}
        />
        <h3>
          <IoSearch onClick={() => search(inputRef.current.value)} />
        </h3>
      </div>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      {weatherData && !loading && (
        <>
          <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
          <p className='temperature'>{weatherData.temperature} °C</p>
          <p className='location'>{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <h3><WiHumidity /></h3>
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <h3><FaWind /></h3>
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
