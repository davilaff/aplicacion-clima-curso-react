import { useState } from "react"

export const WeatherApp = () => {

const difKelvin = 273.15
const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = '345a291ca4a4415467e894814fa2f7c0'
const [ciudad, setCiudad] = useState('')
const [dataClima, setDataClima] = useState(null)

const handleCambioCiudad = (e) => {
    setCiudad(e.target.value)
}

const handleSubmit = (e) => {
e.preventDefault()
if (ciudad.length > 0) {fetchClima()}
}

const fetchClima = async () => {
    try {
        const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
        const data = await response.json()
        setDataClima(data)
    } catch (error) {
        console.error('Ocurrió el siguiente problema: ', error)
    }
}

  return (
    <div className="container">
        <h1>Aplicación del Clima</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={ciudad}
            onChange={handleCambioCiudad}
            />
            <button type="submit">Buscar</button>
        </form>
        {
            dataClima && (
                <h2>
                    {dataClima.name}
                    <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
                    <p>Condición meteorológica: {dataClima.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
                </h2>
            )
        }
    </div>
  )
}
