import { useEffect, useRef, useState } from 'react';
import '../App.css';

const Weather = () => {
    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState(false);
    
    const search = async (city) => {
        if(city === "") {
            alert('Enter city name!')
            return;
        }
        try {
           const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=063828f760dc25f35de046a07595df57`;

           const response = await fetch(url);
           const data = await response.json();

           if(!response.ok){
            alert(data.message);
            return;
           }
            
        //    console.log(data);
           
           setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                loc: data.name,
                icon: data.weather[0].icon
           })
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data")
        }
    }

    useEffect(() => {
        search("Jakarta");
    },[])

    return (
        <>
            <div className='card'>
                <div className='search-bar'>
                    <input ref={inputRef} className='search' type='text' placeholder='Search' />
                    <i className="fa-solid fa-magnifying-glass fa-xs" onClick={()=>search(inputRef.current.value)}></i>
                </div>
                {weatherData?<>
                    <br />
                <img className='w-img' src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`} />
                <div className='temp'>{weatherData.temp}°c</div>
                <div className='loc'>{weatherData.loc}</div>
                <div className='weather-data'>
                    <div className='col'>
                        <i class="w-data fa-solid fa-water"></i>
                        <div className='data'>
                            <p>{weatherData.humidity}%
                            <span>Humidity</span>
                            </p>
                        </div>
                    </div>
                    <div className='col'>
                        <i class="w-data fa-solid fa-wind fa-xl"></i>
                        <div className='data'>
                            <p>{weatherData.windSpeed} km/h
                            <span>Wind Speed</span>
                            </p>

                        </div>
                    </div>
                </div>
                </>:<></>}

            </div>
        </>
    )
}

export default Weather;