import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";
import loader from "/images/WeatherIcons.gif";
import apiKeys from "./apikeys";

const WeeklyForecast = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [city, setCity] = useState("Your Location");

  const fetchWeeklyData = async (latitude, longitude) => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiKeys.base}/forecast`, {
        params: {
          lat: latitude,
          lon: longitude,
          units: "metric",
          appid: apiKeys.key,
        },
      });

      const groupedData = groupByDay(response.data.list);
      setWeeklyData(groupedData);
      setCity(response.data.city.name);
      setError(null);
    } catch (err) {
      console.error("API Error:", err.response || err.message);
      setError("Failed to fetch weekly forecast. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const groupByDay = (data) => {
    const dailyData = data.reduce((acc, item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    return Object.keys(dailyData).map((date) => {
      const dayData = dailyData[date];
      const temps = dayData.map((entry) => entry.main.temp);
      const maxTemp = Math.max(...temps);
      const minTemp = Math.min(...temps);
      const weatherTypes = dayData.map((entry) => entry.weather[0].main);
      const mostCommonWeather = weatherTypes.sort(
        (a, b) =>
          weatherTypes.filter((v) => v === a).length -
          weatherTypes.filter((v) => v === b).length
      ).pop();

      return {
        date,
        maxTemp,
        minTemp,
        weather: mostCommonWeather,
        humidity: dayData[0].main.humidity, 
        wind_speed: dayData[0].wind.speed, 
      };
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLat(latitude);
          setLon(longitude);
          fetchWeeklyData(latitude, longitude);
        },
        () => {
          const defaultLat = 21.25;
          const defaultLon = 81.62;
          setLat(defaultLat);
          setLon(defaultLon);
          fetchWeeklyData(defaultLat, defaultLon);
          setError("Using default location (Raipur) due to location services being disabled.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const defaults = {
    color: "white",
    size: 64,
    animate: true,
  };

  const getIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return "CLEAR_DAY";
      case "Clouds":
        return "CLOUDY";
      case "Rain":
        return "RAIN";
      case "Snow":
        return "SNOW";
      case "Drizzle":
        return "SLEET";
      case "Fog":
      case "Smoke":
        return "FOG";
      case "Tornado":
      case "Dust":
        return "WIND";
      default:
        return "CLEAR_DAY";
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full rounded-lg flex flex-col items-center justify-center bg-gradient-to-r from-gray-600 to-gray-800 text-white p-6">
        <img src={loader} className="w-[250px] mb-6" alt="Loading" />
        <h3 className="text-2xl font-bold">Loading Weekly Forecast...</h3>
        <p className="text-center mt-4 text-lg">
          Your weekly forecast will appear shortly.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full rounded-lg flex flex-col items-center justify-center bg-gradient-to-r from-gray-600 to-gray-800 text-white p-6">
        <img
          src={loader}
          className="w-[250px] mb-6"
          alt="Loading"
        />
        <h3 className="text-2xl font-bold">Detecting your location</h3>
        <p className="text-center mt-4 text-lg">
          Your current location will be displayed on the app <br />
          and used for calculating real-time weather.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full rounded-lg flex flex-col items-center justify-center bg-gradient-to-r from-gray-600 to-gray-800 text-white p-6">
      <h2 className="text-3xl font-bold text-center mb-4">Weekly Weather Forecast</h2>
      <h3 className="text-3xl font-bold text-center mb-4">{city}</h3>
      <div className="flex flex-wrap justify-center gap-10">
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"> */}
        {weeklyData.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-96 bg-blue-700 bg-opacity-75 p-4 rounded-lg shadow-lg space-y-3"
          >
            <p className="text-lg font-semibold">
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </p>
            <ReactAnimatedWeather
              icon={getIcon(day.weather)}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
            <p className="text-xl font-bold">{day.weather}</p>
            <p className="text-lg">
              <span className="font-semibold">Temp:</span>{" "}
              {Math.round(day.maxTemp)}°C / {Math.round(day.minTemp)}°C
            </p>
            <p className="text-lg">
              <span className="font-semibold">Humidity:</span> {day.humidity}%
            </p>
            <p className="text-lg">
              <span className="font-semibold">Wind:</span> {day.wind_speed} m/s
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
