import { CiSearch } from "react-icons/ci";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { useState } from "react";
import propTypes from "prop-types";

//import Images
import clear01d from "./assets/day/clear01d.png";
import clear01n from "./assets/night/clear01n.png";
import fewcloud02d from "./assets/day/fewcloud02d.png";
import fewcloud02n from "./assets/night/fewclouds02n.png";
import sctcloud03d from "./assets/day/sctclouds03d.png";
import sctcloud03n from "./assets/night/sctclouds03n.png";
import brkcloud04d from "./assets/day/brkclouds04d.png";
import brkcloud04n from "./assets/night/brkclouds04n.png";
import showerrain09d from "./assets/day/showerrain09d.png";
import showerrain09n from "./assets/night/showerrain09n.png";
import rain10d from "./assets/day/rain10d.png";
import rain10n from "./assets/night/rain10n.png";
import thunderstorm11d from "./assets/day/thunderstorm11d.png";
import thunderstorm11n from "./assets/night/thunderstorm11n.png";
import snow13d from "./assets/day/snow13d.png";
import snow13n from "./assets/night/snow13n.png";
import mist50d from "./assets/day/mist50d.png";
import mist50n from "./assets/night/mist50n.png";

const weatherIcons = {
  "01d": clear01d,
  "01n": clear01n,
  "02d": fewcloud02d,
  "02n": fewcloud02n,
  "03d": sctcloud03d,
  "03n": sctcloud03n,
  "04d": brkcloud04d,
  "04n": brkcloud04n,
  "09d": showerrain09d,
  "09n": showerrain09n,
  "10d": rain10d,
  "10n": rain10n,
  "11d": thunderstorm11d,
  "11n": thunderstorm11n,
  "13d": snow13d,
  "13n": snow13n,
  "50d": mist50d,
  "50n": mist50n,
};

function WeatherImage({ iconimg }) {
  return (
    <>
      <div>
        <img src={iconimg} alt="" width={100} className="rounded-full mt-3" />
      </div>
    </>
  );
}

function App() {
  const api_key = "438b706d624ef42245828c2db8fd22f5";
  const [icon, setIcon] = useState(clear01d);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [error, setError] = useState(null);

  async function search() {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === "404") {
        console.error("City Not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      } else {
        setTemp(Math.floor(data.main.temp));
        setCity(data.name);
        setCountry(data.sys.country);
        setLat(data.coord.lat);
        setLong(data.coord.lon);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        const weatherIconCode = data.weather[0].icon;
        setIcon(weatherIcons[weatherIconCode] || clear01d);
        setCityNotFound(false);
      }
    } catch (error) {
      console.error("Sorry Can't able to fetch data");
      setError("An Error occur while fetching data");
    } finally {
      setLoading(false);
    }
  }

  const handleCity = (e) => {
    setText(e.target.value);
  };
  const handleKeyDown = (e) => {
    e.key === "Enter" ? search() : null;
  };

  return (
    <>
      <div className="bg-gray-200 w-full h-screen flex justify-center items-center">
        <div className="bg-slate-100 w-12/12 rounded-lg drop-shadow-2xl">
          <div className="flex w-full m-3">
            <input
              type="text"
              placeholder="Enter City"
              onChange={handleCity}
              onKeyDown={handleKeyDown}
              value={text}
              className=" p-1 rounded-l-lg mt-2 mb-2 drop-shadow-lg w-96 outline-none text-xl "
            />
            <CiSearch
              className="text-4xl bg-slate-200 mt-2 rounded-r-lg p-2 drop-shadow-md hover:cursor-pointer"
              onClick={() => search()}
            />
          </div>
          <div className="flex justify-center">
            <WeatherImage iconimg={icon} />
          </div>
          <div className="flex flex-col items-center mt-10 ">
            <h1 className="text-5xl font-semibold">{temp}°C</h1>
            <h1 className="text-4xl font-semibold mt-4 text-amber-500">
              {city}
            </h1>
            <h4 className="text-xl font-semibold mt-2 text-slate-500">
              {country}
            </h4>
          </div>
          <div className="flex justify-center gap-16 mt-8">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Latitude</p>
              <p className="font-bold">{lat}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Longitude</p>
              <p className="font-bold">{long}</p>
            </div>
          </div>
          <div className="flex justify-between p-4 mt-10">
            <div className="flex flex-col items-center">
              <WiHumidity className="text-4xl" />
              <p className="mt-2 font-semibold text-sm">{humidity} %</p>
              <h5 className="font-medium mt-1 text-slate-500 text-sm">
                Humidity
              </h5>
            </div>
            <div className="flex flex-col items-center">
              <FaWind className="text-3xl" />
              <p className="mt-3 font-semibold  text-sm">{wind} Km/h</p>
              <h5 className="font-medium mt-2 text-slate-500 text-sm">Wind</h5>
            </div>
          </div>
          <div className="flex flex-col items-center mt-3">
            {loading && (
              <p className="text-green-700">Please wait While loading...</p>
            )}
            {error && (
              <p className="text-red-700">
                Sorry cannot able to fetch the data
              </p>
            )}
            {cityNotFound && (
              <p className="text-slate-700">Oops! City not found</p>
            )}
          </div>
          <div>
            <p className="text-xs text-center mb-3">
              Developed by <span className="font-medium">Aswin M A</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

WeatherImage.propTypes = {
  iconimg: propTypes.string,
};
