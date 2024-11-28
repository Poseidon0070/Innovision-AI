import React, { useState, useEffect } from "react";
import loader from "/images/WeatherIcons.gif";
import apiKeys from "./apikeys";
import ReactAnimatedWeather from "react-animated-weather";
import axios from "axios";

const dateBuilder = (d) => {
  let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

const Weather = () => {
  const [lat, setLat] = useState(undefined);
  const [lon, setLon] = useState(undefined);
  const [temperatureC, setTemperatureC] = useState(undefined);
  const [temperatureF, setTemperatureF] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [country, setCountry] = useState(undefined);
  const [humidity, setHumidity] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [icon, setIcon] = useState("CLEAR_DAY");
  const [main, setMain] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState(undefined);

  const getWeather = async (latitude, longitude) => {
    try {
      const api_call = await axios.get(
        `${apiKeys.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKeys.key}`
      );
      const data = api_call.data;
      console.log(data)
      setLat(latitude);
      setLon(longitude);
      setCity(data.name);
      setTemperatureC(Math.round(data.main.temp));
      setTemperatureF(Math.round(data.main.temp * 1.8 + 32));
      setHumidity(data.main.humidity);
      setMain(data.weather[0].main);
      setCountry(data.sys.country);
  
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
    } catch (error) {
      setErrorMsg("Unable to fetch weather data. Please try again.");
    }
  };
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          getWeather(21.25, 81.62); 
          alert(
            "You have disabled location services. Your location will be used for weather data once enabled."
          );
        }
      );
    } else {
      alert("Geolocation not supported by your browser.");
    }

    const interval = setInterval(() => {
      getWeather(lat, lon);
    }, 600000);

    return () => clearInterval(interval); 
  }, [lat, lon]); 

  if (temperatureC) {
    return (
      <div className="h-full rounded-lg flex flex-col items-center justify-center bg-gradient-to-r from-gray-600 to-gray-800 text-white p-6">
        <div className="text-center space-y-4">
          <div>
            <h1 className="text-5xl font-bold mb-6">Current Location Weather Data</h1>
            <h2 className="text-4xl font-bold">{city}</h2>
            <h3 className="text-xl">{country}</h3>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <ReactAnimatedWeather
              icon={icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
            <p className="text-lg font-medium">{main}</p>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-semibold">{dateBuilder(new Date())}</p>
            <p className="text-5xl font-bold">
              {temperatureC}°<span className="text-[30px] font-medium">C</span>
            </p>
            <p className="text-lg">Humidity: {humidity}%</p>
          </div>
        </div>
      </div>
    );
  } else {
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
};

export default Weather;
