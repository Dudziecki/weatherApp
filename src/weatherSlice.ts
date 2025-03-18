import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";




import axios from "axios";

export const getWeatherDataTC = createAsyncThunk(
    "weather/getWeatherDataTC",
    async (city: string, { rejectWithValue }) => {
        try {
            // 1️⃣ Запрашиваем координаты города
            const geoRes = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
                params: { name: city, count: 1, language: "en", format: "json" }
            });

            if (!geoRes.data.results || geoRes.data.results.length === 0) {
                return rejectWithValue("Город не найден");
            }

            const { latitude, longitude } = geoRes.data.results[0];

            // 2️⃣ Запрашиваем прогноз погоды
            const weatherRes = await axios.get("https://api.open-meteo.com/v1/forecast", {
                params: {
                    latitude,
                    longitude,
                    hourly: "temperature_2m",
                    forecast_days: 1
                }
            });

            // 3️⃣ Формируем удобный массив с температурой по часам
            const { temperature_2m } = weatherRes.data.hourly;
            const temperature = [];

            for (let i = 6; i <= 18; i += 3) {
                temperature.push({
                    time: `${i}:00`,
                    temp: temperature_2m[i],
                });
            }

            return temperature;
        } catch (error: any) {
            return rejectWithValue(error.message || "Ошибка при загрузке погоды");
        }
    }
);




const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        data: null as null | { time: string; temp: number }[], // Исправляем тип
        error: null as any | string
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getWeatherDataTC.fulfilled, (state, action) => {
                state.data = action.payload;
                console.log(state.data)
                state.error = null; // Сбрасываем ошибку при успешном запросе
            })
            .addCase(getWeatherDataTC.rejected, (state, action) => {
                state.error = action.payload
                debugger;
                console.log(state.error)// Сохраняем текст ошибки
            });
    }
})
export const weatherReducer = weatherSlice.reducer