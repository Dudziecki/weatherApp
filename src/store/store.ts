import { configureStore} from '@reduxjs/toolkit'
import {weatherReducer} from "../weatherSlice.ts";


// объединение reducer'ов с помощью combineReducers

// создание store
export const store = configureStore({
    reducer: weatherReducer,
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store