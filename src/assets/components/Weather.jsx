import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../components/search.svg'
import clear_icon from '../components/clear.svg'
import cloud_icon from '../components/cloud.svg'
import snow_icon from '../components/snow.svg'
import rain_icon from '../components/rain.svg'
import wind_icon from '../components/wind.svg'
import humidity_icon from '../components/humidity.svg'
import cloud_haze_icon from '../components/cloud_haze.svg'




const Weather = () => {
const inputRef = useRef()
    const [weatherData, setWeatherData ] = useState({temperature: null,
        humidity: null,
        windSpeed: null,
        location: '',
        icon: clear_icon,
      });

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": cloud_haze_icon,
        "04n": cloud_haze_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
        
        }

    const search = async (city)=> {
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${'b07e6e6a2711ddf7ea910ed97575500b'}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }
            
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,

            })
        } catch (error) {
         setWeatherData(false);
         console.error("Error in fetching weather data");
        }
    }

    useEffect(() => {
        search("New York");
    }, [])

  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type='text' placeholder='Search' />
            <img src={search_icon} alt='search-icon' onClick={()=>search(inputRef.current.value)} />
        </div>
        {weatherData.temperature !== null && (
            <>
    <img src={weatherData.icon} alt='' className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}c°</p>
        <p className='city'>{weatherData.location}</p>
       <div className='weather-data'>
        <div className='col'>
            <img src={humidity_icon} alt='' />
        <div>
            <p>Humidity</p>
            <span>{weatherData.humidity}</span><span>%</span>
         </div>  
        </div>
        <div className='col'>
            <img src={wind_icon} alt='' />
        <div>
            <p>{weatherData.windSpeed}</p>
            <span>Wind Speed</span>
         </div>  
        </div>



        </div>

        </>
        )}
        </div>
        
         
      
    
  );
};

export default Weather
