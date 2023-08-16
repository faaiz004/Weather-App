import logo from "./images/logo-no-background.png";
import searchImage from "./images/search.png";
import "./App.css";
import React, { useEffect, useState } from "react";
function DisplayData(prop) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <img src= {prop.bgImage} className = "rounded-t-lg w-4/5 h-3/5"/>
      <div className="data bg-slate-100 text-lg w-4/5 rounded-b-lg font-semibold pb-4 gap-2">
        <span className="name">{prop.name}</span>
        <span className="region">Province: {prop.region}</span>
        <span className="country">Country: {prop.country}</span>
        <span className="condition">Condition: {prop.condition} </span>
        <span className="feelsLike">FeelsLike: {prop.feelsLike} °C </span>
        <span className="windSpeed">WindSpeed: {prop.windSpeed} kph </span>
        <span className="pressure">Pressure: {prop.pressure} mb </span>
        <span className="humidity">Humidity: {prop.humidity} </span>
        <span className="Precipitation">
          Precipitation: {prop.precipitation} mm{" "}
        </span>
      </div>
    </div>
  );
}
function WeatherData(prop) {
  const [weatherData, setWeatherData] = useState({});
  const [bgImage, setBgImage] = useState("");
  useEffect(() => {
    console.log(prop.location);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "f9448be2b2mshd890e0a227ca40ap1e7d17jsn28b44a965b4a",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${prop.location}%2C-0.13`;
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setWeatherData(data));
    console.log(weatherData);
    const apiKey = "l40O06JI4lt9Q7aWFUydGHp7cDNQVheP9srrVVqnhUoIpZBjjKfux0oB"; // Replace with your actual API key
    const url2 = `https://api.pexels.com/v1/search?query=${prop.location}`;
    fetch(url2, {
      method: "GET",
      headers: {
        Authorization: apiKey,
      },
    })
      .then((res) => res.json())
      .then((data) => setBgImage(data.photos[0].src.large));
  }, [prop.location]);
  return (
    <div className="dataAll mt-8">
      {Object.keys(weatherData).length > 0 ? (
        <DisplayData
          name={weatherData.location.name}
          region={weatherData.location.region}
          country={weatherData.location.country}
          condition={weatherData.current.condition.text}
          feelsLike={weatherData.current.feelslike_c}
          windSpeed={weatherData.current.wind_kph}
          pressure={weatherData.current.pressure_mb}
          humidity={weatherData.current.humidity}
          precipitation={weatherData.current.precip_mm}
          bgImage={bgImage}
        />
      ) : (
        <p>An unexpected error has occured</p>
      )}
    </div>
  );
}
function Navbar() {
  const [locationName, setLocationName] = useState("Lahore");
  const [formData, setFormData] = useState({
    Location: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        [name]: value,
      };
    });
  }
  function handleKeyPress(event) {
    if (event.key == "Enter") {
      let str = 0;
      for (let i = 0; i < formData.Location.length; i++) {
        if (formData.Location[i] != " " && formData.Location[i] != "") {
          str += 1;
        }
      }
      if (str == 0) {
        return alert("Input field cannot be empty");
      }
      setLocationName(event.target.value);
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    let str = 0;
    for (let i = 0; i < formData.Location.length; i++) {
      if (formData.Location[i] != " " && formData.Location[i] != "") {
        str += 1;
      }
    }
    if (str == 0) {
      return alert("Input field cannot be empty");
    }
    setLocationName(formData.Location);
  }
  return (
    <div className="Main ">
      <nav className="my-2 shadow-lg px-8 lg:px-16">
        <div className="nav-left font-semibold text-xl lg:text-2xl">
          <span className="text-gray-700">Weather Data</span>
        </div>
        <div className="w-3/5 lg:w-2/5 flex items-center justify-center">
          <input
            type="text"
            placeholder="Enter Location..."
            name="Location"
            value={formData.Location}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            className="px-2 py-0.5 border-2 focus:ring-blue-700 text-gray-800 font-semibold rounded-l-lg w-3/5 h-9 focus:outline-none"
          />
          <button type="submit" onClick={handleSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-12 h-8 text-gray-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <div className="nav-right flex items-center">
          <img src={logo} className="w-16 mb-2"></img>
        </div>
      </nav>
      <WeatherData location={locationName} />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
