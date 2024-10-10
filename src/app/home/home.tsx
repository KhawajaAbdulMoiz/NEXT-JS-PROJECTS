"use client";
import { useEffect, useRef, useState } from "react";

export default function Main() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [weatherData, setWeatherData] = useState<any | null>(null); // Initialize to null
  const [unit, setUnit] = useState<string>("celsius");
  const allIcons: { [key: string]: string } = {
    '01d': 'clear.png',
    '01n': 'clear.png',
    '02d': 'clouds.png',
    '02n': 'clouds.png',
    '03d': 'clouds.png',
    '03n': 'clouds.png',
    '04d': 'clouds.png',
    '04n': 'clouds.png',
    '09d': 'drizzle.png',
    '09n': 'drizzle.png',
    '10d': 'rain.png',
    '10n': 'rain.png',
    '11d': 'storm.png',
    '11n': 'storm.png',
    '13d': 'snow.png',
    '13n': 'snow.png',
    '50d': 'mist.png',
    '50n': 'mist.png',
  };
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function checkWeather(city: string) {
    const api_key = "af6de26c7b40455ea205fab3d6ac49b6";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`City not found: ${city}`);
      }

      const data = await response.json();
      console.log(data); // Keep for debugging
      const iconCode = data.weather ? data.weather[0].icon : '';
      const icon = allIcons[iconCode] || 'fallback-image.png'; // Fallback to a default image

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        windDegree: data.wind.deg,
        Feel_like: data.main.feels_like,
        temprature: Math.floor(data.main.temp),
        maxTemp: Math.floor(data.main.temp_max),
        minTemp: Math.floor(data.main.temp_min),
        Sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        Sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
        Name: data.name,
        icon: icon,
      });

    } catch (error: any) {
      console.error("Error fetching weather data:", error);
      setErrorMessage("Error fetching weather data. Please enter the correct city name."); // Set error message
    } finally {
      setLoading(false); 
    }
  }

  const convertToFahrenheit = (celsius: number) => Math.floor((celsius * 9) / 5 + 32);

  const handleSearch = () => {
    if (inputRef.current) {
      const city = inputRef.current.value;
      if (!city) {
        setErrorMessage("Please enter a city name.");
        return;
      }
      checkWeather(city);
    } else {
      setErrorMessage("Input reference is not available.");
    }
  };

  useEffect(() => {
    checkWeather("London");
  }, []);

  return (
    <div>
      <h1 className="title">Weather for <b>{weatherData?.Name || "Loading..."}</b></h1>
      {loading && <p className="error-message">Loading...</p>} 
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="search-container">
        <input
          ref={inputRef}
          type="search"
          className="search-box"
          placeholder="Enter city"
          aria-label="Search City"
        />
        <button className="btn" onClick={handleSearch}>Search</button>
      </div>

      <div className="unit-selection">
        <label>
          <input type="radio" name="unit" className="radio_button" value="celsius" checked={unit === "celsius"} onChange={() => setUnit("celsius")} />
          Celsius
        </label>
        <label>
          <input type="radio" name="unit" className="radio_button" value="fahrenheit" checked={unit === "fahrenheit"} onChange={() => setUnit("fahrenheit")} />
          Fahrenheit
        </label>
      </div>

      <div className="ctn">
        <div className="main_container">
          <h1>Temperature</h1>
          <img src={`/${weatherData?.icon || 'clear.png'}`} alt="Weather icon" />
          <h2>
            {unit === "celsius"
              ? `${weatherData?.temprature || 0}°C`
              : `${weatherData ? convertToFahrenheit(weatherData.temprature) : 0}°F`}
          </h2>
          <h3>
            Min Temperature: {weatherData ? (unit === "celsius" ? `${weatherData.minTemp}°C` : convertToFahrenheit(weatherData.minTemp) + "°F") : "N/A"}
          </h3>
          <h3>
            Max Temperature: {weatherData ? (unit === "celsius" ? `${weatherData.maxTemp}°C` : convertToFahrenheit(weatherData.maxTemp) + "°F") : "N/A"}
          </h3>
        </div>
        <div className="main_container">
          <h1>Humidity</h1>
          <img src={'humidity.png'} alt="Weather icon" />
          <h2>{weatherData ? `${weatherData.humidity}%` : "N/A"}</h2>
          <h3>Wind Degree: {weatherData ? `${weatherData.windDegree}°` : "N/A"}</h3>
          <h3>Feels like: {weatherData ? (unit === "celsius" ? `${weatherData.Feel_like}°C` : convertToFahrenheit(weatherData.Feel_like) + "°F") : "N/A"}</h3>
        </div>

        <div className="main_container">
          <h1>Wind Info</h1>
          <img src={'wind.png'} alt="Weather icon" />
          <h2>{weatherData ? `${weatherData.windSpeed} Km/h` : "N/A"}</h2>
          <h3>Sunrise: {weatherData ? weatherData.Sunrise : "N/A"}</h3>
          <h3>Sunset: {weatherData ? weatherData.Sunset : "N/A"}</h3>
        </div>
      </div>
    </div>
  );
}
