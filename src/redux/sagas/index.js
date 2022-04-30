import {put, takeEvery, call} from "redux-saga/effects"
import {ASYNC_GET_DATA, getDataAction, ASYNC_GET_LOCATION, errorGetDataAction} from "../action";

const apiKey = 'a8c0e0c773646e6171ed285f8738038b'

function* getWeatherWorker(action) {
  const request = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${action.payload}&units=metric&appid=${apiKey}`)
      .then((res) => res.json())
  try {
    yield put(getDataAction(request))
  } catch {
    yield put(errorGetDataAction({}))
  }
}

function* getCurrWeatherWorker(action) {
  const weatherGeolocation = () => fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${action.payload.latitude}&lon=${action.payload.longitude}&units=metric&&appid=${apiKey}`)
  const data = yield call(weatherGeolocation)
  const json = yield call(() => new Promise(res => res(data.json())))
  yield put(getDataAction(json))

}

export function* getWeatherWatcher() {
  yield takeEvery(ASYNC_GET_DATA, getWeatherWorker)
}

export function* getLocationWatcher() {
  yield takeEvery(ASYNC_GET_LOCATION, getCurrWeatherWorker)
}