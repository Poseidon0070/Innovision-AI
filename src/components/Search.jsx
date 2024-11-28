import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apikeys";
import ReactAnimatedWeather from "react-animated-weather";

function Search() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState("CLEAR_DAY");
  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather`,
        {
          params: {
            q: city,
            units: "metric",
            APPID: apiKeys.key,
          },
        }
      )
      .then((response) => {
        const data = response.data
        setWeather(data);
        console.log(data)
        if (data.weather[0].main === "Haze") {
          setIcon("CLEAR_DAY");
        } else if (data.weather[0].main === "Clouds") {
          setIcon("CLOUDY");
        } else if (data.weather[0].main === "Rain") {
          setIcon("RAIN");
        } else if (data.weather[0].main === "Snow") {
          setIcon("SNOW");
        } else if (data.weather[0].main === "Dust") {
          setIcon("WIND");
        } else if (data.weather[0].main === "Drizzle") {
          setIcon("SLEET");
        } else if (
          data.weather[0].main === "Fog" ||
          data.weather[0].main === "Smoke"
        ) {
          setIcon("FOG");
        } else if (data.weather[0].main === "Tornado") {
          setIcon("WIND");
        } else {
          setIcon("CLEAR_DAY");
        }
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search("Raipur");
  }, []);



  return (
    <div className="h-full rounded-lg flex flex-col items-center justify-center bg-gradient-to-r from-gray-600 to-gray-800 text-white p-6">
      <div className="text-center space-y-6">
        <div className="flex flex-col items-center">
          <ReactAnimatedWeather
            icon={icon}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
          <h3 className="text-2xl font-bold mt-4">{icon}</h3>
        </div>
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg text-white focus:outline-none"
              placeholder="Search any city"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <button
              onClick={() => search(query)}
              className="px-4 py-1 bg-blue-500 rounded-lg hover:bg-blue-600 transition text-white"
            >
              Search
            </button>
          </div>
        </div>
        <ul className="space-y-4">
          {typeof weather.main !== "undefined" ? (
            <div className="space-y-4 text-left flex justify-center flex-col items-center">
              <li className="text-xl font-semibold">
                <div>
                  <h2 className="text-4xl font-bold mb-2">{weather.name}</h2>
                  <h3 className="text-xl flex justify-center">{weather.sys.country}</h3>
                </div>
                <div className="flex items-center space-x-2 justify-center">
                <img
                  className="inline-block w-24 h-24"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt={weather.weather[0].main}
                />
                </div>
              </li>
              <li className="text-lg">
              <p className="text-2xl font-semibold"></p>
                <span className="text-2xl font-semibold">Temperature:</span>{" "}
                <span className="text-2xl font-semibold">{Math.round(weather.main.temp)}°C ({weather.weather[0].main})</span>
              </li>
              <li className="text-lg">
                <span className="text-2xl font-semibold">Humidity:</span>{" "}
                <span className="text-2xl font-semibold">{Math.round(weather.main.humidity)}%</span>
              </li>
              <li className="text-lg">
                <span className="text-2xl font-semibold">Visibility:</span>{" "}
                <span className="text-2xl font-semibold">{Math.round(weather.visibility / 1000)} km</span>
              </li>
              <li className="text-lg">
                <span className="text-2xl font-semibold">Wind Speed:</span>{" "}
                <span className="text-2xl font-semibold">{Math.round(weather.wind.speed)} Km/h</span>
              </li>
            </div>
          ) : (
            <li className="text-red-500 text-lg font-semibold">
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Search;
