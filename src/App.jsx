import axios from "axios";
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData]= useState({})
  const [temperature, setTemperature] = useState(0)
  const [isCelcius, setIsCelcius]=useState(true)

  useEffect(() => {
    const success = pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5b64fa2bf1a755b3b5d1c1e62820608d&units=metric`)

      .then((res) => {
        setData(res.data)
        setTemperature((res.data.main.temp).toFixed())
      })

    }


    navigator.geolocation.getCurrentPosition(success);
  },[])
  
  console.log(data);
  const idIcon = data.weather?.[0].icon;

  const convertTemperature = () => {
    if(isCelcius){
    setTemperature((temperature* 1.8 + 32).toFixed())
    setIsCelcius(false)
    }else{
        setTemperature(((temperature - 32)/1.8).toFixed()) 
        setIsCelcius(true)
    }


}

  return (
    <div className="App">
      <div className= "weatherCard">
        <div className="weatherConditions">
          <div className="clouds">
          <i className="fa-solid fa-cloud"></i>{data.clouds?.all} % 
          </div>
          <div className="wind">
          <i className="fa-solid fa-wind"></i>{data.wind?.speed} m/s
          </div>
          <div className="humidity">
          <i className="fa-solid fa-droplet"></i>{data.main?.humidity} %
          </div>
        </div>
        <div className="weatherInformation">
            <h1>{temperature} {isCelcius ? "°C" : "°F"}</h1>
            <img src={`http://openweathermap.org/img/wn/${idIcon}@4x.png`} alt="" />
            <p className="description"> {data.weather?.[0]?.description}</p>
            <h5> <i className="fa-solid fa-location-crosshairs"></i> {data?.name}, {data.sys?.country}</h5>
        </div>
        <button onClick={convertTemperature}> °C | °F</button>
      </div>
    </div>
  )
}

export default App
