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
    // const fetchWeather = async () => {
    //   const options = {
    //     method: "GET",
    //     url: "https://apjoy-weather-forecast.p.rapidapi.com/forecast",
    //     params: {
    //       location: "Pune",
    //       days: "1",
    //     },
    //     headers: {
    //       "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    //       "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
    //     },
    //   };

    //   try {
    //     const response = await axios.request(options);
    //     setWeather(response.data);

    //     localStorage.setItem("weatherData", JSON.stringify(response.data));
    //     localStorage.setItem("weatherDataTimestamp", Date.now().toString());
    //   } catch (error) {
    //     console.error("Error fetching weather data:", error);
    //     setError("Unable to fetch weather data");
    //   }
    // };

    // const loadWeatherFromLocalStorage = () => {
    //   const storedWeatherData = localStorage.getItem("weatherData");
    //   const storedTimestamp = localStorage.getItem("weatherDataTimestamp");

    //   if (storedWeatherData && storedTimestamp) {
    //     const dataAge = Date.now() - parseInt(storedTimestamp);

    //     if (dataAge < 3600000) {
    //       setWeather(JSON.parse(storedWeatherData));
    //       return;
    //     }
    //   }

    //   fetchWeather();
    // };

    // loadWeatherFromLocalStorage();
    setWeather({
      cod: "200",
      message: 0,
      cnt: 1,
      list: [
        {
          dt: 1727827200,
          main: {
            temp: 27.1,
            feels_like: 26.1,
            temp_min: 24.33,
            temp_max: 26.1,
            pressure: 1009,
            sea_level: 1009,
            grnd_level: 937,
            humidity: 86,
            temp_kf: 1.77,
          },
          weather: [
            {
              id: 802,
              main: "Clouds",
              description: "scattered clouds",
              icon: "03n",
            },
          ],
          clouds: { all: 26 },
          wind: { speed: 1.41, deg: 268, gust: 1.29 },
          visibility: 10000,
          pop: 0,
          sys: { pod: "n" },
          dt_txt: "2024-10-02 00:00:00",
        },
      ],
      city: {
        id: 1259229,
        name: "Pune",
        coord: { lat: 18.5196, lon: 73.8553 },
        country: "IN",
        population: 9999,
        timezone: 19800,
        sunrise: 1727830512,
        sunset: 1727873544,
      },
    });
  }, []);

  return (
    <div>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : weather ? (
        <div>
          {/* <span className="font-medium"> [ {weather.city.name} ]</span> */}
          {weather.list.map((forecast, index) => (
            <div key={index}>
              <p className="flex items-center justify-center space-x-2">
                <LiaCloudSunRainSolid className="text-2xl text-blue-700" />
                <span>{forecast.weather[0].description}</span>
              </p>
              <span className="text-2xl font-normal mx-2 text-green-600">
                {forecast.main.temp}°C{" "}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Weather;
