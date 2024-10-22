import { IWeatherSources } from "@/types";
import { WeatherParamsFormFields } from ".";
import { weatherUnitOptions } from "./fieldConfig";
import { weatherSourcesConfigMap } from "@/app/lib/config";

interface IProps {
  selectedWeatherSource: IWeatherSources;
}
export const useWeatherParamsDefaultValues = (props: IProps) => {
  const { selectedWeatherSource } = props;
  const weatherParamsDefaultValues: WeatherParamsFormFields = {
    forecastDays: weatherSourcesConfigMap[selectedWeatherSource].forecastDays,
    units: weatherUnitOptions[0],
  };

  return {
    weatherParamsDefaultValues,
  };
};
