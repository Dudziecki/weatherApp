import { instance } from "./instance.ts";

 const weatherApi = {
    // Получаем координаты города
    async getCoordinates(city: string) {
        try {
            debugger
            const geoRes = await instance.get("https://geocoding-api.open-meteo.com/v1/search", {
                params: { name: city, count: 1, language: "en", format: "json" }
            });

            if (!geoRes.data.results || geoRes.data.results.length === 0) {
                throw new Error("Город не найден");

            }

            return geoRes.data.results[0]; // Возвращаем объект с latitude и longitude
        } catch (error) {
            throw new Error("Ошибка при получении координат");
        }
    },

    // Получаем прогноз погоды по координатам
    async getWeather(latitude: number, longitude: number) {
        try {
            const weatherRes = await instance.get("", {
                params: {
                    latitude,
                    longitude,
                    hourly: "temperature_2m",
                    forecast_days: 1
                }
            });

            return weatherRes.data; // Возвращаем данные о погоде
        } catch (error) {
            throw new Error("Ошибка при получении прогноза погоды");
        }
    }
};
