import React, { useRef, useState } from 'react';
import './Weather.css';
import { IoSearch } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";

// Assets
import weather_icon from '../assets/weathericon.png'; // Default icon
import clear_icon from '../assets/weathericon.png'; // Use same or another as fallback

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const search = async (city) => {
        if (!city) return;
        setLoading(true);
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod !== 200) {
                alert("This is Good!");
                setWeatherData(null);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });
        } catch (error) {
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='weather'>
                <div className='search-bar'>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder='Search City...'
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                search(inputRef.current.value);
                            }
                        }}
                    />
                    <h3><IoSearch onClick={() => search(inputRef.current.value)} /></h3>
                </div>

                {loading && <p style={{ color: 'white', marginTop: '20px' }}>Loading...</p>}

                {weatherData && (
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
        </div>
    );
};

export default Weather;
