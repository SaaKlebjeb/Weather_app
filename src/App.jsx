import { useState } from "react"
import Hourlyforcast from "./Hourlyforcast"

const weather_url=import.meta.env.VITE_APP_WEATHER_API;
const API_KEY=import.meta.env.VITE_APP_API_KEY;

const App = () => {
  const [WeatherData,setWeatherData]=useState({
    cityName:"Phnom Penh",
    cloud:40,
    Speed:4.5
  });
  const [City,setCity]=useState('')
  const Search=async(City)=>{
    try {
      const response=await fetch(`${weather_url}?q=${City}&appid=${API_KEY}`)
    const data=await response.json();
    console.log(data)
    if (data.cod === '404') {
      setWeatherData(null); // Set weather data to null if city not found
      setCity(''); // Optionally reset the search city name
    } else {
      // Update state with valid weather data
      setWeatherData({
        cityName: data.name,
        cloud: data.clouds.all,
        Speed: data.wind.speed,
      });
      setCity('')
    } 
  }
  catch (error) {
    console.log(error)
  }
}
  console.log(WeatherData)
  console.log(City)
  return (
    <div className='h-screen flex justify-center items-center bg-green-200 '>
      {/* card container */}
      <div className="bg-white rounded-xl w-[50%] h-auto p-2">
          <div className="flex w-[90%] h-auto mx-auto justify-between items-center p-2 ">
            {/* input field and search button*/}
              <input 
              onInput={(e)=>setCity(e.target.value)}
              value={City} 
              name='city'
              className="border-2 focus:border-transparent focus:ring-2 ring-sky-300 outline-0 border-gray-400 mx-auto  px-3 py-2 md:text-lg text-md rounded-lg min-w-[50%]  sm:w-[70%] md:w-[80%] "
              placeholder="Enter your location here"
              type="text" />
              <button onClick={()=>Search(City)} className="cursor-pointer w-10 h-10 sm:w-12 sm:h-12 px-2 py-2 hover:bg-green-600 active:scale-105 transition duration-200 bg-green-400 rounded-xl flex justify-center items-center ml-3 ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 text-white">
             <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
              </svg>
              </button>
          </div>
          {/* weather data display */}
          <div className="text-center h-[250px] sm:h-[270px] w-full ">
            {
              WeatherData?(
                <div className="w-[80%] mx-auto h-full " >
                <h1 className="font-bold text-lg sm:font-bold sm:text-2xl">{WeatherData.cityName}</h1>
                 <img className="w-[150px] max-h-[250px] mx-auto object-cover" src="./src/assets/cloudy.gif" alt="cloudy" />
                 <h1 className="font-semibold text-md sm:font-bold sm:text-lg ">{WeatherData.cloud}°C</h1>
                 <h1 className="font-semibold text-md sm:font-bold sm:text-lg capitalize">Cloudy</h1>
                 <h1 className="font-semibold text-md sm:font-bold sm:text-lg ">Wind speed: {WeatherData.Speed}Km/h</h1>
                </div>
              ):(
                <img className="w-full h-full object-center" src='./src/assets/not-found.gif' alt="not_found" />
              )
            }
          </div>
          <Hourlyforcast/>
          
      </div>
    </div>
  )
}

export default App
