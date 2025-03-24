import {useDispatch} from "react-redux";
import {AppDispatch} from "./store/store.ts";
import {useState} from "react";
import {getWeatherDataTC} from "./weatherSlice.ts";


export const InputBlock = () => {
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
        <div>
            <div>
                <input
                    className='bg-indigo-500'
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={changeHandler}
                />
                <button onClick={clickHandler}>Search</button>

            </div>
        </div>
    );
};
