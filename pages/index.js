import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";

//Home page
export default function Home() {
  //State for user input
  const [userInput, setUserInput] = useState("");
  //State for weather data
  const [weatherData, setWeatherData] = useState({});
  //Attempting to Find the Users Location Automatically
  useEffect(() => {
    //Test to see if geolocation is available
    if ("geolocation" in navigator) {
      console.log("geolocation is available");
      navigator.geolocation.getCurrentPosition(async function (position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const weatherURL = `http://api.weatherstack.com/current?access_key=935ca24dc75a8b62f3b3deb577f1c404&query=${lat},${long}&units=f`;
        const weatherData = await fetch(weatherURL, { scheme: "http" })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            return {
              temp: data.current.temperature,
              feelTemp: data.current.feelslike,
              description: data.current.weather_descriptions[0],
              humidity: data.current.humidity,
              windSpeed: data.current.wind_speed,
              windDirection: data.current.wind_dir,
              location: data.location.name,
              region: data.location.region,
              country: data.location.country,
            };
          });
        setWeatherData(weatherData);
        return weatherData;
      });
    } else {
      console.log("geolocation is not available");
    }
  }, []);

  const handleInput = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setUserInput(e.target.value);
  };

  const weather = async (e) => {
    const address = userInput;
    const geocodeURL = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=pk.eyJ1IjoiZHNtaXRoMzkiLCJhIjoiY2s5dDRmOTE3MWF3MjNrcnQwMHlnNHJlbiJ9.rBSGUsGqhoKM3dcfXD2-OQ&limit=1`;
    const geoData = await fetch(geocodeURL)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });

    const lat = geoData.features[0].center[1];
    const long = geoData.features[0].center[0];
    console.log(lat, long);
    const weatherURL = `http://api.weatherstack.com/current?access_key=935ca24dc75a8b62f3b3deb577f1c404&query=${lat},${long}&units=f`;
    const weatherData = await fetch(weatherURL, { scheme: "http" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return {
          temp: data.current.temperature,
          feelTemp: data.current.feelslike,
          description: data.current.weather_descriptions[0],
          humidity: data.current.humidity,
          windSpeed: data.current.wind_speed,
          windDirection: data.current.wind_dir,
          location: data.location.name,
          region: data.location.region,
          country: data.location.country,
        };
      });
    setWeatherData(weatherData);
  };

  const getWeather = (e) => {
    e.preventDefault();
    console.log(userInput);
    if (userInput === "") {
      return;
    }
    weather();
  };

  const Results = () => {
    return (
      <article className={styles.results}>
        <h2>
          {weatherData.location}, {weatherData.region}, {weatherData.country}
        </h2>
        <h3>Weather Description</h3>
        <p>{weatherData.description}</p>
        <h3>Temperature</h3>
        <p>{weatherData.temp}</p>
        <h3>Feels Like</h3>
        <p>{weatherData.feelTemp}</p>
        <h3>Humidity</h3>
        <p>{weatherData.humidity}</p>
        <h3>Wind Speed</h3>
        <p>{weatherData.windSpeed}</p>
        <h3>Wind Direction</h3>
        <p>{weatherData.windDirection}</p>
      </article>
    );
  };

  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta
          name="description"
          content="Weather App Created By Dillon Smith"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/weather.png" />
      </Head>
      <main className={styles.container}>
        <h1 className={styles.heading}>Weather App</h1>

        <form onSubmit={getWeather}>
          <section>
            <label>Search By Location</label>
            <input
              type="text"
              value={userInput}
              onChange={handleInput}
              placeholder="Location"
              className={styles.input}
            />
          </section>
          <button type={"submit"} className={styles.button}>
            Search
          </button>
        </form>
        {!Object.keys(weatherData).length == 0 ? <Results /> : null}
      </main>
    </>
  );
}
