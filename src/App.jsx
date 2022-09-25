import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import './App.css'
import WeatherCard from './components/WeatherCard'
import Loading from './components/Loading'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  

  useEffect(() => {
    // Esta es la funcion que se ejecuta cuando llega la informacion de nuentra ubicacion
  const success = pos =>{
    const obj ={
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(obj);
  }
    //Esto hace el llamado a la api del navegador, para usar la ubicacion actual
    navigator.geolocation.getCurrentPosition(success)
  }, [])


  // --------------------Peticion del clima ------------

  useEffect(() => {
    if(coords){const APIKEY ='5a187a195efe5a5a1e8a1f8358ed67df'
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
    axios.get(URL)
      .then(res => {
        const celsius = (res.data.main.temp - 273.15).toFixed(0)
        const farenheit = (celsius * 9 / 5 + 32).toFixed(0)
        setTemperature({celsius, farenheit})
        setWeather(res.data)
      })
      .catch(err => console.log(err))

    }

  }, [coords])

  console.log(weather);

  return (
    <div className="App">
      {
        weather ?
        <WeatherCard weather={weather} temperature={temperature}/>
        :
        <Loading/>
}
    </div>
  )
}

export default App
