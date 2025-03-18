import axios from "axios";

const getWeather=async ()=>{
    const response=axios.get("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&forecast_days=1")
    console.log(response)
}
