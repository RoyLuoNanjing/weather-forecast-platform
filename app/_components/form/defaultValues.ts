import { WeatherParamsFormFields } from ".";
import { weatherUnitOptions } from "./fieldConfig";

export const useWeatherParamsDefaultValues = () => {
  const weatherParamsDefaultValues: WeatherParamsFormFields = {
    forecastDays: 1,
    units: weatherUnitOptions[0],
  };

  return {
    weatherParamsDefaultValues,
  };
};
