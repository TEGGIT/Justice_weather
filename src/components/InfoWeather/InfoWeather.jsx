import React from 'react';
import classes from "../Main/Main.module.scss";

const infoWeather = ({temp, FeelsLike, Wind, Humidity}) => {
  return (
      <>
        <span className={classes.content_info}>Temperature: {temp}<sup>&#xb0;</sup></span>
        <span
            className={classes.content_info}>Feels like: {FeelsLike}<sup>&#xb0;</sup></span>
        <span className={classes.content_info}>Wind: {Wind} m/s</span>
        <span className={classes.content_info}>Humidity: {Humidity}%</span>
      </>
  );
};

export default infoWeather;