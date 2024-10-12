import React, { useState, useEffect } from "react";
import axios from "axios";
import { LiaCloudSunRainSolid } from "react-icons/lia";

interface WeatherData {
  list: {
    main: {
      temp: number;
    };
    weather: {
      description: string;
    }[];
    dt_txt: string;
  }[];
  city: {
    name: string;
  };
}

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { data } = await axios.get<WeatherData>(
          "https://apjoy-weather-forecast.p.rapidapi.com/forecast",
          {
            params: {
              location: "Pune",
              days: "1",
            },
            headers: {
              "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY as string,
              "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST as string,
            },
          }
        );
        setWeather(data);
      } catch (err) {
        setError("Failed to fetch weather data. Please try again later.");
      }
    };

    fetchWeather();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <span className="font-medium">[ {weather.city.name} ]</span> */}
      {weather.list.map((forecast, index) => (
        <div
          key={index}
          className="flex flex-col-reverse md:flex-col justify-center items-center md:items-start my-4"
        >
          <p className="flex items-center justify-center space-x-2">
            <LiaCloudSunRainSolid className="text-2xl text-blue-700" />
            <span>{forecast.weather[0].description}</span>
          </p>
          <span className="text-2xl font-normal mx-2 text-green-600">
            {forecast.main.temp}°C
          </span>
          {/* <small className="text-gray-500">{forecast.dt_txt}</small> */}
        </div>
      ))}
    </div>
  );
};

export default Weather;
