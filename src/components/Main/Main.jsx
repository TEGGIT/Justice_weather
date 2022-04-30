import React, {useEffect, useMemo} from 'react';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {asyncGetDataAction, asyncGetLocation} from "../../redux/action";
import Modal from 'react-modal';
import {weatherReportIcon} from "../../mockdata/weatherReportIcon";
import seacrhIcon from '../../assets/Search.png'
import errorTop from '../../assets/errorTop.png'
import cloudError from '../../assets/errorCloud.png'
import classes from "./Main.module.scss";
import InfoWeather from "../InfoWeather/InfoWeather";


const Main = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [errorRequest, setErrorRequest] = useState(false)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch();
  const currentWeatherData = useSelector((state) => state)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geolocation) =>
        dispatch(asyncGetLocation(geolocation.coords))
    );
  }, []);

  useEffect(() => {
    (!currentWeatherData.weather) ? setErrorRequest(true) : setErrorRequest(false)
  }, [currentWeatherData])

  const currentWeather = useMemo(() => ([{
    temp: currentWeatherData.main && Math.round(currentWeatherData.main.temp),
    imageWeatherReport: currentWeatherData.weather && weatherReportIcon[currentWeatherData.weather[0].main],
    weatherReportDescription: currentWeatherData.weather && currentWeatherData.weather[0].description,
    weatherTempFeelsLike: currentWeatherData.main && Math.round(currentWeatherData.main.feels_like),
    weatherWind: currentWeatherData.wind && Math.round(currentWeatherData.wind.speed),
    weatherHumidity: currentWeatherData.main && currentWeatherData.main.humidity

  }]), [currentWeatherData])
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: '1px solid #f3f3f3',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      alignItems: 'center',
    },
  };
  const getWeather = () => {
    setIsOpen(true)
    console.log(currentWeather.temp)
  }
  const closeModal = () => {
    setIsOpen(false)
    dispatch(asyncGetDataAction(search))
  }
  return (
      <div className={classes.main}>
        <div className={classes.main__container}>
          {!errorRequest ? (
              <span className={classes.main_top}>{(currentWeatherData.name)}</span>
          ) : (
              <div style={{display: 'flex', alignItems: 'center'}}>
                <span className={classes.main_top_error}>You entered the city name incorrectly</span>
                <img src={errorTop} className={classes.errorTop} alt="Error image"/>
              </div>
          )}
          <div className={classes.main__container__content}>
            <div className={classes.main__container__content__info}>
              <div className={classes.main__container__content__info__image}>
                {!errorRequest ? (
                    <img src={currentWeather.map(image => image.imageWeatherReport)} alt='weather'/>
                ) : (
                    <>
                      <img src={cloudError} alt='Ошибка'/>
                    </>
                )}
                <span
                    className={classes.content_info_img}>{currentWeather.map(description => description.weatherReportDescription)}</span>
              </div>
              {!errorRequest ? (
                  <div className={classes.main__container__content__info__weatherReport}>
                    {currentWeather.map((item) => {
                      return <InfoWeather
                          temp={item.temp}
                          FeelsLike={item.weatherTempFeelsLike}
                          Wind={item.weatherWind}
                          Humidity={item.weatherHumidity}
                      />
                    })}
                    <div className={classes.search}>
                      <p>Find your city!</p>
                      <img src={seacrhIcon} onClick={() => getWeather()} alt="search"/>
                    </div>
                  </div>
              ) : (
                  <>
                    <p>
                      Maybe you meant <b
                        className={classes.errorCity}
                        onClick={() =>
                            dispatch(asyncGetDataAction('Москва'))}>Moscow?</b>
                    </p>
                  </>
              )}
            </div>
          </div>
        </div>
        <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
        >
          <p className={classes.modalTop}>Enter the name of the city</p>
          <input className={classes.inputSearch} value={search} onChange={e => setSearch(e.target.value)}
                 placeholder="City name"/>
          <button className={classes.buttonSearch} onClick={() => closeModal()}>Search city</button>

        </Modal>
      </div>);
};

export default Main;