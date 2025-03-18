import './App.css'
import { Weather } from "./Weather.tsx";
import { useDispatch } from "react-redux";
import { getWeatherDataTC } from "./weatherSlice.ts";
import { AppDispatch } from "./store/store.ts";
import { useState } from "react";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const [city, setCity] = useState("");

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };

    const clickHandler = () => {
        if (city.trim()) {
            dispatch(getWeatherDataTC(city)); // Передаем город в санку
        }
    };

    return (
        <div className="app">
            <div>
                <input
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={changeHandler}
                />
                <button onClick={clickHandler}>Search</button>
                <Weather/>
            </div>
        </div>
    );
}

export default App;
