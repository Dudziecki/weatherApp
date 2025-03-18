import axios from "axios";

export const instance=axios.create(
    {
        baseURL:'https://api.open-meteo.com/v1/forecast'
    }
);